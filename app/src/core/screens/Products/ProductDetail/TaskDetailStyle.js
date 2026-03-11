import { StyleSheet } from 'react-native';

const TaskDetailStyle = StyleSheet.create({
    cardHeader:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#f2f2f2',
        justifyContent:'space-between',
        borderStyle:'dashed',
        alignItems:'stretch',

    },
    totalCardTileBox:{
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#ccc',
        backgroundColor:'#fff',
        justifyContent:'space-between',
        alignItems:'stretch',

    },
    rightBorder:{
        borderRightWidth:2,
        borderColor:'#ccc',
    },
    flexItem:{
        paddingRight:6,
        paddingLeft:6,
        flexGrow:1,
    },
    callIcon:{
        backgroundColor:'#fff',
        borderBottomLeftRadius:10,
        padding:2,
        // marginRight:-5
    },
    cardBox:{
        borderRadius:4,
        backgroundColor:'#fff',
    },
    cardContent:{
        paddingVertical:20,
    },
    cardFooter:{
        flexDirection:'row',
        alignItems:'center',
        gap:15,
    },
    tilesBox:{
        flexWrap:'wrap',
        flexDirection:'row',
        alignItems:'center',
        gap:3,
        justifyContent:'flex-start',
    },
    tile:{
        backgroundColor:'#f2f2f2',
        paddingHorizontal:6,
        paddingVertical:5,
        borderRadius:4,
    },
    footerTile:{
        backgroundColor:'#f2f2f2',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:4,
    },

    approved:{
        color:'green',
    },
    pending:{
        color:'orange',
    },
    uploadedBill:{
        height:100,
        width:100,
        borderRadius:4,
        backgroundColor:'#fff',
        padding:4,

    },


});

export default TaskDetailStyle;
