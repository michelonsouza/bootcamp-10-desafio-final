import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataSet, SearchBar, LoadingOverlay } from '~/components';
import {
  recipientsRequest,
  recipientCreateRequest,
  recipientUpdateRequest,
  deleteRecipient,
  recipientsFilteredRequest,
} from '~/store/modules/recipients/actions';

import RecipientForm from './RecipeintForm';

export default function Recipients() {
  const [create, setCreate] = useState(false);
  const [recipientEdit, setRecipientEdit] = useState(null);
  const [title, setTitle] = useState(null);
  const dispatch = useDispatch();
  const { loading, recipients, pagination } = useSelector(
    state => state.recipients
  );
  const labels = ['ID', 'Nome', 'Endereço'];
  const actions = {
    edit: id => {
      setTitle('Edição de destinatário');
      setRecipientEdit(recipients.find(r => r.id === id));
    },
    deleteItem: {
      label: 'Excluir',
      fn: id => {
        const deleteItem = window.confirm(
          `Tem certeza que deseja excluir o destinatário #${id}?`
        );

        if (deleteItem) {
          dispatch(deleteRecipient(id));
        }
      },
    },
  };

  useEffect(() => {
    dispatch(recipientsRequest());
  }, [dispatch]);

  const formattedRecipients = useMemo(() => {
    return recipients.map(item => ({
      id: item.id,
      name: item.name,
      address: {
        type: 'address',
        label: item,
      },
    }));
  }, [recipients]);

  function handleBack() {
    setCreate(false);
    setRecipientEdit(null);
    setTitle(null);
  }

  function createRecipient() {
    setTitle('Cadastro de destinatário');
    setCreate(true);
  }

  function handleCreateRecipient(data) {
    dispatch(recipientCreateRequest(data));
    handleBack();
  }

  function handleUpdateRecipient(data, id) {
    dispatch(recipientUpdateRequest(data, id));
    handleBack();
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      {!create && !recipientEdit && (
        <>
          <SearchBar
            title="Gerenciando Destinatários"
            onSearch={recipientsFilteredRequest}
            onCreate={createRecipient}
          />
          <DataSet
            labels={labels}
            data={formattedRecipients}
            actions={actions}
            onPageChange={() => {}}
            pagination={pagination}
          />
        </>
      )}

      {create && (
        <RecipientForm
          title={title}
          onSubmit={handleCreateRecipient}
          onBack={handleBack}
        />
      )}
      {recipientEdit && (
        <RecipientForm
          recipient={recipientEdit}
          title={title}
          onSubmit={handleUpdateRecipient}
          onBack={handleBack}
          edit
        />
      )}
    </>
  );
}
