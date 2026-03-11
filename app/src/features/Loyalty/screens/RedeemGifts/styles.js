import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    headerSection:{
        // padding:10
    },
    tabView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex:1,
  },
  layoutWrapper:{
    paddingHorizontal:15,
    flex:1,
    paddingTop:10,
  },
    card:{
        backgroundColor:'#3a459c',
        paddingHorizontal:10,
        paddingBottom:10,
        height:200,
    },
    text:{
        color:'#fff',
    },
    smallTxt:{
        fontSize:12,
    },
    subHeader:{
        fontWeight:'bold',
        fontSize:16,
    },
    brown:{
        color:'#cf9188',
    },
    pointValue:{
        fontSize:42,
        color:'#FFD700',
        fontWeight:'bold',
    },
    typeTag:{
        backgroundColor:'rgba(255, 215, 0, 0.1)',
        borderRadius:4,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#FFD700',
        height:28,
        alignItems:'center',
        gap:5,
        padding:3,
    },
    typeTagText:{
        fontWeight:'bold',
        color:'#FFD700',
    },
});
