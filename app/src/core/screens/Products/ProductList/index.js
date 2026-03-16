import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ImageBackground,
  StyleSheet,
  StatusBar,

} from 'react-native';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import Style from '../../../assets/Style/styles';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../assets';
import { ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import Angle from '../../../assets/icons/Angle.svg';
import Link from '../../../assets/icons/link.svg';
import { useProductList } from '../../../../api/hooks/useMasters';
import AppSearchBar from '../../../../core/components/Searchbar/AppSearchBar';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import useTheme from '../../../components/Theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../../components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../../assets/SVGs/svg';
import { PointBalance } from '../../../../features/Loyalty/screens/SpinAndWheel';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const shareProductImage = async (data, path) => {
  const imageUrl = path;
  try {
    const fileName = 'product.jpg';
    const localFilePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

    // 1. Download the remote image to a local path
    const downloadResult = await RNFS.downloadFile({
      fromUrl: imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3dSEtDvpd9KAn4SdFJVoL0K1lj4Xfc-wVWQ&s',
      toFile: localFilePath,
    }).promise;

    if (downloadResult.statusCode === 200) {
      // 2. Share the downloaded image
      await Share.open({
        url: `file://${localFilePath}`,
        type: 'image/jpeg',
        message: `Product Name: ${data?.product_name} \nProduct Code: ${data?.product_code} \n\n`,
        title: 'Share product with:',
        failOnCancel: false,
      });
    } else {
      Alert.alert('Download failed', `Status code: ${downloadResult.statusCode}`);
    }
  } catch (error) {
    console.error('Error while sharing Product:', error);
    Alert.alert('Error', error.message || 'Something went wrong');
  }
};

const AccordionItem = ({ styles, item, isActive, onToggle }) => {
  const activeTheme = useTheme();
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onToggle} style={styles.header}>
        <Text style={styles.headerText}>{item.title}</Text>
        <Angle width={18} height={18} style={{
          transform: [{ rotate: isActive ? '90deg' : '0deg' }],
        }} />
      </TouchableOpacity>
      <Collapsible collapsed={!isActive}>
        {item?.content?.map((elem) => <View style={styles.content}>
          <Text style={{ color: activeTheme.text }}>{elem.title}</Text>
          <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{elem.value}</Text>
        </View>)}
      </Collapsible>
    </View>
  );
};
const AccordionList = ({ data }) => {
  const activeTheme = useTheme();
  const styles = StyleSheet.create({
    listContainer: {
      padding: 10,
    },
    itemContainer: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#fff',
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: activeTheme.text,
    },
    content: {
      flexDirection: 'row',
      gap: 10,
      color: activeTheme.text,
      padding: 15,
      backgroundColor: '#fff',
      borderBottomColor: '#eee',
      marginBottom: 5,
      borderBottomWidth: 1,
    },
  });

  const DATA = [
    {
      id: '1', title: 'Specifications', content: [
        { title: 'Category:', value: data?.category_name || 'N/A' },
        { title: 'Sub Category:', value: data?.sub_category_name || 'N/A' },
        // { title: 'HSN Code:', value: data?.hsn_code || "N/A" },
        // { title: 'Point Category:', value: data?.point_category_name || "N/A" },
      ],
    },
    {
      id: '2', title: 'Other Details', content: [
        { title: 'Product Scan', value: data?.product_scan || 'No Description' },
        { title: 'Brand', value: data?.brand || 'N/A' },
        { title: 'Date Created', value: moment(data?.date_created).format('DD MMM, YYYY') || 'N/A' },
        { title: 'Unit of Measurement', value: data?.uom || 'N/A' },
        { title: 'Master Packing Size', value: data?.master_packing_size || 'N/A' },
        { title: 'Small Packing Size', value: data?.small_packing_size || 'N/A' },
      ],
    },
  ];

  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <View>{
      DATA?.map((item) => (
        <AccordionItem
          styles={styles}
          item={item}
          isActive={activeId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </View>
  );
};

const ProductDetail = ({ data }) => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    tile: {
      backgroundColor: '#eee',
      minWidth: 80,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
  });
  return <View style={{ paddingBottom: insets.bottom, flex: 1, justifyContent: 'space-between' }}>
    {data?.images[0]?.image ? <FastImage
      style={{ height: 300 }}
      source={{ uri: data?.images[0]?.image }}
      priority={FastImage.priority.high}
      resizeMode={FastImage.resizeMode.contain}
    /> : <FastImage
      style={{ height: 300 }}
      source={Images.default}
      priority={FastImage.priority.high}
      resizeMode={FastImage.resizeMode.contain}
    />}

    <ScrollView>
      <View style={{
        backgroundColor: 'rgba(239, 246, 255, 0.5)',
        flex: 1,
        // borderTopWidth:1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 15,
      }}>
        <View style={{
          marginTop: 40,
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: '#000',
          }}>{data?.product_name}</Text>

          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{
              fontWeight: 'bold',
              color: '#000',
              backgroundColor: '#fae102',
              borderColor: '#004CAC',
              paddingHorizontal: 10,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>#{data?.product_code}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* <View style={styles.tile}>
              <Text>MRP</Text>
              <Text style={{
                fontSize: 22,
                color: '#000',
              }}>
                {data?.mrp || '0'}
              </Text>
            </View> */}
            {/* <View style={styles.tile}>
              <Text>Net Price</Text>
              <Text style={{
                fontSize: 22,
                color: '#000',
              }}>
                {data?.netPrice || '0'}
              </Text>
            </View> */}
          </View>

          <Text style={{
            fontSize: 16,
            marginTop: 10,
            color: '#000',
          }}>
            {data?.description || 'No Description'}
          </Text>

          <View style={{
            marginTop: 15,
          }}>
            <AccordionList data={data} />
          </View>
        </View>
      </View>
    </ScrollView>
    <TouchableOpacity
      onPress={() => shareProductImage(data, data?.images[0]?.image)}
      activeOpacity={0.8}
      style={{
        borderRadius: 12,
        overflow: 'hidden', // required for ripple on Android
        marginVertical: 12,
        paddingHorizontal: 10,
      }}
    >
      <LinearGradient
        colors={['#3600C0', '#CE90FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 24,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          gap: 5,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontWeight: '600',
            textDecorationLine: 'none',
          }}
        >
          Share This Product
        </Text>
        <Link width={16} height={16} fill={'#fff'} />
      </LinearGradient>
    </TouchableOpacity>
  </View>;
};


const Card = ({ openBottomSheet, item, navigation }) => {
  const activeTheme = useTheme();
  const GlobelStyle = useGlobelStyle();
  return (
    <View key={item.id} style={{
      padding: 5,

    }}>
      <View
        style={[Style.dealerCard, { padding: 5, backgroundColor: activeTheme.section }]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
          onPress={() =>
            openBottomSheet(item)
          }>
          <View>
            <View style={{ borderRadius: 10, padding: 10 }}>
              {(!item?.images[0]?.image) ? (
                <ImageBackground
                  source={Images.default}
                  style={{ height: 80, width: 80 }}
                  resizeMode="cover" // or "contain", "stretch", "repeat", "center"
                />
              ) : (
                <ImageBackground
                  source={{ uri: (item?.images[0]?.image) }}
                  style={{ height: 80, width: 80 }}
                  resizeMode="cover" // or "contain", "stretch", "repeat", "center"
                />

              )}
            </View>
          </View>
          <View style={{
            padding: 3,
            borderRadius: 5,
            flex: 1,
            justifyContent: 'space-between',
          }}>
            <View style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: 'bold',
                  color: activeTheme.text,
                  fontSize: 14,
                  width: '60%',
                }}>{item?.product_name}</Text>
              {/* <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000',
                backgroundColor:'#EFF6FF',
                paddingHorizontal:10,
                borderRadius:4
              }}>Rs. {item?.mrp}</Text> */}
            </View>

            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 5 }}>
              {item?.category_name && <View>
                <Text style={{
                  backgroundColor: '#53AB58',
                  borderWidth: 1,
                  borderColor: '#53AB58',
                  color: '#fff',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>{item?.category_name || 'Category'}</Text>
              </View>}
              {item?.sub_category_name && <View>
                <Text style={{
                  backgroundColor: '#FCEBC7',
                  borderWidth: 1,
                  borderColor: '#FFA000',
                  color: '#000',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>{item?.sub_category_name || 'Sub Category'}</Text>
              </View>}
            </View>
            <View>
              <Text style={{
                color: activeTheme.text,
              }} numberOfLines={3}>
                {item?.description || 'No Description'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProductsList = ({ navigation, route }) => {
  const category_id = route.params?.category_id;
  const sub_category_id = route.params?.sub_category_id;

  const { isLoading, refetch, data: productList, isFetching } = useProductList({
    filter: {},
    category_id: category_id,
    sub_category_id: sub_category_id
  });
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [activeData, setActiveData] = useState(null);

  const url = 'https://portal.basiq360.com/api/uploads/product_image/';


  const handleSearch = (newValue) => {
    refetch({ filter: newValue, category_id, sub_category_id });
    setSearchValue(newValue);
  };

  const bottomSheetRef = useRef(null);
  const openBottomSheet = (item) => { setActiveData(item); bottomSheetRef.current?.present(); };
  const closeBottomSheet = () => bottomSheetRef.current.dismiss();

  const onRefresh = () => {
    setSearchValue('');
    refetch({ filter: {}, category_id, sub_category_id });
  };

  // if (isLoading) {
  //   return <AppLoader2 />
  // }

  return (
    <>
      {/* , {paddingBottom:insets.bottom} */}
      <SafeAreaView style={[GlobelStyle.container]}>
        <>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#CE90FF', '#3600C0']}
            style={{
              backgroundColor: '#3a459c',
              paddingHorizontal: 10,
              paddingBottom: 10,
              height: 100,
            }}
          >
            <StatusBarHeader height={StatusBar.currentHeight} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrowIcon />
              </TouchableOpacity>
              <Text style={{
                flex: 0.8,
                textAlign: 'right',
                paddingRight: 30,
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
              }}>{t('Products')}</Text>
              <PointBalance navigation={navigation} />
              <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
                <HelpIcon
                  icon={'arrow-left'}
                  style={{ marginRight: 10 }}
                  width={30}
                  height={30}
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth={0.1}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={[Style.CategoryCard]}>
            <>
              <FlatList
                data={productList?.data?.result}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum = false;
                }}
                keyExtractor={(item) => item.id.toString()}
                // ListHeaderComponent={
                //   <AppSearchBar
                //     term={searchValue}
                //     onChangeTerm={handleSearch}
                //     placeHolder="Search here..."
                //   />}
                ListEmptyComponent={
                  <View style={{ marginTop: 200 }}>
                    <AppNoDataFound />
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={isFetching && !isLoading}
                    onRefresh={onRefresh}
                  />
                }
                renderItem={({ item, index }) => {
                  return <>
                    <View>
                      <Card openBottomSheet={openBottomSheet}
                        navigation={navigation} item={item} index={index} />
                    </View>
                  </>;
                }}
              />
            </>

          </View>
        </>
      </SafeAreaView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          index={0}
          ref={bottomSheetRef}
          snapPoints={['80%']}
          enablePanDown={false}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="none" // disables tap to close
            />
          )}
          keyboardBehavior="interactive" // important!
          keyboardBlurBehavior="restore" // optional, better UX
          onChange={(index) => {
            if (index === -1) {
              closeBottomSheet();
            }
          }}
        >
          <ProductDetail data={activeData} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default ProductsList;
