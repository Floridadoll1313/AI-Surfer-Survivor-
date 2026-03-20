# In your main.py

@app.post("/api/create-subscription")
async def create_app_subscription(email: str, price_id: str):
    # price_id would be the unique ID from Stripe for the $17.00 product
    try:
        # Create a new customer in Stripe
        customer = stripe.Customer.create(email=email)
        
        # Create the $17.00/mo subscription
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": price_id}], # This is the key for recurring billing
            payment_behavior="default_incomplete",
            expand=["latest_invoice.payment_intent"],
        )
        
        return {
            "subscriptionId": subscription.id,
            "clientSecret": subscription.latest_invoice.payment_intent.client_secret,
        }
    except Exception as e:
        return {"error": str(e)}
