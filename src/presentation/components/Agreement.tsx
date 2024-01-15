import { CheckBox, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { RegisterProps } from '../screens/Onboarding/Register';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export interface AgreementState {
  checkedAll: boolean;
  items: Agreement[];
}

interface SelectItem {
  text: string;
  value: string;
}

interface Agreement extends SelectItem {
  checked: boolean;
  url: string;
}

interface AgreementItemProps extends Agreement {
  onCheckedChange: (checked: boolean) => void;
}

const AgreementItem: React.FC<AgreementItemProps & RegisterProps> = props => {
  const { theme } = useTheme();
  const navigation = props.navigation.getParent()!;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <ScrollView
        horizontal={true}
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            checked={props.checked}
            onPress={() => props.onCheckedChange(!props.checked)}
            title={props.text}
            containerStyle={{ alignSelf: 'baseline', paddingEnd: 0, marginEnd: 0 }}
            checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
            uncheckedIcon={
              <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
            }
          />
          <Text
            onPress={() =>
              navigation.navigate('WebView', {
                url: props.url,
                title: '약관',
              })
            }
            style={{
              color: theme.colors.primary,
              textDecorationLine: 'underline',
              flex: 1,
              textAlignVertical: 'center',
            }}
          >
            약관보기
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AgreementItem;
