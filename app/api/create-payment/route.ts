import { NextResponse } from 'next/server'
import axios from 'axios'
import { getGbpToBdtRate, convertGbpToBdt } from '@/utils/currency'

export async function POST(req: Request) {
  const { courseId, amount, fullName, email, address } = await req.json()

  try {
    const exchangeRate = await getGbpToBdtRate()
    const bdtAmount = convertGbpToBdt(amount, exchangeRate)

    // Ensure the redirect URL includes the port number
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://59ca-103-72-212-116.ngrok-free.app'
    const redirectUrl = new URL('/payment/success', appUrl).toString()

    const response = await axios.post(
      `${process.env.UDDOKTAPAY_BASE_URL}/api/checkout-v2`,
      {
        full_name: fullName,
        email: email,
        amount: bdtAmount.toString(),
        metadata: {
          course_id: courseId,
          gbp_amount: amount,
          exchange_rate: exchangeRate,
          address: address,
        },
        redirect_url: redirectUrl,
        cancel_url: `${appUrl}/payment/cancel`,
        webhook_url: `${appUrl}/api/payment-webhook`,
        return_type: "GET",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'RT-UDDOKTAPAY-API-KEY': process.env.UDDOKTAPAY_API_KEY,
        },
      }
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}