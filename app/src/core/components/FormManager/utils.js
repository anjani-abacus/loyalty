import { Text } from 'react-native';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
export const RenderLabel = ({ value, label }) => {
  const GlobelStyle = useGlobelStyle();
  if (value) {
    return (
      <Text style={[GlobelStyle.label]}>
        {label}
      </Text>
    );
  }
  return null;
};
