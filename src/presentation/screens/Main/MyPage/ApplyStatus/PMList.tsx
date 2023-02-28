import { OutlinedButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import Gabojait from '@/presentation/components/icon/Gabojait'
import { RatingBar } from '@/presentation/components/RatingBar'
import { makeStyles, useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const PMList = () => {
    const arr = ['1','2','3']
    const {theme} = useTheme() 
    const styles = useStyles()
    
    return (
        <View style={{flex: 1, flexGrow:1, backgroundColor: 'white', justifyContent:'flex-end', paddingVertical: 15}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                data={arr}
                renderItem={({item}) => 
                <CardWrapper style={{marginVertical:10, marginHorizontal: 20, borderWidth:1, borderColor:theme.colors.disabled, borderRadius: theme.radius.xxl}}>
                    <View style={{flexDirection:'row', width:'100%', paddingVertical:20, paddingHorizontal:15, justifyContent: 'space-between', alignContent:'center'}}>
                        <View style={{justifyContent:'center'}}>
                            <Text style={styles.name}>이용인</Text>
                            <Text style={styles.position}>프론트엔드</Text>
                            <View style={{flexDirection:'row', paddingBottom: 10}}>
                                <RatingBar ratingScore={3.5} size={theme.ratingBarSize.md}/>
                                <Text style={styles.score}>3.5</Text>
                            </View>
                        </View>
                        <View>
                            <OutlinedButton size='sm' title={'함께하기'} style={{borderRadius:5}}/>
                            <OutlinedButton size='sm' title={'거절하기'} style={{borderRadius:5, borderColor:theme.colors.disabled}} titleStyle={{color:theme.colors.disabled}}/>
                        </View>
                    </View>
                </CardWrapper>
                }
            />
        </View>
    )
}

const useStyles = makeStyles((theme)=> ({
    name: {
        fontSize:18,
        fontWeight: theme.fontWeight?.semibold,
        color: 'black'
    },
    position: {
        fontSize:12,
        fontWeight: theme.fontWeight?.light,
        color: 'black',
        paddingBottom:10
    },
    score: {
        fontSize:20,
        fontWeight: theme.fontWeight?.bold,
        color: 'black',
        paddingLeft: 10,
    }
}))

export default PMList