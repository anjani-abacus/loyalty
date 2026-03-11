import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {ApiCall} from '../../services/ServiceProvider';
import Toast from 'react-native-toast-message';
import {useIsFocused} from '@react-navigation/native';
import AppBoldText from '../BoldText/AppBoldText';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import useActiveTheme from '../Theme/useActiveTheme';
import {Icon} from '@rneui/themed';
import Skeleton, { ChartSkeleton } from '../../utils/skeleton';
const SfaHomeDataCharts = ({navigation}) => {
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  const isFocused = useIsFocused();
  const [visitData, setVisiData] = useState({});
  const [eventData, setEventData] = useState({});
  const [followupData, setFollowupData] = useState({});
  const [outOvrData, setOutOvrData] = useState({});
  const [targetAchieveData, setTargetAchieveData] = useState({});
  useEffect(() => {
    if (isFocused) {
      getVisitPlan();
      getEventPlan();
      getFollowupData();
      getOutstandingData();
      getTargetAchieve();
    }
  }, [isFocused]);
  const getVisitPlan = async () => {
    try {
      const result = await ApiCall({}, 'AppHome/visitPlan');
      if (result.statusCode == 200) {
        setVisiData(result.data);
      } else {
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 2000 });
      }
    } catch (error) {}
  };
  const getEventPlan = async () => {
    try {
      const result = await ApiCall({}, 'AppHome/todayEventPlan');
      if (result.statusCode == 200) {
        setEventData(result.data);
      } else {
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 2000 });
      }
    } catch (error) {}
  };
  const getFollowupData = async () => {
    try {
      const result = await ApiCall({}, 'AppHome/todayFollowup');
      if (result.statusCode == 200) {
        setFollowupData(result.follow_ups);
      } else {
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 2000 });
      }
    } catch (error) {}
  };
  const getOutstandingData = async () => {
    try {
      const result = await ApiCall({}, 'AppHome/outstandingOverdue');
      if (result.statusCode == 200) {
        setOutOvrData(result.data);
      } else {
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 2000 });
      }
    } catch (error) {}
  };
  const getTargetAchieve = async () => {
    try {
      const result = await ApiCall({}, 'AppHome/primaryTargetAchv');
      if (result.statusCode == 200) {
        setTargetAchieveData(result.data);
      } else {
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 2000 });
      }
    } catch (error) {}
  };

  const pieData = [
    {
      title: 'Plan Achieved',
      value: visitData.plan_achieved || 0,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
    },
    {
      title: 'Pending',
      value: visitData.pending || 0,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
    },
    {
      title: 'Unplanned',
      value: visitData.unplanned || 0,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
    },
  ];
  const noData = [
    {
      value: 100,
      color: '#cecece',
      gradientCenterColor: '#000',
    },
  ];
  const followupPieData = [
    {
      title: 'Total',
      value: followupData.total_follow_ups,
      color: '#177AD5',
      text: followupData.total_follow_ups,
    },
    {
      title: 'Completed',
      value: followupData.complete_follow_ups,
      color: '#79D2DE',
      text: followupData.complete_follow_ups,
    },
    {
      title: 'Pending',
      value: followupData.pending_follow_ups,
      color: '#84db70',
      text: followupData.pending_follow_ups,
    },
  ];
  const followupNoPieData = [
    {
      value: 100,
      color: '#cecece',
      gradientCenterColor: '#000',
    },
  ];

  const OutOvr = [
    {value: outOvrData.outstanding, label: 'Outstanding', color: '#fae505'},
    {value: outOvrData.overdue, label: 'Overdue', color: '#f76363'},
  ];
  const targetAchieve = [
    {value: targetAchieveData.target, label: 'Target', color: '#28B2B3'},
    {value: targetAchieveData.achv, label: 'Achievement', color: '#91E3E3'},
  ];
  const noPieData =
    visitData.unplanned == 0 &&
    visitData.pending == 0 &&
    visitData.plan_achieved == 0;
  const noFollowupData =
    followupData.pending_follow_ups == 0 &&
    followupData.complete_follow_ups == 0 &&
    followupData.total_follow_ups == 0;
  return (
    <View style={
      {
        paddingHorizontal:16,
      }
    } >
      {/**********************  Visit Data  *******************/}

      <Text
        style={{
          marginVertical: 8,
          fontSize: 16,
          color: '#000',
        }}>

        <AppBoldText>Visit Plans</AppBoldText>
      </Text>
      { !Object.keys(visitData)?.length ? <ChartSkeleton count={[1]} /> :
        <Animated.View
        style={[
            {
              backgroundColor:'#fff',
              padding:10,
              borderRadius:8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
        ]}
        entering={FadeInDown.delay(200)}
        exiting={FadeOutDown}>
        <View style={{flex: 1}}>
          {pieData.map((item, index) => {
            return (
              <View style={[styles.container]}>
                <View style={styles.contentContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={[styles.color, {backgroundColor: item.color}]}
                    />
                    <Text style={styles.text}> {item?.title}</Text>
                  </View>
                  <Text style={styles.text}>{item?.value}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{paddingHorizontal: 14}}>
          <PieChart
            donut
            textColor="black"
            radius={60}
            innerRadius={45}
            textSize={20}
            data={noPieData ? noData : pieData}
            isAnimated
            centerLabelComponent={() => {
              return (
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>
                    <AppBoldText>
                      {noPieData
                        ? 'No Visit Plan'
                        : visitData.unplanned +
                          visitData.pending +
                          visitData.plan_achieved}
                    </AppBoldText>
                  </Text>
                  {!noPieData && (
                    <Text style={{fontSize: 16}}>
                      <AppBoldText>Total</AppBoldText>
                    </Text>
                  )}
                </View>
              );
            }}
          />
        </View>
      </Animated.View>}

      {/**********************  Event Data  *******************/}
      {eventData?.event_id && (
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                marginVertical: 8,
                fontSize: 16,
                color: '#000',
              }}>
              <AppBoldText>Activity Plan</AppBoldText>
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.navigate('EventList')}>
              <Text style={{color: activeTheme.Warning}}>See All</Text>
              <Icon
                name="chevron-right"
                color={activeTheme.Warning}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              GlobelStyle.listCard,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            entering={FadeInDown.delay(200)}
            exiting={FadeOutDown}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 4,
                }}>
                <Text style={{color: '#2B3348'}}>
                  <AppBoldText>📆 Event Plan</AppBoldText>
                </Text>
                <Text style={{color: '#2B3348'}}>
                  <AppBoldText>
                    {moment(eventData?.date_of_meeting).format('D MMMM YYYY')}
                  </AppBoldText>
                </Text>
                <View style={styles.container}>
                  <Text style={{color: '#000'}}>
                    <AppBoldText>{eventData?.status}</AppBoldText>
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingBottom: 8,
                }}>
                <Text
                  style={{
                    color: activeTheme.LinkClr,
                  }}>
                  <AppBoldText>#{eventData?.event_id}</AppBoldText>
                </Text>
                <Text style={{color: '#2B3348'}}>{eventData?.firm_name}</Text>
              </View>

              <View>
                <View
                  style={[
                    GlobelStyle.flexDirectionRow,
                    GlobelStyle.alignItemsCenter,
                    GlobelStyle.mr16,
                    {minWidth: 100},
                  ]}>
                  <Text
                    style={{color: '#2B3348', fontSize: 14, fontWeight: '400'}}>
                    Description:{' '}
                    <AppBoldText>{eventData?.description}</AppBoldText>
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </>
      )}

      {/*************************** Follow up ***********************/}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 16,
            color: '#000',
          }}>
          <AppBoldText>Follow Up</AppBoldText>
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('FollowupList')}>
          <Text style={{color: activeTheme.Warning}}>See All</Text>
          <Icon name="chevron-right" color={activeTheme.Warning} size={20} />
        </TouchableOpacity>
      </View>

      { !Object.keys(followupData)?.length ? <ChartSkeleton count={[1]} /> :
       <Animated.View
        style={[
          {
            backgroundColor:'#fff',
            padding:10,
            borderRadius:8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
        entering={FadeInDown.delay(200)}
        exiting={FadeOutDown}>
        <PieChart
          donut
          showText={noFollowupData ? false : true}
          textColor="black"
          radius={60}
          innerRadius={35}
          textSize={10}
          showTextBackground
          textBackgroundRadius={14}
          isAnimated
          data={noFollowupData ? followupNoPieData : followupPieData}
          centerLabelComponent={() => {
            return (
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 14}}>
                  <AppBoldText>{noFollowupData ? 'No Data' : ''}</AppBoldText>
                </Text>
              </View>
            );
          }}
        />
        <View style={{flex: 1}}>
          {followupPieData.map((item, index) => {
            return (
              <View style={[styles.container]}>
                <View style={styles.contentContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={[styles.color, {backgroundColor: item.color}]}
                    />
                    <Text style={styles.text}> {item?.title}</Text>
                  </View>
                  <Text style={styles.text}>{item?.value}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>}

      {/*************************** Outstanding/Overdue ***********************/}

      { !Object.keys(outOvrData)?.length ? <View style={{marginTop:10}}><ChartSkeleton count={[1]} /></View> :
        <View style={{flexDirection: 'row', marginTop:10, justifyContent:'space-between'}}>
        <View>
          <Text
            style={{
              marginVertical: 8,
              fontSize: 13,
              color: '#000',
            }}>
            <AppBoldText>Outstanding/Overdue</AppBoldText>
          </Text>

            <Animated.View
            style={[
              {
                backgroundColor:'#fff',
                padding:10,
                borderRadius:8,
              },
            ]}
            entering={FadeInDown.delay(200)}
            exiting={FadeOutDown}>
            {OutOvr.map((item, index) => {
              return (
                <View key={index} style={[styles.container2]}>
                  <View style={styles.contentContainer2}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 6,
                      }}>
                      <View
                        style={[styles.color, {backgroundColor: item.color}]}
                      />
                      <Text style={styles.text}> {item?.label}</Text>
                    </View>
                    <Text style={styles.text}>{item?.value}</Text>
                  </View>
                </View>
              );
            })}
          </Animated.View>
        </View>
        {/*************************** Target/Achievement ***********************/}

        <View>
          <Text
            style={{
              marginVertical: 8,
              fontSize: 13,
              color: '#000',
            }}>
            <AppBoldText>Target/Achievement</AppBoldText>
          </Text>

            <Animated.View
            style={[{
              backgroundColor:'#fff',
              padding:10,
              borderRadius:8,
            }]}
            entering={FadeInDown.delay(200)}
            exiting={FadeOutDown}>
            {targetAchieve.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[styles.container2]}
                  entering={FadeInDown.delay(index * 200)}
                  exiting={FadeOutDown}>
                  <View style={styles.contentContainer2}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 6,
                      }}>
                      <View
                        style={[styles.color, {backgroundColor: item.color}]}
                      />
                      <Text style={styles.text}> {item?.label}</Text>
                    </View>
                    <Text style={styles.text}> {item?.value}</Text>
                  </View>
                </View>
              );
            })}
          </Animated.View>
        </View>
      </View>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginBottom: 10,
    backgroundColor: '#f4f7fc',
    borderRadius: 6,
    marginHorizontal: 16,
  },
  container2: {
    marginBottom: 10,
    borderRadius: 6,
    marginHorizontal: 0,
    marginHorizontal: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  color: {
    width: 15,
    height: 15,
    borderRadius: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default SfaHomeDataCharts;

// import React, {useEffect, useState} from 'react';
// import {ScrollView, StyleSheet, Text, View} from 'react-native';
// import DonutChart from '../DonutChart';
// import {useFont} from '@shopify/react-native-skia';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {useSharedValue, withTiming} from 'react-native-reanimated';
// import {calculatePercentage} from '../../utils/calculatePercentage';
// import {generateRandomNumbers} from '../../utils/generateRandomNumbers';
// import RenderItem from '../RenderItem';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useIsFocused} from '@react-navigation/native';
// const RADIUS = 70;
// const STROKE_WIDTH = 12;
// const OUTER_STROKE_WIDTH = 22;
// const GAP = 0.06;

// export const SfaHomeDataCharts = () => {
//   const n = 4;
//   const [data, setData] = useState([]);
//   const totalValue = useSharedValue(0);
//   const decimals = useSharedValue([]);
//   const isFocused = useIsFocused();
//   useEffect(() => {
//     generateData();
//   }, [isFocused]);
//   const colors = ['#009FFF', '##93FCF8', '#BDB2FA', '#FFA5BA', '#e43433'];

//   const generateData = () => {
//     const generateNumbers = generateRandomNumbers(n);
//     const total = generateNumbers.reduce(
//       (acc, currentValue) => acc + currentValue,
//       0,
//     );
//     const generatePercentages = calculatePercentage(generateNumbers, total);
//     const generateDecimals = generatePercentages.map(
//       number => Number(number.toFixed(0)) / 100,
//     );
//     totalValue.value = withTiming(total, {duration: 1000});
//     decimals.value = [...generateDecimals];
//     const arrayOfObjects = [
//       {
//         value: 47,
//         color: '#009FFF',
//         percentage: generatePercentages[0],
//       },
//       {
//         value: 40,
//         color: '#93FCF8',
//         percentage: generatePercentages[1],
//       },
//       {
//         value: 16,
//         color: '#BDB2FA',
//         percentage: generatePercentages[2],
//       },
//       {
//         value: 3,
//         color: '#FFA5BA',
//         percentage: generatePercentages[3],
//       },
//     ];
//     // const arrayOfObjects = generateNumbers.map((value, index) => ({
//     //   value,
//     //   percentage: generatePercentages[index],
//     //   color: colors[index],
//     // }));

//     setData(arrayOfObjects);
//   };

//   const font = useFont(require('../../assets/Fonts/Roboto-Bold.ttf'), 60);
//   const smallFont = useFont(require('../../assets/Fonts/Roboto-Light.ttf'), 25);

//   if (!font || !smallFont) {
//     return <View />;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{alignItems: 'center'}}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.chartContainer}>
//           <DonutChart
//             radius={RADIUS}
//             gap={GAP}
//             strokeWidth={STROKE_WIDTH}
//             outerStrokeWidth={OUTER_STROKE_WIDTH}
//             font={font}
//             smallFont={smallFont}
//             totalValue={totalValue}
//             n={n}
//             decimals={decimals}
//             colors={colors}
//           />
//         </View>
//         <TouchableOpacity onPress={generateData} style={styles.button}>
//           <Text style={styles.buttonText}>Generate</Text>
//         </TouchableOpacity>
//         {data.map((item, index) => {
//           return <RenderItem item={item} key={index} index={index} />;
//         })}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   chartContainer: {
//     width: RADIUS * 2,
//     height: RADIUS * 2,
//     marginTop: 10,
//   },
//   button: {
//     marginVertical: 40,
//     backgroundColor: '#f4f7fc',
//     paddingHorizontal: 60,
//     paddingVertical: 15,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 20,
//   },
// });

// export default SfaHomeDataCharts;
