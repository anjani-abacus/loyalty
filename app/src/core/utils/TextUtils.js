export const titleCase = str => {
  if (!str) {return '';}
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
export const generateRandomColor = () => {
  const hexCharacters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));
  }

  return color;
};
