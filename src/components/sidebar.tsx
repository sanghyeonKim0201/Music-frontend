'use client';
import { selectionMenu } from '@/lib/feature/menuSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';

export default function SideBar() {
  const bgColor = { selected: 'bg-zinc-800', none: 'hover:bg-zinc-700' };
  const style = {
    selected: {
      fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48",
    },
    none: {
      fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48",
    },
  };
  const useMenuStore = useAppSelector((state) => state.RootReducer.menuSlice);

  const dispatch = useAppDispatch();

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  function changeMenu(payload: string) {
    dispatch(selectionMenu(payload));
  }

  const closeSide = (
    <div
      className={`h-full flex flex-col items-start pt-[4.5rem] ${
        scrollPosition < 10
          ? 'bg-transparent'
          : 'bg-black border-r border-zinc-700'
      }`}
    >
      <div
        className='flex flex-col pl-2'
        style={{
          fontVariationSettings: "'wght' 300",
        }}
      >
        {new Array(3).fill(null).map((o, i) => {
          const icon = 'home,explore,library_music'.split(',')[i];
          const text = '홈,둘러보기,보관함'.split(',')[i];
          const closeMenu = (
            <button
              key={i}
              className={`py-3 px-3 ${
                useMenuStore.selectedMenu !== text
                  ? bgColor.none
                  : bgColor.selected
              } rounded-xl`}
              onClick={(e) => changeMenu(text)}
            >
              <span
                className='material-symbols-outlined'
                style={
                  useMenuStore.selectedMenu === text
                    ? style.selected
                    : style.none
                }
              >
                {icon}
              </span>
              <p className='text-[0.65rem]'>{text}</p>
            </button>
          );

          return closeMenu;
        })}
      </div>
    </div>
  );

  const openSide = (
    <div className='h-full w-full flex flex-col items-center pt-[4.5rem] border-r border-zinc-700 bg-black'>
      <div className='w-full px-2'>
        {new Array(3).fill(null).map((o, i) => {
          const icon = 'home,explore,library_music'.split(',')[i];
          const text = '홈,둘러보기,보관함'.split(',')[i];
          const openMenu = (
            <button
              key={i}
              className={`flex flex-row py-3 px-5 ${
                useMenuStore.selectedMenu !== text
                  ? bgColor.none
                  : bgColor.selected
              } rounded-lg w-full`}
              onClick={(e) => changeMenu(text)}
            >
              <span
                className='material-symbols-outlined mr-5'
                style={
                  useMenuStore.selectedMenu === text
                    ? style.selected
                    : style.none
                }
              >
                {icon}
              </span>
              <p className='text-sm'>{text}</p>
            </button>
          );

          return openMenu;
        })}
      </div>

      <hr className='border-zinc-700 mt-6 w-48' />

      <div className='flex w-full justify-center mt-6'>
        <button className='flex flex-row bg-zinc-800 hover:bg-zinc-700 px-12 justify-center items-center rounded-3xl'>
          <span className='material-symbols-outlined mr-1 text-3xl'>add</span>
          <p className='text-sm'>새 재생목록</p>
        </button>
      </div>

      <div className='w-full flex flex-col justify-center px-2 mt-5'>
        {new Array(2).fill(null).map((o, i) => {
          const title = ['좋아요 표시한 음악', '나중에 볼 에피소드'][i];
          const context = ['자동 재생목록', '자동 재생목록'][i];
          return (
            <button
              key={i}
              className={`flex flex-row justify-between ${
                useMenuStore.selectedMenu !== title
                  ? bgColor.none
                  : bgColor.selected
              } rounded-lg py-2 px-5`}
              onClick={(e) => changeMenu(title)}
            >
              <div className='flex flex-col items-start'>
                <p className='text-sm'>{title}</p>
                <div
                  className='flex flex-row'
                  style={{
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48",
                  }}
                >
                  {i === 0 ? (
                    <span className='material-symbols-outlined text-sm mr-1'>
                      keep
                    </span>
                  ) : null}
                  <p className='text-[0.7rem] text-zinc-400'>{context}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside
      className={`${
        useMenuStore.toggle ? 'w-20' : 'w-[15rem]'
      } h-full fixed left-0 top-0`}
    >
      {useMenuStore.toggle ? closeSide : openSide}
    </aside>
  );
}
