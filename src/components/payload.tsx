'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { jwtDecode } from 'jwt-decode';
import { payloadSlice } from '@/lib/feature/payloadSlice';
import { useEffect } from 'react';
import UseFetch from '@/utils/useFetch';
import { ratingSlice } from '@/lib/feature/ratingSlice';

export default function Payload({ data }: { data: RequestCookie | undefined }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.value) {
      const payload = jwtDecode(data.value);
      delete payload.iat;
      delete payload.exp;
      dispatch(payloadSlice.actions.change(payload));
    }

    async function getRatingViedos() {
      const response = await UseFetch('/api/youtube/all-rating');

      const {
        likeVideos,
        dislikeVideos,
      }: { likeVideos: Videos; dislikeVideos: Videos } = await response.json();

      dispatch(
        ratingSlice.actions.init({
          likeVideos: likeVideos.items.map((o) => o.id),
          dislikevideos: dislikeVideos.items.map((o, i) => o.id),
        }),
      );
    }

    getRatingViedos();
  });

  return null;
}
