from flask import Flask
from routes.predict import predict_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(predict_bp)

@app.route("/")
def hello():
    return "Flask server running"

print("app show in 5000")
if __name__ == "__main__":
    app.run(port=5000, debug=True)
