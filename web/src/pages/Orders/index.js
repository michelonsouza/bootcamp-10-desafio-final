import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Modal from './Modal';
import OrderForm from './OrderForm';
import { SearchBar, DataSet, LoadingOverlay } from '~/components';

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [orders, setOrders] = useState([]);
  const [create, setCreate] = useState(false);
  const [title, setTitle] = useState(null);
  const [orderEdit, setOrderEdit] = useState(null);
  const labels = [
    'ID',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
  ];

  const formattedOrders = useMemo(() => {
    return orders.map(item => ({
      id: item.id,
      recipient: item.recipient.name,
      deliveryman: {
        type: 'deliveryman',
        label: item.deliveryman.name,
      },
      city: item.recipient.city,
      state: item.recipient.state,
      status: {
        type: 'status',
        label: item.status,
      },
    }));
  }, [orders]);

  const actions = {
    see: id => {
      setSelectedOrder(orders.find(o => o.id === id));
    },
    edit: id => {
      setTitle('Edição de encomendas');
      setOrderEdit(orders.find(o => o.id === id));
    },
    deleteItem: async id => {
      const deleteItem = window.confirm(
        `Tem certeza que deseja cancelar a encomenda #${id}?`
      );

      if (deleteItem) {
        setLoading(true);

        try {
          await api.delete(`/orders/${id}`);
          toast.success(`Encomenda #${id} cancelada com sucesso`);
        } catch (error) {
          toast.error(`Erro ao cancelar encomenda #${id}`);
        }

        setLoading(false);
      }
    },
  };

  async function loadOrders(page = 1, q = '') {
    setLoading(true);

    try {
      const { data: response } = await api.get('/orders', {
        params: {
          page,
          q,
        },
      });

      setOrders(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Erro 500: Problema no servidor :(');
    }

    setLoading(false);
  }

  function handleBack() {
    setOrderEdit(null);
    setTitle(null);
    setCreate(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function getDeliveryMans(query = '') {
    const { data: response } = await api.get('/deliverymans', {
      params: {
        q: query,
      },
    });

    const data = response.data.map(d => ({
      value: d.id,
      label: d.name,
    }));

    return data;
  }

  async function getRecipients(query = '') {
    const { data: response } = await api.get('/recipients', {
      params: {
        q: query,
      },
    });

    const data = response.data.map(d => ({
      value: d.id,
      label: d.name,
    }));

    return data;
  }

  function createOrder() {
    setTitle('Cadastro de encomendas');
    setCreate(true);
  }

  async function handleUpdateOrder(data, id) {
    setLoading(true);

    try {
      const { data: response } = await api.put(`/orders/${id}`, data);

      setOrders(orders.map(o => (o.id === id ? response.data : o)));
      toast.success(`Encomenda #${id} atualizada com sucesso`);
    } catch (error) {
      toast.error(`Erro ao atualizar encomenda #${id}`);
    }

    setOrderEdit(null);
    setLoading(false);
  }

  async function handleCreateOrder(data) {
    setLoading(true);

    try {
      const { data: response } = await api.post('/orders', data);

      setOrders([response.data, ...orders]);
      handleBack();
      loadOrders();

      toast.success(`Encomenda #${response.data.id} cadastrada com sucesso`);
    } catch (error) {
      toast.error('Erro ao criar nova encomenda');
    }

    setLoading(false);
  }

  async function handleSearch(query) {
    loadOrders(1, query);
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      {!orderEdit && !create && (
        <>
          <SearchBar
            title="Gerenciando Encomendas"
            onSearch={handleSearch}
            onCreate={createOrder}
          />
          <DataSet
            labels={labels}
            data={formattedOrders}
            actions={actions}
            onPageChange={loadOrders}
            pagination={pagination}
          />
        </>
      )}

      {orderEdit && (
        <OrderForm
          title={title}
          onSubmit={handleUpdateOrder}
          order={orderEdit}
          loadRecipients={getRecipients}
          loadDeliveryMans={getDeliveryMans}
          onBack={handleBack}
          edit
        />
      )}

      {create && (
        <OrderForm
          title={title}
          onSubmit={handleCreateOrder}
          loadRecipients={getRecipients}
          loadDeliveryMans={getDeliveryMans}
          onBack={handleBack}
        />
      )}

      {selectedOrder && (
        <Modal order={selectedOrder} close={setSelectedOrder} />
      )}
    </>
  );
}
