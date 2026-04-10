import random
from datetime import datetime, timedelta
import os

# Import the initialized Firestore client from utils
from utils.firestore_client import db

if db is None:
    print("WARNING: Firestore client could not be initialized.")
    exit(1)

def seed_dispensing_logs():
    """Seed dispensing logs for the last 6 months to train the ML model."""
    print("Seeding dispensing logs for 'drug_A', 'drug_B', and 'drug_C'...")
    collection_ref = db.collection('dispensingLogs')
    
    # Let's delete old logs for a fresh start (optional, bounded to prevent mass delete)
    # docs = collection_ref.limit(100).stream()
    # for doc in docs:
    #     doc.reference.delete()

    now = datetime.utcnow()
    
    # We want a trend for drug_A (increasing), drug_B (stable), drug_C (decreasing)
    drugs = [
        {"id": "drug_A", "base": 150, "trend": 10},  # 150, 160, 170...
        {"id": "drug_B", "base": 300, "trend": 0},   # ~300
        {"id": "drug_C", "base": 100, "trend": -10}  # 100, 90, 80...
    ]

    batch = db.batch()
    count = 0

    for drug in drugs:
        for month_offset in range(6): # 6 months of data
            # Calculate total quantity for this month
            qty = drug["base"] + (drug["trend"] * month_offset)
            
            # Create a timestamp in that past month
            # month_offset 0 is 5 months ago, month_offset 5 is current month
            months_ago = 5 - month_offset
            past_date = now - timedelta(days=30 * months_ago)
            
            # To make it realistic, we split the monthly quantity into a few daily logs
            num_logs = random.randint(3, 8)
            daily_qtys = [qty // num_logs] * num_logs
            daily_qtys[-1] += qty % num_logs # Add remainder to last entry
            
            for daily_qty in daily_qtys:
                # Randomize day a bit inside the month
                day_offset = random.randint(-10, 10)
                log_date = past_date + timedelta(days=day_offset)
                
                doc_ref = collection_ref.document()
                batch.set(doc_ref, {
                    "drugId": drug["id"],
                    "dispensedAt": log_date,
                    "quantityGiven": daily_qty,
                    "drugName": f"Sample Drug {drug['id'][-1]}",
                    "batchId": "batch_x",
                    "batchNumber": "XXX-000",
                    "dispensedBy": "uid_seed"
                })
                count += 1
                
                if count >= 490:
                    batch.commit()
                    batch = db.batch()
                    count = 0

    if count > 0:
        batch.commit()
        
    print("Dispensing logs successfully seeded! Real ML predictions will now work.")

if __name__ == "__main__":
    seed_dispensing_logs()
