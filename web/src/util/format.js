const colors = [
  '#8e0000',
  '#78002e',
  '#38006b',
  '#000070',
  '#001064',
  '#003c8f',
  '#004c8c',
  '#005662',
  '#003d33',
  '#005005',
  '#255d00',
  '#6c6f00',
  '#c17900',
  '#c56000',
  '#b53d00',
  '#9f0000',
  '#260e04',
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
