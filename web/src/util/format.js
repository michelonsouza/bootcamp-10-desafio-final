export function nameInitials(name) {
  const nameSplited = name.split(' ');
  const [firstName, lastName] = nameSplited.filter(
    (_, index, arr) => index === 0 || index === arr.length - 1
  );

  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}
