import CustomHeader from '@/presentation/components/CustomHeader';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { Icon, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

type BookMarkHeaderProps = {
  stackHeaderProps?: StackHeaderProps;
  onPressBookMark: () => void;
  onPressReport: () => void;
  toChangeColor: string;
};

const BookMarkHeader: React.FC<BookMarkHeaderProps> = ({
  stackHeaderProps,
  onPressBookMark,
  onPressReport,
  toChangeColor,
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
    />
  );
};

export default BookMarkHeader;
