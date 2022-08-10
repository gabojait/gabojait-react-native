import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  wrapButtonConatiner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  outlinedButton: {
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    marginBottom: 10,
  },
})
export default styles
