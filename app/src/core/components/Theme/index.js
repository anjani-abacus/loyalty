import { ImageBackground, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import RadioChecked from '../../assets/icons/RadioChecked.svg';
import RadioUnchecked from '../../assets/icons/RadioUnchecked.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import useTheme from './useTheme';




export const RadioButton = ({direction = 'column', style = {}, preferenceSectionStyle = {}, optionWrapperStyle = {}, options, selectedOption, onSelect, navigation }) => {
  const activeTheme = useTheme();

  const styles = StyleSheet.create({
  active: {
    color: activeTheme.text,
  },
  optionsWrapperHorizontal:{
    flexDirection: 'row',
    ...optionWrapperStyle,
  },
  preferenceSection: {
    padding: 20,
    backgroundColor: '#fff',
    ...preferenceSectionStyle,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...(direction == 'column' && {paddingVertical: 20}),
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  ...style,
});

  const GlobelStyle = useGlobelStyle();
  return <ScrollView style={[{backgroundColor:activeTheme?.maincontainer}]}>
    <View style={[styles.preferenceSection, {backgroundColor:activeTheme.section, marginTop:10}]}>
      <View style={(direction == 'horizontal' && styles.optionsWrapperHorizontal)}>
        {options?.map((option, i)=><TouchableOpacity key={i} style={styles.option} onPress={()=>{onSelect(option);}}>
          <View style={[GlobelStyle.flexDirectionRow, {gap:10}]}>
            <Text style={[styles.optionText, styles.active]}>{option}</Text>
          </View>
          {
            selectedOption == option ?
            <RadioChecked width={20} height={20} fill={activeTheme.text} /> :
            <RadioUnchecked width={20} height={20} fill={activeTheme.text} />
          }
        </TouchableOpacity>)}
      </View>
    </View>
  </ScrollView>;
};

const Theme = () => {
  const options = ['dark', 'light'];
  const {theme, toggleTheme} = useContext(ThemeContext);
  return <RadioButton
            options={options}
            selectedOption={theme}
            onSelect={toggleTheme}
          />;
};

export default Theme;
