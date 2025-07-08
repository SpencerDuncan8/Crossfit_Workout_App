// api/webhook-simple.js
// Simple test to check if Stripe can reach our endpoint at all

export default function handler(req, res) {
  console.log('=== SIMPLE WEBHOOK HIT! ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('All headers:', JSON.stringify(req.headers, null, 2));
  
  // Log if this looks like a Stripe request
  const isStripe = req.headers['user-agent']?.includes('Stripe') || 
                   req.headers['stripe-signature'];
  console.log('Looks like Stripe request:', isStripe);
  
  if (req.method === 'POST') {
    console.log('POST request received - this should be from Stripe!');
  } else {
    console.log('Non-POST request - probably manual test');
  }
  
  res.status(200).json({ 
    message: 'Simple webhook working!',
    method: req.method,
    timestamp: new Date().toISOString(),
    isStripe: isStripe
  });
}