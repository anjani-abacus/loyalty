import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TabView } from 'react-native-tab-view';
import { TabBarLayout } from '../../../../core/utils/Constant';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import { LoyaltyHomeSkeleton } from '../../../../core/utils/skeleton';
import { useInfluencerLedger } from '../../../../api/hooks/useMasters';
import { Card } from './utils';
import useStyles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import Copy from '../../../../core/assets/icons/Copy.svg';
import moment from 'moment';
import useTheme from '../../../../core/components/Theme/useTheme';
import Coin from '../../../../core/assets/icons/Coin.svg';
import StreakFire from '../../../../core/assets/icons/StreakFire.svg';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import { LeftArrowIcon } from '../../../../core/assets/SVGs/svg';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const PointHistory = ({navigation}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [activeData, setActiveData] = useState(null);
  const bottomSheetRef = useRef(null);
  const openBottomSheet = item => {
    setActiveData(item);
    bottomSheetRef.current?.present();
  };
  const closeBottomSheet = () => bottomSheetRef.current.dismiss();

  const GlobelStyle = useGlobelStyle();
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(0);
  const {
    mutate: ledgerListMutate,
    isPending: ledgerIsPending,
    data: ledgerData,
    reset: resetLedger,
  } = useInfluencerLedger();
  const [routes] = useState([
    { key: 'Ledger', title: 'Ledger' },
    { key: 'Scan History', title: 'Scan History' },
  ]);


    useFocusEffect(
      useCallback(() => {
        ledgerListMutate(
      { filter: { limit: 25, start: 0 } },
      {
        onSuccess: () => {
          const nextStart = start + 20;
          setStart(nextStart);
        },
      },
    );
      }, [])
    );

  const onRefresh = () => {
    resetLedger();
    setStart(0);
    ledgerListMutate({ filter: { limit: 25, start: 0, ledger: '' } });
  };

  let onEndReachedCalledDuringMomentum = true;

  const onEndReached = () => {
    ledgerListMutate(
      { filter: { limit: 25, start: start } },
      {
        onSuccess: () => {
          const nextStart = start + 20;
          setStart(nextStart);
        },
      },
    );
  };



  const renderScene = ({ route }) => {
    if (!(route.key === routes[index].key)) {return null;}
    return <ListView openBottomSheet={openBottomSheet} activeKey={route.key} ledgerData={ledgerData} onRefresh={onRefresh} index={index} routes={routes} ledgerIsPending={ledgerIsPending} />;
  };

  return (
    <>
      <SafeAreaView
        style={[GlobelStyle.tabViewContainer, { backgroundColor: '#d6e7fcff' }]}>
        <StatusBarHeader height={StatusBar.currentHeight} />
        <View
          style={[
            GlobelStyle.flex,
            GlobelStyle.justifyContentBetween,
            styles.pointsWrapper,
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrowIcon fill="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.pointTitle}>{t('Balance & History')}</Text>
          </View>

          <View
            style={[
              GlobelStyle.alignItemsEnd,
              {
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#ecf6fbff',
                padding: 4,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#fff',
              },
            ]}>
            <Coin width={20} height={20} />
            <Text style={styles.pointValue}>
              {' '}
              {ledgerData?.data?.balancePoints}{' '}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            padding: 12,
            justifyContent: 'space-evenly',
          }}>
          <StreakCard
            streakCount={15}
            streakType="Day"
            title="Study Streak"
            color="#4CAF50"
          />
          <RankCard
            streakCount={15}
            streakType="Your Rank"
            color="#4CAF50"
          />
        </View> */}
        <TabView
          renderTabBar={props => (
            <TabBarLayout props={{ ...props }} tabWidth={2} />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          lazy
          initialIndex={0}
          onIndexChange={setIndex}
          initialLayout={{ width: '100%' }}
          style={GlobelStyle.tabView}
        />
      </SafeAreaView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          index={0}
          ref={bottomSheetRef}
          snapPoints={['50%']}
          enablePanDown={false}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close" // disables tap to close
            />
          )}
          keyboardBehavior="interactive" // important!
          keyboardBlurBehavior="restore" // optional, better UX
          onChange={index => {
            if (index === -1) {
              closeBottomSheet();
            }
          }}>
          <HistoryDetail
            activeData={{
              ...activeData,
              crBalance: ledgerData?.data?.balancePoints,
            }}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export const ListView = ({ activeKey, ledgerData, onRefresh, openBottomSheet, ledgerIsPending, routes, index }) => {
    const activeTheme = useTheme();
    return (
      <>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: activeTheme.maincontainer,
            height: '100%',
          }}>
          <StatusBarHeader height={StatusBar.currentHeight} />
          <FlatList
            data={
              ledgerData?.data[
              routes[index]?.key == 'Ledger' ? 'ledgerData' : 'scannedData'
              ]
            }
            // onEndReached={() => {
            //     if (!onEndReachedCalledDuringMomentum) {
            //         onEndReached();
            //         onEndReachedCalledDuringMomentum = true;
            //     }
            // }}
            // onMomentumScrollBegin={() => {
            //     onEndReachedCalledDuringMomentum = false;
            // }}
            keyExtractor={item => item.id?.toString()}
            contentContainerStyle={{ paddingBottom: 60 }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={{ marginTop: 0 }}>
                {ledgerIsPending ? (
                  <LoyaltyHomeSkeleton length={10} height={50} />
                ) : (
                  <AppNoDataFound
                    title={
                      ledgerIsPending ? 'Please wait...' : 'No Data Available'
                    }
                  />
                )}
              </View>
            }
            renderItem={({ item, index }) => (
              <Card
                openBottomSheet={() => openBottomSheet(item)}
                item={item}
                type={activeKey}
                index={index}
              />
            )}
          />
        </View>
      </>
    );
  };

const HistoryDetail = ({ activeData }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#fafafa',
        padding: 10,
      }}>
      <View
        style={{
          borderRadius: 10,
          padding: 20,
          backgroundColor: '#fff',
        }}>
        <View>
          <Text
            style={{
              fontSize: 28,

              fontWeight: 'bold',
              color: '#4caf50',
            }}>
            +{activeData?.total_point}
          </Text>
          <Text
            style={{
              color: '#777',
              marginBottom: 30,
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.5,
              fontWeight: 'bold',
            }}>
            Points Earned
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12 }}>Coupon Id</Text>
            <TouchableOpacity onPress={()=>Clipboard.setString(activeData?.coupon_code)} >
              <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                textTransform: 'uppercase',
                fontSize: 12,
              }}>
              {activeData?.coupon_code} <Copy width={12} height={12} />
            </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontSize: 12 }}>Product Name</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                textTransform: 'uppercase',
                fontSize: 12,
              }}>
              {activeData?.product_detail}
               {/* <Copy width={12} height={12} /> */}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 5,
            padding: 5,
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              flex: 1,
              borderWidth: 1,
              borderColor: '#eee',
              paddingVertical: 10,
            }}>
            <Text>{activeData?.crBalance}</Text>
            <Text>Current Balance</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              flex: 1,
              borderWidth: 1,
              borderColor: '#eee',
              paddingVertical: 10,
            }}>
            <Text>
              {activeData?.scanned_date
                ? moment(activeData?.scanned_date).format('DD MMM, YYYY')
                : ''}
            </Text>
            <Text>Date</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            backgroundColor: '#fff',
            marginTop: 5,
            padding: 5,
            borderRadius: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#eee',
              flex: 1,
              paddingVertical: 10,
            }}>
            <Text>Lat: {activeData?.lat}</Text>
            <Text>Lng: {activeData?.lng}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#eee',
              flex: 1,
              paddingVertical: 10,
            }}>
            <Text>{activeData?.total_point}</Text>
            <Text>Redeem Points</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PointHistory;
