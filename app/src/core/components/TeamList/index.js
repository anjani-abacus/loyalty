import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Style from './style';
import Skeleton from '../../utils/skeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiCall } from '../../services/ServiceProvider';

const TeamList = React.memo(({ selectionHandler = ()=>{} }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const [removeBtn, setRemoveBtn] = useState(false);
  const moreItems = () => {
    const nextStart = startValue + 20;
    startValue = nextStart;
  };
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    fetchData();
  }, [searchText]);
  const [dataList, setdataList] = useState([]);
  const [dataList2, setdataList2] = useState([]);
  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  const fetchData = async (type = '') => {
    const userData = await AsyncStorage.getItem('userData');
    const loginData = JSON.parse(userData);
    type == 'moreItem'
      ? (startValue = dataList.length)
      : ((startValue = 0), setIsShowSkeleton(true));
    const payload = {
      user_id: loginData.id,
      start: startValue,
      limit: 20,
      filter: searchText,
    };
    try {
      const result = await ApiCall(payload, 'AppAttendence/getAllAsm');
      if (type == 'moreItem') {
        setdataList([...dataList, ...result.asm_id]);
        setdataList2([...dataList, ...result.asm_id]);
      }
      else {
        setdataList(result.asm_id);
        setdataList2(result.asm_id);
      }
      setIsShowSkeleton(false);
    } catch (err) {
      setIsShowSkeleton(false);
    }
  };

  const MORE_ITEM = 'moreItem';

  // handlers
  const refreshHandler = () => {
    setIsRefreshing(false);
    fetchData();
  };
  let timer;
  const searchHandler = newText => {
    clearTimeout(timer);
    timer = setTimeout(() => setSearchText(newText), 300); //debauncing

  };
  //handlers

  // const setSearchTextFunction = useCallback((val) => {
  //   if (val) {

  //     let newVal = val.toLowerCase();

  //     for (let i = 0; i < dataList2.length; i++) {
  //       let name = dataList2[i].name.toLowerCase();
  //       if (name.includes(newVal)) {
  //         let array = [];

  //         array = array.push(dataList2[i]);

  //         setdataList(array);
  //       }
  //     }

  //   }

  // }, [])

  const setSearchTextFunction = (val) => {

    const lowercaseQuery = val.toLowerCase();
    const filteredData = dataList2.filter(item =>
      item.name.toLowerCase().includes(lowercaseQuery)
    );
    setdataList(filteredData);

  };
  const Card = ({ row, selectionHandler }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectionHandler(row);
        }}
        style={Style.optionCard}>
        <View style={Style.thumbNail}>
          <Text style={Style.thumbNailText}>
            {row?.name?.slice(0, 2).toUpperCase()}
          </Text>
        </View>

        <View style={Style.flexStretch}>
          <Text style={Style.optionText}>{row?.name || 'N/A'}</Text>
          {row?.mobile && (
            <Text style={Style.optionContact}>{row?.mobile}</Text>
          )}
        </View>
        <View>
          <MaterialIcons name="chevron-right" style={{ ...Style.goIcon }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Style.headerWrapper}>
      <View style={Style.searchBox}>
        <MaterialIcons name="search" style={Style.searchIcon} />
        <TextInput
          style={Style.searchInput}
          placeholder="Search"
          returnKeyType={'search'}
          onChangeText={newText => {

            setSearchTextFunction(newText);
          }}

        // onFocus={()=>setRemoveBtn(true)}
        // onBlur={()=>setRemoveBtn(false)}
        />
        {/* {removeBtn && <TouchableOpacity>
        <Entypo name="cross" size={20} />
        </TouchableOpacity>} */}
      </View>
      {isShowSkeleton ? (
        <FlatList
          style={Style.skeletonFlatList}
          data={[1]}
          renderItem={() => <Skeleton />}
        />
      ) : (
        <FlatList
          style={Style.dataFlatList}
          onEndReached={() => moreItems()}
          onEndReachedThreshold={0.4}
          keyExtractor={(item, index) => `${index}_${item?.id}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshHandler}
            />
          }
          data={dataList}
          renderItem={({ item }) => (
            <Card selectionHandler={selectionHandler} row={item} />
          )}
        />
      )}
    </View>
  );
});

export default TeamList;
