import React, { useContext } from 'react';
import Spinner from 'react-spinner-material';
import { ThemeContext } from 'styled-components';

import { Overlay } from './styles';

export default function LoadingOverlay() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Overlay />
      <div>
        <Spinner
          spinnerWidth={18}
          spinnerColor={theme.colors.primary}
          size={200}
        />
      </div>
    </>
  );
}
