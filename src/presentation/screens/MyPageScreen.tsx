import React, {useState} from 'react'
import {View, Text, StyleSheet, FlatList, Touchable, TouchableOpacity} from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '@/presentation/res/styles/color'
import textStyles from '@/presentation/res/styles/textStyles'
import CardWrapper from '@/presentation/components/CardWrapper'
import DividerWrapper from '@/presentation/components/DividerWrapper'

const DATA = [
  {title: '리뷰01'},
  {title: '리뷰02'},
  {title: '리뷰03'},
  {title: '리뷰04'},
  {title: '리뷰05'},
]
const ItemRender = ({title}: any) => {
  return (
    <CardWrapper style={styles.item}>
      <Text>{title}</Text>
    </CardWrapper>
  )
}
const MyPageScreen = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View>
          <Text style={[textStyles.size1, textStyles.weight1, styles.textcolor]}>홍길동</Text>
          <Text style={[textStyles.size4, textStyles.weight3, styles.textcolor]}>
            UI,UX 디자이너
          </Text>
        </View>
        <View style={styles.setting}>
          <Octicons name="gear" size={30} color={colors.black} />
        </View>
      </View>

      <View style={styles.body1}>
        <CardWrapper style={styles.icon}>
          <Ionicons name="heart-outline" size={60} color={colors.black} />
          <Text style={[textStyles.size4, textStyles.weight2, styles.textcolor]}>찜</Text>
        </CardWrapper>
        <CardWrapper style={styles.icon}>
          <Ionicons name="person-circle-outline" size={60} color={colors.black} />
          <Text style={[textStyles.size4, textStyles.weight2, styles.textcolor]}>프로필</Text>
        </CardWrapper>
      </View>

      <DividerWrapper>
        <Text style={[textStyles.size4, textStyles.weight3, styles.textcolor]}>
          내가 쓴 글 보기
        </Text>
        <Text style={[textStyles.size4, textStyles.weight3, styles.textcolor]}>
          내가 쓴 글 보기
        </Text>
        <Text style={[textStyles.size4, textStyles.weight3, styles.textcolor]}>
          내가 쓴 글 보기
        </Text>
      </DividerWrapper>

      <View style={styles.body3}>
        <Text style={[textStyles.size2, textStyles.weight1, styles.textcolor]}>나의 리뷰</Text>
        <Text style={[textStyles.size2, textStyles.weight1, styles.textcolor]}>* * * * * 5</Text>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({item}) => <ItemRender title={item.title} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
export default MyPageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 81,
    marginTop: 28,
    marginHorizontal: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    height: '16%',
  },
  body3: {
    marginVertical: 10,
    padding: 10,
  },
  flatlist: {
    width: '100%',
    height: 100,
    backgroundColor: colors.disable,
  },
  setting: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 50,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textcolor: {
    color: colors.black,
  },
  icon: {
    width: '47.5%',
    height: '100%',
  },
  item: {
    width: 256,
    height: '71%',
  },
})
