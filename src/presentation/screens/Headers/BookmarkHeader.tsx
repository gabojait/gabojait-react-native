import CustomHeader from '@/presentation/components/CustomHeader'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack'
import {TouchableOpacity} from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import {useTheme} from '@rneui/themed'
import React from 'react'

type BookMarkHeaderProps = StackHeaderProps & {
  teamId: string
}

const BookMarkHeader: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  const {theme} = useTheme()
  return (
    <CustomHeader
      title={title}
      canGoBack={true}
      rightChildren={
        <TouchableOpacity>
          <CustomIcon name="heart" size={30} color={theme.colors.black} />
        </TouchableOpacity>
      }
    />
  )
}

export default BookMarkHeader
