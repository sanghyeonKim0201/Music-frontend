export default function RootPage() {
  return (
    <div className='flex flex-row'>
      {new Array(10).fill(null).map((o, i) => {
        const text =
          '운동,에너지 충전,행복한 기운,휴식,출퇴근길,집중,잠잘 때,파티,슬픔,로맨스'.split(
            ','
          )[i];
        return (
          <div key={i} className='bg-[#FFFFFF26] rounded-lg py-2 px-3 mr-2'>
            <p className='text-xs'>{text}</p>
          </div>
        );
      })}
    </div>
  );
}
