'use client';

import { menuSlice } from '@/lib/feature/menuSlice';
import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const useRatingStore = useAppSelector(
    (state) => state.RootReducer.ratingSlice,
  );
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const [videos, setVideos] = useState<RecentVideos>();

  useEffect(() => {
    dispatch(menuSlice.actions.selectionMenu(''));

    async function getSearch() {
      const keyword = searchParams.get('keyword');

      const response = await UseFetch(`/api/youtube/search?keyword=${keyword}`);

      const data: RecentVideos = await response.json();

      setVideos(data);
    }

    getSearch();
  }, [dispatch, searchParams]);

  function playMusic(id: string, title: string, context: string) {
    dispatch(musicSlice.actions.startMusic([{ id, title, context }]));
  }

  return (
    <div className='flex flex-col gap-14'>
      <div className='flex flex-col gap-5'>
        <div className='text-2xl font-bold'>상위 검색결과</div>
        <div className='flex flex-row w-full border rounded-md p-3 gap-5'>
          <div>
            {videos ? (
              <Image
                src={videos?.items[0].snippet.thumbnails.medium.url as string}
                alt='profile'
                width={200}
                height={200}
                className='rounded-sm'
              ></Image>
            ) : null}
          </div>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-col justify-center'>
              <div className='text-xl'>{videos?.items[0].snippet.title}</div>
              <div className='font-thin'>
                {videos?.items[0].snippet.channelTitle}
              </div>
            </div>
            <div className='flex flex-row items-center gap-5'>
              <div>
                <button
                  className={`flex flex-row py-1 rounded-full items-center gap-1 px-10 bg-white text-black`}
                >
                  <span className='material-symbols-outlined text-lg'>
                    shuffle
                  </span>
                  <div className={`text-sm`}>셔플</div>
                </button>
              </div>
              <div>
                <button
                  className={`flex flex-row py-1 rounded-full items-center gap-1 px-10 border`}
                  onClick={(e) => {
                    videos
                      ? playMusic(
                          videos.items[0].id.videoId,
                          videos.items[0].snippet.title,
                          videos.items[0].snippet.channelTitle,
                        )
                      : null;
                  }}
                >
                  <span
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    className='material-symbols-outlined text-lg'
                  >
                    play_arrow
                  </span>
                  <div className={`text-sm`}>재생</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='text-2xl font-bold'>노래</div>
        {videos?.items.slice(1).map((o, i) => {
          return (
            <div
              key={i}
              className='flex flex-row border-b border-zinc-800 mb-3 pb-3 items-center max-w-full'
              onClick={(e) => {
                playMusic(
                  o.id.videoId,
                  o.snippet.title,
                  o.snippet.channelTitle,
                );
              }}
            >
              <div className='mr-5 flex-shrink-0'>
                <Image
                  src={o.snippet.thumbnails.medium.url}
                  alt='profile'
                  width={50}
                  height={50}
                  className='w-full h-full object-cover'
                  onClick={(e) => {}}
                ></Image>
              </div>
              <div className='flex flex-col min-w-0'>
                <div className=''>{o.snippet.title}</div>
                <div className='truncate'>{o.snippet.channelTitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
