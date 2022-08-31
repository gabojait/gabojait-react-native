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
  },
  buttonShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
  },
  buttonContainer: {
    padding: 8
  }
})
export default styles
