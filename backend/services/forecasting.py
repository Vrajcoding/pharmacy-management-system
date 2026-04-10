import time
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from utils.firestore_client import db


def _get_mock_data(drug_id):
    """Returns 6 months of hardcoded mock data for 3 drugs as fallback."""
    mock_db = {
        'drug_A': [150, 160, 145, 170, 180, 165],
        'drug_B': [300, 310, 290, 305, 320, 315],
        'drug_C': [50, 45, 60, 55, 65, 70]
    }

    # Generate the last 6 months backward from current date
    months = [(pd.Timestamp.today() - pd.DateOffset(months=i)).strftime('%Y-%m') for i in range(5, -1, -1)]

    # Defaulting to drug_A's trend if unknown drug_id
    quantities = mock_db.get(drug_id, mock_db['drug_A'])

    return pd.DataFrame({
        'month': months,
        'total_dispensed': quantities
    })


def get_monthly_consumption(drug_id):
    """
    Reads from the `/dispensingLogs` Firestore collection,
    filters by `drug_id`, groups the data by month, and returns
    a DataFrame with 'month' and 'total_dispensed'.
    """
    if db is None:
        print("Warning: Firestore client is not initialized. Using fallback mock data.")
        return _get_mock_data(drug_id)

    # Fetch logs for the specific drug.
    # Field names follow the Firestore schema defined in ROADMAP.md:
    #   dispensingLogs/{logId}.drugId       → camelCase drug identifier
    #   dispensingLogs/{logId}.dispensedAt  → Firestore Timestamp of dispensing event
    #   dispensingLogs/{logId}.quantityGiven → units dispensed per transaction
    try:
        logs_ref = db.collection('dispensingLogs')
        docs = logs_ref.where('drugId', '==', drug_id).stream()

        records = []
        for doc in docs:
            data = doc.to_dict()
            records.append({
                'timestamp': data.get('dispensedAt'),
                'quantity': data.get('quantityGiven', data.get('quantity', 0))
            })
    except Exception as e:
        print(f"Error accessing Firestore: {e}. Using fallback mock data.")
        return _get_mock_data(drug_id)

    # If no records exist, return fallback mock data
    if not records:
        print(f"No records found for {drug_id}. Using fallback mock data.")
        return _get_mock_data(drug_id)

    df = pd.DataFrame(records)

    # Convert the timestamp column to actual datetime objects
    # This handles string ISO formats and native Firestore Datetime objects
    df['timestamp'] = pd.to_datetime(df['timestamp'], utc=True)

    # Convert to Month Period ('YYYY-MM') for grouping
    df['month'] = df['timestamp'].dt.to_period('M').astype(str)

    # Group by the month and calculate total dispensed amount
    monthly_grouped = df.groupby('month', as_index=False)['quantity'].sum()

    # Rename quantity to total_dispensed
    monthly_grouped = monthly_grouped.rename(columns={'quantity': 'total_dispensed'})

    # Sort sequentially by month
    monthly_grouped = monthly_grouped.sort_values('month').reset_index(drop=True)

    return monthly_grouped


_prediction_cache = {}
CACHE_TTL = 3600  # 1 hour in seconds


def train_and_predict(drug_id):
    current_time = time.time()
    if drug_id in _prediction_cache:
        cached_result, timestamp = _prediction_cache[drug_id]
        if current_time - timestamp < CACHE_TTL:
            print(f"Returning cached prediction for {drug_id}")
            return cached_result

    result = _train_and_predict_internal(drug_id)
    _prediction_cache[drug_id] = (result, current_time)
    return result


def _train_and_predict_internal(drug_id):
    """
    Fetches monthly consumption data for a drug, trains a simple
    Linear Regression model on the monthly index, and predicts
    the consumption for the following month.
    Adds a 20% buffer to create a suggested order quantity.
    """
    df = get_monthly_consumption(drug_id)

    if df.empty:
        print(f"No data available for {drug_id}.")
        return {
            "drug_id": drug_id,
            "predicted_consumption": 0,
            "suggested_order": 0,
            "confidence": "none",
            "trend": "unknown",
            "status": "No Data"
        }

    if len(df) < 3:
        print(f"Less than 3 months of data for {drug_id}. Using simple average fallback.")
        avg_consumption = float(df['total_dispensed'].mean())
        suggested_order = avg_consumption * 1.20
        return {
            "drug_id": drug_id,
            "predicted_consumption": round(avg_consumption, 2),
            "suggested_order": round(suggested_order, 2),
            "confidence": "low",
            "trend": "unknown",
            "status": "Fallback: Simple Average"
        }

    # Create a simple time index (0, 1, 2, ..., N-1)
    df['time_index'] = np.arange(len(df))

    # Prepare X (features) and y (target)
    X = df[['time_index']].values
    y = df['total_dispensed'].values

    # Train the Linear Regression model
    model = LinearRegression()
    model.fit(X, y)

    # Predict the next month (index = len(df))
    next_month_index = len(df)
    predicted_consumption = float(model.predict([[next_month_index]])[0])

    # Floor to 0 if the linear prediction goes negative due to a strong downward trend
    predicted_consumption = max(0, predicted_consumption)

    # Add a 20% buffer for the suggested order quantity
    suggested_order = predicted_consumption * 1.20

    # Calculate trend based on slope
    slope = float(model.coef_[0])
    if slope > 0.1:
        trend = "increasing"
    elif slope < -0.1:
        trend = "decreasing"
    else:
        trend = "stable"

    return {
        "drug_id": drug_id,
        "predicted_consumption": round(predicted_consumption, 2),
        "suggested_order": round(suggested_order, 2),
        "confidence": "high",
        "trend": trend,
        "status": "Success: Linear Regression"
    }


if __name__ == '__main__':
    # Test stub using the mock data
    print("Running predictions utilizing fallback mock data...\n")

    result_A = train_and_predict('drug_A')
    print(f"Result for drug_A: {result_A}")

    result_B = train_and_predict('drug_B')
    print(f"Result for drug_B: {result_B}")

    result_C = train_and_predict('drug_C')
    print(f"Result for drug_C: {result_C}")

    print("\nTesting Cache for drug_A...")
    result_A_cached = train_and_predict('drug_A')
    print(f"Cached Result for drug_A: {result_A_cached}")
