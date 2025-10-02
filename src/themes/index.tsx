
import { PublicHeader } from "@/components/Header";
import { AdminHeader } from "@/components/Header/primary";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Outlet } from "react-router-dom";

function Main(props: {
  type: "primary" | "secondary";
}) {
  const theme = (): React.ReactNode => {
    switch (props.type) {
      case "primary":
        return <AdminHeader />;
      case "secondary":
        return "adminSecondaryHeader";
      default:
        return <PublicHeader />;
    }
  };
  return (
    <div>
      {/* <ThemeSwitcher /> */}
      {theme()}
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </div>
  );
}

export default Main;
