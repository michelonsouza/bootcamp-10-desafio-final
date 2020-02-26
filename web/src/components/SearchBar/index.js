import React, { useMemo, useRef, useState, memo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdSearch, MdAdd, MdClear } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { colors } from '~/styles/defaults';

import Input from '../Input';

import { Container } from './styles';

function SearchBar({ title, onSearch, onClick }) {
  const [resetable, setResetable] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const placeholder = useMemo(() => {
    let basestr = 'Busca por ';
    const endpoint = path.split('/');
    switch (endpoint[endpoint.length - 1]) {
      case 'orders':
        basestr += 'Encomendas';
        break;
      case 'delivery-mans':
        basestr += 'Entregadores';
        break;
      case 'recipients':
        basestr += 'Destinatários';
        break;
      case 'delivery-problems':
        basestr += 'Problemas';
        break;
      default:
    }

    return basestr;
  }, [path]);

  function handleSubmit(data) {
    dispatch(onSearch(data.search));
    setResetable(true);
  }

  function handleReset() {
    const { reset } = formRef.current;
    dispatch(onSearch());
    setResetable(false);
    reset();
  }

  return (
    <Container>
      <h1>{title}</h1>
      <div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="search" placeholder={placeholder} icon={MdSearch} />
          <button
            type="button"
            onClick={handleReset}
            title="Limpar filtro"
            disabled={!resetable}
          >
            <MdClear color={colors.white} size={26} />
          </button>
        </Form>

        <button type="button" onClick={onClick}>
          <MdAdd size={26} color={colors.white} /> Cadastrar
        </button>
      </div>
    </Container>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(SearchBar);
