import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  deliverymansRequest,
  createDeliveryman,
  deleteDeliveryman,
  updateDeliverymanRequest,
  deliverymanFilterRequest,
} from '~/store/modules/deliverymans/actions';

import { SearchBar, DataSet, LoadingOverlay } from '~/components';

import DeliverymanForm from './DeliverymanForm';

export default function DeliveryMans() {
  const [title, setTitle] = useState(null);
  const [create, setCreate] = useState(null);
  const [deliverymanEdit, setDeliverymanEdit] = useState(null);
  const { loading, deliverymans, pagination } = useSelector(
    state => state.deliverymans
  );
  const dispatch = useDispatch();
  const labels = ['ID', 'Foto', 'Nome', 'Email'];
  const actions = {
    edit: id => {
      setTitle('Edição de entregadores');
      setDeliverymanEdit(deliverymans.find(d => d.id === id));
    },
    deleteItem: {
      label: 'Excluir',
      fn: id => {
        const deleteItem = window.confirm(
          `Tem certeza que deseja deletar o entregador #${id}?`
        );

        if (deleteItem) {
          dispatch(deleteDeliveryman(id));
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

  useEffect(() => {
    dispatch(deliverymansRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBack() {
    setDeliverymanEdit(null);
    setCreate(null);
    setTitle(null);
  }

  function handleCreateDeliveryman(data) {
    dispatch(createDeliveryman(data));
    handleBack();
  }

  function handleEditDeliveryman(data, id) {
    dispatch(updateDeliverymanRequest(data, id));
  }

  function handleCreate() {
    setTitle('Cadastro de entregadores');
    setCreate(true);
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      {!loading && !deliverymanEdit && !create && (
        <>
          <SearchBar
            title="Gerenciando entregadores"
            onSearch={deliverymanFilterRequest}
            onCreate={handleCreate}
          />
          <DataSet
            labels={labels}
            data={formattedData}
            pagination={pagination}
            onPageChange={deliverymansRequest}
            actions={actions}
          />
        </>
      )}

      {deliverymanEdit && (
        <DeliverymanForm
          deliveryman={deliverymanEdit}
          title={title}
          onSubmit={handleEditDeliveryman}
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
