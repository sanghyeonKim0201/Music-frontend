export default function SideBar() {
  return (
    <aside className='w-48 h-full fixed left-0 top-16'>
      <div className='flex flex-col iteims-center pt-5 w-[5rem]'>
        {new Array(3).fill(null).map((o, i) => {
          const icon = 'home,explore,library_music'.split(',')[i];
          const text = '홈,둘러보기,보관함'.split(',')[i];
          const closeMenu = (
            <button key={i} className='mb-5'>
              <span className='material-symbols-outlined'>{icon}</span>
              <p className='text-[10px]'>{text}</p>
            </button>
          );

          return closeMenu;
        })}
      </div>
    </aside>
  );
}
