'use client';
import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import Image from 'next/image';

export default function BigCard({
  data,
  className,
  type,
}: {
  data: { id: string; image: string; title: string; context: string };
  className?: string;
  type: 'video' | 'playlist';
}) {
  const dispatch = useAppDispatch();
  const moveDetails = () => {};

  const playVideo = async () => {
    if (type === 'playlist') {
      const response = await UseFetch(`/api/youtube/playlist/item/${data.id}`);
      const items: PlaylistItems = await response.json();
      dispatch(
        musicSlice.actions.startMusic(
          items.items.map((o) => {
            return {
              id: o.id,
              title: o.snippet.title,
              context: o.snippet.channelTitle,
            };
          }),
        ),
      );
    } else {
      dispatch(
        musicSlice.actions.startMusic([
          { id: data.id, title: data.title, context: data.context },
        ]),
      );
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className='mb-4 relative group flex flex-1'>
        <button
          className='w-full h-full'
          onClick={() => {
            type === 'video' ? playVideo() : moveDetails();
          }}
        >
          {data.image ? (
            <Image
              src={data.image}
              alt='video profile'
              width={152}
              height={152}
              className='rounded-md w-full h-full object-cover group-hover:brightness-50'
            ></Image>
          ) : null}
        </button>

        <button>
          <span className='material-symbols-outlined absolute top-1 right-1 hidden group-hover:block hover:bg-zinc-200 hover:bg-opacity-10 rounded-full p-1'>
            more_vert
          </span>
        </button>
        <button className=''>
          <span
            className={`material-symbols-outlined rounded-full absolute ${
              type === 'video'
                ? 'bottom-8 right-20 text-4xl'
                : 'bottom-2 right-3 p-2 hover:opacity-100 hover:p-[0.6rem] first-line: bg-black opacity-65'
            }    group-hover:block hidden`}
            style={{ fontVariationSettings: "'FILL' 1" }}
            onClick={() => {
              playVideo();
            }}
          >
            play_arrow
          </span>
        </button>
      </div>
      <div className='font-normal text-sm truncate'>{data.title}</div>
      <div className='text-sm text-zinc-400 font-light truncate'>
        {data.context}
      </div>
    </div>
  );
}
