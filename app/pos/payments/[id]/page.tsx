'use client';

import { PaymentPage } from '@/components/payment-page';
import React from 'react';

export default function PaymentPagePos({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return <PaymentPage orderId={id} />;
}
