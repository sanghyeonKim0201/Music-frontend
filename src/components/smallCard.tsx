'use client';
import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch } from '@/lib/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SmallCard({
  data,
  className,
  ranking,
}: {
  data: { id: string; image: string; title: string; context: string };
  className?: string;
  ranking?: { status: 'up' | 'down' | 'maintain'; number: number } | undefined;
}) {
  const dispatch = useAppDispatch();

  const [icon, setIcon] = useState<string>('•');
  const [bg, setBg] = useState<string>('');
  useEffect(() => {
    setIcon(
      ranking?.status === 'up'
        ? 'arrow_drop_up'
        : ranking?.status === 'down'
        ? 'arrow_drop_down'
        : '•',
    );
    setBg(
      ranking?.status === 'up'
        ? 'text-green-500'
        : ranking?.status === 'down'
        ? 'text-red-500'
        : 'text-gray-500',
    );
  }, [ranking]);
  return (
    <div
      className={`flex flex-row relative group ${className}`}
      onClick={(e) => {
        dispatch(
          musicSlice.actions.startMusic([
            { id: data.id, context: data.context, title: data.title },
          ]),
        );
      }}
    >
      <div className=' w-12 h-12'>
        <Image
          src={data.image}
          width={100}
          height={80}
          alt='video profile'
          className='w-full h-full object-cover rounded-sm'
        ></Image>
      </div>
      <div
        className={`flex flex-row items-center w-12 ml-2 ${
          ranking ?? 'hidden'
        }`}
      >
        <span className={`material-symbols-outlined  p-1 ${bg}`}>{icon}</span>
        {ranking?.number}
      </div>
      <div
        className={`absolute group-hover:flex hidden flex-row top-0 right-0 bg-black`}
      >
        {['thumb_up', 'thumb_down', 'more_vert'].map((o, i) => {
          return (
            <button key={i} className='items-center flex flex-row mr-5'>
              <span className='material-symbols-outlined hover:bg-zinc-800 p-2 rounded-full'>
                {o}
              </span>
            </button>
          );
        })}
      </div>
      <div className='flex flex-col text-start truncate w-72 2xl:w-96 ml-4'>
        <div className='truncate font-bold'>{data.title}</div>
        <div className='truncate font-thin text-zinc-400 '>{data.context}</div>
      </div>
    </div>
  );
}
