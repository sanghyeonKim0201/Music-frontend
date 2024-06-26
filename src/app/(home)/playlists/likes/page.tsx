'use client';

import { menuSlice } from '@/lib/feature/menuSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function LikesPage() {
  const dispatch = useAppDispatch();
  dispatch(menuSlice.actions.selectionMenu('likes'));
  return (
    <div className='flex flex-row gap-5'>
      {[
        { text: '셔플', icon: 'shuffle', bg: 'bg-white text-black' },

        { text: '', icon: 'vertical_align_bottom', bg: 'bg-zinc-800' },
        { text: '', icon: 'more_vert', bg: '' },
      ].map((o, i) => {
        return (
          <div
            className={`flex flex-row ${
              o.text === '' ? 'px-2' : 'px-4'
            } py-1 rounded-full items-center gap-1 ${o.bg}`}
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
