import {ScrollView, View} from 'react-native'
import React, {useEffect, useState} from 'react'
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
import CardWrapper from '@/presentation/components/CardWrapper'
import globalStyles from '@/styles'
import useGlobalStyles from '@/styles'
import CustomHeader from '@/presentation/components/CustomHeader'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {Level} from '@/model/Profile/Skill'

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

// Todo: 완료 버튼 구현
// Todo: Override React Navigation header
const EditMain = ({navigation}: ProfileStackParamListProps<'EditMain'>) => {
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useAppSelector(state => state.profileReducer.userProfile)
  const {theme} = useTheme()
  const globalStyles = useGlobalStyles()
  const [desc, setDesc] = useState(profile?.description ?? '')
  const dispatch = useAppDispatch()

  if (profile && !profileLoading && !profileError)
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
            value={desc}
            onChangeText={value => setDesc(value)}
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
                key={portfolio.portfolioId}
                title={portfolio.name}
                icon={<Icon name={portfolioTypeIconName['pdf']} />}
                style={{
                  backgroundColor: 'FFF',
                }}
              />
            ))}
          </View>
        </ArrowCard>
        <ArrowCard
          title="학력/경력"
          style={{marginBottom: theme.spacing.xl}}
          onArrowPress={() => {
            navigation.navigate('EditSchoolAndWork')
          }}>
          {profile.educations?.length ?? 0 > 0 ? (
            <>
              <IconLabel
                iconName="school"
                label={profile.educations[profile.educations.length - 1].institutionName}
              />
              {profile.works
                .map(work => (
                  <IconLabel key={work.workId} iconName="work" label={work.corporationName} />
                ))
                .slice(0, 2)}
            </>
          ) : null}
        </ArrowCard>
        <ArrowCard
          title="기술스택/직무"
          style={{marginBottom: theme.spacing.xl}}
          onArrowPress={() => {
            navigation.navigate('EditSkillAndPosition')
          }}>
          <View style={{alignItems: 'flex-start'}}>
            {profile.position && <ToggleButton title={profile.position} />}
            {profile.skills.map((skill, idx) => (
              <>
                <Text>{skill.isExperienced ? '사용' : '희망'} 기술스택</Text>
                <CustomSlider
                  key={skill.skillId}
                  text={skill.skillName}
                  value={Level[skill.level]}
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
