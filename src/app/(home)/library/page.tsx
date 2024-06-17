import UseFetch from '@/utils/useFetch';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';

async function getPlaylists(): Promise<Playlists> {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;
  const playlists = await UseFetch('/api/youtube/playlists', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  return await playlists.json();
}

export default async function LibraryPage() {
  const playlists = await getPlaylists();

  return (
    <div className='grid grid-cols-7'>
      {new Array(playlists.pageInfo.totalResults + 2).fill(null).map((o, i) => {
        const titleList = ['좋아요 표시한 음악'];
        const contextList = ['자동 재생목록'];

        const item = playlists.items;
        titleList.concat(item.map((obj) => obj.snippet.title));

        titleList.push('나중에 볼 에피소드');
        console.log(titleList);
        contextList.push('나중에 시청하려고 저장한 에피소드');
        return (
          <Link href={'/'} key={i}>
            <div></div>
            <div></div>
            <div></div>
          </Link>
        );
      })}
    </div>
  );
}
