import Portfolio, { PortfolioType } from '@/data/model/Profile/Portfolio';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Input, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useMemo, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import useGlobalStyles from '@/presentation/styles';
import { createPortfolio, deletePortfolio, updatePortfolio } from '@/redux/action/profileActions';
import { List } from '@/presentation/screens/Main/MyPage/Profile/EditEducationAndWork';
import { DeleteIcon } from '@/presentation/components/icon/CustomIcon';
import { WIDTH } from '@/presentation/utils/util';
import CustomInput from '@/presentation/components/CustomInput';

const EditPortfolio = () => {
  // Todo: Implement Portfolio Reducer
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const dispatch = useAppDispatch();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const initializePortfolioRef = useRef(true);
  let temporaryPortfolioIdCount = useRef(data?.portfolios?.length || 0);
  const portfolios = useMemo(() => {
    if (!data?.portfolios) {
      return [];
    }

    if (initializePortfolioRef.current) {
      return initializePortfolios();
    }

    return data.portfolios;
  }, [data?.portfolios]);

  function initializePortfolios() {
    if (!data?.portfolios) {
      return [];
    }
    initializePortfolioRef.current = false;

    data.portfolios.forEach((it, idx) => {
      if (it.portfolioId) {
        dispatch(deletePortfolio(it.portfolioId));
      }
      createOriginalPortfolios({ ...it, portfolioId: idx });
    });

    return data.portfolios.map((it, idx) => ({ ...it, portfolioId: idx }));
  }

  function createOriginalPortfolios(portfolio: Portfolio) {
    dispatch(createPortfolio(portfolio));
  }

  const handleAdd = (portfolio: Portfolio) => {
    dispatch(createPortfolio({ ...portfolio, portfolioId: temporaryPortfolioIdCount.current++ }));
  };
  const handleDelete = (id: number) => {
    dispatch(deletePortfolio(id));
  };

  const handleFileEdit = (portfolio: Portfolio) => {
    dispatch(updatePortfolio(portfolio.portfolioId!, portfolio));
  };

  const handleLinkEdit = (portfolio: Portfolio) => {
    dispatch(updatePortfolio(portfolio.portfolioId!, portfolio));
  };
  const isValidateLink = (url: string) => {
    const pattern = /^https:\/\//;
    if (pattern.test(url)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    console.log('포트폴리오 변경 감지');
    portfolios.map(value => {
      console.log(`{portfolioId: ${value.portfolioId}, `);
      console.log(`portfolioUrl: ${value.portfolioUrl}, `);
      console.log(`portfolioName: ${value.portfolioName}, `);
      console.log(`createdAt: ${value.createdAt}, `);
      console.log(`media: ${value.media}, `);
      console.log(`updatedAt: ${value.updatedAt}}`);
    });
  }, [portfolios]);

  return (
    <ScrollView style={globalStyles.container}>
      <Text
        style={{
          fontSize: theme.fontSize.xmd,
          fontWeight: theme.fontWeight.semibold,
          marginBottom: 10,
        }}
      >
        링크
      </Text>
      <PortfolioList
        fieldType={PortfolioType.Url}
        onAddPortfolio={portfolio => handleAdd(portfolio)}
        onChangePortfolio={handleLinkEdit}
        onDeletePortfolio={handleDelete}
        portfolios={portfolios.filter(portfolio => portfolio.media == PortfolioType.Url)}
      />
      <Text
        style={{
          fontSize: theme.fontSize.xmd,
          fontWeight: theme.fontWeight.semibold,
          paddingTop: 32,
          marginBottom: 10,
        }}
      >
        파일 업로드
      </Text>
      <PortfolioList
        fieldType={PortfolioType.File}
        onAddPortfolio={portfolio => handleAdd(portfolio)}
        onChangePortfolio={handleFileEdit}
        onDeletePortfolio={handleDelete}
        portfolios={portfolios.filter(portfolio => portfolio.media == PortfolioType.File)}
      />
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const placeHolders = {
  LINK: 'URL 주소를 입력해주세요! ex)https://',
  FILE: '.jpg, .jpeg, .png, .pdf 포맷만 가능합니다!',
};

export const PortfolioList = ({
  portfolios,
  onChangePortfolio,
  onAddPortfolio,
  onDeletePortfolio,
  fieldType,
}: {
  portfolioIdCount: number;
  portfolios: Portfolio[];
  onChangePortfolio: (portfolio: Portfolio) => void;
  onAddPortfolio: (portfolio: Portfolio) => void;
  onDeletePortfolio: (portfolioId: number) => void;
  fieldType: PortfolioType;
}) => {
  const { theme } = useTheme();
  async function pickDocument(portfolio: Portfolio) {
    try {
      console.log('pickDocument success!....');
      await DocumentPicker.pickSingle({
        type: [types.pdf, '.jpeg .jpg .png', types.images],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      }).then(res => {
        portfolio.portfolioUrl = res.uri;
        onChangePortfolio(portfolio);
      });
    } catch (e) {
      console.log('pickDocument failed....');
    }
  }

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
              onDeleteItem={() => {
                onDeletePortfolio(portfolio.portfolioId!);
              }}
              onChangeName={text => onChangePortfolio({ ...portfolio, portfolioName: text })}
            >
              <TouchableOpacity
                onPress={() => {
                  portfolio.media == PortfolioType.File ? pickDocument(portfolio) : undefined;
                }}
              >
                <CustomInput
                  shape="round"
                  textContentType={fieldType == PortfolioType.Url ? 'URL' : undefined}
                  keyboardType={fieldType == PortfolioType.Url ? 'url' : undefined}
                  editable={portfolio.media == PortfolioType.Url}
                  placeholder={placeHolders[portfolio.media as PortfolioType]}
                  onChangeText={text => onChangePortfolio({ ...portfolio, portfolioUrl: text })}
                  value={value}
                  inputContainerStyle={{
                    height: theme.boxComponentHeight.lg,
                    borderColor: theme.colors.grey2,
                  }}
                  style={{ textDecorationColor: theme.colors.grey2 }}
                />
              </TouchableOpacity>
            </EditItem>
          );
        }}
        onAdd={() =>
          onAddPortfolio({
            portfolioId: undefined,
            media: fieldType,
            portfolioName: '',
            portfolioUrl: '',
          })
        }
      />
    </>
  );
};

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
    <View style={{ marginBottom: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 10,
        }}
      >
        <Input
          containerStyle={{ width: '60%', marginStart: -10 }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.colors.grey2,
            height: theme.boxComponentHeight.md,
            minWidth: WIDTH * 0.4,
          }}
          errorStyle={{ display: 'none' }}
          inputStyle={{
            textAlign: 'center',
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
          }}
          editable={titleEditable}
          value={name}
          onChangeText={onChangeName}
          rightIcon={
            <View style={{ alignContent: 'flex-start', marginEnd: 10 }}>
              {onDeleteItem ? (
                <TouchableOpacity
                  onPress={() => {
                    onDeleteItem(id);
                  }}
                >
                  <DeleteIcon name={''} size={25} />
                </TouchableOpacity>
              ) : null}
            </View>
          }
        />
      </View>
      {children}
    </View>
  );
};

export default EditPortfolio;
