import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper';
import useTheme from '../../components/Theme/useTheme';

const GlobelStyle = () => {
  const activeTheme = useTheme();

  return StyleSheet.create({
    pd0: { padding: 0 },
    pd5: { padding: 5 },
    pd10: { padding: 10 },
    pd16: { padding: 16 },

    pt16: { paddingTop: 16 },
    pl2: { paddingLeft: 2 },
    pl4: { paddingLeft: 4 },
    pl6: { paddingLeft: 6 },

    p10: { padding: 10 },
    pl20: { paddingLeft: 20 },

    paddingHorizontal16: { paddingHorizontal: 16 },
    paddingVertical16: { paddingVertical: 16 },
    marginHorizontal16: { marginHorizontal: 16 },
    marginVertical20: { marginVertical: 20 },

    mt0: { marginTop: 0 },
    mt2: { marginTop: 2 },
    mt4: { marginTop: 4 },
    mt6: { marginTop: 6 },
    mt8: { marginTop: 8 },
    mt10: { marginTop: 10 },
    mt12: { marginTop: 12 },
    mt14: { marginTop: 14 },
    mt16: { marginTop: 16 },

    mb0: { marginBottom: 0 },
    mb2: { marginBottom: 2 },
    mb4: { marginBottom: 4 },
    mb6: { marginBottom: 6 },
    mb8: { marginBottom: 8 },
    mb10: { marginBottom: 10 },
    mb12: { marginBottom: 12 },
    mb14: { marginBottom: 14 },
    mb16: { marginBottom: 16 },
    mb18: { marginBottom: 18 },
    mb20: { marginBottom: 20 },

    ml0: { marginLeft: 0 },
    ml2: { marginLeft: 2 },
    ml4: { marginLeft: 4 },
    ml6: { marginLeft: 6 },
    ml8: { marginLeft: 8 },
    ml10: { marginLeft: 10 },
    ml12: { marginLeft: 12 },
    ml14: { marginLeft: 14 },
    ml16: { marginLeft: 16 },

    mr0: { marginRight: 0 },
    mr2: { marginRight: 2 },
    mr4: { marginRight: 4 },
    mr6: { marginRight: 6 },
    mr8: { marginRight: 8 },
    mr10: { marginRight: 10 },
    mr12: { marginRight: 12 },
    mr14: { marginRight: 14 },
    mr16: { marginRight: 16 },
    m16: { margin: 16 },

    gap0: { gap: 0 },
    gap2: { gap: 2 },
    gap4: { gap: 4 },
    gap6: { gap: 6 },
    gap8: { gap: 8 },
    gap10: { gap: 10 },
    gap12: { gap: 12 },
    gap14: { gap: 14 },
    gap16: { gap: 16 },

    font10: { fontSize: 10 },
    font11: { fontSize: 11 },
    font12: { fontSize: 12 },
    font14: { fontSize: 14 },
    font16: { fontSize: 16 },
    relative: { position: 'relative' },

    fontSequel: { fontFamily: 'Sequel Sans Heavy Head' },
    domineFamily: { fontFamily: 'Domine-VariableFont_wght' },

    // flex
    flex: { flex: 1 },
    flexDirectionRow: { flexDirection: 'row' },
    flexDirectionColumn: { flexDirection: 'column' },
    alignItemsCenter: { alignItems: 'center' },
    alignItemsStart: { alignItems: 'flex-start' },
    alignItemsEnd: { alignItems: 'flex-end' },
    justifyContentBetween: { justifyContent: 'space-between' },
    justifyContentAround: { justifyContent: 'space-around' },
    justifyContentCenter: { justifyContent: 'center' },
    justifyContentStart: { justifyContent: 'flex-start' },
    justifyContentEnd: { justifyContent: 'flex-end' },

    leftAuto: {
      marginLeft: 'auto',
    },

    textBold: {
      fontWeight: '700',
    },

    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    flexCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: activeTheme.maincontainer,
    },

    error: {
      color: activeTheme.Danger,
      fontSize: 12,
      marginLeft: 'auto',
      fontWeight: '700',
    },
    success: {
      color: activeTheme.Success,
      fontSize: 12,
      marginLeft: 'auto',
      fontWeight: '700',
    },
    text: {
      fontSize: 11,
    },

    content: {},

    // dropdown Field
    DropDowncontainer: {
      backgroundColor: activeTheme.maincontainer,
    },
    itemContainerStyle:{
      backgroundColor: activeTheme.section,
      marginBottom:5,
      borderBottomWidth:1,
      borderBottomColor:'#ccc',
    },
    dropdown: {
      height: 50,
      paddingHorizontal: 8,
      borderWidth: 0.8,
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderColor: '#fff',
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      // backgroundColor: activeTheme.section,
      color:activeTheme.text,
      left: 22,
      top: -5,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      marginLeft: 16,
      color: activeTheme.text,
    },
    selectedTextStyle: {
      fontSize: 16,
      fontWeight: 400,
      marginLeft: 16,
      color: activeTheme.text,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: activeTheme.text,
    },
    textAlignRight: {
      textAlign: 'right',
    },

    textSize: size => {
      return { fontSize: size };
    },

    title: {
      fontFamily: 'Sequel Sans Heavy Head',
      fontSize: 16,
      color: activeTheme.text,
    },
    titleLarge:{
      fontFamily: 'Sequel Sans Heavy Head',
      fontSize: 28,
      fontWeight:'bold',
      color: activeTheme.text,
    },

    Skeleton: {
      borderRadius: 6,
    },
    AppbarContent: {
      textAlign: 'left',
      fontSize: 16,
      textTransform: 'capitalize',
      color: activeTheme.White,
    },
    AppbarHeader: {
      backgroundColor: activeTheme.themeColor,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: activeTheme.borderColor,
    },
    tableHeader: {
      flex: 1,
    },
    tabelData: {
      fontWeight: '700',
      flex: 1,
    },

    bottomButton: {
      width: '100%',
      backgroundColor: activeTheme.White,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 10,
    },
    addNewButton: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      marginHorizontal: 20,
      backgroundColor: activeTheme.themeColor,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
      elevation: 4,
    },
    addNewOtLinedButton: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      marginHorizontal: 20,
      backgroundColor: activeTheme.Snow,
      borderWidth: 2,
      borderColor: activeTheme.themeColor,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
      elevation: 4,
    },
    cancelButton: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      marginHorizontal: 20,
      backgroundColor: activeTheme.CancelRed,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
    },
    cancelDuoButtonLeft: {
      // position: 'absolute',
      // bottom: 10,
      // left: 0,
      backgroundColor: activeTheme.CancelRed,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
    },
    completeDuoButtonRight: {
      // position: 'absolute',
      // bottom: 10,
      // right: 0,
      backgroundColor: activeTheme.TextBlue,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
    },
    completeButton: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      marginHorizontal: 20,
      backgroundColor: activeTheme.TextBlue,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
    },
    innerAddNewButton: {
      backgroundColor: activeTheme.themeColor,
      marginHorizontal: 20,
      // borderWidth:3,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
    },
    addNewButtonText: {
      fontWeight: '500',
      fontSize: 16,
      color: activeTheme.White,
    },
    addNewOtlinedButtonText: {
      fontWeight: '500',
      fontSize: 16,
      color: activeTheme.themeColor,
    },
    saveButton: {
      backgroundColor: activeTheme.White,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      opacity: 1,
      zIndex: 13,
    },
    tabViewContainer: {
      backgroundColor: activeTheme.maincontainer,
      height: '100%',
    },
    tabView: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    thumbNail: {
      backgroundColor: 'white',
      marginRight: 10,
      height: 28,
      width: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: '#E5F1FF',
    },
    thumbNailText: {
      fontWeight: '700',
      color: '#004BAC',
    },
    headerText: {
      color: '#fff',
    },
    backButton: {
      color: '#fff',
      fontSize: 24,
      marginLeft: 12,
    },
    editButton: {
      color: '#fff',
      fontSize: 24,
      marginRight: 10,
    },
    flex: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    skeletonFlatList: {
      marginVertical: 20,
      marginHorizontal: 10,
      backgroundColor: activeTheme.White,
      borderWidth: 2,
      borderRadius: 15,
      borderColor: '#EDEDED',
    },
    badge: {
      padding: 5,
      borderRadius: 4,
    },

    Heading: {
      fontSize: 16,
      fontFamily: 'Sequel Sans Heavy Head',
      fontWeight: '700',
      width:'50%',
      justifyContent:'space-evenly',
    },

    outlineCard: {
      borderWidth: 1,
      borderColor: activeTheme.borderColor,
      borderRadius: 6,
      padding: 10,
      marginTop: 16,
      backgroundColor: activeTheme.Light,
    },

    videoCard: {
      borderWidth: 1,
      borderColor: activeTheme.borderColor,
      borderRadius: 6,
      padding: 10,
      marginTop: 16,
      backgroundColor: activeTheme.Light,
    },
    pageContainer: {
      paddingHorizontal: 16,
    },
    segmentContainer: {
      marginBottom: 12,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      borderRadius: 6,
    },
    segmentBtnContainer: {
      borderWidth: 0.5,
      borderColor: activeTheme.lightBorderColor,
      borderRadius: 6,
      marginHorizontal: 10,
      backgroundColor: activeTheme.Snow,
    },
    segmentSelectedBtn: {
      backgroundColor: '#E9F6FF',
      borderRadius: 4,
      borderColor: '#0092FF',
      borderWidth: 1,
    },
    segmentBtnText: {
      fontWeight: '700',
      color: '#0092FF',
    },
    shortcuts: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // gap: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    cnShortcuts: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    underLineDropdown: {
      width: '100%',
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      paddingHorizontal: 18,
    },
    elementDropdown: {
      height: 40,
      width: 320,
      borderColor: '#2B3348',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    elementUnderlineDropdown: {
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    btnGroup: {
      width: '25%',
      height: 90,
      // marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    btnGrouployalty: {
      flex: 0.5,
      minWidth: 0,
    },

    iconOutline: {
      borderWidth: 0.5,
      borderRadius: 6,
      lineHeight: 45,
      width: 45,
      height: 45,
      borderColor: activeTheme.lightBorderColor,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      marginTop: 10,
      color: activeTheme.text,
      backgroundColor: activeTheme.Light,
      ...Platform.select({
        ios: {
          shadowColor: '#242424',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    image: {
      width: 40,
      height: 40,
    },
    iconOutlineloyalty: {
      borderWidth: 2,
      width: '87%',
      height: 110,
      borderRadius: 8,
      lineHeight: 100,
      borderColor: activeTheme.lightBorderColor,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      marginTop: 10,
      backgroundColor: activeTheme.text,
      ...Platform.select({
        ios: {
          shadowColor: '#242424',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    btnTitle: {
      fontSize: 13,
      textAlign: 'center',
      color: activeTheme.text,
      marginTop: 10,
      fontWeight: '500',
    },
    Card: {
      backgroundColor: activeTheme.Light,
      height: 80,
      borderRadius: 6,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
    },
    listCard: {
      borderRadius: 10,
      backgroundColor: MD3Colors.error100,
      elevation: 2,
      marginBottom: 10,
      marginHorizontal: 12,
      shadowColor: activeTheme.Dark,
      shadowOffset: { width: 0, height: 8 }, // No offset in any direction
      shadowOpacity: 0.2,
      shadowRadius: 5, // Spread of the shadow
      padding: 12,
    },
    AnimatedFav: {
      bottom: 16,
      right: 16,
      position: 'absolute',
      backgroundColor: activeTheme.themeColor,
      borderRadius: 12,
      color: activeTheme.text,
    },
    LogoutCard: {
      backgroundColor: MD3Colors.Light,
      height: 80,
      borderRadius: 6,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
    },
    companyNameStyle: {
      fontSize: 14,
      color: '#2B3348',
      marginBottom: 3,
      fontWeight: '700',
    },
    nameStyle: {
      fontSize: 12,
      color: '#2B3348',
      marginBottom: 5,
      marginTop: 5,
    },
    addressContainer: {
      flexDirection: 'row',
      marginVertical: 3,
      alignItems: 'flex-start',
    },
    addressStyle: {
      marginLeft: 5,
      color: '#2B3348',
      fontSize: 14,
    },
    rightArrowIconContainer: {
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: '#E9F6FF',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 15,
      top: 60,
      zIndex: 3,
    },
    contactInfoStyle: {
      marginLeft: 20,
      maxWidth: 200,
    },
    AnimatedFab: {
      bottom: 16,
      right: 16,
      position: 'absolute',
      backgroundColor: activeTheme.Dark,
      borderRadius: 60,
      color: activeTheme.text,
    },
    Alertbutton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    AlertbuttonText: {
      color: activeTheme.text,
      fontWeight: '700',
      textAlign: 'center',
    },
    navigatorSpace: {
      paddingBottom: 68,
    },
    flexBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flexRowAlignCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    unalingedFlex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // justifyContent: 'space-between',
    },

    dFlex: {
      display: 'flex',
      flexDirection: 'row',
    },
    DarkBadge: {
      backgroundColor: MD3Colors.neutral30,
      color: MD3Colors.neutral100,
      marginLeft: 'auto',
      marginHorizontal: 16,
      fontWeight: '700',
      elevation: 10,
      marginBottom: 8,
    },
    flexGap10: {
      columnGap: 10,
    },
    flexStart: {
      alignItems: 'flex-start',
    },
    smCard: {
      marginTop: 10,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flex: 1,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: activeTheme.Dark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        android: {
          elevation: 5,
        },
      }),
    },

    working: {
      backgroundColor: '#eae3ff',
    },
    leave: {
      backgroundColor: '#ffbdbd',
    },
    absent: {
      backgroundColor: '#fff4cd',
    },
    present: {
      backgroundColor: '#e7ffbd',
    },
    weeklyOff: {
      backgroundColor: '#d0d0d0',
    },
    holiday: {
      backgroundColor: '#d0d0d0',
    },

    largeFont: {
      fontWeight: '700',
      fontSize: 16,
      color: activeTheme.text,
    },
    mediumFont: {
      fontWeight: '600',
      fontSize: 12,
      color: activeTheme.text,
    },

    ContactlargeFont: {
      flexShrink: 1,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 20,
      color: '#fff',
    },

    smLargeFont: {
      fontWeight: '500',
      fontSize: 12,
      color: activeTheme.text,
    },
    mdLabel: {
      fontSize: 10,
      color: activeTheme.text,
    },
    smLabel: {
      fontSize: 10,
      color: activeTheme.text,
    },
    smallestLable: {
      fontSize: 9,
      color: activeTheme.text,
    },
    PickerStyle: {
      height: 55,
      justifyContent: 'center',
      borderRadius: 6,
      borderColor: activeTheme.lightBorderColor,
      marginTop: 16,
      borderWidth: 1,
      backgroundColor: activeTheme.Light,
      zIndex: 99,
    },
    NoPickerDataStyle: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      borderColor: MD3Colors.error50,
      marginTop: 16,
      borderWidth: 1,
      backgroundColor: MD3Colors.error95,
    },
    skeltonPickerDataStyle: {
      width: '100%',
      marginTop: 16,
      borderRadius: 6,
    },

    errorMsg: {
      color: MD3Colors.error60,
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0,
    },
    TopSlab: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: activeTheme.LinkBlue,
      padding: 4,
      borderRadius: 6,
    },
    BottomSlab: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4,
    },
    Avatar: {
      fontWeight: '700',
      fontSize: 14,
      color: activeTheme.Secondary,
      lineHeight: 20,
    },
    AvatarLabel: {
      backgroundColor: MD3Colors.neutral90,
      elevation: 6,
      borderWidth: 1,
      borderColor: activeTheme.text,
    },

    AssignedDist: {
      borderWidth: 1,
      borderColor: MD3Colors.secondary80,
      borderRadius: 6,
      padding: 6,
      maxHeight: 200,
    },
    AdressHeader: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: 10,
      alignItems: 'center',
      // backgroundColor: activeTheme.statusBar,
      borderRadius: 8,
      justifyContent:'space-between',
      padding: 2,
    },
    card: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      elevation: 8,
      flex: 1,
      height: '100%',
    },
    transparentHeader: {
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
    },

    themedHeader: {
      backgroundColor: activeTheme.PrimaryBg,
    },

    ContactLoyalty: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: 15,
      alignItems: 'center',
      // backgroundColor: activeTheme.statusBar,
      // borderRadius: 8,
      padding: 5,
    },

    ProdutList: {
      width: '100%',
      borderRadius: 6,
      flexDirection: 'row',
      columnGap: 10,
      justifyContent: 'space-evenly',
    },

    pd_image_Container: {
      width: '100%',
      height: 100,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: activeTheme.borderColor,
      borderRadius: 6,
    },

    pd_content: {
      backgroundColor: activeTheme.Snow,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Header: {
      color: activeTheme.text,
      fontSize: 16,
      fontWeight: '700',
    },

    chartCardWrapper: {
      marginTop: 10,
    },
    chartCard: {
      backgroundColor: activeTheme.Light,
      marginTop: 10,
      borderRadius: 5,
      padding: 10,
    },
    avatarViewContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      // marginTop: 15,
    },
    avatarContainer: {
      width: 40,
      height: 40,
      backgroundColor: '#E8F3FF',
      borderRadius: 5,
    },
    avatarLabelStyle: {
      color: activeTheme.themeColor,
      fontWeight: '700',
    },

    // custom  header for a user specific page
    thumbNail: {
      backgroundColor: 'white',
      marginRight: 10,
      height: 28,
      width: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: '#E5F1FF',
    },
    thumbNailText: {
      fontWeight: '700',
      color: '#004BAC',
    },
    headerText: {
      color: '#fff',
    },
    borderTabStyle: focused => {
      return {
        color: focused ? '#0092FF' : null,
        fontWeight: focused ? '700' : '400',
        backgroundColor: focused ? '#E9F6FF' : '#ffffff',
        borderColor: focused ? '#0092FF' : '#E5EAF1',
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        textTransform: 'capitalize',
      };
    },
    secondaryTabStyle: focused => {
      return {
        color: focused ? '#0092FF' : null,
        fontWeight: focused ? '700' : '400',
        backgroundColor: focused ? '#E9F6FF' : '#ffffff',
        fontSize: 14,
        paddingVertical: 10,
        textTransform: 'capitalize',
      };
    },
    tabTextStyle: {
      color: '#2B3348',
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    underLineTabStyle: {
      backgroundColor: '#0092FF',
      borderBottomWidth: 3,
      borderColor: '#0092FF',
    },
    noUnderLineTabStyle: {
      backgroundColor: 'none',
      borderBottomWidth: 0,
      borderColor: 'transparent',
    },

    thumbNail: {
      backgroundColor: 'white',
      marginRight: 10,
      height: 28,
      width: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: '#E5F1FF',
    },
    thumbNailText: {
      fontWeight: '700',
      color: '#004BAC',
    },
    headerText: {
      color: '#fff',
    },
    backButton: {
      color: '#fff',
      fontSize: 24,
      marginLeft: 12,
    },

    tabView: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    leftRemarkContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    rightRemarkContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    bubbleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    bubble: {
      backgroundColor: '#f2f3f8',
      borderRadius: 10,
      padding: 10,
      maxWidth: '80%',
      position: 'relative',
    },
    Rightbubble: {
      backgroundColor: '#4621fe',
      borderRadius: 10,
      padding: 10,
      maxWidth: '80%',
      position: 'relative',
    },
    leftRemarkText: {
      color: activeTheme.Secondary,
      fontSize: 14,
    },
    rightRemarkText: {
      color: activeTheme.White,
      fontSize: 14,
    },
    rightCorner: {
      position: 'absolute',
      bottom: -8,
      right: 10,
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderTopWidth: 10,
      borderTopColor: '#4621fe',
    },
    leftCorner: {
      position: 'absolute',
      bottom: -8,
      left: 10,
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderTopWidth: 10,
      borderTopColor: '#f2f3f8',
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    circleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    phone: {
      fontSize: 14,
      color: '#888',
    },
    address: {
      fontSize: 14,
      color: '#888',
    },

    // Target And Achievement
    TargetContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      elevation: 3,
      margin: 16,
    },
    TargetRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
    },
    TargetLabel: {
      fontSize: 16,
      color: '#444',
    },
    TargetValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    TargetStatusContainerInProgress: {
      backgroundColor: activeTheme.Yellow, // Light yellow background
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
    },
    TargetStatusContainer: {
      backgroundColor: activeTheme.Success, // Light yellow background
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
    },
    TargetStatusText: {
      fontWeight: 'bold',
      color: activeTheme.Dark,
    },
    TargetStatusTextSuccess: {
      fontWeight: 'bold',
      color: activeTheme.Light,
    },

    // point home screen design
    PointHistoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#ffffff', // Adjust background color as needed
    },
    pointContainer: {
      alignItems: 'center',
    },
    pointText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    pointLabel: {
      fontSize: 12,
      color: 'black',
      marginTop: 5,
    },

    // loyalty home screen desgin
    LoayltyHomecontainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F0F0F0', // Adjust background color as needed
    },
    LoayltyHomebuttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    LoayltyHomebuttonContainer: {
      flex: 1,
      alignItems: 'center',
    },
    LoayltyHomesingleButtonContainer: {
      flex: 1,
      alignItems: 'center',
      width: '100%', // Ensures full-width for single-button rows
    },
    LoayltyHomebuttonIcon: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
    LoayltyHomebuttonLabel: {
      fontSize: 14,
      textAlign: 'center',
    },

    // point earning insights
    PointInSightscontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: activeTheme.Light,
    },
    PointInSightspointLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    PointInSightspointLabel: {
      alignItems: 'center',
    },
    PointInSightspointLabelText: {
      color: activeTheme.Light,
      fontSize: 14,
    },

    pieChartDesign: { justifyContent: 'center', flexDirection: 'row', flex: 1 },

    //ProfileScreen
    ProfileScreentitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: activeTheme.Dark,
    },
    ProfileScreenprogressContainer: {
      marginBottom: 20,
    },
    ProfileScreenprogressText: {
      marginBottom: 5,
      fontSize: 14,
    },
    ProfileScreenprogressBar: {
      height: 20,
      borderRadius: 10,
    },
    BadgeScreenprogressBar: {
      height: 20,
      borderRadius: 10,
    },
    ProfileScreenbutton: {
      // backgroundColor: '#F8961E',
      // padding: 15,
      borderRadius: 5,
      marginBottom: 20,
    },
    ProfileScreenbuttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
    },
    ProfileScreenreferralContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ProfileScreenreferralText: {
      marginLeft: 10,
      marginRight: 10,
    },
    ProfileScreenreferralButton: {
      backgroundColor: '#F0F0F0',
      padding: 5,
      borderRadius: 3,
    },
    ProfileScreenreferralButtonText: {
      color: '#007AFF',
    },

    // about us
    AboutUScontainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    AboutUSheaderImage: {
      width: '100%',
      height: 300,
      marginBottom: 20,
    },
    AboutUStitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    AboutUSsubtitle: {
      fontSize: 16,
      marginBottom: 20,
    },

    // social media

    SocialMediaiconBox: {
      width: '45%',
      height: 150,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: activeTheme.lightBorderColor,
      backgroundColor: activeTheme.Light,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 4,
      elevation: 2,
      shadowColor: activeTheme.Dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    SocialMediatext: {
      // marginTop: 5,
      textAlign: 'center',
    },

    // track request
    TrackRequestcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: activeTheme.Dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      marginBottom: 10,
    },
    TrackRequestheader: {
      marginLeft: 10,
    },
    TrackRequestheaderText: {
      fontSize: 14,
      lineHeight: 30,
      color: activeTheme.Dark,
    },
    TrackRequestbody: {
      marginBottom: 8,

      alignItems: 'flex-end',
    },
    TrackRequestbodyText: {
      fontSize: 14,
      color: activeTheme.LightGrey,

    },
    TrackRequestapprovedText: {
      color: activeTheme.Success,
    },
    TrackRequestPendingText: {
      color: activeTheme.Pending,
    },
    TrackRequestRejectText: {
      color: activeTheme.Reject,
    },
    TrackRequestfooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    TrackRequestpointsText: {
      color: activeTheme.Success,
      marginTop: 15,
      fontWeight: 'bold',
      fontSize: 16,
    },
    TrackRequestthumbsUpIcon: {
      color: activeTheme.Light,
      fontSize: 14,
    },

    // gift Gallery
    GiftGallerycontainer: {
      flex: 1,
      // backgroundColor: '#fff',
      alignItems: 'center',

      justifyContent: 'center',
    },
    GiftGallerybalanceContainer: {
      alignItems: 'center',
      marginBottom: 10,
      padding: 20,
    },
    GiftGallerybalanceText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: activeTheme.Light,
    },
    GiftGallerycircle: {
      width: 100,
      height: 100,
      borderRadius: 75,
      backgroundColor: activeTheme.LinkClr,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    GiftGallerypointsText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: activeTheme.Light,
    },
    GiftGallerypointsLabel: {
      fontSize: 14,
      color: activeTheme.Light,
    },
    GiftGalleryrewardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      flex: 1,
    },
    GiftGalleryrewardItem: {
      // width: '45%',
      marginBottom: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      margin: 10,
    },
    GiftGalleryrewardImage: {
      width: '100%',
      height: 80,
      alignSelf: 'center',
    },
    GiftGalleryrewardDetails: {
      alignItems: 'center',
      marginTop: 10,
    },
    GiftGalleryrewardTitle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    GiftGalleryrewardPoints: {
      fontSize: 12,
    },
    GiftGalleryInactive: {
      opacity: 0.6,
      backgroundColor: '#f5f5f5',
    },

    resendButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    resendButtonText: {
      color: '#fff',
      textAlign: 'center',
    },

    // siteDetail Image Uploads
    uploadDocContainer: {
      marginTop: 16,
      marginHorizontal: 5,
    },
    uploadDocTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
    },
    imageList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    uploadedImage: {
      width: 100,
      height: 100,
      margin: 8,
    },
    imgContainer: {
      padding: 2,
      margin: 4,
      borderRadius: 10,
      backgroundColor: '#EDEDED',
    },

    robotoCondensed: {
      fontFamily: 'RobotoCondensed-Regular',
      fontSize: 24,
    },
    roboto: {
      fontFamily: 'Roboto-Regular',
      fontSize: 24,
    },

    // featuregrid
    FeatureGridcontainer: {
      flexDirection: 'row',
      // justifyContent: "center",
      justifyContent: 'flex-start',
      gap: 3,
      // padding: 10,
      marginTop: 8,
      paddingTop:10,
      flexWrap: 'wrap',
      backgroundColor: '#f0f0f0',
      borderRadius:10,
      elevation:5,

    },
    FeatureGridcard: {
      width: '24%',
      // alignItems: 'center',
      // backgroundColor: 'white',
      // borderRadius: 8,
      // padding: 10,
      // elevation: 2,
      marginVertical: 5,
    },
    FeatureGridicon: {
      width: 40,
      height: 30,
    },
    FeatureGridtext: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000',
      overflow:'visible',
      marginVertical:5,
    },
    // refer and earn
    ReferAndEarncontainer: {
      backgroundColor: '#FFF7c5', // Light cream background
      paddingHorizontal: 10,
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ReferAndEarntextContainer: {
      alignItems: 'center',
    },
    ReferAndEarntitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    ReferAndEarnsubtitle: {
      fontSize: 16,
      color: '#000',
      textAlign: 'center',
    },
    ReferAndEarnsubtitleBold: {
      fontSize: 16,
      color: activeTheme.Dark,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    ReferAndEarnimageContainer: {
      // flexDirection: 'row',
      alignItems: 'center',
    },
    ReferAndEarnphoneImage: {
      width: 140,
      height: 200,
      resizeMode: 'contain',
    },
    ReferAndEarncoinsImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      position: 'absolute',
      right: -50,
      bottom: -20,
    },
    ReferAndEarnbutton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: activeTheme.themeColor, // WhatsApp green
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 30,
      marginTop: 20,
    },
    ReferAndEarnicon: {
      // width: 20,
      // height: 20,
      marginRight: 10,
      resizeMode: 'contain',
    },
    ReferAndEarnbuttonText: {
      fontSize: 16,
      color: '#FFF',
      fontWeight: 'bold',
    },
    // tab bar navigation
    tabVisible: {
      display: 'flex',
    },
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: '#FFFFFF', // Change to a neutral color for better visibility
      height: 50, // Increase height for better touch targets
      paddingHorizontal: 10, // Add horizontal padding
      paddingBottom: 3, // Add padding for rounded corners and spacing
      borderTopWidth: 1, // Subtle border for separation
      borderTopColor: '#E0E0E0', // Light grey for a clean look
      borderRadius: 15, // Rounded corners
      elevation: 5, // Elevation for shadow
      shadowColor: '#000', // Shadow color
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1, // Subtle shadow for depth
      shadowRadius: 10,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    tabHidden: {
      display: 'none',
    },

    // Modal
    dialogText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'left',
      marginBottom: 10,
    },
    pendingText: {
      color: '#FF4500',
      fontWeight: 'bold',
    },
    approvedText: {
      color: '#008000',
      fontWeight: 'bold',
    },
    phoneText: {
      color: '#0000FF',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    buttonContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    button: {
      // backgroundColor: '#007BFF',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },

    // loyalty home
    chartContainer: {
      position: 'relative',
      alignItems: 'center',
    },
    totalText: {
      position: 'absolute',
      textAlign: 'center',
      top: '40%',
      fontSize: 16,
      fontWeight: 'bold',
    },
    legendContainer: {
      marginTop: 20,
      width: '100%',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    legendColor: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      marginRight: 10,
    },
    legendText: {
      fontSize: 14,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    colorSquare: {
      width: 20,
      height: 20,
      borderRadius: 5,
      marginRight: 10,
    },
    labelText: {
      fontWeight: 'bold',
    },

    // loading
    loadingOverlay: {
      position: 'absolute',
      top: 0, bottom: 0,
      left: 0, right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      justifyContent: 'center', alignItems: 'center',
    },

    // update available
    updateContainer: {
      justifyContent: 'center',
      backgroundColor: '#e8f4f8',
      borderRadius: 8,
      padding: 16,
      height:'100%',
    },
    updateHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    updateText: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 15,
      color: '#444',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    cancelButton: {
      backgroundColor: '#cccccc',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    updateButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'black',
      fontWeight: '500',
    },

  });
};

export default GlobelStyle;
