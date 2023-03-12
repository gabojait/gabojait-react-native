import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import { PartIcon } from '@/presentation/components/TeamBanner'
import { RatingInput } from '@/presentation/components/RatingInput'
import { useTheme } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, Text, View, ViewProps } from 'react-native'
import CustomInput from '@/presentation/components/CustomInput'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getReviewQuestions } from '@/redux/reducers/reviewQuestionsGetReducer'
import ReviewQuestions, { reviewType } from '@/model/Review/ReviewQuestions'
import { isDataAvailable, isInitializable } from '@/util'

const TeamReview = () => {
    const questionTest =  [{context: "질문 3번입니다.", createdDate: [2023, 3, 11, 13, 2, 34, 341000000], modifiedDate: [2023, 3, 11, 13, 2, 34, 341000000], questionId: "640c7beaab1972426a6ce98f", reviewType: "RATING", schemaVersion: "1.0"}, 
    {context: "질문 2번입니다.", createdDate: [2023, 3, 11, 13, 2, 34, 237000000], modifiedDate: [2023, 3, 11, 13, 2, 34, 237000000], questionId: "640c7beaab1972426a6ce98c", reviewType: "RATING", schemaVersion: "1.0"}, 
    {context: "질문 1번입니다.", createdDate: [2023, 3, 11, 13, 2, 34, 116000000], modifiedDate: [2023, 3, 11, 13, 2, 34, 116000000], questionId: "640c7beaab1972426a6ce989", reviewType: "RATING", schemaVersion: "1.0"}]
    const array = ['',',','']
    const {theme} = useTheme()
    const dispatch = useAppDispatch()
    const {data:reviewQuestions, loading:reviewQuestionsLoading, error:reviewQuestionsError} = useAppSelector(state => state.reviewQuestionsGetReducer.reviewQuestionsResult)

    useEffect(() => {
        dispatch( getReviewQuestions() )
        console.log(`data: ${reviewQuestions}`)
    }, [])
    
    return(
        <KeyboardAvoidingView style={{backgroundColor:'white', flex:1}}>
            <ScrollView style={{flex:1}}>
                <Text style={{flex:1, fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold, color:'black', paddingLeft:20, paddingVertical:10 }}>1팀</Text>
                <View>
                    <FlatList 
                        nestedScrollEnabled = {true}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data= {array}
                        renderItem={({item,index}) => 
                        <ReviewItem questionArray={
                            isInitializable(reviewQuestionsLoading,reviewQuestions)
                            ?reviewQuestions
                            :[]
                        }/>
                        }
                    />
                </View>
                <FilledButton title={'완료'} buttonStyle={{backgroundColor: theme.colors.disabled}} containerStyle={{marginHorizontal:70}}/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const ReviewItem: React.FC<ViewProps & {questionArray:ReviewQuestions[] | null}> = ({
    questionArray
}) => {
    const {theme} = useTheme()
    const [lastWord, setLastWord] = useState('')
    const [disabled, setDisabled] = useState<Boolean>(false)

    return(
        <CardWrapper style={{marginLeft:20, minWidth:300, marginBottom:10, marginTop:2}}>
            <View style={{width:'100%'}}>
                <View style={{flexDirection:'row',paddingVertical:20, paddingHorizontal: 20}}>
                    <PartIcon partInitial={'D'} isRecruitDone={true}/>
                    <View style={{paddingHorizontal: 10, justifyContent:'center'}}>
                        <Text style={{fontSize:theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color:'black'}}>이용인</Text>
                        <Text style={{fontSize:theme.fontSize.md, fontWeight:theme.fontWeight.light, color:theme.colors.grey1}}>Designer</Text>
                    </View>
                </View>
                {questionArray.map( (item) => 
                    item.reviewType == reviewType.RATING
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
    )
}

export default TeamReview

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}
