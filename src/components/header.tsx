'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='fixed top-0 left-0 right-0 z-[999]'>
      <div className='flex flex-row justify-between items-center pl-7 pt-3 pr-40'>
        <div className='flex flex-row items-center'>
          {/* 이 div width 조절해서 목록 접히고 핀거 구현 예정 */}
          <div className='flex flex-row'>
            <div className='mr-5 pt-1'>
              <span className='material-symbols-outlined'>menu</span>
            </div>
            <div className='mr-5 pt-1'>
              <Image src={'/logo.png'} alt='' width={80} height={100} />
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
