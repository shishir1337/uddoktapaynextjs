import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Cancelled</CardTitle>
        <CardDescription>Your payment was not completed.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">If you have any questions or concerns, please don't hesitate to contact our support team.</p>
      </CardContent>
      <CardFooter>
        <Link href="/" passHref>
          <Button className="w-full">Return to Course Listing</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}