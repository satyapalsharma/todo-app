import React from 'react';
import './FilterControls.css'; // Import the CSS for styling filter controls

/**
 * FilterControls Component
 *
 * Renders a set of controls for filtering the todo list:
 * - A search input to filter todos by text.
 * - Buttons to filter todos by status (All, Active, Completed).
 * - A dropdown to filter todos by category (if categories are provided).
 *
 * @param {object} props - The component's properties.
 * @param {string} props.currentFilter - The currently active status filter ('All', 'Active', 'Completed').
 * @param {string} props.currentCategoryFilter - The currently active category filter (e.g., 'All' or a specific category name).
 * @param {string} props.searchTerm - The current search term entered by the user.
 * @param {string[]} props.categories - An array of available category names.
 * @param {(filter: string) => void} props.onFilterChange - Callback function to update the status filter.
 * @param {(category: string) => void} props.onCategoryFilterChange - Callback function to update the category filter.
 * @param {(term: string) => void} props.onSearchChange - Callback function to update the search term.
 */
function FilterControls({
  currentFilter,
  currentCategoryFilter,
  searchTerm,
  categories,
  onFilterChange,
  onCategoryFilterChange,
  onSearchChange,
}) {
  // Define the available status filters
  const statusFilters = ['All', 'Active', 'Completed'];

  return (
    <div className="filter-controls" aria-label="Todo list filters">
      {/* Search Input */}
      <div className="filter-group search-group">
        <label htmlFor="search-input" className="visually-hidden">Search Todos</label>
        <input
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search todos by keyword"
        />
      </div>

      {/* Status Filter Buttons */}
      <div className="filter-group status-filters" role="group" aria-label="Filter todos by status">
        {statusFilters.map((filter) => (
          <button
            key={filter}
            className={`filter-button ${currentFilter === filter ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
            aria-pressed={currentFilter === filter} // Indicate if the button is currently active
            aria-label={`Show ${filter} todos`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Category Filter Dropdown */}
      {/* Only render if categories are provided and there's at least one category */}
      {categories && categories.length > 0 && (
        <div className="filter-group category-filters">
          <label htmlFor="category-select" className="visually-hidden">Filter by Category</label>
          <select
            id="category-select"
            className="category-select"
            value={currentCategoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            aria-label="Filter todos by category"
          >
            <option value="All">All Categories</option> {/* Option to show all categories */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default FilterControls;