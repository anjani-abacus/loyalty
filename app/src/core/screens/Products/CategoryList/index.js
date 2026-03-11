import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import AppLoader from '../../../../core/components/Loader/AppLoader';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import Style from '../../../assets/Style/styles';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import { ApiCall } from '../../../../services/ServiceProvider';
import AppSearchBar from '../../../../core/components/Searchbar/AppSearchBar';
import Toast from 'react-native-toast-message';

const CategoryList = ({ navigation }) => {
  const { t } = useTranslation();
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const start = useRef(0);
  const [endReached, setEndReached] = useState(false);
  const [moreDataLoader, setMoreDataLoader] = useState(false);
  let onEndReachedCalledDuringMomentum = false;

  // Fetch category list with useCallback to prevent unnecessary re-renders
  const getCategoryList = useCallback(async () => {
    setIsRefreshing(true);
    start.current = 0;
    setEndReached(false);
    try {
      const result = await ApiCall(
        { filter: { limit: 20, start: start.current, search_key: searchValue } },
        'AppCustomerNetwork/segmentList'
      );
      if (result.statusCode === 200) {
        setCategoryList(result.data);
        if (result.data.length < 20) {setEndReached(true);}
        start.current += 20;
      } else {
        setCategoryList([]);
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [searchValue]);

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);

  const onRefresh = () => {
    setSearchValue('');
    getCategoryList();
  };

  const onSearch = filter => {
    setSearchValue(filter);
  };

  const moreDataHandler = async () => {
    if (endReached || moreDataLoader) {return;}
    setMoreDataLoader(true);
    try {
      const result = await ApiCall(
        { filter: { limit: 20, start: start.current, search_key: searchValue } },
        'AppCustomerNetwork/segmentList'
      );
      if (result.statusCode === 200) {
        setCategoryList(prev => [...prev, ...result.data]);
        if (result.data.length < 20) {setEndReached(true);}
        start.current += 20;
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setMoreDataLoader(false);
    }
  };

  return (
    <SafeAreaView style={GlobelStyle.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
        <AppSearchBar
          term={searchValue}
          onChangeTerm={onSearch}
          onCancel={() => onSearch('')}
          onClear={() => onSearch('')}
          style={{ maxWidth: 370, marginLeft: 12, marginTop: 14 }}
          placeHolder="Search here..."
        />
      </View>
      <View style={[Style.CategoryCard]}>
        {isRefreshing ? (
          <AppLoader />
        ) : (
          <FlatList
            data={categoryList}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum) {
                moreDataHandler();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{ paddingBottom: 70 }}
            ListFooterComponent={moreDataLoader && !endReached ? <ActivityIndicator /> : null}
            ListEmptyComponent={<AppNoDataFound />}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            renderItem={({ item, index }) => (
              <View key={`${item.id}-${index}`} style={[Style.dealerCard, { padding: 10 }]}>
                <TouchableOpacity onPress={() =>{
                  item.sub_cat_count > 0 ?
                  navigation.navigate('SubCategory', item) : navigation.navigate('ProductList', {'cat_id':item.id});}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#2B3348', fontWeight: '600', textTransform: 'capitalize' }}>{item?.category}</Text>
                    <Avatar.Icon
                      size={40}
                      rounded={false}
                      style={[GlobelStyle.avatarContainer, { height: 25, width: 25, borderRadius: 12 }]}
                      labelStyle={GlobelStyle.avatarLabelStyle}
                      icon="chevron-right"
                      color="#0092FF"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryList;
