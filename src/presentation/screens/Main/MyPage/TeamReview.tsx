import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import { PartIcon } from '@/presentation/components/TeamBanner'
import { RatingInput } from '@/presentation/components/RatingInput'
import { useTheme } from '@rneui/themed'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View, ViewProps } from 'react-native'
import CustomInput from '@/presentation/components/CustomInput'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getReviewQuestions } from '@/redux/reducers/reviewQuestionsGetReducer'
import ReviewQuestions, { ReviewType } from '@/model/Review/ReviewQuestion'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { getTeamToReview } from '@/redux/reducers/teamToReviewGetReducer'
import UserProfileBriefDto from '@/model/User/UserProfileBriefDto'
import PagerView from 'react-native-pager-view'
import ReviewAnswer from '@/model/Review/ReviewAnswer'

const TeamReview = ({navigation, route}:MainStackScreenProps<'TeamReview'>) => {
    const teamToReviewTest = {backends: [{nickname: "류승룡",position: "backend",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string1"}],
      designers: [{nickname: "이하늬",position: "designer",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string2"}],
      frontends: [{nickname: "진선규",position: "frontend",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string3"}],
      projectManagers: [{nickname: "이동휘",position: "projectManager",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string4"}],
      "projectName": "string",
      "teamId": "string"}
    const teammateArrayTest = [...teamToReviewTest.backends, ...teamToReviewTest.designers, ...teamToReviewTest.frontends, ...teamToReviewTest.projectManagers]

    const {theme} = useTheme()
    const dispatch = useAppDispatch()
    const pagerViewRef = useRef(null)
    const {data:reviewQuestions, loading:reviewQuestionsLoading, error:reviewQuestionsError} = useAppSelector(state => state.reviewQuestionsGetReducer.reviewQuestionsResult)
    const {data:teamToReview, loading:teamToReviewLoading, error:teamToReviewError} = useAppSelector(state => state.teamToReviewGetReducer.teamToReviewGetResult)
    const teammateArray = [...[teamToReview?.backends], ...[teamToReview?.designers], ...[teamToReview?.frontends], ...[teamToReview?.projectManagers]]
    const [reviewResultState, setReviewResultState] = useState<ReviewAnswer[]>([])
    const [reviewState, setReviewState] = useState<ReviewAnswer[]>([])
    const [pageCount, setPageCount] = useState<number>(0)

    const updateTextReview = (questionId:string, userId:string, text:string) => {
        const newReview = {answer:text, questionId: questionId, rate:"", revieweeUserId: userId}
        const otherReviews = reviewState.filter(item => item.questionId != questionId)

        const result = [...otherReviews,newReview]
        console.log(`updateTextReview----------------`)
        result.map((item) => 
            console.log(`answer: ${item.answer}, questionId: ${item.questionId}, rate: ${item.rate}, revieweeUserId: ${userId}`)
        )
        setReviewState([...otherReviews,newReview])
    }

    const updateRatingReview = (questionId:string, userId:string, score:string) => {
        const newReview = {answer:"", questionId: questionId, rate: score, revieweeUserId: userId}
        const otherReviews = reviewState.filter(item => item.questionId != questionId)

        const result = [...otherReviews,newReview]
        console.log(`updateRatingReview----------------`)
        result.map((item) => 
        console.log(`answer: ${item.answer}, questionId: ${item.questionId}, rate: ${item.rate}, revieweeUserId: ${userId}`)
        )
        setReviewState([...otherReviews,newReview])
    }

    const moveToNextPage = (index:number) => {
        requestAnimationFrame(() => pagerViewRef.current?.setPage(index))
        setPageCount(pageCount+1)
    }

    useEffect(() => {
        reviewQuestions?.map((item, index) => setReviewState(prevState => ([...prevState, {answer:"", questionId:item.questionId, rate:"", revieweeUserId:""}])))
        console.log(`reviewQuestions: ${reviewQuestions}`)
        console.log(`reviewState: ${reviewState}`)
    },[reviewQuestions])

    useEffect(() => {
        console.log(`초기렌더링 시작`)
        dispatch( getTeamToReview(route.params.teamId) )
        dispatch( getReviewQuestions() )
        setReviewState([])
        moveToNextPage(pageCount)
    }, [])
    
    return(
        <>
            <Text style={{fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold, color:'black', paddingLeft:20, paddingVertical:10, backgroundColor:"white"}}>치킨배달 앱</Text>
            <PagerView style={{flex:1, backgroundColor:'white'}} orientation='horizontal' initialPage={0} ref={pagerViewRef} collapsable={false} scrollEnabled={false}> 
                {teammateArrayTest.map((teamMateitem, teamMateIndex) => 
                <View key={teamMateIndex}>
                    <ScrollView style={{flex: 1}}>
                        <CardWrapper style={{marginLeft:20, minWidth:300, marginBottom:10, marginTop:2}}>
                            <View style={{width:'100%'}}>
                                <View style={{flexDirection:'row',paddingVertical:20, paddingHorizontal: 20}}>
                                    <PartIcon partInitial={'D'} isRecruitDone={true}/>
                                    <View style={{paddingHorizontal: 10, justifyContent:'center'}}>
                                        <Text style={{fontSize:theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color:'black'}}>{teamMateitem.nickname}</Text>
                                        <Text style={{fontSize:theme.fontSize.md, fontWeight:theme.fontWeight.light, color:theme.colors.grey1}}>{teamMateitem.position}</Text>
                                    </View>
                                </View>
                                {reviewQuestions != null && reviewQuestions.map( (item, index) => 
                                    reviewQuestions[index].reviewType == ReviewType.RATING
                                    ? <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                                    <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>{item.context}</Text>
                                    <RatingInput updateRatingScore={(score) => updateRatingReview(item.questionId, teamMateitem.userId, score.toString())} size={theme.ratingBarSize.xl}/>
                                    </View>
                                    :<View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                                    <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>{item.context}</Text>
                                    <CustomInput 
                                        onChangeText={(text:string) => updateTextReview(item.questionId, teamMateitem.userId, text)}
                                        shape='round'
                                        containerStyle={{paddingHorizontal:20}} 
                                        size={'sm'} multiline={true} 
                                        numberOfLines={4} 
                                        style={{minHeight: 90}} 
                                        maxLength={200}
                                    />
                                    </View>
                                )}
                            </View>
                        </CardWrapper>
                    </ScrollView>
                </View>
                )}
            </PagerView>
            <FilledButton title={'다음'} buttonStyle={{backgroundColor: theme.colors.primary}} containerStyle={{marginHorizontal:70}} onPress={() => moveToNextPage(pageCount)}/>
        </>
    )
}

const ReviewItem: React.FC<ViewProps & {questionArray:ReviewQuestions[], teammate:UserProfileBriefDto}> = ({
    questionArray, teammate
}) => {
    const {theme} = useTheme()
    const [lastWord, setLastWord] = useState('')
    const [disabled, setDisabled] = useState<Boolean>(false)
    return(
        <ScrollView style={{flex: 1}}>
            <CardWrapper style={{marginLeft:20, minWidth:300, marginBottom:10, marginTop:2}}>
                <View style={{width:'100%'}}>
                    <View style={{flexDirection:'row',paddingVertical:20, paddingHorizontal: 20}}>
                        <PartIcon partInitial={'D'} isRecruitDone={true}/>
                        <View style={{paddingHorizontal: 10, justifyContent:'center'}}>
                            <Text style={{fontSize:theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color:'black'}}>{teammate.nickname}</Text>
                            <Text style={{fontSize:theme.fontSize.md, fontWeight:theme.fontWeight.light, color:theme.colors.grey1}}>{teammate.position}</Text>
                        </View>
                    </View>
                    {questionArray.map( (item) => 
                        item.reviewType == ReviewType.RATING
                        ? <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                        <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>{item.context}</Text>
                        <RatingInput updateRatingScore={(score) => {console.log(score)}} size={theme.ratingBarSize.xl}/>
                        </View>
                        :<View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                        <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>{item.context}</Text>
                        <CustomInput shape='round' value={lastWord} onChangeText={(text: string) => setLastWord(text)} containerStyle={{paddingHorizontal:20}} size={'sm'} multiline={true} numberOfLines={4} style={{minHeight: 90}} maxLength={200}/>
                        </View>
                    )}
                </View>
            </CardWrapper>
        </ScrollView>
    )
}

export default TeamReview

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}
