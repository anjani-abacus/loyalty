import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppTheme from '../../../../components/Theme/AppTheme';
import { getAddress, getDistrictList, getstatelist } from '../../../../utils/CommonFunction/AddressCommonFunction';
import { ApiCall } from '../../../../services/ServiceProvider';
import { Image, RefreshControl, SafeAreaView, StyleSheet, ToastAndroid, TouchableOpacity, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { editProfileSchema } from '../../../../components/ValidationSchema/SchemaProfile';
import { Caption, Text, TextInput } from 'react-native-paper';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { UPLOAD_URL } from '../../../../services/BaseService';
import ConfirmationModal, { ImageModal } from '../../../../core/components/ConfirmationModal/ConfirmationModal';
import { Icon, Skeleton } from '@rneui/themed';
import AppButton from '../../../../components/Button/AppButton';
import AttachImages, { CameraGalleryPhotoUpload, CameraGalleryPhotoUpload2 } from '../../../../components/AttachImages/AttachImages';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AppLoader, { AppLoader2 } from '../../../../components/Loader/AppLoader';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
// import Translate from 'react-native-translate';

const UpdateRegistration = () => {
    const route = useRoute();
    const GlobelStyle = useGlobelStyle();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [editProfile, setEditProfile] = useState({});
    const [date, setDate] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [openDoa, setOpenDoa] = useState(false);
    const [openSheet, setOpenSheet] = useState(false);
    const [openBankSheet, setopenBankSheet] = useState(false);
    const [openPanCardSheet, setopenPanCardSheet] = useState(false);
    const [imageModalFront, setImageModalFront] = useState(false);
    const [imageModalBack, setImageModalBack] = useState(false);
    const [imageModalBank, setImageModalBank] = useState(false);
    const [imageModalPanCard, setImageModalPanCard] = useState(false);
    const [openForBackSide, setOpenForBackSide] = useState(false);
    // adhar card
    const [imagesFrontSide, setFrontsideImages] = useState([]);
    const [imagesBackSide, setBackSideImages] = useState([]);
    // pan card
    const [imagePanCard, setimagePanCard] = useState([]);
    // bank Images
    const [imagesBank, setImagesBank] = useState([]);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [getStateData, setSateData] = useState([]);
    const [getDistrictData, setDistrictData] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [openImageSheet, setopenImageSheet] = useState(false);
    const org_data = {};



    // form builder working
    const [fromData, setFromData] = useState([]);
    const [dependentformData, setdependentformData] = useState([]);
    const [formbuilderImage, setFormBuilderImage] = useState([]);


    const items = [
        { label: 'Aadhaar Card', value: 'Aadhar Card' },
        // { label: 'PanCard', value: 'PanCard' },
        { label: 'Driving Licence', value: 'Driving Licence' },
        { label: 'Voter Card', value: 'Voter Card' },
    ];

    const redeemptionPrefrenceList = [

        { label: 'Via Bank', value: 'Bank' },
        { label: 'Via UPI', value: 'UPI' },

    ];



    const onDismiss = () => {
        setOpen(false);
        setOpenDoa(false);
    };


    const renderLabel = (value, label, required) => {
        if (value) {
            return (
                <Text style={[GlobelStyle.label]}>
                    {t(label)} {required && ' *'}
                </Text>
            );
        }
        return null;
    };



    useEffect(() => {
        setEditProfile(route.params.data);
        getstatelist(setSateData);
        setFromData(route.params.data.form_builder);
        if (editProfile.state !== '') {
            getDistrictList(route.params.data.state, setDistrictData);
        }
    }, [route.params.data]);

    const submit = async (value) => {
        try {


            let formData = {};
            formData = value;
            if (imagesFrontSide.length > 0) {
                formData.doc_edit_id = editProfile.id;
                formData.document_image = imagesFrontSide[0].base64;

            } else {
                formData.document_image = editProfile.document_image || '';
            }

            if (imagesBackSide.length > 0) {
                formData.doc_edit_back_id = editProfile.id;
                formData.document_image_back = imagesBackSide[0].base64;

            } else {
                formData.document_image_back = editProfile.document_image_back || '';
            }

            if (imagesBank.length > 0) {
                formData.bank_img_id = '';
                formData.bank_img = imagesBank[0].base64;

            } else {
                formData.bank_img = editProfile.bank_img || '';
            }

            if (imagePanCard.length > 0) {
                formData.doc_pan_id = '';
                formData.pan_img = imagePanCard[0].base64;
            } else {
                formData.pan_img = editProfile.pan_img || '';
            }
            // formData.document_image = editProfile.document_image || '';
            // formData.document_image_back = editProfile.document_image_back || '';
            // formData.bank_img = editProfile.bank_img || '';
            // formData.pan_img = editProfile.pan_img || '';


            formData.package_name = DeviceInfo.getBundleId();
            formData.form_builder = fromData;
            formData.form_builder_dependent = dependentformData;
            formData.exist_id = editProfile.id;
            formData.profile_edit_id = editProfile.id;
            formData.profileBase64 = false;
            formData.profile = '';
            if (imagesFrontSide.length > 0) {
                formData.docFrontBase64 = true;
            } else {
                formData.docFrontBase64 = false;
            }
            if (imagesBackSide.length > 0) {
                formData.docBackBase64 = true;
            } else {
                formData.docBackBase64 = false;
            }
            if (imagesBank.length > 0) {
                formData.bankImgBase64 = true;
            } else {
                formData.bankImgBase64 = false;
            }
            if (imagePanCard.length > 0) {
                formData.panBase64 = true;
            } else {
                formData.panBase64 = false;
            }

            if (formData.bank_img == '' && formData.user_redeemption_prefrence != 'UPI') {

                Toast.show({ type: 'error', text1: t('Passbook/Cheque Image is Required'), visibilityTime: 6000 });
                return;
            }

            if (formData.document_type && formData.document_image == '') {
                Toast.show({ type: 'error', text1: 'Document Image Is Required', visibilityTime: 1000 });

                return;
            }

            if (formData.document_image != '' && formData.document_type == 'Aadhar Card') {
                if (formData.document_image_back == '') {
                    Toast.show({ type: 'error', text1: 'Aadhaar Card Back Side Image is required', visibilityTime: 1000 });


                    return;
                }
            }
            setButtonLoading(true);
            setButtonDisable(true);

            const result = await ApiCall({ 'data': formData }, 'AppInfluencerSignup/addInfluencer',);
            if (result.statusCode === 200) {

                Toast.show({ type: 'success', text1: t(result.statusMsg), visibilityTime: 1000 });
                setButtonLoading(false);
                setButtonDisable(false);
                navigation.pop();


            } else {
                Toast.show({ type: 'error', text1: t(result.statusMsg), visibilityTime: 1000 });


                setButtonDisable(false);
                setButtonLoading(false);

            }

        } catch (error) {
            setButtonDisable(false);
            setButtonLoading(false);
            Toast.show({ type: 'error', text1: error.message || 'An unexpected error occurred', visibilityTime: 1000 });

        }
    };

    const loader = (value) => {
        if (value.length === 6) {
            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 4000);
        }

    };
    const loader2 = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 4000);

    };

    // const getFormData = useCallback(
    //     async () => {
    //         try {
    //             await ApiCall({ 'app_id': 'com.basiq360.starkpaints' || DeviceInfo.getBundleId() }, 'AppInfluencerSignup/fetchInfluencerFormBuilderFields')
    //                 .then(result => {
    //                     if (result.statusCode == 200) {
    //                         setFromData(result.data);
    //                     } else {
    //                         ToastAndroid.show(result.statusMsg || 'An unexpected error occurred', ToastAndroid.LONG);
    //                     }
    //                 })

    //         } catch (error) {
    //             ToastAndroid.show(error.message || 'An unexpected error occurred', ToastAndroid.LONG);
    //         }
    //     },
    //     [],
    // )

    const generateDynamicSchema = () => {
        let count = 0;
        fromData.length > 0 && fromData.forEach((row) => {
            if (formbuilderImage.length > 0 && row.field_type == 'File') {
                row.img_id = '';
                row.value = formbuilderImage[0]?.base64;
            }
            if (row.is_mandate === 'YES' && row.value === '') {
                count++;
            }
        });
        if (count > 0) {
            Toast.show({ type: 'error', text1: 'Please Fill Additional Information Data Also', visibilityTime: 1000 });
            return true;
        } else {
            return false;
        }
    };



    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={[GlobelStyle.container]}>
                {buttonLoading ?
                    <AppLoader2 isLoading={buttonLoading} /> :
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefreshing} />}>
                        <Formik
                            initialValues={{
                                // company_name: editProfile.company_name || '',
                                mobile_no: editProfile.mobile_no || '',
                                name: editProfile.name || '',
                                dob: editProfile.dob !== '0000-00-00' ? editProfile.dob : '',
                                email: editProfile.email || '',
                                address: editProfile.address || '',
                                pincode: editProfile.pincode || '',
                                state: editProfile.state || '',
                                district: editProfile.district || '',
                                city: editProfile.city || '',
                                doa: editProfile.doa !== '0000-00-00' ? editProfile.doa : '',
                                dealer_name: editProfile.dealer_name !== '' ? editProfile.dealer_name : '',
                                dealer_mobile: editProfile.dealer_mobile !== '' ? editProfile.dealer_mobile : '',
                                document_type: editProfile.document_type !== '' ? editProfile.document_type : '',
                                document_no: editProfile.document_no !== '' ? editProfile.document_no : '',
                                distributor_name: editProfile.distributor_name !== '' ? editProfile.distributor_name : '',
                                bank_name: editProfile.bank_name !== '' ? editProfile.bank_name : '',
                                account_holder_name: editProfile.account_holder_name !== '' ? editProfile.account_holder_name : '',
                                account_no: editProfile.account_no !== '' ? editProfile.account_no : '',
                                ifsc_code: editProfile.ifsc_code !== '' ? editProfile.ifsc_code : '',
                                pan_no: editProfile.pan_no !== '' ? editProfile.pan_no : '',
                                upi_id: editProfile.upi_id !== '' ? editProfile.upi_id : '',
                                user_redeemption_prefrence: editProfile.user_redeemption_prefrence !== '' ? editProfile.user_redeemption_prefrence : '',
                            }}
                            enableReinitialize
                            validationSchema={editProfileSchema}
                            validateOnChange={true}
                            onSubmit={values => {
                                const val = generateDynamicSchema();

                                if (val === false) {
                                    submit(values);
                                }
                            }}
                        >
                            {({ handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, validateForm }) => (
                                <View style={styles.container}>
                                    <Text style={styles.header}>{t('Personal Info')}</Text>

                                    <View style={[GlobelStyle.mt8]}>

                                        <TextInput style={styles.input} name={'mobile_no'} placeholder={'Mobile No *'} value={values.mobile_no} onChangeText={handleChange('mobile_no')} label={t('Mobile No') + '*'} mode="outlined" readOnly required />
                                        {touched.mobile_no && errors.mobile_no && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.mobile_no}
                                            </Animatable.Text>
                                        )}

                                    </View>

                                    {/* <View style={[GlobelStyle.mt8]}>
                                  <TextInput style={styles.input} name='company_name' placeholder='Company Name' value={values.company_name} onChangeText={handleChange('company_name')} required label={"Company Name *"} mode='outlined' />
                                  {errors.company_name && touched.company_name && (
                                      <Caption style={{ color: 'red', paddingTop: -15 }}>
                                          {errors.company_name}
                                      </Caption>
                                  )}
                              </View> */}

                                    <View style={[GlobelStyle.mt8]}>
                                        <TextInput style={styles.input} name="name" placeholder="Name" value={values.name} onChangeText={handleChange('name')} label={t('Name') + ' *'} mode="outlined" onBlur={handleBlur('name')} />
                                        {(errors.name && touched.name) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.name}
                                            </Animatable.Text>
                                        )}
                                    </View>

                                    <View style={[GlobelStyle.mt8]}>
                                        <TextInput style={styles.input} name="email" placeholder="Email" value={values.email} onChangeText={handleChange('email')} label={t('Email ID') + ''} onBlur={handleBlur('email')} mode="outlined" />
                                        {(errors.email && touched.email) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.email}
                                            </Animatable.Text>
                                        )}
                                    </View>

                                    <View style={[GlobelStyle.mt8]}>
                                        <TouchableOpacity onPress={() => setOpen(!open)}>

                                            <TextInput
                                                label={t('Date of Birth') + ' *'}
                                                mode="outlined"
                                                value={values.dob ? moment(values.dob).format('DD MMM YYYY') : values.dob}
                                                onChangeText={handleChange('dob')}
                                                readOnly
                                                onBlur={handleBlur('dob')}
                                                style={styles.input}
                                                right={<TextInput.Icon icon="calendar" onPress={() => setOpen(!open)} />}
                                            />

                                            <DateTimePickerModal
                                                isVisible={open}
                                                maximumDate={new Date()}
                                                mode="date"
                                                onConfirm={date => {

                                                    setOpen(false);
                                                    handleChange('dob')(moment(date).format('YYYY-MM-DD'));
                                                }}
                                                onCancel={onDismiss}
                                            />

                                            {(errors.dob && touched.dob) && (
                                                <Animatable.Text
                                                    animation="shake"
                                                    style={[GlobelStyle.error]}>
                                                    {errors.dob}
                                                </Animatable.Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[GlobelStyle.mt8]}>
                                        <TouchableOpacity onPress={() => setOpenDoa(!openDoa)}>

                                            <TextInput
                                                label={t('Date of Anniversary')}
                                                mode="outlined"
                                                value={values.doa ? moment(values.doa).format('DD MMM YYYY') : values.doa}
                                                onChangeText={handleChange('doa')}
                                                onBlur={handleBlur('dob')}
                                                readOnly
                                                style={styles.input}
                                                right={<TextInput.Icon icon="calendar" onPress={() => setOpenDoa(!openDoa)} />}
                                            />
                                            <DateTimePickerModal
                                                isVisible={openDoa}
                                                maximumDate={new Date()}
                                                mode="date"
                                                onConfirm={date => {
                                                    setOpenDoa(!openDoa);
                                                    handleChange('doa')(moment(date).format('YYYY-MM-DD'));
                                                }}
                                                onCancel={onDismiss}
                                            />


                                            {(errors.doa && touched.doa) && (
                                                <Animatable.Text
                                                    animation="shake"
                                                    style={[GlobelStyle.error]}>
                                                    {errors.doa}
                                                </Animatable.Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.header}>{t('Address Information')}</Text>

                                    <View style={[GlobelStyle.mt8]}>

                                        <TextInput style={styles.input} name={'pincode'} placeholder={'Pincode'} value={values.pincode} onChangeText={(value) => { handleChange('pincode')(value); getAddress(value, setFieldValue, setDistrictData); loader(value); }} label={t('Pincode') + '*'} onBlur={handleBlur('pincode')} mode="outlined"
                                            maxLength={6} keyboardType={'numeric'} />
                                        {(errors.pincode || touched.pincode) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.pincode}
                                            </Animatable.Text>
                                        )}
                                    </View>


                                    <View style={GlobelStyle.mt8}>
                                        {
                                            isRefreshing ?
                                                <Skeleton
                                                    style={[GlobelStyle.skeltonPickerDataStyle]}
                                                    LinearGradientComponent={LinearGradient}
                                                    animation="wave"
                                                    variant="text"
                                                    width={80}
                                                    height={50}
                                                /> :

                                                (
                                                    <>

                                                        {renderLabel(values.state, 'State', true)}
                                                        <Dropdown
                                                            style={[GlobelStyle.dropdown, { borderColor: '#000' }]}
                                                            placeholderStyle={GlobelStyle.placeholderStyle}
                                                            selectedTextStyle={GlobelStyle.selectedTextStyle}
                                                            inputSearchStyle={GlobelStyle.inputSearchStyle}
                                                            iconStyle={GlobelStyle.iconStyle}
                                                            itemTextStyle={{ color: AppTheme.dark.Black }}
                                                            data={getStateData}
                                                            search
                                                            maxHeight={300}
                                                            name="State"
                                                            labelField="state_name"
                                                            valueField="state_name"
                                                            placeholder={t('State') + ' *'}
                                                            searchPlaceholder="Search..."
                                                            value={values.state}
                                                            onChange={item => {
                                                                loader2();
                                                                setFieldValue('state', item.state_name);
                                                                getDistrictList(item.state_name, setDistrictData);
                                                            }}

                                                        />
                                                    </>
                                                )



                                        }
                                        {errors.state && touched.state && (
                                            <Caption style={[GlobelStyle.errorMsg]}>
                                                {errors.state}
                                            </Caption>
                                        )}
                                    </View>

                                    <View style={GlobelStyle.mt8}>
                                        {
                                            isRefreshing ? <Skeleton
                                                style={[GlobelStyle.skeltonPickerDataStyle]}
                                                LinearGradientComponent={LinearGradient}
                                                animation="wave"
                                                variant="text"
                                                width={80}
                                                height={50}
                                            /> :
                                                (
                                                    <>
                                                        {renderLabel(values.district, 'District', true)}
                                                        <Dropdown
                                                            style={[GlobelStyle.dropdown, { borderColor: '#000' }]}
                                                            placeholderStyle={GlobelStyle.placeholderStyle}
                                                            selectedTextStyle={GlobelStyle.selectedTextStyle}
                                                            inputSearchStyle={GlobelStyle.inputSearchStyle}
                                                            iconStyle={GlobelStyle.iconStyle}
                                                            data={getDistrictData}
                                                            itemTextStyle={{ color: AppTheme.dark.Black }}
                                                            search
                                                            maxHeight={300}
                                                            name="district"
                                                            labelField="district_name"
                                                            valueField="district_name"
                                                            placeholder={t('District') + ' *'}
                                                            searchPlaceholder="Search..."
                                                            value={values.district}
                                                            onChange={item => {
                                                                setFieldValue('district', item.district_name);
                                                                setFieldValue('city', '');
                                                                setFieldValue('address', '');
                                                            }}

                                                        />
                                                        {errors.district && touched.district && (
                                                            <Caption style={[GlobelStyle.errorMsg]}>
                                                                {errors.district}
                                                            </Caption>
                                                        )}
                                                    </>
                                                )
                                        }

                                    </View>

                                    <View style={GlobelStyle.mt10}>

                                        <TextInput style={styles.input} name="city" placeholder="City" value={values.city} onChangeText={handleChange('city')} label={t('City') + '*'} mode="outlined"
                                            onBlur={handleBlur('city')} />
                                        {(touched.city || errors.city) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.city}
                                            </Animatable.Text>
                                        )}
                                    </View>
                                    <View style={[GlobelStyle.mt0]}>

                                        <TextInput label={t('Address') + '*'} name="address" placeholder="Address" value={values.address} onChangeText={handleChange('address')} style={styles.input} mode="outlined" onBlur={handleBlur('address')} />
                                        {(touched.address && errors.address) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.address}
                                            </Animatable.Text>
                                        )}
                                    </View>



                                    {/* Document Information  */}
                                    <Text style={styles.header}>{t('Document Information')}</Text>

                                    <View style={[GlobelStyle.mt10]}>
                                        {renderLabel(values.district, 'Select Document Type', true)}
                                        <Dropdown
                                            style={[GlobelStyle.dropdown, { borderColor: '#000' }]}
                                            placeholderStyle={GlobelStyle.placeholderStyle}
                                            selectedTextStyle={GlobelStyle.selectedTextStyle}
                                            inputSearchStyle={GlobelStyle.inputSearchStyle}
                                            iconStyle={GlobelStyle.iconStyle}
                                            data={items}
                                            search
                                            itemTextStyle={{ color: AppTheme.dark.Black }}
                                            maxHeight={300}
                                            name="document_type"
                                            labelField="label"
                                            valueField="value"
                                            placeholder={t('Select Document Type') + ' *'}
                                            searchPlaceholder="Search..."
                                            value={values.document_type}
                                            onChange={item => {
                                                setFieldValue('document_type', item.value);
                                                editProfile.document_image = '';
                                                editProfile.document_image_back = '';
                                                setFrontsideImages([]);
                                                setBackSideImages([]);
                                            }}

                                        />
                                        {(errors.document_type && touched.document_type) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.document_type}
                                            </Animatable.Text>
                                        )}
                                    </View>


                                    <View style={GlobelStyle.mt4}>
                                        {
                                            values.document_type === 'Aadhar Card' && (<TextInput style={styles.input} name={'document_no'} placeholder={'Aadhaar Card'} value={values.document_no} onChangeText={handleChange('document_no')} label={t('Aadhaar Card Number') + ' *'} mode={'outlined'} minLength={12} maxLength={12} keyboardType={'numeric'}
                                                onBlur={handleBlur('document_no')}

                                            />)
                                        }
                                        {
                                            values.document_type === 'Voter Card' && (<TextInput style={styles.input} name={'document_no'} placeholder={'Voter Card'} value={values.document_no} onChangeText={handleChange('document_no')} label={t('Voter Card Number') + ' *'} mode={'outlined'} minLength={10} maxLength={10} onBlur={handleBlur('document_no')} />)
                                        }
                                        {
                                            values.document_type === 'Driving Licence' && (<TextInput style={styles.input} name={'document_no'} placeholder={'Driving Licence'} value={values.document_no} onChangeText={handleChange('document_no')} label={t('Driving Licence') + ' *'} mode={'outlined'} minLength={15} maxLength={15} onBlur={handleBlur('document_no')} />)
                                        }
                                        {/* {
                                      values.document_type === 'PanCard' && (<TextInput style={styles.input} name={'document_no'} placeholder={'PanCard'} value={values.document_no} onChangeText={handleChange('document_no')} label={'PanCard Number *'} mode={'outlined'} minLength={10} maxLength={10} keyboardType={'numeric'} required />)
                                  } */}

                                        {values.document_type && (errors.document_no && touched.document_no) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.document_no}
                                            </Animatable.Text>
                                        )}
                                    </View>


                                    <View style={[styles.imageContainer, GlobelStyle.mt10]}>
                                        {
                                            (editProfile.document_image !== '' || editProfile.document_image || imagesFrontSide.length > 0) ? (
                                                <View style={styles.imageWrapper}>
                                                    <Text style={styles.subHeader}>{t('Upload Document front side')}</Text>
                                                    <TouchableOpacity onPress={() => setImageModalFront(true)}>
                                                        <Image source={{ uri: (imagesFrontSide.length < 1) ? (UPLOAD_URL + 'influencer_doc/' + editProfile.document_image) : imagesFrontSide[0]?.base64 }} style={styles.image} />

                                                        <ImageModal modalVisible={imageModalFront} setModalVisible={setImageModalFront} url={(imagesFrontSide.length < 1) ? (UPLOAD_URL + 'influencer_doc/' + editProfile.document_image) : imagesFrontSide[0]?.base64} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.addButton} onPress={() => {
                                                            setFrontsideImages([]); editProfile.document_image = '';
                                                        }}>
                                                        <Icon
                                                            name="delete"
                                                            type="material"
                                                            style={{ alignItems: 'center' }}
                                                            color={'#FFF'}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                </View>) : (

                                                <AttachImages
                                                    title={t('Upload Document front side')}
                                                    onlyCamera={false}
                                                    isMultiple={false}
                                                    labelStyle={styles.subHeader}
                                                    images={imagesFrontSide}
                                                    setImages={setFrontsideImages}
                                                />
                                            )
                                        }

                                        {
                                            values.document_type === 'Aadhar Card' && (
                                                (editProfile.document_image_back !== '' || editProfile.document_image_back || imagesBackSide.length > 0) ? (<View style={styles.imageWrapper}>
                                                    <Text style={styles.subHeader}>{t('Upload Document back side')}</Text>
                                                    <TouchableOpacity onPress={() => setImageModalBack(true)}>
                                                        <Image source={{ uri: imagesBackSide.length < 1 ? (UPLOAD_URL + 'influencer_doc/' + editProfile.document_image_back) : imagesBackSide[0]?.base64 }} style={styles.image} />
                                                        <ImageModal modalVisible={imageModalBack} setModalVisible={setImageModalBack} url={imagesBackSide.length > 0 ? imagesBackSide[0]?.base64 : (UPLOAD_URL + 'influencer_doc/' + editProfile.document_image_back)} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={styles.addButton} onPress={() => {
                                                            setBackSideImages([]);
                                                            editProfile.document_image_back = '';
                                                        }}>
                                                        <Icon
                                                            name="delete"
                                                            type="material"
                                                            style={{ alignItems: 'center' }}
                                                            color={'#FFF'}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                </View>) : (<View style={styles.imageWrapper}>
                                                    <AttachImages
                                                        title={t('Upload Document back side')}
                                                        onlyCamera={false}
                                                        isMultiple={false}
                                                        labelStyle={styles.subHeader}

                                                        images={imagesBackSide}
                                                        setImages={setBackSideImages}
                                                    />
                                                </View>)
                                            )

                                        }

                                    </View>

                                    {/* Pan Card Information */}
                                    <Text style={styles.header}>{t('Pan Card Information')}</Text>
                                    <View style={[GlobelStyle.mt10]}>
                                        <TextInput style={styles.input} name={'pan_no'} placeholder={'PanCard'} value={values.pan_no} onChangeText={handleChange('pan_no')} label={t('Pan Card Number') + ''} mode={'outlined'} minLength={10} maxLength={10} required />
                                    </View>
                                    {(errors.pan_no || touched.pan_no) && (
                                        <Animatable.Text
                                            animation="shake"
                                            style={[GlobelStyle.error]}>
                                            {errors.pan_no}
                                        </Animatable.Text>
                                    )}
                                    <View style={[GlobelStyle.mt10, styles.imageContainer]}>
                                        {
                                            (editProfile.pan_img !== '' || imagePanCard.length > 0) ? (
                                                <View style={styles.imageWrapper}>
                                                    <Text style={styles.subHeader}>{t('Upload Pan Card')}</Text>
                                                    < TouchableOpacity onPress={() => setImageModalPanCard(!imageModalPanCard)}>
                                                        <Image source={{ uri: (imagePanCard.length < 1) ? (UPLOAD_URL + 'influencer_doc/' + editProfile.pan_img) : imagePanCard[0]?.base64 }} style={styles.image} />

                                                        <ImageModal modalVisible={imageModalPanCard} setModalVisible={setImageModalPanCard} url={imagePanCard.length < 1 ? (UPLOAD_URL + 'influencer_doc/' + editProfile.pan_img) : imagePanCard[0].base64} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.addButton} onPress={() => {
                                                            setimagePanCard([]);
                                                            editProfile.pan_img = '';
                                                        }}>
                                                        <Icon
                                                            name="delete"
                                                            type="material"
                                                            style={{ alignItems: 'center' }}
                                                            color={'#FFF'}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                </View>) : (
                                                <AttachImages
                                                    title={t('Upload Pan Card')}
                                                    onlyCamera={false}
                                                    isMultiple={false}
                                                    labelStyle={styles.subHeader}
                                                    images={imagePanCard}
                                                    setImages={setimagePanCard}
                                                />
                                            )
                                        }
                                    </View>
                                    {/* bank information */}
                                    <Text style={styles.header}>{t('Bank Information')}</Text>

                                    <View style={[GlobelStyle.mt10]}>
                                        {renderLabel(values.user_redeemption_prefrence, 'Redeemption Preference', true)}
                                        <Dropdown
                                            style={[GlobelStyle.dropdown, { borderColor: '#000' }]}
                                            placeholderStyle={GlobelStyle.placeholderStyle}
                                            selectedTextStyle={GlobelStyle.selectedTextStyle}
                                            inputSearchStyle={GlobelStyle.inputSearchStyle}
                                            iconStyle={GlobelStyle.iconStyle}
                                            data={redeemptionPrefrenceList.filter((r) => {
                                                if ((org_data.redeemption_prefrence == '0' && org_data.redeemption_prefrence != '2')) {
                                                    return r.value == 'Bank';
                                                } else if ((org_data.redeemption_prefrence == '1' && org_data.redeemption_prefrence != '2')) {
                                                    return r.value == 'UPI';
                                                } else {
                                                    return r.value;
                                                }
                                            })}
                                            // data={redeemptionPrefrenceList}
                                            search
                                            maxHeight={300}
                                            name="user_redeemption_prefrence"
                                            labelField="label"
                                            valueField="value"
                                            placeholder={t('Select Redeemption Preference') + ' *'}
                                            searchPlaceholder="Search..."
                                            value={values.user_redeemption_prefrence}
                                            onChange={item => {
                                                setFieldValue('user_redeemption_prefrence', item.value);

                                            }}

                                        />
                                        {(errors.user_redeemption_prefrence && touched.user_redeemption_prefrence) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.user_redeemption_prefrence}
                                            </Animatable.Text>
                                        )}
                                    </View>

                                    {
                                        values.user_redeemption_prefrence == 'Bank' ? (
                                            <>
                                                <View style={[GlobelStyle.mt10]}>
                                                    <TextInput label={t('Bank Name') + ' *'} name="bank_name" placeholder="Bank Name" value={values.bank_name} onChangeText={handleChange('bank_name')} onBlur={handleBlur('bank_name')} style={styles.input} mode="outlined" />
                                                    {(touched.bank_name && errors.bank_name) && (
                                                        <Animatable.Text
                                                            animation="shake"
                                                            style={[GlobelStyle.error]}>
                                                            {errors.bank_name}
                                                        </Animatable.Text>
                                                    )}
                                                </View>
                                                <View style={[GlobelStyle.mt10]}>
                                                    <TextInput label={t('Account Holder Name') + ' *'} name="account_holder_name" placeholder="Account Holder Name" value={values.account_holder_name} onChangeText={handleChange('account_holder_name')} style={styles.input} mode="outlined" onBlur={handleBlur('account_holder_name')} />
                                                    {(touched.account_holder_name && errors.account_holder_name) && (
                                                        <Animatable.Text
                                                            animation="shake"
                                                            style={[GlobelStyle.error]}>
                                                            {errors.account_holder_name}
                                                        </Animatable.Text>
                                                    )}
                                                </View>
                                                <View style={[GlobelStyle.mt10]}>
                                                    <TextInput label={t('Account Number') + ' *'} name="account_no" placeholder="Account Number" value={values.account_no} onChangeText={handleChange('account_no')} onBlur={handleBlur('account_no')} style={styles.input} mode="outlined" keyboardType="numeric" maxLength={18} />
                                                    {(touched.account_no && errors.account_no) && (
                                                        <Animatable.Text
                                                            animation="shake"
                                                            style={[GlobelStyle.error]}>
                                                            {errors.account_no}
                                                        </Animatable.Text>
                                                    )}
                                                </View>
                                                <View style={[GlobelStyle.mt10]}>
                                                    <TextInput label={t('IFSC Code') + ' *'} name="ifsc_code" placeholder="IFSC Code" value={values.ifsc_code} onChangeText={handleChange('ifsc_code')} onBlur={handleBlur('ifsc_code')} style={styles.input} maxLength={11} mode="outlined" autoCorrect={true} />
                                                    {(touched.ifsc_code && errors.ifsc_code) && (
                                                        <Animatable.Text
                                                            animation="shake"
                                                            style={[GlobelStyle.error]}>
                                                            {errors.ifsc_code}
                                                        </Animatable.Text>
                                                    )}
                                                </View>
                                                <View style={[GlobelStyle.mt10, styles.imageContainer]}>
                                                    {
                                                        ((editProfile.bank_img !== '' && editProfile.bank_img) || imagesBank.length > 0) ? (
                                                            <View style={styles.imageWrapper}>
                                                                <Text style={styles.subHeader}>{t('Upload Cheque/Passbook')}</Text>
                                                                <TouchableOpacity onPress={() => setImageModalBank(true)}>
                                                                    <Image source={{ uri: (imagesBank.length < 1) ? (UPLOAD_URL + 'influencer_doc/' + editProfile.bank_img) : imagesBank[0]?.base64 }} style={styles.image} />

                                                                    <ImageModal modalVisible={imageModalBank} setModalVisible={setImageModalBank} url={(imagesBank.length < 1) ? (UPLOAD_URL + 'influencer_doc/' + editProfile.bank_img) : imagesBank[0]?.base64} />
                                                                </TouchableOpacity>

                                                                <TouchableOpacity
                                                                    style={styles.addButton} onPress={() => {
                                                                        setImagesBank([]);
                                                                        editProfile.bank_img = '';
                                                                    }}>
                                                                    <Icon
                                                                        name="delete"
                                                                        type="material"
                                                                        style={{ alignItems: 'center' }}
                                                                        color={'#FFF'}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>) : (
                                                            <AttachImages
                                                                title={t('Upload Cheque/Passbook')}
                                                                onlyCamera={false}
                                                                isMultiple={false}
                                                                labelStyle={styles.subHeader}
                                                                images={imagesBank}
                                                                setImages={setImagesBank}
                                                            />

                                                        )
                                                    }
                                                </View>
                                            </>)
                                            :
                                            (<>
                                                <View style={[GlobelStyle.mt10]}>
                                                    <TextInput label={t('UPI') + ' *'} name="upi_id" placeholder="UPI" value={values.upi_id} onChangeText={handleChange('upi_id')} onBlur={handleBlur('upi_id')} style={styles.input} mode="outlined" />
                                                    {(touched.upi_id && errors.upi_id) && (
                                                        <Animatable.Text
                                                            animation="shake"
                                                            style={[GlobelStyle.error]}>
                                                            {errors.upi_id}
                                                        </Animatable.Text>
                                                    )}
                                                </View>
                                            </>
                                            )
                                    }
                                    {/* Dealer Information */}
                                    <Text style={styles.header}>{t('Dealer Detail')}</Text>
                                    <View style={[GlobelStyle.mt10]}>
                                        <TextInput label={t('Dealer Name') + ''} name="dealer_name" placeholder="Dealer Name" value={values.dealer_name} onChangeText={handleChange('dealer_name')} onBlur={handleBlur('dealer_name')} style={styles.input} mode="outlined" />
                                        {(touched.dealer_name || errors.dealer_name) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.dealer_name}
                                            </Animatable.Text>
                                        )}
                                    </View>
                                    <View style={[GlobelStyle.mt8]}>
                                        <TextInput style={styles.input} name="dealer_mobile" placeholder="Dealer Number" value={values.dealer_mobile} onChangeText={handleChange('dealer_mobile')} onBlur={handleBlur('dealer_mobile')} label={t('Dealer Mobile') + ''} mode="outlined" minLength={10} maxLength={10} keyboardType="numeric" />
                                        {(errors.dealer_mobile || touched.dealer_mobile) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.dealer_mobile}
                                            </Animatable.Text>
                                        )}
                                    </View>
                                    <View style={[GlobelStyle.mt10]}>
                                        <TextInput label={t('Distributor Name') + ''} name="distributor_name" placeholder="Distirbutor Name" value={values.distributor_name} onChangeText={handleChange('distributor_name')} onBlur={handleBlur('distributor_name')} style={styles.input} mode="outlined" />
                                        {(touched.distributor_name || errors.distributor_name) && (
                                            <Animatable.Text
                                                animation="shake"
                                                style={[GlobelStyle.error]}>
                                                {errors.distributor_name}
                                            </Animatable.Text>
                                        )}
                                    </View>
                                    {
                                        fromData.length > 0 && (
                                            <>
                                                <Text style={styles.header}>{t('Additional Information')}</Text>

                                            </>
                                        )
                                    }
                                    <View style={GlobelStyle.mt8}>
                                        <AppButton
                                            title={(t('Submit'))}
                                            mode={'contained'}
                                            loading={buttonLoading}

                                            disabled={buttonDisable}
                                            color={AppTheme.dark.themeColor}
                                            onPress={() => {
                                                validateForm().then((errors) => {

                                                    if (Object.keys(errors).length === 0) {
                                                        setModalVisible(!modalVisible);
                                                    } else {
                                                        handleSubmit();
                                                        Toast.show({ type: 'error', text1: t('Please Fill Required Field'), visibilityTime: 1000 });
                                                    }

                                                }
                                                );
                                            }}
                                        />
                                    </View>
                                    <ConfirmationModal
                                        modalVisible={modalVisible}
                                        setModalVisible={setModalVisible}
                                        confirmSubmit={handleSubmit}
                                        iconName="clipboard-text-search"
                                        iconType="material-community"
                                        title={t('Update Profile')}
                                        content={t('Are you sure you want to submit ?')}
                                        theme="Submit"
                                    />
                                </View>
                            )}
                        </Formik>


                    </ScrollView>
                }


                {/* {
                    openSheet &&
                    <CameraGalleryPhotoUpload openSheet={openSheet} setOpenSheet={setOpenSheet} setImages={setFrontsideImages} obj={setEditProfile} type="frontSideTake" />
                } */}
                {
                    openForBackSide &&
                    <CameraGalleryPhotoUpload openSheet={openForBackSide} setOpenSheet={setOpenForBackSide} setImages={setBackSideImages} obj={setEditProfile} type="backSideTake" />
                }
                {
                    openBankSheet &&
                    <CameraGalleryPhotoUpload openSheet={openBankSheet} setOpenSheet={setopenBankSheet} setImages={setImagesBank} obj={setEditProfile} type="bankPassBook" />
                }
                {
                    openPanCardSheet &&
                    <CameraGalleryPhotoUpload openSheet={openPanCardSheet} setOpenSheet={setopenPanCardSheet} setImages={setimagePanCard} obj={setEditProfile} type="pancardphoto" />
                }
                {/* {
                    openImageSheet &&
                    <CameraGalleryPhotoUpload openSheet={openImageSheet} setOpenSheet={setopenImageSheet} setImages={setFormBuilderImage} obj={{}} type="formBuilderImage" />
                } */}
                <CameraGalleryPhotoUpload2 modalVisible={openImageSheet} setModalVisible={setopenImageSheet} onlyCamera={false} isMultiple={false} setImages={setFormBuilderImage} images={formbuilderImage} />
            </SafeAreaView >
        </BottomSheetModalProvider >

    );
};

export default UpdateRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    input: {
        height: 50,
        // borderColor: '#ccc',
        // borderWidth: 1,
        // borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    // drop down

    DropDowncontainer: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        // borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000',
        marginLeft: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    // images styles
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        zIndex: 10,
        justifyContent: 'space-between',
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 8,
        zIndex: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000',
    },
    deleteButton: {
        position: 'absolute',
        top: 15,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 4,
        borderRadius: 50,
    },
    addButton: {
        position: 'absolute',
        top: 10,
        backgroundColor: '#fc141f',
        padding: 3,
        marginTop: 8,
        borderRadius: 50,
    },
    required: {
        color: 'red',
    },
});
