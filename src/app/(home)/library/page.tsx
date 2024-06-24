'use client';

import BigCard from '@/components/bigCard';
import UseFetch from '@/utils/useFetch';
import { useEffect, useState } from 'react';

export default function LibraryPage() {
  const [items, setItems] =
    useState<{ id: string; title: string; context: string; image: string }[]>();

  useEffect(() => {
    async function getPlaylists() {
      const response = await UseFetch('/api/youtube/playlists');

      const playlists: Playlists = await response.json();

      setItems(
        playlists.items.map((o) => ({
          id: o.id,
          title: o.snippet.title,
          context: `${o.snippet.channelTitle} • 트랙 ${o.contentDetails?.itemCount}개`,
          image: o.snippet.thumbnails.medium.url,
        })),
      );
    }
    getPlaylists();
  }, []);

  return (
    <div className='grid grid-flow-row grid-cols-7 gap-5'>
      <div className={`flex flex-col`}>
        <div className='mb-4 relative group flex flex-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className='bg-white rounded-md'
          >
            <path d='M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z' />
          </svg>
          <button>
            <span className='material-symbols-outlined absolute top-1 right-1 hidden group-hover:block hover:bg-zinc-200 hover:bg-opacity-10 rounded-full p-1'>
              more_vert
            </span>
          </button>
          <button
            className=''
            onClick={(e) => {
              () => {};
            }}
          >
            <span
              className='material-symbols-outlined rounded-full absolute bottom-2 right-3 p-2 hover:p-[0.6rem] hover:opacity-100 first-line: bg-black opacity-65 group-hover:block hidden'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
        </div>
        <div className='font-normal text-sm truncate'>좋아요 표시한 음악</div>
        <div className='text-sm text-zinc-400 font-light '>
          <div className='flex flex-row'>
            <span
              className='material-symbols-outlined'
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 1" }}
            >
              keep
            </span>
            자동 재생목록
          </div>
        </div>
      </div>

      {items?.map((o, i) => {
        return <BigCard data={o} type='playlist' key={i}></BigCard>;
      })}

      <div className={`flex flex-col`}>
        <div className='mb-4 relative group flex flex-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-60 0 512 512'
            className='bg-white rounded-md'
          >
            <path d='M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z' />
          </svg>
          <button>
            <span className='material-symbols-outlined absolute top-1 right-1 hidden group-hover:block hover:bg-zinc-200 hover:bg-opacity-10 rounded-full p-1'>
              more_vert
            </span>
          </button>
          <button className=''>
            <span
              className='material-symbols-outlined rounded-full absolute bottom-2 right-3 p-2 hover:p-[0.6rem] hover:opacity-100 first-line: bg-black opacity-65 group-hover:block hidden'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
        </div>
        <div className='font-normal text-sm truncate'>나중에 볼 에피스도</div>
        <div className='text-sm text-zinc-400 font-light truncate '>
          나중에 시청하려고 저장한 에피소드
        </div>
      </div>
    </div>
  );
}
