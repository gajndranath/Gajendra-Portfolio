import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for page transition
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
    });

    // Animate overlay to cover the page
    tl.to(overlayRef.current, {
      height: "100%",
      backgroundColor: "white",
      onComplete: () => {
        // Hide the overlay after the transition
        gsap.set(overlayRef.current, {
          height: "0%",
          backgroundColor: "black",
        });
      },
    }).fromTo(containerRef.current, { opacity: 0 }, { opacity: 1 });

    return () => {
      // Cleanup function to reset opacity and overlay height for the next page
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(overlayRef.current, { height: "100%" });
    };
  }, [location]);

  return (
    <>
      <div ref={overlayRef} className="transition-overlay" />
      <div ref={containerRef} className="page-transition">
        {children}
      </div>
    </>
  );
};

PageTransitionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransitionWrapper;
