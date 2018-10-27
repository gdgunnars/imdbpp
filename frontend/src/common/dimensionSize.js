import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const toNumber = (percentage) => {
  const percentageNumber = percentage.replace('%', '');
  const fraction = +percentageNumber / 100;
  return fraction;
};

const width = percentage => screenWidth * toNumber(percentage);
const height = percentage => screenHeight * toNumber(percentage);

const windowSidesPadding = () => width('4%');

// Used for content
const contentSidesPadding = () => width('2%');

export {
  width, height, windowSidesPadding, contentSidesPadding,
};
