import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Caption } from 'react-native-paper';
import useActiveTheme from '../Theme/useActiveTheme';

const AppDropdown = ({
  //   field: {name, value}, // field contains value and name from Formik
  form, // form contains Formik helpers like setFieldValue, errors, touched
  label,
  name,
  data,
  placeholder,
  labelField,
  valueField,
  mode,
  search,
  setSelectedItem,
  disabled,
  dropDownType,
  isRequired,
  isMultiple = false,
  onChange,
}) => {
  mode = data.length > 6 ? 'modal' : 'default';
  search = data.length > 6 ? true : false;
  const { setFieldValue, errors, touched, values } = form;
  const [isFocus, setIsFocus] = useState(false);
  const activeTheme = useActiveTheme();
  const renderLabel = () => {
    if (values[name] || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: activeTheme.Dark }]}>
          {label}
          {isRequired && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      );
    }
    return null;
  };
  const selectedStyle = () => {
    return <Icon color="green" name="check" size={17} />;
  };

  return (
    <View style={styles.container}>
      {isMultiple ? (
        <>
          <MultiSelect
            disable={disabled}
            data={data}
            mode={mode || 'default'}
            labelField={labelField}
            valueField={valueField}
            placeholder={
              !isFocus
                ? values[name].length > 0
                  ? placeholder + ' ( ' + values[name].length + ' )'
                  : placeholder + (isRequired ? ' *' : '')
                : data.length <= 0
                  ? 'No Data Available'
                  : '...'
            }
            value={values[name]}
            style={[
              dropDownType == 'underLine'
                ? styles.underLineDropdown
                : styles.dropdown,
            ]}
            search={search}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemContainerStyle={{
              marginHorizontal: 12,
              borderRadius: 10,
              marginVertical: 4,
            }}
            activeColor={activeTheme.backgroundPrimary}
            searchPlaceholder="Search..."
            containerStyle={{
              width: mode == 'modal' ? ScreenWidth : 330,
              height: mode == 'modal' ? ScreenHeight : null,

              elevation: 6,
            }}
            maxHeight={300}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              const selectedValue = item;
              setFieldValue(name, selectedValue);
              setIsFocus(false);
              if (onChange) {
                onChange(selectedValue, setFieldValue);
              }
              if (setSelectedItem) {setSelectedItem(item);}
            }}
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>
                    {item[labelField]}
                  </Text>
                  <Icon
                    color="white"
                    name="close"
                    style={{
                      backgroundColor: 'black',
                      borderRadius: 22,
                      padding: 4,
                    }}
                    size={10}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          {isRequired && errors[name] && touched[name] && (
            <Caption style={styles.errorText}>{errors[name]}</Caption>
          )}
        </>
      ) : (
        <>
          {renderLabel()}

          <Dropdown
            disable={disabled}
            data={data}
            mode={mode || 'default'}
            labelField={labelField}
            valueField={valueField}
            placeholder={
              !isFocus
                ? placeholder + (isRequired ? ' *' : '')
                : data.length <= 0
                  ? 'No Data Available'
                  : '...'
            }
            value={values[name]}
            style={[
              dropDownType == 'underLine'
                ? styles.underLineDropdown
                : styles.dropdown,
            ]}
            search={search}
            itemTextStyle={{ color:activeTheme.Black }}
            placeholderStyle={styles.placeholderStyle}
            activeColor={activeTheme.backgroundPrimary}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            searchPlaceholder="Search..."
            containerStyle={{
              width: mode == 'modal' ? ScreenWidth : 330,
              height: mode == 'modal' ? ScreenHeight : null,

              elevation: 6,
            }}
            maxHeight={300}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              const selectedValue = item[valueField];
              setFieldValue(name, selectedValue);
              if (onChange) {
                onChange(selectedValue, setFieldValue, item);
              }
              setIsFocus(false);
              if (setSelectedItem) {setSelectedItem(item);}
            }}
          />

          {isRequired && errors[name] && touched[name] && (
            <Caption style={styles.errorText}>{errors[name]}</Caption>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },

  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 12,
  },

  container: {
    paddingVertical: 1,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  underLineDropdown: {
    width: '100%',
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,

    paddingHorizontal: 18,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 5,
    bottom: 42,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
    marginLeft:16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: '#ebebeb',
    marginHorizontal: 12,
  },
});

export default AppDropdown;
