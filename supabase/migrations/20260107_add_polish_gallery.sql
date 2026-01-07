-- Create table for polish gallery images
CREATE TABLE IF NOT EXISTS polish_gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  polish_id UUID NOT NULL REFERENCES polish_colors(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by polish_id
CREATE INDEX IF NOT EXISTS idx_polish_gallery_images_polish_id 
ON polish_gallery_images(polish_id);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_polish_gallery_images_order 
ON polish_gallery_images(polish_id, order_position);

-- Enable Row Level Security
ALTER TABLE polish_gallery_images ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view gallery images
CREATE POLICY "Gallery images are viewable by everyone"
ON polish_gallery_images FOR SELECT
USING (true);

-- Policy: Only authenticated users can insert gallery images
CREATE POLICY "Authenticated users can insert gallery images"
ON polish_gallery_images FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Only authenticated users can update gallery images
CREATE POLICY "Authenticated users can update gallery images"
ON polish_gallery_images FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Only authenticated users can delete gallery images
CREATE POLICY "Authenticated users can delete gallery images"
ON polish_gallery_images FOR DELETE
TO authenticated
USING (true);
