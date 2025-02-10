import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
