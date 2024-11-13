import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav"

import { run } from "./api/items/routes"

run();

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
