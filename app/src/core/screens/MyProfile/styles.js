import { StyleSheet } from 'react-native';
import useTheme from '../../components/Theme/useTheme';

export const useStyles = () => {
  const activeTheme = useTheme();
  return StyleSheet.create({
    imageWrapper: {
        height: 80,
        width: 80,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80,
        backgroundColor: '#D9D9D9',
    },
    container: {
        // padding: 20,
        marginBottom:-50,
        backgroundColor: activeTheme.PrimaryBg,
    },
    userName: {
        fontSize: 24,
        // Test Abacus Desk
        color: 'white', fontSize: 18, fontFamily: 'Inter', fontWeight: 'bold', wordWrap: 'break-word',
    },
    designation: {
        // Carpenter
        marginVertical:7,
        color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word',
    },
    pending:{
        flexDirection:'row',
        gap:5,
        paddingHorizontal:10,
        paddingVertical:3,
        color:'#FFA000',
        fontWeight:'bold',
        background: 'rgba(95, 198, 95, 0)',
        borderRadius: 100,
        borderColor: '#FFA000',
        borderWidth:1},
        pendingText:{
          color:'#FFA000',
          fontWeight:'bold',
        },
    verified:{
        flexDirection:'row',
        gap:5,
        paddingHorizontal:10,
        paddingVertical:3,
        color:'#fff',
        fontWeight:'bold',
        background: 'rgba(95, 198, 95, 0)',
        borderRadius: 100,
        borderColor: '#57E581',
        borderWidth:1},
    verifiedText:{
        color:'#fff',
        fontWeight:'bold',
    },
    tabView: {
    backgroundColor: activeTheme.maincontainer,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});};

export const sectionStyles = () => {
  const activeTheme = useTheme();
  return StyleSheet.create({
  editIcon:{
    // borderWidth:1,
    // borderColor:'#004CAC',
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:5,
    gap:5,
    flexDirection:'row',
  },
  image:{
    height:20,
    width:20,
  },
  editIconText:{
    color:'#004CAC',
    fontWeight:'bold',
  },
    tabView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height:330,
  },
  container: {
    padding: 16,
    backgroundColor: activeTheme.section,
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: activeTheme.section,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: activeTheme.text,
  },
  referralHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: activeTheme.text,
  },
  referralLabel: {
    fontSize: 13,
    color: '#000',
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: activeTheme.text,
    marginTop: 4,
  },
  ruler: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    marginLeft: 8,
  },
  copyBtn: {
    marginLeft: 10,
    color:'#fff',
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#e5e7eb', // Tailwind gray-200
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#999',
    fontSize: 13,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 4,
  },
});};
