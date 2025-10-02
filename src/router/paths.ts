import { route, stringParser } from "typesafe-routes";

export const paths = {
  landingPage: "/",
  aboutPage: "/about",
  administrator: {
    dashboard: "/admin",
    pet: {
      list: "/admin/pet",
      create: "/admin/pet/create",
      update: route(`/admin/pet/:id`, {
        id: stringParser
      }, {}),
    },
    orders: {
      new: `/admin/order/new`,
      detail: route(`/admin/order/:id`, {
        id: stringParser
      }, {}), 
      index: `/admin/order`, 
    },
  },
  registerPage: "/register",
  errorPage: "/error",
  loginPage: "/login",
} as const;
