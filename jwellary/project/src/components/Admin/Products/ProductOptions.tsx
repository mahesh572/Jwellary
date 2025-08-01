import React, { useState } from 'react';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  type: 'select' | 'radio' | 'checkbox' | 'text';
  values: string[];
  required: boolean;
  sortOrder: number;
}

const ProductOptions: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    {
      id: '1',
      name: 'Ring Size',
      type: 'select',
      values: ['5', '6', '7', '8', '9', '10', '11', '12'],
      required: true,
      sortOrder: 1,
    },
    {
      id: '2',
      name: 'Metal Type',
      type: 'radio',
      values: ['Gold', 'Silver', 'Platinum', 'Rose Gold'],
      required: true,
      sortOrder: 2,
    },
    {
      id: '3',
      name: 'Engraving',
      type: 'text',
      values: [],
      required: false,
      sortOrder: 3,
    },
    {
      id: '4',
      name: 'Gift Wrapping',
      type: 'checkbox',
      values: ['Standard Box', 'Premium Box', 'Gift Bag'],
      required: false,
      sortOrder: 4,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const [newOption, setNewOption] = useState<Partial<Option>>({
    name: '',
    type: 'select',
    values: [],
    required: false,
  });

  const handleAddOption = () => {
    if (newOption.name) {
      const option: Option = {
        id: Date.now().toString(),
        name: newOption.name,
        type: newOption.type || 'select',
        values: newOption.values || [],
        required: newOption.required || false,
        sortOrder: options.length + 1,
      };
      setOptions([...options, option]);
      setNewOption({ name: '', type: 'select', values: [], required: false });
      setShowAddModal(false);
    }
  };

  const handleDeleteOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const addValue = (optionId: string, value: string) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { ...option, values: [...option.values, value] }
        : option
    ));
  };

  const removeValue = (optionId: string, valueIndex: number) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { ...option, values: option.values.filter((_, i) => i !== valueIndex) }
        : option
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Product Options</h1>
          <p className="text-slate-600">Manage product customization options</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Option</span>
        </button>
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {options.map((option) => (
          <div key={option.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{option.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    option.type === 'select' ? 'bg-blue-100 text-blue-800' :
                    option.type === 'radio' ? 'bg-green-100 text-green-800' :
                    option.type === 'checkbox' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {option.type}
                  </span>
                  {option.required && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingOption(option)}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteOption(option.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {option.type !== 'text' && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">Values:</h4>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full group hover:bg-slate-200 transition-colors"
                    >
                      {value}
                      <button
                        onClick={() => removeValue(option.id, index)}
                        className="ml-2 text-slate-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {option.type === 'text' && (
              <div className="text-sm text-slate-600">
                Text input field for custom values
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Option Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Option</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Option Name
                </label>
                <input
                  type="text"
                  value={newOption.name || ''}
                  onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                  className="input-elegant"
                  placeholder="e.g., Ring Size, Metal Type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Option Type
                </label>
                <select
                  value={newOption.type || 'select'}
                  onChange={(e) => setNewOption({ ...newOption, type: e.target.value as Option['type'] })}
                  className="input-elegant"
                >
                  <option value="select">Dropdown Select</option>
                  <option value="radio">Radio Buttons</option>
                  <option value="checkbox">Checkboxes</option>
                  <option value="text">Text Input</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="required"
                  checked={newOption.required || false}
                  onChange={(e) => setNewOption({ ...newOption, required: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                />
                <label htmlFor="required" className="ml-2 text-sm text-slate-700">
                  Required field
                </label>
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
                onClick={handleAddOption}
                className="btn-primary"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Options Settings */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-800">Global Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Default Option Display
            </label>
            <select className="input-elegant">
              <option>Show all options expanded</option>
              <option>Show options collapsed</option>
              <option>Show required options only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Option Validation
            </label>
            <select className="input-elegant">
              <option>Validate on selection</option>
              <option>Validate on form submit</option>
              <option>No validation</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;