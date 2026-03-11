import {TabBar} from 'react-native-tab-view';
import useActiveTheme from '../core/components/Theme/useActiveTheme';
import {t} from 'i18next';
import React, {useEffect} from 'react';
import {useState} from 'react';
import TeamList from '../components/TeamList';
import {MY, TEAM} from './Constant';
import {useWindowDimensions} from 'react-native';

const ROUTES_LIST = [
  {key: MY, title: 'My' + ' ' + 'Followup'},
  {key: TEAM, title: 'Team' + ' ' + 'Followup'},
];

const TeamRoutes = () => {
  const [routes] = React.useState(ROUTES_LIST);
  return routes;
};

const renderTabBar = props => {
  const [index, setIndex] = React.useState(0);
  const [modeFilter, setModeFilter] = useState('My');
  const layout = useWindowDimensions();

  const activeTheme = useActiveTheme();

  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: activeTheme.themeColor,
        borderBottomWidth: 3,
        borderColor: activeTheme.themeColor,
      }}
      style={{backgroundColor: '#fff'}}
      labelStyle={{
        color: '#2B3348',
        fontWeight: '600',
        textTransform: 'capitalize',
      }}
      activeColor={activeTheme.themeColor}
      scrollEnabled
      tabStyle={{width: layout.width / 2}}
    />
  );
};

const TeamRenderScene = ({route}) => {
  switch (route.key) {
    case MY:
      return (
        <TeamList
        // selectionHandler={selectionHandler} // to get selected user pass a usestate function
        />
      );
    case TEAM:
      return (
        <TeamList
        // selectionHandler={selectionHandler} // to get selected user pass a usestate function
        />
      );
    default:
      return null;
  }
};

export default renderTabBar;
export {TeamRenderScene, TeamRoutes};
