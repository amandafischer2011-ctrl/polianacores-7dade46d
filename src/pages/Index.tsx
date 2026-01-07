import { useState } from 'react';
import Hero from '@/components/Hero';
import CategoryNav from '@/components/CategoryNav';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import { categories, polishColors } from '@/data/polishColors';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? categories.filter((cat) => cat.id === activeCategory)
    : categories;

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <CategoryNav 
        activeCategory={activeCategory} 
        onCategoryClick={setActiveCategory} 
      />
      
      <main className="container mx-auto px-4 pb-8">
        {filteredCategories.map((category) => {
          const categoryColors = polishColors.filter(
            (color) => color.category === category.id
          );
          return (
            <CategorySection
              key={category.id}
              category={category}
              colors={categoryColors}
            />
          );
        })}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
