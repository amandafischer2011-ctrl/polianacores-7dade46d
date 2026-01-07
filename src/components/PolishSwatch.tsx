import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSelection } from '@/context/SelectionContext';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

type PolishColor = Tables<'polish_colors'>;

interface PolishSwatchProps {
  polish: PolishColor;
}

const PolishSwatch = ({ polish }: PolishSwatchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(polish.id);
  const isLight = isColorLight(polish.hex_color);

  return (
    <>
      <div
        className="group flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 cursor-pointer relative"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          {/* Favorite Button Overlay - Replaces Long Press */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSelection(polish);
              // Haptic feedback
              if (navigator.vibrate) navigator.vibrate(20);
            }}
            className={`absolute -top-2 -right-2 z-20 rounded-full p-2 shadow-md transition-all duration-200 ${selected
                ? 'bg-primary text-primary-foreground scale-110'
                : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-primary hover:scale-105'
              }`}
            aria-label={selected ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={`w-4 h-4 ${selected ? 'fill-current' : ''}`} />
          </button>

          {/* Bottle with image or color */}
          {polish.bottle_image_url ? (
            <div className={`polish-bottle w-32 h-44 sm:w-16 sm:h-20 md:w-20 md:h-28 rounded-lg relative overflow-hidden shadow-xl transition-all ${selected ? 'ring-4 ring-primary ring-offset-2' : ''}`}>
              <img
                src={polish.bottle_image_url}
                alt={polish.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <>
              {/* Bottle neck */}
              <div
                className="absolute -top-4 sm:-top-3 left-1/2 -translate-x-1/2 w-8 sm:w-4 h-8 sm:h-5 rounded-t-sm"
                style={{ backgroundColor: '#2A2A2A' }}
              />
              <div
                className="absolute -top-1.5 sm:-top-1 left-1/2 -translate-x-1/2 w-10 sm:w-6 h-3 sm:h-2 rounded-sm"
                style={{ backgroundColor: '#1A1A1A' }}
              />

              {/* Main bottle */}
              <div
                className={`polish-bottle w-32 h-44 sm:w-16 sm:h-20 md:w-20 md:h-28 rounded-lg relative overflow-hidden shadow-xl transition-all ${selected ? 'ring-4 ring-primary ring-offset-2' : ''}`}
                style={{ backgroundColor: polish.hex_color }}
              >
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none" />

                {/* Shimmer effect for glitter */}
                {polish.is_glitter && (
                  <div className="absolute inset-0 animate-shimmer">
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white/60 rounded-full" />
                    <div className="absolute top-4 sm:top-6 right-2 sm:right-3 w-0.5 h-0.5 bg-white/80 rounded-full" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white/50 rounded-full" />
                  </div>
                )}

                {/* Side highlight */}
                <div className="absolute left-0.5 sm:left-1 top-1 sm:top-2 bottom-1 sm:bottom-2 w-0.5 sm:w-1 bg-white/20 rounded-full" />
              </div>
            </>
          )}

          {/* Shadow */}
          <div
            className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 md:w-10 h-1 sm:h-2 rounded-full blur-sm opacity-30 transition-all duration-300 group-hover:opacity-50"
            style={{ backgroundColor: polish.hex_color }}
          />
        </div>

        {/* Color name */}
        <span className={`text-[10px] sm:text-xs md:text-sm font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors leading-tight line-clamp-2 ${selected ? 'font-bold text-primary' : ''}`}>
          {polish.name}
        </span>

        {/* Color code tooltip on hover - hidden on mobile */}
        <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-mono ${isLight ? 'bg-foreground/10 text-foreground/60' : 'bg-white/20 text-foreground/60'
              }`}
          >
            {polish.hex_color}
          </span>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md mx-auto">
          <div className="flex flex-col items-center gap-4 sm:gap-6 py-2 sm:py-4">
            <div
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-card"
              style={{ backgroundColor: polish.hex_color }}
            />

            <div className="text-center">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold">{polish.name}</h3>
              <p className="text-muted-foreground font-mono text-sm">{polish.hex_color}</p>
              {(polish.is_glitter || polish.is_shimmer) && (
                <div className="flex gap-2 justify-center mt-2">
                  {polish.is_glitter && <span className="text-xs sm:text-sm">✨ Glitter</span>}
                  {polish.is_shimmer && <span className="text-xs sm:text-sm">💫 Shimmer</span>}
                </div>
              )}
            </div>

            {polish.nails_image_url && (
              <div className="w-full">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 text-center">Como fica nas unhas:</p>
                <img
                  src={polish.nails_image_url}
                  alt={`${polish.name} nas unhas`}
                  className="w-full rounded-lg object-cover max-h-48 sm:max-h-64"
                />
              </div>
            )}

            <button
              onClick={() => {
                toggleSelection(polish);
                setIsOpen(false);
                toast.success(selected ? 'Removido da lista' : 'Adicionado à lista');
              }}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${selected
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
            >
              <Heart className={`w-5 h-5 ${selected ? 'fill-current' : ''}`} />
              {selected ? 'Remover da Lista' : 'Adicionar à Lista'}
            </button>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Helper function to determine if a color is light
function isColorLight(color: string): boolean {
  try {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  } catch (e) {
    return false;
  }
}

export default PolishSwatch;
