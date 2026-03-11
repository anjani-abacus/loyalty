import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: '#999',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',

    },
    topCard: {
        flex: 1,
        // backgroundColor: '#969cf3'
    },
    firstCard: {
        transform: [{ scale: 1.1 }],
    },

    position: {
        height: 28,
        width: 28,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 162, 0, 1)',
        marginBottom: -15,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 22,
    },
    topTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    topSubTitle: {
        fontSize: 14,
        color: '#ccc',
    },
    sectionDivider: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    selfItem: {
        backgroundColor: 'rgba(255, 162, 0, 1)',
    },
    headerRow: {
        backgroundColor: '#F3F3F3',
        borderRadius: 30,
    },
    headerText: {
        color: '#A5A5A5',
        fontSize: 14,
        fontWeight: 'bold',


    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarWrapper: {

    },
    listAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        justifyContent:'center',
        backgroundColor:'#EFF4FA',
        alignItems:'center',
    },
    listUserInfo: {
    },
    listUserName: {

        color: '#000000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    listUserHandle: {
        color: '#64748B',
        fontSize: 13,
        marginBottom: 2,
    },
    listCategory: {
        color: '#3B82F6',
        fontSize: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    listPoints: {
        color: '#1E293B',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
});
