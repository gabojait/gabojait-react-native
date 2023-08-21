import { useTheme } from '@rneui/themed';
import React from 'react';
import ReactLoading from 'react-loading';

export const Buffering = () => {
  const { theme } = useTheme();

  return <ReactLoading type={'balls'} color={theme.colors.grey0} height={'20%'} width={'20%'} />;
};
