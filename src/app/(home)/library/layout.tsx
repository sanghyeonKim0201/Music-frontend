export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='pt-1'>
      <div className='flex flex-row gap-5 w-5/6 border-b-2 mr-5'>
        <div>보관함</div>
        <div>오프라인 저장</div>
      </div>
    </div>
  );
}
