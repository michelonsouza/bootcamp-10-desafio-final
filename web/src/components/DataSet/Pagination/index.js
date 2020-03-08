import React, { useMemo } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import PropTypes from 'prop-types';

import { PaginationContainer } from '../styles';

export default function Pagination({ onPageChange, pagination }) {
  const { page, perPage, total } = pagination;

  const nextDisable = useMemo(() => {
    return page * perPage >= total;
  }, [page, perPage, total]);

  function handlePrevPage() {
    onPageChange(page - 1);
  }

  function handleNextPage() {
    onPageChange(page + 1);
  }

  return (
    <PaginationContainer>
      <button
        type="button"
        disabled={page === 1}
        title="Anterior"
        onClick={handlePrevPage}
      >
        <MdChevronLeft size={26} color="#fff" />
      </button>
      <span>{page}</span>
      <button
        type="button"
        disabled={nextDisable}
        title="Próximo"
        onClick={handleNextPage}
      >
        <MdChevronRight size={26} color="#fff" />
      </button>
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};
