import PropTypes from "prop-types";

function Source({ name, imagePath }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={imagePath}
        alt={name}
        className="rounded-[50%] w-[60px] lg:w-[100px]"
      />
      <span className="text-white">{name}</span>
    </div>
  );
}

Source.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
};

export default Source;
