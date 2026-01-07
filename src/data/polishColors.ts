export interface PolishColor {
  id: string;
  name: string;
  color: string;
  category: string;
  isGlitter?: boolean;
  isShimmer?: boolean;
}

export const categories = [
  { id: 'nudes', name: 'Nudes & Naturais', icon: '🌸' },
  { id: 'reds', name: 'Vermelhos', icon: '❤️' },
  { id: 'pinks', name: 'Rosas', icon: '💗' },
  { id: 'corals', name: 'Corais & Laranjas', icon: '🧡' },
  { id: 'purples', name: 'Roxos & Violetas', icon: '💜' },
  { id: 'blues', name: 'Azuis', icon: '💙' },
  { id: 'greens', name: 'Verdes', icon: '💚' },
  { id: 'neutrals', name: 'Neutros & Terrosos', icon: '🤎' },
  { id: 'glitters', name: 'Glitters & Brilhos', icon: '✨' },
  { id: 'darks', name: 'Escuros & Dramáticos', icon: '🖤' },
];

export const polishColors: PolishColor[] = [
  // Nudes & Naturais
  { id: 'nude-1', name: 'Ballet Slippers', color: '#F5E1DA', category: 'nudes' },
  { id: 'nude-2', name: 'Café com Leite', color: '#D4B5A0', category: 'nudes' },
  { id: 'nude-3', name: 'Nude Rosé', color: '#E8C4B8', category: 'nudes' },
  { id: 'nude-4', name: 'Pele Dourada', color: '#DEB887', category: 'nudes' },
  { id: 'nude-5', name: 'Bege Natural', color: '#E5D3C8', category: 'nudes' },
  { id: 'nude-6', name: 'Nude Clássico', color: '#F0DDD5', category: 'nudes' },
  { id: 'nude-7', name: 'Caramelo', color: '#C19A6B', category: 'nudes' },
  { id: 'nude-8', name: 'Rosa Bebê', color: '#FDE8E0', category: 'nudes' },

  // Vermelhos
  { id: 'red-1', name: 'Vermelho Clássico', color: '#C41E3A', category: 'reds' },
  { id: 'red-2', name: 'Cherry Bomb', color: '#8B0000', category: 'reds' },
  { id: 'red-3', name: 'Ferrari', color: '#FF2800', category: 'reds' },
  { id: 'red-4', name: 'Bordô Elegante', color: '#722F37', category: 'reds' },
  { id: 'red-5', name: 'Vermelho Carmim', color: '#960018', category: 'reds' },
  { id: 'red-6', name: 'Lady in Red', color: '#E32636', category: 'reds' },
  { id: 'red-7', name: 'Vinho', color: '#5E2129', category: 'reds' },
  { id: 'red-8', name: 'Cereja', color: '#DE3163', category: 'reds' },

  // Rosas
  { id: 'pink-1', name: 'Pink Power', color: '#FF69B4', category: 'pinks' },
  { id: 'pink-2', name: 'Blush', color: '#DE5D83', category: 'pinks' },
  { id: 'pink-3', name: 'Flamingo', color: '#FC8EAC', category: 'pinks' },
  { id: 'pink-4', name: 'Rosa Chiclete', color: '#FF77A9', category: 'pinks' },
  { id: 'pink-5', name: 'Fúcsia', color: '#FF00FF', category: 'pinks' },
  { id: 'pink-6', name: 'Rosa Antigo', color: '#C08081', category: 'pinks' },
  { id: 'pink-7', name: 'Cotton Candy', color: '#FFB6C1', category: 'pinks' },
  { id: 'pink-8', name: 'Magenta', color: '#FF0090', category: 'pinks' },

  // Corais & Laranjas
  { id: 'coral-1', name: 'Coral Sunset', color: '#FF7F50', category: 'corals' },
  { id: 'coral-2', name: 'Tangerina', color: '#FF9966', category: 'corals' },
  { id: 'coral-3', name: 'Pêssego', color: '#FFCBA4', category: 'corals' },
  { id: 'coral-4', name: 'Laranja Vibrante', color: '#FF6600', category: 'corals' },
  { id: 'coral-5', name: 'Coral Rose', color: '#F88379', category: 'corals' },
  { id: 'coral-6', name: 'Damasco', color: '#FBCEB1', category: 'corals' },

  // Roxos & Violetas
  { id: 'purple-1', name: 'Lavanda', color: '#E6E6FA', category: 'purples' },
  { id: 'purple-2', name: 'Violeta', color: '#8B008B', category: 'purples' },
  { id: 'purple-3', name: 'Ameixa', color: '#8E4585', category: 'purples' },
  { id: 'purple-4', name: 'Lilás', color: '#C8A2C8', category: 'purples' },
  { id: 'purple-5', name: 'Uva', color: '#6F2DA8', category: 'purples' },
  { id: 'purple-6', name: 'Orquídea', color: '#DA70D6', category: 'purples' },

  // Azuis
  { id: 'blue-1', name: 'Azul Céu', color: '#87CEEB', category: 'blues' },
  { id: 'blue-2', name: 'Navy', color: '#000080', category: 'blues' },
  { id: 'blue-3', name: 'Tiffany', color: '#0ABAB5', category: 'blues' },
  { id: 'blue-4', name: 'Azul Royal', color: '#4169E1', category: 'blues' },
  { id: 'blue-5', name: 'Turquesa', color: '#40E0D0', category: 'blues' },
  { id: 'blue-6', name: 'Azul Bebê', color: '#89CFF0', category: 'blues' },

  // Verdes
  { id: 'green-1', name: 'Verde Menta', color: '#98FB98', category: 'greens' },
  { id: 'green-2', name: 'Esmeralda', color: '#50C878', category: 'greens' },
  { id: 'green-3', name: 'Verde Oliva', color: '#808000', category: 'greens' },
  { id: 'green-4', name: 'Verde Militar', color: '#4B5320', category: 'greens' },
  { id: 'green-5', name: 'Verde Água', color: '#7FFFD4', category: 'greens' },
  { id: 'green-6', name: 'Sage', color: '#B2AC88', category: 'greens' },

  // Neutros & Terrosos
  { id: 'neutral-1', name: 'Branco Puro', color: '#FFFFFF', category: 'neutrals' },
  { id: 'neutral-2', name: 'Off White', color: '#FAF9F6', category: 'neutrals' },
  { id: 'neutral-3', name: 'Cinza Pérola', color: '#C0C0C0', category: 'neutrals' },
  { id: 'neutral-4', name: 'Marrom Café', color: '#6F4E37', category: 'neutrals' },
  { id: 'neutral-5', name: 'Terracota', color: '#E2725B', category: 'neutrals' },
  { id: 'neutral-6', name: 'Chocolate', color: '#7B3F00', category: 'neutrals' },

  // Glitters & Brilhos
  { id: 'glitter-1', name: 'Ouro', color: '#FFD700', category: 'glitters', isGlitter: true },
  { id: 'glitter-2', name: 'Prata', color: '#C0C0C0', category: 'glitters', isGlitter: true },
  { id: 'glitter-3', name: 'Rose Gold', color: '#B76E79', category: 'glitters', isGlitter: true },
  { id: 'glitter-4', name: 'Holográfico', color: '#E6E6FA', category: 'glitters', isGlitter: true, isShimmer: true },
  { id: 'glitter-5', name: 'Bronze', color: '#CD7F32', category: 'glitters', isGlitter: true },
  { id: 'glitter-6', name: 'Cobre', color: '#B87333', category: 'glitters', isGlitter: true },

  // Escuros & Dramáticos
  { id: 'dark-1', name: 'Preto Clássico', color: '#000000', category: 'darks' },
  { id: 'dark-2', name: 'Vinho Noite', color: '#3D0C02', category: 'darks' },
  { id: 'dark-3', name: 'Azul Meia-Noite', color: '#191970', category: 'darks' },
  { id: 'dark-4', name: 'Verde Escuro', color: '#013220', category: 'darks' },
  { id: 'dark-5', name: 'Roxo Profundo', color: '#301934', category: 'darks' },
  { id: 'dark-6', name: 'Grafite', color: '#383838', category: 'darks' },
];
