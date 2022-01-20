// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Plants from "../Plants";
import ViewOnePlant from "../ViewOnePlant";
import AllProjects from "../AllProjects";
import ViewOneProject from "../ViewOneProject";

const dashboardRoutes = [
  {
    path: "/plants",
    name: "Property",
    icon: Dashboard,
    component: Plants,
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
  {
    path: "/projects",
    name: "Projects",
    icon: Inventory2Icon,
    component: AllProjects,
    layout: "/bedrift",
  },
  {
    path: "/viewoneproject",
    name: "Upload File to Project",
    icon: Inventory2Icon,
    component: ViewOneProject,
    layout: "/bedrift",
  },
];

export default dashboardRoutes;
