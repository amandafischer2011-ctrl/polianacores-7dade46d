import logo from '@/assets/logo.png';

const Hero = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-blush via-background to-cream py-12 md:py-20">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logo} 
              alt="Poliana Roncaglio - Manicure e Nail Designer" 
              className="h-24 md:h-32 w-auto mx-auto object-contain"
            />
          </div>
          
          <div className="section-divider my-6" />
          
          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-foreground mb-4 tracking-tight">
            Catálogo de
            <span className="text-gradient-rose block mt-2">Esmaltes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto">
            Descubra a cor perfeita para expressar sua personalidade. 
            Nossa seleção exclusiva de esmaltes para unhas impecáveis.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              +60 cores disponíveis
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              10 categorias
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-gold" />
              Qualidade premium
            </span>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path 
            d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </header>
  );
};

export default Hero;
