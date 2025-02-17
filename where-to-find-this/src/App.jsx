import Search from "./Search/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Results from "./Resutls/Results";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
