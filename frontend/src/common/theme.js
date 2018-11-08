import { StatusBar } from 'react-native';
import { Header } from 'react-navigation';
import * as DimSize from './dimensionSize';

const windowWidth = DimSize.width('100%');

const theme = {
  sizes: {
    text: {
      small: DimSize.height('2%'),
      medium: DimSize.height('2.2%'),
      normal: DimSize.height('2.4%'),
      large: DimSize.height('2.8%'),
      huge: DimSize.height('3.4%'),
      grand: DimSize.height('5.4%'),
      enormous: DimSize.height('12%'),
    },
    statusBar: {
      height: StatusBar.currentHeight || 30, // For ios
      width: windowWidth,
    },
    navBar: {
      height: Header.HEIGHT,
      width: windowWidth,
    },
    tabBar: {
      height: DimSize.height('8.5%'),
      width: windowWidth,
    },
    window: {
      width: windowWidth,
      height: DimSize.height('100%'),
    },
    spaces: {
      window: {
        top: DimSize.height('2%'),
        bottom: DimSize.height('2%'),
        left: DimSize.width('4%'),
        right: DimSize.width('4%'),
      },
      content: {
        small: {
          left: DimSize.width('2%'),
          right: DimSize.width('2%'),
          top: DimSize.height('1%'),
          bottom: DimSize.height('1%'),
        },
        medium: {
          left: DimSize.width('2.5%'),
          right: DimSize.width('2.5%'),
          top: DimSize.height('2.5%'),
          bottom: DimSize.height('2.5%'),
        },
        large: {
          left: DimSize.width('3%'),
          right: DimSize.width('3%'),
          top: DimSize.height('4%'),
          bottom: DimSize.height('4%'),
        },
      },
    },
  },
  colors: {
    background: {
      tv: '#3B63E6',
      movie: '#E63B3B',
      person: '#DF9738',
      default: '#2C2C2C',
      dark: '#141414',
    },
    text: {
      light: '#fefefe',
      dark: '#2C2C2C',
      tv: '#fefefe',
      movie: '#fefefe',
      person: '#fefefe',
      default: '#B5B5B5',
      star: '#E7CF23',
    },
  },
};

export default theme;
