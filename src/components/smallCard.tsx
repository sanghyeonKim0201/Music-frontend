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
      <div className='mr-4 flex flex-1'>
        <Image
          src={image}
          width={100}
          height={80}
          alt='video profile'
          className='w-full h-full object-cover rounded-sm'
        ></Image>
      </div>
      <div
        className={`absolute group-hover:flex hidden flex-row top-0 right-0 bg-black h-14`}
      >
        {new Array(3).fill(null).map((o, i) => {
          const iconList = ['thumb_up', 'thumb_down', 'more_vert'];
          return (
            <button key={i} className='items-center flex flex-row mr-5'>
              <span className='material-symbols-outlined hover:bg-zinc-800 p-2 rounded-full'>
                {iconList[i]}
              </span>
            </button>
          );
        })}
      </div>
      <div className='flex flex-col'>
        <div className='whitespace-nowrap text-ellipsis overflow-hidden font-bold items-end text-end'>
          {title}
        </div>
        <div className='flex flex-row truncate font-thin text-zinc-400 items-end text-end'>
          {/* {context} */}
        </div>
      </div>
    </div>
  );
}
