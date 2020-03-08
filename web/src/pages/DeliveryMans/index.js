import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { SearchBar, DataSet, LoadingOverlay } from '~/components';

import DeliverymanForm from './DeliverymanForm';

export default function DeliveryMans() {
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliverymans, setDeliverymans] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [create, setCreate] = useState(null);
  const [deliverymanEdit, setDeliverymanEdit] = useState(null);
  const labels = ['ID', 'Foto', 'Nome', 'Email'];
  const actions = {
    edit: id => {
      setTitle('Edição de entregadores');
      setDeliverymanEdit(deliverymans.find(d => d.id === id));
    },
    deleteItem: {
      label: 'Excluir',
      fn: async id => {
        const deleteItem = window.confirm(
          `Tem certeza que deseja deletar o entregador #${id}?`
        );

        if (deleteItem) {
          setLoading(true);

          try {
            await api.delete(`/deliverymans/${id}`);

            setDeliverymans(deliverymans.filter(d => d.id !== id));
            toast.success(`Entregador #${id} excluido com sucesso`);
          } catch (error) {
            toast.error(`Erro ao excluir entregador #${id}`);
          }

          setLoading(false);
        }
      },
    },
  };

  const formattedData = useMemo(() => {
    return deliverymans.map(d => ({
      id: d.id,
      avatar: {
        type: 'avatar',
        label: d.avatar ? d.avatar.url : null,
        name: d.name,
      },
      name: d.name,
      email: d.email,
    }));
  }, [deliverymans]);

  async function loadDeliverymans(page = 1, q = '') {
    setLoading(true);

    try {
      const { data: response } = await api.get('/deliverymans', {
        params: {
          page,
          q,
        },
      });

      setDeliverymans(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Erro 500: Erro interno no srvidor');
    }

    setLoading(false);
  }

  useEffect(() => {
    loadDeliverymans();
  }, []);

  function handleBack() {
    setDeliverymanEdit(null);
    setCreate(null);
    setTitle(null);
  }

  async function handleCreateDeliveryman(data) {
    setLoading(true);

    try {
      const { data: response } = await api.post('/deliverymans', data);

      setDeliverymans([response.data, ...deliverymans]);
      toast.success(`Entregador #${response.data.id} cadastrado com sucesso`);
      loadDeliverymans();
    } catch (error) {
      toast.error('Erro ao cadastrar entregador');
    }

    setLoading(false);
  }

  async function handleUpdateDeliveryman(data, id) {
    setLoading(true);

    try {
      const { data: response } = await api.put(`/deliverymans/${id}`, data);

      setDeliverymans(deliverymans.map(d => (d.id === id ? response.data : d)));
      toast.success(`Entregador #${id} editado com sucesso`);
      handleBack();
    } catch (error) {
      toast.error(`Erro ao editar entregador #${id}`);
    }

    setLoading(false);
  }

  function handleCreate() {
    setTitle('Cadastro de entregadores');
    setCreate(true);
  }

  function handleSearch(query = '') {
    loadDeliverymans(1, query);
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      {!deliverymanEdit && !create && (
        <>
          <SearchBar
            title="Gerenciando entregadores"
            onSearch={handleSearch}
            onCreate={handleCreate}
          />
          <DataSet
            labels={labels}
            data={formattedData}
            pagination={pagination}
            onPageChange={loadDeliverymans}
            actions={actions}
          />
        </>
      )}

      {deliverymanEdit && (
        <DeliverymanForm
          deliveryman={deliverymanEdit}
          title={title}
          onSubmit={handleUpdateDeliveryman}
          onBack={handleBack}
          edit
        />
      )}
      {create && (
        <DeliverymanForm
          title={title}
          onSubmit={handleCreateDeliveryman}
          onBack={handleBack}
        />
      )}
    </>
  );
}
