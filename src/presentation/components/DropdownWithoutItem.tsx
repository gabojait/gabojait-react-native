import {TouchableOpacity, View} from 'react-native'
import React from 'react'
import {makeStyles, Text} from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'

interface DateDropdownProps {
  text: string
  onClick: () => void
}

const DateDropdown: React.FC<DateDropdownProps> = ({text, onClick}) => {
  const styles = useStyles()
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.dateDropdown}>
        <Text style={{alignSelf: 'baseline'}}>{text}</Text>
        <Icon name="chevron-down-outline" size={18} />
      </View>
    </TouchableOpacity>
  )
}

const useStyles = makeStyles((theme, props: DateDropdownProps) => ({
  dateDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    padding: 12,
    borderRadius: 4,
  },
}))
export default DateDropdown
