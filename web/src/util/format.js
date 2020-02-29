const colors = [
  '#b61827',
  '#b4004e',
  '#790e8b',
  '#4d2c91',
  '#001064',
  '#0077c2',
  '#0086c3',
  '#0095a8',
  '#00766c',
  '#005005',
  '#338a3e',
  '#6b9b37',
  '#a0af22',
  '#c9bc1f',
  '#c77800',
  '#c63f17',
  '#5f4339',
];

export function nameInitials(name) {
  const nameSplited = name.split(' ');
  const [firstName, lastName] = nameSplited.filter(
    (_, index, arr) => index === 0 || index === arr.length - 1
  );

  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

export function randomColor() {
  const randomIndex = Math.round(Math.random() * (colors.length - 1) - 0);

  return colors[randomIndex];
}
