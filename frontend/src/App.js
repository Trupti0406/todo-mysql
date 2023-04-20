import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Todo";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
