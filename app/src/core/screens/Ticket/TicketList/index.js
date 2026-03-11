import React, { useEffect } from 'react';
import { View } from 'react-native-animatable';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import Tickets from './Tickets';
import { useIsFocused } from '@react-navigation/native';
import { TabBarLayout } from '../../../../core/utils/Constant';

//ENUMS
const ROUTES_LIST = [
  { key: 'PENDING', title: 'Pending' },
  { key: 'CLOSED', title: 'Closed' },
];


const TicketList = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState(ROUTES_LIST);
  const isFocused = useIsFocused();

  const renderScene = ({ route }) => {

    switch (route.key) {
      case 'PENDING':
        return (
          <Tickets key={route.key} navigation={navigation} status={'PENDING'} />
        );
      case 'CLOSED':
        return (
          <Tickets key={route.key} navigation={navigation} status={'CLOSED'} />
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBarLayout props={{ ...props }} tabWidth={2} />
  );
  useEffect(() => {
    setIndex(0);
  }, [isFocused]);


  return (
    <>
      <View style={[Style.tabViewContainer]}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
          initialLayout={{ width: '100%' }}
          style={Style.tabView}
        />
      </View>
    </>
  );
};

const Style = StyleSheet.create({
  tabViewContainer: {
    height: '100%',
  },
  tabView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default TicketList;
