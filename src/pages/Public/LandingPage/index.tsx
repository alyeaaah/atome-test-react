import { IconLogo } from '@/assets/images/icons';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Divider, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { PublicHeader } from '@/components/Header';


const { Header, Content } = Layout;


export const LandingPage = () => {
  const navigate = useNavigate();
  const [slideIsVisible, setSlideIsVisible] = useState<boolean>();
  const [animateMenu, setAnimateMenu] = useState(false);

  return (
    <>
      {/* <PageHeader /> */}
      <PublicHeader />
      <PublicHeader className={`rounded-b-2xl shadow-xl fixed -translate-y-[100px] top-0 w-full z-20 ${slideIsVisible === true && animateMenu === true ? `animate-slide-out-top` : (slideIsVisible === false && animateMenu === true ? `fixed animate-slide-in-top ` : '')}`} />
      <div className='h-[50vh] w-full bg-[#F0FF5F] mb-6 relative rounded-b-[48px] shadow-xl overflow-hidden'>
        
        <LayoutWrapper className="h-full">
          <div className='z-10 h-full flex flex-col justify-center text-neutral-900 items-center'>
            <h1 className='text-4xl font-bold my-4'>atome</h1>
            <div className='flex w-[30%]'>
              <Divider className='w-full border-neutral-800' />
            </div>
            <h2 className='text-2xl font-semibold'>Frontend Engineer Test</h2>
            <h2 className='text-xs font-light opacity-70'>By <span className='font-semibold'>Zau</span></h2>
          </div>
        </LayoutWrapper>
        <ReactVisibilitySensor onChange={(isVisible: any) => {
          if (!animateMenu) {
            setAnimateMenu(true);
          }
          else {
            setSlideIsVisible(isVisible);
          }
        }}>
          <div className='h-1 bg-red-600'></div>
        </ReactVisibilitySensor>
      </div>
      {/* BEGIN: First Section */}
      <LayoutWrapper className='w-full max-w-full grid grid-cols-12 gap-2 sm:gap-8 overflow-hidden'>
        <div></div>
      </LayoutWrapper>
      {/* END: First Section */}
      {/* BEGIN: Second Section */}
      <LayoutWrapper className='bg-[#fff6f4] rounded-[48px] shadow-2xl relative'>
        <div className='h-3/4 absolute left-0 top-0 w-1/12 z-0 overflow-hidden flex items-center'>
          <IconLogo className="w-64 h-48 -rotate-90" />
        </div>
        <div className='h-3/4 absolute right-0 top-0 w-1/12 z-0 overflow-hidden flex items-center'>
          <IconLogo className="w-64 h-48 rotate-90" />
        </div>
        <Content className='!z-10'>
          <div className='grid grid-cols-12 gap-2 lg:gap-8 w-full mb-24 my-4'>
            {/* BEGIN: Player Profile */}
            {/* END: Player Profile */}
          </div>
        </Content>
      </LayoutWrapper>
      {/* END: Second Section */}
      {/* BEGIN: Third Section */}
      <LayoutWrapper>
        <Content>
        </Content>
      </LayoutWrapper>
      {/* END: Third Section */}
    </>
  );
}