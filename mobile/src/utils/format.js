export function nameInitials(name) {
  const strArr = name.split(' ');
  const initals =
    strArr[0].charAt(0).toUpperCase() +
    strArr[strArr.length - 1].charAt(0).toUpperCase();

  return initals;
}
