import { Tables } from '@/integrations/supabase/types';
import PolishSwatch from './PolishSwatch';
import CategoryIcon from './CategoryIcon';

type PolishColor = Tables<'polish_colors'>;

interface CategorySectionProps {
  category: {
    id: string;
    name: string;
    icon: string | null;
  };
  colors: PolishColor[];
}

const CategorySection = ({ category, colors }: CategorySectionProps) => {
  if (colors.length === 0) return null;

  return (
    <section className="mb-8 md:mb-12">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-6">
        <CategoryIcon icon={category.icon} className="text-2xl sm:text-3xl w-7 h-7" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-foreground">
          {category.name}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-2 sm:ml-4" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
        {colors.map((polish) => (
          <PolishSwatch key={polish.id} polish={polish} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
