import GroupListCard, {Part} from '@/presentation/components/GroupListCard'
import styles from '@/styles'
import {Text} from '@rneui/themed'
import React, {ReactNode} from 'react'
import {View} from 'react-native'

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

  return (
    <GroupListCard
      title="팀이름"
      parts={[new Part('design', '디자인', ['ㅎㅇ'])]}

    />
  )
}

export default Detail
