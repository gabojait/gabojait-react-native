import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';
import CustomHeader from '@/presentation/components/CustomHeader';

const TitleWithCloseHeader: React.FC<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  return <CustomHeader title={title} canGoBack={navigation.canGoBack()} />;
};

export default TitleWithCloseHeader;
