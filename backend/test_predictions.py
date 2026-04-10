import pytest
import pandas as pd
from services.forecasting import get_monthly_consumption, train_and_predict

def test_monthly_aggregation():
    # Calling aggregation logic without Firestore credentials
    # should seamlessly trigger the fallback generation mechanism for 'drug_A'.
    df = get_monthly_consumption('drug_A')
    
    # Assert it returns a pandas DataFrame
    assert isinstance(df, pd.DataFrame), "Should return a pandas DataFrame"
    
    # Assert standard columns exist
    assert 'month' in df.columns, "DataFrame must contain 'month' column"
    assert 'total_dispensed' in df.columns, "DataFrame must contain 'total_dispensed' column"
    
    # Assert length is matching fallback window exactly (6 months backwards)
    assert len(df) == 6, "Fallback data generator should return exactly 6 months"

def test_train_and_predict():
    # Calling predict without Firestore credentials hits the mock data 
    # to train the Linear Regression.
    result = train_and_predict('drug_A')
    
    # Ensure all crucial REST mapped fields are natively generated properly
    assert isinstance(result, dict)
    assert 'drug_id' in result
    assert 'predicted_consumption' in result
    assert 'suggested_order' in result
    assert 'confidence' in result
    assert 'trend' in result
    assert 'status' in result
    
    # Validate core prediction logic logic
    assert result['drug_id'] == 'drug_A'
    assert result['confidence'] == 'high', "6 months of mock data should yield 'high' confidence"
    assert result['predicted_consumption'] > 0, "Prediction should yield a positive generic output"
    assert result['suggested_order'] > result['predicted_consumption'], "Suggested order should include safety buffer"
