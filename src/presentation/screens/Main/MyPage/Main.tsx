import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Icon, makeStyles, Text, useTheme} from '@rneui/themed'
import globalStyles from '@/styles'
import {MainBottomTabNavigationProps} from '@/presentation/navigation/types'
import CardWrapper from '@/presentation/components/CardWrapper'
import Gabojait from '@/presentation/components/icon/Gabojait'
import DivideWrapper from '@/presentation/components/DivideWrapper'
import { RatingBar } from '@/presentation/components/RatingBar'

const Main = ({navigation}: MainBottomTabNavigationProps<'MyPage'>) => {
  const {theme} = useTheme()
  const styles = useStyles()
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
  return (
    <ScrollView style={styles.scrollView}>
      <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
        <View>
          <TouchableOpacity>
            <Text style={{fontSize: 30, fontWeight: theme.fontWeight.bold, color: theme.colors.primary}}>홍길동</Text>
            <Text>UI, UX 디자이너</Text>
          </TouchableOpacity>
        </View>
        <CardWrapper style={[{borderRadius: 22, justifyContent:'center', maxHeight:45, paddingHorizontal:22}]}>
          <TouchableOpacity>
            <Gabojait name='setting' size={34} color='black'/>
          </TouchableOpacity>
        </CardWrapper>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal:20, marginTop:20}}>
        <CardWrapper style={[{flex:1, minHeight: 93, justifyContent: 'center', marginRight:5}]}>
          <TouchableOpacity>
            <Icon type='ionicon' size={43} name='heart-circle-outline'/>
            <Text style={{textAlign:'center'}}>찜</Text>
          </TouchableOpacity>
        </CardWrapper>
        <CardWrapper style={[{flex:1, minHeight: 93, justifyContent: 'center', marginLeft:5}]}>
          <TouchableOpacity>
            <Gabojait style={{padding:5}} name='person' size={34} color='black'/>
            <Text style={{textAlign:'center'}}>프로필</Text>
          </TouchableOpacity>
        </CardWrapper>
      </View>
      <View style={styles.divider}>
        <LeaderComponent/>
      </View>
      <Text style={{fontSize:20, fontWeight:theme.fontWeight.bold, marginLeft:24, paddingBottom:3, marginTop:20 }}>나의 리뷰</Text>
      <View style={{marginLeft:20, flexDirection:'row'}}>
        <RatingBar ratingScore={3.5} size={theme.ratingBarSize.md}/>
        <Text style={{fontSize:20, fontWeight:theme.fontWeight.bold, paddingLeft:9}}>4</Text>
      </View>
      <View style={{paddingBottom: 70}}>
        <FlatList 
          horizontal={true}
          data= {data}
          renderItem={({item}) => 
            <ReviewItem name={item.name} score={item.score} content={item.review}/>
          }/>
      </View>
    </ScrollView>
  )
}

interface ReviewItemProps{
  name:string,
  score:number,
  content:string
}
const ReviewItem = ({name, score, content}: ReviewItemProps) => {
  const {theme} = useTheme()
  return (
    <CardWrapper style={{minHeight: 180, maxWidth:256, marginHorizontal:10, padding:20, marginVertical:10, borderWidth:1, borderColor:theme.colors.disabled}}>
      <View>
        <View style={{flexDirection:'row', paddingBottom:10}}>
          <Text style={{fontSize:theme.fontSize.sm, fontWeight:theme.fontWeight.bold, paddingRight: 5}}>{name}</Text>
          <RatingBar ratingScore={score} size={theme.ratingBarSize.xs}/>
        </View>
        <Text numberOfLines={5} ellipsizeMode='tail' style={{color:theme.colors.grey1, fontSize: theme.fontSize.xs, fontWeight:theme.fontWeight.light, lineHeight:25}}>
          {content}
        </Text>
      </View>
    </CardWrapper>
  )
}

const MemberComponent = () => {
  const styles = useStyles()

  return(
    <DivideWrapper style={{flex:1, minHeight: 93, justifyContent: 'center'}}>
      <View>
        <TouchableOpacity>
          <Icon type='ionicon' size={43} name='grid-outline'/>
          <Text style={{textAlign:'center'}}>받은 제안</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Icon type='ionicon' size={43} name='document-text-outline'/>
          <Text style={{textAlign:'center'}}>지원한 팀</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Gabojait style={{padding:5}} name='people' size={34} color='black'/>
          <Text style={{textAlign:'center'}}>팀 히스토리</Text>
        </TouchableOpacity>
      </View>
    </DivideWrapper>
  )
}

const LeaderComponent = () => {
  const styles = useStyles()

  return(
    <DivideWrapper style={{flex:1, minHeight: 93, justifyContent: 'center'}}>
      <View>
        <Icon type='ionicon' size={43} name='grid-outline'/>
        <Text style={{textAlign:'center'}}>지원 소식</Text>
      </View>
      <View>
        <Icon type='ionicon' size={43} name='document-text-outline'/>
        <Text style={{textAlign:'center'}}>팀 정보</Text>
      </View>
      <View>
        <Gabojait style={{padding:5}} name='people' size={34} color='black'/>
        <Text style={{textAlign:'center'}}>팀 히스토리</Text>
      </View>
    </DivideWrapper>
  )
}

const useStyles = makeStyles((theme)=> ({
  scrollView:{
    paddingVertical:20,
    backgroundColor:theme.colors.white
  },
  divider:{
    marginHorizontal:20,
    marginVertical: 20
  },
}))

export default Main
