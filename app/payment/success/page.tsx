import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Successful!</CardTitle>
        <CardDescription>Thank you for your purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">You can now access your course. We've sent you an email with further instructions.</p>
      </CardContent>
      <CardFooter>
        <Link href="/" passHref>
          <Button className="w-full">Return to Course Listing</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}