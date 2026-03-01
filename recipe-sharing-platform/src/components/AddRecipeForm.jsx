import React, { useState } from 'react';

const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!ingredients.trim()) {
            newErrors.ingredients = 'Ingredients are required';
        } else if (ingredients.split('\n').filter(i => i.trim()).length < 2) {
            newErrors.ingredients = 'Please provide at least two ingredients';
        }
        if (!steps.trim()) newErrors.steps = 'Preparation steps are required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form Submitted:', { title, ingredients, steps });
            // Reset form
            setTitle('');
            setIngredients('');
            setSteps('');
            setErrors({});
            alert('Recipe submitted successfully!');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add a New Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                            }`}
                        placeholder="e.g., Classic Lasagna"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Ingredients (one per line)</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        rows="4"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.ingredients ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                            }`}
                        placeholder="Ingredient 1&#10;Ingredient 2"
                    ></textarea>
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Preparation Steps</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        rows="5"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.steps ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                            }`}
                        placeholder="Describe the steps to prepare the recipe..."
                    ></textarea>
                    {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                >
                    Submit Recipe
                </button>
            </form>
        </div>
    );
};

export default AddRecipeForm;
