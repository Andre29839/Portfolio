import Link from "next/link";

export const Home = () => {
  return (
    <>
      <div className="home">Hello world</div>
      <Link href="/about-me">about</Link>
    </>
  );
};
