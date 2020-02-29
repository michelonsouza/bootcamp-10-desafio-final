import React, { useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { colors } from '~/styles/defaults';

import { SelectInput, Input } from '~/components';

import { EditContainer, FormHeader } from '../styles';

export default function OrderForm({
  order,
  title,
  onBack,
  onSubmit,
  loadRecipients,
  loadDeliveryMans,
  edit,
}) {
  const formRef = useRef(null);

  function handleSubmit() {
    const data = formRef.current.getData();
    onSubmit(data, edit ? order.id : null);
  }

  return (
    <EditContainer>
      <FormHeader>
        <h1>{title}</h1>
        <div>
          <button type="button" onClick={onBack}>
            <MdChevronLeft size={26} color={colors.white} /> Voltar
          </button>
          <button type="submit" form="order-form">
            <MdCheck size={26} color={colors.white} /> Salvar
          </button>
        </div>
      </FormHeader>
      <Form
        id="order-form"
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={order}
      >
        <div>
          <SelectInput
            label="Destinatário"
            onSearch={query => loadRecipients(query)}
            selected={
              order && {
                value: order.recipient.id,
                label: order.recipient.name,
              }
            }
            name="recipient_id"
            placeholder="Selecionar destinatário"
            required
          />
          <SelectInput
            label="Entregador"
            onSearch={query => loadDeliveryMans(query)}
            selected={
              order && {
                value: order.deliveryman.id,
                label: order.deliveryman.name,
              }
            }
            name="deliveryman_id"
            placeholder="Selecionar entregador"
            required
          />
        </div>
        <Input
          label="Nome do produto"
          name="product"
          type="text"
          placeholder="Nome do produto"
          required
        />
      </Form>
    </EditContainer>
  );
}

OrderForm.defaultProps = {
  order: null,
  edit: false,
};

OrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    deliveryman: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    recipient: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  edit: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  loadRecipients: PropTypes.func.isRequired,
  loadDeliveryMans: PropTypes.func.isRequired,
};
