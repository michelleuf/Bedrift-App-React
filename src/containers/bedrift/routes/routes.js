// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

import Plants from "../Plants";

const dashboardRoutes = [
  {
    path: "/plants",
    name: "Plants",
    icon: Dashboard,
    component: Plants,
    layout: "/admin",
  },
];

export default dashboardRoutes;
