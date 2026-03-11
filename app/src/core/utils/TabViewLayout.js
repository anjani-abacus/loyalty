import { Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBarLayout } from './Constant';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useRef, useState } from 'react';

const style = StyleSheet.create(
    {
        tabView: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

        },

    });

const TabViewLayout = ({ renderTabBar, initialIndex, renderScene, routes }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(initialIndex);
    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index:index, routes }}
            renderScene={(props) => renderScene({ ...props, focused: routes[index]?.key === props.route.key })}
            onIndexChange={(newIndex) => {
                setIndex(newIndex);
            }}
            initialLayout={{ width: layout.width }}
            style={style.tabView}
            lazy={true} // Enable lazy rendering
            lazyPreloadDistance={initialIndex || 0} // Preload only the current tab

        />
    );

};
export default TabViewLayout;
