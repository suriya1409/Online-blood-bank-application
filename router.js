import { lazy } from "react";
import Login from "../views/Login.js";
import Donar from "../views/Donar.js";
import DonarSignUp from "../views/DonarSignUp.js";
import ReceiverSignUp from "../views/ReceiverSignUp.js";


const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"))

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <Login /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/myprofile", exact: true, element: <About /> },
      { path: "/donar", exact: true, element: <Donar /> },
      { path: "/donarSignUp", exact: true, element: <DonarSignUp /> },
      { path: "/receiverSignUp", exact: true, element: <ReceiverSignUp/> },
    ],
  },
];


export default ThemeRoutes;