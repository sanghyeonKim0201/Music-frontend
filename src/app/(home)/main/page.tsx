import Card from '@/components/card';
import TableCard from '@/components/tableCard';
import UseFetch from '@/utils/useFetch';
import { cookies } from 'next/headers';

const accessToken = cookies().get('accessToken')?.value;
const refreshToken = cookies().get('refreshToken')?.value;

async function getMostVideos(): Promise<Videos> {
  const response = await UseFetch('/api/youtube/videos', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  return await response.json();
}

async function getLikeVideos(): Promise<Videos> {
  const response = await UseFetch('/api/youtube/likes', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  return await response.json();
}

export default async function MainPage() {
  const vidoes = await getMostVideos();
  const liekVidoes = await getLikeVideos();
  return (
    <div>
      <TableCard
        data={{
          title: '빠른 선곡',
          context: '이 노래로 뮤직 스테이션 시작하기',
        }}
        items={liekVidoes.items}
        className='mb-28'
      ></TableCard>
      {new Array(3).fill(null).map((o, i) => {
        const titleList = ['다시 듣기', '인기곡', '인기곡2'];
        const contextList = ['김상현', '', '두 번째 인기곡'];
        const imageList = [
          'https://lh3.googleusercontent.com/a/ACg8ocJmUux6918duRgQiTCEWHW6eqeGv7JTljNP6uiVwsFn4JKIdMFg=s96-c',
          '',
          '',
        ];
        const items = [
          liekVidoes.items,
          vidoes.items.slice(0, 7),
          vidoes.items.slice(7),
        ];
        return (
          <Card
            className={i === 0 ? '' : 'mt-28'}
            key={i}
            items={items[i]}
            data={{
              title: titleList[i],
              context: contextList[i],
              image: imageList[i],
            }}
          ></Card>
        );
      })}
    </div>
  );
}
