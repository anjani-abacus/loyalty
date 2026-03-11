import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {View} from 'react-native-animatable';
import {Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Style from './Style';
import AppNoDataFound from '../No_Data_Found/AppNoDataFound';

const SelectableList = ({
  selectableController,
  title = 'Select',
  snapPoint = '100%',
  setSelectedValue = ()=>{},
  selectedValue,
  dataList = [],
  itemTextField,
  itemValueField,
  onSearch = ()=>{},
  onInfiniteScroll = ()=>{},
  isSearchEnable = true,
  isBackdropEnable = false,
  isLoading = false,
  children,
  disabled,
  activeSheet = {},
}) => {
  const selectableStyle = Style();
  const closeSheet = () => {
    activeSheet.current = 'asdf';
    selectableController.current?.close();
  };
  let timer;
  const searchHandler = newText => {
    activeSheet.current = title;
    clearTimeout(timer);
    timer = setTimeout(() => onSearch(newText), 200);
  };

  const selectionHandler = val => {
    activeSheet.current = null;
    selectableController.current?.close();
    setTimeout(() => setSelectedValue(val), 300);
  };
  const moreItems = () => {
    onInfiniteScroll('moreItem');
  };

  const RenderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        pressBehavior="close"
      />
    ),
    [],
  );

  const sheetCloseBtn = () => {
    return (
      <View style={selectableStyle.sheetCloseBtn}>
        <Text style={selectableStyle.titleText}>{title}</Text>
        <TouchableOpacity onPress={closeSheet}>
          <MaterialIcons style={selectableStyle.sheetCloseIcon} name="close" />
        </TouchableOpacity>
      </View>
    );
  };

  const ItemCard = ({row}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectionHandler(row);
        }}
        style={[
          selectableStyle.optionCard,
          children !== null && {alignItems: 'flex-start'},
        ]}>
        {row[itemValueField] == selectedValue[itemValueField] ? (
          <MaterialIcons
            name="check-circle"
            style={[
              {
                ...selectableStyle.optionIcon,
                ...selectableStyle.activeOptionIcon,
              },
              children !== null && {marginTop: 14},
            ]}
          />
        ) : (
          <MaterialIcons
            name="circle"
            style={[
              {...selectableStyle.optionIcon},
              children !== null && {marginTop: 5},
            ]}
          />
        )}

        {children == null ? (
          <View>
            <Text style={selectableStyle.optionText}>
              {row[itemTextField.name] || 'N/A'}
            </Text>
            {row[itemTextField.mobile] && (
              <Text style={selectableStyle.optionContact}>
                {row[itemTextField.mobile]}
              </Text>
            )}
          </View>
        ) : (
          children(row)
        )}
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      ref={selectableController}
      style={selectableStyle.modal}
      index={1}
      snapPoints={['20%', snapPoint]}
      enableContentPanningGesture={false}
      backdropComponent={isBackdropEnable && RenderBackdrop}
      handleComponent={sheetCloseBtn}>
      {isSearchEnable && (
        <View style={selectableStyle.searchBox}>
          <MaterialIcons name="search" style={selectableStyle.searchIcon} />
          <TextInput
            style={selectableStyle.searchInput}
            placeholder="Search"
            onChangeText={newText => {
              searchHandler(newText);
            }}
            // onSubmitEditing={(newText) => {
            //   searchHandler(newText); // Call searchHandler when the user hits the "search" button
            // }}
            defaultValue={''}
            returnKeyType={'search'}
          />
        </View>
      )}
      <BottomSheetView>
        <View style={selectableStyle.optionsWrapper}>
          {dataList?.length ? (
            <FlatList
              data={dataList}
              contentContainerStyle={{paddingBottom: 60}}
              onEndReached={() => moreItems()}
              onEndReachedThreshold={0.4}
              renderItem={({item}) => {
                return <ItemCard row={item} />;
              }}
            />
          ) : (
            <View style={{height: '100%'}}>
              <AppNoDataFound title={'No ' + 'Data' + ' Found'} />
            </View>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default SelectableList;
