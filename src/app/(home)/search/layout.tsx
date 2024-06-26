export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-11/12'>
      <div>{children}</div>
    </div>
  );
}
