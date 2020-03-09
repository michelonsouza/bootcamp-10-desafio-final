import React, { useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { MdPerson, MdEmail, MdChevronLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { FormHeader, EditContainer } from '../styles';

import { AvatarInput, Input } from '~/components';

export default function DeliverymanForm({
  deliveryman,
  title,
  onBack,
  onSubmit,
  edit,
}) {
  const formRef = useRef(null);
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    const data = formRef.current.getData();
    data.avatar_id = Number(data.avatar_id);

    onSubmit(data, edit ? deliveryman.id : null);
  }

  return (
    <EditContainer>
      <FormHeader>
        <h1>{title}</h1>
        <div>
          <button type="button" onClick={onBack}>
            <MdChevronLeft
              size={26}
              color={
                theme.colors[theme.title === 'light' ? 'white' : 'darkGray']
              }
            />{' '}
            Voltar
          </button>
          <button type="submit" form="deliveryman-form">
            <MdCheck size={26} color={theme.colors.white} /> Salvar
          </button>
        </div>
      </FormHeader>
      <Form
        id="deliveryman-form"
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={edit ? deliveryman : null}
      >
        <AvatarInput name="avatar_id" edit={edit ? deliveryman.name : false} />
        <Input
          name="name"
          label="Nome"
          placeholder="Nome completo"
          icon={MdPerson}
          required
        />
        <Input
          name="email"
          label="E-mail"
          placeholder="Seu melhor e-mail"
          icon={MdEmail}
          required
        />
      </Form>
    </EditContainer>
  );
}

DeliverymanForm.defaultProps = {
  edit: false,
  deliveryman: {},
};

DeliverymanForm.propTypes = {
  deliveryman: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      }),
    ]),
  }),
  edit: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
