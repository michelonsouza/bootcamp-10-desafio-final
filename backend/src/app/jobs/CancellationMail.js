import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import { addressFormat } from '../../utils/format';
import { mailText } from '../../utils/mailtext';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    const formatedDate = format(
      parseISO(delivery.canceled_at),
      "dd 'de' MMMM', às ' HH:mm'h'",
      {
        locale: pt,
      }
    );

    const context = {
      orderNumber: delivery.id,
      product: delivery.product,
      client: delivery.recipient.name,
      address: addressFormat(delivery.recipient),
      date: formatedDate,
      title: 'Cancelamento',
      name: delivery.deliveryman.name,
    };

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: `Cancelamento da entrega #${delivery.id}`,
      text: mailText('cancellation', context),
      template: 'cancellation',
      context,
    });
  }
}

export default new CancellationMail();
