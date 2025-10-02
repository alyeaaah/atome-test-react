import { clientEnv } from "@/env";
import { FooterComponent } from "@/components/Footer";
// import { PublicHeader } from "@/pages/Public/LandingPage/components/HeaderLandingPage";
import { Layout } from "antd";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { PublicHeader } from "@/components/Header";

export const PublicLayout = () => {
  return (
      <>
        <Layout className="min-h-screen bg-white text-white public-page">
          {/* Top Navbar */}
          <Helmet >
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          </Helmet>
          {location.pathname != "" && location.pathname != "/" && location.pathname != clientEnv.BASENAME && <PublicHeader className="border-b-8 border-neutral-900 rounded-b-2xl shadow-2xl fixed w-full z-20" />}
          {location.pathname != "" && location.pathname != "/" && location.pathname != clientEnv.BASENAME && <div className="h-24" />}
        <Outlet /> 
        <FooterComponent className='bg-neutral-900 py-16 text-white' />
        </Layout>
      </>
  );
};
