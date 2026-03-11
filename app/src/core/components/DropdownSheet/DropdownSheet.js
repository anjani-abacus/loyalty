import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import Style from './Style';
import {View} from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectableList from '../SelectableList/SelectableList';
import MultiSelectableList from '../MultiSelectableList/MultiSelectableList';
import useActiveTheme from '../Theme/useActiveTheme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const DropdownSheet = ({
  dataItems,
  setSearchText = () => {},
  title = 'Select',
  isSearchEnable,
  snapPoint,
  isBackdropEnable,
  value,
  borderType,
  itemValueField,
  itemTextField,
  setSelectedOption,
  onInfiniteScroll = () => {},
  disabled = false,
  isMandetory,
  children = null,
  isMultiSelect = false,
  selectableController = useRef(null),
  SelectedOption,
  onValueChange = () => {},
  resetKey,
  isLoading = false,
  fromPage,
  activeSheet = {},
  onPresent = () => {},
}) => {
  const activeTheme = useActiveTheme();
  const [selectedValue, setSelectedValue] = useState(isMultiSelect ? [] : {});
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (SelectedOption && SelectedOption !== null) {
        onChangeFunction(SelectedOption);
      }
      return;
    }

    if (resetKey) {
      setSelectedValue(isMultiSelect ? [] : {});
    }
  }, [resetKey, isMultiSelect]);

  useEffect(() => {
    if (value) {
      const selectedItem = dataItems.find(
        item => item[itemValueField] === value,
      );
      if (selectedItem) {
        setSelectedValue(selectedItem);
      }
    }
    if (SelectedOption === null) {
      setSelectedValue(isMultiSelect ? [] : {});
    }
  }, [value, dataItems, itemValueField]);

  const openSheet = () => {
    setSearchText(null);
    activeSheet.current = title;
    selectableController.current?.present();
  };

  const onChangeFunction = item => {
    setSelectedValue(item);
    setSelectedOption(item);
    onValueChange(item);
    selectableController.current.close();
  };

  return (
    <>
      {fromPage != 'checkinaddd' && (
        <TouchableOpacity disabled={disabled} onPress={() => openSheet()}>
          <View style={{...Style.dropdownBoxWrapper, ...Style[borderType]}}>
            <View style={Style.dropdownBox}>
              <View style={Style.labelBox}>
                <View
                  style={
                    selectedValue[itemTextField?.name] ||
                    selectedValue.length > 0
                      ? Style.activeLabel
                      : null
                  }>
                  <Text
                    style={{
                      color: disabled
                        ? activeTheme.LightGrey
                        : activeTheme.Secondary,
                    }}>
                    {title}{' '}
                    {isMandetory ? (
                      <Text style={Style.mandetoryIcon}>*</Text>
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
                {isMultiSelect
                  ? selectedValue.length > 0 && (
                      <Text style={Style.selectedOption}>
                        {selectedValue
                          .map(val => val[itemTextField.name])
                          .join(', ')}
                      </Text>
                    )
                  : selectedValue[itemTextField?.name] && (
                      <Text
                        style={[
                          Style.selectedOption,
                          {
                            color: disabled
                              ? activeTheme.LightGrey
                              : activeTheme.Secondary,
                          },
                        ]}>
                        {selectedValue[itemTextField?.name]}
                      </Text>
                    )}
              </View>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color={disabled ? activeTheme.LightGrey : activeTheme.Secondary}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
      {isMultiSelect ? (
        <MultiSelectableList
          resetKey={resetKey}
          title={title}
          selectableController={selectableController}
          snapPoint={snapPoint}
          setSelectedValue={onChangeFunction}
          selectedValue={selectedValue}
          dataList={dataItems}
          isSearchEnable={isSearchEnable}
          isBackdropEnable={isBackdropEnable}
          itemTextField={itemTextField}
          itemValueField={itemValueField}
          onSearch={setSearchText}
          onInfiniteScroll={onInfiniteScroll}
          children={children}
          isLoading={isLoading}
        />
      ) : (
        // <BottomSheetModal
        // snapPoints={['20%', '100%']}
        // ref={selectableController}
        // >
        //   <Text>asdf</Text>
        // </BottomSheetModal>

        <SelectableList
          title={title}
          selectableController={selectableController}
          snapPoint={snapPoint}
          setSelectedValue={onChangeFunction}
          selectedValue={selectedValue}
          dataList={dataItems}
          isSearchEnable={isSearchEnable}
          isBackdropEnable={isBackdropEnable}
          itemTextField={itemTextField}
          itemValueField={itemValueField}
          onSearch={setSearchText}
          onInfiniteScroll={onInfiniteScroll}
          children={children}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default DropdownSheet;

// slow
// no - native response
