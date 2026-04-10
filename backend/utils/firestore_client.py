import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from dotenv import load_dotenv

# Load native .env file configurations if available locally
load_dotenv()

try:
    # First priority: check if environment variables exist for cloud/PaaS deployment
    if os.getenv("FIREBASE_PROJECT_ID") and os.getenv("FIREBASE_PRIVATE_KEY"):
        firebase_credentials = {
            "type": "service_account",
            "project_id": os.getenv("FIREBASE_PROJECT_ID"),
            "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
            "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
            "client_id": os.getenv("FIREBASE_CLIENT_ID"),
            "auth_uri": os.getenv("FIREBASE_AUTH_URI", "https://accounts.google.com/o/oauth2/auth"),
            "token_uri": os.getenv("FIREBASE_TOKEN_URI", "https://oauth2.googleapis.com/token"),
            "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL", "https://www.googleapis.com/oauth2/v1/certs"),
            "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
        }
        cred = credentials.Certificate(firebase_credentials)
        
    # Second priority: fallback to hardcoded json file (e.g. local explicit overrides)
    elif os.path.exists('serviceAccountKey.json'):
        cred = credentials.Certificate('serviceAccountKey.json')
    
    # Complete abort
    else:
        raise Exception("Missing Firebase configurations: Add environment variables or serviceAccountKey.json.")

    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    db = firestore.client()
    
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    db = None
