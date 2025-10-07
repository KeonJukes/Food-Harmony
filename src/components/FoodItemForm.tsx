import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import type { FoodItem } from './ProfileDashboard';
import { X, Plus } from 'lucide-react';

interface FoodItemFormProps {
  initialItem?: FoodItem;
  onSubmit: (item: Omit<FoodItem, 'id'>) => void;
  onCancel: () => void;
  placeholder: string;
  isEditing?: boolean;
}

export function FoodItemForm({ 
  initialItem, 
  onSubmit, 
  onCancel, 
  placeholder, 
  isEditing = false 
}: FoodItemFormProps) {
  const [name, setName] = useState(initialItem?.name || '');
  const [notes, setNotes] = useState(initialItem?.notes || '');
  const [preparationStyle, setPreparationStyle] = useState(initialItem?.preparationStyle || '');
  const [tags, setTags] = useState<string[]>(initialItem?.tags || []);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      notes: notes.trim() || undefined,
      preparationStyle: preparationStyle.trim() || undefined,
      tags
    });

    // Reset form
    setName('');
    setNotes('');
    setPreparationStyle('');
    setTags([]);
    setNewTag('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={placeholder}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special notes or preferences..."
            className="mt-1"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="preparation">Preparation Style</Label>
          <Input
            id="preparation"
            value={preparationStyle}
            onChange={(e) => setPreparationStyle(e.target.value)}
            placeholder="e.g., grilled, steamed, raw..."
            className="mt-1"
          />
        </div>

        <div>
          <Label>Tags</Label>
          <div className="mt-1 space-y-2">
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                size="sm"
                variant="outline"
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button type="submit" size="sm">
            {isEditing ? 'Update' : 'Add'} Item
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}