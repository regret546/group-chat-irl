import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

// Lazy load routes for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const EpisodeForm = lazy(() => import("./pages/EpisodeForm"));
const ReviewForm = lazy(() => import("./pages/ReviewForm"));
const EpisodeList = lazy(() => import("./pages/EpisodeList"));
const ReviewList = lazy(() => import("./pages/ReviewList"));
const Episodes = lazy(() => import("./pages/Episodes"));
const ReviewsPage = lazy(() => import("./pages/Reviews"));

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/episodes" element={<PageTransition><Episodes /></PageTransition>} />
          <Route path="/reviews" element={<PageTransition><ReviewsPage /></PageTransition>} />
          <Route path="/admin-login" element={<PageTransition><Login /></PageTransition>} />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Admin />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/new" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <EpisodeForm />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/list" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <EpisodeList />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/edit/:id" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <EpisodeForm />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/new" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ReviewForm />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/list" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ReviewList />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/edit/:id" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ReviewForm />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}

export default App;
