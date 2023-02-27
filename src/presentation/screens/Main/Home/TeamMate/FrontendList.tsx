import CardWrapper from '@/presentation/components/CardWrapper'
import GroupListCard from '@/presentation/components/GroupListCard'
import Gabojait from '@/presentation/components/icon/Gabojait'
import { RatingBar } from '@/presentation/components/RatingBar'
import { theme } from '@/theme'
import { makeStyles, useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FrontendList = () => {
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
                <CardWrapper style={{marginVertical:5, marginHorizontal: 20, borderWidth:1, borderColor:theme.colors.disabled}}>
                    <View style={{flexDirection:'row', width:'100%', paddingVertical: 32, paddingHorizontal:10, justifyContent: 'space-between', alignContent:'center'}}>
                        <View>
                            <Text style={styles.name}>이용인</Text>
                            <Text style={styles.position}>프론트엔드</Text>
                            <View style={{flexDirection:'row', paddingBottom: 10}}>
                                <RatingBar ratingScore={3.5}/>
                                <Text style={styles.score}>3.5</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center'}}>
                            <Gabojait name='arrow-next' size={28} color={theme.colors.disabled}/>
                        </TouchableOpacity>
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

export default FrontendList