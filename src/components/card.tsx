'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Card({
  items,
  data,
  className,
}: {
  items: Videos['items'] | Playlists['items'];
  data: { image?: string; context?: string; title: string };
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemList: (Videos['items'] | Playlists['items'])[] = [];

  for (let i = 0; i < items.length; i += 6) {
    itemList.push(items.slice(i, i + 6));
  }

  function prevClick() {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }
  function nextClick() {
    if (Number((items.length / 6).toString().slice(0, 1)) === currentIndex)
      return;
    setCurrentIndex(currentIndex + 1);
  }
  return (
    <div className={`${className} mr-20`}>
      <div className='flex flex-row justify-between mb-4'>
        <div className='flex flex-row'>
          <div>
            {data.image && data.image !== '' ? (
              <Image
                src={data.image}
                alt='profile'
                width={55}
                height={55}
                className='rounded-full bg-white mr-5'
              ></Image>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row text-zinc-400 font-light items-end '>
              {data.context ?? null}
            </div>
            <div className='text-3xl font-bold flex flex-row items-end text-end flex-1'>
              {data.title}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row items-end mr-5 ${
            items.length > 6 ? 'block' : 'hidden'
          }`}
        >
          <button className='font-thin items-center border rounded-full mb-1 py-[0.3rem] px-3 mr-6 text-sm'>
            더보기
          </button>
          <button onClick={prevClick}>
            <span
              className={`material-symbols-outlined font-thin border rounded-full p-1 mr-3 ${
                currentIndex === 0 ? 'opacity-45' : ''
              }`}
            >
              chevron_left
            </span>
          </button>
          <button onClick={nextClick}>
            <span
              className={`material-symbols-outlined font-thin border rounded-full p-1 ${
                Number((items.length / 6).toString().slice(0, 1)) ===
                currentIndex
                  ? 'opacity-45'
                  : ''
              }`}
            >
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div className='grid grid-flow-col grid-cols-6'>
        {new Array(itemList[currentIndex].length).fill(null).map((o, i) => {
          const item = itemList[currentIndex][i].snippet;
          const image = item.thumbnails.medium;
          return (
            <div key={i} className='flex flex-col mr-5'>
              <div className='mb-4 h-48 w-48 relative group '>
                {image ? (
                  <Image
                    src={image.url}
                    alt='video profile'
                    width={image.width}
                    height={image.height}
                    className='rounded-md h-full object-cover group-hover:brightness-50'
                  ></Image>
                ) : null}
                <button className=''>
                  <span className='material-symbols-outlined absolute top-3 right-3 hidden group-hover:block'>
                    more_vert
                  </span>
                </button>
                <button className=''>
                  <span
                    className='material-symbols-outlined rounded-full absolute bottom-5 right-5 p-2 hover:p-[0.6rem] hover:opacity-100 first-line: bg-black opacity-65 group-hover:block hidden'
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>
              <div className='font-normal truncate'>{item.title}</div>
              <div className='text-zinc-400 font-light truncate'>
                {item.channelTitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
