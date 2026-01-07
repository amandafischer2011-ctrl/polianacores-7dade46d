import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-6 sm:py-8 mt-10 sm:mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" />
            <span>para você</span>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground/70">
            © {new Date().getFullYear()} · Todos os direitos reservados
          </p>
          
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent/40" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-gold/40" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
