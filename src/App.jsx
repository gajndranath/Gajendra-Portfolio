import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Preloader from "./components/ui/Preloader";
import PageTransitionWrapper from "./components/transition/PageTransitionWrapper";
import Home from "./pages/Home";
import About from "./pages/About"; // Example page

const App = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      {loading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <PageTransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />{" "}
            {/* Ensure this path exists */}
            <Route path="/about" element={<About />} /> {/* Example route */}
          </Routes>
        </PageTransitionWrapper>
      )}
    </Router>
  );
};

export default App;
