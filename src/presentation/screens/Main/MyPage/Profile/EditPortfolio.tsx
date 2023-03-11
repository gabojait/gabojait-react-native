import Portfolio, {FieldType} from '@/model/Profile/Portfolio'
import CustomInput from '@/presentation/components/CustomInput'
import {useAppSelector} from '@/redux/hooks'
import globalStyles from '@/styles'
import {Input, Text, useTheme} from '@rneui/themed'
import React, {useEffect, useState} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {ToggleButton} from '../Profile'
import DocumentPicker from 'react-native-document-picker'
import {IconProps} from 'react-native-vector-icons/Icon'
import {ScreenWidth} from '@rneui/base'
import useGlobalStyles from '@/styles'

const EditPortfolio = () => {
  // Todo: Implement Portfolio Reducer
  const orgPortfolios =
    /* useAppSelector(state => state) */
    [
      {
        name: 'Github',
        portfolioId: 'github',
        portfolioType: FieldType.Url,
        url: 'https://github.com/KimWash',
      },
      {
        name: '파일',
        portfolioId: 'blog',
        portfolioType: FieldType.File,
        url: '',
      },
    ] as Portfolio[]
  const [portfolios, setPortfolios] = useState(orgPortfolios)

  const globalStyles = useGlobalStyles()

  const handleAdd = (portfolio: Portfolio) => {
    setPortfolios(prevState => [
      ...prevState,
      {...portfolio, portfolioId: prevState.length.toString()},
    ])
  }
  const handleDelete = (id: string) => {
    setPortfolios(prevState => {
      const idx = prevState.findIndex(item => item.portfolioId == id)
      prevState.splice(idx, 1)
      return [...prevState]
    })
  }

  const handleEdit = (portfolio: Portfolio) => {
    setPortfolios(prevState => {
      const idx = prevState.findIndex(item => item.portfolioId == portfolio.portfolioId)
      prevState[idx] = portfolio
      return [...prevState]
    })
  }

  return (
    <View style={globalStyles.container}>
      <ItemList
        title="링크"
        fieldType={FieldType.Url}
        onAddPortfolio={handleAdd}
        onChangePortfolio={handleEdit}
        onDeletePortfolio={handleDelete}
        portfolios={portfolios.filter(portfolio => portfolio.portfolioType == FieldType.Url)}
      />
      <ItemList
        title="파일 업로드"
        fieldType={FieldType.File}
        onAddPortfolio={handleAdd}
        onChangePortfolio={handleEdit}
        onDeletePortfolio={handleDelete}
        portfolios={portfolios.filter(portfolio => portfolio.portfolioType == FieldType.File)}
      />
    </View>
  )
}

const ItemList = ({
  portfolios,
  onChangePortfolio,
  onAddPortfolio,
  onDeletePortfolio,
  title,
  fieldType,
}: {
  portfolios: Portfolio[]
  onChangePortfolio: (portfolio: Portfolio) => void
  onAddPortfolio: (portfolio: Portfolio) => void
  onDeletePortfolio: (portfolioId: string) => void
  title: string
  fieldType: FieldType
}) => {
  const pickDocument = (portfolio: Portfolio) => {
    DocumentPicker.pickSingle().then(res => {
      portfolio.url = res.uri
      onChangePortfolio(portfolio)
    })
  }

  return (
    <>
      <Text h4>{title}</Text>
      {portfolios.map(portfolio => {
        let value = portfolio.url ?? ''
        if (portfolio.url != '' && portfolio.url && portfolio.portfolioType == FieldType.File) {
          const urls = decodeURI(portfolio.url).split('/')
          value = urls[urls.length - 1]
        }
        return (
          <EditItem
            id={portfolio.portfolioId}
            name={portfolio.name}
            value={value}
            titleEditable
            editable={portfolio.portfolioType == FieldType.Url}
            placeholder={portfolio.portfolioType.placeholder}
            fieldColor="white"
            onDeleteItem={itemId => {
              onDeletePortfolio(itemId)
            }}
            onFieldPress={
              portfolio.portfolioType == FieldType.File ? () => pickDocument(portfolio) : undefined
            }
            onChangeName={text => onChangePortfolio({...portfolio, name: text})}
            onChangeText={text => onChangePortfolio({...portfolio, url: text})}
          />
        )
      })}
      <View style={{alignItems: 'center'}}>
        <SquareIcon
          name="add"
          onPress={() => {
            onAddPortfolio({
              portfolioId: portfolios.length.toString(),
              portfolioType: fieldType,
              name: '',
              url: '',
            } as Portfolio)
          }}
        />
      </View>
    </>
  )
}

const SquareIcon = ({...props}: IconProps) => (
  <Icon
    size={props.size ?? 20}
    style={[{borderWidth: 1, padding: 2, borderRadius: 8, borderColor: 'black'}, props.style]}
    {...props}
  />
)
const EditItem = ({
  id,
  name,
  value,
  placeholder,
  fieldColor,
  titleEditable = false,
  editable = false,
  onChangeText,
  onChangeName,
  onDeleteItem,
  onFieldPress,
}: {
  id: string
  name: string
  value: string
  placeholder: string
  fieldColor?: string
  onChangeText: (text: string) => void
  onChangeName: (text: string) => void
  titleEditable?: boolean
  editable?: boolean
  onDeleteItem?: (value: string) => void
  onFieldPress?: (value: string) => void
}) => {
  const {theme} = useTheme()
  return (
    <View style={{marginBottom: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
        <Input
          containerStyle={{width: ScreenWidth * 0.3, margin: 0, paddingHorizontal: 0}}
          inputContainerStyle={{borderWidth: 1, borderRadius: 10, borderColor: theme.colors.grey2}}
          errorStyle={{display: 'none'}}
          inputStyle={{
            textAlign: 'center',
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
            color: theme.colors.grey2,
          }}
          editable={titleEditable}
          placeholder={name}
          onChangeText={onChangeName}
        />
        <View style={{alignContent: 'flex-start'}}>
          {onDeleteItem ? <SquareIcon name="close" onPress={() => onDeleteItem(id)} /> : null}
        </View>
      </View>
      <CustomInput
        editable={editable}
        placeholder={placeholder}
        onPressOut={onFieldPress ? () => onFieldPress(id) : undefined}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

export default EditPortfolio
