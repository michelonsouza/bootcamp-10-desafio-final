import React from 'react';
import PropTypes from 'prop-types';

import { Overlay, Content } from '../styles';

export default function Modal({ problem, close }) {
  return (
    <>
      <Overlay onClick={() => close(null)} />
      <Content>
        <p>
          <b>Visualizar problema</b>
        </p>
        <p>{problem.description}</p>
        <br />
        <p>
          <b>Entregador: </b>
          {problem.delivery.deliveryman.name}
        </p>
        <br />
        <p>
          <b>Cliente: </b>
          {problem.delivery.recipient.name}
        </p>
        <br />
        <p>
          <b>Produto: </b>
          {problem.delivery.product}
        </p>
        <br />
        <p>
          <b>Endereço:</b>
        </p>
        <p>
          <b>Rua: </b> {problem.delivery.recipient.street}
        </p>
        <p>
          <b>Número: </b> {problem.delivery.recipient.number}
        </p>
        <p>
          <b>Cidate: </b> {problem.delivery.recipient.city}
        </p>
        <p>
          <b>Estado: </b> {problem.delivery.recipient.state}
        </p>
        <p>
          <b>CEP: </b> {problem.delivery.recipient.zipcode}
        </p>
      </Content>
    </>
  );
}

Modal.propTypes = {
  problem: PropTypes.shape({
    description: PropTypes.string,
    delivery: PropTypes.shape({
      product: PropTypes.string,
      recipient: PropTypes.shape({
        name: PropTypes.string,
        street: PropTypes.string,
        number: PropTypes.number,
        city: PropTypes.string,
        state: PropTypes.string,
        zipcode: PropTypes.string,
      }),
      deliveryman: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
  }).isRequired,
  close: PropTypes.func.isRequired,
};
