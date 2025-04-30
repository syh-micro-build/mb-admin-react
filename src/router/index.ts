import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
    ],
  },
]);

