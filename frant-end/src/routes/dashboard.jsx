/* eslint-disable no-sparse-arrays */
import { lazy } from "react";
import { Outlet } from "react-router-dom"; // CUSTOM COMPONENTS
import Loadable from "./Loadable";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout"; // ALL DASHBOARD PAGES
// import HomePage from "../pages/dashboard/Home";

import { AuthGuard } from "@/components/auth";

import { Create } from "@mui/icons-material";
import { el } from "date-fns/locale";

import PrivateRoute from "@/components/auth/PrivteRoute"; 
import { patch } from "@mui/material";
const  HomePage= Loadable(lazy(() => import("@/pages/dashboard/ecommerce")));
const  UserPage = Loadable(lazy(() => import("../pages/dashboard/users/UserList1Page")));
const  UserLeaderPageView = Loadable(lazy(() => import("../pages/dashboard/users/UserLeaderPageView")));
const  UserGridPage = Loadable(lazy(() => import("../pages/dashboard/users/UserGrid2Pages")));
const  LeaderGridPage = Loadable(lazy(() => import("../pages/dashboard/users/LeadeGrid2Page")));
const  UserAddPage = Loadable(lazy(() => import("../pages/dashboard/users/add-new-user")));
const  UserUpPage = Loadable(lazy(() => import("../pages/dashboard/users/updateUserPage")));
const  Account = Loadable(lazy(() => import("../pages/dashboard/accounts")));
const  MapMain = Loadable(lazy(() => import("../pages/dashboard/map/mapPage")));
const  SquareLink = Loadable(lazy(() => import("../pages/dashboard/finance-2.jsx")));
const ReportPage = Loadable(lazy(() => import("../pages/dashboard/Report/ReportPage")));
const Upbyass = Loadable(lazy(() => import("../pages/dashboard/users/updateLeaderPage")));
const ReportD = Loadable(lazy(() => import("../pages/dashboard/Report/ReportDpage")));
const ReCach = Loadable(lazy(() => import("../pages/dashboard/Cash/CashPage")));
const CashDlsPage = Loadable(lazy(() => import("../pages/dashboard/Cash/CashDlsPage")));
export const DashboardRoutes = [{
  path: "/",
  element: <AuthGuard>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AuthGuard>,
  children: [{
    index: true,
    element: <HomePage />
  }, 
  {
    path : "/users" ,
    element :<PrivateRoute> <UserPage/> </PrivateRoute>
  } ,
  {
    path : "/user-grid" ,
    element : <UserGridPage/>
  } ,
  {
    path : "/user-add" ,
    element : <UserAddPage/>
  } ,
  {
    path : "/user-add/:id" ,
    element : <UserUpPage/>
  } ,
  {
    path : "/user-add-ass/:id" ,
    element : <Upbyass/>
  } ,
  {
    path : "/account" ,
    element : <Account/>
  } ,
  {
    path : "/Ousers",
    element :<UserLeaderPageView/>
  },
  {
    path : "/ouser-grid",
    element :<LeaderGridPage/>
  },
  {
    path : "/map",
    element :<PrivateRoute><MapMain/></PrivateRoute>
  },
  {
    path : "/Report",
    element :<ReportPage/>
  }
  ,
  {
    path : "/square",
    element :<PrivateRoute><SquareLink/></PrivateRoute>
  }
  ,
  {
    path : "/report/:id",
    element :<PrivateRoute><ReportD/></PrivateRoute>
  },{
    path :"/cash",
    element : <PrivateRoute><ReCach/></PrivateRoute>
  }
  ,{
    path :"/CashDlsPage/:id",
    element : <PrivateRoute><CashDlsPage/></PrivateRoute>
  }
  // , {
  //   path :"announcement",
  //   element :<PrivteRoute per = "users_create"> <Announcement/></PrivteRoute>
  // } , {
  //   path : "create-announcement" ,
  //   element :<PrivteRoute per = "users_create"> <CreateAnnoucement/></PrivteRoute>
  // } 
]
}];