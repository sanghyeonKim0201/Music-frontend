'use client';

import { useAppSelector } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import { useEffect, useState } from 'react';

export default function MusicBar() {
  const useMusicStore = useAppSelector((state) => state.RootReducer.musicSlice);
  const playlistItems = useState<string[]>([]);
  useEffect(() => {
    async function getVideos() {
      const response = await UseFetch(
        `/api/youtube/playlist/item/${useMusicStore.id}`,
      );
      const data: PlaylistItems = await response.json();
    }
  });
  const icons = {
    left: ['skip_previous', 'pause', 'skip_next'],
    center: ['thumb_up', 'thumb_down', 'more_vert'],
    right: ['volume_up', 'repeat', 'shuffle', 'arrow_drop_up'],
  };
  return (
    <div className='flex flex-row justify-between fixed z-[999] w-full bottom-0 items-center px-5 py-4 bg-zinc-800'>
      <div className='flex flex-row gap-7 items-center'>
        {icons.left.map((o, i) => {
          return (
            <span
              key={i}
              style={{ fontVariationSettings: "'FILL' 1" }}
              className={`material-symbols-outlined ${
                i == 1 ? 'text-4xl' : 'text-2xl'
              }`}
            >
              {o}
            </span>
          );
        })}
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-row'>
          <div></div>
          <div className='flex flex-col'>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className='flex flex-row gap-5'>
          {icons.center.map((o, i) => {
            return (
              <span
                key={i}
                style={{ fontVariationSettings: '' }}
                className='material-symbols-outlined font-light text-2xl'
              >
                {o}
              </span>
            );
          })}
        </div>
      </div>
      <div className='flex flex-row gap-4'>
        <div></div>
        {icons.right.map((o, i) => {
          return (
            <span
              className='material-symbols-outlined text-3xl font-thin'
              style={{ fontVariationSettings: "'FILL' 1" }}
              key={i}
            >
              {o}
            </span>
          );
        })}
      </div>
    </div>
  );
}
