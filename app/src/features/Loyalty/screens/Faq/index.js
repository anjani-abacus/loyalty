import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import Collapsible from 'react-native-collapsible';
import Angle from '../../../../core/assets/icons/Angle.svg';
import useTheme from '../../../../core/components/Theme/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../../../core/assets/SVGs/svg';
import { useFaqQuestion } from '../../../../api/hooks/useMasters';

import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';


const AccordionItem = ({ styles, item, isActive, onToggle }) => {
  const { width } = useWindowDimensions();
  const activeTheme = useTheme();
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onToggle} style={styles.header}>
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.headerText}>{item.question}</Text> */}
          {/* <Text style={styles.headerText}> */}
          <RenderHTML
            tagsStyles={{
              p: { margin: 0, padding: 0, color: activeTheme.text },
            }}
            contentWidth={width}
            source={{ html: item.question }}
          />
          {/* </Text> */}
        </View>
        <Angle fill={activeTheme.text} width={18} height={18} style={{
          transform: [{ rotate: isActive ? '90deg' : '0deg' }],
        }} />
      </TouchableOpacity>
      <Collapsible collapsed={!isActive}>
        <View style={styles.content}>
          <RenderHTML
            tagsStyles={{
              p: { margin: 0, padding: 0, color: activeTheme.text },
            }}
            contentWidth={width}
            source={{ html: item.answer }}
          />
        </View>
      </Collapsible>
    </View>
  );
};
export const AccordionList = ({ data }) => {
  const activeTheme = useTheme();
  const styles = StyleSheet.create({
    listContainer: {
      padding: 10,
    },
    itemContainer: {
      backgroundColor: activeTheme.section,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 5,
    },
    header: {
      backgroundColor: activeTheme.section,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    headerText: {
      fontSize: 16,
      color: activeTheme.text,
    },
    content: {
      flexDirection: 'row',
      gap: 10,
      padding: 15,
      backgroundColor: activeTheme.section,
      marginBottom: 5,
      color: activeTheme.text,
    },
    contentText: {
      fontSize: 16,
      color: activeTheme.text,
    },
  });

  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <View>{
      data?.map((item) => (
        <AccordionItem
          styles={styles}
          item={item}
          isActive={activeId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </View>
  );
};

const Faq = ({ navigation }) => {
  const GlobelStyle = useGlobelStyle();
  const { mutate: faqMutate, data: faqList } = useFaqQuestion();

  useEffect(() => {
    faqMutate({ 'filters': {} });
  }, []);

  return <ScrollView style={[GlobelStyle.container]}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#CE90FF', '#3600C0']}
      style={{
        backgroundColor: '#3a459c',
        paddingHorizontal: 10,
        paddingBottom: 10,
        height: 100,
      }}
    >
      <StatusBarHeader height={StatusBar.currentHeight} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={{
          flex: 0.8,
          textAlign: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        }}>FAQ</Text>
        <View style={{ width: 30 }} />
      </View>
    </LinearGradient>
    <AccordionList data={faqList?.data?.data} />
  </ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  socialIconTile: {
    backgroundColor: '#EFF6FF',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    borderRadius: 10,
    // borderWidth:1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    borderColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default Faq;
