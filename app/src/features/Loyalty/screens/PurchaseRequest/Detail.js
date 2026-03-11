import { useRoute } from '@react-navigation/native';
import { Tab, TabView } from '@rneui/themed';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import { UPLOAD_URL } from '../../../../services/BaseService';
import { ApiCall } from '../../../../services/ServiceProvider';
import FastImage from 'react-native-fast-image';
import GlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import ImageView from 'react-native-image-viewing';
import { Images } from '../../../../core/assets';



const PurchaseRequestDetails = ({ navigation }) => {

    const route = useRoute();
    const purchaseRequestId = route.params.id;
    const { t } = useTranslation();
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [purchaseDetail, setPurchaseDetail] = useState({});
    const [items, setItems] = useState([]);
    const useGlobelStyle = GlobelStyle();
    const url = UPLOAD_URL + 'purchase/';
    const [tabIndex, setTabIndex] = useState(0);
    // const [imageIndex, setImageIndex] = useState(0);
    const imageIndex = useRef(0);
    const [images, setImages] = useState([]);
    const [visible, setIsVisible] = useState(false);


    useEffect(() => {
        getDetail();
    }, []);



    const getDetail = async () => {
        try {
            setIsRefreshing(true);
            const result = await ApiCall(
                { id: purchaseRequestId, 'search': '' },
                'AppPurchase/purchaseDetail',
            );

            if (result.statusCode === 200) {
                setPurchaseDetail(result.result);
                setItems(result.result.item);
            }

            setIsRefreshing(false);
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error occurred while fetching data !', visibilityTime: 6000 });
            setIsRefreshing(false);
        }
    };


    const imageModal = index => {
        // setImageIndex(index);
        imageIndex.current = index;
        const newArray = purchaseDetail.img.map((r, index) => {
            return { uri: url + r.image };
        });
        setImages(newArray);
        // setImages([{ uri: uri }]);
        setIsVisible(true);
    };


    const tabViewScene1 = () => {
        return (
            <>
                {items.map((item, index) => (
                    <View style={styles.product} key={index}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Product Name')}</Text>
                                <Text style={styles.value}>{item.product_name || ''}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Product Code')}</Text>
                                <Text style={styles.value}>{item.product_code || ''}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('SQFT')}</Text>
                                <Text style={styles.value}>{item.sqft || ''}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Point Per SQFT')}</Text>
                                <Text style={styles.value}>{item.per_sqft || '---'}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Total Point')}</Text>
                                <Text style={styles.value}>{item.total_points || '---'}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </>
        );
    };


    const tabViewScene2 = () => {
        return (
            <>
                <View >
                    <View
                        style={{
                            height: 1,
                            backgroundColor: '#EDEDED',
                            marginBottom: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: '#2B3348',
                            fontSize: 14,
                            fontWeight: '600',
                            marginLeft: 2,
                            marginBottom: 10,
                        }}>
                        {t('Attached Images')}
                    </Text>
                    <ScrollView horizontal style={[useGlobelStyle.imageList, { flexWrap: 'nowrap' }]}>
                        {purchaseDetail.img.length > 0 && purchaseDetail.img.map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                style={useGlobelStyle.imgContainer}
                                onPress={() => imageModal(index)}>
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={{ uri: url + image.image }}
                                    style={[useGlobelStyle.uploadedImage]}
                                />
                            </TouchableOpacity>
                        ))}
                        {
                            purchaseDetail.img.length < 1 &&
                            <TouchableOpacity style={useGlobelStyle.imgContainer}>
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={Images.default}
                                    style={useGlobelStyle.uploadedImage}
                                />
                            </TouchableOpacity>
                        }
                        {
                            purchaseDetail.pdf && purchaseDetail.pdf.length > 0 && (
                                purchaseDetail.pdf.map((val, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={useGlobelStyle.imgContainer}
                                        onPress={() => {
                                            let item = { doc: val.pdf };
                                            navigation.navigate('PDFFullScreen', { 'currentItem': item, 'link': UPLOAD_URL + 'PurchasePdf/' + val.pdf });
                                            // Linking.openURL(UPLOAD_URL + 'PurchasePdf/' + val.pdf)
                                        }}
                                    >
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={Images.pdf}
                                            style={useGlobelStyle.uploadedImage}
                                        />
                                        <Text>{val.pdf}</Text>

                                    </TouchableOpacity>
                                ))
                            )
                        }

                    </ScrollView>
                </View>
                <ImageView
                    images={images}
                    imageIndex={imageIndex.current}
                    visible={visible}
                    animationType="slide"
                    onImageIndexChange={(index) => imageIndex.current = index}
                    onRequestClose={() => setIsVisible(false)}
                />
            </>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            {isRefreshing ? (
                <AppLoader2
                    loading={isRefreshing}
                    color={'red'}
                    size={40}
                />
            ) :
                <ScrollView>
                    {/* Header Section */}
                    < View style={styles.header}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Date Created')}</Text>
                                <Text style={styles.value}>{moment(purchaseDetail.date_created).format('DD MMM YYYY')}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Invoice Date')}</Text>
                                <Text style={styles.value}>{moment(purchaseDetail.invoice_date).format('DD MMM YYYY')}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Invoice Number')}</Text>
                                <Text style={styles.value}>{purchaseDetail.invoice_number ? purchaseDetail.invoice_number : '---'}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Total Item')}</Text>
                                <Text style={styles.value}>{purchaseDetail.total_item ? purchaseDetail.total_item : '---'}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Total SQFT')}</Text>
                                <Text style={styles.value}>{purchaseDetail.total_sqft ? purchaseDetail.total_sqft : '---'}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Total Points')}</Text>
                                <Text style={styles.value}>{purchaseDetail.total_point_value ? purchaseDetail.total_point_value : '---'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Details Section */}
                    <View style={styles.details}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Material Purchase From')}</Text>
                                <Text style={styles.value}>{purchaseDetail.purchase_from ? purchaseDetail.purchase_from : '---'}</Text>
                            </View>
                            {
                                purchaseDetail.purchase_from != 'Factory' && <View style={styles.column}>
                                    <Text style={styles.label}>{purchaseDetail.purchase_from ? (t(purchaseDetail.purchase_from) + ' ' + t('Name')) : ''}</Text>
                                    <Text style={styles.value}>{purchaseDetail.purchase_from_name ? (purchaseDetail.purchase_from_name) : '---'}</Text>
                                </View>
                            }

                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Value') + ' ' + t('Without GST')}</Text>
                                <Text style={styles.value}>{purchaseDetail.amount ? ('₹ ' + purchaseDetail.amount) : '---'}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Specification')}</Text>
                                <Text style={styles.value}>{purchaseDetail.specification ? purchaseDetail.specification : '---'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.row}>

                            <View style={styles.column}>
                                <Text style={styles.label}>{t('Status')}</Text>
                                <Text style={styles.value}>{purchaseDetail.status ? (purchaseDetail.status) : '---'}</Text>
                            </View>
                            {
                                purchaseDetail.status == 'Approved' && (
                                    <View style={styles.column}>
                                        <Text style={styles.label}>{t('Approved Point')}</Text>
                                        <Text style={styles.value}>{purchaseDetail.approved_point ? (purchaseDetail.approved_point) : '---'}</Text>
                                    </View>
                                )
                            }

                            {
                                purchaseDetail.status == 'Reject' && (
                                    <View style={styles.column}>
                                        <Text style={styles.label}>{t('Reason')}</Text>
                                        <Text style={styles.value}>{purchaseDetail.reason ? (purchaseDetail.reason) : '---'}</Text>
                                    </View>
                                )
                            }

                        </View>

                    </View>

                    <Tab value={tabIndex}
                        indicatorStyle={{
                            height: 3,
                            width: '50%',
                            marginBottom: 10,
                        }}
                        onChange={e => setTabIndex(e)}>
                        <Tab.Item >{t('Product Detail')}</Tab.Item>
                        <Tab.Item >{t('Attached Images')}</Tab.Item>
                    </Tab>
                    {/* Product Information */}
                    {/* <Text style={styles.sectionTitle}>{t('Product Information')}</Text> */}

                    {/* <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
                        <TabView.Item style={{ width: '100%' }}>

                            {tabViewScene1()}
                        </TabView.Item>
                        <TabView.Item style={{ width: '100%' }}>


                            {tabViewScene2()}
                        </TabView.Item>


                    </TabView> */}

                    {
                        tabIndex == 0 && tabViewScene1()
                    }

                    {
                        tabIndex == 1 && tabViewScene2()
                    }


                </ScrollView >
            }

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 8,
    },
    details: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    product: {
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 3.0,
        borderColor: '#ddd',
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    column: {
        flex: 1,
        paddingHorizontal: 8,
    },
    label: {
        fontSize: 14,
        color: '#888',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
export default PurchaseRequestDetails;
