import React, { useState } from 'react';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(['Electronics', 'Fashion', 'Home & Garden']);
    // This is a placeholder for the actual category data fetching logic    
  return (
    <div>
      <h1>Category List</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;