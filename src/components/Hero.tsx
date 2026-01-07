import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogIn, Heart, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSelection } from '@/context/SelectionContext';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';

const Hero = () => {
  const { isAdmin, loading } = useAuth();
  const { selectionCount, selectedPolishes, clearSelection, toggleSelection } = useSelection();
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <header className="relative" style={{ backgroundColor: '#f8bad1' }}>
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="Poliana Roncaglio - Manicure e Nail Designer"
            className="h-24 sm:h-32 md:h-40 w-auto object-contain"
          />
        </div>
      </div>

      <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
        {selectionCount > 0 && (
          <button
            onClick={() => setIsListOpen(true)}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md text-primary flex items-center gap-1.5 px-3"
            title="Minha Lista"
          >
            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-current" />
            <span className="font-semibold text-sm">{selectionCount}</span>
          </button>
        )}

        {!loading && (
          <Link
            to="/admin"
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md text-pink-500 hover:text-pink-600"
            title={isAdmin ? "Gerenciar catálogo" : "Acesso Admin"}
          >
            {isAdmin ? (
              <Settings className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <LogIn className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </Link>
        )}
      </div>

      {/* Selected Items Modal */}
      <Dialog open={isListOpen} onOpenChange={setIsListOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold">Minha Lista de Desejos</h2>
              <button
                onClick={clearSelection}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Limpar tudo
              </button>
            </div>

            {selectedPolishes.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Sua lista está vazia.</p>
                <p className="text-sm">Segure o dedo sobre um esmalte para adicionar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedPolishes.map((polish) => (
                  <div key={polish.id} className="flex flex-col items-center gap-2 p-2 border rounded-xl relative group">
                    <button
                      onClick={() => toggleSelection(polish)}
                      className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-destructive hover:bg-white shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div
                      className="w-16 h-24 rounded-lg shadow-sm relative overflow-hidden"
                      style={{ backgroundColor: polish.hex_color }}
                    >
                      {polish.bottle_image_url && (
                        <img src={polish.bottle_image_url} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-center line-clamp-2">{polish.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t flex justify-end">
              <button
                onClick={() => setIsListOpen(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Hero;
