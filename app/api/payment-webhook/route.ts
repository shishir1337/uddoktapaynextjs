import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const apiKey = req.headers.get('RT-UDDOKTAPAY-API-KEY')

  if (apiKey !== process.env.UDDOKTAPAY_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await req.json()

  // Process the webhook payload
  console.log('Received webhook:', payload)

  // Here you would typically update your database to mark the course as purchased
  // For example:
  // await db.courses.updatePurchaseStatus(payload.metadata.course_id, payload.status)

  // Log the original GBP amount and exchange rate used
  console.log('Original GBP amount:', payload.metadata.gbp_amount)
  console.log('Exchange rate used:', payload.metadata.exchange_rate)

  // Implement your business logic here based on the payment status
  if (payload.status === 'COMPLETED') {
    // Process successful payment
    // For example, grant access to the course, send confirmation email, etc.
  } else if (payload.status === 'PENDING') {
    // Handle pending payment
  } else {
    // Handle failed payment
  }

  return NextResponse.json({ success: true })
}