const Sidebar = ({ categories, setSelectedCategory }) => {
  return (
    <div className="bg-gray-800 text-white w-full md:w-1/4 p-4">
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className="block w-full text-left p-2 rounded hover:bg-gray-700"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar