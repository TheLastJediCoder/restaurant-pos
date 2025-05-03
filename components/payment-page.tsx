'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { Order, type PaymentMethod } from '@/lib/types';

/**
 * PaymentPage component - Handles payment processing for orders
 */
export function PaymentPage({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [amountTendered, setAmountTendered] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      const data = await response.json();

      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  // In a real app, we would fetch the current order from context or API
  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId]);

  // Calculate change
  const calculateChange = () => {
    if (!order) return 0;

    const tendered = Number.parseFloat(amountTendered) || 0;
    return Math.max(0, tendered - order?.total);
  };

  // Handle payment processing
  const handleProcessPayment = async () => {
    if (!order) return;

    setIsProcessing(true);

    try {
      // Create order via API
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod: paymentMethod }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      } else {
        // Navigate back to the menu page
        router.push('/pos');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle numeric keypad input
  const handleKeypadInput = (value: string) => {
    if (value === 'clear') {
      setAmountTendered('');
    } else if (value === 'backspace') {
      setAmountTendered((prev) => prev.slice(0, -1));
    } else {
      setAmountTendered((prev) => {
        // Handle decimal point
        if (value === '.' && prev.includes('.')) {
          return prev;
        }

        // Limit to 2 decimal places
        const newValue = prev + value;
        const parts = newValue.split('.');
        if (parts.length > 1 && parts[1].length > 2) {
          return prev;
        }

        return newValue;
      });
    }
  };

  // Keypad buttons
  const keypadButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'backspace'];

  // Quick amount buttons
  const quickAmounts = [50, 100, 200, 500];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-4 h-[calc(100vh-4rem)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Payment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency((order?.total || 0) * 0.92)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tax (8.5%)</span>
                  <span>{formatCurrency((order?.total || 0) * 0.08)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-lg">{formatCurrency(order?.total || 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <Tabs
                defaultValue="Cash"
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="Cash">Cash</TabsTrigger>
                  <TabsTrigger value="Credit Card">Credit Card</TabsTrigger>
                  <TabsTrigger value="Mobile Payment">Mobile</TabsTrigger>
                </TabsList>
                <TabsContent value="Cash">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Amount Tendered</p>
                        <div className="text-2xl font-bold border p-2 rounded-md">
                          {amountTendered
                            ? formatCurrency(Number.parseFloat(amountTendered) || 0)
                            : '$0.00'}
                        </div>
                        <input
                          onKeyDown={(e) => handleKeypadInput(e.key.toLowerCase())}
                          ref={inputRef}
                          style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                        ></input>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Change</p>
                        <div className="text-2xl font-bold border p-2 rounded-md">
                          {formatCurrency(calculateChange())}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => setAmountTendered(amount.toString())}
                        >
                          {formatCurrency(amount)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Credit Card">
                  <div className="text-center p-4">
                    <p>Please swipe or insert card</p>
                  </div>
                </TabsContent>
                <TabsContent value="Mobile Payment">
                  <div className="text-center p-4">
                    <p>Scan QR code with mobile payment app</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-2">
                {keypadButtons.map((btn) => (
                  <Button
                    key={btn}
                    variant="outline"
                    className="h-16 text-xl"
                    onClick={() => handleKeypadInput(btn)}
                  >
                    {btn === 'backspace' ? '←' : btn}
                  </Button>
                ))}
                <Button
                  className="h-16 text-xl col-span-3"
                  onClick={() => handleKeypadInput('clear')}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline"
              size="lg"
              className="h-16"
              onClick={() => router.push('/pos')}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="h-16"
              disabled={
                isProcessing ||
                (paymentMethod === 'Cash' &&
                  (Number.parseFloat(amountTendered) || 0) < (order?.total || 0))
              }
              onClick={handleProcessPayment}
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
