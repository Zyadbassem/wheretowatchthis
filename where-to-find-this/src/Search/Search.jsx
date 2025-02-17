import popcornImg from "../assets/popcorn.png";
import Form from "./Form";
function Search() {
  return (
    <div className="h-screen flex items-center lg:items-end justify-between flex-col lg:flex-row max-w-[1300px] mx-auto px-4">
      <img
        src={popcornImg}
        alt="Popcorn"
        className="w-[400px] mt-[-200px] rotate-180 lg:rotate-0 lg:mt-0"
      />
      <Form />
    </div>
  );
}

export default Search;
