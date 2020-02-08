export function mailText(mail, context) {
  const messages = {
    header: `Olá, ${context.name}\n`,

    newdelivery: `Você tem uma nova entrega em ${context.date}.\n
Confira os detalhes abaixo para mais informações:\n\n`,

    cancellation: `Houve um cancelamento de entrega em ${context.date}.\n
Confira os detalhes abaixo:\n\n`,

    footer: `Entrega: #${context.orderNumber}
Destinatário: ${context.client}
Produto: ${context.product}
Endereço: ${context.address}`,
  };

  return `${messages.header}${messages[mail]}${messages.footer}`;
}
