import Image from 'next/image';

export default function BigCard({
  image,
  title,
  context,
  className,
}: {
  image: string;
  title: string;
  context: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className='mb-4 relative group flex flex-1'>
        {image ? (
          <Image
            src={image}
            alt='video profile'
            width={50}
            height={50}
            className='rounded-md w-full h-full object-cover group-hover:brightness-50'
          ></Image>
        ) : null}
        <button>
          <span className='material-symbols-outlined absolute top-1 right-1 hidden group-hover:block hover:bg-zinc-200 hover:bg-opacity-10 rounded-full p-1'>
            more_vert
          </span>
        </button>
        <button className=''>
          <span
            className='material-symbols-outlined rounded-full absolute bottom-2 right-3 p-2 hover:p-[0.6rem] hover:opacity-100 first-line: bg-black opacity-65 group-hover:block hidden'
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </button>
      </div>
      <div className='font-normal text-sm truncate'>{title}</div>
      <div className='text-sm text-zinc-400 font-light '>{context}</div>
    </div>
  );
}
