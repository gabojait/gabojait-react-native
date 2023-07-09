import {makeStyles} from '@rneui/themed'
import {StyleSheet} from 'react-native'

const useGlobalStyles = makeStyles(theme => ({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 20,
    padding: 25,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
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
    paddingHorizontal: 0,
  },
  centerText: {
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: 'white',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 30,
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
  modalDim: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  FlexStartCardWrapper: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 14,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itnitialText: {
    fontWeight: theme.fontWeight.bold,
    fontSize: 30,
  },
  tabBar: {
    minHeight: 60,
    paddingVertical: 10,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: theme.fontWeight.semibold,
    paddingTop: 10,
  },
}))
export default useGlobalStyles
