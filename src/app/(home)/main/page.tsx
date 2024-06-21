import CardGroup from '@/components/cardGroup';
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
      <CardGroup
        items={liekVidoes.items}
        data={{
          title: '다시 듣기',
          context: '김상현',
          image:
            'https://lh3.googleusercontent.com/a/ACg8ocJmUux6918duRgQiTCEWHW6eqeGv7JTljNP6uiVwsFn4JKIdMFg=s96-c',
        }}
        type='video'
      ></CardGroup>
      <TableCard
        data={{
          title: '빠른 선곡',
          context: '이 노래로 뮤직 스테이션 시작하기',
        }}
        items={liekVidoes.items}
        className='mt-28'
      ></TableCard>
      {new Array(2).fill(null).map((o, i) => {
        const titleList = ['인기곡', '인기곡2'];
        const contextList = ['', '두 번째 인기곡'];
        const imageList = ['', ''];
        const items = [vidoes.items.slice(0, 7), vidoes.items.slice(7)];
        return (
          <CardGroup
            className='mt-28'
            key={i}
            items={items[i]}
            data={{
              title: titleList[i],
              context: contextList[i],
              image: imageList[i],
            }}
            type='video'
          ></CardGroup>
        );
      })}
    </div>
  );
}
