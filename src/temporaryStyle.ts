/** 
 * 컴포넌트 우선작업 후 app.js에 작업본을 보여줄 때의 MenuCard 스타일입니다.
 * 컴포넌트 배치를 감안하여 레이아웃을 임시 지정한 코드입니다.
*/
import {StyleSheet} from 'react-native'
import colors from '@/presentation/res/styles/color'

const temporaryStyles = StyleSheet.create({
  firstRow:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  profiles:{
    backgroundColor:colors.lightGrey
  },
  container:{
    backgroundColor:colors.transparent,
    alignItems:'center',
  }
})
export default temporaryStyles
