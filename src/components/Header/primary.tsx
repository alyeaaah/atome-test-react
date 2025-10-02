import { IconLogo } from "@/assets/images/icons";
import { HTMLProps } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Menu } from 'antd';
import LayoutWrapper from "@/components/LayoutWrapper";

import { paths } from "@/router/paths";

import { useAtomValue, useSetAtom } from "jotai";
import { accessTokenAtom, userAtom } from "@/utils/store";
import Icon, { IssuesCloseOutlined, UserOutlined } from "@ant-design/icons";
import { useToast } from "@/components/Toast/ToastContext";

const { Header } = Layout;
const { Title } = Typography;

interface LandingPageProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  innerClassName?: string;
}

export const AdminHeader = ({ className, innerClassName }: LandingPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(accessTokenAtom);
  const {showNotification} = useToast();

  const menuItems = [
    {
      key: paths.landingPage,
      label: <Link to={paths.administrator.dashboard}>Home</Link>,
    },
    {
      key: paths.aboutPage,
      label: <Link to={paths.administrator.pet.list}>Pets</Link>,
    },
    {
      key: paths.loginPage,
      label: <Link to={paths.administrator.orders.index}>Orders</Link>,
    },
    {
      key: "logout",
      label: <Link to={"#"} onClick={() => { 
        showNotification({
          text: "Logout successfully",
          duration: 5000,
          icon: <UserOutlined />,
          variant: "danger"
        })
        setUser(null);
        setToken(null);
        navigate(paths.landingPage);
      }}>Logout</Link>,
    },
  ];
  if (user?.userStatus === 1) {
    navigate(paths.administrator.dashboard);
    // const loginIndex = menuItems.findIndex((item) => item.key === paths.loginPage);
    // menuItems[loginIndex].label = <Link to={paths.administrator.dashboard}>Hi, {user.name}!</Link>;
    // menuItems[loginIndex].key = paths.administrator.dashboard;
  }
  return (
    <Header className={`bg-neutral-900 flex flex-col items-center h-24 ${className}`}>
      <LayoutWrapper className='h-full'>
        <div className={`border-white rounded-xl flex justify-between items-center h-full w-full px-4 ${innerClassName}`}>
          <Link to={paths.landingPage}>
            <Title level={3} className="!text-[#F0FF5F] !mb-0 flex flex-row">
              <IconLogo className="mr-2 w-20 h-16" />
            </Title>
          </Link>
          <div className="w-full ">
            <Menu
              overflowedIndicator={<Icon name="menu" />}
              className='bg-transparent font-bold text-[#F0FF5F] text-sm flex justify-end items-center custom-menu border-none'
              mode="horizontal"
              defaultSelectedKeys={['/']}
              selectedKeys={[`/${location.pathname.split('/')[1]}`]}
              items={menuItems}
            />
          </div>
        </div>
      </LayoutWrapper>
    </Header>
  );
};