import BigCard from '@/components/bigCard';
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

function getPlaylistData(playlists: Playlists) {
  const item = playlists.items;
  const titleList = [
    '좋아요 표시한 음악',
    ...item.map((o) => o.snippet.title),
    '나중에 볼 에피소드',
  ];
  const contextList = [
    '자동 재생목록',
    ...item.map(
      (o) =>
        `${o.snippet.channelTitle}  • 트랙  ${o.contentDetails?.itemCount}개`,
    ),
    '나중에 시청하려고 저장한 에피소드',
  ];
  const imageList = [
    '/like.png',
    ...item.map((o) => o.snippet.thumbnails.maxres.url),
    '/bookmark.png',
  ];

  return {
    titleList,
    contextList,
    imageList,
  };
}

export default async function LibraryPage() {
  const playlists = await getPlaylists();
  const { titleList, contextList, imageList } = getPlaylistData(playlists);

  return (
    <div className='grid grid-cols-7 gap-5'>
      {new Array(playlists.pageInfo.totalResults + 2).fill(null).map((o, i) => {
        return (
          <Link href={'/'} key={i}>
            <BigCard
              title={titleList[i]}
              context={contextList[i]}
              image={imageList[i]}
            ></BigCard>
          </Link>
        );
      })}
    </div>
  );
}
