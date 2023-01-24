import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
      height: 0,
    },
    shadowRadius: 2,
  },
  buttonContainer: {
    padding: 4,
  },
  centerText: {
    textAlign: 'center',
  },
})
export default styles
