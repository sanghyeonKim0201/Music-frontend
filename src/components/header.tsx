'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='fixed top-0 left-0 right-0 z-[999]'>
      <div className='flex flex-row justify-between items-center pr-40 pt-3'>
        <div className='flex flex-row items-center'>
          {/* 이 div width 조절해서 목록 접히고 핀거 구현 예정 */}
          <div className='flex flex-row'>
            <div className='ml-4 mr-3 p-1 hover:bg-zinc-800 rounded-[50%] w-10 h-10 flex flex-row justify-center items-center'>
              <button className='pt-1'>
                <span className='material-symbols-outlined'>menu</span>
              </button>
            </div>
            <div className='mr-6 mt-2'>
              <button>
                <Image
                  src={'/YoutubeMusic.png'}
                  alt=''
                  width={80}
                  height={100}
                />
              </button>
            </div>
          </div>

          <div className='w-max flex items-center rounded-lg bg-[#FFFFFF26] border-[1px] border-[#FFFFFF80] p-2'>
            <span className='material-symbols-outlined mr-3 ml-2'>search</span>
            <input
              className='bg-transparent border-none outline-none w-[26rem]'
              type='search'
              placeholder='노래, 앨범, 아티스트, 팟캐스트 검색'
            />
          </div>
        </div>

        <div className='flex flex-row'>asasd</div>
      </div>
    </header>
  );
}
