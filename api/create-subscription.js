// api/create-subscription.js (SUPER SIMPLE DEBUG VERSION)

export default async function handler(req, res) {
  // Log all available environment variables on the server.
  // This will show us EVERYTHING Vercel is providing to the function.
  console.log("Vercel Environment Variables:", process.env);
  
  // Directly check for the specific keys we need.
  const secretKey = process.env.VITE_STRIPE_SECRET_KEY;
  const priceId = process.env.VITE_STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    // If either key is missing, send a clear error message.
    return res.status(500).json({ 
      error: "Server configuration error.",
      hasSecretKey: !!secretKey, // Will be true or false
      hasPriceId: !!priceId,   // Will be true or false
    });
  }

  // If the keys are found, just send a success message for now.
  // This proves the environment variables are being read correctly.
  return res.status(200).json({ 
    message: "Success! API keys found.",
    clientSecret: 'debug_secret_key_found' // Send a dummy secret
  });
}