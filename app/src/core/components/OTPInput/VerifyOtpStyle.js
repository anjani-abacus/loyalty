import {StyleSheet, Platform} from 'react-native';
import AppTheme from '../Theme/AppTheme';

export const CELL_SIZE = 45;
export const CELL_BORDER_RADIUS = 6;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

export const otpStyle = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    justifyContent: 'flex-start',
  },

  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 1,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 20,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:'#D5D8E6',

    // // IOS
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2.2,

    // // // Android
    // elevation: 1,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

const VerifyOtpStyle = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  OtpContainer: {
    backgroundColor: AppTheme.Light,
    marginHorizontal: 18,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    color: AppTheme.Dark,
    fontFamily: 'Sequel Sans Heavy Head',
    borderColor: AppTheme.Medium,
  },

  underlineStyleHighLighted: {
    borderColor: AppTheme.Primary,
  },

  loginHeader: {
    padding: 20,
    textAlign: 'center',
  },
  linkStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default VerifyOtpStyle;
