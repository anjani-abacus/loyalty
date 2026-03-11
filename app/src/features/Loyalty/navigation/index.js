import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import StackNavigation from './StackNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

const linking = {
  prefixes: ['com.basiq360.starkpaints.dev://'], // custom scheme
  config: {
    screens: {
      Main: {
        screens: {
          LoyaltyGiftGallery: 'LoyaltyGiftGallery',
          UpdateProfile: {
            path: 'UpdateProfile/:formType',
            parse: {
              formType: (formType) => `${formType}`, // optional, ensures string
            },
          },
          ProductList: 'ProductList',
        },
      },
    },
  },
};

const Drawerstack = createDrawerNavigator();
const LoyaltyNavigator = () => {
  return <NavigationContainer linking={linking} independent={true}>
    <Drawerstack.Navigator

      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType="slide"
      screenOptions={{
        drawerStyle: {
          width: 350,
        },
        headerShown: false,
      }}
    >
      <Drawerstack.Screen name="Main" component={StackNavigation} />
    </Drawerstack.Navigator>
  </NavigationContainer>;
};

export default LoyaltyNavigator;
