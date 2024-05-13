export default function SideBar() {
  return (
    <aside className='w-44 h-full fixed left-0 top-14'>
      <div className='flex flex-col iteims-center pt-5 w-16'>
        {new Array(3).fill(null).map((o, i) => {
          const icon = 'home,explore,library_music'.split(',')[i];
          const text = '홈,둘러보기,보관함'.split(',')[i];
          const closeMenu = (
            <button key={i} className='ml-2 py-2 hover:bg-zinc-800 rounded-xl'>
              <span className='material-symbols-outlined'>{icon}</span>
              <p className='text-[0.65rem]'>{text}</p>
            </button>
          );

          return closeMenu;
        })}
      </div>
    </aside>
  );
}
