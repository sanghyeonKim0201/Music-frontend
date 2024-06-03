'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Payload() {
  const usePayloadStore = useAppSelector((state) => {
    state.RootReducer.payloadSlice;
  });
  const dispatch = useAppDispatch();

  return null;
}
