import '@rneui/themed'
import { Button, ButtonProps, createTheme, Theme } from '@rneui/themed'
/**
 * 여기서 테마에 새로운 값을 정의해줄 수 있어요.
 */
declare module '@rneui/themed' {
  export interface Theme {
    rd1: number
    rd2: number
    rd3: number
  }
}



// ⚠️ 테마 생성 옵션을 변경하고 난 다음에는 앱을 꼭 리로드해주세요!
export const theme = createTheme({
  lightColors: {
    primary: '#1CDF71',
    error: '#FC0101',
    warning: '#F06823',
    disabled: '#D9D9D9',
  },
  mode: 'light',
  components: {
    Button: {
      titleStyle: {
        fontFamily: 'Pretendard-SemiBold',
      },
    },
    Text: {
      style: {
        fontFamily: 'Pretendard-Medium',
      },
    },
  },
  rd1: 24,
  rd2: 10,
  rd3: 5,
})
