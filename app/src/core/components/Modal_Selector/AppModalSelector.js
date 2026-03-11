import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import ModalSelector from 'react-native-modal-selector-searchable';
import {Picker} from '@react-native-picker/picker';
import {AnimatedFAB, Button, Caption} from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import {MD3Colors} from 'react-native-paper';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import useActiveTheme from '../Theme/useActiveTheme';

const AppModalSelector = ({
  data,
  labelExtractor,
  valueExtractor,
  selectedValue,
  onValueChange,
  error,
  touched,
  label,
  name,
  visible,
  hideModal,
  addCustomerPageName,
  addCustomerTitle,
  showAddCustomerButton,
  navigation,
}) => {
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  const styles = StyleSheet.create({
    optionContainerStyle: {
      backgroundColor: activeTheme.Light,
      width: '100%',
      paddingHorizontal: 0,
      borderRadius: 8,
    },
    searchStyle: {
      borderRadius: 0,
      borderRadius: 8,
      backgroundColor: activeTheme.Snow,
    },
    optionStyle: {
      marginHorizontal: -10,
      alignItems: 'flex-start',
      borderBottomColor: MD3Colors.neutral90,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end', // Aligns buttons to the right
      gap: 10, // Adds space between buttons
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: activeTheme.Border,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 6,
      minWidth: 100,
      alignItems: 'center',
    },
    buttonText: {
      color: activeTheme.Light,
      fontWeight: '700',
      textTransform: 'capitalize',
    },
  });

  const [skelton, setSkelton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkelton(false);
    }, 1000);
  }, []);

  const keyExtractor = (item, index) => {
    return `${index}_${valueExtractor(item)}`;
  };

  if (data.length <= 0) {
    return (
      <>
        {skelton ? (
          <Skeleton
            style={[GlobelStyle.skeltonPickerDataStyle]}
            LinearGradientComponent={LinearGradient}
            animation="wave"
            variant="text"
            width={80}
            height={50}
          />
        ) : (
          <View style={GlobelStyle.NoPickerDataStyle}>
            <Caption
              style={[GlobelStyle.largeFont, {color: MD3Colors.error50}]}>
              No {name} Available
            </Caption>
          </View>
        )}
      </>
    );
  } else {
    return (
      <>
        <ModalSelector
          // customSelector={
          //   <View>
          //     {/* Options list will be here */}

          //     {/* Footer buttons */}
          //     <View style={styles.buttonContainer}>
          //       {showAddCustomerButton && (
          //         <TouchableOpacity
          //           style={[
          //             styles.button,
          //             {backgroundColor: activeTheme.Primary},
          //           ]}
          //           onPress={() => {
          //             hideModal();
          //             navigation.navigate(addCustomerPageName);
          //           }}>
          //           <Text style={styles.buttonText}>Add New</Text>
          //         </TouchableOpacity>
          //       )}

          //       <TouchableOpacity
          //         style={[styles.button, {backgroundColor: MD3Colors.error50}]}
          //         onPress={hideModal}>
          //         <Text style={styles.buttonText}>Cancel</Text>
          //       </TouchableOpacity>
          //     </View>
          //   </View>
          // }
          data={data}
          visible={visible}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
          valueExtractor={valueExtractor}
          accessible={true}
          animationType={'slide'}
          optionContainerStyle={styles.optionContainerStyle}
          searchStyle={styles.searchStyle}
          optionTextStyle={{color: activeTheme.Dark}}
          optionStyle={styles.optionStyle}
          onCancel={hideModal}
          cancelTextStyle={{
            color: activeTheme.Light,
            fontWeight: '700',
            textTransform: 'capitalize',
          }}
          cancelStyle={{
            backgroundColor: MD3Colors.error50,
            borderRadius: 6,
          }}
          onChange={onValueChange}>
          <View style={[GlobelStyle.PickerStyle]}>
            <Picker
              mode="dropdown"
              itemStyle={{height: Platform.OS == 'ios' ? 44 : 0, width: '100%'}}
              selectedValue={selectedValue}
              onValueChange={onValueChange}>
              <Picker.Item label={label} value="" />
              {data.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={labelExtractor(item)}
                  value={valueExtractor(item)}
                />
              ))}
            </Picker>
          </View>
        </ModalSelector>
        {error && touched && (
          <Caption style={[GlobelStyle.errorMsg]}>{error}</Caption>
        )}
      </>
    );
  }
};

export default AppModalSelector;
