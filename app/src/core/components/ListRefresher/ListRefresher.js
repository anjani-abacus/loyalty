import React from 'react';
import {RefreshControl} from 'react-native';
import AppTheme from '../Theme/AppTheme';

export default function ListRefresher({refreshing, onRefresh}) {
  return <RefreshControl colors={[AppTheme.Danger]} refreshing={refreshing} />;
}
