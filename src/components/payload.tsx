'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useEffect } from 'react';

export default function Payload({ data }: { data: RequestCookie | undefined }) {
  const usePayloadStore = useAppSelector(
    (state) => state.RootReducer.payloadSlice,
  );
  const payloadDispatch = useAppDispatch();

  useEffect(() => {
    async function getPlaylist() {
      const response = await UseFetch('/api/youtube/playlists', {
        credentials: 'include',
      });
      console.log(await response.json());
    }
    getPlaylist();
  }, []);
  return null;
}
