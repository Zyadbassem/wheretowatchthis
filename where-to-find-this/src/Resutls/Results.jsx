import { useState } from "react";
import popcornImg from "../assets/popcorn.png";
import { useLocation, Navigate } from "react-router-dom";
import Source from "./Source";

function Results() {
  // Get data from router state
  const location = useLocation();
  const [data] = useState(location.state?.data);

  // If no data, redirect to home page
  if (!data) {
    return <Navigate to="/" />;
  }
  const sources = data.filteredData;
  return (
    <div className="h-screen flex items-center lg:items-end justify-between flex-col lg:flex-row max-w-[1300px] mx-auto px-4">
      <img
        src={popcornImg}
        alt="Popcorn"
        className="w-[400px] mt-[-200px] rotate-180 lg:rotate-0 lg:mt-0"
      />
      <div className="h-[90%] flex flex-col items-center gap-5 w-full justify-start">
        <div className="flex flex-col gap-3 items-center">
          <img src={data.titleImage} className="lg:w-[200px] w-[150px]" />
          <span className="text-white">{data.titleName}</span>
        </div>
        <h1 className="mr-auto ml-[10%] my-auto text-white text-xl font-mono">
          Availble On:{" "}
        </h1>
        <div className="flex gap-10 my-auto items-center flex-wrap justify-center">
          {sources.map((v) => (
            <Source name={v.name} key={v.id} imagePath={v.logo_100px} />
          ))}
        </div>
        <a
          href="https://buymeacoffee.com/zeiadsalmoun"
          className="mt-auto bg-white hover:bg-gray-100 px-9 py-2 rounded-md transition-colors mb-10"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy me coffee :)
        </a>
      </div>
    </div>
  );
}

export default Results;
