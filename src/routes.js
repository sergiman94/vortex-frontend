import Dashboard from "modules/dashboard/dashboard.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Storage from "@material-ui/icons/Storage";
import Connections from "modules/databases/connections/connections";
import DynamicFeedTwoToneIcon from '@material-ui/icons/DynamicFeedTwoTone';
import GraphsComponent from "modules/vortexNotion/graphs/graphs";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Databases",
    rtlName: "صفحات",
    icon: Storage,
    state: "databasesCollapse",
    views: [
      {
        path: "/databases-connections",
        name: "Connections",
        rtlName: "تيالجدول الزمني",
        mini: "CN",
        rtlMini: "تي",
        component: Connections,
        layout: "/admin",
      }
    ]
  },
  {
    collapse: true,
    name: "Vortex Notion",
    rtlName: "صفحات",
    icon: DynamicFeedTwoToneIcon,
    state: "vortexNotionsCollapse",
    // change name for the selector at the sidebar
    views: [
      {
        path: "/vortex-notion-datagraph",
        name: "Graphs",
        rtlName: "تيالجدول الزمني",
        mini: "GP",
        rtlMini: "تي",
        component: GraphsComponent,
        layout: "/admin",
      },
      {
        path: "/vortex-notion-databox",
        name: "Databox",
        rtlName: "تيالجدول الزمني",
        mini: "DX",
        rtlMini: "تي",
        //component: Connections,
        layout: "/admin",
      }
    ]
  }
];
export default dashRoutes;
