import Portfolio, { PortfolioType } from '@/data/model/Profile/Portfolio';
import CustomInput from '@/presentation/components/CustomInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Input, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToggleButton } from '../Profile';
import DocumentPicker, { types } from 'react-native-document-picker';
import { IconProps } from 'react-native-vector-icons/Icon';
import { ScreenWidth } from '@rneui/base';
import { List } from './EditSchoolAndWork';
import useGlobalStyles from '@/presentation/styles';
import { createPortfolio, deletePortfolio, updatePortfolio } from '@/redux/action/profileActions';

const EditPortfolio = () => {
  // Todo: Implement Portfolio Reducer
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const portfolios = data?.portfolios ?? [];
  const dispatch = useAppDispatch();

  const globalStyles = useGlobalStyles();

  const handleAdd = (portfolio: Portfolio) => {
    dispatch(createPortfolio(portfolio));
  };
  const handleDelete = (id: number) => {
    dispatch(deletePortfolio(id));
  };

  const handleEdit = (portfolio: Portfolio) => {
    dispatch(updatePortfolio(portfolio.portfolioId!, portfolio));
  };
  console.log(portfolios);

  return (
    <View style={globalStyles.container}>
      <PortfolioList
        title="링크"
        fieldType={PortfolioType.Url}
        onAddPortfolio={handleAdd}
        onChangePortfolio={handleEdit}
        onDeletePortfolio={handleDelete}
        totalPortfolios={portfolios.length}
        portfolios={portfolios.filter(portfolio => portfolio.media == PortfolioType.Url)}
      />
      <PortfolioList
        title="파일 업로드"
        fieldType={PortfolioType.File}
        onAddPortfolio={handleAdd}
        onChangePortfolio={handleEdit}
        onDeletePortfolio={handleDelete}
        totalPortfolios={portfolios.length}
        portfolios={portfolios.filter(portfolio => portfolio.media == PortfolioType.File)}
      />
    </View>
  );
};

const placeHolders = {
  LINK: 'URL 주소를 입력해주세요!',
  FILE: '.jpg, .jpeg, .png, .pdf 포맷만 가능합니다!',
};

export const PortfolioList = ({
  totalPortfolios,
  portfolios,
  onChangePortfolio,
  onAddPortfolio,
  onDeletePortfolio,
  title,
  fieldType,
}: {
  totalPortfolios: number;
  portfolios: Portfolio[];
  onChangePortfolio: (portfolio: Portfolio) => void;
  onAddPortfolio: (portfolio: Portfolio) => void;
  onDeletePortfolio: (portfolioId: number) => void;
  title: string;
  fieldType: PortfolioType;
}) => {
  const pickDocument = (portfolio: Portfolio) => {
    void DocumentPicker.pickSingle({
      type: [types.pdf, '.jpeg .jpg .png', types.images],
    }).then(res => {
      portfolio.portfolioUrl = res.uri;
      onChangePortfolio(portfolio);
    });
  };

  return (
    <>
      <List
        datas={portfolios}
        renderItems={(portfolio: Portfolio) => {
          let value = portfolio.portfolioUrl ?? '';
          if (
            portfolio.portfolioUrl != '' &&
            portfolio.portfolioUrl &&
            portfolio.media == PortfolioType.File
          ) {
            const urls = decodeURI(portfolio.portfolioUrl).split('/');
            value = urls[urls.length - 1];
          }
          console.log(portfolio, 'Type of portfolio: ', portfolio.media);
          return (
            <EditItem
              id={portfolio.portfolioId!}
              name={portfolio.portfolioName}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeletePortfolio(itemId);
              }}
              onChangeName={text => onChangePortfolio({ ...portfolio, portfolioName: text })}
            >
              <CustomInput
                textContentType={fieldType == PortfolioType.Url ? 'URL' : undefined}
                keyboardType={fieldType == PortfolioType.Url ? 'url' : undefined}
                editable={portfolio.media == PortfolioType.Url}
                placeholder={placeHolders[portfolio.media as PortfolioType]}
                onPressOut={
                  portfolio.media == PortfolioType.File ? () => pickDocument(portfolio) : undefined
                }
                onChangeText={text => onChangePortfolio({ ...portfolio, portfolioUrl: text })}
                value={value}
              />
            </EditItem>
          );
        }}
        onAdd={() =>
          onAddPortfolio({
            portfolioId: totalPortfolios,
            media: fieldType,
            portfolioName: '',
            portfolioUrl: '',
          })
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
  id: number;
  name?: string;
  fieldColor?: string;
  onChangeName: (text: string) => void;
  titleEditable?: boolean;
  onDeleteItem?: (value: number) => void;
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
