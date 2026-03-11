
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react';
import { Caption } from 'react-native-paper';
import { FastField } from 'formik';
import { View } from 'react-native';
import AppTextInput from '../../core/components/TextInput/AppTextInput';

export const FormikDropdown = React.memo(
  ({
    name,
    label,
    data,
    labelField,
    valueField,
    placeholder,
    style,
    textStyles,
    errorStyles,
    onChangeExtra,
  }) => {
    return (
      <FastField name={name}>
        {({ field, form, meta }) => {
          const showError = meta.touched && meta.error;

          return (
            <View style={style?.container}>
              <Dropdown
                style={style?.dropdown}
                placeholderStyle={style?.placeholderStyle}
                selectedTextStyle={textStyles?.selectedTextStyle}
                inputSearchStyle={style?.inputSearchStyle}
                iconStyle={style?.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField={labelField}
                valueField={valueField}
                placeholder={placeholder}
                searchPlaceholder="Search..."
                value={field.value}
                onChange={(item) => {
                  form.setFieldValue(name, item[valueField]);
                  if (onChangeExtra) {onChangeExtra(item);}
                }}
              />
              {showError && <Caption style={errorStyles}>{meta.error}</Caption>}
            </View>
          );
        }}
      </FastField>
    );
  }
);



export const FormikTextInput = React.memo(
  ({ name, label, placeholder, inputProps = {}, style = {}, errorStyles }) => {
    return (
      <FastField name={name}>
        {({ field, form, meta }) => {
          const showError = meta.touched && meta.error;

          return (
            <View style={style?.container}>
              <AppTextInput
                label={label}
                placeholder={placeholder}
                value={field.value}
                onChangeText={form.handleChange(name)}
                {...inputProps}
              />
              {showError && <Caption style={errorStyles}>{meta.error}</Caption>}
            </View>
          );
        }}
      </FastField>
    );
  }
);
