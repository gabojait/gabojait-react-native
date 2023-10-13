import HeaderProps from '@/presentation/components/props/HeaderProps';
import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '@/presentation/components/icon/Gabojait';

const CustomHeader: React.FC<HeaderProps> = ({
  title,
  canGoBack,
  leftChildren,
  rightChildren,
  align,
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const back = (
    <CustomIcon
      name="arrow-back"
      size={30}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      style={{ position: 'absolute' }}
    />
  );

  const Title = (
    <Text
      style={{
        fontWeight: theme.fontWeight.semibold,
        fontSize: theme.fontSize.lg,
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  );

  return (
    <View style={[headerStyle.parent, { borderColor: theme.colors.disabled }]}>
      {canGoBack && title ? (
        <>
          <View style={{ flex: 3, paddingBottom: 26 }}>{canGoBack ? back : null}</View>
          <View style={{ flex: 6 }}>{Title}</View>
        </>
      ) : !canGoBack && title ? (
        <>
          <View style={{ paddingStart: 10 }}>{Title}</View>
        </>
      ) : canGoBack && !title ? (
        <View style={{ flex: 3, paddingBottom: 26 }}>{canGoBack ? back : null}</View>
      ) : (
        <></>
      )}
      <View
        style={{
          flex: 3,
          alignItems: 'flex-end',
          paddingEnd: 20,
        }}
      >
        {rightChildren}
      </View>
    </View>
  );
};

const headerGlobalStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  alignItems: 'flex-end',
};

// card base components, width /radius 다름, theme에서 하나만

const headerStyle = StyleSheet.create({
  parent: {
    ...headerGlobalStyle,
    paddingStart: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  left: {
    ...headerGlobalStyle,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default CustomHeader;
