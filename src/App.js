import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import InteliconvoBot from "./Components/InteliconvoBot";
import Error from "./Components/Error";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/inteliconvo" replace />} />
          <Route path="/inteliconvo" element={<InteliconvoBot />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
