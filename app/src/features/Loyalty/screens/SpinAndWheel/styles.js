import { Dimensions, StyleSheet } from 'react-native';

const styles = (wheelSize) => {
    return StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  spinInnerContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: 'rgba(243, 157, 9, 0.15)',
    // borderRadius: 30,
    // borderTopColor:'#f39e09',
    // borderLeftColor:'#f39e09',
    // borderRightColor:'#f39e09',
    // borderTopWidth:3,
    // borderLeftWidth:2,
    // borderRightWidth:2
  },
  wheelBorder: {
    width: wheelSize + 20, // Slightly larger than the wheel for border effect
    height: wheelSize + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    position: 'absolute',
    width: 60,
    height: 70,
    top: '40%',
    left: '50%',
    marginLeft: -15, // half of width
    marginTop: -22,  // half of height
    zIndex: 10,
  },
  wheelContainer: {
    width: wheelSize,
    height: wheelSize,
  },
  pointer: {
    position: 'absolute',
    top: '35%',
  },
  spinButton: {
    marginTop: 30,
    borderColor: '#000',
    borderRadius: 35,
    flexDirection: 'row',
    paddingVertical: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#facf80',
  },
  spinButtonText: {
    color: '#facf80',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Dancing Script',
    textAlign: 'center',
  },
  winTitle: {
    color: '#fff',
    fontSize: 48,
  },
  activeColor: {
    color: '#cbb67e',
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  topBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
  },
  coinContainer: {
    alignItems: 'center',
  },
  coinIcon: {
    marginBottom: -7,
  },
  coinValueBox: {
    backgroundColor: '#000',
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f39e09',
    borderRadius: 10,
  },
  coinText: {
    color: '#f8cf88ff',
    fontSize: 14,
    paddingHorizontal:10,
    fontWeight: 'bold',
  },
  spinButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    height:5,
    width:5,
    borderRadius:4,
    backgroundColor:'#666',
    marginRight: 6,
  },
  offersHeader:{
    paddingHorizontal:10,
  },
  link:{
    textDecorationLine:'underline',
    color:'#00f',
    fontSize:12,
  },
  offerTitle:{
    fontWeight:'bold',
    color:'#888',
    borderBottomColor:'#ccc',
    borderBottomWidth:2,
  },
  subTitle:{
    fontWeight:'bold',
    fontSize:12,
    marginTop:10,
  },
  listWrapper:{
    paddingHorizontal:10,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10,
  },
  itemText:{
    fontSize:14,
    color:'#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    bottom: 10,
    left: '45%',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlayTextWrapper: {
    position: 'absolute',
    top: '25%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlaySubText: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
});
};
export default styles;
