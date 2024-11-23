'use client'
import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-black"></div>;
  }


  return (
    <>
        <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
