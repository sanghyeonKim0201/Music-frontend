import Image from 'next/image';

export default function ArtistRow({
  image,
  title,
  context,
}: {
  image: string;
  title: string;
  context: string;
}) {
  return (
    <div className='flex flex-row border-b border-zinc-800 mb-3 pb-3 items-center max-w-full'>
      <div className='mr-5 flex-shrink-0'>
        <Image
          src={image}
          alt='profile'
          width={50}
          height={50}
          className='w-full h-full rounded-full object-cover'
        ></Image>
      </div>
      <div className='flex flex-col min-w-0'>
        <div className=''>{title}</div>
        <div className='truncate'>{context}</div>
      </div>
    </div>
  );
}
