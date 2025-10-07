import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FoodItemForm } from './FoodItemForm';
import type { FoodItem } from './ProfileDashboard';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface CategoryManagerProps {
  title: string;
  icon: React.ReactNode;
  items: FoodItem[];
  onItemsChange: (items: FoodItem[]) => void;
  placeholder: string;
}

export function CategoryManager({ 
  title, 
  icon, 
  items, 
  onItemsChange, 
  placeholder 
}: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  const handleAddItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem: FoodItem = {
      ...item,
      id: Date.now().toString()
    };
    onItemsChange([...items, newItem]);
    setShowForm(false);
  };

  const handleUpdateItem = (updatedItem: Omit<FoodItem, 'id'>) => {
    if (!editingItem) return;
    
    const updated = items.map(item =>
      item.id === editingItem.id
        ? { ...updatedItem, id: editingItem.id }
        : item
    );
    onItemsChange(updated);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const handleEditClick = (item: FoodItem) => {
    setEditingItem(item);
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            {icon}
            <span>{title}</span>
          </CardTitle>
          <Button 
            size="sm" 
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
            }}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showForm && (
          <FoodItemForm
            onSubmit={handleAddItem}
            onCancel={() => setShowForm(false)}
            placeholder={placeholder}
          />
        )}

        {editingItem && (
          <FoodItemForm
            initialItem={editingItem}
            onSubmit={handleUpdateItem}
            onCancel={() => setEditingItem(null)}
            placeholder={placeholder}
            isEditing
          />
        )}

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No {title.toLowerCase()} added yet. Click "Add" to get started!
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.notes}
                      </p>
                    )}
                    {item.preparationStyle && (
                      <p className="text-sm text-blue-600 mt-1">
                        Preferred preparation: {item.preparationStyle}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditClick(item)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteItem(item.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}