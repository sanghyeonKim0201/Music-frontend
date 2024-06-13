'use client';

import { useAppSelector } from '@/lib/hooks';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toggle = useAppSelector((state) => state.RootReducer.menuSlice.toggle);
  return (
    // 사이드바 펴치면 ml-40 접히면 ml-0
    <div className={`${toggle ? 'ml-0' : 'ml-40'}`}>
      <div className={`flex flex-row`}>
        {new Array(10).fill(null).map((o, i) => {
          const text =
            '운동,에너지 충전,행복한 기운,휴식,출퇴근길,집중,잠잘 때,파티,슬픔,로맨스'.split(
              ',',
            )[i];
          return (
            <button
              key={i}
              className='bg-zinc-800 hover:bg-zinc-700 rounded-lg py-2 px-3 mr-2'
            >
              <p className='text-xs'>{text}</p>
            </button>
          );
        })}
      </div>
      <div className='pt-14'>{children}</div>
    </div>
  );
}
