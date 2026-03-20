import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import stripe
import motor.motor_async_backend
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

# --- INITIALIZATION ---
app = FastAPI()

# Stripe Keys (Get these from your Stripe Dashboard)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
APP_PRICE_ID = "price_H17_RECURRING"  # Replace with your $17.00 Price ID
CONSOLE_PRICE_ID = "price_MAJOR_CONSOLE" # Replace with your Major Console Price ID

# MongoDB Setup
MONGODB_URL = os.getenv("MONGODB_URL")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.oceantidedrop

# CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this to your domains for production
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class SubscriptionRequest(BaseModel):
    email: str
    tier: str # "app" or "console"

# --- ROUTES ---

@app.get("/")
async def root():
    return {"status": "Ocean Tide Ops Online", "mode": "Command Center"}

@app.post("/api/create-subscription")
async def create_subscription(data: SubscriptionRequest):
    try:
        # 1. Determine the Price ID based on the tier
        target_price = APP_PRICE_ID if data.tier == "app" else CONSOLE_PRICE_ID
        
        # 2. Create or find the Stripe Customer
        customer = stripe.Customer.create(email=data.email)
        
        # 3. Initialize the Subscription
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": target_price}],
            payment_behavior="default_incomplete",
            payment_settings={"save_default_payment_method": "on_subscription"},
            expand=["latest_invoice.payment_intent"],
        )
        
        # 4. Log the intent in MongoDB for you and your daughter to track
        await db.subscriptions.insert_one({
            "email": data.email,
            "stripe_id": subscription.id,
            "tier": data.tier,
            "status": "pending"
        })

        return {
            "subscriptionId": subscription.id,
            "clientSecret": subscription.latest_invoice.payment_intent.client_secret,
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- WEBHOOKS (Crucial for Recurring) ---
@app.post("/api/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv("STRIPE_WEBHOOK_SECRET")
        )
    except Exception as e:
        return {"error": str(e)}

    # Handle successful payment
    if event['type'] == 'invoice.paid':
        # This is where the $17 or Major Console payment hits your bank
        # Update your MongoDB user to "Active" here
        pass

    return {"status": "success"}
