import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>para você</span>
          </div>
          
          <p className="text-sm text-muted-foreground/70">
            © {new Date().getFullYear()} · Todos os direitos reservados
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-accent/40" />
            <div className="w-2 h-2 rounded-full bg-rose-gold/40" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
