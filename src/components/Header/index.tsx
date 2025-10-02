import { IconLogo } from "@/assets/images/icons";
import { HTMLProps } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Menu } from 'antd';
import LayoutWrapper from "@/components/LayoutWrapper";

import { paths } from "@/router/paths";

import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/store";
import Icon from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

interface LandingPageProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  innerClassName?: string;
}

export const PublicHeader = ({ className, innerClassName }: LandingPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(userAtom);

  const menuItems = [
    {
      key: paths.landingPage,
      label: <Link to={paths.landingPage}>Home</Link>,
    },
    {
      key: paths.aboutPage,
      label: <Link to={paths.aboutPage}>About</Link>,
    },
    {
      key: paths.loginPage,
      label: <Link to={paths.loginPage}>Login / Register</Link>,
    },
  ];
  if (user?.userStatus === 1) {
    navigate(paths.administrator.dashboard);
    // const loginIndex = menuItems.findIndex((item) => item.key === paths.loginPage);
    // menuItems[loginIndex].label = <Link to={paths.administrator.dashboard}>Hi, {user.name}!</Link>;
    // menuItems[loginIndex].key = paths.administrator.dashboard;
  }
  return (
    <Header className={`bg-[#F0FF5F] flex flex-col items-center h-24 ${className}`}>
      <LayoutWrapper className='h-full'>
        <div className={`border-white rounded-xl flex justify-between items-center h-full w-full px-4 ${innerClassName}`}>
          <Link to={paths.landingPage}>
            <Title level={3} className="!text-neutral-900 !mb-0 flex flex-row">
              <IconLogo className="mr-2 w-20 h-16" />
            </Title>
          </Link>
          <div className="w-full ">
            <Menu
              overflowedIndicator={<Icon name="menu" />}
              className='bg-transparent font-bold text-neutral-900 text-sm flex justify-end items-center custom-menu border-none'
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