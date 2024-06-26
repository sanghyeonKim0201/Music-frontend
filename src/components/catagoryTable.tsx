'use client';
import Image from 'next/image';
import { useState } from 'react';
import SmallCard from './smallCard';

export default function CategoryTable({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageNumber = 24;
  const rows = 4;
  const cols = 6;
  const items = [
    { text: '계절 변화를 위한 테마', color: 'border-amber-200' },
    { text: '사랑 노래', color: 'border-red-500' },
    { text: '국내 R&B', color: 'border-violet-400' },
    { text: '록', color: 'border-red-500' },
    { text: '힘이 필요할 때', color: 'border-amber-200' },
    { text: '잠잘 때', color: 'border-violet-400' },
    { text: '연말연시', color: 'border-zinc-600' },
    { text: '2010년대', color: 'border-emerald-200' },
    { text: '국내 록/얼터너티브', color: 'border-red-500' },
    { text: 'R&B 및 소울', color: 'border-violet-400' },
    { text: 'OST & 뮤지컬', color: 'border-cyan-300' },
    { text: '2000년대', color: 'border-emerald-200' },
    { text: '국내 발라드', color: 'border-indigo-200' },
    { text: '힙합', color: 'border-amber-600' },
    { text: '슬픔', color: 'border-zinc-600' },
    { text: '국내 댄스', color: 'border-blue-500' },
    { text: '파티 음악', color: 'border-violet-400' },
    { text: '운동할 때', color: 'border-amber-400' },
    { text: '한국 힙합', color: 'border-amber-600' },
    { text: '인디 & 얼터너티브', color: 'border-zinc-500' },
    { text: '출퇴근 & 등하교', color: 'border-yellow-500' },
    { text: '편안한 분위기', color: 'border-indigo-200' },
    { text: '행복한 기분', color: 'border-emerald-400' },
    { text: '1990년대', color: 'border-green-400' },
    { text: '1980년대', color: 'border-green-500' },
  ];
  const itemList: any[][] = [];
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
          <div className='flex flex-col'>
            <div className='text-3xl font-bold flex flex-row items-end text-end flex-1'>
              분위기 및 장르
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row items-end ${
            items.length > pageNumber ? 'block' : 'hidden'
          }`}
        >
          {/* <button className='font-thin items-center border rounded-full mb-1 py-[0.3rem] px-3 mr-6 text-sm'>
            더보기
          </button> */}
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

      <div className={`grid grid-flow-row grid-rows-${rows}`}>
        {new Array(Math.ceil(itemList[currentIndex].length / cols))
          .fill(null)
          .map((o, i) => {
            const col = itemList[currentIndex].slice(i * cols, cols * i + cols);
            return (
              <div
                className={`grid grid-flow-col grid-cols-${cols} mr-2 mb-4 gap-5`}
                key={i}
              >
                {col.map((obj, j) => {
                  return (
                    <div
                      key={j}
                      className={`border-l-4 bg-zinc-800 rounded-sm px-3 py-3 text-sm ${obj.color}`}
                    >
                      {obj.text}
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
