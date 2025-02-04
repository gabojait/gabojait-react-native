import '@rneui/themed';
import { createTheme } from '@rneui/themed';

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
  | undefined;

/**
 * 여기서 테마에 새로운 값을 정의해줄 수 있어요.
 */
declare module '@rneui/themed' {
  export interface Theme {
    boxComponentHeight: {
      xs: number;
      sm: number;
      md: number;
      xmd: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    radius: {
      xs: number;
      sm: number;
      smd: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    ratingBarSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    sliderSize: {
      md: number;
      lg: number;
    };
    fontSize: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      xmd: number;
      lg: number;
    };
    emojiSize: {
      sm: number;
      md: number;
      lg: number;
    };
    fontWeight: {
      superLight: FontWeight;
      light: FontWeight;
      medium: FontWeight;
      semibold: FontWeight;
      bold: FontWeight;
    };
    shadow: {
      opacity: number;
      radius: number;
      elevation: number;
      marginVertical: number;
      shadowOffset: {
        width: number;
        height: number;
      };
    };
    customColors: {
      red: string;
      orange: string;
      yellow: string;
    };
    positionIconRadious: {
      sm: number;
      md: number;
      lg: number;
    };
  }
}

// ⚠️ 테마 생성 옵션을 변경하고 난 다음에는 앱을 꼭 리로드해주세요!
export const theme = createTheme({
  boxComponentHeight: {
    xs: 20,
    sm: 28,
    md: 33,
    xmd: 38,
    lg: 45,
    xl: 48,
    xxl: 62,
  },
  lightColors: {
    white: '#FFFFFF',
    primary: '#1CDF71',
    error: '#FC0101',
    warning: '#F06823',
    disabled: '#D9D9D9',
    grey0: '#EEEEEE',
    grey1: '#6C6C6C',
    grey2: '#B4B4B4',
    grey3: '#8E8E8E',
  },
  customColors: {
    red: '#F04823',
    orange: '#F06823',
    yellow: '#FFDB20',
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
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 17,
    xmd: 20,
    lg: 22,
  },
  emojiSize: {
    sm: 20,
    md: 80,
    lg: 130,
  },
  fontWeight: {
    superLight: '100',
    light: '300',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  radius: {
    xs: 5,
    sm: 10,
    smd: 12,
    md: 15,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  ratingBarSize: {
    xs: 16,
    sm: 19,
    md: 22,
    lg: 26,
    xl: 30,
  },
  sliderSize: {
    md: 20,
    lg: 30,
  },
  shadow: {
    opacity: 1,
    radius: 20,
    elevation: 5,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  positionIconRadious: {
    sm: 22,
    md: 32,
    lg: 42,
  },
});
