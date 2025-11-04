import { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../sections/Home";
import Latest from "../sections/Latest";
import Previous from "../sections/Previous";
import Reviews from "../sections/Reviews";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { useAssetLoader } from "../hooks/useAssetLoader";
import logoWhite from "../assets/logo-white.png";
import irlCard from "../assets/irl-card.png";
import groupPhoto from "../assets/group-photo.png";
import thumbnailFallback from "../assets/thumbnail.jpg";

const HomePage = () => {
  // Critical assets that should be loaded before showing content
  const criticalAssets = [
    logoWhite,
    irlCard,
    groupPhoto,
    thumbnailFallback,
  ];

  const { isLoading } = useAssetLoader(criticalAssets);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  if (!showContent) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="h-screen w-full overflow-x-hidden">
      <Navbar />
      <Home />
      <Latest />
      <Previous />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomePage;

