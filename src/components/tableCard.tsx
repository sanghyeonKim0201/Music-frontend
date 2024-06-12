'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function TableCard({
  items,
  data,
  className,
}: {
  items: Videos['items'] | Playlists['items'];
  data: { image?: string; context?: string; title: string };
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageNumber = 12;
  const rows = 3;
  const cols = 4;
  const itemList: (Videos['items'] | Playlists['items'])[] = [];

  for (let i = 0; i < items.length; i += pageNumber) {
    itemList.push(items.slice(i, i + pageNumber));
  }

  function prevClick() {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }
  function nextClick() {
    if (
      Number((items.length / pageNumber).toString().slice(0, 1)) ===
      currentIndex
    )
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
            items.length > pageNumber ? 'block' : 'hidden'
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
                Number((items.length / pageNumber).toString().slice(0, 1)) ===
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

      <div className='grid grid-flow-row grid-rows-3'>
        {new Array(Math.ceil(itemList[currentIndex].length / (rows + 1)))
          .fill(null)
          .map((o, i) => {
            const col = itemList[currentIndex].slice(
              i * 4,
              cols * i + cols,
            ).length;
            return (
              <div className='grid grid-flow-col grid-cols-4 mr-2 mb-4' key={i}>
                {new Array(col).fill(null).map((obj, j) => {
                  const item = itemList[currentIndex][j + i * 4].snippet;
                  const title = item.title;
                  const context = item.channelTitle;
                  const image = item.thumbnails.medium.url;
                  return (
                    <div className='flex flex-row' key={j}>
                      <div className='w-14 h-14 mr-4'>
                        <Image
                          src={image}
                          width={100}
                          height={80}
                          alt='video profile'
                          className='h-full object-cover'
                        ></Image>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex flex-row truncate font-bold w-48 items-end text-end flex-1'>
                          {title}
                        </div>
                        <div className='flex flex-row truncate font-thin text-zinc-400 items-end text-end flex-1'>
                          {context}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
