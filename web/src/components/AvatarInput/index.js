import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { MdImage } from 'react-icons/md';

import { nameInitials, randomColor } from '~/util/format';
import { colors } from '~/styles/defaults';
import api from '~/services/api';

import { Container, AltAvatar } from './styles';

export default function AvatarInput({ name, edit }) {
  const inputRef = useRef(null);
  const { defaultValue, registerField, fieldName } = useField('avatar');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const avatarAlt = useMemo(() => {
    return edit && nameInitials(edit);
  }, [edit]);

  const color = useMemo(() => {
    return randomColor();
  }, []);

  useEffect(() => {
    registerField({
      name,
      ref: inputRef.current,
      path: 'dataset.file',
    });
  }, [fieldName, name, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const { data: response } = await api.post('/files', data);

    const { id, url } = response.data;

    setFile(Number(id));
    setPreview(url);
  }

  return (
    <Container color={color}>
      <label htmlFor="avatar">
        {preview && <img src={preview} alt={name} />}
        {!preview && edit && (
          <AltAvatar color={color}>
            <span>{avatarAlt}</span>
          </AltAvatar>
        )}
        {!preview && !edit && (
          <AltAvatar column>
            <MdImage size={50} color={colors.light.colorLight} />
            <p>Adicionar foto</p>
          </AltAvatar>
        )}

        <input
          id="avatar"
          type="file"
          ref={inputRef}
          data-file={file}
          onChange={handleChange}
          name={name}
        />
      </label>
    </Container>
  );
}

AvatarInput.defaultProps = {
  edit: false,
};

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
  edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
