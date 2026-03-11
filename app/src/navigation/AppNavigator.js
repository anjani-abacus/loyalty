import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoyaltyNavigator from '../features/Loyalty/navigation';
// import DmsNavigator from '../features/Dms/navigation';
// import SfaNavigator from '../features/Sfa/navigation';
import { AuthContext } from '../auth/AuthContext';
const AppNavigator = () => {
  const {loginType} = useContext(AuthContext);
  return <NavigationContainer independent={true}>
    {/* {
    (loginType == 'DMS') ? <DmsNavigator/> :
    (loginType == 'SFA') ? <SfaNavigator/> :
    (loginType == 'Loyalty') ? <LoyaltyNavigator/> :  */}
    <LoyaltyNavigator/>
    {/* } */}
  </NavigationContainer>;
};

export default AppNavigator;
