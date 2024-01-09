import CustomHeader from '@/presentation/components/CustomHeader';
import { StackHeaderProps } from '@react-navigation/stack';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { Icon } from '@rneui/themed';
import React from 'react';

type BookMarkHeaderProps = {
  stackHeaderProps?: StackHeaderProps;
  onPressBookMark: () => void;
  onPressReport: () => void;
  toChangeColor: string;
  headerStyle?: StyleProp<ViewStyle>;
};

const BookMarkHeader: React.FC<BookMarkHeaderProps> = ({
  stackHeaderProps,
  onPressBookMark,
  onPressReport,
  toChangeColor,
  headerStyle,
}) => {
  return (
    <CustomHeader
      title={''}
      canGoBack={true}
      rightChildren={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onPressBookMark} style={{ paddingEnd: 16 }}>
            <CustomIcon name="heart" size={24} color={toChangeColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressReport}>
            <Icon type="material" name="pending" size={24} />
          </TouchableOpacity>
        </View>
      }
      align="center"
      headerstyle={headerStyle}
    />
  );
};

export default BookMarkHeader;
