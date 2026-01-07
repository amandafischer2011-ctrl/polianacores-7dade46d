import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';

const Hero = () => {
  const { isAdmin } = useAuth();

  return (
    <header className="relative" style={{ backgroundColor: '#f8bad1' }}>
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="Poliana Roncaglio - Manicure e Nail Designer" 
            className="h-16 sm:h-20 md:h-28 w-auto object-contain"
          />
        </div>
      </div>
      
      {isAdmin && (
        <Link
          to="/admin"
          className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
          title="Gerenciar catálogo"
        >
          <Settings className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
        </Link>
      )}
    </header>
  );
};

export default Hero;
