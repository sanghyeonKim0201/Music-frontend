import Image from 'next/image';

export default function BigCard({
  image,
  title,
  context,
}: {
  image: string;
  title: string;
  context: string;
}) {
  return (
    <div className='flex flex-col mr-5'>
      <div className='mb-4 h-48 w-48 relative group'>
        {image ? (
          <Image
            src={image}
            alt='video profile'
            width={200}
            height={100}
            className='rounded-md h-full object-cover group-hover:brightness-50'
          ></Image>
        ) : null}
        <button className=''>
          <span className='material-symbols-outlined absolute top-3 right-3 hidden group-hover:block hover:bg-zinc-200 hover:bg-opacity-10 rounded-full p-1'>
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
      <div className='font-normal truncate'>{title}</div>
      <div className='text-zinc-400 font-light truncate'>{context}</div>
    </div>
  );
}
