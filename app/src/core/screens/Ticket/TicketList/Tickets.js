import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { ActivityIndicator, AnimatedFAB, Avatar } from 'react-native-paper';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import moment, { duration } from 'moment';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import Style from '../../../assets/Style/styles';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import { ApiCall } from '../../../../services/ServiceProvider';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { titleCase } from '../../../../core/utils/TextUtils';
import { useTicketList } from '../../../../api/hooks/useMasters';
import { Images } from '../../../assets';
import { ImageModal } from '../../../components/ConfirmationModal/ConfirmationModal';
import useTheme from '../../../components/Theme/useTheme';

const Tickets = ({ navigation, status }) => {
  const { t } = useTranslation();
  const activeTheme = useTheme();
  const GlobelStyle = useGlobelStyle();
  const { isLoading, refetch, data: queryList, isFetching } = useTicketList();

  const [visible, setvisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const onRefresh = () => {
    refetch();
  };


  useEffect(() => {
    console.log(status);
  }, []);




  return (
    <SafeAreaView style={Style.container}>
      <>
        <View style={Style.dealersCard}>
          <View style={[Style.scrollView]}>
            <FlatList
              data={queryList?.data?.data?.filter(item => item?.ticket_status?.toLowerCase() == status?.toLowerCase())}
              keyExtractor={({ item }) => item}
              ListFooterComponent={<View style={{ height: 100 }} />}
              ListEmptyComponent={
                <View style={{ marginTop: 200 }}>

                  <AppNoDataFound
                    key={'data not found'}
                    title={isFetching ? 'Please wait..' : 'No Data Available'}
                  />
                </View>
              }
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={onRefresh}
                />
              }

              renderItem={({ item, index }) => (
                <View
                  key={item?.id + index}
                  style={[Style.dealerCard, {
                    borderWidth: 1, borderColor: '#eee',
                  }]}>
                  <TouchableOpacity>
                    <View
                      style={[
                        Style.lastInfoBox,
                        Style.cardHeader,
                        GlobelStyle.mb12,
                      ]}>
                      <View style={GlobelStyle.flex}>
                        <Icon
                          name="calendar"
                          type="ant-design"
                          style={{ alignItems: 'center' }}
                          color={activeTheme.themeColor}
                          size={20}
                        />
                        <Text style={[Style.lastInfoText]}>
                          {item?.date_created != '0000-00-00 00:00:00'
                            ? moment(item?.date_created).format(
                              'DD MMM YYYY , hh:mm a',
                            )
                            : 'N/A'}
                        </Text>
                      </View>
                      <View style={GlobelStyle.flex}>
                        <Text style={Style.ticketId}>
                          #{item?.id ? item?.id : 'N/A'}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <View style={[GlobelStyle.flex, GlobelStyle.mt8]}>
                          <Text style={GlobelStyle.mediumFont}>
                            {t('Type')}:
                          </Text>
                          <Text style={{ fontSize: 12, color: activeTheme.text }}> {item?.ticket_query_type}</Text>
                        </View>
                        <View style={[GlobelStyle.flex, GlobelStyle.mt8]}>
                          <Text style={GlobelStyle.mediumFont}>
                            {t('Remark')}:
                          </Text>
                          <Text style={{ fontSize: 12, color: activeTheme.text }}> {item?.remark}</Text>
                        </View>
                        {item?.close_remark && <View style={[GlobelStyle.flex, GlobelStyle.mt8]}>
                          <Text style={GlobelStyle.mediumFont}>
                            {t('Closing Remark')}:
                          </Text>
                          <Text style={{ fontSize: 12, color: activeTheme.text }}> {item?.close_remark}</Text>
                        </View>}
                      </View>
                      <View
                        style={[
                          GlobelStyle.avatarViewContainer,
                          { alignItems: 'center' },
                          GlobelStyle.justifyContentBetween,
                        ]}>
                        <View style={[GlobelStyle.flexRow]}>
                          {item?.image ? <TouchableOpacity onPress={() => {
                            setvisible(true);
                            setActiveImage(item?.image);
                          }} >
                            <ImageBackground
                              source={{ uri: item?.image }}
                              style={{ height: 50, width: 50, overflow: 'hidden' }}
                              resizeMode="cover"
                            />
                          </TouchableOpacity> :
                            <View>
                              <ImageBackground
                                source={Images.default}
                                style={{ height: 50, width: 50, overflow: 'hidden' }}
                                resizeMode="cover"
                              />
                            </View>}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[Style.dealerAddNewButton]}
          onPress={() => navigation.navigate('TicketAdd', {})}>
          <View>
            <Text style={Style.addNewButtonText}>{t('Add New')}</Text>
          </View>
        </TouchableOpacity>
      </>

      <ImageModal modalVisible={visible} setModalVisible={setvisible} url={activeImage || Images.default} />
    </SafeAreaView>
  );
};

export default Tickets;
