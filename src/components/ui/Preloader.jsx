import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const Preloader = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const letterRefs = useRef([]);
  const greetingRef = useRef(null);

  // Handle the GSAP animation for letters
  useEffect(() => {
    const initialPositions = [
      { x: "600px", y: "-0px", scale: 3 },
      { x: "-180px", y: "-200px", scale: 3 },
      { x: "-200px", y: "150px", scale: 3 },
      { x: "30px", y: "-200px", scale: 3 },
      { x: "-10px", y: "150px", scale: 3 },
      { x: "190px", y: "-200px", scale: 3 },
      { x: "150px", y: "150px", scale: 3 },
      { x: "-600px", y: "-25px", scale: 3 },
    ];

    // Ensure refs are populated before running animations
    if (letterRefs.current.length === 0 || !greetingRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "expo.inOut" },
    });

    tl.to(letterRefs.current, {
      x: "0px",
      y: "0px",
      scale: 1,
      stagger: 0.1,
    });

    gsap.set(letterRefs.current, {
      x: (index) => initialPositions[index].x,
      y: (index) => initialPositions[index].y,
      scale: (index) => initialPositions[index].scale,
    });

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        return prev + 3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const texts = [
      "Hi",
      "Hola",
      "नमस्ते",
      "こんにちは",
      "வணக்கம்!",
      "Salut",
      "ನಮಸ್ಕಾರ",
      "안녕하세요",
      "ආයුබෝවන්",
      "Здравствуйте",
      "你好",
      "བཀྲ་ཤིས་བདེ་ལེགས།",
      "أهلا",
      "ciao",
      "ہیلو",
      "నమస్కారం",
    ];

    let textIndex = 0;
    const morphTime = 1;
    const cooldownTime = 0.24;
    let morph = 0;
    let cooldown = cooldownTime;
    let time = Date.now();

    function setMorph(fraction) {
      const nextText = texts[textIndex % texts.length];
      if (greetingRef.current) {
        gsap.to(greetingRef.current, {
          duration: morphTime * fraction,
          textContent: nextText,
        });
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      const newTime = Date.now();
      const dt = (newTime - time) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        cooldown = cooldownTime;
        textIndex++;
        morph = 1;
        setMorph(morph);
      } else {
        morph = 1 - cooldown / cooldownTime;
        setMorph(morph);
      }
    }

    animate();
  }, []);

  return (
    <main
      className="preloader fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50"
      aria-busy={loadingProgress < 100}
      aria-live="polite"
    >
      <section
        className="flex flex-col items-center justify-center flex-1 w-full"
        aria-labelledby="preloader-heading"
      >
        <h1 id="preloader-heading" className="sr-only">
          Preloading
        </h1>
        <div className="blocks flex flex-wrap justify-center gap-2 sm:gap-2 md:gap-2 lg:gap-2 ">
          {["G", "a", "j", "e", "n", "d", "r", "a"].map((letter, index) => (
            <h2
              key={index}
              ref={(el) => (letterRefs.current[index] = el)}
              className="block text-6xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 bg-clip-text text-transparent"
              aria-label={letter}
            >
              {letter}
            </h2>
          ))}
        </div>
      </section>
      <section className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center mb-4">
        <div
          className="greeting text-center text-sm sm:text-xs md:text-md lg:text-base"
          role="status"
          aria-live="polite"
        >
          <span ref={greetingRef}>Hi</span>
        </div>
        <div className="loading text-xl sm:text-sm md:text-lg lg:text-xl">
          Loading {loadingProgress}%
        </div>
      </section>
    </main>
  );
};

Preloader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Preloader;
