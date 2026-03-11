import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Linking,
  Alert,
  Platform,
  Share,
  StatusBar,
} from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import RNFS from 'react-native-fs';
import AppNoDataFound from '../../../core/components/No_Data_Found/AppNoDataFound';
import Style from '../../assets/Style/styles';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import PdfIcon from '../../assets/icons/pdf-old.svg';
import RNFetchBlob from 'react-native-blob-util';
import { useTranslation } from 'react-i18next';
import FileViewer from 'react-native-file-viewer';
import { useDocumentCatalogueList } from '../../../api/hooks/useMasters';
import useTheme from '../../components/Theme/useTheme';
import { DownloadDocumentIcon, HelpIcon, LeftArrowIcon, ShareIcon, ViewDocumentIcon } from '../../assets/SVGs/svg';
import Toast from 'react-native-toast-message';
import { StatusBarHeader } from '../../components/StatusBar/StatusBar';
import LinearGradient from 'react-native-linear-gradient';

const handleShare = async (title, url) => {
  try {
    const message = url;

    await Share.share({
      message: message,
    }, {
      dialogTitle: 'Share this document with:',
      subject: title,
    });
  } catch (error) {
    console.error('Error sharing product details:', error);
  }
};

const Catalogue = ({ navigation }) => {
  const { mutate, data: documentList, isPending, isSuccess, isError, error } = useDocumentCatalogueList();

  const activeTheme = useTheme();
  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [catalogues, setCatalogues] = useState([]);
  const start = useRef(0);
  const [endReached, setEndReached] = useState(false);
  let onEndReachedCalledDuringMomentum = true;
  const [moreDataLoader, setMoreDataLoader] = useState(false);


  useEffect(() => {
    mutate({ filter: { start: 0, limit: 20 } });
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);

  };

  const fileExist = async ({ url, fileName = 'document.pdf' }) => {
    try {

      const { dirs } = RNFetchBlob.fs;
      const path =
        Platform.OS === 'ios'
          ? `${dirs.DocumentDir}/${fileName}`
          : `${dirs.DownloadDir}/${fileName}`;

      console.log(path);
      const exists = await RNFS.exists(path);
      if (exists) {
        Alert.alert(
          'Already Downloaded',
          'Do you want to download this PDF again?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => downloadFile({ url, fileName, path }) },
          ]
        ); // true or false
        return exists;
      }

      downloadFile({ url, fileName, path });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to download file.');
    }
  };

  const handleOpenFile = async (filePath) => {
    try {
      await FileViewer.open(filePath);
    } catch (error) {
      console.log('Error opening file:', error);
      Toast.show({
        type: 'error',
        text1: 'Could not open file',
        text2: 'Check Downloads section in the app',
      });
    }
  };

  const downloadFile = async ({ url, fileName = 'document.pdf', path = '' }) => {
    try {
      // ✅ Step 1: check if URL is valid
      if (!url || typeof url !== 'string') {
        Alert.alert('Invalid URL', 'The file URL is missing or invalid.');
        return;
      }

      // Basic check with regex or startsWith
      if (!/^https?:\/\//i.test(url)) {
        Alert.alert('Invalid URL', 'The provided URL is not valid.');
        return;
      }

      // ✅ Step 2: check if URL is reachable (HEAD request)
      const headCheck = await fetch(url, { method: 'HEAD' });
      if (!headCheck.ok) {
        Alert.alert('Download Error', 'File not found or URL is not accessible.');
        return;
      }

      // ✅ Step 3: Start download
      const res = await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path,
          description: 'Downloading file...',
          mime: 'application/pdf',
          mediaScannable: true,
        },
      }).fetch('GET', url);

      // ✅ Step 4: Show toast when complete
      Toast.show({
        type: 'info',
        text1: 'Download complete',
        text2: 'Check file in your notification center',
        autoHide: true,
        visibilityTime: 5000,
        // onPress: () => handleOpenFile(res.path()),
      });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to download file.');
    }
  };





  const moreDataHandler = async () => {
    setMoreDataLoader(true);
    try {
      setEndReached(true);
    } catch (error) {
    } finally {
      setMoreDataLoader(false);
    }
  };




  return (
    <SafeAreaView style={GlobelStyle.container}>
      <>
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
            }}>PDF Catalogue</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
              <HelpIcon
                icon={'arrow-left'}
                style={{ marginRight: 10 }}
                width={30}
                height={30}
                fill="#fff"
                stroke="#fff"
                strokeWidth={0.1}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={[{ marginTop: 10, flex: 1, backgroundColor: activeTheme.maincontainer }, Style.scrollView]}>
          <FlatList
            data={documentList?.data?.data}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum && !endReached) {
                moreDataHandler();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            onEndReachedThreshold={4}
            contentContainerStyle={{ paddingBottom: 70 }}
            ListFooterComponent={moreDataLoader && !endReached ? <ActivityIndicator /> : null}

            ListEmptyComponent={
              <View style={{ marginTop: 200 }}>

                <AppNoDataFound />
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
            // ListHeaderComponent={ListHeader}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[Style.dealerCard, { backgroundColor: activeTheme.section }]}>
                <View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}>
                      <View style={[
                        {
                          width: 30,
                          height: 30,
                          backgroundColor: '#E8F3FF',
                          borderRadius: 5,
                          justifyContent: 'center', alignItems: 'center', borderRadius: 50,
                        },
                      ]}>
                        <PdfIcon height={18} width={18} fill="#0092FF" />
                      </View>
                      <Text
                        style={{
                          color: activeTheme.text,
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}>
                        {item.title}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (!item?.doc || typeof item?.doc !== 'string') {
                            Alert.alert('Invalid URL', 'The file URL is missing or invalid.');
                            return;
                          }

                          // Basic check with regex or startsWith
                          if (!/^https?:\/\//i.test(item?.doc)) {
                            Alert.alert('Invalid URL', 'The provided URL is not valid.');
                            return;
                          }
                          navigation.navigate('Document Viewer', { url: item?.doc });
                        }}
                        style={[
                          {
                            width: 30,
                            height: 30,
                            backgroundColor: '#E8F3FF',
                            borderRadius: 5,
                            justifyContent: 'center', alignItems: 'center', borderRadius: 50,
                          },
                        ]}>
                        <ViewDocumentIcon height={18} width={18} fill="#0092FF" />
                        {/* <PdfIcon height={18} width={18} fill="#0092FF" /> */}
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          fileExist({ url: item?.doc, fileName: item?.title });
                          // navigation.navigate("Document Viewer", { url: item?.doc })
                        }}
                        style={[
                          {
                            width: 30,
                            height: 30,
                            backgroundColor: '#E8F3FF',
                            borderRadius: 5,
                            justifyContent: 'center', alignItems: 'center', borderRadius: 50,
                          },
                        ]}>
                        <DownloadDocumentIcon height={14} width={14} fill="#0092FF" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          if (!item?.doc || typeof item?.doc !== 'string') {
                            Alert.alert('Invalid URL', 'The file URL is missing or invalid.');
                            return;
                          }

                          // Basic check with regex or startsWith
                          if (!/^https?:\/\//i.test(item?.doc)) {
                            Alert.alert('Invalid URL', 'The provided URL is not valid.');
                            return;
                          }
                          handleShare(item?.title, item?.doc);
                        }}
                        style={[
                          {
                            width: 30,
                            height: 30,
                            backgroundColor: '#E8F3FF',
                            borderRadius: 5,
                            justifyContent: 'center', alignItems: 'center', borderRadius: 50,
                          },
                        ]}>
                        <ShareIcon height={14} width={14} fill="#0092FF" stroke="#0092FF" strokeWidth={1.5} />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>

              </View>
            )}
          />
        </View>

      </>
    </SafeAreaView>

  );
};

export default Catalogue;
