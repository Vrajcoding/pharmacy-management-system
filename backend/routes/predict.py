from flask import Blueprint, jsonify
from services.forecasting import train_and_predict

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route('/predict/<drug_id>', methods=['GET'])
def predict_endpoint(drug_id):
    try:
        result = train_and_predict(drug_id)
        
        response = {
            "success": True,
            "drug_id": drug_id,
            "predicted_next_month": result.get("predicted_consumption", 0),
            "suggested_order": result.get("suggested_order", 0),
            "confidence": result.get("confidence", "none"),
            "trend": result.get("trend", "unknown"),
            "status": result.get("status", "Unknown")
        }
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
