import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import EpisodeForm from "./pages/EpisodeForm";
import ReviewForm from "./pages/ReviewForm";
import EpisodeList from "./pages/EpisodeList";
import ReviewList from "./pages/ReviewList";
import Episodes from "./pages/Episodes";
import ReviewsPage from "./pages/Reviews";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/admin-login" element={<Login />} />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/new" 
            element={
              <ProtectedRoute>
                <EpisodeForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/list" 
            element={
              <ProtectedRoute>
                <EpisodeList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/edit/:id" 
            element={
              <ProtectedRoute>
                <EpisodeForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/new" 
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/list" 
            element={
              <ProtectedRoute>
                <ReviewList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/edit/:id" 
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
