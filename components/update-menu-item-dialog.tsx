'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Category, MenuItem } from '@/lib/types';

interface UpdateMenuItemDialogProps {
  menuItem: MenuItem;
  onMenuitemUpdated: (arg1: MenuItem) => void;
}

export function UpdateMenuItemDialog({ menuItem, onMenuitemUpdated }: UpdateMenuItemDialogProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const setForm = (menuItem: MenuItem) => {
    setName(menuItem.name);
    setDescription(menuItem.description);
    setPrice(menuItem.price.toString());
    setCategoryId(menuItem.categoryId);
  };

  // Fetch categories when dialog opens
  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);

      // Set default category if available
      if (data.length > 0 && !categoryId) {
        setCategoryId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Menu item name is required',
        variant: 'destructive',
      });
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Price must be a positive number',
        variant: 'destructive',
      });
      return;
    }

    if (!categoryId) {
      toast({
        title: 'Validation Error',
        description: 'Please select a category',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      if (name !== menuItem.name) {
        formData.append('name', name);
      }

      if (parseInt(price) !== menuItem.price) {
        formData.append('price', price);
      }

      if (categoryId !== menuItem.categoryId) {
        formData.append('categoryId', categoryId);
      }

      if (description) {
        formData.append('description', description);
      }

      if (file) {
        formData.append('file', file);
      }

      const response = await fetch(`/api/menu-items/${menuItem.id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update menu item');
      }

      const data = await response.json();

      toast({
        title: 'Success',
        description: 'Menu item updated successfully',
      });

      // Reset form
      setName('');
      setPrice('');
      setDescription('');

      // Close dialog
      setOpen(false);

      // Notify parent component
      onMenuitemUpdated(data);
    } catch (error) {
      console.error('Error creating menu item:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update menu item',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setForm(menuItem)}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Menu Item</DialogTitle>
            <DialogDescription>Update menu item. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Spaghetti Carbonara"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 12.99"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Select value={categoryId} onValueChange={setCategoryId} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Brief description of this menu item"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="col-span-3"
              placeholder="Image of this menu item"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting ? 'Updating...' : 'Update Menu Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
