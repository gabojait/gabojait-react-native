import '@rneui/themed'
import {Button, ButtonProps, createTheme, Theme} from '@rneui/themed'

/**
 * StyleSheet FontWeight Type이에요.
 */
export type FontWeight =
  | 'bold'
  | 'normal'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined

/**
 * 여기서 테마에 새로운 값을 정의해줄 수 있어요.
 */
declare module '@rneui/themed' {
  export interface Theme {
    radius: {
      xs: number
      sm: number
      md: number
      lg: number
      xl: number
    }
    fontSize: {
      xs: number
      sm: number
      md: number
      lg: number
    }
    fontWeight: {
      light: FontWeight
      medium: FontWeight
      semibold: FontWeight
      bold: FontWeight
    }
  }
}

// ⚠️ 테마 생성 옵션을 변경하고 난 다음에는 앱을 꼭 리로드해주세요!
export const theme = createTheme({
  lightColors: {
    primary: '#1CDF71',
    error: '#FC0101',
    warning: '#F06823',
    disabled: '#D9D9D9',
    grey0: '#6C6C6C',
  },
  mode: 'light',
  components: {
    Button: {
      titleStyle: {
        fontFamily: 'Pretendard-Medium',
        fontWeight: '600',
      },
    },
    Text: {
      style: {
        fontFamily: 'Pretendard-Medium',
      },
    },
  },
  spacing: {
    xs: 7,
    sm: 14,
    md: 17,
    lg: 22,
    xl: 30,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 17,
    lg: 22,
  },
  fontWeight: {
    light: '300',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  radius: {
    xs: 5,
    sm: 10,
    md: 10,
    lg: 20,
    xl: 20,
  },
})
