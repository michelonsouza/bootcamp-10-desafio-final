import React, { useState, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdModeEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { colors } from '~/styles/defaults';
import { nameInitials, randomColor } from '~/util/format';
import { DataItem, Status, DeliveryMans } from '../styles';

function RenderItem({ value, color, index }) {
  const label = {
    delivered: 'Entregue',
    canceled: 'Cancelada',
    withdrawal: 'Retirada',
    pending: 'Pendente',
  };
  if (value instanceof Object) {
    if (value.type === 'status') {
      return (
        <Status status={value.label}>
          <div /> <span>{label[value.label]}</span>
        </Status>
      );
    }

    if (value.type === 'deliveryman') {
      const initial = nameInitials(value.label);

      return (
        <DeliveryMans color={color}>
          <div>{initial}</div> <span>{value.label}</span>
        </DeliveryMans>
      );
    }
  }

  return <span>{index === 0 ? `#${value}` : value}</span>;
}

function Item({ item, actions }) {
  const [visible, setVisible] = useState(false);
  const color = useMemo(() => {
    return randomColor();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <DataItem>
      {item.map((value, index) => (
        <RenderItem
          key={`data-item-${String(index)}`}
          value={value}
          color={color}
          index={index}
        />
      ))}
      <div>
        <button
          type="button"
          className="actions"
          title="Ações"
          onClick={handleToggleVisible}
        >
          <MdMoreHoriz size={30} color={colors.light.colorLight} />
        </button>

        {visible && (
          <div>
            {actions.see && (
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  actions.see(item[0]);
                }}
              >
                <MdRemoveRedEye color={colors.primary} size={20} /> Visualizar
              </button>
            )}
            {actions.edit && (
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  actions.edit(item[0]);
                }}
              >
                <MdModeEdit color={colors.info} size={20} /> Editar
              </button>
            )}
            {actions.deleteItem && (
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  actions.deleteItem(item[0]);
                }}
              >
                <MdDeleteForever color={colors.danger} size={20} /> Cancelar
              </button>
            )}
          </div>
        )}
      </div>
    </DataItem>
  );
}

Item.defaultProps = {
  actions: {
    see: false,
    edit: false,
    deleteItem: false,
  },
};

Item.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ).isRequired,
  actions: PropTypes.shape({
    see: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    edit: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    deleteItem: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
  }),
};

RenderItem.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ]).isRequired,
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default memo(Item);
