import Portfolio, {FieldType} from '@/model/Profile/Portfolio'
import {CustomInput} from '@/presentation/components/CustomInput'
import {useAppSelector} from '@/redux/hooks'
import globalStyles from '@/styles'
import {Input, Text, useTheme} from '@rneui/themed'
import React, {useState} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {ToggleButton} from '../Profile'
import DocumentPicker from 'react-native-document-picker'
import {IconProps} from 'react-native-vector-icons/Icon'
import {ScreenWidth} from '@rneui/base'

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

  const ItemList = ({title, fieldType}: {title: string; fieldType: FieldType}) => {
    return (
      <>
        <Text h4>{title}</Text>
        {portfolios.map(portfolio => {
          console.log(portfolio.portfolioType, fieldType)
          if (portfolio.portfolioType.name == fieldType.name) {
            let value = portfolio.url ?? ''
            if (portfolio.url != '' && portfolio.url && portfolio.portfolioType == FieldType.File) {
              const urls = decodeURI(portfolio.url).split('/')
              value = urls[urls.length - 1]
            }
            return (
              <EditItem
                name={portfolio.name}
                value={value}
                titleEditable
                editable={portfolio.portfolioType == FieldType.Url}
                placeholder={portfolio.portfolioType.placeholder}
                fieldColor="white"
                onDeleteItem={value => console.log(value)}
                onFieldPress={
                  portfolio.portfolioType == FieldType.File
                    ? () => {
                        DocumentPicker.pickSingle().then(res => {
                          setPortfolios(prevState => {
                            const idx = prevState.findIndex(
                              item => item.portfolioId == portfolio.portfolioId,
                            )
                            const copied = [...prevState]
                            if (idx) copied[idx] = {...copied[idx], url: res.uri}
                            return copied
                          })
                        })
                      }
                    : undefined
                }
              />
            )
          }
        })}
        <View style={{alignItems: 'center'}}>
          <SquareIcon
            name="add"
            onPress={() => {
              setPortfolios(prevState => [
                ...prevState,
                {
                  portfolioId: prevState.length.toString(),
                  portfolioType: fieldType,
                  name: '',
                  url: '',
                } as Portfolio,
              ])
            }}
          />
        </View>
      </>
    )
  }

  return (
    <View style={globalStyles.container}>
      <ItemList title="링크" fieldType={FieldType.Url} />
      <ItemList title="파일 업로드" fieldType={FieldType.File} />
    </View>
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
  name,
  value,
  placeholder,
  fieldColor,
  titleEditable = false,
  editable = false,
  onDeleteItem,
  onFieldPress,
}: {
  name: string
  value: string
  placeholder: string
  fieldColor?: string
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
        />
        <View style={{alignContent: 'flex-start'}}>
          {onDeleteItem ? <SquareIcon name="close" onPress={() => onDeleteItem(value)} /> : null}
        </View>
      </View>
      <CustomInput
        editable={editable}
        placeholder={placeholder}
        onPressOut={onFieldPress ? () => onFieldPress(value) : undefined}
        value={value}
      />
    </View>
  )
}

export default EditPortfolio
