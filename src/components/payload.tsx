'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { jwtDecode } from 'jwt-decode';
import { change, payloadSlice } from '@/lib/feature/payloadSlice';

export default function Payload({ data }: { data: RequestCookie | undefined }) {
  const usePayloadStore = useAppSelector(
    (state) => state.RootReducer.payloadSlice,
  );
  const dispatch = useAppDispatch();

  if (data?.value) {
    const payload = jwtDecode(data.value);
    delete payload.iat;
    delete payload.exp;
    dispatch(payloadSlice.actions.change(payload));
  }

  return null;
}
