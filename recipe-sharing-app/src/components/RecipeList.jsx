import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
    const searchTerm = useRecipeStore((state) => state.searchTerm);
    const getFilteredRecipes = useRecipeStore((state) => state.getFilteredRecipes);
    const totalRecipes = useRecipeStore((state) => state.recipes.length);

    const filtered = getFilteredRecipes();

    return (
        <div className="recipe-list">
            {/* Result count badge when searching */}
            {searchTerm && (
                <p className="search-results-count">
                    {filtered.length === 0
                        ? 'No recipes match your search.'
                        : `${filtered.length} of ${totalRecipes} recipe${totalRecipes !== 1 ? 's' : ''} found`}
                </p>
            )}

            {totalRecipes === 0 ? (
                <p className="empty-message">No recipes yet. Add one above!</p>
            ) : filtered.length === 0 ? (
                <p className="empty-message">No recipes match "{searchTerm}". Try a different search.</p>
            ) : (
                filtered.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card-link">
                        <div className="recipe-card">
                            <div className="card-header-row">
                                <h3>{recipe.title}</h3>
                                <FavoriteButton recipeId={recipe.id} />
                            </div>
                            <p>{recipe.description}</p>
                            <span className="view-details">View Details →</span>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default RecipeList;
