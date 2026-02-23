import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import { useEffect } from 'react';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = () => {
    const recommendations = useRecipeStore((state) => state.recommendations);
    const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
    const favorites = useRecipeStore((state) => state.favorites);

    // Regenerate recommendations whenever favorites change
    useEffect(() => {
        generateRecommendations();
    }, [favorites, generateRecommendations]);

    if (favorites.length === 0) {
        return null; // hide if no favorites
    }

    return (
        <div className="recommendations-list">
            <h3>Recommended for You</h3>
            {recommendations.length === 0 ? (
                <p className="empty-message">No new recommendations right now.</p>
            ) : (
                <div className="recipe-list small-list">
                    {recommendations.map((recipe) => (
                        <Link to={`/recipe/${recipe.id}`} key={`rec-${recipe.id}`} className="recipe-card-link">
                            <div className="recipe-card small-card">
                                <div className="card-header-row">
                                    <h4>{recipe.title}</h4>
                                    <FavoriteButton recipeId={recipe.id} />
                                </div>
                                <p className="card-excerpt">
                                    {recipe.description?.substring(0, 50)}...
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendationsList;
