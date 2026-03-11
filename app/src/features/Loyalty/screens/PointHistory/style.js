import { StyleSheet } from 'react-native';
import useTheme from '../../../../core/components/Theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
    const activeTheme = useTheme();
    const insets = useSafeAreaInsets();

    return StyleSheet.create({
    innerView: {
        flex: 1,
        padding: 10,
        backgroundColor:'#FCF8FF',
        paddingBottom:insets.bottom,
    },
    blockTitle:{
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 10,
        color: activeTheme.text,
    },
    flex: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    justifyBetwen: {
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent:'center',
        alignItems:'center',
    },
    subHeaderText: {
        fontSize: 14,
    },
    boldSubHeader: {
        fontWeight: 'bold',
        color: '#2544B9',
    },
    inputWrapper: {
        marginTop: 10,
    },
    inputSection: {
        marginBottom: 10,
    },
    inputBlock: {
        borderColor: '#D3D3D3',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 6,
        height: 50,
    },
    errorText: {
        color: '#EB3B3B',
        fontSize: 12,
    },
    flex1: {
        flex: 1,
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    filledBtn: {
        flex: 1,
        alignItems: 'center',
    },

    buttonBg:{
        backgroundColor: '#FFA000',
        borderColor: '#FFA000',
    },

    disabledButton:{
        backgroundColor: '#ccc',
        borderColor: '#ccc',
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
    },

    arrowIcon: {
        height: 40,
        width: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upsideIcon: {
        backgroundColor: '#DCFCE7',
        borderWidth:1,
        borderColor:'#b1facaff',
    },
    downsideIcon: {
        backgroundColor: '#F9E2E2',
        borderWidth:1,
        borderColor:'#fbc1c1ff',
    },
    pointsWrapper: {
        padding: 10,
    },
    pointTitle: {
        color: activeTheme.text,
        fontWeight:'500',
        fontSize: 18,
    },
    pointValue: {
        color: activeTheme.text,
        fontWeight: 'bold',
        fontSize: 14,
        borderRadius:16,
    },
    container: {
        padding: 16,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth:1,
        borderColor:'#d8d7d7ff',
    },
    Creditline: {
        width: 4,
        height: '100%',
        backgroundColor: '#4caf50', // Green line
        borderRadius: 2,
    },
    DebitLine: {
        width: 4,
        height: '100%',
        backgroundColor: '#fc141f', // Green line
        borderRadius: 2,
    },
    content: {
        alignItems: 'flex-start',
        marginLeft: 10,
        flex: 1,
        paddingRight: 10,
    },
    text: {
        fontSize: 12,
        color: activeTheme.text,
    },
    Creditpoints: {
        // backgroundColor: '#DCFCE7',
        textAlign: 'center',
        borderRadius: 15,
        fontSize: 16,
        color: '#53AB58',
        fontWeight: 'bold',
        paddingVertical: 2,
        paddingHorizontal: 15,
    },
    DebitPoints: {
        // backgroundColor: '#F9E2E2',
        textAlign: 'center',
        borderRadius: 15,
        fontSize: 16,
        color: '#FF2524',
        fontWeight: 'bold',
        paddingVertical: 2,
        paddingHorizontal: 15,
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop:8,
    },
    block:{
        backgroundColor:'#fff',
        borderRadius:3,
        borderWidth:0.2,
        borderColor:'#aaa',
        padding:4,
        flex:1,
    },
    blockValue:{
        fontSize:18,
        fontWeight:'bold',
    },

    redeemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  inputSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  inputBlock: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  calculationBox: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32', // green highlight
  },
});
};
export default useStyles;
