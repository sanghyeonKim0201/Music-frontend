export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={`flex flex-row pt-8`}>
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
