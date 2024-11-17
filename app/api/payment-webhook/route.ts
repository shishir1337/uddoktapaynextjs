import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get('RT-UDDOKTAPAY-API-KEY')

    if (apiKey !== process.env.UDDOKTAPAY_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await req.json()

    // Process the webhook payload
    console.log('Received webhook:', payload)

    // Extracting relevant data
    const courseId = payload?.metadata?.course_id
    const gbpAmount = payload?.metadata?.gbp_amount
    const exchangeRate = payload?.metadata?.exchange_rate
    const status = payload?.status

    if (!courseId || !status) {
      return NextResponse.json(
        { error: 'Invalid payload: Missing required fields' },
        { status: 400 }
      )
    }

    // Log the original GBP amount and exchange rate used
    console.log('Original GBP amount:', gbpAmount)
    console.log('Exchange rate used:', exchangeRate)

    // Example: Update the course purchase status in your database
    // Replace this with your database logic
    try {
      // await db.courses.updatePurchaseStatus(courseId, status)
      console.log(`Course ID ${courseId} marked as ${status}`)
    } catch (dbError) {
      console.error('Database update error:', dbError)
      return NextResponse.json(
        { error: 'Failed to update course purchase status' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
