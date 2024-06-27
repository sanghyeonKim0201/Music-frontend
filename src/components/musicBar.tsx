'use client';

import { musicSlice } from '@/lib/feature/musicSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
}

export default function MusicBar() {
  const useMusicStore = useAppSelector((state) => state.RootReducer.musicSlice);
  const useRatingStore = useAppSelector(
    (state) => state.RootReducer.ratingSlice,
  );

  const dispatch = useAppDispatch();

  const [icons, setIcons] = useState({
    left: ['skip_previous', 'pause', 'skip_next'],
    center: ['thumb_down', 'thumb_up', 'more_vert'],
    right: ['volume_up', 'repeat', 'shuffle', 'arrow_drop_up'],
  });

  const playedRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [urls, setUrls] =
    useState<{ url: string; title: string; context: string }[]>();
  const [totalTime, setTotalTime] = useState(0);
  const [urlIndex, setUrlIndex] = useState(0);
  const [ratingStatus, setRatingStatus] = useState<'like' | 'dislike' | 'none'>(
    'none',
  );
  const [time, setTime] = useState<string>('0:00 / 0:00');

  const onLeftIconClick = (index: number) => {
    if (!urls || urls?.length === 0) return;
    if (index === 0) {
      if (urlIndex - 1 <= -1) return;
      setPlayed(0);
      setUrlIndex(urlIndex - 1);
    }
    if (index === 1) {
      dispatch(musicSlice.actions.togglePlay());
      if (useMusicStore.status.playing === 'stop') icons.left[1] = 'pause';
      else icons.left[1] = 'play_arrow';
    }
    if (index === 2) {
      if (urlIndex + 1 >= urls.length) return;
      setPlayed(0);
      setUrlIndex(urlIndex + 1);
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
    } else if (index === 2) {
      setUrls(urls?.sort(() => Math.random() - 0.5));
      setUrlIndex(0);
    }
  };

  useEffect(() => {
    setTime(`${formatTime(played)} / ${formatTime(totalTime)}`);

    if (
      useRatingStore.likeVideos.find((o) => urls?.[urlIndex].url.endsWith(o))
    ) {
      setRatingStatus('like');
    } else if (
      useRatingStore.dislikeVideos.find((o) => urls?.[urlIndex].url.endsWith(o))
    ) {
      setRatingStatus('dislike');
    } else {
      setRatingStatus('none');
    }

    if (useMusicStore.data) {
      setUrls(
        useMusicStore.data.map((o) => {
          return {
            url: `https://youtube.com/watch?v=${o.id}`,
            title: o.title,
            context: o.context,
          };
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMusicStore.data, useRatingStore, urlIndex]);

  return (
    <div
      className={`flex flex-col fixed z-[999] bottom-0 w-full bg-zinc-800 ${
        useMusicStore.toggle ? 'flex' : 'hidden'
      }`}
    >
      <input
        type='range'
        min={0}
        max={totalTime}
        step='any'
        onChange={(e) => {
          setPlayed(parseFloat(e.target.value));
          //@ts-expect-error type추론 힘듬
          playedRef.current?.seekTo(parseFloat(e.target.value));
        }}
        value={played}
        className='accent-white'
      />
      <div
        className={`flex flex-row justify-between w-full items-center px-5 pb-4 pt-2 `}
      >
        <div className='flex flex-row gap-7 flex-grow items-center max-w-80'>
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
          <div className='text-sm font-thin'>{time}</div>
        </div>
        <div className='flex flex-row flex-grow gap-5 items-center justify-center'>
          <div className=''>
            <ReactPlayer
              url={urls?.[urlIndex].url}
              height={48}
              width={48}
              controls={false}
              ref={playedRef}
              playing={useMusicStore.status.playing === 'play'}
              loop={useMusicStore.status.loop}
              volume={useMusicStore.volume}
              muted={useMusicStore.status.isVolume}
              onProgress={(e) => {
                setPlayed(e.playedSeconds);
                setTime(`${formatTime(played)} / ${formatTime(totalTime)}`);
              }}
              onDuration={(e) => {
                setTotalTime(e);
              }}
              onEnded={() => {
                if (urlIndex + 1 === urls?.length) return;
                setUrlIndex(urlIndex + 1);
              }}
            ></ReactPlayer>
          </div>

          <div className='flex flex-col'>
            <div className='truncate'>{urls?.[urlIndex].title}</div>
            <div className='font-thin text-sm truncate'>
              {urls?.[urlIndex].context}
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
                    style={
                      (i === 0 && ratingStatus === 'dislike') ||
                      (i === 1 && ratingStatus === 'like')
                        ? { fontVariationSettings: "'FILL' 1" }
                        : {}
                    }
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
                        className='hidden group-hover:block accent-white'
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
    </div>
  );
}
