import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const foundRecipe = recipeData.find((r) => r.id === parseInt(id));
        setRecipe(foundRecipe);
    }, [id]);

    if (!recipe) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600 italic">Recipe not found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 md:h-96 object-cover"
                />
                <div className="p-6 md:p-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                        {recipe.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium border-l-4 border-indigo-500 pl-4">
                        {recipe.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-200 pb-2">
                                Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {/* Mock ingredients since data.json doesn't have them yet */}
                                {['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'].map((ing, idx) => (
                                    <li key={idx} className="flex items-center text-gray-700">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">
                                Instructions
                            </h2>
                            <ol className="space-y-4">
                                {/* Mock instructions since data.json doesn't have them yet */}
                                {[
                                    'Step 1: Lorem ipsum dolor sit amet.',
                                    'Step 2: Consectetur adipiscing elit.',
                                    'Step 3: Sed do eiusmod tempor incididunt.'
                                ].map((step, idx) => (
                                    <li key={idx} className="flex text-gray-700">
                                        <span className="font-bold text-indigo-600 mr-3">{idx + 1}.</span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
