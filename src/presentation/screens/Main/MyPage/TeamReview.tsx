import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import { CustomInput } from '@/presentation/components/CustomInput'
import GroupListCard, { Part, PartIcon } from '@/presentation/components/GroupListCard'
import { RatingInput } from '@/presentation/components/RatingInput'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { useTheme } from '@rneui/themed'
import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

const TeamReview = () => {
    const {theme} = useTheme()
    
    const data = [
        {
          name:"이용인",
          score: 4.5,
          review: "후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다."
        },
        {
          name:"안검성",
          score: 4.5,
          review: "후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다."
        },
        {
          name:"박소현",
          score: 4.5,
          review: "후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다."
        },
        {
          name:"최경민",
          score: 4.5,
          review: "후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다."
        },
        {
          name:"이용인",
          score: 4.5,
          review: "후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다."
        },
    ]

    return(
        <KeyboardAvoidingView behavior='padding' style={{backgroundColor:'white', flex:1}}>
            <ScrollView style={{flex:1}}>
                <Text style={{flex:1, fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold, color:'black', paddingLeft:20, paddingVertical:10 }}>1팀</Text>
                <View>
                    <FlatList 
                        nestedScrollEnabled = {true}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data= {data}
                        renderItem={({item,index}) => <ReviewItem/>}
                    />
                </View>
                <FilledButton title={'완료'} buttonStyle={{backgroundColor: theme.colors.disabled}} containerStyle={{marginHorizontal:70}}/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const ReviewItem = () => {
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
                <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                    <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>시간 약속을 잘 지켰나요?</Text>
                    <RatingInput updateRatingScore={(score) => {console.log(score)}} size={theme.ratingBarSize.xl}/>
                </View>
                <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                    <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>다른 팀원들과 협조적이었나요?</Text>
                    <RatingInput updateRatingScore={(score) => {console.log(score)}} size={theme.ratingBarSize.xl}/>
                </View>
                <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                    <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>맡은 일을 충실히 이행했나요?</Text>
                    <RatingInput updateRatingScore={(score) => {console.log(score)}} size={theme.ratingBarSize.xl}/>
                </View>
                <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                    <Text style={{textAlign:'center', fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:'black', paddingBottom:10}}>팀원에게 마지막으로 남기고 싶은 말</Text>
                    <CustomInput value={lastWord} onChangeText={(text: string) => setLastWord(text)} containerStyle={{marginHorizontal:20}} size={'sm'} multiline={true} numberOfLines={4} style={{minHeight: 90}}/>
                </View>
            </View>
        </CardWrapper>
    )
}

export default TeamReview