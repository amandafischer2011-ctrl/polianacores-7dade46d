import { Category } from '@/hooks/useCategories';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryClick: (categoryId: string | null) => void;
}

const CategoryNav = ({ categories, activeCategory, onCategoryClick }: CategoryNavProps) => {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryClick(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === null
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
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
