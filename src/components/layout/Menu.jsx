// components/Menu.jsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import useShuffleText from "../../../lib/animationUtils";

const Menu = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);
  const photosRef = useRef(null);
  const storeRef = useRef(null);

  useShuffleText(homeRef);
  useShuffleText(aboutRef);
  useShuffleText(projectRef);
  useShuffleText(blogRef);
  useShuffleText(contactRef);
  useShuffleText(photosRef);
  useShuffleText(storeRef);

  return (
    <div className="menu font-chillax w-full overflow-hidden absolute top-1/2 left-1/2 pt-8 px-8  sm:p-2">
      <div className="row row-1 pt-[1em] sm:pt-0 text-9xl sm:text-7xl px-2">
        <div className="link">
          <Link to="/" ref={homeRef}>
            Home
          </Link>
        </div>
      </div>
      <div className="row row-2 text-7xl sm:text-5xl">
        <div className="link">
          <Link to="/about" ref={aboutRef}>
            About
          </Link>
        </div>
      </div>
      <div className="row row-3 text-8xl sm:text-6xl">
        <div className="link">
          <Link to="/projects" ref={projectRef}>
            My Project
          </Link>
        </div>
      </div>
      <div className="row row-4 text-6xl sm:text-4xl">
        <div className="link">
          <Link to="/blog" ref={blogRef}>
            Blog
          </Link>
        </div>
        <div className="link px-2">
          <Link to="/contact" ref={contactRef}>
            Contact Me
          </Link>
        </div>
      </div>
      <div className="row row-5 text-9xl sm:text-5xl px-6">
        <div className="link">
          <Link to="/photos" ref={photosRef}>
            Photos
          </Link>
        </div>
        <div className="link">
          <Link to="/store" ref={storeRef}>
            Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
