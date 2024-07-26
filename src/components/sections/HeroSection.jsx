import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import myImage from "../../assets/gajendra.jpeg";
import DockerWaveAnimation from "../animation/docker/docker";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { LinkPreview } from "../ui/link-preview";
import Menu from "../layout/Menu";

const HeroSection = ({
  title,
  quote,
  name,
  role,
  agency,
  academics,
  certificates,
}) => {
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animation
    const playBtn = document.querySelector("#play");
    const reverseBtn = document.querySelector("#reverse");
    const tl = gsap.timeline();

    tl.addLabel("start")
      .to(
        ".uncover_slice",
        {
          height: 0,
          duration: 1,
          ease: "power4.inOut",
          stagger: { amount: 0.33 },
          delay: 1.5,
        },
        "start"
      )
      .to(
        ".myimg",
        {
          scale: 1.1,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 1.5,
        },
        "start"
      );

    const handlePlay = () => tl.play();
    const handleReverse = () => tl.reverse();

    if (playBtn) {
      playBtn.addEventListener("click", handlePlay);
    }

    if (reverseBtn) {
      reverseBtn.addEventListener("click", handleReverse);
    }

    return () => {
      // Clean up event listeners on component unmount
      if (playBtn) {
        playBtn.removeEventListener("click", handlePlay);
      }
      if (reverseBtn) {
        reverseBtn.removeEventListener("click", handleReverse);
      }
    };
  }, []);

  useEffect(() => {
    const startAnimations = () => {
      // Initialize text shuffle animation
      const elementsToAnimate = document.querySelectorAll(
        "p:not(.intro), .logo div, li> a"
      );

      elementsToAnimate.forEach((element) => {
        const originalText = element.textContent;
        let index = 0;

        const shuffleElement = setInterval(() => {
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
            clearInterval(shuffleElement);
            element.textContent = originalText;
          }
        }, 200);
      });

      // Initialize intro text animation
      const introTag = document.querySelector(".intro");
      if (introTag) {
        const originalText = introTag.textContent;
        let currentText = "";
        let index = 0;

        const revealText = setInterval(() => {
          if (index < originalText.length) {
            currentText += originalText[index];
            introTag.textContent = currentText;
            index++;
          } else {
            clearInterval(revealText);
          }
        }, 25);
      }
    };

    const timer = setTimeout(startAnimations, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const toggleButton = toggleButtonRef.current;
    let isOpen = false;

    const timeline = gsap.timeline({ paused: true });
    timeline.to(".hero", {
      duration: 2,
      ease: "power4.inOut",
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      scale: 0.5,
    });

    timeline.to(
      ".row",
      {
        duration: 3,
        left: "0%",
        ease: "power4.inOut",
        stagger: 0.1,
      },
      "-=2.5"
    );

    const toggleMenu = () => {
      if (isOpen) {
        timeline.reverse();
      } else {
        timeline.play();
      }
      isOpen = !isOpen;
    };

    if (toggleButton) {
      toggleButton.addEventListener("click", toggleMenu);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener("click", toggleMenu);
      }
    };
  }, []);

  return (
    <HeroHighlight>
      <section className="hero-section px-8 sm:px-2 py-4">
        <nav
          className="flex relative z-10 justify-between items-center p-5 sm:p-2"
          aria-label="Main Navigation"
        >
          <div className="parent flex justify-between items-center">
            <div className="greeting logo">
              <div className="uppercase bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 bg-clip-text text-transparent text-8xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-chillax text-red flex items-center">
                {title}
              </div>
            </div>
          </div>
          <div className="menu-button sm:mr-2" ref={toggleButtonRef}>
            <button className="btn toggle" aria-label="Menu">
              • menu
            </button>
          </div>
        </nav>
        <Menu />
        <div className="hero">
          <div className="sub-nav relative -right-1/4 sm:right-auto w-3/4 sm:w-auto py-8 sm:py-4 px-4 sm:px-2 flex justify-between items-center sm:flex sm:flex-col">
            <p className="quote intro h-20 sm:h-24 sm:w-auto w-[30%] ">
              {quote}
            </p>
            <p className="primary text-right sm:text-left text-4xl sm:text-3xl uppercase ">
              folio 2024
            </p>
          </div>
          <div className="flex justify-end items-end py-8 px-4 sm:p-2 relative hero-section">
            <div className="box hero-image">
              <img className="myimg fill" src={myImage} alt="Hero" />
              <div className="uncover">
                <div className="mask uncover_slice"></div>
                <div className="mask uncover_slice"></div>
                <div className="mask uncover_slice"></div>
              </div>
            </div>
          </div>

          <footer className="p-4 sm:p-2 flex justify-between items-center gap-8 sm:gap-0 overflow-hidden sm:flex-col sm:items-start">
            <div className="slide-copy flex-1">
              <div className="slide-index">
                <p className="p-1">EX / 03</p>
              </div>
              <div className="slide-name text-left">
                <h1 className="text-5xl font-bold">{name}</h1>
                <h2 className="flex items-center p-1">
                  <Highlight className="text-black dark:text-white">
                    {role}
                  </Highlight>
                </h2>
              </div>
              <DockerWaveAnimation />
            </div>

            <div className="slide-info flex items-start gap-16 sm:gap-8 relative z-50 sm:flex-col">
              <div className="agency ">
                <p>-Agency</p>
                <div className="text-sm cursor-pointer">
                  <LinkPreview
                    url="https://galasitsolutions.com"
                    className="text-sm sm:text-xs bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                  >
                    {agency}
                  </LinkPreview>
                </div>
              </div>
              <div className="experience ">
                <p>-Academics</p>
                <p className="text-sm sm:text-xs">{academics}</p>
              </div>
              <div className="certificate">
                <p>-Certificate</p>
                <ul>
                  {certificates.map((certificate, index) => (
                    <li key={index} className="text-sm cursor-pointer">
                      <LinkPreview
                        url={certificate.url}
                        className="text-sm sm:text-xs bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                      >
                        {certificate.name}
                      </LinkPreview>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </HeroHighlight>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  agency: PropTypes.string.isRequired,
  academics: PropTypes.string.isRequired,
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeroSection;
