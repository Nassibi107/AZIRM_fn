/* eslint-disable no-sparse-arrays */
import { lazy } from "react";
import { Outlet } from "react-router-dom"; // CUSTOM COMPONENTS
import Loadable from "./Loadable";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout"; // ALL DASHBOARD PAGES
// import HomePage from "../pages/dashboard/Home";

import { AuthGuard } from "@/components/auth";

import { Create } from "@mui/icons-material";

const  HomePage= Loadable(lazy(() => import("@/pages/dashboard/ecommerce")));
const  UserPage = Loadable(lazy(() => import("../pages/dashboard/users/UserList1Page")));
const  UserGridPage = Loadable(lazy(() => import("../pages/dashboard/users/UserGrid2Page")));
const  UserAddPage = Loadable(lazy(() => import("../pages/dashboard/users/add-new-user")));
const  UserUpPage = Loadable(lazy(() => import("../pages/dashboard/users/updateUserPage")));
const  Account = Loadable(lazy(() => import("../pages/dashboard/accounts")));


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
    element : <UserPage/>
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
    path : "/account" ,
    element : <Account/>
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