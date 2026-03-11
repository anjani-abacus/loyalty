import { StyleSheet } from 'react-native';


const AttedanceStyle = StyleSheet.create({
    // skeleton
    skeletonDate: {
        backgroundColor: '#eee',
        width: 70,
        height: 25,
        borderRadius: 3,
    },
    innerRow: {
        width: '100%',
        height: 25,
        borderRadius: 3,
    },
    skeletonDateOn: {
        backgroundColor: '#eee',
        width: 100,
        height: 25,
        borderRadius: 3,
    },
    skeletonDetailIcon: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 50,
    },
    piechart: {
        height: 80,
        width: 80,
        borderRadius: 50,
    },

    // list
    marginHorizontal: {
        marginHorizontal: 15,
    },
    calendarIcon: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: '700',
    },

    alignBottom: {
        alignItems: 'flex-end',
    },
    filterButtons: {
        borderRadius: 50,
        width: 100,
        borderWidth: 1,
        borderColor: '#aaa',
        marginHorizontal: 5,
    },
    analyticChartBox: {
        margin: 15,

        borderRadius: 10,
        padding: 5,
        elevation: 2,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },

    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },

    closebtn: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'flex-end',
    },
    detailIcon: {
        backgroundColor: '#dcf0ff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 50,
    },
    label: {
        color: '#2B3348',
        fontWeight: '200',
        fontSize: 12,
    },
    hoursDetails: {
        fontSize: 12,
        fontWeight: '700',
    },
    dayName: {
        fontSize: 12,
        fontWeight: '700',
        color: '#777',
    },

    listCard: {
        // borderRadius: 5,
        borderRadius: 10,
        elevation: 1,
        marginBottom: 10,
        padding: 15,
    },

    // analyticsHighlights
    infoBtn: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    chartBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33.33%',
    },
    chartTitle: {
        fontSize: 12,
        fontWeight: '700',
    },
    chartWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        flexWrap: 'wrap',
        rowGap: 20,
    },
    card: {
        marginHorizontal: 12,
        marginVertical: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 8,
        elevation: 6,
    },

    // detail box

    userDetailBox: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#004BAC',
        alignItems: 'center',
    },
    userNameTile: {
        borderRadius: 50,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5F1FF',
        marginRight: 10,
    },
    userNameTileText: {
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    userDetail: {
        flex: 1,
    },
    userName: {
        fontWeight: '700',
        fontSize: 14,
        color: '#fff',
    },
    userContact: {
        color: '#ddd',
        fontSize: 12,
    },
    detailIcon: {
        color: '#fff',
        fontSize: 24,
    },

    // card options

    optionsWrapper: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    modal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 10,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E5EAF1',
        paddingVertical: 18,
    },
    optionIcon: {
        fontSize: 16,
        color: '#E5EAF1',
        marginRight: 10,
    },
    optionText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700',
    },
    optionContact: {
        color: '#888',
        fontSize: 12,
    },
    activeOptionIcon: {
        color: '#23CE6B',
    },
    goIcon: {
        color: '#0092FF',
        fontSize: 24,
    },
    thumbNail: {
        marginRight: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#E5F1FF',
    },
    thumbNailText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#004BAC',
    },
    sheetCloseBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
    },
    sheetCloseIcon: {
        fontSize: 24,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#F8F8F8',
        padding: 10,
        borderRadius: 5,
    },
    searchInput: {
        backgroundColor: '#F8F8F8',
        padding: 0,
        flex: 1,
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 10,
    },

    // skeleton Card for redeem Points
    container: {
        flex: 1,
        marginBottom: 20,
    },
    topContainer: {
        marginBottom: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    rewardItem: {
        width: '48%',
        marginBottom: 10,
    },

    container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#004dac',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    // backgroundColor: '#004dac',
    // borderWidth: 2,
    // paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flex: 1,
  },

  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 44,
    backgroundColor: '#fff',
    marginBottom: 10,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#ffff',
    elevation: 6,
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileStatus: {

    fontSize: 16,
    color: '#cecece',
    marginBottom: 8,

  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,

    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    // borderWidth: 2,
    // height: '100%',
    flex: 1,
  },
  detailsContainerSkeleton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    height: '100%',
    // flex: 1
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#9e9e9e',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  skeletonDateOn: {
    backgroundColor: '#eee',
    width: 250,
    height: 25,
    borderRadius: 3,
  },

  appVersion: {
    fontSize: 13,
    color: '#343434',
    textAlign: 'center',
    fontWeight: '700',
  },

  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 16,
  },
  imageContainer2: {
    flexDirection: 'row',
    marginBottom: 16,
    zIndex: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    zIndex: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
    borderRadius: 50,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    // paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetOnModal: {
    position: 'absolute',
    left: 50,
    top: 40,
    zIndex: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  bottomSheetItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bottomSheetText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cancelButton: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bottomSheetOnModalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bottomSheetOnModalText: {
    fontSize: 14,
    textAlign: 'center',
  },
  cancelOnModalButton: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  dealerAddNewButton: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    backgroundColor: '#004BAC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    opacity: 1,
    zIndex: 13,
  },
  addNewButtonText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  // document Information

  Documentcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 12,
  },
  documentImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  label: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 4,
  },

  // bank Information
  BankInformationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  heading1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  value1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  imageContainer1: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginTop: 12,
  },
  bankImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },

  messageContainer: {
    backgroundColor: '#fff',
    // backgroundColor: '#d4e9ff',
    borderRadius: 10,
    padding: 10,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
});
export default AttedanceStyle;
