import React from 'react';
import Spinner from 'react-spinner-material';

import { colors } from '~/styles/defaults';

import { Overlay } from './styles';

export default function LoadingOverlay() {
  return (
    <>
      <Overlay />
      <div>
        <Spinner spinnerWidth={18} spinnerColor={colors.primary} size={200} />
      </div>
    </>
  );
}
