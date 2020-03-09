import React, { useRef, useState, useEffect, useContext } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import {
  MdChevronLeft,
  MdCheck,
  MdPerson,
  MdPlace,
  MdAccountBalance,
  MdNearMe,
  MdLocationCity,
  MdDomain,
  MdHome,
  MdWarning,
} from 'react-icons/md';

import viacep from '~/services/viacep';

import { Input } from '~/components';

import {
  EditContainer,
  FormHeader,
  StreetComponents,
  CityComponents,
  Info,
} from '../styles';

export default function RecipientForm({
  recipient,
  title,
  onBack,
  onSubmit,
  edit,
}) {
  const formRef = useRef(null);
  const theme = useContext(ThemeContext);
  const [formValue, setFormValue] = useState(null);

  useEffect(() => {
    setFormValue(recipient || formValue);
  }, [formValue, recipient]);

  function handleSubmit(data) {
    onSubmit(data, edit ? recipient.id : null);
  }

  async function handleGetAddress({ target }) {
    const value = target.value.replace(/[-_]/g, '');

    if (value.length === 8) {
      try {
        const { data: response } = await viacep(`/${value}/json`);
        if (response.erro) throw Error();

        const newAddress = {
          street: response.logradouro,
          city: response.localidade,
          state: response.uf,
        };

        formRef.current.setData(newAddress);
      } catch (error) {
        toast.error('CEP inválido!');
      }
    }
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
                theme.colors[theme.title === 'light' ? 'white' : 'darkGrey']
              }
            />{' '}
            Voltar
          </button>
          <button type="submit" form="recipients-form">
            <MdCheck size={26} color={theme.colors.white} /> Salvar
          </button>
        </div>
      </FormHeader>
      <Form
        ref={formRef}
        id="recipients-form"
        onSubmit={handleSubmit}
        initialData={recipient}
      >
        <Info>
          <MdWarning color={theme.colors.secondaryTextColor} size={22} />
          <small>
            A alteração do CEP preenche automaticamente Rua, Cidade e Estado.
            Caso o CEP esteja correto.
          </small>
        </Info>
        <Input
          icon={MdPerson}
          name="name"
          label="Nome"
          type="text"
          placeholder="Nome do destinatário"
          required
        />

        <StreetComponents className="street-components">
          <Input
            icon={MdPlace}
            name="street"
            label="Logradouro"
            type="text"
            placeholder="Ex: Rua, Avnenida, Alameda, etc..."
            required
          />
          <Input
            icon={MdAccountBalance}
            name="number"
            label="Número"
            type="number"
            placeholder="Número"
            required
          />
          <Input
            icon={MdNearMe}
            name="complement"
            label="Complemento"
            type="text"
            placeholder="Ex: Próximo à padaria"
          />
        </StreetComponents>

        <CityComponents className="city-components">
          <Input
            icon={MdLocationCity}
            name="city"
            label="Cidade"
            type="text"
            placeholder="Cidade"
            required
          />
          <Input
            icon={MdDomain}
            name="state"
            label="Estado"
            type="text"
            placeholder="Estado"
          />
          <Input
            icon={MdHome}
            name="zipcode"
            label="CEP"
            type="text"
            mask="99999-999"
            placeholder="CEP"
            onChange={handleGetAddress}
            required
          />
        </CityComponents>
      </Form>
    </EditContainer>
  );
}

RecipientForm.defaultProps = {
  recipient: null,
  edit: false,
};

RecipientForm.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  recipient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.number,
    complement: PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.string,
    ]),
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }),
};
