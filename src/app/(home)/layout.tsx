'use client';

import { useAppSelector } from '@/lib/hooks';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toggle = useAppSelector((state) => state.RootReducer.menuSlice.toggle);
  return (
    // 사이드바 펴치면 ml-40 접히면 ml-0
    <div className={`${toggle ? 'ml-0' : 'ml-40'}`}>{children}</div>
  );
}
