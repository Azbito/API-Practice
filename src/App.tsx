import { Route, Routes } from "react-router-dom";
import { Repos } from "./pages/Repos/Repos";
import { Repo } from "./pages/Repo/Repo";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Repos />} />
      <Route path="/repos/*" element={<Repo />} />
    </Routes>
  )
}