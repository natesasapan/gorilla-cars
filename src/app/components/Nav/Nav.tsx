// components/Nav/Nav.tsx
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="bg-black text-orange-500 p-4 flex items-center justify-between">
      {/* Left side navigation links */}
      <div className="flex gap-6">
        <Link href="/about" className="hover:text-orange-400 transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-orange-400 transition-colors">
          Contact
        </Link>
      </div>

      {/* Center logo/title */}
      <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl">
          Gorilla Cars
      </Link>

      {/* Right side - empty div to maintain spacing */}
      <div className="w-[100px]"></div>
    </nav>
  );
};

export default Nav;
