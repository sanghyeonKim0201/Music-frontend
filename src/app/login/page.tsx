import Image from 'next/image';

export default function LoginPage() {
  return (
    <div>
      <div className='grid grid-cols-2 bg-white py-8 px-9 rounded-3xl'>
        <div className='w-full pr-[25rem]'>
          <Image
            src={'/Google.png'}
            alt=''
            width={60}
            height={60}
            className='mb-6'
          ></Image>
          <p className='text-4xl mb-5'>로그인</p>
          <p className='text-base'>Google 계정 사용</p>
        </div>
        <div className='flex flex-col justify-start'>
          <div className='border border-black rounded-md mt-[5.5rem] mb-3 py-3 px-4'>
            <input
              type='text'
              placeholder='이메일 또는 휴대전화'
              className='w-full placeholder-black'
            />
          </div>
          <a href='' className='text-sm text-blue-600'>
            이메일을 잊으셨나요?
          </a>
          <p className='mt-12 text-sm'>
            내 컴퓨터가 아닌가요? 게스트 모드를 사용하여 비공개로 로그인하세요.
          </p>
          <a href='' className='text-blue-600 text-sm'>
            게스트 모드 사용 방법 자세히 알아보기
          </a>
          <div className='flex flex-row justify-end mt-12'>
            <button className='text-blue-600 mr-10 text-sm'>계정 만들기</button>
            <button className='bg-blue-600 text-white px-6 py-3 rounded-3xl text-[0.7rem]'>
              다음
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between mt-4'>
        <div className='mt-2'>
          <select
            name='lang'
            id=''
            className='w-48 bg-transparent text-sm pl-2'
          >
            <option value='한국어'>한국어</option>
          </select>
        </div>
        <div>
          {new Array(3).fill(null).map((o, i) => {
            const text = '도움말,개인정보처리방침,약관'.split(',')[i];
            return (
              <button key={i} className='text-[0.7rem] ml-5 px-2 py-3'>
                {text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
