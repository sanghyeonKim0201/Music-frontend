'use client';
import SongRow from '@/components/songRow';
import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import { useEffect, useState } from 'react';

export default function SongsPage() {
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<
    {
      id: string;
      title: string;
      artist: string;
      image: string;
      album: string;
    }[]
  >();

  useEffect(() => {
    async function getLikeVideoData() {
      const videos = await UseFetch('/api/youtube/likes');
      const playlists = await UseFetch('/api/youtube/playlists/items');

      const videosData: Videos = await videos.json();
      const playlistsData: PlaylistItems[] = await playlists.json();

      const itmes = [videosData, ...playlistsData];
      setItems(
        itmes.flatMap((o) => {
          return o.items.map((obj) => {
            return {
              //@ts-ignore
              id: obj.contentDetails?.videoId ?? obj.id,
              title: obj.snippet.title,
              artist: obj.snippet.channelTitle,
              image: obj.snippet.thumbnails.medium.url,
              album: obj.snippet.channelTitle,
            };
          });
        }),
      );
    }

    getLikeVideoData();
  }, []);

  return (
    <div className='flex flex-col'>
      <div
        className='flex flex-row items-center w-full border-b border-zinc-800 pb-3 mb-3'
        onClick={(e) => {
          if (!items) return;
          dispatch(
            musicSlice.actions.startMusic(
              items
                .sort(() => Math.random() - 0.5)
                .map((o) => ({
                  id: o.id,
                  title: o.title,
                  context: o.artist,
                })),
            ),
          );
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          style={{ fill: 'white' }}
          className='w-7 h-7 p-1 bg-zinc-800 mr-5 rounded-sm'
        >
          <path d='M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z' />
        </svg>
        <div>모두 재생</div>
      </div>
      {items?.map((o, i) => {
        return (
          <SongRow
            id={o.id}
            image={o.image}
            title={o.title}
            album={o.album}
            artist={o.artist}
            key={i}
          ></SongRow>
        );
      })}
    </div>
  );
}
