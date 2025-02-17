import PropTypes from "prop-types";

function InputField({
  label = "username",
  name = "username",
  placeholder = "johnCena",
  type = "text",
  onChange = () => {},
  value = "",
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      className="
      flex
      flex-col
      w-[60%]
      min-w-[300px]
      items-center
      justify-start
      "
    >
      <label htmlFor={name} className="text-white font-mono mr-auto mb-3">
        {label}:{" "}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="
            bg-transparent
            outline-none
            px-5
            w-[100%]
            py-1
            border-b
            text-sm
            font-mono
            rounded-sm
            text-white
            border-[#8787875b]"
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default InputField;
