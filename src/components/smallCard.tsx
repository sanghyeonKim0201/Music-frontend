import Image from 'next/image';

export default function SmallCard({
  image,
  title,
  context,
  className,
  ranking,
}: {
  image: string;
  title: string;
  context: string;
  className?: string;
  ranking?: { status: 'up' | 'down' | 'maintain'; number: number } | undefined;
}) {
  return (
    <div className={`flex flex-row relative group ${className}`}>
      <div className=' w-12 h-12'>
        <Image
          src={image}
          width={100}
          height={80}
          alt='video profile'
          className='w-full h-full object-cover rounded-sm'
        ></Image>
      </div>
      <div
        className={`flex flex-row items-center w-12 ml-2 ${
          ranking ?? 'hidden'
        }`}
      >
        <span
          className={`material-symbols-outlined  p-1 ${
            ranking?.status === 'up'
              ? 'text-green-500'
              : ranking?.status === 'down'
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
        >
          {ranking?.status === 'up'
            ? 'arrow_drop_up'
            : ranking?.status === 'down'
            ? 'arrow_drop_down'
            : '•'}
        </span>
        {ranking?.number}
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
      <div className='flex flex-col text-start truncate w-72 2xl:w-96 ml-4'>
        <div className='truncate font-bold'>{title}</div>
        <div className='truncate font-thin text-zinc-400 '>{context}</div>
      </div>
    </div>
  );
}
