import PropTypes from "prop-types";

const CustomImage = ({
  src,
  width,
  height,
  alt = "",
  className = "",
  style = {},
  ...props
}) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      {...props}
      onError={(e) => {
        e.currentTarget.src = "https://via.placeholder.com/200x125"; // Fallback image
      }}
    />
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default CustomImage;
