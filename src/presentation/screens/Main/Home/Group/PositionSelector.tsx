import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import { PartIcon } from '@/presentation/components/GroupListCard'
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
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
          <View style={{alignItems:'center'}}>
            <PartIcon partInitial={'2/3'} size={23}/>
            <Text style={styles.text}>Ui, Ux 디자이너</Text> 
          </View>
          <FilledButton title="함께하기" size="sm"/>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card]}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
          <View style={{alignItems:'center'}}>
            <PartIcon partInitial={'2/3'} size={23}/>
            <Text style={styles.text}>Ui, Ux 디자이너</Text> 
          </View>
          <FilledButton title="모집완료" disabled={true} size="sm"/>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card]}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
          <View style={{alignItems:'center'}}>
            <PartIcon partInitial={'2/3'} size={23}/>
            <Text style={styles.text}>Ui, Ux 디자이너</Text> 
          </View>
          <FilledButton title="함께하기" size="sm"/>
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
  text:{
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    paddingTop: 10
  }
}))

export default PositionSelector