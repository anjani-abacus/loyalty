import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Icon} from '@rneui/themed';

export default AccordionItem = ({title, children}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text style={{fontWeight: '700', color: '#2B3348'}}>{title}</Text>
          {expanded ? (
            <Icon name="up" type="ant-design" size={12} />
          ) : (
            <Icon name="down" type="ant-design" size={12} />
          )}
        </View>
      </TouchableWithoutFeedback>
      {expanded && <View style={{backgroundColor: '#fff'}}>{children}</View>}
      <View
        style={{
          borderBottomColor: '#f6f6f6',
          borderBottomWidth: 2,
        }}
      />
    </View>
  );
};
