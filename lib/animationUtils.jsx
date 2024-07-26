// hooks/useShuffleText.js
import { useEffect } from "react";

const useShuffleText = (ref) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let shuffleInterval;
    let originalText = "";
    let index = 0;
    let isAnimating = false;

    const startShuffleAnimation = () => {
      if (isAnimating) return; // Prevent re-triggering if already animating

      isAnimating = true;
      originalText = element.textContent;
      index = 0;

      shuffleInterval = setInterval(() => {
        if (index < originalText.length) {
          let shuffledText = "";
          for (let i = 0; i <= index; i++) {
            shuffledText +=
              i < index ? originalText[i] : Math.random().toString(36)[2];
          }
          element.textContent =
            shuffledText + originalText.substring(index + 1);
          index++;
        } else {
          clearInterval(shuffleInterval);
          element.textContent = originalText;
          isAnimating = false;
        }
      }, 100); // Adjust the interval for desired effect
    };

    const handleMouseEnter = () => {
      startShuffleAnimation();
    };

    const handleMouseLeave = () => {
      if (isAnimating) {
        clearInterval(shuffleInterval);
        // Delay reverting text to original until animation finishes
        const revertTimeout = setTimeout(() => {
          element.textContent = originalText;
          isAnimating = false;
        }, 100 * (originalText.length - index)); // Ensure enough delay for remaining animation

        return () => clearTimeout(revertTimeout); // Clean up timeout
      }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(shuffleInterval); // Clean up interval on unmount
    };
  }, [ref]);
};

export default useShuffleText;
