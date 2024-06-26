'use client';

import PlaylistInsert from '@/components/modal/playlistInsert';
import MusicBar from '@/components/musicBar';
import { menuSlice } from '@/lib/feature/menuSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const useToggleStore = useAppSelector(
    (state) => state.RootReducer.menuSlice.toggle,
  );
  const { element } = useAppSelector((state) => state.RootReducer.modalSlice);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  useEffect(() => {
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
  }, [pathname, dispatch]);

  return (
    // 사이드바 펴치면 ml-40 접히면 ml-0
    <div>
      {element}
      <div className={`${useToggleStore ? 'ml-0' : 'ml-40'}`}>{children}</div>
    </div>
  );
}
