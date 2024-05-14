import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-[999]'>
      <div className='flex flex-row justify-between items-center pr-40 pt-3'>
        <div className='flex flex-row items-center'>
          {/* 이 div width 조절해서 목록 접히고 핀거 구현 예정 */}
          {/* 사이드바  접히면 mr-0 펼쳐지면 mr-40 */}
          <div className='flex flex-row mr-40'>
            <div className='ml-5 mr-3 p-1 hover:bg-zinc-800 rounded-[50%] w-10 h-10 flex flex-row justify-center items-center'>
              <button className='pt-1'>
                <span
                  className='material-symbols-outlined'
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  menu
                </span>
              </button>
            </div>
            <div className='mr-6 mt-2'>
              <button>
                <Link href={'/'}>
                  <Image
                    src={'/YoutubeMusic.png'}
                    alt=''
                    width={80}
                    height={100}
                  />
                </Link>
              </button>
            </div>
          </div>

          <div className='w-max flex items-center rounded-lg bg-zinc-800 border-[1px] border-[#FFFFFF80] p-2'>
            <span
              className='material-symbols-outlined mr-3 ml-2'
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              search
            </span>
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
