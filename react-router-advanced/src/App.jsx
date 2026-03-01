import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import { ProfileDetails, ProfileSettings } from "./components/ProfileSubComponents";
import BlogPost from "./components/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const Home = () => <h2>Home Page</h2>;
const Login = () => {
  const login = () => localStorage.setItem("auth", "true");
  const logout = () => localStorage.removeItem("auth");
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={login} style={{ margin: "5px" }}>Login</button>
      <button onClick={logout} style={{ margin: "5px" }}>Logout</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile (Protected)</Link></li>
            <li><Link to="/blog/1">Blog Post 1</Link></li>
            <li><Link to="/blog/2">Blog Post 2</Link></li>
            <li><Link to="/login">Login/Logout</Link></li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }>
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
