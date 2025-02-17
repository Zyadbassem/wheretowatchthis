import { useState } from "react";
import InputField from "../Helpers/InputField";
import url from "../Helpers/BackendHelper";
import { useNavigate } from "react-router-dom";
import LoadingHelper from "../Helpers/LoadingHelper";
import PopUpHelper from "../Helpers/PopUpHelper";

function Form() {
  /** State for input */
  const [title, setTitle] = useState("");

  /** State for loading */
  const [loading, setLoading] = useState(false);

  /** State for error */
  const [error, setError] = useState("");

  /** Handle on Change */
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  /** Navigation */
  const navigate = useNavigate();

  /** Handle supmit */
  const handleSubmit = async (e) => {
    // Loading and prevent default
    setLoading(true);
    e.preventDefault();

    // if no title taken
    if (!title) return;
    try {
      // Post to the backent with the title
      const response = await fetch(`${url}//api/whereisthis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      // Get the data
      const data = await response.json();
      // if error
      if (data.message) {
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
        return;
      }

      // esle
      if (response.ok) {
        navigate("/results", { state: { data } });
      }
    } catch (error) {
      // if error
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="h-[60%] flex flex-col items-center gap-5 w-full justify-center"
      onSubmit={handleSubmit}
    >
      {loading ? <LoadingHelper /> : null}
      {error ? <PopUpHelper message={error} /> : null}
      <InputField
        name="title"
        label="Movie or TV show title"
        value={title}
        onChange={handleOnChange}
        placeholder="game of thrones"
      />
      <button
        type="submit"
        className="text-white bg-purple-700 hover:bg-purple-800 px-10 py-2 rounded-md transition-colors"
      >
        Search
      </button>
      <a
        href="https://buymeacoffee.com/zeiadsalmoun"
        className="mt-auto bg-white hover:bg-gray-100 px-9 py-2 rounded-md transition-colors mb-10"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy me coffee :)
      </a>
    </form>
  );
}

export default Form;
