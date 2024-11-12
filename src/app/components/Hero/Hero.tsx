import Image from 'next/image'
import gorillaImage from '../../assets/images/gorilla.png'
import Link from 'next/link';

  const Hero = () => {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-16">
          {/* Left content */}
          <div className="max-w-xl">
            <h1 className="text-orange-500 text-5xl font-bold mb-6">
              Stop monkeying around<br />
              and get serious.
            </h1>
            
            <p className="text-orange-500/90 text-lg mb-8">
              Welcome to Gorilla Cars, where we go bananas for automotive excellence! Our fleet of vehicles swings from compact cars to luxury SUVs, all maintained with the strength and precision of a silverback. Unlike our primate namesakes, we don't monkey around with hidden fees – our prices are as straightforward as a gorilla's handshake (which we don't recommend). Let's go ape over your next rental!
            </p>
  
            <div className="flex gap-4">
            <Link href="/login" className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-8 py-2 transition-colors inline-block">
              Login
            </Link>
            <Link href="/signup" className="px-8 py-2 font-semibold text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-black transition-colors inline-block">
              Sign Up
            </Link>
            </div>
          </div>
  
          {/* Right content - Image */}
          <div>
            <Image 
                src={gorillaImage} 
                alt="Gorilla in an orange car"
                width={500}
                height={500}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;