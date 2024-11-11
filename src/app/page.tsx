import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav"
import Link from 'next/link'


export default function Home() {
  return (
    <>
        <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
