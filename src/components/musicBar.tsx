'use client';

import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';

export default function MusicBar() {
  const useMusicStore = useAppSelector((state) => state.RootReducer.musicSlice);
  const dispatch = useAppDispatch();
  // const playlistItems = useState<string[]>([]);
  // useEffect(() => {
  //   async function getVideos() {
  //     const response = await UseFetch(
  //       `/api/youtube/playlist/item/${useMusicStore.id}`,
  //     );
  //     const data: PlaylistItems = await response.json();
  //     return data;
  //   }
  // }, [useMusicStore.id]);
  const [icons, setIcons] = useState({
    left: ['skip_previous', 'pause', 'skip_next'],
    center: ['thumb_down', 'thumb_up', 'more_vert'],
    right: ['volume_up', 'repeat', 'shuffle', 'arrow_drop_up'],
  });

  const onLeftIconClick = (index: number) => {
    if (index === 1) {
      dispatch(musicSlice.actions.togglePlay());
      if (useMusicStore.status.playing === 'stop') icons.left[1] = 'pause';
      else icons.left[1] = 'play_arrow';
    }
  };
  const onCenterIconClick = (index: number) => {};
  const onRightIconClick = (index: number) => {
    if (index === 0) {
      dispatch(musicSlice.actions.toggleVolume());
      if (useMusicStore.status.isVolume) icons.right[0] = 'volume_up';
      else icons.right[0] = 'volume_off';
    } else if (index === 1) {
      dispatch(musicSlice.actions.toggleLoop());
      if (useMusicStore.status.loop) icons.right[1] = 'repeat';
      else icons.right[1] = 'repeat_one';
    }
  };
  return (
    <div
      className={`${
        useMusicStore.toggle ? 'flex' : 'hidden'
      } flex-row justify-between fixed z-[999] w-full bottom-0 items-center px-5 py-4 bg-zinc-800 `}
    >
      <div className='flex flex-row gap-7 flex-grow items-center'>
        {icons.left.map((o, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                onLeftIconClick(i);
              }}
            >
              <span
                style={{ fontVariationSettings: "'FILL' 1" }}
                className={`material-symbols-outlined ${
                  i == 1 ? 'text-4xl' : 'text-2xl'
                }`}
              >
                {o}
              </span>
            </button>
          );
        })}
      </div>
      <div className='flex flex-row flex-grow gap-5 items-center justify-center'>
        <div className='w-12 h-12'>
          <ReactPlayer
            url={`https://youtube.com/watch?v=${useMusicStore.id}`}
            height={48}
            width={48}
            playing={useMusicStore.status.playing === 'play'}
            loop={useMusicStore.status.loop}
            volume={useMusicStore.volume}
            muted={useMusicStore.status.isVolume}
          ></ReactPlayer>
        </div>

        <div className='flex flex-col'>
          <div className='truncate'>{useMusicStore.title}</div>
          <div className='font-thin text-sm truncate'>
            {useMusicStore.context}
          </div>
        </div>

        <div className='flex flex-row gap-5 items-center'>
          {icons.center.map((o, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  onCenterIconClick(i);
                }}
              >
                <span
                  style={{ fontVariationSettings: '' }}
                  className='material-symbols-outlined font-light text-2xl'
                >
                  {o}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className='flex flex-row gap-4 justify-end'>
        {icons.right.map((o, i) => {
          return (
            <div key={i} className='flex flex-row relative group'>
              {i === 0 ? (
                <div className='flex flex-row min-w-44 justify-end'>
                  <div className='absolute right-10 top-2 hidden group-hover:block'>
                    <input
                      type='range'
                      min={0}
                      max={1}
                      step='any'
                      onInput={(e) => {
                        dispatch(
                          musicSlice.actions.setVolume(e.currentTarget.value),
                        );
                        if (useMusicStore.volume < 0.03)
                          icons.right[0] = 'volume_off';
                        else icons.right[0] = 'volume_up';
                      }}
                      className='hidden group-hover:block'
                    />
                  </div>

                  <button
                    onClick={() => {
                      onRightIconClick(i);
                    }}
                  >
                    <span
                      className='material-symbols-outlined text-3xl font-thin'
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {o}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onRightIconClick(i);
                  }}
                >
                  <span
                    className='material-symbols-outlined text-3xl font-thin'
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {o}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
