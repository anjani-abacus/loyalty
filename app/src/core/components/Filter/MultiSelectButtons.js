import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const MultiSelectButtons = ({ filter, setFilter, filterOptions, filterType }) => {
  const [selected, setSelected] = useState([]);

  const onTap = (item) => {
    if (selected.includes(item)) {
      const updated = selected.filter((filterItem) => filterItem !== item);
      setSelected(updated);
    } else {
      const updated = [...selected, item];
      setSelected(updated);
    }
  };

  useEffect(() => {
    setFilter({ ...filter, [filterType]: selected });
  }, [selected]);

  return (
    <View style={styles.row}>
      {filterOptions.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onTap(item)}
            style={[styles.filter, selected.includes(item) && styles.active]}
            key={index}
          >
            <Text style={[styles.title, selected.includes(item) && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
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
    fontWeight: '500', // Corrected to string
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

export default MultiSelectButtons;
