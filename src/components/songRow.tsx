'use client';

import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch } from '@/lib/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SongRow({
  id,
  image,
  artist,
  album,
  title,
}: {
  id: string;
  image: string;
  artist?: string;
  title: string;
  album?: string;
}) {
  const dispatch = useAppDispatch();

  const [time, setTime] = useState<string>('0:00 / 0:00');

  function playMusic() {
    dispatch(
      musicSlice.actions.startMusic([{ id, title, context: artist ?? '' }]),
    );
  }

  useEffect(
    () =>
      setTime(
        `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, '0')}`,
      ),
    [],
  );

  return (
    <div className='flex flex-row items-center w-full border-b border-zinc-800 pb-3 justify-between mb-3'>
      <div className='w-7 h-7 mr-5'>
        <Image
          src={image}
          alt='profile'
          width={300}
          height={300}
          className='w-full h-full object-cover'
          onClick={(e) => {
            playMusic();
          }}
        ></Image>
      </div>
      <div className='flex flex-row justify-between flex-1'>
        <div
          className='flex-1 truncate'
          onClick={(e) => {
            playMusic();
          }}
        >
          {title}
        </div>
        <div className='flex-1 truncate text-sm font-thin'>{artist}</div>
        <div className='flex-1 truncate text-sm font-thin'>{album}</div>
      </div>
      <div className='ml-5 text-sm font-thin'>{time}</div>
    </div>
  );
}
