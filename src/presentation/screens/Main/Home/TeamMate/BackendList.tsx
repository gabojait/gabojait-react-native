import CardWrapper from '@/presentation/components/CardWrapper'
import Gabojait from '@/presentation/components/icon/Gabojait'
import { RatingBar } from '@/presentation/components/RatingBar'
import { theme } from '@/theme'
import { makeStyles, Text, useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const BackendList = () => {
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
                <CardWrapper style={{marginVertical:5, marginHorizontal: 20}}>
                    <View style={{flexDirection:'row', width:'100%', paddingVertical: 32, paddingHorizontal:10, justifyContent: 'space-between', alignContent:'center'}}>
                        <View>
                            <Text style={styles.name}>안검성</Text>
                            <Text style={styles.position}>백엔드</Text>
                            <View style={{flexDirection:'row', paddingBottom: 10}}>
                                <RatingBar ratingScore={3.5}/>
                                <Text style={styles.score}>3.5</Text>
                            </View>
                        </View>
                        <Gabojait name='arrow-next' size={28} color={theme.colors.disabled} style={{textAlignVertical:'center'}}/>
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
export default BackendList