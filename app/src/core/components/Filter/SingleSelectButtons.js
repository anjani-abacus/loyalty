import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const SingleSelectButtons = ({
  filter,
  setFilter,
  filterOptions,
  filterType,
  title,
}) => {
  return (
    <View style={{paddingVertical: 5}}>
      <Text
        style={{
          color: '#2B3348',
          fontWeight: '600',
          fontSize: 18,
          paddingBottom: 5,
          marginBottom: 10,
        }}>
        {title}
      </Text>
      <View style={styles.row}>
        {filterOptions.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setFilter({...filter, [filterType]: item.payload})}
              style={[
                styles.filter,
                filter[filterType] == item.payload && styles.active,
              ]}
              key={index}>
              <Text
                style={[
                  styles.title,
                  filter[filterType] == item.payload && styles.activeText,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
});

export default SingleSelectButtons;
