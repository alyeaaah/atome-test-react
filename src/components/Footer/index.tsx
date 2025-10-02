import { IconLogo, IconTiktok, IconXTwitter } from "@/assets/images/icons";
import LayoutWrapper from "@/components/LayoutWrapper";
import { paths } from "@/router/paths";
import Icon, { TikTokOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import { HTMLProps } from "react";
import { useNavigate } from "react-router-dom";

export const FooterComponent = ({className}: HTMLProps<HTMLDivElement>) => {
  const navigate = useNavigate();

  return (

    <Footer className={`${className} mt-8`}>
      <LayoutWrapper className="grid grid-cols-12 gap-6 w-full ">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <div className="flex flex-row items-center justify-start">
            <IconLogo className='h-16 w-24 ' />
          </div>
          <div className="flex flex-row items-center justify-start text-xl font-semibold">
            Atome
          </div>
          <div className='flex flex-col items-start justify-start my-2'>
            <div className='text-sm font-light pr-4'>Whether you're a competitive player, a weekend enthusiast, or just getting started, <span className='font-semibold'>Atome</span> is your place to play, improve, and connect. Enjoy expert coaching, friendly matches, and a vibrant community</div>
            <div className='flex flex-row items-center justify-start'>
              <Button
                className="text-black my-3 hover:!text-[#000] hover:!bg-[#F0FF5F] border-none"
                onClick={() => navigate(paths.registerPage)}
              >
                Become a Member
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 relative">
          <div className="flex flex-row items-center justify-start text-[#F0FF5F] font-medium pb-1">
            Sitemaps
          </div>
          <div className='w-4 h-0.5 bg-[#F0FF5F]'></div>
          <div className="flex flex-col items-start justify-start text-white font-medium pt-3">
            <ul>
              <li className='py-1'>
                <a href="#">Home</a>
              </li>
              <li className='py-1'>
                <a href="#">About</a>
              </li>
              <li className='py-1'>
                <a href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <div className="flex flex-row items-center justify-start text-[#F0FF5F] font-medium pb-1">
            Social Media
          </div>
          <div className='w-4 h-0.5 bg-[#F0FF5F]'></div>
          <div className="flex flex-col items-start justify-start !text-white font-medium pt-3">
            <ul>
              <li className='py-1 '>
                <Link href="#" className="flex flex-row !text-white hover:!text-[#F0FF5F] items-center"><YoutubeOutlined name='Youtube' className='w-5' />&nbsp;Youtube</Link>
              </li>
              <li className='py-1 '>
                <Link href="#" className="flex flex-row !text-white hover:!text-[#F0FF5F] items-center"><TikTokOutlined className='w-5' />&nbsp;Tiktok</Link>
              </li>
              <li className='py-1 '>
                <Link href="#" className="flex flex-row !text-white hover:!text-[#F0FF5F] items-center"><TwitterOutlined className='w-5' />&nbsp;Twitter / X</Link>
              </li>
            </ul>
          </div>
        </div>
      </LayoutWrapper>
    </Footer>
  );
};