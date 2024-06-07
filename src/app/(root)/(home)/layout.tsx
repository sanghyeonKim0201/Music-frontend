'use client';
import '@/styles/globals.css';
import Header from '@/components/header';
import SideBar from '@/components/sidebar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className='h-full flex flex-row'>
        <SideBar />
        <div className='pt-28 pl-44 w-full'>{children}</div>
      </div>
    </div>
  );
}
