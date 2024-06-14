import Image from 'next/image';

export default function SmallCard({
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
    <div className={`flex flex-row relative group ${className}`}>
      <div className='mr-4 w-12 h-12'>
        <Image
          src={image}
          width={100}
          height={80}
          alt='video profile'
          className='w-full h-full object-cover rounded-sm'
        ></Image>
      </div>
      <div
        className={`absolute group-hover:flex hidden flex-row top-0 right-0 bg-black`}
      >
        {['thumb_up', 'thumb_down', 'more_vert'].map((o, i) => {
          return (
            <button key={i} className='items-center flex flex-row mr-5'>
              <span className='material-symbols-outlined hover:bg-zinc-800 p-2 rounded-full'>
                {o}
              </span>
            </button>
          );
        })}
      </div>
      <div className='flex flex-col text-start truncate w-80 2xl:w-96'>
        <div className='truncate font-bold'>{title}</div>
        <div className='truncate font-thin text-zinc-400 '>{context}</div>
      </div>
    </div>
  );
}
