'use client';

import { PaymentPage } from "@/components/payment-page"

export default async function PaymentPagePos({ params }: { params: { id: string } }) {
  return <PaymentPage orderId={params.id}/>
}
