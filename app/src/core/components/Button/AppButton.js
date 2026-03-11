import React from 'react';
import {Button} from 'react-native-paper';
import useActiveTheme from '../Theme/useActiveTheme';

export default function AppButton({
  mode,
  title,
  onPress,
  type,
  disabled,
  loading,
  style = {},
  color,
  icon,
}) {
  const activeTheme = useActiveTheme();
  return (
    <Button
      mode={mode}
      type={type}
      loading={loading}
      disabled={disabled}
      style={[{borderRadius: 8, paddingHorizontal: 8}, style]}
      onPress={onPress}
      labelStyle={{letterSpacing: 0, color: activeTheme.White}}
      buttonColor={color}
      icon={icon}>
      {title}
    </Button>
  );
}
