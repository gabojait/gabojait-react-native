import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import PositionIcon from '@/presentation/components/PositionIcon'
import {makeStyles, Text, useTheme} from '@rneui/themed'
import React, {ReactNode} from 'react'
import {ScrollView, View} from 'react-native'

const Center: React.FC<{children: ReactNode}> = ({children}) => (
  <View
    style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }}>
    {children}
  </View>
)
const NoProcessingTeam = () => (
  <Center>
    <Text h1 h1Style={{fontSize: 100, marginBottom: 20}}>
      🫥
    </Text>
    <Text h4>현재 진행 중인 팀이 없어요</Text>
  </Center>
)

const Detail = () => {
  // network
  const {theme} = useTheme() 
  const styles = useStyles()
  return (
    
    <ScrollView style={styles.scrollView}>
      <CardWrapper style={[styles.teamcard,{minHeight: 190, justifyContent: 'center'}]}>
        <View style={{width:'100%', paddingHorizontal:10, flex:1, justifyContent:'space-evenly'}}>
          <Text style={styles.teamname}>3팀</Text>
          <View style={styles.partIcon}>
              <PositionIcon currentApplicant={1} vancancyNumber={1} textView ={ <Text style={{fontWeight:theme.fontWeight.bold, fontSize:30}}>D</Text>}/>
              <PositionIcon currentApplicant={2} vancancyNumber={2} textView ={ <Text style={{fontWeight:theme.fontWeight.bold, fontSize:30}}>F</Text>}/>
              <PositionIcon currentApplicant={1} vancancyNumber={1} textView ={ <Text style={{fontWeight:theme.fontWeight.bold, fontSize:30}}>B</Text>}/>
          </View>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card,{minHeight: 50}]}>
        <View>
        <Text style={styles.text}>
          카카오톡 오픈채팅 링크
         </Text>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card,{minHeight: 200}]}>
        <View>
        <Text style={styles.title}>프로젝트 설명</Text>
        <Text style={styles.text}>애플의 신작 스마트워치인 애플워치6와 애플워치SE가 29일 국내에 출시된다.
            애플은 22일 애플 공식 매장과 공인 리셀러, 통신사를 통해 국내에 애플워치6와 애플워치SE를 오는 29일 정식 출시한다고 밝혔다.
        </Text>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card,{minHeight: 200}]}>
        <View>
        <Text style={styles.title}>바라는 점</Text>
        <Text style={styles.text}>
            사전주문은 23일 오후 3시부터 시작된다. 애플 홈페이지와 애플스토어 앱 등에서 주문 가능하다. 
            가격은 애플워치6는 53만9000원부터, 애플워치SE는 35만9000원부터 시작된다.
            이번에 발표된 애플워치6는 기존 심전도체크 기능에 이어 혈중 산소포화도 기능을 탑재했다. 
         </Text>
        </View>
      </CardWrapper>
    </ScrollView>
  )
}

const useStyles = makeStyles((theme)=> ({
  scrollView:{
    backgroundColor: theme.colors.white,
    paddingVertical:18,
    flex:1,
  },
  teamcard:{
    paddingHorizontal:13,
    paddingBottom:17,
    marginVertical:5,
    marginHorizontal:20,
    borderRadius:20
  },
  card:{
    paddingHorizontal:13,
    paddingVertical:17,
    marginVertical:5,
    marginHorizontal:20,
    borderRadius:20
  },
  teamname:{
    fontSize:theme.fontSize.lg,
    fontWeight:theme.fontWeight.bold,
    paddingLeft:5
  },
  title: {
    fontSize:20,
    fontWeight:theme.fontWeight.semibold,
    paddingBottom: 5,
    color:theme.colors.black
  },
  text: {
    fontSize:11,
    fontWeight:theme.fontWeight.light,
    color:theme.colors.black,
    lineHeight:22
  },
  partIcon:{
    flexDirection: 'row',
  }
}))

export default Detail
