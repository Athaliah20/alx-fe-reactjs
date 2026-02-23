import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipeId }) => {
    const recipe = useRecipeStore((state) =>
        state.recipes.find((r) => r.id === recipeId)
    );
    const updateRecipe = useRecipeStore((state) => state.updateRecipe);
    const navigate = useNavigate();

    const [title, setTitle] = useState(recipe?.title || '');
    const [description, setDescription] = useState(recipe?.description || '');

    if (!recipe) {
        return <p className="error-message">Recipe not found.</p>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        updateRecipe({ ...recipe, title, description });
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <form className="add-recipe-form" onSubmit={handleSubmit}>
            <h2>Edit Recipe</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Recipe Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Recipe Description"
                rows={4}
            />
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    💾 Save Changes
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(`/recipe/${recipeId}`)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditRecipeForm;
