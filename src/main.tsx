import ScrollToTop from "@/components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./assets/css/app.css";
import { store as jotaiStore } from "./utils/store";
import { Provider as JotaiProvider } from "jotai";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/react-query";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ToastProvider } from "./components/Toast/ToastProvider";
import { ConfigProvider } from "antd";
import { antdThemeProvider } from "./utils/store/config";
import { clientEnv } from "@/env";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={clientEnv.BASENAME}>
        <JotaiProvider store={jotaiStore}>
          <ToastProvider>
            <ConfigProvider theme={antdThemeProvider}>
              <Router />
            </ConfigProvider>
          </ToastProvider>
          <LoadingOverlay />
        </JotaiProvider>
      <ScrollToTop />
    </BrowserRouter>
  </QueryClientProvider>
);
