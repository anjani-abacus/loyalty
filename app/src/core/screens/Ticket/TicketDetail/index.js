import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Image,
  styleheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { Avatar } from 'react-native-paper';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import moment from 'moment';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import Style from '../../../assets/Style/styles';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import { ApiCall } from '../../../../services/ServiceProvider';
import { UPLOAD_URL } from '../../../../services/BaseService';
import TktDetailStyle from './style';
import FastImage from 'react-native-fast-image';
import { titleCase } from '../../../../core/utils/TextUtils';

const TicketDetail = ({ route }) => {
  const { t } = useTranslation();
  const ticketId = route.params.id;
  const activeTheme = useActiveTheme();
  const style = TktDetailStyle();
  const GlobelStyle = useGlobelStyle();
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  // const [imageIndex, setImageIndex] = useState(0);
  const imageIndex = useRef(0);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [ticketDetail, setTicketDetail] = useState([]);
  const screenHeight = useWindowDimensions().height;

  useEffect(() => {
    getTicketDetail();
  }, []);

  const imageModal = index => {
    // setImageIndex(index);
    imageIndex.current = index;
    const newArray = ticketDetail?.img.map((r, index) => {
      return { uri: UPLOAD_URL + 'support/' + r.document_name };
    });
    setImages(newArray);
    // setImages([{uri: uri}]);
    setIsVisible(true);
  };

  const getTicketDetail = async () => {
    try {
      const result = await ApiCall(
        { id: ticketId },
        'AppSupport/getSupportDetail',
      );

      if (result.statusCode === 200) {
        setTicketDetail(result.data);
        if (result.data.length < 20) {
          setEndReached(true);
        }
      }
      if (result.data.length < 20) {
        setEndReached(true);
      }
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error occurred while fetching tickets data:', error);
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView>
        <View>
          {isRefreshing ? (
            <View
              style={{ flex: 1, height: screenHeight }}>
              <AppLoader2
                loading={isRefreshing}

              />
            </View>
          ) : (
            <>
              <View style={[{ marginBottom: 50 }]}>
                <View key={ticketDetail.id}>
                  <View
                    style={[
                      Style.lastInfoBox,
                      { backgroundColor: '#E3F3FF', padding: 15 },
                    ]}>
                    <View>
                      <View
                        style={[
                          Style.lastInfoTitle,
                          { marginLeft: 0, paddingLeft: 0 },
                        ]}>
                        <Text
                          style={[Style.lastInfoTitleText, { marginLeft: 0 }]}>
                          {t('Date Created')}
                        </Text>
                      </View>
                      <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>
                        {ticketDetail.date_created != '0000-00-00 00:00:00'
                          ? moment(ticketDetail.date_created).format(
                            'DD MMM yyy , hh:mm a',
                          )
                          : 'N/A'}
                      </Text>
                    </View>
                    <View>
                      <View style={GlobelStyle.flexRowAlignCenter}>
                        <Text style={Style.lastInfoTitleText}>{t('Ticket ID')}</Text>
                      </View>
                      <Text style={Style.lastInfoText}>
                        #{ticketDetail.id ? ticketDetail.id : 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#EDEDED',
                    }}
                  />
                  <Text style={style.heading}>{t('Customer Detail')}</Text>
                  <View
                    style={[
                      GlobelStyle.avatarViewContainer,
                      { paddingHorizontal: 15 },
                    ]}>
                    <Avatar.Text
                      size={40}
                      rounded={false}
                      style={GlobelStyle.avatarContainer}
                      labelStyle={GlobelStyle.avatarLabelStyle}
                      label={String(
                        ticketDetail.customer_name.charAt(0),
                      ).toUpperCase()}
                    />
                    <View style={Style.contactInfoStyle}>
                      <Text style={Style.companyNameStyle}>
                        {ticketDetail.customer_name}
                      </Text>
                      <Text style={Style.nameStyle}>
                        {titleCase(ticketDetail.created_by_type)}
                      </Text>
                    </View>
                  </View>
                  <Text style={style.heading}>{t('Ticket Info')}</Text>
                  <View style={{ paddingHorizontal: 15 }}>
                    <View style={[GlobelStyle.flex, GlobelStyle.mt8]}>
                      <Text style={GlobelStyle.mediumFont}>{t('Type')}:</Text>
                      <Text> {ticketDetail.type_name}</Text>
                    </View>
                    <View style={[GlobelStyle.flex, GlobelStyle.mt8]}>
                      <Text style={GlobelStyle.mediumFont}>{t('Remark')}:</Text>
                      <Text> {ticketDetail.message}</Text>
                    </View>

                    <View style={[GlobelStyle.flex, GlobelStyle.mt8]}>
                      <Text style={GlobelStyle.mediumFont}>{t('Status')}:</Text>
                      <Text> {ticketDetail.status}</Text>
                    </View>
                  </View>
                  {ticketDetail?.img.length > 0 && (
                    <View style={style.uploadDocContainer}>
                      <Text style={style.heading}>{t('Ticket Images')}</Text>
                      <View style={style.imageList}>
                        {ticketDetail?.img.map((image, index) => (
                          <TouchableOpacity
                            key={index}
                            style={style.imgContainer}
                            onPress={() => imageModal(index)}>
                            <FastImage
                              style={style.uploadedImage}
                              source={{
                                uri:
                                  UPLOAD_URL + 'support/' + image.document_name,
                                priority: FastImage.priority.normal,
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                  <ImageView
                    images={images}
                    imageIndex={imageIndex.current}
                    onImageIndexChange={index => imageIndex.current = index}
                    visible={visible}
                    presentationStyle="pageSheet"
                    animationType="none"
                    onRequestClose={() => setIsVisible(false)}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketDetail;
