import { useState } from 'react';
import Hero from '@/components/Hero';
import CategoryNav from '@/components/CategoryNav';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import { useCategories } from '@/hooks/useCategories';
import { usePolishColors } from '@/hooks/usePolishColors';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: polishColors, isLoading: colorsLoading } = usePolishColors();

  const isLoading = categoriesLoading || colorsLoading;

  const filteredCategories = activeCategory
    ? categories?.filter((cat) => cat.id === activeCategory)
    : categories;

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <CategoryNav 
            categories={categories || []}
            activeCategory={activeCategory} 
            onCategoryClick={setActiveCategory} 
          />
          
          <main className="container mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
            {filteredCategories?.map((category) => {
              const categoryColors = polishColors?.filter(
                (color) => color.category_id === category.id
              ) || [];
              return (
                <CategorySection
                  key={category.id}
                  category={category}
                  colors={categoryColors}
                />
              );
            })}
            
            {(!polishColors || polishColors.length === 0) && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">Nenhum esmalte cadastrado ainda.</p>
                <p className="text-sm">Acesse /admin para adicionar cores ao catálogo.</p>
              </div>
            )}
          </main>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
