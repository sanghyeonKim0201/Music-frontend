'use client';

import MusicBar from '@/components/musicBar';
import { menuSlice } from '@/lib/feature/menuSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const useToggleStore = useAppSelector(
    (state) => state.RootReducer.menuSlice.toggle,
  );
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const menu = [
    {
      key: '/library',
      value: 'library',
    },
    {
      key: '/main',
      value: 'home',
    },
    {
      key: '/explore',
      value: 'explore',
    },
  ];

  if (menu.find((o) => pathname.startsWith(o.key))) {
    dispatch(
      menuSlice.actions.selectionMenu(
        menu.find((o) => pathname.startsWith(o.key))?.value,
      ),
    );
  }

  return (
    // 사이드바 펴치면 ml-40 접히면 ml-0
    <div className={`${useToggleStore ? 'ml-0' : 'ml-40'}`}>{children}</div>
  );
}
