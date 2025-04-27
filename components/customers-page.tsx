'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OrderSidebar } from '@/components/order-sidebar';
import type { MenuItem, User } from '@/lib/types';

/**
 * CustomersPage component - Displays customer list and allows selecting a customer for an order
 */
export function CustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<{
    items: Array<{ menuItem: MenuItem; quantity: number; notes: string }>;
  }>({
    items: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers by search query
  const filteredCustomers = customers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle customer selection
  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomer(customerId === selectedCustomer ? null : customerId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>

        <div className="mb-4 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className={selectedCustomer === customer.id ? 'bg-muted/50' : undefined}
                >
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="capitalize">{customer.role}</TableCell>
                  <TableCell>
                    <Button
                      variant={selectedCustomer === customer.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleSelectCustomer(customer.id)}
                    >
                      {selectedCustomer === customer.id ? 'Selected' : 'Select'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {selectedCustomer && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{customers.find((user) => user.id === selectedCustomer)?.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>123 Main St, Anytown, USA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <OrderSidebar
        orderItems={currentOrder.items}
        updateQuantity={(menuItemId, quantity) => {
          setCurrentOrder((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
              item.menuItem.id === menuItemId ? { ...item, quantity } : item,
            ),
          }));
        }}
        updateNotes={(menuItemId, notes) => {
          setCurrentOrder((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
              item.menuItem.id === menuItemId ? { ...item, notes } : item,
            ),
          }));
        }}
        removeItem={(menuItemId) => {
          setCurrentOrder((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.menuItem.id !== menuItemId),
          }));
        }}
      />
    </div>
  );
}
