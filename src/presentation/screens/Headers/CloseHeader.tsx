import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import useGlobalStyles from '@/presentation/styles';

const Header: React.FC<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const globalStyles = useGlobalStyles();
  return (
    <View style={[{ alignItems: 'flex-end', padding: 20 }, globalStyles.headerHeight]}>
      <Icon
        name="close"
        size={25}
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
      />
    </View>
  );
};

export default Header;
