import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type PolishColor = Tables<'polish_colors'>;
export type PolishColorInsert = TablesInsert<'polish_colors'>;
export type PolishColorUpdate = TablesUpdate<'polish_colors'>;

export const usePolishColors = () => {
  return useQuery({
    queryKey: ['polish_colors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('polish_colors')
        .select(`
          *,
          categories (
            id,
            name,
            icon
          )
        `)
        .order('order_position', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

export const usePolishColorsByCategory = (categoryId: string | null) => {
  return useQuery({
    queryKey: ['polish_colors', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('polish_colors')
        .select(`
          *,
          categories (
            id,
            name,
            icon
          )
        `)
        .order('order_position', { ascending: true });
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePolishColor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (polishColor: PolishColorInsert) => {
      const { data, error } = await supabase
        .from('polish_colors')
        .insert(polishColor)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polish_colors'] });
    },
  });
};

export const useUpdatePolishColor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: PolishColorUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('polish_colors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polish_colors'] });
    },
  });
};

export const useDeletePolishColor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('polish_colors')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polish_colors'] });
    },
  });
};

export const uploadPolishImage = async (
  file: File, 
  folder: 'bottles' | 'nails'
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('polish-images')
    .upload(fileName, file);
  
  if (uploadError) throw uploadError;
  
  const { data } = supabase.storage
    .from('polish-images')
    .getPublicUrl(fileName);
  
  return data.publicUrl;
};
