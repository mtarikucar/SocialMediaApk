import React from "react";

import MainDashboard from "./views/admin/default";


// Icon Imports
import {
  MdBarChart,
} from "react-icons/md";


const routes = [
  {
    name: "Paneller",
    layout: "/admin",
    path: "default",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <MainDashboard />,
    allowedRoles : ["user"],
    isShow: true
  },

];

export default routes;
