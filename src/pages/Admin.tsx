import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, Palette, FolderOpen, Eye } from 'lucide-react';
import CategoriesManager from '@/components/admin/CategoriesManager';
import ColorsManager from '@/components/admin/ColorsManager';

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('colors');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-foreground truncate">
                Painel Admin
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Gerencie categorias e cores
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
                className="hidden sm:flex"
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Catálogo
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigate('/')}
                className="sm:hidden"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full max-w-xs sm:max-w-md grid-cols-2">
            <TabsTrigger value="colors" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Palette className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Cores</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Categorias</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <ColorsManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
