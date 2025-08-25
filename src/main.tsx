import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import { Carousel } from "./components/Carousel/Carousel.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Carousel />
  </StrictMode>
);
