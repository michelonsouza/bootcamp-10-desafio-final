import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { DataSet, SearchBar, LoadingOverlay } from '~/components';

import RecipientForm from './RecipeintForm';

export default function Recipients() {
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [recipientEdit, setRecipientEdit] = useState(null);
  const [title, setTitle] = useState(null);
  const labels = ['ID', 'Nome', 'Endereço'];
  const actions = {
    edit: id => {
      setTitle('Edição de destinatário');
      setRecipientEdit(recipients.find(r => r.id === id));
    },
    deleteItem: {
      label: 'Excluir',
      fn: async id => {
        const deleteItem = window.confirm(
          `Tem certeza que deseja excluir o destinatário #${id}?`
        );

        if (deleteItem) {
          setLoading(true);

          try {
            await api.delete(`/recipients/${id}`);

            setRecipients(recipients.filter(r => r.id !== id));
            toast.success(`Destinatário #${id} excluído com sucesso`);
          } catch (error) {
            toast.error(`Erro ao excluir destinatário #${id}`);
          }

          setLoading(false);
        }
      },
    },
  };

  async function loadRecipients(page = 1, q = '') {
    setLoading(true);

    try {
      const { data: response } = await api.get('/recipients', {
        params: {
          page,
          q,
        },
      });

      setRecipients(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Erro 500: Erro interno no servidor');
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRecipients();
  }, []);

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

  async function handleCreateRecipient(data) {
    setLoading(true);

    try {
      const { data: response } = await api.post('/recipients', data);

      loadRecipients();
      toast.success(`Destinatário #${response.data.id} cadastrado com sucesso`);
      handleBack();
    } catch (error) {
      toast.error('Erro ao cadastrar destinatário');
    }

    setLoading(false);
  }

  async function handleUpdateRecipient(data, id) {
    setLoading(true);

    try {
      const { data: response } = await api.put(`/recipients/${id}`, data);

      setRecipients(recipients.map(r => (r.id === id ? response.data : r)));
      toast.success(`Destinatário #${id} editado com sucesso`);
      handleBack();
    } catch (error) {
      toast.error(`Erro ao editar destinatário #${id}`);
    }

    setLoading(false);
  }

  function handleSearch(query = '') {
    loadRecipients(1, query);
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      {!create && !recipientEdit && (
        <>
          <SearchBar
            title="Gerenciando Destinatários"
            onSearch={handleSearch}
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
