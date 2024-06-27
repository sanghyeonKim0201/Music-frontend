'use client';

import { modalSlice } from '@/lib/feature/modalSlice';
import { useAppDispatch } from '@/lib/hooks';
import UseFetch from '@/utils/useFetch';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PlaylistInsert() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('public');

  async function onClick(index: number) {
    if (index === 1) {
      if (title === '') return;
      if (description === '') return;
      const response = await UseFetch('/api/youtube/playlist', {
        method: 'post',
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });
    }
    dispatch(modalSlice.actions.offModal());
  }

  return (
    <div className='absolute z-[999] flex flex-col  top-1/2 left-1/2 w-1/3  justify-center bg-zinc-900 -translate-x-1/2 -translate-y-1/2 p-5 gap-5 border border-zinc-600'>
      <div className='flex flex-row justify-start text-2xl font-bold'>
        새 재생목록
      </div>
      <div>
        <input
          type='text'
          placeholder='제목'
          className='w-full bg-transparent border-b border-zinc-700 outline-none'
          onKeyDown={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='설명'
          className='w-full bg-transparent border-b border-zinc-700 outline-none'
          onKeyDown={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div>
        <select
          name=''
          id=''
          className='bg-transparent'
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value='public'>공개</option>
          <option value='unlisted'>일부 공개</option>
          <option value='private'>비공개</option>
        </select>
      </div>
      <div className='flex flex-row justify-end gap-2'>
        <button
          className='px-4 py-1 hover:bg-zinc-950 rounded-full text-sm'
          onClick={(e) => {
            onClick(0);
          }}
        >
          취소
        </button>
        <button
          className='px-4 py-1 bg-white text-black rounded-full text-sm'
          onClick={(e) => {
            onClick(1);
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
}
