import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
    const searchTerm = useRecipeStore((state) => state.searchTerm);
    const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
    const filterCriteria = useRecipeStore((state) => state.filterCriteria);
    const setFilterCriteria = useRecipeStore((state) => state.setFilterCriteria);

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        className="search-clear"
                        onClick={() => setSearchTerm('')}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            <div className="filter-chips">
                <span className="filter-label">Search in:</span>
                {['title', 'description', 'all'].map((criteria) => (
                    <button
                        key={criteria}
                        className={`chip ${filterCriteria === criteria ? 'chip-active' : ''}`}
                        onClick={() => setFilterCriteria(criteria)}
                    >
                        {criteria === 'all' ? '✦ All Fields' : criteria === 'title' ? '📌 Title' : '📝 Description'}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
