import { Category } from '@/hooks/useCategories';
import CategoryIcon from './CategoryIcon';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryClick: (categoryId: string | null) => void;
}

const CategoryNav = ({ categories, activeCategory, onCategoryClick }: CategoryNavProps) => {
  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border py-3 mb-6">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          <button
            onClick={() => onCategoryClick(null)}
            className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${activeCategory === null
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
          >
            Todas
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
              <CategoryIcon icon={category.icon} className="text-base sm:text-lg w-5 h-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
