import { useRef, useEffect } from "react";
import gsap from "gsap";
import docker from "../../../assets/icons/docker.png"; // Update the path to your Docker image

const DockerWaveAnimation = () => {
  const iconRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: false });

    // Floating boat effect
    gsap.fromTo(
      iconRef.current,
      {
        rotate: "0deg",
        y: "0px",
      },
      {
        rotate: "-3deg",
        y: "20px",
        duration: 2, // Increased duration for slower effect
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    tl.to(iconRef.current, {
      x: "-200", // Move from right to left
      duration: 10, // Increased duration for slower effect
      ease: "power1.inOut",
    })
      .to(iconRef.current, {
        rotationY: 180, // Flip horizontally
        duration: 2, // Increased duration for slower effect
        ease: "power1.inOut",
      })
      .to(iconRef.current, {
        x: "50vw", // Move from left to middle (50% of span width)
        duration: 10, // Increased duration for slower effect
        ease: "power1.inOut",
      })
      .to(iconRef.current, {
        rotationY: 0, // Flip back
        duration: 2, // Increased duration for slower effect
        ease: "power1.inOut",
      })
      .to(iconRef.current, {
        x: "0vw", // Move back to the right
        duration: 10, // Increased duration for slower effect
        ease: "power1.inOut",
      })
      .to(iconRef.current, {
        rotationY: 180, // Flip horizontally again
        duration: 2, // Increased duration for slower effect
        ease: "power1.inOut",
      })
      .to(iconRef.current, {
        x: "100vw", // Move to the starting position (right side)
        duration: 10, // Increased duration for slower effect
        ease: "power1.inOut",
      });
  }, []);

  return (
    <span className="overflow-hidden relative flex-1">
      <img
        ref={iconRef}
        src={docker}
        alt="Docker Icon"
        style={{ width: "60px" }} // Adjust size as needed
      />
    </span>
  );
};

export default DockerWaveAnimation;
