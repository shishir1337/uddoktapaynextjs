import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const { invoice_id } = await req.json()

  try {
    const response = await axios.post(
      `${process.env.UDDOKTAPAY_BASE_URL}/api/verify-payment`,
      { invoice_id },
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
    console.error('Error verifying payment:', error)
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 })
  }
}