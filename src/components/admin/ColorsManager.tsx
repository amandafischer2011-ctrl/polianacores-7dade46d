import { useState } from 'react';
import { usePolishColors, useCreatePolishColor, useUpdatePolishColor, useDeletePolishColor, uploadPolishImage, PolishColor } from '@/hooks/usePolishColors';
import { usePolishGalleryImages, useUploadGalleryImage, useDeleteGalleryImage } from '@/hooks/usePolishGallery';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, Plus, Pencil, Trash2, Upload, Image, Camera, X } from 'lucide-react';

interface FormData {
  name: string;
  hex_color: string;
  category_id: string;
  is_glitter: boolean;
  is_shimmer: boolean;
  bottle_image_url: string;
  nails_image_url: string;
}

const initialFormData: FormData = {
  name: '',
  hex_color: '#FFFFFF',
  category_id: '',
  is_glitter: false,
  is_shimmer: false,
  bottle_image_url: '',
  nails_image_url: '',
};

const ColorsManager = () => {
  const { data: colors, isLoading: colorsLoading } = usePolishColors();
  const { data: categories } = useCategories();
  const createColor = useCreatePolishColor();
  const updateColor = useUpdatePolishColor();
  const deleteColor = useDeletePolishColor();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<PolishColor | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [uploadingBottle, setUploadingBottle] = useState(false);
  const [uploadingNails, setUploadingNails] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Gallery hooks
  const { data: galleryImages } = usePolishGalleryImages(editingColor?.id || '');
  const uploadGalleryImage = useUploadGalleryImage();
  const deleteGalleryImage = useDeleteGalleryImage();

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingColor(null);
  };

  const handleOpenDialog = (color?: PolishColor) => {
    if (color) {
      setEditingColor(color);
      setFormData({
        name: color.name,
        hex_color: color.hex_color,
        category_id: color.category_id || '',
        is_glitter: color.is_glitter || false,
        is_shimmer: color.is_shimmer || false,
        bottle_image_url: color.bottle_image_url || '',
        nails_image_url: color.nails_image_url || '',
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'bottles' | 'nails'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setUploading = type === 'bottles' ? setUploadingBottle : setUploadingNails;
    setUploading(true);

    try {
      const url = await uploadPolishImage(file, type);
      setFormData((prev) => ({
        ...prev,
        [type === 'bottles' ? 'bottle_image_url' : 'nails_image_url']: url,
      }));
      toast.success('Imagem enviada!');
    } catch (error) {
      toast.error('Erro ao enviar imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editingColor) return;

    setUploadingGallery(true);

    try {
      // Upload all selected files
      const uploadPromises = Array.from(files).map(file =>
        uploadGalleryImage.mutateAsync({ polishId: editingColor.id, file })
      );

      await Promise.all(uploadPromises);
      toast.success(`${files.length} foto(s) adicionada(s) à galeria!`);

      // Reset file input
      e.target.value = '';
    } catch (error) {
      toast.error('Erro ao enviar fotos para galeria');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleDeleteGalleryImage = async (imageId: string, imageUrl: string) => {
    if (!editingColor) return;

    try {
      await deleteGalleryImage.mutateAsync({
        id: imageId,
        imageUrl,
        polishId: editingColor.id
      });
      toast.success('Foto removida da galeria!');
    } catch (error) {
      toast.error('Erro ao remover foto');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        name: formData.name,
        hex_color: formData.hex_color,
        category_id: formData.category_id || null,
        is_glitter: formData.is_glitter,
        is_shimmer: formData.is_shimmer,
        bottle_image_url: formData.bottle_image_url || null,
        nails_image_url: formData.nails_image_url || null,
      };

      if (editingColor) {
        await updateColor.mutateAsync({ id: editingColor.id, ...data });
        toast.success('Cor atualizada!');
      } else {
        await createColor.mutateAsync(data);
        toast.success('Cor criada!');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Erro ao salvar cor');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteColor.mutateAsync(id);
      toast.success('Cor excluída!');
    } catch (error) {
      toast.error('Erro ao excluir cor');
    }
  };

  if (colorsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-lg sm:text-xl font-semibold">Cores de Esmalte</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} size="sm" className="sm:size-default">
              <Plus className="mr-1.5 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Nova Cor</span>
              <span className="sm:hidden">Nova</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                {editingColor ? 'Editar Cor' : 'Nova Cor'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-sm">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Vermelho Clássico"
                  required
                  className="h-9 sm:h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="hex_color" className="text-sm">Cor (Hex)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.hex_color}
                      onChange={(e) => setFormData({ ...formData, hex_color: e.target.value })}
                      className="w-12 sm:w-14 h-9 sm:h-10 p-1 cursor-pointer"
                    />
                    <Input
                      id="hex_color"
                      value={formData.hex_color}
                      onChange={(e) => setFormData({ ...formData, hex_color: e.target.value })}
                      placeholder="#FFFFFF"
                      className="h-9 sm:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="category" className="text-sm">Categoria</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger className="h-9 sm:h-10">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_glitter"
                    checked={formData.is_glitter}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_glitter: checked })}
                  />
                  <Label htmlFor="is_glitter" className="text-sm">Glitter</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_shimmer"
                    checked={formData.is_shimmer}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_shimmer: checked })}
                  />
                  <Label htmlFor="is_shimmer" className="text-sm">Shimmer</Label>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-sm">Foto do Vidro</Label>
                <div className="flex items-center gap-3 sm:gap-4">
                  {formData.bottle_image_url ? (
                    <img
                      src={formData.bottle_image_url}
                      alt="Vidro"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Image className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'bottles')}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" size="sm" asChild disabled={uploadingBottle}>
                        <span>
                          {uploadingBottle ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Upload className="h-3.5 w-3.5" />
                          )}
                        </span>
                      </Button>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleImageUpload(e, 'bottles')}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" size="sm" asChild disabled={uploadingBottle}>
                        <span>
                          <Camera className="h-3.5 w-3.5" />
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 py-2 border-t mt-4">
                <Label className="text-sm font-semibold">Fotos nas Unhas (Catálogo)</Label>
                <p className="text-xs text-muted-foreground mb-4">
                  A primeira foto é a principal. Deslize para o lado para ver todas.
                </p>

                <div className="flex gap-3 overflow-x-auto pb-4 pt-2 -mx-1 px-1 scrollbar-hide">
                  {/* Main Nail Photo - Legacy Field */}
                  <div className="flex-shrink-0 w-32 relative group">
                    <span className="absolute -top-2 left-2 z-10 bg-primary text-[10px] text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                      Principal
                    </span>
                    {formData.nails_image_url ? (
                      <div className="relative">
                        <img
                          src={formData.nails_image_url}
                          alt="Principal"
                          className="w-full aspect-square object-cover rounded-xl border-2 border-primary shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                          <label className="cursor-pointer p-1.5 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'nails')}
                              className="hidden"
                            />
                            <Upload className="h-4 w-4" />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-full aspect-square bg-muted rounded-xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center hover:bg-muted/80 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'nails')}
                          className="hidden"
                        />
                        <Image className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-[10px] font-medium text-muted-foreground">Adicionar Principal</span>
                      </label>
                    )}
                  </div>

                  {/* Gallery Photos */}
                  {galleryImages?.map((img) => (
                    <div key={img.id} className="flex-shrink-0 w-32 relative group">
                      <img
                        src={img.image_url}
                        alt="Galeria"
                        className="w-full aspect-square object-cover rounded-xl border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(img.id, img.image_url)}
                        className="absolute -top-1 -right-1 p-1 bg-destructive text-destructive-foreground rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add Gallery Photos Button */}
                  {editingColor && (
                    <div className="flex-shrink-0 w-32">
                      <label className="cursor-pointer w-full aspect-square bg-muted rounded-xl border-2 border-dashed flex flex-col items-center justify-center hover:bg-muted/80 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryImageUpload}
                          className="hidden"
                        />
                        {uploadingGallery ? (
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                          <>
                            <Plus className="h-6 w-6 text-muted-foreground mb-1" />
                            <span className="text-[10px] font-medium text-muted-foreground">Adicionar mais</span>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              </div>


              <div className="flex justify-end gap-2 pt-3 sm:pt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" size="sm" disabled={createColor.isPending || updateColor.isPending}>
                  {(createColor.isPending || updateColor.isPending) && (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  )}
                  Salvar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {colors?.map((color) => (
          <Card key={color.id} className="overflow-hidden">
            <div
              className="h-20 sm:h-24 relative"
              style={{ backgroundColor: color.hex_color }}
            >
              {color.bottle_image_url && (
                <img
                  src={color.bottle_image_url}
                  alt={color.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate text-sm sm:text-base">{color.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{color.hex_color}</p>
                  {color.categories && (
                    <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                      {(color.categories as any).icon} {(color.categories as any).name}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                    {color.is_glitter && (
                      <span className="text-[10px] sm:text-xs bg-accent/50 px-1.5 sm:px-2 py-0.5 rounded">✨ Glitter</span>
                    )}
                    {color.is_shimmer && (
                      <span className="text-[10px] sm:text-xs bg-accent/50 px-1.5 sm:px-2 py-0.5 rounded">💫 Shimmer</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-0.5 sm:gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9"
                    onClick={() => handleOpenDialog(color as PolishColor)}
                  >
                    <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir cor?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Isso irá excluir a cor "{color.name}". Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(color.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!colors || colors.length === 0) && (
        <div className="text-center py-8 sm:py-12 text-muted-foreground">
          <p className="text-sm sm:text-base">Nenhuma cor cadastrada ainda.</p>
          <p className="text-xs sm:text-sm">Clique em "Nova Cor" para começar.</p>
        </div>
      )}
    </div>
  );
};

export default ColorsManager;
