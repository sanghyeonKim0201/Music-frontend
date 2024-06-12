import Image from 'next/image';

export default function SmallCard({
  image,
  title,
  context,
}: {
  image: string;
  title: string;
  context: string;
}) {
  return (
    <div className='flex flex-row'>
      <div className='w-14 h-14 mr-4'>
        <Image
          src={image}
          width={100}
          height={80}
          alt='video profile'
          className='h-full object-cover'
        ></Image>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row truncate font-bold w-48 items-end text-end flex-1'>
          {title}
        </div>
        <div className='flex flex-row truncate font-thin text-zinc-400 items-end text-end flex-1'>
          {context}
        </div>
      </div>
    </div>
  );
}
