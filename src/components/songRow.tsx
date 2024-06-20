import Image from 'next/image';

export default function SongRow({
  id,
  image,
  artist,
  album,
  title,
}: {
  id: string;
  image: string;
  artist?: string;
  title: string;
  album?: string;
}) {
  return (
    <div className='flex flex-row items-center w-full border-b border-zinc-800 pb-3 justify-between mb-3'>
      <div className='w-7 h-7 mr-5'>
        <Image
          src={image}
          alt='profile'
          width={300}
          height={300}
          className='w-full h-full object-cover'
        ></Image>
      </div>
      <div className='flex flex-row justify-between flex-1'>
        <div className='flex-1 truncate'>{title}</div>
        <div className='flex-1 truncate text-sm font-thin'>{artist}</div>
        <div className='flex-1 truncate text-sm font-thin'>{album}</div>
      </div>
      <div className='ml-5 text-sm font-thin'>{`${
        Math.floor(Math.random() * 3) + 1
      }:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}`}</div>
    </div>
  );
}
