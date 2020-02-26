import React from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { Overlay, Content } from '../styles';

export default function Modal({ order, close }) {
  const { street, number, city, state, zipcode } = order.recipient;
  const { start_date, end_date, signature } = order;

  function dateFormat(date) {
    return format(parseISO(date), 'dd/MM/yyyy');
  }

  return (
    <>
      <Overlay onClick={() => close(null)} />
      <Content>
        <p>
          <b>Informações da encomenda</b>
        </p>
        <p>
          {street}, {number}
        </p>
        <p>
          {city} - {state}
        </p>
        <p>{zipcode}</p>

        <div>
          <p>
            <b>Datas</b>
          </p>
          <p>
            <b>Retirada: </b>
            {start_date ? dateFormat(start_date) : 'N/A'}
          </p>
          <p>
            <b>Entrega: </b>
            {end_date ? dateFormat(end_date) : 'N/A'}
          </p>
        </div>

        {signature && (
          <div>
            <p>
              <b>Assinatura do destinatário</b>
            </p>
            <img src={signature.url} alt="Assinatura do Cliente" />
          </div>
        )}
      </Content>
    </>
  );
}

Modal.propTypes = {
  order: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
    recipient: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.string,
    }),
  }).isRequired,
  close: PropTypes.func.isRequired,
};
