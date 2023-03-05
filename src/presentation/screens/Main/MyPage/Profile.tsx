import React from 'react'
import globalStyles from '@/styles'
import {AirbnbRating, CheckBox, makeStyles, Text, useTheme} from '@rneui/themed'
import {ScrollView, StyleSheet, View} from 'react-native'
import {FilledButton} from '@/presentation/components/Button'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import ProfileViewDto from '@/model/Profile/ProfileViewDto'
import {Slider} from '@miblanchard/react-native-slider'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {StringOmit} from '@rneui/base'
import {RatingBar} from '@/presentation/components/RatingBar'
import Review from '@/model/Profile/Review'
import { Link } from '@react-navigation/native'

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
    completedTeams: [
      {
        position: '디자이너',
        projectName: '가보자잇',
        teamId: '234324',
      },
    ],
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
        name: '네이버 블로그',
        portfolioId: 'string',
        portfolioType: 'string',
        schemaVersion: 'string',
        url: 'string',
      },
    ],
    reviews: [
      {
        nickname: '김**',
        rating: 3.5,
        content:
          '대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다. 대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다. 모든 국민은 신체의 자유를 가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는 심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는 처벌·보안처분 또는 강제노역을 받지 아니한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.',
        addedAt: '2023-03-05',
      },
      {
        nickname: '최**',
        rating: 4.0,
        content:
          '대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다. 대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다. 모든 국민은 신체의 자유를 가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는 심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는 처벌·보안처분 또는 강제노역을 받지 아니한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.',
        addedAt: '2023-03-06',
      },
    ],
    position: 'Designer',
    rating: 3.5,
    schemaVersion: 'string',
    skills: [
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
        corporationName: '00회사에서 인턴',
        description: 'string',
        endedDate: '2022-01-01',
        isCurrent: true,
        schemaVersion: 'string',
        startedDate: '2022-06-01',
        workId: 'string',
      },
      {
        corporationName: '11회사에서 인턴',
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

  const portfolioTypeIconName = {
    pdf: 'description',
  }

  return !pageLoading ? (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 0.2, backgroundColor: '#f5f5f5', marginBottom: '30%'}} />
      <View style={{flex: 0.8}}>
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
          <>
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
              {profile.works
                .map(work => <IconLabel iconName="work" label={work.corporationName} />)
                .slice(0, 2)}

              <Text h4>기술스택/직무</Text>
              <ToggleButton title={profile.position} />
              {profile.skills.map(skill => (
                <>
                  <Text>희망 기술스택</Text>
                  <CustomSlider
                    text={skill.skillName}
                    value={parseInt(skill.level)}
                    onChangeValue={function (value: number | number[]): void {}}
                    minimumTrackTintColor="#FFDB20"
                  />
                </>
              ))}
              <Text h4>포트폴리오</Text>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {profile.portfolios.map(portfolio => (
                  <ToggleButton
                    title={portfolio.name}
                    icon={<MaterialIcon name={portfolioTypeIconName['pdf']} />}
                    backgroundColor="#FFF"
                  />
                ))}
              </View>
              <Text h4>이전 프로젝트</Text>
              {profile.completedTeams.map(team => (
                <Text>
                  프로젝트 '{team.projectName}' - {team.position}
                </Text>
              ))}
              <Text h4>리뷰</Text>
              <View style={{flexDirection: 'row'}}>
                <Text h2 style={{fontWeight: 'bold', marginEnd: 10}}>
                  {profile.rating}
                </Text>
                <View>
                  <RatingBar ratingScore={profile.rating} />
                  <Text>{profile.reviews.length}개 리뷰</Text>
                </View>
              </View>
              <View style={{marginTop: 25}}>
              {profile.reviews.map(review => (
                <ReviewItem review={review} />
              ))}
              <Link to={''} style={{color: theme.colors.primary, textAlign: 'right'}}>더보기</Link>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  ) : (
    <View style={globalStyles.container}>
      <Text>로딩</Text>
    </View>
  )
}

const ReviewItem = ({review}: {review: Review}) => {
  const {theme} = useTheme()
  return (
  <View style={{marginBottom: 20}}>
    <View style={{marginBottom:10, flexDirection: 'row', alignItems: 'center',}}>
      <Text style={{fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold, marginEnd: 10}}>{review.nickname}</Text>
      <RatingBar ratingScore={review.rating} size={20} />
    </View>
    <Text style={{fontWeight: theme.fontWeight.light, color: theme.colors.grey1, lineHeight: 25}} numberOfLines={3} ellipsizeMode="tail">
      {review.content}
    </Text>
    <Text style={{fontWeight: theme.fontWeight.light, color: theme.colors.grey1, lineHeight: 25}}>{review.addedAt}</Text>
  </View>
)}

const ToggleButton = ({
  title,
  icon,
  onClick,
  backgroundColor,
}: {
  title: string
  icon?: React.ReactNode
  onClick?: () => void
  backgroundColor?: string
}) => {
  const {theme} = useTheme()
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: backgroundColor ?? theme.colors.primary,
        borderRadius: 10,
        padding: 6,
        flexDirection: 'row',
      }}>
      {icon ? <View style={{marginEnd: 3}}>{icon}</View> : null}
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

const CustomSlider = ({
  text,
  value,
  onChangeValue,
  minimumTrackTintColor,
}: {
  text: string
  value: number
  onChangeValue: (value: number | number[]) => void
  minimumTrackTintColor: string
}) => {
  return (
    <View style={{width: '100%'}}>
      <Slider
        containerStyle={{
          width: '100%',
          overflow: 'hidden',
          height: 20,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 7,
        }}
        trackClickable
        step={1}
        maximumValue={3}
        trackStyle={{
          height: 20,
          borderRadius: 7,
          backgroundColor: 'white',
        }}
        trackMarks={[1, 2]}
        renderTrackMarkComponent={() => (
          <View style={{width: 1, height: 20, backgroundColor: 'black'}}></View>
        )}
        value={value}
        onValueChange={onChangeValue}
        thumbStyle={{backgroundColor: 'transparent', width: 0, borderWidth: 0}}
        minimumTrackTintColor={minimumTrackTintColor}
      />
      <Text style={{position: 'absolute', left: 5, top: 2}}>{text}</Text>
    </View>
  )
}

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
            {profile.completedTeams.length}회
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
