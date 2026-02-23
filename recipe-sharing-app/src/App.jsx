import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import './App.css';

function HomePage() {
  return (
    <>
      <AddRecipeForm />
      <div className="home-content">
        <div className="main-feed">
          <section className="recipes-section">
            <div className="recipes-section-header">
              <h2>Recipes</h2>
            </div>
            <SearchBar />
            <RecipeList />
          </section>
        </div>
        <div className="sidebar">
          <FavoritesList />
          <RecommendationsList />
        </div>
      </div>
    </>
  );
}

function EditRecipeWrapper() {
  const { id } = useParams();
  return <EditRecipeForm recipeId={Number(id)} />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>🍽️ Recipe Sharing App</h1>
          <p>Share your favorite recipes with the world</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/recipe/:id/edit" element={<EditRecipeWrapper />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
