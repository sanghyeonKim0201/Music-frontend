'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedMainMenuIndex, setSelectedMainMenuIndex] = useState<
    'storage' | 'offline'
  >('storage');
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState<number>(0);

  const menus = {
    storage: [
      {
        name: 'Main',
        children: ['재생목록', '노래', '앨범', '아티스트', '팟캐스트'],
        url: [
          '/library/playlists',
          '/library/songs',
          '/library',
          '/library',
          '/library',
        ],
        filters: ['최근 활동', '최근에 저장됨', '최근 재생한 음악'],
      },
      {
        name: '재생목록',
        children: ['close', '재생목록'],
        url: ['/library', '/library'],
        filters: ['최근에 저장됨', '가나다순', '가나다 역순'],
      },
      {
        name: '노래',
        children: ['close', '노래'],
        url: ['/library', '/library'],
        filters: ['최근에 저장됨', '가나다순', '가나다 역순'],
      },
      {
        name: '앨범',
        children: ['close', '앨범'],
        url: ['/library', '/library'],
        filters: ['최근에 저장됨', '가나다순', '가나다역순'],
      },
      {
        name: '아티스트',
        url: ['/library', '/library', '/library'],
        children: ['close', '아티스트', '구독'],
        filters: [
          '최근에 저장됨',
          '가나다순',
          '가나다 역순',
          '가장 곡이 많은 아티스트',
        ],
      },
      {
        name: '팟캐스트',
        url: ['/library', '/library', '/library'],
        children: ['close', '팟캐스트', '채널'],
        filters: ['최근에 저장됨', '가나다순', '가나다 역순'],
      },
    ],
    offline: [
      {
        name: 'Main',
        children: ['Paylists', 'Podcasts', 'Songs', 'Albums'],
        url: ['/library', '/library', '/library', '/library'],
      },
      {
        name: 'Playlists',
        children: ['close', 'Playlists'],
        url: ['/library', '/library'],
      },
      {
        name: 'Podcasts',
        children: ['close', 'Podcasts'],
        url: ['/library', '/library'],
      },
      {
        name: 'Songs',
        children: ['close', 'Songs'],
        url: ['/library', '/library'],
      },
      {
        name: 'Albums',
        children: ['close', 'Albums'],
        url: ['/library', '/library'],
      },
    ],
  };

  const filterDropdown = (
    <button className='flex flex-row justify-between text-sm items-center rounded-full bg-zinc-800 border-zinc-700 border px-5 py-2 w-[14%]'>
      <div className=''>{menus.storage[selectedSubMenuIndex].filters?.[0]}</div>
      <span className='material-symbols-outlined'>arrow_drop_down</span>
    </button>
  );
  const donwloadSettingButton = (
    <button className='flex flex-row gap-10 text-sm items-center rounded-full px-5 py-2 hover:bg-blue-400 hover:bg-opacity-20'>
      <div className='text-blue-500'>Downloads Settings</div>
    </button>
  );

  return (
    <div className='w-11/12'>
      <div className='flex flex-row text-sm border-b border-zinc-800 mb-8'>
        {['보관함', '오프라인 저장'].map((o, i) => {
          const url = ['/library', '/library/offline'][i];
          return (
            <Link
              href={url}
              key={i}
              onClick={(e) => {
                const click: 'storage' | 'offline' = ['storage', 'offline'][
                  i
                ] as 'storage' | 'offline';
                setSelectedSubMenuIndex(0);
                setSelectedMainMenuIndex(click);
              }}
            >
              <button
                className={`mx-4 pb-2  ${
                  ['storage', 'offline'][i] === selectedMainMenuIndex
                    ? 'border-b-2 border-white text-white border-opacity-100'
                    : 'border-b-1 border-zinc-800 text-zinc-600'
                }`}
              >
                {selectedMainMenuIndex === 'offline' && i === 1
                  ? o + ' 콘텐츠'
                  : o}
              </button>
            </Link>
          );
        })}
      </div>

      <div className='flex flex-row justify-between ml-5'>
        <div className='flex flex-row gap-5'>
          {new Array(
            menus[selectedMainMenuIndex][selectedSubMenuIndex],
          ).flatMap((o, i) => {
            const isSelected = o.name !== 'Main';
            return o.children.map((x, j) => {
              return (
                <Link
                  href={
                    menus[selectedMainMenuIndex][selectedSubMenuIndex].url[j]
                  }
                  key={j}
                  onClick={(e) => {
                    let index = j + 1;
                    if (o.name === x) {
                      index = 0;
                    }
                    if (x === 'close') {
                      index = 0;
                    }
                    if (isSelected && j > 1) return;
                    setSelectedSubMenuIndex(index);
                  }}
                >
                  <button
                    className={`text-sm flex flex-row justify-center items-center rounded-lg ${
                      // 한글과 영어 폰트의 크기가 달라서 고정 시킴
                      selectedMainMenuIndex === 'storage'
                        ? 'my-[0.3rem]'
                        : 'my-[0.2rem]'
                    } px-3 py-1 ${
                      isSelected && (j === 0 || j === 1)
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 hover:bg-zinc-700 '
                    } ${isSelected && j === 0 ? 'my-1 pb-0' : ''}`}
                  >
                    <span
                      className={`flex items-center ${
                        x === 'close' ? 'material-symbols-outlined' : ''
                      } `}
                    >
                      {x}
                    </span>
                  </button>
                </Link>
              );
            });
          })}
        </div>

        {selectedMainMenuIndex === 'storage'
          ? menus['storage'][selectedSubMenuIndex].filters
            ? filterDropdown
            : null
          : donwloadSettingButton}
      </div>
      <div className='ml-5 mt-10'>{children}</div>
    </div>
  );
}
