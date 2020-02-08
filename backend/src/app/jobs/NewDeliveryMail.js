import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { addressFormat } from '../../utils/format';
import { mailText } from '../../utils/mailtext';
import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    const formatedDate = format(new Date(), "dd 'de' MMMM', às ' HH:mm'h'", {
      locale: pt,
    });

    const context = {
      orderNumber: delivery.id,
      product: delivery.product,
      client: delivery.recipient.name,
      address: addressFormat(delivery.recipient),
      date: formatedDate,
      title: 'Nova Entrega',
      name: delivery.deliveryman.name,
    };

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: `Nova entrega #${delivery.id}`,
      text: mailText('newdelivery', context),
      template: 'newdelivery',
      context,
    });
  }
}

export default new NewDeliveryMail();
