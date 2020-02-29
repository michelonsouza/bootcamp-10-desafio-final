import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  problemsRequest,
  problemCancelDelivery,
} from '~/store/modules/problems/actions';
import { DataSet, LoadingOverlay } from '~/components';

import Modal from './Modal';

export default function DeliveryProblems() {
  const dispatch = useDispatch();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const { problems, loading } = useSelector(state => state.problems);
  const labels = ['Encomenda', 'Problema'];
  const actions = {
    see: id => {
      setSelectedProblem(problems.find(p => p.delivery.id === id));
    },
    deleteItem: {
      label: 'Cancelar encomenda',
      fn: id => {
        const deleteItem = window.confirm(
          `Tem certeza que deseja cancelar a encomenda #${id}?`
        );

        if (deleteItem) {
          const { id: problemId } = problems.find(p => p.delivery.id === id);
          dispatch(problemCancelDelivery(problemId));
        }
      },
    },
  };

  useEffect(() => {
    dispatch(problemsRequest());
  }, [dispatch]);

  const formattedProblems = useMemo(() => {
    return problems.map(p => ({
      id: p.delivery.id,
      problem: p.description,
    }));
  }, [problems]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <DataSet
        labels={labels}
        actions={actions}
        data={formattedProblems}
        halfColumn
      />
      {selectedProblem && (
        <Modal problem={selectedProblem} close={setSelectedProblem} />
      )}
    </>
  );
}
