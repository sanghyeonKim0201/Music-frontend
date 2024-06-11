import Image from 'next/image';

export default function Card({
  videos,
  title,
}: {
  videos: Videos | Playlists;
  title: { image?: string; context?: string; title: string };
}) {
  return (
    <div>
      <div className='flex flex-row justify-between mb-4'>
        <div className='flex flex-row'>
          <div>
            {title.image ? (
              <Image
                src={title.image}
                alt='profile'
                width={55}
                height={55}
                className='rounded-full bg-white mr-5'
              ></Image>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row text-zinc-400 font-light items-end '>
              {title.context ?? null}
            </div>
            <div className='text-3xl font-bold flex flex-row items-end text-end flex-1'>
              {title.title}
            </div>
          </div>
        </div>
        <div className='flex flex-row items-end mr-8'>
          <button className='font-thin items-center border rounded-full mb-1 py-[0.3rem] px-3 mr-6 text-sm'>
            더보기
          </button>
          <button>
            <span className='material-symbols-outlined font-thin border rounded-full p-1 mr-3'>
              chevron_left
            </span>
          </button>
          <button>
            <span className='material-symbols-outlined font-thin border rounded-full p-1'>
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div className='grid grid-flow-col'>
        {new Array(6).fill(null).map((o, i) => {
          const item = videos.items[i].snippet;
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
              <div className='font-normal'>{item.title}</div>
              <div className='text-zinc-400 font-light'>
                {item.channelTitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
