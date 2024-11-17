import { NextResponse } from 'next/server'
import axios from 'axios'
import { getGbpToBdtRate, convertGbpToBdt } from '@/utils/currency'

export async function POST(req: Request) {
  const { courseId, amount, fullName, email, address } = await req.json()

  try {
    const exchangeRate = await getGbpToBdtRate()
    const bdtAmount = convertGbpToBdt(amount, exchangeRate)

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
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment-webhook`,
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