const chatColors = [
  '#FF6B6B', // Rouge corail
  '#4ECDC4', // Turquoise
  '#45B7D1', // Bleu ciel
  '#FFA07A', // Saumon
  '#98D8C8', // Menthe
  '#F7DC6F', // Jaune doux
  '#BB8FCE', // Violet pastel
  '#85C1E2', // Bleu poudré
  '#F8B739', // Orange doux
  '#52B788', // Vert émeraude
  '#E76F51', // Orange terracotta
  '#2A9D8F', // Vert teal
  '#E9C46A', // Jaune moutarde
  '#F4A261', // Orange pêche
  '#A8DADC', // Bleu pâle
  '#FF8C94', // Rose saumon
  '#6A4C93', // Violet profond
  '#1982C4', // Bleu océan
  '#8AC926', // Vert lime
  '#FF595E', // Rouge vif
];

export const getRandomColor = () => {
  return chatColors[Math.floor(Math.random() * chatColors.length)];
};
