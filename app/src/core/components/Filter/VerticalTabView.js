import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimension,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useState} from 'react';

const VerticalTabView = ({renderScene, filterData}) => {
  let FilterData = filterData[0];
  const [status, setStatus] = useState(FilterData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.listTab}>
        <View>
          {filterData.map((e, index) => {
            return (
              <TouchableOpacity
                style={[styles.btnTab, status === e && styles.btnTabActive]}
                key={index}
                onPress={() => setStatus(e)}>
                <Text
                  style={[
                    styles.textTab,
                    status === e && styles.textTabActive,
                  ]}>
                  {e}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <ScrollView style={{paddingLeft: 15, maxWidth: '70%', minWidth: '70%'}}>
        {renderScene(status)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  listTab: {
    backgroundColor: '#fafafa',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    maxWidth: '30%',
    minHeight: 670,
  },
  btnTab: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    // borderRightWidth: 1,
    // borderRightColor: '#e6e6e6'
  },
  textTab: {
    fontSize: 16,
    color: '#000',
  },
  btnTabActive: {
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderLeftColor: '#004BAC',
    borderRadius: 1,
    borderRightWidth: 0,
    borderRightColor: '#e6e6e6',
  },
  textTabActive: {
    color: '#004BAC',
    fontWeight: '600',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    paddingTop: 10,
    marginLeft: 15,
  },
  itemName: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 5,
    color: '#000',
  },
});

export default VerticalTabView;
