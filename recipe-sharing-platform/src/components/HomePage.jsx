import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // In a real app, this would be an API call
        setRecipes(recipeData);
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Recipe Sharing Platform</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{recipe.summary}</p>
                            <Link
                                to={`/recipe/${recipe.id}`}
                                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                            >
                                View Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
