import {FilledButton} from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import {PartIcon} from '@/presentation/components/TeamBanner'
import {RatingInput} from '@/presentation/components/RatingInput'
import {useTheme} from '@rneui/themed'
import React, {useEffect, useRef, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import CustomInput from '@/presentation/components/CustomInput'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {getReviewQuestions} from '@/redux/reducers/reviewQuestionsGetReducer'
import {ReviewType} from '@/data/model/Review/ReviewQuestion'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {getTeamToReview} from '@/redux/reducers/teamToReviewGetReducer'
import PagerView from 'react-native-pager-view'
import ReviewAnswer from '@/data/model/Review/ReviewAnswer'
import {ModalContext} from '@/presentation/components/modal/context'
import SymbolCenteredModalContent from '@/presentation/components/modalContent/SymbolCenteredModalContent'
import {createReview} from '@/redux/reducers/reviewCreateReducer'
import {changeFirstLetterToCapital, getFirstAlphabet} from '@/presentation/util'

const TeamReview = ({navigation, route}: MainStackScreenProps<'TeamReview'>) => {
  const teamToReviewTest = {
    backends: [
      {
        nickname: '류승룡',
        position: 'backend',
        rating: 0,
        reviewCnt: 0,
        schemaVersion: 'string',
        userId: 'string1',
      },
    ],
    designers: [
      {
        nickname: '이하늬',
        position: 'designer',
        rating: 0,
        reviewCnt: 0,
        schemaVersion: 'string',
        userId: 'string2',
      },
    ],
    frontends: [
      {
        nickname: '진선규',
        position: 'frontend',
        rating: 0,
        reviewCnt: 0,
        schemaVersion: 'string',
        userId: 'string3',
      },
    ],
    projectManagers: [
      {
        nickname: '이동휘',
        position: 'projectManager',
        rating: 0,
        reviewCnt: 0,
        schemaVersion: 'string',
        userId: 'string4',
      },
    ],
    projectName: '치킨 배달 앱',
    teamId: 'string',
  }
  const teammateArrayTest = [
    ...teamToReviewTest.backends,
    ...teamToReviewTest.designers,
    ...teamToReviewTest.frontends,
    ...teamToReviewTest.projectManagers,
  ]

  const {theme} = useTheme()
  const modal = React.useContext(ModalContext)
  const dispatch = useAppDispatch()
  const pagerViewRef = useRef<PagerView>(null)
  const {
    data: reviewQuestions,
    loading: reviewQuestionsLoading,
    error: reviewQuestionsError,
  } = useAppSelector(state => state.reviewQuestionsGetReducer.reviewQuestionsResult)
  const {
    data: teamToReview,
    loading: teamToReviewLoading,
    error: teamToReviewError,
  } = useAppSelector(state => state.teamToReviewGetReducer.teamToReviewGetResult)
  const teammateArray = [
    ...[teamToReview?.backends],
    ...[teamToReview?.designers],
    ...[teamToReview?.frontends],
    ...[teamToReview?.projectManagers],
  ]
  const [reviewResultState, setReviewResultState] = useState<ReviewAnswer[]>([])
  const [reviewState, setReviewState] = useState<ReviewAnswer[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const updateTextReview = (questionId: string, userId: string, text: string) => {
    const newReview = {answer: text, questionId: questionId, rate: '', revieweeUserId: userId}
    const otherReviews = reviewState.filter(item => item.questionId != questionId)

    const result = [...otherReviews, newReview]
    console.log(`updateTextReview----------------`)
    result.map(item =>
      console.log(
        `answer: ${item.answer}, questionId: ${item.questionId}, rate: ${item.rate}, revieweeUserId: ${userId}`,
      ),
    )
    setReviewState([...otherReviews, newReview])
  }

  const updateRatingReview = (questionId: string, userId: string, score: string) => {
    const newReview = {answer: '', questionId: questionId, rate: score, revieweeUserId: userId}
    const otherReviews = reviewState.filter(item => item.questionId != questionId)

    const result = [...otherReviews, newReview]
    console.log(`updateRatingReview----------------`)
    result.map(item =>
      console.log(
        `answer: ${item.answer}, questionId: ${item.questionId}, rate: ${item.rate}, revieweeUserId: ${userId}`,
      ),
    )
    setReviewState([...otherReviews, newReview])
  }

  const moveToNextPage = (index: number) => {
    requestAnimationFrame(() => pagerViewRef.current?.setPage(index))
    setPageCount(pageCount + 1)
  }

  const isLastindex = (index: number) => {
    if (index == teammateArray.length - 1) return true
    else false
  }

  const beforeReviewModal = () => {
    modal?.show({
      title: '',
      content: (
        <SymbolCenteredModalContent
          title="잠깐!"
          text={'리뷰는 수정이 어려우니\n 신중하게 선택해주세요'}
          symbol={<Text style={{fontSize: theme.emojiSize.sm, textAlign: 'center'}}>🥺</Text>}
          yesButton={{title: '확인', onPress: () => modal.hide(), buttonStyle: {minWidth: 189}}}
        />
      ),
    })
  }

  useEffect(() => {
    let answeredCount = 0
    reviewState.map(item => {
      //공백 제거
      const answer = item.answer.replace(/ /gi, '')
      console.log(`answer: ${item.answer}, rate: ${item.rate}`)
      if (answer.length != 0 || item.rate != '') {
        answeredCount += 1
      }
    })
    console.log(`answeredCount: ${answeredCount}`)
    if (reviewState != null && answeredCount == reviewState.length) setButtonDisabled(false)
    else setButtonDisabled(true)
  })
  useEffect(() => {
    reviewQuestions?.map((item, index) =>
      setReviewState(prevState => [
        ...prevState,
        {answer: '', questionId: item.questionId, rate: '', revieweeUserId: ''},
      ]),
    )
    console.log(`reviewQuestions: ${reviewQuestions}`)
    console.log(`reviewState: ${reviewState}`)
  }, [reviewQuestions])

  useEffect(() => {
    console.log(`초기렌더링 시작`)
    beforeReviewModal()
    dispatch(getTeamToReview(route.params.teamId))
    dispatch(getReviewQuestions())
    setReviewState([])
  }, [])

  return (
    <>
      <Text
        style={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.bold,
          color: 'black',
          paddingLeft: 20,
          paddingVertical: 10,
          backgroundColor: 'white',
        }}>
        치킨배달 앱
      </Text>
      <PagerView
        style={{flex: 1, backgroundColor: 'white'}}
        orientation="horizontal"
        initialPage={0}
        ref={pagerViewRef}
        collapsable={false}
        scrollEnabled={false}>
        {teammateArrayTest.map((teamMateItem, teamMateIndex) => (
          <View key={teamMateIndex}>
            <ScrollView style={{flex: 1}}>
              <CardWrapper style={{marginLeft: 20, minWidth: 300, marginBottom: 10, marginTop: 2}}>
                <View style={{width: '100%'}}>
                  <View style={{flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 20}}>
                    <PartIcon position={teamMateItem.position} isRecruitDone={true} />
                    <View style={{paddingHorizontal: 10, justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: theme.fontSize.lg,
                          fontWeight: theme.fontWeight.bold,
                          color: 'black',
                        }}>
                        {teamMateItem.nickname}
                      </Text>
                      <Text
                        style={{
                          fontSize: theme.fontSize.md,
                          fontWeight: theme.fontWeight.light,
                          color: theme.colors.grey1,
                        }}>
                        {changeFirstLetterToCapital(teamMateItem.position)}
                      </Text>
                    </View>
                  </View>
                  {reviewQuestions != null &&
                    reviewQuestions.map((item, index) =>
                      reviewQuestions[index].reviewType == ReviewType.RATING ? (
                        <View
                          style={{
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderTopColor: theme.colors.disabled,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: theme.fontSize.md,
                              fontWeight: theme.fontWeight.bold,
                              color: 'black',
                              paddingBottom: 10,
                            }}>
                            {item.context}
                          </Text>
                          <RatingInput
                            updateRatingScore={score =>
                              updateRatingReview(
                                item.questionId,
                                teamMateItem.userId,
                                score.toString(),
                              )
                            }
                            size={theme.ratingBarSize.xl}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderTopColor: theme.colors.disabled,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: theme.fontSize.md,
                              fontWeight: theme.fontWeight.bold,
                              color: 'black',
                              paddingBottom: 10,
                            }}>
                            {item.context}
                          </Text>
                          <CustomInput
                            onChangeText={(text: string) =>
                              updateTextReview(item.questionId, teamMateItem.userId, text)
                            }
                            shape="round"
                            containerStyle={{paddingHorizontal: 20}}
                            size={'sm'}
                            multiline={true}
                            numberOfLines={4}
                            style={{minHeight: 90}}
                            maxLength={200}
                          />
                        </View>
                      ),
                    )}
                </View>
              </CardWrapper>
            </ScrollView>
            {isLastindex(teamMateIndex) ? (
              <FilledButton
                title={'완료'}
                buttonStyle={{backgroundColor: theme.colors.primary}}
                containerStyle={{marginHorizontal: 70}}
                disabled={buttonDisabled}
                onPress={() => {
                  setReviewResultState(prevState => [...prevState, ...reviewState])
                  setReviewState([])
                  console.log(`완료 버튼 클릭----------------`)
                  reviewResultState.map(item => {
                    console.log(
                      `item.answer:${item.answer}, item.questionId:${item.questionId}, item.rate:${item.rate}, item.revieweeUserId:${item.revieweeUserId}`,
                    )
                  })
                  dispatch(createReview({reviews: reviewResultState}, route.params.teamId))
                  navigation.goBack()
                }}
              />
            ) : (
              <FilledButton
                title={'다음'}
                buttonStyle={{backgroundColor: theme.colors.primary}}
                containerStyle={{marginHorizontal: 70}}
                disabled={buttonDisabled}
                onPress={() => {
                  setReviewResultState(prevState => [...prevState, ...reviewState])
                  //초기화
                  reviewQuestions?.map((item, index) =>
                    setReviewState(prevState => [
                      ...prevState,
                      {answer: '', questionId: item.questionId, rate: '', revieweeUserId: ''},
                    ]),
                  )
                  moveToNextPage(pageCount)
                  setButtonDisabled(true) //초기화
                }}
              />
            )}
          </View>
        ))}
      </PagerView>
    </>
  )
}

export default TeamReview
