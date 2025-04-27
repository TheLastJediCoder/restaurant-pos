import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryManagement } from '@/components/category-management';
import { MenuItemManagement } from '@/components/menu-item-management';

export default function ManagementPage() {
  return (
    <div className="p-4 h-[calc(100vh-4rem)] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-0">
          <CategoryManagement />
        </TabsContent>

        <TabsContent value="menu-items" className="mt-0">
          <MenuItemManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
