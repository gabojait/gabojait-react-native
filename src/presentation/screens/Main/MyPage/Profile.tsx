import React from 'react'
import globalStyles from '@/styles'
import {CheckBox, makeStyles, Text, useTheme} from '@rneui/themed'
import {StyleSheet, View} from 'react-native'
import {FilledButton} from '@/presentation/components/Button'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import ProfileViewDto from '@/model/Profile/ProfileViewDto'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {StringOmit} from '@rneui/base'

const Profile = () => {
  const {theme} = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useAppSelector(state => state.loginReducer.user)
  /*   const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useAppSelector(state => state.profileReducer.profile) */
  const pageLoading = userLoading
  console.log(user)

  const profileExist = true
  const profile = {
    completedTeamIds: ['string'],
    currentTeamId: 'string',
    description: '모든 국민은 종교의 자유를 가진다. 대통령의 임기는 5년으로 하며, 중임할 수 없다.',
    educations: [
      {
        educationId: 'string',
        endedDate: 'string',
        institutionName: '인천대학교 디자인학부 재학중',
        isCurrent: true,
        schemaVersion: 'string',
        startedDate: 'string',
      },
    ],
    imageUrl: 'string',
    isPublic: true,
    nickname: '대충 닉네임',
    portfolios: [
      {
        name: '앱센터 프로젝트 ‘가보자잇’',
        portfolioId: 'string',
        portfolioType: 'string',
        schemaVersion: 'string',
        url: 'string',
      },
    ],
    position: 'string',
    rating: 0,
    schemaVersion: 'string',
    skills: [
      {
        isExperienced: true,
        level: 'string',
        schemaVersion: 'string',
        skillId: 'string',
        skillName: 'Designer',
      },
      {
        isExperienced: true,
        level: 'string',
        schemaVersion: 'string',
        skillId: 'string',
        skillName: 'XD',
      },
      {
        isExperienced: true,
        level: 'string',
        schemaVersion: 'string',
        skillId: 'string',
        skillName: 'Figma',
      },
    ],
    userId: 'string',
    works: [
      {
        corporationName: '11회사에서 인턴',
        description: 'string',
        endedDate: '2022-01-01',
        isCurrent: true,
        schemaVersion: 'string',
        startedDate: '2022-06-01',
        workId: 'string',
      },
      {
        corporationName: '00회사에서 인턴',
        description: 'string',
        endedDate: '2023-02-26',
        isCurrent: true,
        schemaVersion: 'string',
        startedDate: '2022-07-01',
        workId: 'string',
      },
    ],
  } as ProfileViewDto

  const PortfolioNotExist = () => (
    <View>
      <Text style={{fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold}}>
        {user?.nickname}
      </Text>
      <Text style={{fontSize: theme.emojiSize.lg, textAlign: 'center'}}>🕺</Text>
      <Text style={styles.textStyle}>아직 프로필이 작성되지 않았어요</Text>
      <Text style={[styles.textStyle, {marginBottom: 30}]}>프로필을 작성하러 가볼까요?</Text>
      <FilledButton title="만들기" />
    </View>
  )

  return !pageLoading ? (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, backgroundColor: '#f5f5f5'}} />
      <View style={{flex: 0.8,}}>
      {!profileExist ? (
        <View
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingHorizontal: 20,
            paddingVertical: 50,
          }}>
          <View style={styles.profileContainer}></View>
          <PortfolioNotExist />
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              paddingHorizontal: 20,
              paddingVertical: 50,
            }}>
            <View style={styles.profileContainer}></View>
            <PortfolioView profile={profile} onProfileVisibilityChanged={isPublic => {}} />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              alignItems: 'flex-start',
              flexWrap: 'nowrap',
              padding: 20,
              marginTop: 20,
            }}>
            <Text h4>학력/경력</Text>
            <IconLabel
              iconName="school"
              label={profile.educations[profile.educations.length - 1].institutionName}
            />
            <IconLabel
              iconName="work"
              label={profile.works[profile.works.length - 1].corporationName}
            />
            <IconLabel
              iconName="work"
              label={profile.portfolios[profile.portfolios.length - 1].name}
            />
            <Text h4>기술스택/직무</Text>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {profile.skills.map(skill => (
                <ToggleButton title={skill.skillName} key={skill.skillId} />
              ))}
            </View>
          </View>
        </View>
      )}
      </View>
     
    </View>
  ) : (
    <View style={globalStyles.container}>
      <Text>로딩</Text>
    </View>
  )
}

const ToggleButton = ({title, onClick}: {title: string; onClick?: () => void}) => {
  const {theme} = useTheme()
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        padding: 6,
      }}>
      <Text>{title}</Text>
    </View>
  )
}

const IconLabel = ({iconName, label}: {iconName: string; label: string}) => (
  <View style={{flexDirection: 'row'}}>
    <MaterialIcon name={iconName} />
    <Text>{label}</Text>
  </View>
)

const PortfolioView = ({
  profile,
  onProfileVisibilityChanged,
}: {
  profile: ProfileViewDto
  onProfileVisibilityChanged: (visibility: boolean) => void
}) => {
  const {theme} = useTheme()

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold}}>
          {profile.nickname}
        </Text>
        <CheckBox
          checked={profile.isPublic}
          onPress={() => onProfileVisibilityChanged(!profile.isPublic)}
          checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
          uncheckedIcon={
            <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
          }
          containerStyle={{padding: 0}}
          title="팀 초대 허용"
        />
      </View>
      <Text style={{fontSize: theme.fontSize.md}}>{profile.position}</Text>
      <Text style={{fontSize: theme.fontSize.md}}>{profile.description}</Text>
      <SolidCard>
        <View>
          <Text style={{fontWeight: theme.fontWeight.light, textAlign: 'center'}}>팀 매칭</Text>
          <Text style={{fontWeight: theme.fontWeight.bold, textAlign: 'center'}}>
            {profile.completedTeamIds.length}회
          </Text>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>리뷰</Text>
          <Text style={{textAlign: 'center'}}>
            <MaterialIcon name="star" color={theme.colors.primary} />
            {profile.rating}({profile.rating})
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: theme.fontWeight.light, textAlign: 'center'}}>총 경력</Text>
          <Text style={{fontWeight: theme.fontWeight.bold, textAlign: 'center'}}>
            {new Date(profile.works[profile.works.length - 1].endedDate).getMilliseconds() -
              new Date(profile.works[0].startedDate).getMilliseconds()}
            ms
          </Text>
        </View>
      </SolidCard>
    </View>
  )
}

const SolidCard = ({children}: {children?: React.ReactNode}) => {
  const styles = useCardStyles()
  return <View style={styles.container}>{children}</View>
}

const useCardStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors.grey0,
    borderRadius: 20,
    padding: 23,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}))

const useStyles = makeStyles(theme => ({
  textStyle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  profileContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
    top: -(100 - 30),
    left: 20,
  },
}))

export default Profile
