import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';

const SingleSelectRowTick = ({
  filter,
  setFilter,
  filterOptions,
  filterType,
  title,
}) => {
  return (
    <View style={{paddingVertical: 10}}>
      <Text
        style={{
          color: '#2B3348',
          fontWeight: '600',
          fontSize: 18,
          marginBottom: 10,
        }}>
        {title}
      </Text>
      <View style={styles.row}>
        {filterOptions.map((item, index) => {
          return (
            <View key={index}>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() =>
                  setFilter({...filter, [filterType]: item.payload})
                }
                style={[styles.rowFilter]}>
                <Text
                  style={[
                    styles.title,
                    filter[filterType] == item.payload && styles.activeText,
                  ]}>
                  {item.title}
                </Text>
                {filter[filterType] == item.payload && (
                  <Icon
                    name="check"
                    type="font-awesome"
                    size={20}
                    color="#004BAC"
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // row:{
  //     flexDirection: 'row',
  //     flexWrap: 'wrap'
  // },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2B3348',
  },
  filter: {
    borderRadius: 8,
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 10,
    margin: 3,
    borderColor: '#0061a5',
  },
  active: {
    backgroundColor: '#d8efff',
  },
  activeText: {
    color: '#004BAC',
  },
  line: {
    backgroundColor: 'gray',
    height: 1,
    marginVertical: 5,
  },
  rowFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SingleSelectRowTick;
