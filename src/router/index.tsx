import { Outlet, useLocation, useRoutes } from "react-router-dom";
import DashboardAdministrator from "@/pages/Admin/DashboardAdministrator";
import { LandingPage } from "../pages/Public/LandingPage";
import Login from "../pages/Login";
import { Register } from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";

import Layout from "../themes";
import { ProtectedRoute } from "./protectedRoute";
import { paths } from "./paths";

import { PublicLayout } from "./PublicLayout";
import { PetPage } from "@/pages/Admin/Pet";
import { PetForm } from "@/pages/Admin/Pet/form";
import { OrderPage } from "@/pages/Admin/Orders";
import { OrderDetail } from "@/pages/Admin/Orders/detail";
import { AboutPage } from "@/pages/About";

// Add this component
function GeneralLayout() {
  return (
    <>
      <Outlet /> {/* This renders either Courts, CourtsNew or CourtsEdit */}
    </>
  );
}
function Router() {
  const location = useLocation();
  const routes = [
    {
      path: paths.landingPage,
      element: <PublicLayout key={location.pathname} />,
      children: [{
        path: "",
        index: true,
        element: <LandingPage />,
      },

        {
          path: paths.aboutPage,
          element: <AboutPage />,
        },]
    },
    {
      path: paths.administrator.dashboard,
      element: (
        <ProtectedRoute>
          <Layout type="primary" />
        </ProtectedRoute>
      ),
      children: [
        {
          // index: true,
          path: paths.administrator.dashboard,
          element: <DashboardAdministrator />,
        },
        {
          path: paths.administrator.pet.list,
          element: <GeneralLayout key={location.pathname} />,
          children: [
            {
              index: true,  // This will match /admin/courts
              element: <PetPage />,
            },
            {
              path: paths.administrator.pet.create,
              element: <PetForm />,
            },
            {
              path: paths.administrator.pet.update.template,
              element: <PetForm />,
            },
          ]
        },
        {
          path: paths.administrator.orders.index,
          element: <GeneralLayout key={location.pathname} />,
          children: [
            {
              index: true,  // This will match /admin/courts
              element: <OrderPage />,
            },
            {
              path: paths.administrator.orders.detail.template,
              element: <OrderDetail />,
            },
          ]
        },
      ],
    },
    {
      path: paths.loginPage,
      element: <Login />,
    },
    {
      path: paths.registerPage,
      element: <Register />,
    },
    {
      path: paths.errorPage,
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    
  ];

  return useRoutes(routes);
}

export default Router;
