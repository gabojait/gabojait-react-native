import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import { PartIcon } from '@/presentation/components/GroupListCard'
import PositionIcon from '@/presentation/components/PositionIcon'
import { GroupStackParamList } from '@/presentation/navigation/types'
import { StackScreenProps } from '@react-navigation/stack'
import { makeStyles, Text, useTheme } from '@rneui/themed'
import React from 'react'
import { ScrollView, View } from 'react-native'

export type GroupStackParamListProps = StackScreenProps<GroupStackParamList, 'PositionSelector'>

const PositionSelector = () => {
  const {theme} = useTheme() 
  const styles = useStyles()
  
  return (
    <ScrollView style={styles.scrollView}>
      <CardWrapper style={[styles.card]}>
        <View style={styles.container}>
          <View style={{alignItems:'center'}}>
            <PositionIcon currentApplicant={2} vancancyNumber={3} textView={<Text style={styles.posiionText}>2/3</Text>}/>
            <Text style={styles.text}>Ui, Ux 디자이너</Text> 
          </View>
          <FilledButton title="함께하기" size="sm"/>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card]}>
        <View style={[styles.container, {paddingStart:30}]}>
          <View style={{alignItems:'center'}}>
            <PositionIcon currentApplicant={1} vancancyNumber={1} textView={<Text style={styles.posiionText}>1/1</Text>}/>
            <Text style={styles.text}>기획자</Text> 
          </View>
          <FilledButton title="모집완료" disabled={true} size="sm"/>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card]}>
        <View style={[styles.container, {paddingStart:30}]}>
          <View style={{alignItems:'center'}}>
            <PositionIcon currentApplicant={2} vancancyNumber={2} textView={<Text style={styles.posiionText}>2/2</Text>}/>
            <Text style={styles.text}>백엔드</Text>  
          </View>
          <FilledButton title="모집완료" disabled={true} size="sm"/>
        </View>
      </CardWrapper>
    </ScrollView>
  )
}

const useStyles = makeStyles((theme)=> ({
  scrollView:{
    backgroundColor: theme.colors.white,
    paddingHorizontal:20,
    paddingVertical:18
  },
  card:{
    padding:30,
    marginBottom:10,
  },
  container:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    width:'100%', 
    minHeight:100, 
  },
  text:{
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    paddingTop: 10,
  },
  posiionText:{
    fontSize: 20,
    fontWeight: theme.fontWeight.bold
  }
}))

export default PositionSelector