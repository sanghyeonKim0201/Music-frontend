export default function MainPage() {
  return (
    <div>
      {new Array(6).fill(null).map((o, i) => {
        return <div key={i}></div>;
      })}
    </div>
  );
}
