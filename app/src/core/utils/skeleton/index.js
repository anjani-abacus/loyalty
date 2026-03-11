import React from 'react';

import { View } from 'react-native-animatable';

import styles from './style';
import * as Animatable from 'react-native-animatable';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { Text } from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Skeleton as SkeletonPlaceHolder } from '@rneui/themed';



const Skeleton = ({ count = [1, 2, 3, 4, 5, 6], innerBox = [1, 2, 3] }) => {
  const GlobelStyle = useGlobelStyle();

  const fadeIn = {
    0: {
      opacity: 0.8,
    },
    0.5: {
      opacity: 1,
    },
    1: {
      opacity: 0.8,
    },
  };
  return count.map((row, i) => {
    return (
      <View key={row + i} style={{ ...styles.listCard, backgroundColor: '#fff' }}>
        <View
          style={{
            ...GlobelStyle.flexDirectionRow,
            ...GlobelStyle.justifyContentBetween,
            ...GlobelStyle.alignItemsCenter,
          }}>
          <View style={GlobelStyle.flexDirectionRow}>
            <Animatable.View
              style={styles.skeletonDate}
              animation={fadeIn}
              duration={1000}
              iterationCount="infinite"
              easing="ease-out" />
          </View>
          <View>
            <Animatable.View
              style={styles.skeletonDetailIcon}
              animation={fadeIn}
              duration={1000}
              iterationCount="infinite"
              easing="ease-out">
              {/* <AntDesign
                        name="right"
                        style={{ ...GlobelStyle.font12, color: '#aaa' }}
                      /> */}
            </Animatable.View>
          </View>
        </View>
        {true && (
          <View
            style={{
              ...GlobelStyle.flexDirectionRow,
              ...GlobelStyle.justifyContentBetween,
              ...styles.alignBottom,
              ...GlobelStyle.mt16,
            }}>
            <View style={[GlobelStyle.flexDirectionRow, GlobelStyle.gap10]}>
              {innerBox?.map(() => <View>
                <Animatable.View
                  style={styles.skeletonDate}
                  animation={fadeIn}
                  duration={1000}
                  iterationCount="infinite"
                  easing="ease-out" />
              </View>)}
            </View>
          </View>
        )}
      </View>
    );
  });
};


export default Skeleton;


export const SkeletonCard = ({ length = 5, width = 100 }) => {
  const fadeIn = {
    0: {
      opacity: 0.8,
    },
    0.5: {
      opacity: 1,
    },
    1: {
      opacity: 0.8,
    },
  };

  const a = Array.from({ length }, (_, index) => {
    return index;
  });



  return [1].map((row, i) => {

    return (

      <>

        <View key={row + i} style={{ ...styles.listCard, backgroundColor: '#fff' }}>
          <View style={styles.container}>

            <View style={styles.detailsContainerSkeleton}>
              {/* <ActivityIndicator animating={true} color={'red'} size={60} />  */}
              {
                a.map((_, index) => {
                  return (
                    <View style={styles.detailItem} key={index}>

                      <Text style={styles.detailLabel}>
                        <Animatable.View
                          style={[styles.skeletonDateOn, { width: width }]}
                          animation={fadeIn}
                          duration={1000}
                          iterationCount="infinite"
                          easing="ease-out" />
                      </Text>
                      <Text style={styles.detailValue}>
                        <Animatable.View
                          style={styles.skeletonDateOn}
                          animation={fadeIn}
                          duration={1000}
                          iterationCount="infinite"
                          easing="ease-out" />
                      </Text>
                    </View>

                  );
                })
              }
            </View>
          </View>


        </View>
      </>
    );
  });
};



export const VideoSkeletonCard = ({ length = 5 }) => {
  const fadeIn = {
    0: {
      opacity: 0.8,
    },
    0.5: {
      opacity: 1,
    },
    1: {
      opacity: 0.8,
    },
  };

  const a = Array.from({ length }, (_, index) => {
    return index;
  });


  return [1].map((row, i) => {

    return (
      <>
        <View style={styles.messageContainer}>
          {
            a.map((_, index) => {
              return (

                <Animatable.View
                  style={styles.thumbnail}
                  animation={fadeIn}
                  duration={1000}
                  iterationCount="infinite"
                  easing="ease-out" />

              );
            })
          }
        </View>
      </>
    );
  });
};

export const RedeemPointsSkeletonCard = ({ length = 5 }) => {

  return (
    <View style={styles.container}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Skeleton width={200} height={50} style={{ borderRadius: 8 }} />
        <Skeleton width={150} height={20} style={{ marginTop: 5 }} />
      </View>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        {Array.from({ length: 2 }).map((_, index) => (
          <>
            <View key={index} style={styles.rewardItem}>
              <Skeleton width={100} height={100} style={{ borderRadius: 8 }} />
              <Skeleton width={80} height={20} />
              <Skeleton width={60} height={20} style={{ marginTop: 5 }} />
            </View>


          </>

        ))}
      </View>
    </View>
  );
};



export const UserProfileCard = ({ length, width }) => {

  const fadeIn = {
    0: {
      opacity: 0.8,
    },
    0.5: {
      opacity: 1,
    },
    1: {
      opacity: 0.8,
    },
  };

  const a = Array.from({ length }, (_, index) => {
    return index;
  });


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View>
        <FlatList data={a} renderItem={({ index }) => {
          return (

            <View style={{
              flex: 1,
              marginTop: 10,
            }}>

              <View style={styles.detailItem} key={index}>

                <Text style={styles.detailLabel}>
                  <Animatable.View
                    style={[styles.skeletonDateOn, { width: width }]}
                    animation={fadeIn}
                    duration={1000}
                    iterationCount="infinite"
                    easing="ease-out" />
                </Text>
                <Text style={styles.detailValue}>
                  <Animatable.View
                    style={styles.skeletonDateOn}
                    animation={fadeIn}
                    duration={1000}
                    iterationCount="infinite"
                    easing="ease-out" />
                </Text>
              </View>
            </View>

          );
        }} />
      </View >
    </SafeAreaView>

  );
};


export const LoyaltyHomeSkeleton = ({ length, height = 200 }) => {
  const GlobelStyle = useGlobelStyle();
  const a = Array.from({ length }, (_, index) => {
    return index;
  });
  return (
    <React.Fragment>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
        <View>
          <FlatList data={a} renderItem={({ index }) => {
            return (

              <SkeletonPlaceHolder
                key={index}
                style={[GlobelStyle.skeltonPickerDataStyle]}
                LinearGradientComponent={LinearGradient}
                animation="wave"
                variant="text"
                width={100}
                height={height}
              />

            );
          }} />
        </View >
      </SafeAreaView>


    </React.Fragment>

  );
};

export const ChartSkeleton = ({ count = [1, 2, 3, 4, 5, 6], innerBox = [1, 2, 3] }) => {
  const GlobelStyle = useGlobelStyle();

  const fadeIn = {
    0: {
      opacity: 0.4,
    },
    2: {
      opacity: 1,
    },
    1: {
      opacity: 0.4,
    },
  };
  return count.map((row, i) => {
    return (
      <View key={row + i} style={{ ...styles.listCard, backgroundColor: '#fff' }}>
        <View
          style={{
            gap: 20,
            ...GlobelStyle.flexDirectionRow,
            ...GlobelStyle.justifyContentBetween,
            ...GlobelStyle.alignItemsCenter,
          }}>
          <View style={{ flex: 1 }}>
            <SkeletonPlaceHolder
              style={[styles.innerRow, {marginBottom:5}]}
              LinearGradientComponent={LinearGradient}
              animation="wave"
              variant="text"
              width={100}
              height={30}
            />
            <SkeletonPlaceHolder
              style={[styles.innerRow, {marginBottom:5}]}
              LinearGradientComponent={LinearGradient}
              animation="wave"
              variant="text"
              width={100}
              height={30}
            />
            <SkeletonPlaceHolder
              style={[styles.innerRow, {marginBottom:5}]}
              LinearGradientComponent={LinearGradient}
              animation="wave"
              variant="text"
            />
          </View>
          <View>
          <SkeletonPlaceHolder
              style={[styles.piechart, {marginBottom:5}]}
              LinearGradientComponent={LinearGradient}
              animation="wave"
              variant="text"
            />
          </View>
        </View>
      </View>
    );
  });
};
