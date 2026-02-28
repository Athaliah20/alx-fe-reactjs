import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-2">
          GitHub Explorer
        </h1>
        <p className="text-gray-500 font-medium">Search across millions of developers worldwide</p>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;
