// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

import Plants from "../Plants";
import CreatePlant from "../CreatePlant";
import ViewOnePlant from "../ViewOnePlant";
const dashboardRoutes = [
  {
    path: "/plants",
    name: "Property",
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
  {
    path: "/viewoneplant",
    name: "View one Plant",
    icon: Dashboard,
    component: ViewOnePlant,
    layout: "/bedrift",
    display:false,
  },
];

export default dashboardRoutes;
