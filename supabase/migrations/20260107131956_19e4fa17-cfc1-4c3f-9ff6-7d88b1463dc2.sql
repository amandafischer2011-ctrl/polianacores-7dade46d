-- Criar tabela para galeria de fotos
CREATE TABLE IF NOT EXISTS public.polish_gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  polish_id UUID NOT NULL REFERENCES polish_colors(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_polish_gallery_images_polish_id ON polish_gallery_images(polish_id);

-- Ativar segurança
ALTER TABLE public.polish_gallery_images ENABLE ROW LEVEL SECURITY;

-- Permissões (Políticas)
CREATE POLICY "Gallery viewable by everyone" ON public.polish_gallery_images FOR SELECT USING (true);

CREATE POLICY "Admin can insert gallery images" ON public.polish_gallery_images 
FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM admin_profile WHERE admin_profile.user_id = auth.uid()));

CREATE POLICY "Admin can update gallery images" ON public.polish_gallery_images 
FOR UPDATE USING (EXISTS (SELECT 1 FROM admin_profile WHERE admin_profile.user_id = auth.uid()));

CREATE POLICY "Admin can delete gallery images" ON public.polish_gallery_images 
FOR DELETE USING (EXISTS (SELECT 1 FROM admin_profile WHERE admin_profile.user_id = auth.uid()));