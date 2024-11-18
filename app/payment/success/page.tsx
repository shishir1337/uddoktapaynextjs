'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Clock } from "lucide-react"
import Link from 'next/link'

interface PaymentDetails {
  full_name: string
  email: string
  amount: string
  fee: string
  charged_amount: string
  invoice_id: string
  metadata: {
    course_id: string
    gbp_amount: number
    exchange_rate: number
    address: string
  }
  payment_method: string
  sender_number: string
  transaction_id: string
  date: string
  status: string
}

export default function PaymentSuccessPage() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const invoiceId = searchParams.get('invoice_id')

  useEffect(() => {
    if (invoiceId) {
      verifyPayment(invoiceId)
    }
  }, [invoiceId])

  async function verifyPayment(invoiceId: string) {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoice_id: invoiceId }),
      })
      const data = await response.json()
      setPaymentDetails(data)
    } catch (error) {
      console.error('Error verifying payment:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Verifying Payment</CardTitle>
          <CardDescription>Please wait while we verify your payment details...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Clock className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!paymentDetails) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-destructive">Payment Verification Failed</CardTitle>
          <CardDescription>We couldn't verify your payment details. Please contact support.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/" passHref>
            <Button className="w-full">Return to Course Listing</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Payment Successful!</CardTitle>
        <CardDescription>Thank you for your purchase. Your payment has been processed successfully.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Customer Details</h3>
            <div className="rounded-lg border p-3">
              <p className="font-medium">{paymentDetails.full_name}</p>
              <p className="text-sm text-muted-foreground">{paymentDetails.email}</p>
              <p className="text-sm text-muted-foreground">{paymentDetails.metadata.address}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Payment Details</h3>
            <div className="rounded-lg border p-3">
              <p className="font-medium">Transaction ID: {paymentDetails.transaction_id}</p>
              <p className="text-sm text-muted-foreground">Method: {paymentDetails.payment_method}</p>
              <p className="text-sm text-muted-foreground">Sender: {paymentDetails.sender_number}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Amount Details</h3>
          <div className="rounded-lg border p-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Original Amount (GBP)</p>
                <p className="font-medium">£{paymentDetails.metadata.gbp_amount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid Amount (BDT)</p>
                <p className="font-medium">৳{paymentDetails.amount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Exchange Rate</p>
                <p className="font-medium">1 GBP = ৳{paymentDetails.metadata.exchange_rate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fee</p>
                <p className="font-medium">৳{paymentDetails.fee}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Transaction Information</h3>
          <div className="rounded-lg border p-3">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Invoice ID</p>
                <p className="font-medium">{paymentDetails.invoice_id}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(paymentDetails.date).toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium text-primary">{paymentDetails.status}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button asChild className="w-full">
          <Link href="/">Return to Course Listing</Link>
        </Button>
        <Button variant="outline" className="w-full">
          Download Receipt
        </Button>
      </CardFooter>
    </Card>
  )
}