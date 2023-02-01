import {CheckBox, makeStyles, Text, useTheme} from '@rneui/themed'
import React, {createRef, useEffect, useRef, useState} from 'react'
import {Alert, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {FilledButton, OutlinedButton} from '@/presentation/components/Button'
import {OnboardingStackParamList, RootStackParamList} from '@/presentation/navigation/types'
import {StackScreenProps} from '@react-navigation/stack'
import {RegisterInput} from '@/presentation/components/RegisterInput'
import color from '@/presentation/res/styles/color'
import {DateDropdown} from '@/presentation/components/DateDropdown'
import RegisterRequestDto from '@/model/RegisterRequestDto'
import {emailRegex, nicknameRegex, passwordRegex, realnameRegex, usernameRegex} from '@/util'
import {Gender} from '@/model/Gender'
import globalStyles from '@/styles'
import DatePickerModal from '@/presentation/components/DatePickerModal'
import {Link, useNavigation} from '@react-navigation/native'
import {ValidatorState} from '@/presentation/components/props/StateProps'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AgreementItem, {AgreementState} from '@/presentation/components/Agreement'
import DropdownWithoutItem from '@/presentation/components/DropdownWithoutItem'
import DropdownButton from '@/presentation/components/DropdownWithoutItem'
import {
  checkNicknameDuplicate,
  checkUsernameDuplicate,
  register,
} from '@/redux/reducers/registerReducer'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'

export type RegisterProps = StackScreenProps<OnboardingStackParamList, 'Register'>

const agreementItems = [
  {
    text: '이용약관에 동의합니다.(필수)',
    value: 'term',
    checked: false,
    url: 'https://gs97ahninu.notion.site/ab7a6fd5262340e09eb657c569f59454',
  },
  {
    text: '개인정보 수집 및 이용에 동의합니다.(필수)',
    value: 'privacyPolicy',
    checked: false,
    url: 'https://gs97ahninu.notion.site/29a9af66564b47c0ac758a882adf0b52',
  },
]

const Register = ({navigation, route}: RegisterProps) => {
  const [registerState, setRegisterState] = useState<RegisterRequestDto>({
    gender: Gender.Female,
    birthdate: new Date().toISOString(),
  })
  const {theme} = useTheme()
  const dispatch = useAppDispatch()

  const [agreementState, setAgreementState] = useState<AgreementState>({
    checkedAll: false,
    items: agreementItems,
  })

  useEffect(() => {
    if (agreementState.items.filter(item => item.checked).length == agreementState.items.length) {
      setAgreementState(prevState => ({...prevState, checkedAll: true}))
    } else {
      setAgreementState(prevState => ({...prevState, checkedAll: false}))
    }
  }, [agreementState.items])

  const [modalOpened, setModalOpened] = useState(false)

  const styles = useStyles({navigation, route})

  function isValid(regex: RegExp, text?: string): ValidatorState {
    if (text?.length == 0 || !text) {
      return 'none'
    } else {
      return regex.test(text) ? 'valid' : 'invalid'
    }
  }

  const {
    data: registerResult,
    loading: registerLoading,
    error: registerError,
  } = useAppSelector(state => state.registerReducer.registerResult)

  const {
    data: usernameDup,
    loading: usernameDupLoading,
    error: usernameDupError,
  } = useAppSelector(state => state.registerReducer.usernameDupCheckResult)

  const {
    data: nicknameDup,
    loading: nicknameDupLoading,
    error: nicknameDupError,
  } = useAppSelector(state => state.registerReducer.nicknameDupCheckResult)

  useEffect(() => {
    console.log(registerResult)
  }, [registerResult])

  const checkAllFieldsValidate = () => {
    //FIXME: 개똥코드. 고쳐야해요
    return (
      usernameRegex.test(registerState.username ?? '') &&
      nicknameRegex.test(registerState.nickname ?? '') &&
      passwordRegex.test(registerState.password ?? '') &&
      emailRegex.test(registerState.email ?? '') &&
      agreementState.checkedAll
    )
  }

  return (
    <View>
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
        <View style={styles.item}>
          <View style={{flex: 5}}>
            <RegisterInput
              state={isValid(usernameRegex, registerState.username)}
              label="아이디 입력"
              value={registerState.username}
              onChangeText={(text: string) => {
                setRegisterState(prevState => ({...prevState, username: text}))
              }}
            />
          </View>
          <OutlinedButton
            title="중복확인"
            size="sm"
            onPress={() => {
              if (usernameRegex.test(registerState.username ?? ''))
                dispatch(checkUsernameDuplicate(registerState.username ?? ''))
            }}
          />
        </View>
        <View style={styles.item}>
          <View style={{flex: 5}}>
            <RegisterInput
              state={isValid(nicknameRegex, registerState.nickname)}
              label="닉네임 입력"
              value={registerState.nickname}
              onChangeText={(text: string) => {
                setRegisterState(prevState => ({...prevState, nickname: text}))
              }}
            />
          </View>
          <OutlinedButton
            title="중복확인"
            size="sm"
            onPress={() => {
              if (nicknameRegex.test(registerState.nickname ?? ''))
                dispatch(checkNicknameDuplicate(registerState.nickname ?? ''))
            }}
          />
        </View>
        <View style={styles.item}>
          <RegisterInput
            state={isValid(passwordRegex, registerState.password)}
            label="비밀번호 입력"
            isForPassword={true}
            value={registerState.password}
            onChangeText={(text: string) => {
              setRegisterState(prevState => ({...prevState, password: text}))
            }}
          />
        </View>
        <View style={styles.item}>
          <RegisterInput
            state={
              registerState.passwordReEntered?.length != 0
                ? registerState.password == registerState.passwordReEntered &&
                  passwordRegex.test(registerState.passwordReEntered ?? '')
                  ? 'valid'
                  : 'invalid'
                : 'none'
            }
            label="비밀번호 재입력"
            isForPassword={true}
            value={registerState.passwordReEntered}
            onChangeText={(text: string) => {
              setRegisterState(prevState => ({...prevState, passwordReEntered: text}))
            }}
          />
        </View>

        <View style={styles.item}>
          <View style={{flex: 5}}>
            <RegisterInput
              state={isValid(emailRegex, registerState.email)}
              label="이메일 입력"
              value={registerState.email}
              onChangeText={(text: string) => {
                setRegisterState(prevState => ({...prevState, email: text}))
              }}
            />
          </View>
          <OutlinedButton title="인증하기" size="sm" />
        </View>
        <View style={styles.item}>
          <RegisterInput
            state={isValid(realnameRegex, registerState.legalName)}
            label="이름(실명)"
            value={registerState.legalName}
            onChangeText={(text: string) => {
              setRegisterState(prevState => ({...prevState, legalName: text}))
            }}
          />
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.label}>생년월일 입력</Text>
          <DropdownButton
            text={
              !registerState.birthdate
                ? '생년월일 입력'
                : new Date(registerState.birthdate).toLocaleDateString()
            }
            onClick={() => setModalOpened(true)}
          />
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.label}>성별</Text>
          <View style={styles.genderView}>
            <OutlinedButton
              title="여자"
              size="sm"
              onPress={() => setRegisterState(prevState => ({...prevState, gender: Gender.Female}))}
              style={[
                styles.toggleButton,
                registerState.gender == Gender.Female ? styles.active : null,
              ]}
              titleStyle={registerState.gender == Gender.Female ? styles.active : styles.disabled}
            />
            <OutlinedButton
              title="남자"
              size="sm"
              onPress={() => setRegisterState(prevState => ({...prevState, gender: Gender.Male}))}
              style={[
                styles.toggleButton,
                registerState.gender == Gender.Male ? styles.active : null,
              ]}
              titleStyle={registerState.gender == Gender.Male ? styles.active : styles.disabled}
            />
          </View>
          <View style={styles.agreementContainer}>
            <CheckBox
              checked={agreementState.checkedAll}
              onPress={() =>
                setAgreementState(prevState => {
                  const items = [...prevState.items].map(item => ({
                    ...item,
                    checked: !prevState.checkedAll,
                  }))
                  return {checkedAll: !prevState.checkedAll, items}
                })
              }
              checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
              uncheckedIcon={
                <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
              }
              title="약관 전체 동의"
            />
            <View style={{height: 1, backgroundColor: '#EEEEEE'}} />
            {agreementState.items.map((item, idx) => (
              <AgreementItem
                key={idx}
                text={item.text}
                checked={item.checked}
                onCheckedChange={checked => {
                  console.log(checked)
                  setAgreementState(prevState => {
                    const items = [...prevState.items]
                    items[idx].checked = checked
                    return {...prevState, items}
                  })
                }}
                value={item.value}
                url={item.url}
                navigation={navigation}
                route={route}
              />
            ))}
          </View>
        </View>
        <FilledButton
          title="가입하기"
          onPress={() => {
            if (checkAllFieldsValidate()) dispatch(register(registerState))
          }}
          containerStyle={{marginBottom: 40}}
        />
      </ScrollView>
      <DatePickerModal
        title="생년월일을 입력해주세요"
        doneButtonText="다음"
        modalVisible={modalOpened}
        onModalVisibityChanged={visibility => setModalOpened(visibility)}
        date={new Date(registerState.birthdate ?? new Date().toISOString())}
        onDatePicked={date => {
          setRegisterState(prevState => ({...prevState, birthdate: date.toISOString()}))
        }}
      />
    </View>
  )
}

const useStyles = makeStyles((theme, props: RegisterProps) => ({
  agreementContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    marginTop: 45,
  },
  active: {
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  },
  disabled: {
    borderColor: theme.colors.disabled,
    color: theme.colors.disabled,
  },
  toggleButton: {
    flex: 1,
    color: theme.colors.disabled,
    borderColor: theme.colors.disabled,
  },
  view: {
    backgroundColor: color.white,
    padding: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemBox: {
    paddingTop: 30,
  },
  genderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: color.grey2,
    paddingBottom: 24,
  },
}))

export default Register
