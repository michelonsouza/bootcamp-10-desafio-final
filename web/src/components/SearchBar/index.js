import React, { useMemo, useRef, useState, memo, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import {
  MdSearch,
  MdAdd,
  MdClear,
  MdFilterList,
  MdClose,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import Input from '../Input';

import { Container } from './styles';

function SearchBar({ title, onSearch, onCreate, withProblem }) {
  const [resetable, setResetable] = useState(false);
  const [resetFilter, setResetFilter] = useState(false);
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);
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
    onSearch(data.search);
    setResetable(true);
  }

  function handleReset() {
    const { reset } = formRef.current;
    onSearch();
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
            title={`Limpar filtro de ${placeholder}`}
            disabled={!resetable}
          >
            <MdClear color={theme.colors.white} size={26} />
          </button>
        </Form>

        {placeholder === 'Busca por Encomendas' && (
          <div className="filter-container">
            <button
              type="button"
              onClick={() => {
                setResetFilter(true);
                withProblem();
              }}
            >
              <MdFilterList size={26} color={theme.colors.white} /> Filtrar
              entregas com problemas
            </button>

            <button
              type="button"
              onClick={() => {
                handleReset();
                setResetFilter(false);
              }}
              disabled={!resetFilter}
              title="Limpar filtros"
            >
              <MdClose size={26} color={theme.colors.white} />
            </button>
          </div>
        )}
        <button type="button" onClick={onCreate} title="Cadastrar">
          <MdAdd size={26} color={theme.colors.white} /> Cadastrar
        </button>
      </div>
    </Container>
  );
}

SearchBar.defaultProps = {
  withProblem: () => {},
};

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  withProblem: PropTypes.func,
};

export default memo(SearchBar);
