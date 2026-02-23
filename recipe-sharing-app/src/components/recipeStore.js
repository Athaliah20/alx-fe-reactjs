import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
    recipes: [],
    searchTerm: '',
    filterCriteria: 'title', // 'title' | 'description' | 'all'
    favorites: [],
    recommendations: [],

    // ── Core Recipe Actions ──────────────────────────────────
    addRecipe: (newRecipe) =>
        set((state) => ({ recipes: [...state.recipes, newRecipe] })),

    setRecipes: (recipes) => set({ recipes }),

    updateRecipe: (updatedRecipe) =>
        set((state) => ({
            recipes: state.recipes.map((recipe) =>
                recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
            ),
        })),

    deleteRecipe: (id) =>
        set((state) => ({
            recipes: state.recipes.filter((recipe) => recipe.id !== id),
        })),

    // ── Search & Filter Actions ──────────────────────────────
    setSearchTerm: (term) => set({ searchTerm: term }),

    setFilterCriteria: (criteria) => set({ filterCriteria: criteria }),

    // ── Derived: computed on read (no stale data) ────────────
    getFilteredRecipes: () => {
        const { recipes, searchTerm, filterCriteria } = get();
        if (!searchTerm.trim()) return recipes;
        const term = searchTerm.toLowerCase();
        return recipes.filter((recipe) => {
            if (filterCriteria === 'title') {
                return recipe.title.toLowerCase().includes(term);
            }
            if (filterCriteria === 'description') {
                return recipe.description?.toLowerCase().includes(term);
            }
            // 'all': search across both fields
            return (
                recipe.title.toLowerCase().includes(term) ||
                recipe.description?.toLowerCase().includes(term)
            );
        });
    },

    // ── Favorites Actions ────────────────────────────────────
    addFavorite: (recipeId) =>
        set((state) => {
            if (state.favorites.includes(recipeId)) return state;
            return { favorites: [...state.favorites, recipeId] };
        }),

    removeFavorite: (recipeId) =>
        set((state) => ({
            favorites: state.favorites.filter((id) => id !== recipeId),
        })),

    // ── Recommendations Actions ──────────────────────────────
    generateRecommendations: () =>
        set((state) => {
            if (state.favorites.length === 0) {
                return { recommendations: [] };
            }
            // Mock implementation: recommend un-favorited recipes randomly
            const recommended = state.recipes.filter(
                (recipe) => !state.favorites.includes(recipe.id) && Math.random() > 0.5
            );
            return { recommendations: recommended };
        }),
}));

export { useRecipeStore };
