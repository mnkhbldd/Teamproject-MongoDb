import React from "react";

type Category = {
  _id: string;
  name: string;
  icons: string;
};

type CategoryFilterProps = {
  categories: Category[];
  value: string[];
  onChange: (newValue: string[]) => void;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  value,
  onChange,
}) => {
  const toggleSelect = (cat: Category) => {
    const newValue = value.includes(cat._id)
      ? value.filter((id) => id !== cat._id)
      : [...value, cat._id];
    onChange(newValue);
  };

  return (
    <div
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#e3e8ffe6 transparent",
        msOverflowStyle: "none",
      }}
      className="max-h-60 overflow-y-scroll grid grid-cols-2 gap-2"
    >
      {categories.length > 0 ? (
        categories.map((cat) => {
          const isSelected = value.includes(cat._id);
          return (
            <div
              key={cat._id}
              onClick={() => toggleSelect(cat)}
              className={`flex items-center gap-2 px-2 py-1 border rounded cursor-pointer transition hover:bg-blue-50 ${
                isSelected ? "bg-blue-100 border-blue-400" : "border-gray-200"
              }`}
            >
              <span className="text-lg">{cat.icons}</span>
              <span className="text-black">{cat.name}</span>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 col-span-2 text-center">
          No categories available
        </p>
      )}
    </div>
  );
};
