import Image from 'next/image';

export default function Card({
  videos,
  title,
}: {
  videos: Videos;
  title: { image?: string; context?: string; title: string };
}) {
  return (
    <div className='h-52'>
      <div className='flex flex-row mb-5'>
        <div>
          {/* <Image
                  src={
                    'https://lh3.googleusercontent.com/a/ACg8ocJmUux6918duRgQiTCEWHW6eqeGv7JTljNP6uiVwsFn4JKIdMFg=s96-c'
                  }
                  alt='profile'
                  width={55}
                  height={55}
                  className='rounded-full bg-white mr-5'
                ></Image> */}
        </div>
        <div className='flex flex-col'>
          <div className='text-zinc-400'>{title.context ?? null}</div>
          <div className='text-3xl font-bold'>{title.title}</div>
        </div>
      </div>
      <div className='flex flex-row h-full'>
        {new Array(6).fill(null).map((o, i) => {
          const item = videos.items[i].snippet;
          const image = item.thumbnails.medium.url;
          return (
            <div key={i} className='flex flex-col mr-5'>
              <div className='h-full'>
                {image ? (
                  <Image
                    src={image}
                    alt='video profile'
                    width={300}
                    height={300}
                    className='rounded-md h-full pb-5'
                  ></Image>
                ) : null}
              </div>
              <div></div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
