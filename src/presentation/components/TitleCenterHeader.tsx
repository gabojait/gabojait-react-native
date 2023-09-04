import HeaderProps from '@/presentation/components/props/HeaderProps';
import { Text, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from './CustomHeader';

const TitleCenterHeader: React.FC<HeaderProps> = ({ title, canGoBack, leftChildren }) => {
  return <CustomHeader title={title} canGoBack={false} />;
};

export default TitleCenterHeader;
