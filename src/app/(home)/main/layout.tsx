'use client';

import { musicSlice } from '@/lib/feature/musicSlice';
import { useDispatch } from 'react-redux';

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  dispatch(musicSlice.actions.selectionMusic('O-2TtaQWpR4'));
  dispatch(musicSlice.actions.titleChange('안녕 나의 사랑'));
  dispatch(
    musicSlice.actions.contextChange(
      '성시경 • 여기 내 맘속에 (Special Limited Edition) • 2008',
    ),
  );
  return (
    <div>
      <div className={`flex flex-row pt-8`}>
        {'운동,에너지 충전,행복한 기운,휴식,출퇴근길,집중,잠잘 때,파티,슬픔,로맨스'
          .split(',')
          .map((o, i) => {
            return (
              <button
                key={i}
                className='bg-zinc-800 hover:bg-zinc-700 rounded-lg py-2 px-3 mr-2'
              >
                <p className='text-xs'>{o}</p>
              </button>
            );
          })}
      </div>
      <div className='pt-14'>{children}</div>
    </div>
  );
}
