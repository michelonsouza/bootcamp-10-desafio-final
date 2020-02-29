import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ordersRequest,
  ordersFilteredRequest,
  updateOrderRequest,
  createOrderRequest,
  cancelOrderRequest,
} from '~/store/modules/orders/actions';

import api from '~/services/api';

import Modal from './Modal';
import OrderForm from './OrderForm';
import { SearchBar, DataSet, LoadingOverlay } from '~/components';

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [create, setCreate] = useState(false);
  const [title, setTitle] = useState(null);
  const [orderEdit, setOrderEdit] = useState(null);
  const dispatch = useDispatch();
  const { loading, orders, pagination } = useSelector(state => state.orders);
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
    deleteItem: id => {
      const deleteItem = window.confirm(
        `Tem certeza que deseja cancelar a encomenda #${id}?`
      );

      if (deleteItem) {
        dispatch(cancelOrderRequest(id));
      }
    },
  };

  useEffect(() => {
    dispatch(ordersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleUpdateOrder(data, id) {
    dispatch(updateOrderRequest(data, id));
    setOrderEdit(null);
  }

  function handleCreateOrder(data) {
    dispatch(createOrderRequest(data));
  }

  function handleBack() {
    setOrderEdit(null);
    setTitle(null);
    setCreate(false);
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      {!orderEdit && !create && (
        <>
          <SearchBar
            title="Gerenciando Encomendas"
            onSearch={ordersFilteredRequest}
            onCreate={createOrder}
          />
          <DataSet
            labels={labels}
            data={formattedOrders}
            actions={actions}
            onPageChange={ordersRequest}
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
