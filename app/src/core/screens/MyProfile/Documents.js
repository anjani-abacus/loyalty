import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard, ImageBackground } from 'react-native';
import { sectionStyles as useStyles } from './styles';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import Success from '../../assets/icons/Success.svg';
import Info from '../../assets/icons/Alert.svg';
import { TabView } from 'react-native-tab-view';
import { TabBarLayout } from '../../../core/utils/Constant';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import Edit from '../../assets/icons/Edit.svg';
import ThemedText from '../../components/ThemedText';
import Verified from '../../assets/icons/verified.svg';
import { FontWeight } from '@shopify/react-native-skia';
import { ImageModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { Images } from '../../assets';




const Documents = ({ onRefresh, isLoading, navigation, loginData }) => {
    const styles = useStyles();
    const documentNumber = '123456679522';
    const GlobelStyle = useGlobelStyle();

    const routeHandler = () => {
        navigation.navigate('Update Profile', { formType: 'documentInfo' });
    };

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
            {/* Document Information */}
            <View style={styles.card}>
                <View style={[GlobelStyle.flex, GlobelStyle.alignItemsCenter, GlobelStyle.justifyContentBetween]}>
                    <View>
                        <Text style={styles.heading}>Document Information</Text>
                        {loginData?.status_of_profile === 'APPROVED' && (
                        <View style={{paddingHorizontal: 8 }}>
                            <Text style={[styles.editIconText, { color: 'green', fontSize: 10 }]}>
                                Contact admin to update document as your profile is already approved
                            </Text>
                        </View>
                    )}
                    </View>
                    {loginData?.status_of_profile != 'APPROVED' && <TouchableOpacity style={styles.editIcon} onPress={routeHandler}>
                        <Edit width={16} height={16} fill="#004CAC" />
                        <Text style={styles.editIconText}>Edit Info</Text>
                    </TouchableOpacity>}
                </View>

                {/* <Text style={styles.label}>Document Number</Text>
                <Text style={styles.value}>{documentNumber}</Text> */}
            </View>



            <View style={styles.card}>
                {/*  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>Documents</Text>
                    {/* <View style={{ backgroundColor: loginData?.kyc_status?.toLowerCase() == 'approved' ? "rgba(10, 149, 10, 1)" : "#d97706", paddingVertical: 4, paddingHorizontal: 8, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ThemedText style={[styles.statusText, { color: 'white', fontSize: 12 }]}>KYC {loginData?.kyc_status || 'Pending'}
                        </ThemedText>
                    </View> */}
                </View>
                <DocumentWrapper loginData={loginData} />
            </View>
        </ScrollView>
    );
};



const DocumentWrapper = ({ loginData }) => {
    const [ROUTES, setRoutes] = useState([
        // { key: 'PAN', title: 'Pan Card', payload: 'PAN' },
        { key: 'Other', title: loginData?.kyc_document_type, payload: 'Adhar' },
    ]);

    const styles = useStyles();
    const [activeTab, setActiveTab] = useState(0);
    const filterRenderTabBar = props => (
        <TabBarLayout
            props={{ ...props }}
            tabWidth={'auto'} // auto, count of visible tabs
            isSecondaryTab={false}
        // indicatorStyle={{backgroundColor: '#E9F6FF', height: '100%'}}
        />
    );
    const renderTypeScene = ({ focused, route, mode }) => {
        if (!focused) {return null;}

        switch (route?.key) {
            case 'PAN': return <DocumentCard document={{ kyc_status: loginData?.kyc_status, url: loginData?.document_pan_img, identityTitle: 'PAN Card', identity: loginData?.pan_no }} />;

            case 'Other': return <ScrollView>
                <DocumentCard document={{ kyc_status: loginData?.kyc_status, url: loginData?.document_img_front, identityTitle: loginData?.kyc_document_type, identity: loginData?.document_no }} />
                <DocumentCard document={{ kyc_status: loginData?.kyc_status, url: loginData?.document_img_back }} />
            </ScrollView>;
        }
    };
    return <TabView
        renderTabBar={filterRenderTabBar}
        navigationState={{ index: activeTab, routes: ROUTES }}
        renderScene={(props) => renderTypeScene({ ...props, focused: ROUTES[activeTab]?.key === props.route.key })}
        onIndexChange={setActiveTab}
        initialLayout={{ width: '100%' }}
        style={styles.tabView}
    />;
};

const DocumentCard = ({ document }) => {
    const [imagePreview, setImagePreview] = useState(false);
    const styles = useStyles();
    const { title, identity, type, isVerified, kyc_status, identityTitle } = document;
    return <View style={styles.card}>
        <Text style={styles.heading}>{title}</Text>
        <View style={styles.imagePlaceholder}>
            {document?.url ? <TouchableOpacity
                onPress={() => setImagePreview(true)}
                style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                <ImageBackground
                    source={{ uri: document?.url }}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity> : <Text style={styles.placeholderText}>{type} Image Not Uploaded</Text>
            }
        </View>
        {identityTitle && <Text style={styles.label}>{identityTitle || 'N/A'}</Text>}
        {identity && <Text style={styles.value}>{identity || 'N/A'}</Text>}

        <View style={styles.statusRow}>
            {isVerified ? <><Success width={16} height={16} />
                <Text style={[styles.statusText, { color: 'green' }]}> Verified</Text></> :
                <>

                </>
            }
        </View>
        <ImageModal modalVisible={imagePreview} setModalVisible={setImagePreview} url={document?.url || Images.default} />
    </View>;
};


export default Documents;
