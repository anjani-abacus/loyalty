import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import AppLoader from '../../../../core/components/Loader/AppLoader';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import Style from '../../../assets/Style/styles';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import {useTranslation} from 'react-i18next';
import {ApiCall} from '../../../../services/ServiceProvider';
import AppSearchBar from '../../../../core/components/Searchbar/AppSearchBar';
import Toast from 'react-native-toast-message';

const SubCategoryList = ({navigation, route}) => {
  const {t} = useTranslation();
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [start, setStart] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const id = route.params?.id;
  let onEndReachedCalledDuringMomentum = true;

  useEffect(() => {
    getCategoryList();
  }, [start, searchValue]);

  const onEndReached = () => {
    if (endReached == false) {
      const nextStart = start + 20;
      setStart(nextStart);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setCategoryList([]);
    setSearchValue('');
    setStart(0);
    if (start === 0 || searchValue === '') {
      getCategoryList();
    }
  };

  const onSearch = filter => {
    setIsRefreshing(true);
    setCategoryList([]);
    setSearchValue(filter);
  };

  const getCategoryList = async () => {
    try {
      const result = await ApiCall(
        {
          filter: {limit: 0, start: start, search_key: searchValue},
          cat_id: id,
        },
        'AppCustomerNetwork/subSegmentList',
      );

      if (result.statusCode === 200) {
        setCategoryList(result.data);
      } else {
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });
      }
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error occurred while fetching category data:', error);
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={GlobelStyle.container}>
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <AppSearchBar
            term={searchValue}
            onChangeTerm={value => onSearch(value)}
            onCancel={() => onSearch('')}
            onClear={() => onSearch('')}
            style={{
              maxWidth: 370,
              marginLeft: 10,
              marginTop: 14,
              backgroundColor: '#004bac',
              borderRadius: 10,
            }}
            placeHolder="Search here..."
          />
        </View>
        <View style={[Style.CategoryCard]}>
          {isRefreshing ? (
            <AppLoader
              loading={isRefreshing}
              color={activeTheme.Secondary}
              size={40}
            />
          ) : (
            <View style={[Style.scrollView]}>
              <FlatList
                data={categoryList}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum = false;
                }}
                ListEmptyComponent={
                  <View style={{marginTop: 200}}>
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}
                    />
                    <AppNoDataFound />
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                  />
                }
                // ListHeaderComponent={ListHeader}
                renderItem={({item, index}) => (
                  <View
                    key={`${item.id}-${index}`}
                    style={[Style.dealerCard, {marginTop: 14}]}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProductList', item)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: '#2B3348',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}>
                          {item?.sub_category_name}
                        </Text>
                        <Avatar.Icon
                          size={40}
                          rounded={false}
                          style={[
                            GlobelStyle.avatarContainer,
                            {height: 25, width: 25, borderRadius: 12},
                          ]}
                          labelStyle={GlobelStyle.avatarLabelStyle}
                          icon="chevron-right"
                          color="#0092FF"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

export default SubCategoryList;
