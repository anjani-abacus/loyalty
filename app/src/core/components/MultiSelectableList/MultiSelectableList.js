import React, {useCallback, useEffect, useState, useRef} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Style from './Style';
import AppNoDataFound from '../No_Data_Found/AppNoDataFound';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../Button/AppButton';
import useActiveTheme from '../Theme/useActiveTheme';
import FastImage from 'react-native-fast-image';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { Images } from '../../assets';

const MultiSelectableList = ({
  selectableController,
  title = 'Select',
  snapPoint = '100%',
  setSelectedValue,
  selectedValue,
  dataList,
  itemTextField,
  itemValueField,
  onSearch,
  onInfiniteScroll,
  isSearchEnable = true,
  isBackdropEnable = false,
  children,
  isLoading = false,
  resetKey,
}) => {
  useEffect(() => {
    if (resetKey) {
      setSelectedValues([]);
    }
  }, [resetKey]);
  const selectableStyle = Style();
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const closeSheet = useCallback(() => {
    selectableController.current?.close();
  }, []);
  let timer;
  const searchHandler = newText => {
    setSearchText(newText == 'clear' ? '' : newText);
    clearTimeout(timer);
    timer = setTimeout(() => onSearch(newText), 200);
  };
  const selectionHandler = val => {
    setSelectedValues(prevSelectedValues => {
      if (
        prevSelectedValues.some(
          item => item[itemValueField] === val[itemValueField],
        )
      ) {
        return prevSelectedValues.filter(
          item => item[itemValueField] !== val[itemValueField],
        );
      } else {
        return [...prevSelectedValues, val];
      }
    });
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
    const isSelected = selectedValues.some(
      item => item[itemValueField] === row[itemValueField],
    );
    return (
      <TouchableOpacity
        onPress={() => {
          selectionHandler(row);
        }}
        style={[
          selectableStyle.optionCard,
          children !== null && {alignItems: 'flex-start'},
        ]}>
        {isSelected ? (
          <FontAwesome
            name="check-square-o"
            style={[
              {
                ...selectableStyle.optionIcon,
                ...selectableStyle.activeOptionIcon,
              },
              children !== null && {marginTop: 5},
            ]}
            size={15}
          />
        ) : (
          <FontAwesome
            name="square-o"
            style={[
              {
                ...selectableStyle.optionIcon,
              },
              children !== null && {marginTop: 5},
            ]}
            size={15}
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
          {searchText == '' ? (
            <MaterialIcons name="search" style={selectableStyle.searchIcon} />
          ) : (
            <TouchableOpacity onPress={() => searchHandler('clear')}>
              <MaterialIcons name="close" style={selectableStyle.clearIcon} />
            </TouchableOpacity>
          )}
          <TextInput
            style={selectableStyle.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={newText => searchHandler(newText || '')}
            defaultValue={''}
            returnKeyType={'search'}
          />
        </View>
      )}
      <BottomSheetView>
        <View style={selectableStyle.optionsWrapper}>
          {isLoading ? (
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <FastImage
                style={[GlobelStyle.image, {width: 100, height: 100}]}
                source={Images.soon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ) : dataList?.length ? (
            <>
              <FlatList
                data={dataList}
                onEndReached={() => moreItems()}
                style={{maxHeight: '88%'}}
                onEndReachedThreshold={0.4}
                renderItem={({item}) => {
                  return <ItemCard row={item} />;
                }}
              />
            </>
          ) : (
            <View style={{height: '100%'}}>
              <AppNoDataFound title={'No ' + 'Data' + ' Found'} />
            </View>
          )}
        </View>
        <View style={{marginHorizontal: 16}}>
          <AppButton
            title="Save"
            mode={'contained'}
            disabled={selectedValues.length == 0}
            color={activeTheme.buttonColor}
            style={{backgroundColor: activeTheme.themeColor}}
            onPress={() => {
              setSelectedValue(selectedValues);
              closeSheet();
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MultiSelectableList;
