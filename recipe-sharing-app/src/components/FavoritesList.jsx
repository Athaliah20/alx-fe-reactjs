import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import FavoriteButton from './FavoriteButton';

const FavoritesList = () => {
    const favorites = useRecipeStore((state) =>
        state.favorites.map((id) => state.recipes.find((recipe) => recipe.id === id)).filter(Boolean)
    );

    if (favorites.length === 0) {
        return (
            <div className="favorites-list empty">
                <h3>My Favorites</h3>
                <p className="empty-message">You have no favorite recipes yet.</p>
            </div>
        );
    }

    return (
        <div className="favorites-list">
            <h3>My Favorites ({favorites.length})</h3>
            <div className="recipe-list small-list">
                {favorites.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={`fav-${recipe.id}`} className="recipe-card-link">
                        <div className="recipe-card small-card">
                            <div className="card-header-row">
                                <h4>{recipe.title}</h4>
                                <FavoriteButton recipeId={recipe.id} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
