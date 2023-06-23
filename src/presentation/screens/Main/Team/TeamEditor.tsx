import React, {useState} from 'react'
import {makeStyles, Text, useTheme} from '@rneui/themed'
import {FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, View} from 'react-native'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import TeamRequestDto from '@/model/Team/TeamRequestDto'
import useGlobalStyles from '@/styles'
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent'
import {ModalContext} from '@/presentation/components/modal/context'
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent'
import CardWrapper from '@/presentation/components/CardWrapper'
import {PositionMaker} from '@/presentation/components/PositionMaker'
import {FilledButton} from '@/presentation/components/Button'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import {MainStackParamList, MainStackScreenProps} from '@/presentation/navigation/types'
//TODO: api 수정반영, react query 적용, 요구사항 충족 필요함
// export const TeamEditor = ({navigation}:MainStackScreenProps<'TeamEditor'>) => {
//   const {theme} = useTheme()
//   const styles = useStyles({navigation})
//   const modal = React.useContext(ModalContext)
//   const dispatch = useAppDispatch()
//   const [array, setArray] = useState([{idex:'0'}])
//   const [positionMakerCount, setPositionMakerCount] = useState(1)
//   const [teamCreateState, setTeamCreateState] = useState<TeamRequestDto>({
//     backendTotalRecruitCnt: 0,
//     designerTotalRecruitCnt: 0,
//     expectation: '',
//     frontendTotalRecruitCnt: 0,
//     openChatUrl: '',
//     projectDescription: '',
//     projectManagerTotalRecruitCnt: 0,
//     projectName: '',
//   })
//   const {
//     data: teamCreateResult,
//     loading: teamCreateLoading,
//     error: teamCreateError
//   } = useAppSelector(state => state.teamCreateReducer.teamCreateResult)

//   const [data, setData] = useState([
//     {key:'벡엔드 개발자', value:'벡엔드 개발자', disabled:false},
//     {key:'프론트엔드 개발자', value:'프론트엔드 개발자', disabled:false},
//     {key:'디자이너', value:'디자이너', disabled:false},
//     {key:'PM', value:'PM', disabled:false}
//   ])
//   const globalStyles = useGlobalStyles()

//   function addPositionMaker() {
//     let newArray = [...array, {idex: (positionMakerCount + 1).toString()}]
//     setArray(newArray)
//     setPositionMakerCount(positionMakerCount + 1)
//     console.log(positionMakerCount)
//   }

//   function positionMapper(count:number, position:string) {
//     if(position == '벡엔드 개발자') {
//       setTeamCreateState(prevState => ({...prevState, backendTotalRecruitCnt: count}))
//     }
//     if(position == '프론트엔드 개발자') {
//       setTeamCreateState(prevState => ({...prevState, frontendTotalRecruitCnt: count}))
//     }
//     if(position == '디자이너') {
//       setTeamCreateState(prevState => ({...prevState, designerTotalRecruitCnt: count}))
//     }
//     if(position == 'PM') {
//       setTeamCreateState(prevState => ({...prevState, projectManagerTotalRecruitCnt: count}))
//     }
//   }

//   function isOpenChatUrlValidate(){
//     const pattern = /^https\:\/\/open\.kakao\.com\/.+$/
//     const result = pattern.test(teamCreateState.openChatUrl)

//     if (result) return true
//     else throw Error('유효한 카카오톡 오픈채팅 링크가 아닙니다')
//   }

//   function isRecruitCntValidate() {
//     const backendCnt = teamCreateState.backendTotalRecruitCnt
//     const frontendCnt = teamCreateState.frontendTotalRecruitCnt
//     const designerCnt = teamCreateState.designerTotalRecruitCnt
//     const projectManagerCnt = teamCreateState.projectManagerTotalRecruitCnt

//     if(backendCnt == 0 && frontendCnt == 0 && designerCnt == 0 && projectManagerCnt == 0){
//       throw Error('팀원이 존재하지 않습니다')
//     }
//     else return true
//   }

//   function isEmptyInputExisted() {
//     //공백제거하기
//     const projectName = teamCreateState.projectName.replace(/ /gi, "")
//     const projectDescription = teamCreateState.projectDescription.replace(/ /gi, "")
//     const expectation = teamCreateState.expectation.replace(/ /gi, "")
//     const openChatUrl = teamCreateState.openChatUrl.replace(/ /gi, "")

//     if (projectName.length != 0
//         && projectDescription.length != 0
//         && expectation.length != 0
//         && openChatUrl.length != 0
//       ){
//        return true
//       }
//     else throw Error('빈 입력란이 있습니다')
//   }

//   function isAllInputValidate() {

//     try {
//       isRecruitCntValidate()
//     } catch (error) {
//       RecruitCntValidationWarningModal()
//       return false
//     }

//     try {
//       isEmptyInputExisted()
//     } catch (error) {
//       EmptyInputWarningModal()
//       return false
//     }

//     try {
//       isOpenChatUrlValidate()
//     } catch (error) {
//       OpenChatValidationWarningModal()
//       return false
//     }

//     return true
//   }

//   const EmptyInputWarningModal = () => {
//     modal?.show({
//       title: '',
//       content: (
//         <SymbolModalContent
//           title='빈 입력란이 있어요!'
//           symbol={<Text style={{fontSize: theme.emojiSize.md, textAlign: 'center'}}>😚</Text>}
//           text={'최대한 자세히 적어주시면\n 프로젝트 모집에 도움이 될 수 있어요!'}
//           yesButton={{title:'확인', onPress: () => modal.hide()}}
//         />
//       )
//     })
//   }

//   const OpenChatValidationWarningModal = () => {
//     modal?.show({
//       title: '',
//       content: (
//         <SymbolModalContent
//           title='알맞은 링크가 아니에요!'
//           symbol={<Text style={{fontSize: theme.emojiSize.md, textAlign: 'center'}}>🧐</Text>}
//           text={'유효한 카카오톡 오픈채팅 링크를 첨부해주세요!'}
//           yesButton={{title:'확인', onPress: () => modal.hide()}}
//         />
//       )
//     })
//   }

//   const RecruitCntValidationWarningModal = () => {
//     modal?.show({
//       title: '',
//       content: (
//         <SymbolModalContent
//           title='팀원이 없어요!'
//           symbol={<Text style={{fontSize: theme.emojiSize.md, textAlign: 'center'}}>🫥</Text>}
//           text={'프로젝트를 함께할 팀원들을 알려주세요!'}
//           yesButton={{title:'확인', onPress: () => modal.hide()}}
//         />
//       )
//     })
//   }

//   const DeleteConfirmModal = () => {
//     modal?.show({
//       title:'',
//       content: (
//         <BottomSlideModalContent
//           title='글을 입력하시겠어요?'
//           yesButton={{
//             title: '삭제하기',
//             onPress: () => {
//               modal.hide()
//               navigation.goBack()
//             },
//           }}
//           noButton={{
//             title: '돌아가기',
//             onPress: () => {
//               modal.hide()
//             }
//           }}
//         >
//           <View>
//             <Text style={{textAlign:'center'}}>글을 삭제하면</Text>
//             <Text style={{textAlign:'center'}}>다시 되돌릴 수 없습니다</Text>
//           </View>
//         </BottomSlideModalContent>
//       )
//     })
//   }

//   return (
//     <KeyboardAvoidingView behavior='height' style={{backgroundColor:'white', flex:1}}>
//       <FlatList
//         style={{flex:1}}
//         ListHeaderComponentStyle={{paddingTop:29}}
//         ListHeaderComponent={<>
//           <View style={styles.item}>
//             <Text style={styles.text}>프로젝트 이름</Text>
//             <CardWrapper style={[globalStyles.card, styles.inputBox, {maxHeight: 50}]}>
//               <TextInput
//                 value={teamCreateState?.projectName}
//                 onChangeText={(text: string) => {
//                   setTeamCreateState(prevState => ({...prevState, projectName:text}))
//                 }}
//                 multiline={false}
//                 maxLength={20}
//                 placeholder='최대 20자'
//               />
//             </CardWrapper>
//           </View>

//           <View style={styles.item}>
//             <Text style={styles.text}>프로젝트 설명</Text>
//             <CardWrapper style={[globalStyles.card, styles.inputBox,{minHeight: 160}]}>
//               <TextInput
//                 value={teamCreateState?.projectDescription}
//                 onChangeText={(text: string) => {
//                   setTeamCreateState(prevState => ({...prevState, projectDescription:text}))
//                 }}
//                 multiline={true}
//                 maxLength={500}
//               />
//             </CardWrapper>
//           </View>
//           <Text style={styles.text}>원하는 팀원</Text>
//         </>}

//         keyExtractor={item => item.idex}
//         data={array}
//         renderItem={ () =>
//           <PositionMaker
//             callback={(count:number, position:string)=> {
//               /*서버로 보낼 number, position을 바인딩하면 됨*/
//               positionMapper(count, position)
//               setTeamCreateState(prevState => ({...prevState, }))
//               setData(prevState => (
//                 [...prevState.filter(item => item.value != position), {key:position, value:position, disabled:true}]
//               ))
//             }}
//             data={data}
//           />
//         }
//         contentContainerStyle={{backgroundColor: theme.colors.white, paddingHorizontal:20}}

//         ListFooterComponent={<>
//           <TouchableOpacity style={{alignItems:'center'}} onPress={()=> {addPositionMaker()}} disabled={positionMakerCount > 3? true: false}>
//             <CustomIcon name="plus-square" size={25} color={theme.colors.grey1}/>
//           </TouchableOpacity>
//           <View style={styles.item}>
//             <Text style={styles.text}>바라는 점</Text>
//             <CardWrapper style={[globalStyles.card, styles.inputBox, {minHeight: 95}]}>
//               <TextInput
//                 value={teamCreateState?.expectation}
//                 onChangeText={(text: string) => {
//                   setTeamCreateState(prevState => ({...prevState, expectation:text}))
//                 }}
//                 multiline={true}
//                 maxLength={200}
//               />
//             </CardWrapper>
//           </View>

//           <View style={styles.item}>
//             <Text style={styles.text}>오픈채팅 링크</Text>
//             <CardWrapper style={[globalStyles.card, styles.inputBox, {maxHeight: 50}]}>
//               <TextInput
//                 value={teamCreateState?.openChatUrl}
//                 onChangeText={(text: string) => {
//                   setTeamCreateState(prevState => ({...prevState, openChatUrl:text}))
//                 }}
//                 multiline={true}
//                 maxLength={100}
//                 placeholder='카카오톡 오픈채팅 링크'
//               />
//             </CardWrapper>
//           </View>

//           <View style={{paddingHorizontal: 30, paddingBottom:20}}>
//             <FilledButton
//               title={'완료'}
//               disabled={false}
//               onPress={() => {
//                   if(isAllInputValidate()){
//                     dispatch( createTeam(teamCreateState) )
//                     navigation.goBack()
//                   }
//                 }
//               } />
//           </View>
//         </>}
//       />
//     </KeyboardAvoidingView>
//   )
// }
// const useStyles = makeStyles((theme) => ({
//   view: {
//     backgroundColor: 'white',
//     paddingHorizontal: 20,
//   },
//   item: {
//     flex: 1,
//     alignItems: 'flex-start',
//   },
//   text: {
//     fontSize:theme.fontSize.sm,
//     fontWeight:theme.fontWeight.bold,
//     paddingBottom: 10
//   },
//   input:{
//     flex: 10,
//     paddingVertical:10,
//     paddingHorizontal:10
//   },
//   inputBox:{
//     flex:1,
//     width:'100%',
//     flexDirection:'row',
//     borderWidth: 1.3,
//     borderColor: theme.colors.disabled,
//     marginBottom: 20
//   },
// }))
