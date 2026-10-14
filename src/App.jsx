import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/UiComponents/LoadingScreen";
import Home from "./components/Pages/Home";
import NavigationOverlay from "./components/UiComponents/NavigationOverlay";
import useLenis from "./hooks/useLenis";
import useResponsiveScrollTrigger from "./hooks/useResponsiveScrollTrigger";
import { useVh } from "./hooks/useVh";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigationOverlayRef = useRef(null);

  // Ensure page starts at top on load/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLenis();
  useResponsiveScrollTrigger();

  // Initialize viewport height management for mobile browser UI changes
  useVh();

  const handleAssetLoading = (onComplete) => {
    setTimeout(onComplete, 500);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          onLoad={handleAssetLoading}
        />
      )}

      <Routes>
        <Route path="/" element={<Home navigationOverlayRef={navigationOverlayRef} />} />
      </Routes>
      <NavigationOverlay ref={navigationOverlayRef} />
    </>
  );
}

export default App;