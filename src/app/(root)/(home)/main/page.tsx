import Card from '@/components/card';
import UseFetch from '@/utils/useFetch';
import { cookies } from 'next/headers';

async function getMostVideo(): Promise<Videos> {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  const response = await UseFetch('/api/youtube/video', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  return await response.json();
}

export default async function MainPage() {
  const vidoes = await getMostVideo();

  return (
    <Card
      videos={vidoes}
      title={{ title: '다시 듣기', context: '김상현' }}
    ></Card>
  );
}
