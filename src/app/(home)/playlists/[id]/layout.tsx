import SongRow from '@/components/songRow';
import UseFetch from '@/utils/useFetch';
import { cookies } from 'next/headers';
import Image from 'next/image';

async function getPlaylistItem(
  id: string,
  accessToken?: string,
  refreshToken?: string,
) {
  const response = await UseFetch(`/api/youtube/playlist/item/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  const data: PlaylistItems = await response.json();

  return data.items.map((o) => ({
    id: o.contentDetails.videoId,
    title: o.snippet.title,
    image: o.snippet.thumbnails.medium.url,
    artist: o.snippet.channelTitle,
    album: o.snippet.channelTitle,
  }));
}
async function getPlaylist(
  id: string,
  accessToken?: string,
  refreshToken?: string,
) {
  const response = await UseFetch(`/api/youtube/playlist/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  const data: Playlists = await response.json();

  return data.items.map((o) => ({
    title: o.snippet.title,
    status: o.status.privacyStatus === 'private' ? '비공개' : '공개',
    channelOnwer: o.snippet.channelTitle,
    itemNumber: o.contentDetails?.itemCount,
    image: o.snippet.thumbnails.medium.url,
  }))[0];
}

export default async function PlaylistsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;
  const items = await getPlaylistItem(params.id, accessToken, refreshToken);
  const playlist = await getPlaylist(params.id, accessToken, refreshToken);
  return (
    <div className='flex flex-col gap-14 mt-10 w-11/12'>
      <div className='flex flex-row gap-12 items-center'>
        <div className='w-64 h-64'>
          <Image
            alt='profile'
            src={playlist.image}
            width={1000}
            height={1000}
            className='w-full h-full object-cover'
          ></Image>
        </div>
        <div className='flex flex-col gap-10'>
          <div>
            <div className='text-4xl font-bold mb-5'>{playlist.title}</div>
            <div className='font-light'>{`${playlist.status} • ${playlist.channelOnwer}`}</div>
            <div className='font-light'>{`트랙 ${playlist.itemNumber}개`}</div>
          </div>
          <div className='flex flex-row'>{children}</div>
        </div>
      </div>
      <div>
        {items.map((o, i) => {
          return (
            <SongRow
              id={o.id}
              image={o.image}
              title={o.title}
              album={o.album}
              artist={o.artist}
              key={i}
            ></SongRow>
          );
        })}
      </div>
    </div>
  );
}
