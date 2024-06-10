'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { change } from '@/lib/feature/payloadSlice';

export default function Payload({ data }: { data: RequestCookie | undefined }) {
  const usePayloadStore = useAppSelector(
    (state) => state.RootReducer.payloadSlice,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.value) {
      const payload = jwtDecode(data.value);
      delete payload.iat;
      delete payload.exp;
      dispatch(change(payload));
    }
  });
  return null;
}
