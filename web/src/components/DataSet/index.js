import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container, Head, DataList, Actions } from './styles';
import DataItem from './DataItem';
import Pagination from './Pagination';

export default function DataSet({
  data,
  labels,
  actions,
  onPageChange,
  pagination,
}) {
  const head = labels.length
    ? labels
    : Object.keys(data[0]).map(key => key.toUpperCase());

  const values = useMemo(() => {
    return data.map(d => Object.values(d));
  }, [data]);

  return (
    <Container>
      <Head>
        {head.map(label => (
          <span key={label}>{label}</span>
        ))}
        <span className="actions">Ações</span>
      </Head>
      <DataList>
        {values.map((item, index) => (
          <DataItem
            key={`data-item-${String(index)}`}
            item={item}
            actions={actions}
          />
        ))}
        <Actions />
      </DataList>
      {pagination && (
        <Pagination onPageChange={onPageChange} pagination={pagination} />
      )}
    </Container>
  );
}

DataSet.defaultProps = {
  actions: false,
  pagination: null,
  onPageChange: null,
};

DataSet.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPageChange: PropTypes.func,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    total: PropTypes.number,
  }),
  actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
};
