import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type GalleryImage = Tables<'polish_gallery_images'>;
export type GalleryImageInsert = TablesInsert<'polish_gallery_images'>;
export type GalleryImageUpdate = TablesUpdate<'polish_gallery_images'>;

// Fetch all gallery images for a specific polish
export const usePolishGalleryImages = (polishId: string) => {
    return useQuery({
        queryKey: ['polish_gallery_images', polishId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('polish_gallery_images')
                .select('*')
                .eq('polish_id', polishId)
                .order('order_position', { ascending: true });

            if (error) throw error;
            return data;
        },
        enabled: !!polishId,
    });
};

// Upload a new gallery image
export const useUploadGalleryImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ polishId, file }: { polishId: string; file: File }) => {
            // Upload image to storage
            const fileExt = file.name.split('.').pop();
            const fileName = `gallery/${polishId}/${crypto.randomUUID()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('polish-images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage
                .from('polish-images')
                .getPublicUrl(fileName);

            // Get the current max order_position for this polish
            const { data: existingImages } = await supabase
                .from('polish_gallery_images')
                .select('order_position')
                .eq('polish_id', polishId)
                .order('order_position', { ascending: false })
                .limit(1);

            const nextPosition = existingImages && existingImages.length > 0
                ? (existingImages[0].order_position || 0) + 1
                : 0;

            // Create database record
            const { data, error } = await supabase
                .from('polish_gallery_images')
                .insert({
                    polish_id: polishId,
                    image_url: urlData.publicUrl,
                    order_position: nextPosition,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['polish_gallery_images', variables.polishId] });
        },
    });
};

// Delete a gallery image
export const useDeleteGalleryImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, imageUrl, polishId }: { id: string; imageUrl: string; polishId: string }) => {
            // Delete from storage
            const fileName = imageUrl.split('/polish-images/')[1];
            if (fileName) {
                await supabase.storage
                    .from('polish-images')
                    .remove([fileName]);
            }

            // Delete from database
            const { error } = await supabase
                .from('polish_gallery_images')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { polishId };
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['polish_gallery_images', data.polishId] });
        },
    });
};

// Reorder gallery images
export const useReorderGalleryImages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ images, polishId }: { images: { id: string; order_position: number }[]; polishId: string }) => {
            // Update all images with new positions
            const updates = images.map(img =>
                supabase
                    .from('polish_gallery_images')
                    .update({ order_position: img.order_position })
                    .eq('id', img.id)
            );

            await Promise.all(updates);
            return { polishId };
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['polish_gallery_images', data.polishId] });
        },
    });
};
