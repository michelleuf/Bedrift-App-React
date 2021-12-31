// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

import Plants from "../Plants";
import CreatePlant from "../CreatePlant";
const dashboardRoutes = [
  {
    path: "/plants",
    name: "Plants",
    icon: Dashboard,
    component: Plants,
    layout: "/bedrift",
  },
  {
    path: "/cplants",
    name: "Create Plant",
    icon: Dashboard,
    component: CreatePlant,
    layout: "/bedrift",
  },
];

export default dashboardRoutes;
