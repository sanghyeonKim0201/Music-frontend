import CardGroup from '@/components/cardGroup';
import CategoryTable from '@/components/catagoryTable';
import TableCard from '@/components/tableCard';
import UseFetch from '@/utils/useFetch';
import { cookies, headers } from 'next/headers';

const accessToken = cookies().get('accessToken')?.value;
const refreshToken = cookies().get('refreshToken')?.value;

async function getRecentVideos() {
  const response = await UseFetch('/api/youtube/recent-video', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });
  const data: RecentVideos = await response.json();
  return data;
}

async function getMostVideo() {
  const response = await UseFetch('/api/youtube/videos', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });
  const data: Videos = await response.json();
  return data;
}
export default async function ExplorePage() {
  const recentVideos = await getRecentVideos();
  const videos = await getMostVideo();
  return (
    <div>
      <div className='flex flex-row justify-between gap-5 mb-24'>
        {[
          { text: '최신 음악', icon: 'music_note' },
          { text: '차트', icon: 'trending_up' },
          { text: '분위기 및 장르', icon: 'sentiment_satisfied' },
        ].map((o, i) => {
          return (
            <button
              key={i}
              className='flex flex-row flex-1 rounded-sm bg-zinc-800 px-4 py-3 items-center hover:bg-zinc-900'
            >
              <span className='material-symbols-outlined mr-5'>{o.icon}</span>
              <div className='text-2xl font-bold'>{o.text}</div>
            </button>
          );
        })}
      </div>

      <div className='mb-24'>
        <CardGroup
          items={recentVideos.items}
          data={{ title: '새 앨범 및 싱글' }}
          className='w-full'
        ></CardGroup>
      </div>

      <div className='mb-24'>
        <TableCard
          items={videos.items}
          data={{ title: '인기곡' }}
          ranking={true}
          className='w-full'
        ></TableCard>
      </div>
      <div>
        <CategoryTable></CategoryTable>
      </div>
    </div>
  );
}
