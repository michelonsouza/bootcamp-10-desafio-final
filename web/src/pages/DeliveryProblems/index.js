import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { DataSet, LoadingOverlay } from '~/components';

import Modal from './Modal';

export default function DeliveryProblems() {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const labels = ['Encomenda', 'Problema'];
  const actions = {
    see: id => {
      setSelectedProblem(problems.find(p => p.delivery.id === id));
    },
    deleteItem: {
      label: 'Cancelar encomenda',
      fn: async id => {
        const problemId = problems.find(p => p.delivery.id === id).id;
        const deleteItem = window.confirm(
          `Tem certeza que deseja cancelar a encomenda #${id}?`
        );

        if (deleteItem) {
          setLoading(true);

          try {
            await api.delete(`/problem/${problemId}/cancel-delivery`);

            toast.success(`Encomenda #${id} cancelada com sucesso`);
          } catch (error) {
            toast.error(`Erro ao cancelar encomenda #${id}`);
          }

          setLoading(false);
        }
      },
    },
  };

  async function loadProblems(page = 1) {
    setLoading(true);

    try {
      const { data: response } = await api.get('/delivery/problems', {
        params: {
          page,
        },
      });

      setProblems(response.data);
    } catch (error) {
      toast.error('Erro 500: Problema no servidor :(');
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProblems();
  }, []);

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
