import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
    const favorites = useRecipeStore((state) => state.favorites);
    const addFavorite = useRecipeStore((state) => state.addFavorite);
    const removeFavorite = useRecipeStore((state) => state.removeFavorite);

    const isFavorite = favorites.includes(recipeId);

    const toggleFavorite = (e) => {
        // Prevent event propagation if this is inside a link or card
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    return (
        <button
            className={`btn-favorite ${isFavorite ? 'favorite-active' : ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
};

export default FavoriteButton;
