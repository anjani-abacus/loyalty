import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import AnnouncementStyle from './AnnouncementStyle';
import announcementJson from '../../utils/data/announcementData.json';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import useTheme from '../../components/Theme/useActiveTheme';
import Style from '../../assets/Style/styles';
import AppNoDataFound from '../../components/No_Data_Found/AppNoDataFound';
const Announcements = () => {
  const styles = AnnouncementStyle();
    const activeTheme = useTheme();
    const GlobelStyle = useGlobelStyle();
    const [isRefreshing, setIsRefreshing] = useState(false);

    return(
       <SafeAreaView style={GlobelStyle.container}>

      {
      (
        <>

          <View>
            <FlatList
              data={announcementJson.result}
            //   onEndReached={() => {
            //     if (!onEndReachedCalledDuringMomentum && !endReached) {
            //       moreDataHandler()
            //       onEndReachedCalledDuringMomentum = true;
            //     }
            //   }}
            //   onMomentumScrollBegin={() => {
            //     onEndReachedCalledDuringMomentum = false;
            //   }}
            //   onEndReachedThreshold={4}
            //   contentContainerStyle={{ paddingBottom: 70 }}
            //   ListFooterComponent={moreDataLoader && !endReached ? <ActivityIndicator /> : null}

              ListEmptyComponent={
                <View style={{ marginTop: 200 }}>
                  {/* <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                  /> */}
                  <AppNoDataFound />
                </View>
              }
              // refreshControl={
              //   <RefreshControl
              //     refreshing={isRefreshing}
              //     onRefresh={onRefresh}
              //   />
              // }
              renderItem={({ item }) => (
                <View
                  key={item.id}
                  style={[styles.announcelist,{backgroundColor: item.read_status ? '#edf3ff' : '#fff'}]}>
                  <TouchableOpacity>

                    <View>
                      <Text style={{textAlign:'right',fontSize:15,marginRight:10}}>
                            {new Date(item.date_created).toLocaleDateString('en-US', {
                                year:'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                              </Text>

                          <Text  style={{
                            color: '#000',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            paddingHorizontal:30,
                          }}>{item.msg}</Text>

                    </View>

                  </TouchableOpacity>

                </View>
              )}
            />
          </View>

        </>
      )}


    </SafeAreaView>
    );
};

export default Announcements;
