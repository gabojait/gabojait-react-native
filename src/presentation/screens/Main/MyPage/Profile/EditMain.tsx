import {ScrollView, View} from 'react-native'
import React from 'react'
import {ArrowCard} from '@/presentation/components/BaseCard'
import {Input, Text, useTheme} from '@rneui/themed'
import ProfileViewDto from '@/model/Profile/ProfileViewDto'
import {
  CustomSlider,
  IconLabel,
  portfolioTypeIconName,
  sliderColors,
  ToggleButton,
} from '../Profile'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {ProfileStackParamListProps} from '@/presentation/navigation/types'
import {FieldType} from '@/model/Profile/Portfolio'
import CardWrapper from '@/presentation/components/CardWrapper'
import globalStyles from '@/styles'
import useGlobalStyles from '@/styles'
import CustomHeader from '@/presentation/components/CustomHeader'

export function EditMainHeader() {
  const {theme} = useTheme()
  return (
    <CustomHeader
      align="center"
      title="프로필"
      canGoBack
      rightChildren={
        <Text
          onPress={() => {
            console.log('완료')
          }}
          style={{color: theme.colors.primary}}>
          완료
        </Text>
      }
    />
  )
}

const EditMain = ({navigation}: ProfileStackParamListProps<'EditMain'>) => {
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
        portfolioType: FieldType.Url,
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
        level: '3',
        schemaVersion: 'string',
        skillId: 'string',
        skillName: 'XD',
      },
      {
        isExperienced: false,
        level: '1',
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
  const {theme} = useTheme()
  const globalStyles = useGlobalStyles()

  return (
    <ScrollView style={{padding: 20, backgroundColor: 'white'}}>
      <ArrowCard
        title="기본정보"
        onArrowPress={() => {
          navigation.getParent()?.navigate('UserModifier')
        }}
        style={{marginBottom: theme.spacing.xl}}>
        <></>
      </ArrowCard>
      <CardWrapper style={[globalStyles.card, {marginBottom: theme.spacing.xl, padding: 20}]}>
        <Text style={{fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold}}>
          자기소개
        </Text>
        <Input
          placeholder="본인이 프로젝트 중 겪었던 문제 극복 상황에 대해 적어도 좋아요:)"
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholderTextColor={theme.colors.disabled}
          containerStyle={{paddingHorizontal: 0}}
          multiline
          numberOfLines={6}
          inputStyle={{fontWeight: theme.fontWeight.light}}></Input>
      </CardWrapper>
      <ArrowCard
        title="포트폴리오"
        style={{marginBottom: theme.spacing.xl}}
        onArrowPress={() => {
          navigation.navigate('EditPortfolio')
        }}>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {profile.portfolios.map(portfolio => (
            <ToggleButton
              title={portfolio.name}
              icon={<Icon name={portfolioTypeIconName['pdf']} />}
              backgroundColor="#FFF"
            />
          ))}
        </View>
      </ArrowCard>
      <ArrowCard
        title="학력/경력"
        style={{marginBottom: theme.spacing.xl}}
        onArrowPress={() => {
          navigation.navigate('EditSchoolAndCareer')
        }}>
        <IconLabel
          iconName="school"
          label={profile.educations[profile.educations.length - 1].institutionName}
        />
        {profile.works
          .map(work => <IconLabel iconName="work" label={work.corporationName} />)
          .slice(0, 2)}
      </ArrowCard>
      <ArrowCard title="기술스택/직무" style={{marginBottom: theme.spacing.xl}}>
        <View style={{alignItems: 'flex-start'}}>
          <ToggleButton title={profile.position} />
          {profile.skills.map((skill, idx) => (
            <>
              <Text>{skill.isExperienced ? '사용' : '희망'} 기술스택</Text>
              <CustomSlider
                text={skill.skillName}
                value={parseInt(skill.level)}
                onChangeValue={function (value: number | number[]): void {}}
                minimumTrackTintColor={sliderColors[idx % 3]}
              />
            </>
          ))}
        </View>
      </ArrowCard>
    </ScrollView>
  )
}

export default EditMain
