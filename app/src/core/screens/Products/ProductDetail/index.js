import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Icon, ListItem } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppBoldText from '../../../../core/components/BoldText/AppBoldText';
import AppButton from '../../../../core/components/Button/AppButton';
import AppLoader from '../../../../core/components/Loader/AppLoader';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { UPLOAD_URL } from '../../../../services/BaseService';
import { ApiCall } from '../../../../services/ServiceProvider';
import { ImageModal } from '../../../../core/components/ConfirmationModal/ConfirmationModal';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const ProductDetail = ({ route, navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const productID = route.params.id;
  const activeTheme = useActiveTheme();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [visible, setIsVisible] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  outerContainer: {
    backgroundColor: '#004db2',
    height: '100%',
  },
  uploadDocContainer: {
    marginTop: 16,
  },
  uploadDocTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  companyName: {
    gap: 5,
    marginVertical: 10,
  },
  companyNameText: {
    fontSize: 20,
    color: '#2B3348',
    fontWeight: '600',
  },
  countWrapper: {
    gap: 15,
  },
  countBox: {
    borderWidth: 1,
    borderColor: '#E5EAF1',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  imgContainer: {
    margin: 4,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  countValue: {
    color: 'black',
    fontWeight: '700',
  },
  amtBox: {},
  amtValue: {
    fontWeight: '700',
    color: '#004BAC',
  },
  cardFooter: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  Pending: {
    color: '#FF9F00',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFF7EA',
    borderRadius: 5,
    marginLeft: 10,
  },
  Approved: {
    color: '#43BF57',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E2FFE7',
    borderRadius: 5,
    marginLeft: 10,
  },
  Completed: {
    color: '#43BF57',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E2FFE7',
    borderRadius: 5,
    marginLeft: 10,
  },
  Cancel: {
    color: '#E92828',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFE5E5',
    borderRadius: 5,
    marginLeft: 10,
  },
  Reject: {
    color: '#E92828',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFE5E5',
    borderRadius: 5,
    marginLeft: 10,
  },
});

  useEffect(() => {
    getProductDetail();
  }, []);

  const handleShare = async () => {
    try {
      const message = `Product Name: ${productDetail?.display_name}
Product Code: ${productDetail?.product_code}
MRP: ₹${productDetail?.mrp}
`;

      await Share.share({
        message: UPLOAD_URL + 'product_image/' + productDetail?.image + ' ' + message,
        // url: UPLOAD_URL + 'product_image/' + productDetail?.image
      }, {
        dialogTitle: UPLOAD_URL + 'product_image/' + productDetail?.image,
        subject: UPLOAD_URL + 'product_image/' + productDetail?.image,
      });
    } catch (error) {
      console.error('Error sharing product details:', error);
    }
  };

  getProductDetail = async () => {
    try {
      const result = await ApiCall(
        { id: productID },
        'AppCustomerNetwork/segmentItemsDetail',
      );

      if (result.statusCode === 200) {
        setProductDetail(result.data);
      }
      setIsRefreshing(false);
    } catch (error) {
      console.error(
        'Error occurred while fetching product details data:',
        error,
      );
      Toast.show({ type: 'error', text1: error, visibilityTime: 6000 });
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <BottomSheetModalProvider>
        <View style={[styles.container, { backgroundColor: '#F6F6F6' }]}>
          {isRefreshing ? (
            <AppLoader
              loading={isRefreshing}
              color={activeTheme.Secondary}
              size={40}
            />
          ) : (
            <>
              {/* <View>
                <View style={{ paddingHorizontal: 20, height: 300, width: '100%' }}>
                  {productDetail?.image ? (
                    <FastImage source={{ uri: UPLOAD_URL + 'product_image/' + productDetail?.image }} style={{ height: 260, marginTop: 10 }} resizeMode={FastImage.resizeMode.contain} />
                  ) : (
                    <Icon
                      name="image"
                      type="entypo"
                      color={'#5F6368'}
                      size={360}
                    />
                  )}
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                    backgroundColor: '#FFF',
                    padding: 20,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: '#0092FF' }}>
                      {productDetail?.category}{' '}
                      {productDetail?.sub_category_name ? (
                        <Text style={{ color: '#2B3348' }}>
                          {' '}
                          {'> '}
                          <Text style={{ color: '#0092FF' }}>
                            {productDetail?.sub_category_name}
                          </Text>
                        </Text>
                      ) : (
                        ''
                      )}
                    </Text>
                    <TouchableOpacity onPress={handleShare}>
                      <Icon
                        name="share"
                        type="entypo"
                        color={'#5F6368'}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        color: '#2B3348',
                        fontSize: 14,
                        fontWeight: '400',
                        marginBottom: 3,
                      }}>
                      #{productDetail?.product_code}
                    </Text>
                    <Text
                      style={{
                        color: '#2B3348',
                        fontSize: 19,
                        fontWeight: '600',
                        marginBottom: 3,
                      }}>
                      {productDetail?.display_name}
                    </Text>
                    <Text
                      style={{
                        color: '#2B3348',
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 10,
                      }}>
                      {' '}
                      ₹{productDetail?.mrp}
                    </Text>
                    <Text
                      style={{
                        color: '#2B334899',
                        fontSize: 14,
                        marginBottom: 3,
                      }}>
                      Brand -{' '}
                      <Text
                        style={{
                          color: '#2B3348',
                          fontWeight: '600',
                        }}>
                        {productDetail?.brand}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: '#2B334899',
                        fontSize: 14,
                        marginBottom: 3,
                      }}>
                      Master Packaging Size -{' '}
                      <Text
                        style={{
                          color: '#2B3348',
                          fontWeight: '600',
                        }}>
                        {productDetail?.master_packing_size}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: '#2B334899',
                        fontSize: 14,
                        marginBottom: 3,
                      }}>
                      Small Packaging Size -{' '}
                      <Text
                        style={{
                          color: '#2B3348',
                          fontWeight: '600',
                        }}>
                        {productDetail?.small_packing_size}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View> */}

              <ListItem bottomDivider>
                <ListItem.Content style={{ alignItems: 'center' }}>
                  {productDetail?.image ? (
                    <TouchableOpacity onPress={() => setIsVisible(true)
                    } style={{ width: '100%' }}>
                      <FastImage source={{ uri: UPLOAD_URL + 'product_image/' + productDetail?.image }} style={{ height: 240, width: '100%' }} resizeMode={FastImage.resizeMode.contain} />
                    </TouchableOpacity>


                  ) : (
                    <Icon
                      name="image"
                      type="entypo"
                      color={'#5F6368'}
                      size={240}

                    />
                  )}

                </ListItem.Content>
              </ListItem>


              {/* detail section */}
              <FlatList data={[]} renderItem={null} keyExtractor={({ item }) => item} ListHeaderComponent={() => {
                return (
                  <>

                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Category')}</AppBoldText> </ListItem.Title>
                        <ListItem.Subtitle>{productDetail.category ? productDetail.category : '----'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Sub Category')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>{productDetail.sub_category_name ? productDetail.sub_category_name : '----'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Product Name')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>{productDetail.product_name ? productDetail.product_name : '----'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Product Code')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>{productDetail.product_code ? productDetail.product_code : '----'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('MRP')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>&#8377; {productDetail.mrp ? productDetail.mrp : '--'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Brand')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>{productDetail.brand ? productDetail.brand : '--'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Point Category')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>{productDetail.point_category_name ? productDetail.point_category_name : '--'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                      <Icon name="inventory-2" size={24} />
                      <ListItem.Content>
                        <ListItem.Title><AppBoldText>{t('Description')}</AppBoldText></ListItem.Title>
                        <ListItem.Subtitle>{productDetail.description ? productDetail.description : '--'}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                  </>
                );
              }} />
              <View style={{ margin: 10 }}>
                <AppButton
                  title={(t('Share'))}
                  mode={'contained'}
                  loading={false}
                  disabled={false}
                  color={activeTheme.themeColor}
                  onPress={() => {
                    handleShare();
                  }}
                />
              </View>

              <ImageModal modalVisible={visible} setModalVisible={setIsVisible} url={UPLOAD_URL + 'product_image/' + productDetail?.image} />
            </>
          )}
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default ProductDetail;
