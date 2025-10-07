import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import type { Restriction } from './ProfileDashboard';
import { AlertTriangle, Plus, Trash2, Edit2 } from 'lucide-react';

interface RestrictionsManagerProps {
  restrictions: Restriction[];
  onRestrictionsChange: (restrictions: Restriction[]) => void;
}

export function RestrictionsManager({ restrictions, onRestrictionsChange }: RestrictionsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingRestriction, setEditingRestriction] = useState<Restriction | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState<'allergy' | 'dietary' | 'preference'>('dietary');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');

  const resetForm = () => {
    setName('');
    setType('dietary');
    setSeverity('moderate');
    setShowForm(false);
    setEditingRestriction(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingRestriction) {
      // Update existing restriction
      const updated = restrictions.map(restriction =>
        restriction.id === editingRestriction.id
          ? { ...restriction, name: name.trim(), type, severity }
          : restriction
      );
      onRestrictionsChange(updated);
    } else {
      // Add new restriction
      const newRestriction: Restriction = {
        id: Date.now().toString(),
        name: name.trim(),
        type,
        severity
      };
      onRestrictionsChange([...restrictions, newRestriction]);
    }

    resetForm();
  };

  const handleEdit = (restriction: Restriction) => {
    setEditingRestriction(restriction);
    setName(restriction.name);
    setType(restriction.type);
    setSeverity(restriction.severity || 'moderate');
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    onRestrictionsChange(restrictions.filter(r => r.id !== id));
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'severe':
        return 'border-red-300 text-red-700 bg-red-50';
      case 'moderate':
        return 'border-orange-300 text-orange-700 bg-orange-50';
      case 'mild':
        return 'border-yellow-300 text-yellow-700 bg-yellow-50';
      default:
        return 'border-gray-300 text-gray-700 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'allergy':
        return '🚫';
      case 'dietary':
        return '🥗';
      case 'preference':
        return '💭';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Dietary Restrictions</span>
          </CardTitle>
          <Button 
            size="sm" 
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showForm && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="restriction-name">Restriction *</Label>
                <Input
                  id="restriction-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Peanuts, Dairy, Gluten..."
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={(value: any) => setType(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allergy">Allergy</SelectItem>
                      <SelectItem value="dietary">Dietary Choice</SelectItem>
                      <SelectItem value="preference">Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button type="submit" size="sm">
                  {editingRestriction ? 'Update' : 'Add'} Restriction
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {restrictions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No dietary restrictions added yet. Click "Add" to get started!
            </p>
          ) : (
            restrictions.map((restriction) => (
              <div 
                key={restriction.id} 
                className={`border rounded-lg p-4 ${getSeverityColor(restriction.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getTypeIcon(restriction.type)}</span>
                    <div>
                      <h4 className="font-medium">{restriction.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {restriction.type}
                        </Badge>
                        {restriction.severity && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs capitalize ${getSeverityColor(restriction.severity)}`}
                          >
                            {restriction.severity}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(restriction)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(restriction.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}