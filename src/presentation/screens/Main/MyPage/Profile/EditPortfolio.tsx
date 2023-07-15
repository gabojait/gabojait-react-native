import Portfolio, { PortfolioType } from '@/data/model/Profile/Portfolio';
import CustomInput from '@/presentation/components/CustomInput';
import { useAppSelector } from '@/redux/hooks';
import { Input, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToggleButton } from '../Profile';
import DocumentPicker from 'react-native-document-picker';
import { IconProps } from 'react-native-vector-icons/Icon';
import { ScreenWidth } from '@rneui/base';
import { List } from './EditSchoolAndWork';
import useGlobalStyles from '@/presentation/styles';

const EditPortfolio = () => {
  // Todo: Implement Portfolio Reducer
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const orgPortfolios = data?.portfolios ?? [];
  console.log(orgPortfolios);

  const [portfolios, setPortfolios] = useState(orgPortfolios);

  const globalStyles = useGlobalStyles();

  const handleAdd = (portfolio: Portfolio) => {
    setPortfolios(prevState => [
      ...prevState,
      { ...portfolio, portfolioId: prevState.length.toString() },
    ]);
  };
  const handleDelete = (id: string) => {
    setPortfolios(prevState => {
      const idx = prevState.findIndex(item => item.portfolioId == id);
      prevState.splice(idx, 1);
      return [...prevState];
    });
  };

  const handleEdit = (portfolio: Portfolio) => {
    setPortfolios(prevState => {
      const idx = prevState.findIndex(item => item.portfolioId == portfolio.portfolioId);
      prevState[idx] = portfolio;
      return [...prevState];
    });
  };

  return (
    <View style={globalStyles.container}>
      <PortfolioList
        title="링크"
        fieldType={PortfolioType.Url}
        onAddPortfolio={handleAdd}
        onChangePortfolio={handleEdit}
        onDeletePortfolio={handleDelete}
        portfolios={portfolios.filter(portfolio => portfolio.portfolioType == PortfolioType.Url)}
      />
      <PortfolioList
        title="파일 업로드"
        fieldType={PortfolioType.File}
        onAddPortfolio={handleAdd}
        onChangePortfolio={handleEdit}
        onDeletePortfolio={handleDelete}
        portfolios={portfolios.filter(portfolio => portfolio.portfolioType == PortfolioType.File)}
      />
    </View>
  );
};

const placeHolders = {
  L: 'URL 주소를 입력해주세요!',
  F: '.jpg, .jpeg, .png, .pdf 포맷만 가능합니다!',
};

export const PortfolioList = ({
  portfolios,
  onChangePortfolio,
  onAddPortfolio,
  onDeletePortfolio,
  title,
  fieldType,
}: {
  portfolios: Portfolio[];
  onChangePortfolio: (portfolio: Portfolio) => void;
  onAddPortfolio: (portfolio: Portfolio) => void;
  onDeletePortfolio: (portfolioId: string) => void;
  title: string;
  fieldType: PortfolioType;
}) => {
  const pickDocument = (portfolio: Portfolio) => {
    void DocumentPicker.pickSingle().then(res => {
      portfolio.url = res.uri;
      onChangePortfolio(portfolio);
    });
  };

  return (
    <>
      <List
        datas={portfolios}
        renderItems={portfolio => {
          let value = portfolio.url ?? '';
          if (
            portfolio.url != '' &&
            portfolio.url &&
            portfolio.portfolioType == PortfolioType.File
          ) {
            const urls = decodeURI(portfolio.url).split('/');
            value = urls[urls.length - 1];
          }
          return (
            <EditItem
              id={portfolio.portfolioId}
              name={portfolio.name}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeletePortfolio(itemId);
              }}
              onChangeName={text => onChangePortfolio({ ...portfolio, name: text })}
            >
              <CustomInput
                textContentType={fieldType == PortfolioType.Url ? 'URL' : undefined}
                keyboardType={fieldType == PortfolioType.Url ? 'url' : undefined}
                editable={portfolio.portfolioType == PortfolioType.Url}
                placeholder={placeHolders[portfolio.portfolioType as PortfolioType]}
                onPressOut={
                  portfolio.portfolioType == PortfolioType.File
                    ? () => pickDocument(portfolio)
                    : undefined
                }
                onChangeText={text => onChangePortfolio({ ...portfolio, url: text })}
                value={value}
              />
            </EditItem>
          );
        }}
        onAdd={() =>
          onAddPortfolio({
            portfolioId: portfolios.length.toString(),
            portfolioType: fieldType,
            name: '',
            url: '',
          } as Portfolio)
        }
        title={title}
      />
    </>
  );
};

export const SquareIcon = ({ ...props }: IconProps) => (
  <Icon
    size={props.size ?? 20}
    style={[{ borderWidth: 1, padding: 2, borderRadius: 8, borderColor: 'black' }, props.style]}
    {...props}
  />
);
export const EditItem = ({
  id,
  name,
  fieldColor,
  titleEditable = false,
  onChangeName,
  onDeleteItem,
  children,
}: {
  id: string;
  name: string;
  fieldColor?: string;
  onChangeName: (text: string) => void;
  titleEditable?: boolean;
  onDeleteItem?: (value: string) => void;
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Input
          containerStyle={{ width: ScreenWidth * 0.3, margin: 0, paddingHorizontal: 0 }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.colors.grey2,
          }}
          errorStyle={{ display: 'none' }}
          inputStyle={{
            textAlign: 'center',
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
            color: theme.colors.grey2,
            paddingHorizontal: 10,
          }}
          editable={titleEditable}
          placeholder={name}
          onChangeText={onChangeName}
        />
        <View style={{ alignContent: 'flex-start' }}>
          {onDeleteItem ? <SquareIcon name="close" onPress={() => onDeleteItem(id)} /> : null}
        </View>
      </View>
      {children}
    </View>
  );
};

export default EditPortfolio;
