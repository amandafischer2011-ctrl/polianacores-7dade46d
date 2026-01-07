import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type PolishColor = Tables<'polish_colors'>;

interface PolishSwatchProps {
  polish: PolishColor;
}

const PolishSwatch = ({ polish }: PolishSwatchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = isColorLight(polish.hex_color);
  
  return (
    <>
      <div 
        className="group flex flex-col items-center gap-3 p-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          {/* Bottle with image or color */}
          {polish.bottle_image_url ? (
            <div className="polish-bottle w-20 h-28 rounded-lg relative overflow-hidden">
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
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t-sm"
                style={{ backgroundColor: '#2A2A2A' }}
              />
              <div 
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-sm"
                style={{ backgroundColor: '#1A1A1A' }}
              />
              
              {/* Main bottle */}
              <div 
                className="polish-bottle w-14 h-20 rounded-lg relative overflow-hidden"
                style={{ backgroundColor: polish.hex_color }}
              >
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none" />
                
                {/* Shimmer effect for glitter */}
                {polish.is_glitter && (
                  <div className="absolute inset-0 animate-shimmer">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full" />
                    <div className="absolute top-6 right-3 w-0.5 h-0.5 bg-white/80 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/50 rounded-full" />
                    <div className="absolute top-10 left-6 w-0.5 h-0.5 bg-white/70 rounded-full" />
                    <div className="absolute bottom-8 right-2 w-1 h-1 bg-white/60 rounded-full" />
                  </div>
                )}
                
                {/* Side highlight */}
                <div className="absolute left-1 top-2 bottom-2 w-1 bg-white/20 rounded-full" />
              </div>
            </>
          )}
          
          {/* Shadow */}
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full blur-sm opacity-30 transition-all duration-300 group-hover:opacity-50 group-hover:w-12"
            style={{ backgroundColor: polish.hex_color }}
          />
        </div>
        
        {/* Color name */}
        <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors max-w-[100px] leading-tight">
          {polish.name}
        </span>
        
        {/* Color code tooltip on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span 
            className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              isLight ? 'bg-foreground/10 text-foreground/60' : 'bg-white/20 text-foreground/60'
            }`}
          >
            {polish.hex_color}
          </span>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center gap-6 py-4">
            <div 
              className="w-24 h-24 rounded-full border-4 border-card"
              style={{ backgroundColor: polish.hex_color }}
            />
            
            <div className="text-center">
              <h3 className="font-serif text-2xl font-semibold">{polish.name}</h3>
              <p className="text-muted-foreground font-mono">{polish.hex_color}</p>
              {(polish.is_glitter || polish.is_shimmer) && (
                <div className="flex gap-2 justify-center mt-2">
                  {polish.is_glitter && <span className="text-sm">✨ Glitter</span>}
                  {polish.is_shimmer && <span className="text-sm">💫 Shimmer</span>}
                </div>
              )}
            </div>

            {polish.nails_image_url && (
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-2 text-center">Como fica nas unhas:</p>
                <img 
                  src={polish.nails_image_url} 
                  alt={`${polish.name} nas unhas`}
                  className="w-full rounded-lg object-cover max-h-64"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Helper function to determine if a color is light
function isColorLight(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

export default PolishSwatch;
