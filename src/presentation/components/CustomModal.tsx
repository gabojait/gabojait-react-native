import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import globalStyles from '@/styles'
import { FilledButton } from "./Button";
import React from "react";
import { useTheme } from "@rneui/themed";
import { theme } from "@/theme";
import { PropTypes } from "mobx-react";

interface CustomModalProps {
    title: string,
    children?: any,
    upperButtonText: string,
    lowerButtonText:string,
    modalVisible: boolean,
    onModalVisibityChanged: (visibility: boolean) => void,
    neverSeeAgainButton?: boolean,
    validCallback?: () => void
    closeModalUntilExpires?: () => void
}

const CustomModal:React.FC<CustomModalProps> = ({neverSeeAgainButton: neverSeeAgain=false, ...props}) => {

    const {theme} = useTheme()
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            props.onModalVisibityChanged(!props.modalVisible)
            }}
            style={{justifyContent:'center'}}
        >
            <View style={{flex:1, justifyContent:'flex-end', backgroundColor: globalStyles.modalDim.backgroundColor}}>
                <View style={style.modal}>
                    <Text style={{fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold, color:theme.colors.black}}>
                        {props.title}
                    </Text>
                    <View style={style.children}>
                        {React.Children.map(props.children, (child) =>
                            <View>{child}</View>
                        )}
                    </View>
                    <View style={{ width:'100%', paddingHorizontal: 20}}>
                        <FilledButton
                            title={props.upperButtonText}
                            buttonStyle={{backgroundColor:theme.colors.primary, width:'100%'}} 
                            titleStyle={{color: theme.colors.black}}
                            onPress={() => {
                                props.onModalVisibityChanged(false)
                                props.validCallback
                            }}
                        />
                        <FilledButton
                            title={props.lowerButtonText}
                            buttonStyle={{backgroundColor:theme.colors.grey0, width:'100%'}} 
                            titleStyle={{color: theme.colors.black}}
                            onPress={() => {
                                props.onModalVisibityChanged(false)
                            }}
                        />
                    </View>
                    {neverSeeAgain
                        ?<TouchableOpacity onPress={props.closeModalUntilExpires}>
                            <Text style={{color: theme.colors.black, paddingTop: 10}}>다시보지 않기</Text>
                        </TouchableOpacity>
                        :<></>
                    }
                </View>
            </View>
        </Modal>
    )
}

const NeverSeeAgain = () => {

    const {theme} = useTheme()

    return (
        <TouchableOpacity>
            <Text style={{color: theme.colors.black, paddingTop: 10}}>다시보지 않기</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    modal: {
        width:'100%',
        backgroundColor: 'white',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingVertical: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    children: {
        paddingTop: 30,
        paddingBottom: 20,
        alignItems:'center'
    }
  })
  
export default CustomModal
