import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';

const Hero = () => {
  const { isAdmin } = useAuth();

  return (
    <header className="relative" style={{ backgroundColor: '#f8bad1' }}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="Poliana Roncaglio - Manicure e Nail Designer" 
            className="h-24 md:h-32 w-auto object-contain"
          />
        </div>
      </div>
      
      {isAdmin && (
        <Link
          to="/admin"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
          title="Gerenciar catálogo"
        >
          <Settings className="h-5 w-5 text-foreground" />
        </Link>
      )}
    </header>
  );
};

export default Hero;
