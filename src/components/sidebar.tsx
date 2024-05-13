export default function SideBar() {
  const closeSide = (
    <div className='flex flex-col iteims-center pt-20 w-16'>
      {new Array(3).fill(null).map((o, i) => {
        const icon = 'home,explore,library_music'.split(',')[i];
        const text = '홈,둘러보기,보관함'.split(',')[i];
        const closeMenu = (
          <button key={i} className='ml-2 py-2 hover:bg-zinc-700 rounded-xl'>
            <span className='material-symbols-outlined'>{icon}</span>
            <p className='text-[0.65rem]'>{text}</p>
          </button>
        );

        return closeMenu;
      })}
    </div>
  );

  const openSide = (
    <div className='flex flex-col iteims-center pt-[4.5rem] border-r border-zinc-600 '>
      {new Array(3).fill(null).map((o, i) => {
        const icon = 'home,explore,library_music'.split(',')[i];
        const text = '홈,둘러보기,보관함'.split(',')[i];
        const closeMenu = (
          <button
            key={i}
            className='flex flex-row ml-2 mr-2 py-3 px-5 hover:bg-zinc-700 rounded-lg'
          >
            <span className='material-symbols-outlined mr-5'>{icon}</span>
            <p className='text-sm'>{text}</p>
          </button>
        );

        return closeMenu;
      })}
    </div>
  );

  return (
    <aside className='w-[15rem] h-full fixed left-0 top-0'>{openSide}</aside>
  );
}
