THE PROBLEM
Government hospital pharmacies in India manage hundreds of drug types on paper registers or basic
spreadsheets. This causes three big problems at the same time:
• Critical medicines run out with no warning
• Medicines worth crores expire unused because they're dispensed in the wrong order
• Procurement decisions are based on guesswork with no data to back them up
The pharmacy that should be saving lives is instead creating avoidable waste and avoidable shortages — at
the same time.
WHAT TO BUILD
A web-based pharmacy management system that:
• Follows FEFO (First Expiry, First Out) — always dispenses the batch that expires soonest
• Sends automatic alerts when stock is low or medicines are close to expiry
• Uses ML to predict how much of each drug will be needed and suggests reorder quantities
• Has separate access levels for Pharmacists, Store Managers, and Admins
Everything runs on Firebase — no server setup needed.
WHO USES IT
• Pharmacists dispensing medicines daily
• Store managers overseeing stock levels
• Hospital admins tracking inventory value and waste
WHY IT MATTERS
• Prevents medicine shortages that can be life-threatening (e.g. insulin, antibiotics)
• Stops crores of drug waste caused by wrong dispensing order
• Gives procurement teams actual data instead of guesswork
• Works immediately — no IT team or server required
AI-Powered Drug Inventory &
Expiry Alert System for Hospital Pharmacies
TECH THAT CAN BE USED
Technology What it's used for
Frontend React.js + Vite, Chart.js, jsPDF
Database + Auth Firebase Firestore (real-time) + Firebase Auth
ML / Forecasting Python Flask + scikit-learn (linear regression per drug)
Hosting Firebase Hosting — free tier, zero server setup


# 🏥 AI-Powered Drug Inventory & Expiry Alert System
## Full Project Roadmap — Antigravity Build

> **Stack:** React.js + Vite · Firebase Firestore + Auth + Hosting · Python Flask + scikit-learn · Claude API · Gmail API  
> **Methodology:** Milestone-based, feature-complete, production-ready  
> **Total Estimated Duration:** 10–12 Weeks

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Blueprint](#architecture-blueprint)
3. [Phase 0 — Setup & Foundation](#phase-0--setup--foundation-week-1)
4. [Phase 1 — Firebase & Auth](#phase-1--firebase--authentication-week-2)
5. [Phase 2 — Core Inventory](#phase-2--core-inventory-management-weeks-34)
6. [Phase 3 — FEFO Engine](#phase-3--fefo-dispensing-engine-week-5)
7. [Phase 4 — Alerts System](#phase-4--alert-system-week-6)
8. [Phase 5 — ML Forecasting](#phase-5--ml-forecasting-service-weeks-78)
9. [Phase 6 — Agentic AI Ordering](#phase-6--agentic-ai-ordering-system-weeks-910)
10. [Phase 7 — Dashboards & Reports](#phase-7--dashboards--analytics-reports-week-11)
11. [Phase 8 — Testing & Deployment](#phase-8--testing--deployment-week-12)
12. [Firestore Data Schema](#firestore-data-schema)
13. [API Reference](#api-reference)
14. [Environment Variables](#environment-variables)
15. [Folder Structure](#folder-structure)

---

## Project Overview

A web-based agentic pharmacy management system for government hospital pharmacies. Eliminates manual stock tracking, prevents medicine expiry waste through FEFO dispensing, uses ML to forecast demand, and autonomously emails suppliers when stock is critically low — all triggered by a single admin click.

### Core Capabilities
| Capability | Description |
|---|---|
| FEFO Dispensing | Always dispenses the batch expiring soonest |
| Real-time Alerts | Low stock + near-expiry warnings, live |
| ML Demand Forecasting | Predicts next month's requirement per drug |
| Agentic Ordering | AI composes & sends procurement email to supplier |
| Role-Based Access | Pharmacist / Store Manager / Admin |
| Audit Trail | Every dispensing, order, and alert is permanently logged |

---

## Architecture Blueprint

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                  │
│   Login → Role Router → Pharmacist / Manager / Admin Dashboard  │
│   Charts (Chart.js) · Alerts Panel · Order Cards · FEFO Guide   │
└───────────────┬────────────────────────┬────────────────────────┘
                │ Firestore SDK           │ REST API call
                ▼                         ▼
┌──────────────────────────┐   ┌──────────────────────────────────┐
│   FIREBASE               │   │   PYTHON FLASK BACKEND            │
│   · Firestore (DB)       │   │   · /predict  → ML forecast       │
│   · Firebase Auth        │   │   · /compose  → Claude AI email   │
│   · Firebase Hosting     │   │   · /send     → Gmail API         │
│   · Security Rules       │   │   · /log      → Order audit       │
└──────────────────────────┘   └──────────────────────────────────┘
                                         │
                          ┌──────────────┴──────────────┐
                          ▼                              ▼
               ┌─────────────────┐           ┌─────────────────────┐
               │  Claude API     │           │   Gmail API (OAuth2) │
               │  (email draft)  │           │   (send to supplier) │
               └─────────────────┘           └─────────────────────┘
```

---

## Phase 0 — Setup & Foundation (Week 1)

> Goal: Get every tool installed, configured, and talking to each other before writing a single feature.

### 0.1 Initialize React + Vite Project

```bash
npm create vite@latest pharmacy-system -- --template react
cd pharmacy-system
npm install
```

### 0.2 Install Frontend Dependencies

```bash
# Firebase
npm install firebase

# Routing
npm install react-router-dom

# Charts
npm install chart.js react-chartjs-2

# UI + icons
npm install lucide-react

# PDF export
npm install jspdf jspdf-autotable

# HTTP client
npm install axios

# Notifications (toast alerts)
npm install react-hot-toast

# Date utilities
npm install date-fns
```

### 0.3 Initialize Python Flask Backend

```bash
mkdir flask-backend && cd flask-backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install flask flask-cors scikit-learn pandas numpy \
            anthropic google-auth google-auth-oauthlib \
            google-api-python-client python-dotenv
```

### 0.4 Firebase Project Setup

1. Go to console.firebase.google.com → Create project: `pharmacy-mgmt`
2. Enable **Firestore Database** (production mode)
3. Enable **Firebase Authentication** → Email/Password provider
4. Enable **Firebase Hosting**
5. Download `serviceAccountKey.json` for Flask backend
6. Copy web app config keys to `.env` file

### 0.5 Gmail API Setup

1. Go to console.cloud.google.com
2. Enable Gmail API on your project
3. Create OAuth 2.0 credentials → Download `credentials.json`
4. Set authorized redirect URI to `http://localhost:5000/oauth2callback`
5. Run one-time token generation script (see Phase 6)

### 0.6 Create `.env` Files

**Frontend (`pharmacy-system/.env`):**
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FLASK_API_URL=http://localhost:5000
```

**Backend (`flask-backend/.env`):**
```env
ANTHROPIC_API_KEY=
GMAIL_CREDENTIALS_PATH=credentials.json
GMAIL_TOKEN_PATH=token.json
HOSPITAL_NAME=City Government Hospital
HOSPITAL_ADMIN_EMAIL=admin@cityhospital.gov.in
HOSPITAL_PHONE=079-XXXXXXXX
```

### 0.7 Milestone Checklist — Phase 0
- [ ] React app runs on localhost:5173
- [ ] Flask app runs on localhost:5000
- [ ] Firebase project created with Firestore + Auth enabled
- [ ] `.env` files populated
- [ ] Gmail API credentials downloaded

---

## Phase 1 — Firebase & Authentication (Week 2)

> Goal: Working login system with role-based routing. Different users land on different dashboards.

### 1.1 Firebase Configuration File

**`src/firebase/config.js`**
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 1.2 User Roles in Firestore

When creating a user, store their role in `/users/{uid}`:
```
/users/{uid}
  ├── name     : "Dr. Priya Mehta"
  ├── email    : "priya@hospital.gov.in"
  ├── role     : "admin"           // "pharmacist" | "manager" | "admin"
  └── createdAt: timestamp
```

### 1.3 Auth Context

**`src/context/AuthContext.jsx`**
- Wraps the whole app
- On login: fetches user doc from Firestore, reads `role`
- Exposes: `{ user, role, loading, login, logout }`

### 1.4 Protected Route Component

**`src/components/ProtectedRoute.jsx`**
- Checks `auth.currentUser` + `role` from context
- Redirects to `/login` if unauthenticated
- Redirects to `/unauthorized` if wrong role

### 1.5 Role-Based Router

```
/login              → LoginPage (public)
/pharmacist/*       → PharmacistLayout (role: pharmacist)
/manager/*          → ManagerLayout   (role: manager)
/admin/*            → AdminLayout     (role: admin)
/unauthorized       → UnauthorizedPage
```

### 1.6 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read their own profile
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Drugs: managers and admins write, pharmacists read
    match /drugs/{drugId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['manager','admin'];
    }

    // Dispensing logs: pharmacists can create, all authenticated read
    match /dispensingLogs/{logId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }

    // Orders: admin only
    match /orders/{orderId} {
      allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['manager','admin'];
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Alerts: all authenticated read, system writes
    match /alerts/{alertId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['manager','admin'];
    }
  }
}
```

### 1.7 Milestone Checklist — Phase 1
- [ ] Login page working with Firebase Auth
- [ ] Three user roles created and testable
- [ ] Role-based routing working correctly
- [ ] Firestore security rules deployed
- [ ] Unauthorized users blocked properly

---

## Phase 2 — Core Inventory Management (Weeks 3–4)

> Goal: Full CRUD for drugs and batches. Stock visible in real time across all sessions.

### 2.1 Firestore Collections to Create

**Drugs Collection** `/drugs/{drugId}`
```
name           : "Amoxicillin 500mg"
category       : "Antibiotic"
unit           : "tablets"
minThreshold   : 500
currentStock   : 2400        // sum of all batch quantities (auto-calculated)
supplierId     : "sup_001"
createdAt      : timestamp
updatedAt      : timestamp
```

**Batches Sub-collection** `/drugs/{drugId}/batches/{batchId}`
```
batchNumber    : "AMX-2024-B03"
quantity       : 800
expiryDate     : timestamp   // ← FEFO uses this
manufactureDate: timestamp
purchaseDate   : timestamp
purchasePrice  : 4.50        // per unit, in ₹
supplierId     : "sup_001"
status         : "active"    // "active" | "exhausted" | "expired"
```

**Suppliers Collection** `/suppliers/{supplierId}`
```
name           : "MedSupply Pharma Pvt. Ltd."
contactName    : "Mr. Ramesh Iyer"
email          : "orders@medsupplypharma.com"
phone          : "+91-9876543210"
address        : "Mumbai, Maharashtra"
gstNumber      : "27XXXXX"
drugIds        : ["drug_001", "drug_042"]   // drugs they supply
```

### 2.2 Drug Management (Manager Role)

**Add Drug Form:**
- Drug name, category, unit, minimum threshold
- Auto-generates drugId in Firestore

**Add Batch Form (triggered per drug):**
- Batch number, quantity, expiry date, manufacture date, purchase price
- On submit: creates batch doc + updates `currentStock` on parent drug

**Update Stock (on new delivery):**
- Select existing drug → add new batch
- currentStock recalculated as sum of all active batch quantities

**Drug List View:**
- Table: Name | Category | Current Stock | Min Threshold | Status
- Status badge: 🟢 OK | 🟡 Low | 🔴 Critical | ⚫ Out of Stock
- Click drug → see all batches sorted by expiry date (FEFO order)

### 2.3 Real-time Listener Setup

Use Firestore `onSnapshot` on the drugs collection so stock changes made by the manager appear instantly on the pharmacist's screen without refresh.

```javascript
// src/hooks/useDrugs.js
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useDrugs() {
  const [drugs, setDrugs] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, 'drugs'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrugs(data);
    });
    return unsubscribe;
  }, []);
  
  return drugs;
}
```

### 2.4 Dispensing Log Collection

Every time a pharmacist dispenses medicine:
```
/dispensingLogs/{logId}
  drugId       : "drug_042"
  drugName     : "Amoxicillin 500mg"
  batchId      : "batch_b03"
  batchNumber  : "AMX-2024-B03"
  quantityGiven: 30
  patientId    : "OPD-2025-8821"    // optional
  dispensedBy  : "uid_pharmacist"
  dispensedAt  : timestamp
```

### 2.5 Milestone Checklist — Phase 2
- [ ] Drug add/edit/list working for Manager
- [ ] Batch add working, currentStock auto-updates
- [ ] Supplier master CRUD working
- [ ] Real-time listener syncing across browser tabs
- [ ] Dispensing log writes working
- [ ] Pharmacist can view drug list (read only)

---

## Phase 3 — FEFO Dispensing Engine (Week 5)

> Goal: The system always tells the pharmacist exactly which batch to use, so the oldest-expiry batch is always consumed first.

### 3.1 FEFO Logic

When a pharmacist searches for a drug and initiates dispensing:

```javascript
// src/services/fefoService.js

export async function getFEFOBatch(drugId) {
  // 1. Fetch all active batches for this drug
  const batchesRef = collection(db, 'drugs', drugId, 'batches');
  const q = query(
    batchesRef,
    where('status', '==', 'active'),
    where('quantity', '>', 0),
    orderBy('expiryDate', 'asc')   // ← FEFO: soonest expiry first
  );
  
  const snapshot = await getDocs(q);
  const batches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  if (batches.length === 0) return null;
  
  // 2. Return the batch expiring soonest
  return batches[0];
}
```

### 3.2 Dispensing Transaction (Atomic)

When pharmacist confirms dispensing, use a Firestore **transaction** to:
1. Reduce batch quantity by amount dispensed
2. If batch quantity hits 0, mark batch status = "exhausted"
3. Recalculate and update `currentStock` on parent drug document
4. Write a new dispensing log entry

All four writes happen atomically — if any fails, none commit.

```javascript
// src/services/dispensingService.js

export async function dispense(drugId, batchId, quantity, userId) {
  await runTransaction(db, async (transaction) => {
    const drugRef  = doc(db, 'drugs', drugId);
    const batchRef = doc(db, 'drugs', drugId, 'batches', batchId);
    
    const drugSnap  = await transaction.get(drugRef);
    const batchSnap = await transaction.get(batchRef);
    
    const newBatchQty = batchSnap.data().quantity - quantity;
    const newStock    = drugSnap.data().currentStock - quantity;
    
    transaction.update(batchRef, {
      quantity: newBatchQty,
      status: newBatchQty <= 0 ? 'exhausted' : 'active'
    });
    
    transaction.update(drugRef, { currentStock: newStock });
    
    const logRef = doc(collection(db, 'dispensingLogs'));
    transaction.set(logRef, {
      drugId, batchId, quantity,
      dispensedBy: userId,
      dispensedAt: serverTimestamp()
    });
  });
}
```

### 3.3 Pharmacist Dispensing UI

Flow on the pharmacist screen:
```
Search drug by name or category
        ↓
Drug card appears showing current stock
        ↓
Click "Dispense"
        ↓
System shows FEFO suggestion card:
┌───────────────────────────────────────────┐
│  💊 Amoxicillin 500mg                     │
│  Use Batch: AMX-2024-B03                  │
│  Expires: 15 May 2025 (37 days away) ⚠️   │
│  Available in this batch: 800 tablets     │
│                                           │
│  Quantity to dispense: [____] tablets     │
│                 [Confirm Dispense]        │
└───────────────────────────────────────────┘
```

### 3.4 Milestone Checklist — Phase 3
- [ ] FEFO batch selection working correctly
- [ ] Dispensing transaction is atomic (test by running concurrent dispenses)
- [ ] currentStock updates correctly after each dispense
- [ ] Exhausted batches auto-marked and skipped in next FEFO call
- [ ] Dispensing log entries appearing in Firestore
- [ ] Pharmacist UI showing FEFO batch card clearly

---

## Phase 4 — Alert System (Week 6)

> Goal: Automatic low-stock and near-expiry alerts generated in real time and shown to Manager and Admin.

### 4.1 Alert Types

| Alert Type | Trigger Condition | Severity |
|---|---|---|
| Low Stock | currentStock < minThreshold | Warning |
| Critical Stock | currentStock < minThreshold × 0.3 | Critical |
| Out of Stock | currentStock == 0 | Emergency |
| Near Expiry | Batch expires within 30 days AND quantity > 0 | Warning |
| Expiry Imminent | Batch expires within 7 days AND quantity > 0 | Critical |

### 4.2 Alert Generation — Two Approaches

**Approach A — Client-side listener (simpler, no backend needed):**
When the manager/admin dashboard loads, a `onSnapshot` listener watches all drugs. On every change, it runs alert checks and writes to `/alerts/` collection if a new alert condition is detected.

**Approach B — Firestore Triggers via Cloud Functions (more robust):**
A Cloud Function triggers on every write to `/drugs/{drugId}`, checks thresholds, and writes to `/alerts/`. Runs server-side even if no dashboard is open.

> **Recommended:** Start with Approach A (no billing), upgrade to B when deploying to production.

### 4.3 Alerts Firestore Structure

```
/alerts/{alertId}
  type         : "low_stock"   // "low_stock" | "near_expiry" | "out_of_stock"
  severity     : "warning"     // "warning" | "critical" | "emergency"
  drugId       : "drug_042"
  drugName     : "Amoxicillin 500mg"
  batchId      : "batch_b03"   // only for expiry alerts
  message      : "Amoxicillin 500mg stock (180) below minimum threshold (500)"
  currentStock : 180
  threshold    : 500
  expiryDate   : timestamp     // only for expiry alerts
  status       : "open"        // "open" | "order_placed" | "resolved"
  createdAt    : timestamp
  resolvedAt   : timestamp | null
```

### 4.4 Alert Panel UI

Shown on Manager and Admin dashboards:

```
ALERTS  (4 open)
┌───────────────────────────────────────────────────────────────┐
│ 🔴 CRITICAL  |  Amoxicillin 500mg                             │
│  Stock: 180 tablets  |  Minimum: 500 tablets                  │
│  [Dismiss]  [View Drug]  [Order Now →]                        │
├───────────────────────────────────────────────────────────────┤
│ ⚠️  WARNING  |  Metformin 500mg — Batch MET-B11               │
│  Expires: 22 Apr 2025 (14 days)  |  Quantity: 320 tablets     │
│  [Dismiss]  [View Batch]  [Mark for Priority Dispensing]      │
└───────────────────────────────────────────────────────────────┘
```

### 4.5 Alert Deduplication

Before writing a new alert, check if an open alert for the same `drugId + type` already exists. If yes, update it instead of creating a duplicate.

### 4.6 Milestone Checklist — Phase 4
- [ ] Low stock alerts trigger correctly when stock drops below threshold
- [ ] Near-expiry alerts trigger for batches within 30 days
- [ ] Alerts panel shows on Manager and Admin dashboards
- [ ] Alert status updates to "order_placed" after an order is made
- [ ] Deduplication working (no duplicate alerts for same drug)
- [ ] Alerts visible in real time (no page refresh needed)

---

## Phase 5 — ML Forecasting Service (Weeks 7–8)

> Goal: A Python service that analyzes historical dispensing data and predicts how much of each drug will be needed next month.

### 5.1 Flask App Structure

```
flask-backend/
  app.py                    ← main Flask app
  routes/
    predict.py              ← ML prediction endpoint
    compose.py              ← AI email composition endpoint
    send_email.py           ← Gmail sending endpoint
  services/
    forecasting.py          ← ML model logic
    email_composer.py       ← Claude API calls
    gmail_service.py        ← Gmail API wrapper
  models/
    trained_models/         ← saved .pkl files per drug
  utils/
    firestore_client.py     ← Firebase Admin SDK connection
  requirements.txt
  .env
```

### 5.2 Data Preparation

Before training: aggregate dispensing logs by month per drug.

```python
# services/forecasting.py

def get_monthly_consumption(drug_id: str) -> pd.DataFrame:
    """
    Reads dispensingLogs from Firestore,
    groups by month, returns DataFrame:
    month | total_dispensed
    """
    logs_ref = db.collection('dispensingLogs')
    docs = logs_ref.where('drugId', '==', drug_id).stream()
    
    records = []
    for doc in docs:
        data = doc.to_dict()
        month = data['dispensedAt'].strftime('%Y-%m')
        records.append({'month': month, 'quantity': data['quantity']})
    
    df = pd.DataFrame(records)
    monthly = df.groupby('month')['quantity'].sum().reset_index()
    monthly = monthly.sort_values('month')
    monthly['month_index'] = range(len(monthly))   # numeric for regression
    return monthly
```

### 5.3 Linear Regression Per Drug

```python
from sklearn.linear_model import LinearRegression
import numpy as np

def train_and_predict(drug_id: str) -> dict:
    df = get_monthly_consumption(drug_id)
    
    if len(df) < 3:
        # Not enough history — fall back to simple average
        avg = df['quantity'].mean() if len(df) > 0 else 0
        return {
            'predicted_next_month': round(avg),
            'suggested_order': round(avg * 1.2),   # 20% buffer
            'confidence': 'low',
            'data_points': len(df)
        }
    
    X = df[['month_index']].values
    y = df['quantity'].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    next_month_index = len(df)   # predict one step ahead
    predicted = model.predict([[next_month_index]])[0]
    predicted = max(0, round(predicted))
    
    # Suggested order = prediction + 20% safety buffer
    suggested_order = round(predicted * 1.2)
    
    return {
        'predicted_next_month': predicted,
        'suggested_order': suggested_order,
        'confidence': 'high' if len(df) >= 6 else 'medium',
        'data_points': len(df),
        'trend': 'increasing' if model.coef_[0] > 0 else 'decreasing'
    }
```

### 5.4 Prediction API Endpoint

```python
# routes/predict.py

@app.route('/predict/<drug_id>', methods=['GET'])
def predict_demand(drug_id):
    try:
        result = train_and_predict(drug_id)
        return jsonify({ 'success': True, 'data': result }), 200
    except Exception as e:
        return jsonify({ 'success': False, 'error': str(e) }), 500
```

### 5.5 Frontend Integration

When admin clicks "Get Reorder Suggestion" in the alert card:
```javascript
const res = await axios.get(`${FLASK_API_URL}/predict/${drugId}`);
const { predicted_next_month, suggested_order, confidence } = res.data.data;
// Show in the Order Now modal
```

### 5.6 Milestone Checklist — Phase 5
- [ ] Flask app running with CORS configured
- [ ] Firestore Admin SDK reading dispensing logs
- [ ] Prediction endpoint returning correct values for drugs with > 3 months data
- [ ] Fallback average working for drugs with < 3 months data
- [ ] Frontend displaying ML prediction in alert card
- [ ] Confidence level (high/medium/low) shown to admin

---

## Phase 6 — Agentic AI Ordering System (Weeks 9–10)

> Goal: Admin clicks "Order Now" → AI composes a procurement email → Gmail API sends it to the supplier → order is logged.

### 6.1 Gmail OAuth Setup (One-Time)

```python
# scripts/gmail_auth.py  (run once locally)

from google_auth_oauthlib.flow import InstalledAppFlow
import pickle

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
creds = flow.run_local_server(port=0)

with open('token.pkl', 'wb') as f:
    pickle.dump(creds, f)

print("Token saved. Gmail API ready.")
```

### 6.2 Email Composition via Claude API

```python
# services/email_composer.py

import anthropic

client = anthropic.Anthropic()

def compose_order_email(drug_name, quantity, unit, supplier_name,
                         contact_name, hospital_name, admin_name,
                         current_stock, min_threshold) -> str:
    
    prompt = f"""
    Compose a professional procurement purchase order email for a government hospital pharmacy.
    
    Details:
    - Hospital: {hospital_name}
    - Authorized by: {admin_name}
    - Supplier: {supplier_name}, Attn: {contact_name}
    - Medicine: {drug_name}
    - Quantity: {quantity} {unit}
    - Current Stock: {current_stock} {unit}
    - Minimum Threshold: {min_threshold} {unit}
    - Required delivery: within 7 working days
    
    The email must:
    1. Be formal and professional
    2. Clearly state this is an urgent procurement request
    3. Include all quantity and medicine details in a structured format
    4. Request confirmation of availability and delivery date
    5. Mention this was generated by the hospital's automated pharmacy system
    
    Return ONLY the email body text. No subject line. No extra commentary.
    """
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=600,
        messages=[{ "role": "user", "content": prompt }]
    )
    
    return message.content[0].text
```

### 6.3 Gmail Sending Service

```python
# services/gmail_service.py

import base64, pickle
from email.mime.text import MIMEText
from googleapiclient.discovery import build

def send_order_email(to_email, subject, body) -> bool:
    with open('token.pkl', 'rb') as f:
        creds = pickle.load(f)
    
    service = build('gmail', 'v1', credentials=creds)
    
    msg = MIMEText(body)
    msg['to']      = to_email
    msg['subject'] = subject
    
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    service.users().messages().send(
        userId='me',
        body={'raw': raw}
    ).execute()
    
    return True
```

### 6.4 Order Endpoint (Full Agentic Flow)

```python
# routes/order.py

@app.route('/order', methods=['POST'])
def place_order():
    data = request.json
    # data contains: drugId, drugName, quantity, unit,
    #                supplierId, supplierName, supplierEmail,
    #                contactName, currentStock, minThreshold,
    #                adminName, adminUid, hospitalName

    # Step 1: Compose email using Claude
    email_body = compose_order_email(
        drug_name     = data['drugName'],
        quantity      = data['quantity'],
        unit          = data['unit'],
        supplier_name = data['supplierName'],
        contact_name  = data['contactName'],
        hospital_name = data['hospitalName'],
        admin_name    = data['adminName'],
        current_stock = data['currentStock'],
        min_threshold = data['minThreshold']
    )
    
    subject = f"Purchase Order Request — {data['drugName']} | {data['hospitalName']}"
    
    # Step 2: Send via Gmail API
    send_order_email(data['supplierEmail'], subject, email_body)
    
    # Step 3: Log order to Firestore
    order_doc = {
        'drugId'          : data['drugId'],
        'drugName'        : data['drugName'],
        'supplierId'      : data['supplierId'],
        'supplierName'    : data['supplierName'],
        'supplierEmail'   : data['supplierEmail'],
        'quantityOrdered' : data['quantity'],
        'unit'            : data['unit'],
        'orderedBy'       : data['adminUid'],
        'emailSubject'    : subject,
        'emailBody'       : email_body,
        'emailSent'       : True,
        'status'          : 'pending',
        'timestamp'       : firestore.SERVER_TIMESTAMP
    }
    db.collection('orders').add(order_doc)
    
    return jsonify({ 'success': True, 'message': 'Order placed and email sent.' }), 200
```

### 6.5 Admin "Order Now" UI Flow

```
Alert Card → Admin clicks "Order Now"
                    ↓
          Order Modal opens showing:
          ┌──────────────────────────────────────────────┐
          │  PLACE ORDER — Amoxicillin 500mg             │
          │                                              │
          │  Supplier  : MedSupply Pharma Pvt. Ltd.      │
          │  To        : orders@medsupplypharma.com      │
          │  Contact   : Mr. Ramesh Iyer                 │
          │                                              │
          │  ML Suggested Quantity: 2,400 tablets        │
          │  Quantity to Order: [2400] ← editable        │
          │                                              │
          │  [Preview Email]    [Confirm & Send Order]   │
          └──────────────────────────────────────────────┘
                    ↓ (Preview Email clicked)
          Claude-composed email shown in modal
          Admin can read it before sending
                    ↓ (Confirm & Send Order clicked)
          POST /order → Flask → Claude → Gmail → Firestore
                    ↓
          ✅ Order sent to MedSupply Pharma Pvt. Ltd.
             Order ID: ORD-2025-0892 | 08 Apr, 10:32 AM
             Alert status updated to "order_placed"
```

### 6.6 Order History View (Admin)

Table showing all past orders:
```
Date     | Drug               | Supplier          | Qty    | Status
---------|--------------------|--------------------|--------|----------
08 Apr   | Amoxicillin 500mg  | MedSupply Pharma  | 2,400  | Pending
05 Apr   | Insulin 100IU      | LifePharma Ltd.   | 500    | Delivered
02 Apr   | Metformin 500mg    | GenMed Pvt.       | 1,200  | Confirmed
```

### 6.7 Milestone Checklist — Phase 6
- [ ] Gmail OAuth token generated and saved
- [ ] Claude API composing professional emails correctly
- [ ] Gmail API sending emails successfully (test with your own email first)
- [ ] Order logged to Firestore on every successful send
- [ ] Alert status updating to "order_placed" after order
- [ ] Admin can preview email before sending
- [ ] Admin can edit quantity before sending
- [ ] Order history table working on Admin dashboard

---

## Phase 7 — Dashboards & Analytics Reports (Week 11)

> Goal: Each role sees a meaningful dashboard with real data. Admin can export PDF reports.

### 7.1 Pharmacist Dashboard
- Drug search bar (search by name, category)
- Quick dispense panel with FEFO suggestion
- "My dispenses today" counter
- Color-coded stock badges on drug list

### 7.2 Store Manager Dashboard
- **Summary Cards:** Total drugs | Low stock count | Near-expiry count | Total stock value (₹)
- **Alerts Panel:** All open alerts with action buttons
- **Drug Inventory Table:** Full list with stock status badges
- **Batch Expiry Timeline:** Chart.js bar chart — batches expiring in next 30/60/90 days
- **Recent Dispensing Activity:** Last 20 dispenses log

### 7.3 Admin Dashboard
- **KPI Cards:** Inventory value | Waste value this month | Orders placed | Alerts resolved
- **Stock Trend Chart:** Line chart — daily stock level for top 10 drugs over last 30 days
- **Expiry Risk Chart:** Pie chart — stock value at risk by expiry timeline bucket
- **Consumption Heatmap:** Which drugs are dispensed most (week by week)
- **Order History Table:** All procurement orders with status
- **ML Forecast Panel:** Predicted consumption next month per drug

### 7.4 PDF Report Export (jsPDF)

Admin can download a monthly inventory report:

```javascript
// src/services/reportService.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateInventoryReport(drugs, orders, month) {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text(`Pharmacy Inventory Report — ${month}`, 14, 20);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 28);
  
  autoTable(doc, {
    head: [['Drug Name', 'Category', 'Current Stock', 'Min Threshold', 'Status']],
    body: drugs.map(d => [
      d.name, d.category, d.currentStock, d.minThreshold,
      d.currentStock < d.minThreshold ? 'LOW' : 'OK'
    ]),
    startY: 35
  });
  
  doc.save(`inventory-report-${month}.pdf`);
}
```

### 7.5 Milestone Checklist — Phase 7
- [ ] All three role dashboards rendering correctly
- [ ] Chart.js charts showing real Firestore data
- [ ] Inventory value calculated correctly (sum of batch qty × price per unit)
- [ ] PDF export generating and downloading correctly
- [ ] Dashboard KPIs updating in real time

---

## Phase 8 — Testing & Deployment (Week 12)

> Goal: Stable, deployed, production-ready system accessible from any hospital browser.

### 8.1 Unit Testing

**Frontend (Vitest):**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```
Test: FEFO batch selection logic, alert trigger logic, role-based route guarding

**Backend (pytest):**
```bash
pip install pytest
```
Test: Prediction function, email composition, Firestore read/write mocks

### 8.2 Integration Testing

- Dispense medicine → verify stock decreases in Firestore
- Stock drops below threshold → verify alert is created
- Admin clicks Order Now → verify email sent + order logged
- Role restriction → pharmacist cannot access manager routes

### 8.3 Performance Checks

- Firestore indexes: add composite indexes for queries using `where` + `orderBy`
- Firestore reads: use `.limit()` on all large collection reads
- React: wrap heavy components in `React.memo`, use `useMemo` for calculations
- Flask: cache ML predictions for 1 hour per drug (don't retrain on every request)

### 8.4 Deploy Frontend to Firebase Hosting

```bash
# Build the React app
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Login and init
firebase login
firebase init hosting
# → Public directory: dist
# → Single-page app: Yes
# → Overwrite index.html: No

# Deploy
firebase deploy --only hosting
```

### 8.5 Deploy Flask Backend

**Option A — Railway (free tier, simple):**
```bash
# Add Procfile to flask-backend/
echo "web: gunicorn app:app" > Procfile
pip freeze > requirements.txt
# Push to GitHub → connect Railway → auto-deploy
```

**Option B — Google Cloud Run (same ecosystem as Firebase):**
```bash
gcloud run deploy pharmacy-flask \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

### 8.6 Update Frontend API URL

After Flask is deployed, update `.env`:
```env
VITE_FLASK_API_URL=https://your-flask-app.railway.app
```
Rebuild and redeploy frontend.

### 8.7 Final Production Checklist
- [ ] Firestore security rules deployed (not in test mode)
- [ ] Firebase Hosting deployed — app accessible at `.web.app` URL
- [ ] Flask backend deployed with HTTPS URL
- [ ] Frontend `.env` updated with production Flask URL
- [ ] Gmail OAuth token working in production environment
- [ ] All three roles tested on production URL (not localhost)
- [ ] Firestore indexes deployed (check console for missing index warnings)
- [ ] PDF export working in production
- [ ] ML predictions working with production Firestore data

---

## Firestore Data Schema

```
pharmacy-mgmt (Firestore)
│
├── users/
│   └── {uid}
│       ├── name, email, role, createdAt
│
├── drugs/
│   └── {drugId}
│       ├── name, category, unit, minThreshold
│       ├── currentStock, supplierId
│       ├── createdAt, updatedAt
│       └── batches/              ← sub-collection
│           └── {batchId}
│               ├── batchNumber, quantity, status
│               ├── expiryDate, manufactureDate
│               ├── purchaseDate, purchasePrice
│               └── supplierId
│
├── suppliers/
│   └── {supplierId}
│       ├── name, contactName, email
│       ├── phone, address, gstNumber
│       └── drugIds[]
│
├── dispensingLogs/
│   └── {logId}
│       ├── drugId, drugName
│       ├── batchId, batchNumber
│       ├── quantityGiven, patientId
│       ├── dispensedBy, dispensedAt
│
├── alerts/
│   └── {alertId}
│       ├── type, severity, status
│       ├── drugId, drugName
│       ├── batchId (expiry alerts only)
│       ├── message, currentStock, threshold
│       ├── expiryDate (expiry alerts only)
│       ├── createdAt, resolvedAt
│
└── orders/
    └── {orderId}
        ├── drugId, drugName
        ├── supplierId, supplierName, supplierEmail
        ├── quantityOrdered, unit
        ├── orderedBy, timestamp
        ├── emailSubject, emailBody
        ├── emailSent (bool)
        └── status (pending / confirmed / delivered)
```

---

## API Reference

### Flask Backend Endpoints

| Method | Endpoint | Role | Description |
|---|---|---|---|
| GET | `/predict/<drug_id>` | Manager, Admin | ML demand forecast for a drug |
| POST | `/compose-email` | Admin | Claude generates procurement email (preview) |
| POST | `/order` | Admin | Full agentic flow: compose + send + log |
| GET | `/health` | Public | Health check |

### POST `/order` — Request Body
```json
{
  "drugId"       : "drug_042",
  "drugName"     : "Amoxicillin 500mg",
  "quantity"     : 2400,
  "unit"         : "tablets",
  "supplierId"   : "sup_001",
  "supplierName" : "MedSupply Pharma Pvt. Ltd.",
  "supplierEmail": "orders@medsupplypharma.com",
  "contactName"  : "Mr. Ramesh Iyer",
  "currentStock" : 180,
  "minThreshold" : 500,
  "adminName"    : "Dr. Priya Mehta",
  "adminUid"     : "uid_abc123",
  "hospitalName" : "City Government Hospital"
}
```

---

## Environment Variables

### Frontend (`pharmacy-system/.env`)
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FLASK_API_URL=http://localhost:5000
```

### Backend (`flask-backend/.env`)
```env
ANTHROPIC_API_KEY=
FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json
GMAIL_CREDENTIALS_PATH=credentials.json
GMAIL_TOKEN_PATH=token.pkl
HOSPITAL_NAME=City Government Hospital
HOSPITAL_ADMIN_EMAIL=admin@cityhospital.gov.in
HOSPITAL_PHONE=079-XXXXXXXX
FLASK_ENV=development
PORT=5000
```

---

## Folder Structure

```
pharmacy-system/                    ← React Frontend
├── public/
├── src/
│   ├── firebase/
│   │   └── config.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useDrugs.js
│   │   ├── useAlerts.js
│   │   └── useOrders.js
│   ├── services/
│   │   ├── fefoService.js
│   │   ├── dispensingService.js
│   │   ├── alertService.js
│   │   └── reportService.js
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── AlertCard.jsx
│   │   ├── DrugCard.jsx
│   │   ├── FefoDispenseModal.jsx
│   │   ├── OrderModal.jsx
│   │   └── charts/
│   │       ├── StockTrendChart.jsx
│   │       └── ExpiryTimeline.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── pharmacist/
│   │   │   └── PharmacistDashboard.jsx
│   │   ├── manager/
│   │   │   ├── ManagerDashboard.jsx
│   │   │   ├── DrugList.jsx
│   │   │   └── AddBatch.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── OrderHistory.jsx
│   │       └── Reports.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
└── package.json

flask-backend/                      ← Python Backend
├── app.py
├── routes/
│   ├── predict.py
│   ├── compose.py
│   └── order.py
├── services/
│   ├── forecasting.py
│   ├── email_composer.py
│   └── gmail_service.py
├── utils/
│   └── firestore_client.py
├── scripts/
│   └── gmail_auth.py
├── serviceAccountKey.json          ← never commit this
├── credentials.json                ← never commit this
├── token.pkl                       ← never commit this
├── requirements.txt
├── .env
└── .gitignore
```

---

## Quick Reference — Build Order

```
Week 1  →  Phase 0: Project setup, Firebase init, Gmail API, env files
Week 2  →  Phase 1: Auth, roles, protected routes, Firestore rules
Week 3  →  Phase 2: Drug CRUD, batch management, dispensing logs
Week 4  →  Phase 2: Supplier master, real-time listeners, pharmacist view
Week 5  →  Phase 3: FEFO engine, atomic dispense transaction, FEFO UI
Week 6  →  Phase 4: Alert generation, alert panel, deduplication
Week 7  →  Phase 5: Flask setup, Firestore reads, data aggregation
Week 8  →  Phase 5: Linear regression, prediction API, frontend integration
Week 9  →  Phase 6: Claude email composition, Gmail send, order endpoint
Week 10 →  Phase 6: Order Now UI flow, preview modal, order history
Week 11 →  Phase 7: All dashboards, Chart.js charts, PDF export
Week 12 →  Phase 8: Testing, performance, Firebase Hosting deploy, Flask deploy
```

---

> **Built with:** React · Firebase · Python Flask · scikit-learn · Claude API · Gmail API  
> **Target:** Government Hospital Pharmacies, India  
> **Purpose:** Eliminate preventable medicine shortages and expiry waste through intelligent, agentic pharmacy management.
      
---

## 👥 Team Task Assignment (5 Members)

> **5-member hackathon team split by specialization. Each member owns specific phases, files, and features.**

---

### 🧑‍💻 Member 1 — Project Lead + Firebase & Auth
> **Best suited for:** Full-stack setup, Firebase configuration, project architecture.

| ⏰ Hours | Task | Deliverable |
|---|---|---|
| **0–2** | `npm create vite@latest pharmacy-system -- --template react` → install all deps → create `.env` | React running on `localhost:5173` |
| **0–2** | Create Firebase project → enable Firestore + Auth + Hosting → copy config to `.env` | Firebase connected to app |
| **0–2** | Gmail API setup → download `credentials.json` → share with M5 | Credentials ready |
| **2–4** | `src/firebase/config.js` — initialize Firebase app, export `db` + `auth` | Firebase SDK wired |
| **2–4** | Login page UI → `signInWithEmailAndPassword` → redirect on success | Login works |
| **2–6** | `AuthContext.jsx` — wraps app, fetches role from Firestore on login, exposes `{ user, role, loading }` | Role context ready |
| **2–6** | `ProtectedRoute.jsx` — checks auth + role, redirects if unauthorized | Routes protected |
| **2–6** | `App.jsx` role-based router — `/pharmacist/*`, `/manager/*`, `/admin/*`, `/unauthorized` | 3 roles route correctly |
| **2–6** | Firestore Security Rules — role-based read/write per collection | Rules deployed |
| **6–11** | Fix any auth bugs, help M2/M3 with Firestore setup, configure CORS on Flask with M4 | All pages accessible by role |
| **11–17** | Integrate ML prediction — `axios.get('/predict/${drugId}')` → show result in alert card UI | Prediction shown in frontend |
| **17–21** | Admin Dashboard KPI cards — total stock value, waste this month, orders placed, alerts resolved | KPIs live on Admin dashboard |
| **21–24** | `npm run build` → `firebase deploy --only hosting` → share production URL | App live on Firebase Hosting |

**Files to own:**
- `src/firebase/config.js`
- `src/context/AuthContext.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/App.jsx`
- `firestore.rules`
- `src/pages/Login.jsx`

---

### 🧑‍💻 Member 2 — Core Inventory & FEFO Engine
> **Best suited for:** React state management, business logic, Firestore transactions.

| ⏰ Hours | Task | Deliverable |
|---|---|---|
| **0–2** | Clone repo, install deps, create 3 Firebase Auth users (pharmacist / manager / admin) with `/users/{uid}` Firestore docs | 3 test accounts usable |
| **2–4** | `useDrugs.js` hook — `onSnapshot` listener on `/drugs` collection, real-time updates | Drug list updates live |
| **2–6** | Drug List view — table with Name, Category, Stock, Threshold, Status badge (🟢🟡🔴⚫) | Manager sees all drugs |
| **2–6** | Add Drug form — name, category, unit, minThreshold → writes to `/drugs/{drugId}` | New drugs created in Firestore |
| **4–6** | Add Batch form — batchNumber, quantity, expiryDate, manufactureDate, purchaseDate, purchasePrice → creates batch sub-doc + updates `currentStock` | Batches added, stock auto-updates |
| **6–9** | Supplier CRUD — Add/Edit/List supplier docs in `/suppliers` collection | Supplier master working |
| **6–9** | Dispensing Log writer — on each dispense, writes to `/dispensingLogs/{logId}` | Logs recorded in Firestore |
| **9–11** | `fefoService.js` — query active batches ordered by `expiryDate asc`, return soonest-expiry batch | FEFO logic correct |
| **9–11** | `FefoDispenseModal.jsx` — shows FEFO batch card: batch number, expiry date, qty available, input field for qty to dispense | UI card rendered |
| **11–14** | `dispensingService.js` — Firestore transaction: reduce batch qty → mark exhausted if 0 → update `currentStock` → write log | Atomic dispense works |
| **14–17** | Pharmacist Dashboard — drug search, FEFO suggestion card, Confirm Dispense button, "My dispenses today" counter | Full pharmacist flow demo-able |
| **17–21** | Fix FEFO edge cases — exhausted batches skipped, 0-stock scenarios handled, multi-batch FEFO chain | FEFO bulletproof |
| **21–24** | End-to-end test: add drug → add batch → dispense → verify stock drops → verify log in Firestore | All inventory flows verified |

**Files to own:**
- `src/hooks/useDrugs.js`
- `src/services/fefoService.js`
- `src/services/dispensingService.js`
- `src/components/FefoDispenseModal.jsx`
- `src/components/DrugCard.jsx`
- `src/pages/manager/DrugList.jsx`
- `src/pages/manager/AddBatch.jsx`
- `src/pages/pharmacist/PharmacistDashboard.jsx`

---

### 🧑‍💻 Member 3 — Alert System & Manager Dashboard
> **Best suited for:** Real-time data, UI components, Chart.js visualizations.

| ⏰ Hours | Task | Deliverable |
|---|---|---|
| **0–2** | Clone repo, install deps, manually seed Firestore with 6 drug docs + 2 batches each using CSV data | Sample data available for all members |
| **2–4** | Alert threshold logic — check `currentStock` vs `minThreshold`: Low (<threshold), Critical (<30%), Emergency (0) | Alert conditions defined |
| **2–4** | Near-expiry check — flag batches expiring within 30 days (warning) or 7 days (critical) | Expiry alerts identified |
| **4–6** | `alertService.js` — write alert docs to `/alerts` collection, deduplication check before insert | No duplicate alerts |
| **4–6** | `useAlerts.js` — `onSnapshot` listener on `/alerts` where status == "open" | Real-time alert feed |
| **6–9** | `AlertCard.jsx` — shows type icon (🔴/⚠️), drug name, stock vs threshold, Dismiss / View Drug / Order Now buttons | Alert cards rendered |
| **6–9** | Wire Dismiss button → updates alert `status: "resolved"` in Firestore | Dismiss works |
| **9–11** | Wire "Order Now" button → opens M5's `OrderModal` with drug + alert data passed as props | Order flow triggered from alert |
| **11–14** | Manager Dashboard — Summary cards: Total Drugs, Low Stock Count, Near-Expiry Count, Total Stock Value (₹) | Dashboard stats showing |
| **11–14** | Alerts panel on Manager Dashboard with all open alerts, sorted by severity | Live alerts on manager page |
| **14–17** | Drug inventory table on Manager Dashboard — full list with stock status badges | Full inventory visible |
| **17–21** | Chart.js Expiry Timeline bar chart — batches expiring in next 30 / 60 / 90 days | Chart rendered with real data |
| **17–21** | Recent Dispensing Activity — last 20 entries from `/dispensingLogs`, sorted by time | Activity log working |
| **21–24** | Alert test: set stock below threshold → verify alert fires → dismiss → verify resolved in Firestore | Alert flow verified |

**Files to own:**
- `src/services/alertService.js`
- `src/hooks/useAlerts.js`
- `src/components/AlertCard.jsx`
- `src/pages/manager/ManagerDashboard.jsx`
- `src/components/charts/ExpiryTimeline.jsx`

---

### 🧑‍💻 Member 4 — Python Flask Backend + ML Forecasting
> **Best suited for:** Python, scikit-learn, REST APIs, Firebase Admin SDK.

| ⏰ Hours | Task | Deliverable |
|---|---|---|
| **0–2** | `python -m venv venv` → `pip install flask flask-cors scikit-learn pandas numpy firebase-admin python-dotenv` → verify Flask runs on port 5000 | Flask server running |
| **2–4** | `app.py` — Flask app init, CORS config, `/health` route returning `{ status: "ok" }` | Health endpoint works |
| **2–4** | `firestore_client.py` — Firebase Admin SDK init using `serviceAccountKey.json`, export `db` | Firestore readable from Python |
| **4–6** | `get_monthly_consumption(drug_id)` — reads `/dispensingLogs`, groups by month, returns DataFrame `month | total_dispensed` | Data aggregation ready |
| **4–6** | Hardcode mock monthly data (6 months) for 3 drugs in case Firestore logs are empty — fallback for early demo | Prediction works even with no real logs |
| **6–9** | `train_and_predict(drug_id)` — Linear Regression on monthly index, predict next month, add 20% buffer for `suggested_order` | Model predicts per drug |
| **6–9** | Fallback: if < 3 months data, return simple average × 1.2 with `confidence: "low"` | All drugs return a prediction |
| **9–11** | `routes/predict.py` — `GET /predict/<drug_id>` → calls `train_and_predict` → returns JSON with `predicted_next_month`, `suggested_order`, `confidence`, `trend` | API endpoint live |
| **11–14** | Test `/predict` with real drug IDs from Firestore — verify numbers are reasonable | Prediction verified |
| **14–17** | Add simple in-memory cache — skip retraining if same drug_id called within 1 hour | Performance improved |
| **14–17** | Error handling — 500 response with `{ success: false, error: "..." }` if anything fails | Backend robust |
| **17–21** | Help M5 debug Flask/Claude integration issues — review `/order` endpoint together | M5 unblocked |
| **17–21** | Write 2 pytest tests — one for `train_and_predict`, one for monthly aggregation | Tests passing |
| **21–24** | Deploy Flask to Railway → `Procfile: web: gunicorn app:app` → push to GitHub → connect Railway → get HTTPS URL | Flask live on Railway |

**Files to own:**
- `flask-backend/app.py`
- `flask-backend/routes/predict.py`
- `flask-backend/services/forecasting.py`
- `flask-backend/utils/firestore_client.py`
- `flask-backend/requirements.txt`
- `flask-backend/Procfile`

---

### 🧑‍💻 Member 5 — Agentic AI Ordering + Admin Dashboard + PDF Reports
> **Best suited for:** External APIs (Claude, Gmail), data visualization, PDF generation.

| ⏰ Hours | Task | Deliverable |
|---|---|---|
| **0–2** | Clone repo, install deps, get Anthropic API key, run `scripts/gmail_auth.py` to generate OAuth token, verify `token.pkl` saved | API keys + Gmail token ready |
| **2–4** | `email_composer.py` — Claude API call with drug/supplier/hospital prompt → returns professional email body string | Claude generates email in terminal |
| **2–4** | Test email composition with dummy drug data — verify output is a proper procurement letter | Email quality confirmed |
| **4–6** | `gmail_service.py` — load `token.pkl`, build Gmail service, `send_order_email(to, subject, body)` → sends email | Test email received in inbox |
| **6–9** | `routes/compose.py` — `POST /compose-email` → calls `email_composer.py` → returns email body (preview only, no send) | Preview endpoint working |
| **6–9** | `routes/order.py` — `POST /order` → compose email → send via Gmail → log to `/orders` collection in Firestore → return `{ success: true }` | Full order flow end-to-end |
| **9–11** | `OrderModal.jsx` — modal triggered by M3's "Order Now" button → shows supplier info, ML suggested qty (from M4's `/predict`), editable quantity input | Order modal renders |
| **9–11** | "Preview Email" button in modal → calls `POST /compose-email` → shows Claude-generated draft in modal | Email preview works |
| **11–14** | "Confirm & Send Order" button → calls `POST /order` → shows success toast → closes modal → updates alert status to "order_placed" | Full order UI flow demo-able |
| **11–14** | `useOrders.js` hook — `onSnapshot` on `/orders` collection | Order history live |
| **14–17** | Order History table on Admin page — Date, Drug, Supplier, Qty, Status columns | Order history page working |
| **17–21** | Admin Dashboard — Stock Trend line chart (Chart.js, top 5 drugs last 30 days), Expiry Risk pie chart (value at risk by bucket) | Admin charts rendering |
| **17–21** | `reportService.js` — jsPDF + jspdf-autotable → generate inventory PDF with drug table + date + hospital name | PDF downloads correctly |
| **17–21** | "Download Report" button on Admin page → calls `generateInventoryReport()` | PDF export working |
| **21–24** | Full order test on production URL — place order, verify email received, verify entry in Firestore `/orders` → prepare scripted demo | Production order flow verified |

**Files to own:**
- `flask-backend/routes/compose.py`
- `flask-backend/routes/order.py`
- `flask-backend/services/email_composer.py`
- `flask-backend/services/gmail_service.py`
- `flask-backend/scripts/gmail_auth.py`
- `src/components/OrderModal.jsx`
- `src/hooks/useOrders.js`
- `src/pages/admin/AdminDashboard.jsx`
- `src/pages/admin/OrderHistory.jsx`
- `src/pages/admin/Reports.jsx`
- `src/services/reportService.js`
- `src/components/charts/StockTrendChart.jsx`

---

## 🔗 Integration Points (Where Members Must Sync)

| Integration | From | To | Notes |
|---|---|---|---|
| Auth context used in all dashboards | M1 | M2, M3, M5 | M1 must finish `AuthContext` first — hard dependency |
| `currentStock` update feeds alert checks | M2 | M3 | M2 writes stock; M3 checks threshold |
| Dispensing logs feed ML model | M2 | M4 | M2 writes logs; M4 reads and trains on them |
| Alert card "Order Now" opens order modal | M3 | M5 | `AlertCard` triggers M5's `OrderModal` |
| ML prediction shown inside order modal | M4 | M5 | M5 calls M4's `/predict/<drug_id>` endpoint |

---

## ⏱️ 24-Hour Hackathon Execution Plan

> **This is a hackathon — 24 hours only. Every member works in parallel from Hour 0. Scope is ruthlessly cut to what can be demo-ready in time.**

---

### 🕐 Hour 0–2 | Phase 0: Full Team Setup (ALL MEMBERS)

> Everyone does this simultaneously. Do not skip any step.

| Member | Task |
|---|---|
| **M1** | `npm create vite@latest pharmacy-system -- --template react` → install all deps → create Firebase project → enable Firestore + Auth → copy `.env` keys |
| **M2** | Clone repo, install deps, create 3 test users in Firebase Auth (pharmacist / manager / admin) with roles in Firestore |
| **M3** | Clone repo, install deps, pre-seed Firestore manually with 5–6 sample drug docs + 2 batches each (use the CSV data) |
| **M4** | `python -m venv venv` → install Flask deps → create `app.py` with `/health` route → verify Flask runs on port 5000 |
| **M5** | Clone repo, install deps, get Anthropic API key ready, generate Gmail OAuth token locally, verify token works |

✅ **Hour 2 Checkpoint:** React app on `localhost:5173`, Flask on `localhost:5000`, Firebase connected, 3 roles exist in Firestore.

---

### 🕑 Hour 2–6 | Phase 1+2: Auth + Core Inventory (PARALLEL)

| Member | Task | Output |
|---|---|---|
| **M1** | `AuthContext.jsx` → login page → role-based routing → `ProtectedRoute.jsx` → Firestore security rules | Working login, 3 roles route to different pages |
| **M2** | Drug list page (read from Firestore) → Add Drug form → Add Batch form → `currentStock` calculation | Manager can add drugs + batches, stock shows live |
| **M3** | Alert threshold checker (`alertService.js`) → seed 2–3 open alerts in Firestore → `AlertCard.jsx` component | Alert cards render with severity colors |
| **M4** | `firestore_client.py` → read dispensing logs from Firestore → monthly aggregation function → hardcode mock data if Firestore empty | `/predict/<drug_id>` returns a number |
| **M5** | `email_composer.py` → test Claude API call with a dummy drug → verify email body is generated | Claude email draft prints in terminal |

✅ **Hour 6 Checkpoint:** Login works, drugs visible on Manager page, alerts render, `/predict` returns data, Claude email draft works.

---

### 🕕 Hour 6–11 | Phase 3+4+5: FEFO + Alerts Live + ML API (PARALLEL)

| Member | Task | Output |
|---|---|---|
| **M1** | Polish routing, fix any auth bugs, help M2/M3 with Firestore issues, set up CORS on Flask | All pages accessible correctly by role |
| **M2** | `fefoService.js` → sort batches by expiry → dispense transaction (atomic) → Pharmacist UI with FEFO card + confirm dispense button | Pharmacist can dispense; stock reduces in real time |
| **M3** | Hook up `useAlerts.js` real-time listener → wire alert card buttons (Dismiss / Order Now) → Manager Dashboard with summary cards + alerts panel | Live alerts on Manager dashboard |
| **M4** | Linear regression on monthly data → `/predict/<drug_id>` returns `predicted_next_month` + `suggested_order` + `confidence` | Prediction API working end-to-end |
| **M5** | `/order` Flask endpoint → compose email via Claude → send via Gmail API → log to Firestore `/orders` | Full order placed, email sent, logged in Firestore |

✅ **Hour 11 Checkpoint:** FEFO dispense works + stock updates, alerts live on dashboard, `/predict` returns real values, order email sent successfully.

---

### 🕙 Hour 11–17 | Phase 6+7: Dashboards + Order Flow UI (PARALLEL)

| Member | Task | Output |
|---|---|---|
| **M1** | Integrate ML prediction in frontend (`axios` call to `/predict`) → show prediction result in alert card | Prediction number visible in UI |
| **M2** | Dispensing log view for Pharmacist (last 20 dispenses) → stock badge colors (🟢🟡🔴) on drug list | Pharmacist sees their history |
| **M3** | Chart.js Expiry Timeline bar chart (batches expiring in 30/60/90 days) → Manager Dashboard complete | Manager dashboard fully built |
| **M4** | Add 1-hour prediction cache → add `/health` endpoint → write 2 pytest tests | Backend stable and tested |
| **M5** | Admin "Order Now" modal (editable qty + Preview Email + Confirm Send) → Order History table → wire to `/order` endpoint | Full order UI flow works end-to-end |

✅ **Hour 17 Checkpoint:** All 3 dashboards functional, order flow is demo-able end-to-end, charts rendering.

---

### 🕔 Hour 17–21 | Phase 7 Polish + Admin Dashboard (PARALLEL)

| Member | Task | Output |
|---|---|---|
| **M1** | Admin Dashboard KPI cards (total stock value, waste, orders placed, alerts resolved) | Admin sees live KPIs |
| **M2** | Fix any FEFO edge cases (exhausted batches, 0 stock scenarios) | FEFO is bulletproof |
| **M3** | Stock Trend line chart (Chart.js) on Admin dashboard → Expiry Risk pie chart | Admin charts working |
| **M4** | Help M5 debug any Flask/Claude issues → add error handling to Flask routes | Backend robust |
| **M5** | PDF export using jsPDF → drug inventory table in PDF → download button on Admin page | PDF downloads correctly |

✅ **Hour 21 Checkpoint:** Full demo flow works — login → dispense → alert → order → email sent → PDF downloaded.

---

### 🕘 Hour 21–24 | Final Integration + Demo Prep (ALL MEMBERS)

| Member | Task |
|---|---|
| **M1** | Deploy frontend to Firebase Hosting (`npm run build` + `firebase deploy`) → share live URL with team |
| **M2** | Full end-to-end test: add drug → add batch → dispense → verify stock drops → verify log written |
| **M3** | Full alert test: manually set stock below threshold → verify alert appears → dismiss → verify resolved |
| **M4** | Deploy Flask to Railway → update frontend `.env` with production Flask URL → rebuild + redeploy |
| **M5** | Full order test on production URL → verify email received → verify order in Firestore → prepare demo script |

✅ **Hour 24 — DEMO READY:**
- Live URL on Firebase Hosting
- Flask API on Railway/Cloud Run
- All 3 role dashboards working
- FEFO dispense → stock alert → AI order email → PDF report — full chain demo-able

---

## 🚨 Hackathon Survival Rules

| Rule | Detail |
|---|---|
| **M1 is unblocked first** | Everyone else depends on Auth — M1 must finish login + role routing by Hour 4 |
| **Use seeded data** | Don't wait for real dispensing history — M4 uses hardcoded mock monthly data for ML |
| **Cut scope, not quality** | If time is short: drop PDF export, drop Order History table — keep FEFO + alerts + 1 order working |
| **Single shared branch** | All members push to `main` — no feature branches, no PR reviews in a hackathon |
| **Sync at every checkpoint** | Hours 2, 6, 11, 17, 21 — quick 10-min team standup to unblock each other |
| **Demo the happy path only** | Prepare one scripted demo flow, don't freestyle during judging |

> ⚠️ **Critical:** M1 must finish `AuthContext.jsx` + Firebase config **by Hour 4** — this is a hard blocker for M2, M3, and M5. Everyone else works on backend/logic/seeding until then.
