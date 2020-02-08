export function addressFormat(recipient) {
  return `${recipient.street}, ${recipient.number}${
    recipient.complement ? `, ${recipient.complement}` : ' '
  } - ${recipient.city} - ${recipient.state.toUpperCase()} - ${
    recipient.zipcode
  }`;
}
