import { Link, useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
    const { id } = useParams();
    const recipeId = Number(id);
    const recipe = useRecipeStore((state) =>
        state.recipes.find((r) => r.id === recipeId)
    );

    if (!recipe) {
        return (
            <div className="not-found">
                <h2>Recipe not found</h2>
                <Link to="/" className="btn btn-secondary">← Back to Recipes</Link>
            </div>
        );
    }

    return (
        <div className="recipe-details">
            <Link to="/" className="back-link">← Back to Recipes</Link>
            <div className="recipe-details-card">
                <div className="details-header-row">
                    <h1>{recipe.title}</h1>
                    <FavoriteButton recipeId={recipe.id} />
                </div>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-actions">
                    <Link to={`/recipe/${recipe.id}/edit`} className="btn btn-primary">
                        ✏️ Edit Recipe
                    </Link>
                    <DeleteRecipeButton recipeId={recipe.id} />
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
