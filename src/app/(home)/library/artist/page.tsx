import ArtistRow from '@/components/artistRow';
import UseFetch from '@/utils/useFetch';
import { cookies } from 'next/headers';

const accessToken = cookies().get('accessToken')?.value;
const refreshToken = cookies().get('refreshToken')?.value;

async function getSubscriber(): Promise<Subscriber> {
  const subscriber = await UseFetch('/api/youtube/subscriber', {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  return subscriber.json();
}

export default async function ArtistPage() {
  const subscribers = await getSubscriber();

  return (
    <div>
      {subscribers.items.map((o, i) => {
        return (
          <ArtistRow
            image={o.snippet.thumbnails.medium.url}
            context={o.snippet.description}
            title={o.snippet.title}
            key={i}
          ></ArtistRow>
        );
      })}
    </div>
  );
}
