'use client';

import { menuSlice } from '@/lib/feature/menuSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function PlaylistsPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  dispatch(menuSlice.actions.selectionMenu(params.id));
  return (
    <div className='flex flex-row gap-5'>
      {[
        { text: '셔플', icon: 'shuffle' },
        { text: '재생 목록 수정', icon: 'edit' },
        { text: '', icon: 'vertical_align_bottom' },
        { text: '', icon: 'more_vert' },
      ].map((o, i) => {
        return (
          <div
            className={`flex flex-row ${
              o.text === '' ? 'px-2' : 'px-4'
            } py-1 rounded-full items-center gap-1 ${
              i === 0 ? 'bg-white text-black' : 'bg-zinc-800'
            }`}
            key={i}
          >
            <span className='material-symbols-outlined text-lg'>{o.icon}</span>
            <div className={`text-sm ${o.text === '' ? 'hidden' : ''}`}>
              {o.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
