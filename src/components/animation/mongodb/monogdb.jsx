import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/mongodb/mongodb.json"; // Update the path to your JSON file

const LottieAnimation = ({ play }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      if (play) {
        animationRef.current.play();
      } else {
        animationRef.current.stop();
      }
    }
  }, [play]);

  const defaultOptions = {
    loop: true,
    autoplay: false, // Disable autoplay; control via play/stop
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={80}
      width={80}
      ref={animationRef}
    />
  );
};

LottieAnimation.propTypes = {
  play: PropTypes.bool.isRequired,
};

export default LottieAnimation;
