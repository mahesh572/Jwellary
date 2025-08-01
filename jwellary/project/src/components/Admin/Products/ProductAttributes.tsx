import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Hash, Type, Calendar } from 'lucide-react';

interface Attribute {
  id: string;
  name: string;
  slug: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean' | 'date';
  values: string[];
  isRequired: boolean;
  isFilterable: boolean;
  sortOrder: number;
  description?: string;
}

const ProductAttributes: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: '1',
      name: 'Material',
      slug: 'material',
      type: 'select',
      values: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'],
      isRequired: true,
      isFilterable: true,
      sortOrder: 1,
      description: 'Primary material used in the jewelry piece',
    },
    {
      id: '2',
      name: 'Gemstone',
      slug: 'gemstone',
      type: 'multiselect',
      values: ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Amethyst', 'Topaz'],
      isRequired: false,
      isFilterable: true,
      sortOrder: 2,
      description: 'Gemstones featured in the piece',
    },
    {
      id: '3',
      name: 'Carat Weight',
      slug: 'carat_weight',
      type: 'number',
      values: [],
      isRequired: false,
      isFilterable: true,
      sortOrder: 3,
      description: 'Total carat weight of gemstones',
    },
    {
      id: '4',
      name: 'Certification',
      slug: 'certification',
      type: 'boolean',
      values: [],
      isRequired: false,
      isFilterable: true,
      sortOrder: 4,
      description: 'Whether the piece comes with certification',
    },
    {
      id: '5',
      name: 'Collection',
      slug: 'collection',
      type: 'select',
      values: ['Classic', 'Modern', 'Vintage', 'Contemporary', 'Art Deco'],
      isRequired: false,
      isFilterable: true,
      sortOrder: 5,
      description: 'Design collection the piece belongs to',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);
  const [newAttribute, setNewAttribute] = useState<Partial<Attribute>>({
    name: '',
    type: 'text',
    values: [],
    isRequired: false,
    isFilterable: false,
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type size={16} />;
      case 'number': return <Hash size={16} />;
      case 'date': return <Calendar size={16} />;
      default: return <Tag size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'select': return 'bg-purple-100 text-purple-800';
      case 'multiselect': return 'bg-pink-100 text-pink-800';
      case 'boolean': return 'bg-orange-100 text-orange-800';
      case 'date': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleAddAttribute = () => {
    if (newAttribute.name) {
      const attribute: Attribute = {
        id: Date.now().toString(),
        name: newAttribute.name,
        slug: newAttribute.name.toLowerCase().replace(/\s+/g, '_'),
        type: newAttribute.type || 'text',
        values: newAttribute.values || [],
        isRequired: newAttribute.isRequired || false,
        isFilterable: newAttribute.isFilterable || false,
        sortOrder: attributes.length + 1,
        description: newAttribute.description,
      };
      setAttributes([...attributes, attribute]);
      setNewAttribute({ name: '', type: 'text', values: [], isRequired: false, isFilterable: false });
      setShowAddModal(false);
    }
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };

  const addAttributeValue = (attributeId: string, value: string) => {
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? { ...attr, values: [...attr.values, value] }
        : attr
    ));
  };

  const removeAttributeValue = (attributeId: string, valueIndex: number) => {
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? { ...attr, values: attr.values.filter((_, i) => i !== valueIndex) }
        : attr
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Product Attributes</h1>
          <p className="text-slate-600">Define product characteristics and specifications</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Attribute</span>
        </button>
      </div>

      {/* Attributes List */}
      <div className="space-y-4">
        {attributes.map((attribute) => (
          <div key={attribute.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">{attribute.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(attribute.type)}`}>
                    {getTypeIcon(attribute.type)}
                    <span className="ml-1">{attribute.type}</span>
                  </span>
                  {attribute.isRequired && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      Required
                    </span>
                  )}
                  {attribute.isFilterable && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Filterable
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 mb-3">{attribute.description}</p>
                <p className="text-xs text-slate-500 mb-3">Slug: {attribute.slug}</p>

                {(attribute.type === 'select' || attribute.type === 'multiselect') && attribute.values.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Values:</h4>
                    <div className="flex flex-wrap gap-2">
                      {attribute.values.map((value, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full group hover:bg-slate-200 transition-colors"
                        >
                          {value}
                          <button
                            onClick={() => removeAttributeValue(attribute.id, index)}
                            className="ml-2 text-slate-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setEditingAttribute(attribute)}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteAttribute(attribute.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Attribute Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Attribute</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Attribute Name *
                </label>
                <input
                  type="text"
                  value={newAttribute.name || ''}
                  onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                  className="input-elegant"
                  placeholder="e.g., Material, Gemstone, Carat Weight"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newAttribute.description || ''}
                  onChange={(e) => setNewAttribute({ ...newAttribute, description: e.target.value })}
                  className="input-elegant"
                  rows={2}
                  placeholder="Brief description of this attribute"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Attribute Type *
                </label>
                <select
                  value={newAttribute.type || 'text'}
                  onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value as Attribute['type'] })}
                  className="input-elegant"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Single Select</option>
                  <option value="multiselect">Multi Select</option>
                  <option value="boolean">Yes/No</option>
                  <option value="date">Date</option>
                </select>
              </div>

              {(newAttribute.type === 'select' || newAttribute.type === 'multiselect') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Predefined Values
                  </label>
                  <textarea
                    value={newAttribute.values?.join('\n') || ''}
                    onChange={(e) => setNewAttribute({ 
                      ...newAttribute, 
                      values: e.target.value.split('\n').filter(v => v.trim()) 
                    })}
                    className="input-elegant"
                    rows={4}
                    placeholder="Enter each value on a new line"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newAttribute.isRequired || false}
                    onChange={(e) => setNewAttribute({ ...newAttribute, isRequired: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                  />
                  <label htmlFor="required" className="ml-2 text-sm text-slate-700">
                    Required field
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="filterable"
                    checked={newAttribute.isFilterable || false}
                    onChange={(e) => setNewAttribute({ ...newAttribute, isFilterable: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                  />
                  <label htmlFor="filterable" className="ml-2 text-sm text-slate-700">
                    Use in product filters
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAttribute}
                className="btn-primary"
              >
                Add Attribute
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attribute Usage Stats */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Attribute Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-800">{attributes.length}</div>
            <div className="text-sm text-slate-600">Total Attributes</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-800">
              {attributes.filter(attr => attr.isRequired).length}
            </div>
            <div className="text-sm text-slate-600">Required Attributes</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-800">
              {attributes.filter(attr => attr.isFilterable).length}
            </div>
            <div className="text-sm text-slate-600">Filterable Attributes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAttributes;