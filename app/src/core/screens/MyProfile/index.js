import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, Text } from 'react-native';

import BasicInfo from './PersonalInfo';
import BankDetails from './BankDetails';
import Documents from './Documents';
import UserInfo from './UserInfo';
import { TabView } from 'react-native-tab-view';
import { TabBarLayout } from '../../../core/utils/Constant';
import { useStyles } from './styles';
import { AuthContext } from '../../../auth/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import CropScreen from '../../components/CropView';
import { useGetUserData, useUpdateUser } from '../../../api/hooks/useUsers';
import AssignedDealer from './AssignedDealer';
import Toast from 'react-native-toast-message';

import useTheme from '../../components/Theme/useTheme';

const ROUTES = [
  { key: 'Basic Information', title: 'Basic Information', payload: 'Basic Information' },
  { key: 'Document', title: 'Documents', payload: 'Document' },
  // { key: 'Bank', title: 'Bank', payload: 'Bank' },
  { key: 'Dealer', title: 'Dealer', payload: 'Dealer' },
];

const UserProfile = ({ navigation }) => {
  const [query, refetch] = useGetUserData();
  const styles = useStyles();
  const { logout, loginData, setLoginData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const activeTheme = useTheme();
  const selectedUri = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppingImage, setCroppingImage] = useState(false);
  const { mutate, isPending, isSuccess, isError, error } = useUpdateUser();

  const { setActiveStatusConfig, theme } = useContext(AuthContext);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     setActiveStatusConfig({ height: 0 });
  //   }, 100);
  // }, []);

  const updateProfileImage = () => {
        const formData = new FormData();
        formData.append('profile_img', {
            uri: 'file://' + selectedFile.uri || selectedUri?.current?.uri,
            type: selectedFile.type || selectedUri?.current?.type || 'image/png',      // or "image/jpeg"
            name: selectedFile.name || selectedUri?.current?.name || 'profile.png',
        });
        mutate(formData, {
          onSuccess: ({data}) => {
              // navigation.goBack();
              setLoginData((prev)=>({...prev, profile:data?.result?.profile}));
              refetch();
              Toast.show({type: 'success', text1: data?.message || 'Updated Successfully'});
          },
          onError: (data) => {
            Toast.show({type: 'error', text1: data?.message || 'Something went wrong!'});
          },
        });
      };

      const onRefresh = () => {
        query?.refetch();
        Toast.show({type: 'success', text1: 'Data refreshed'});
      };

    const updateProfileImageCamera = (base64Image) => {
      console.log('base64 ==> ', base64Image);
        const formData = new FormData();
        formData.append('profile_img', {
            uri: `${base64Image[0]?.base64}`,
            // uri: 'file://'+selectedFile.uri || selectedUri?.current?.uri,
            type: 'image/jpeg',
            name: 'profile.jpg',
        });
        mutate(formData, {
          onSuccess: ({data}) => {
              // navigation.goBack();
              setLoginData((prev)=>({...prev, profile:data?.result?.profile}));
              refetch();
              Toast.show({type: 'success', text1: data?.message || 'Updated Successfully'});
          },
          onError: (data) => {
            Toast.show({type: 'error', text1: data?.message || 'Something went wrong!'});
          },
        });
      };

  const filterRenderTabBar = props => (
    <TabBarLayout
      props={{ ...props }}
      tabWidth={'auto'} // auto, count of visible tabs
      isSecondaryTab={false}
      bgColor="#F9EFFF"
    />
  );

  useEffect(()=>{
    if(selectedFile){
      updateProfileImage();
    }
  }, [selectedFile]);

  const cameraPicker = () => {
    console.log('camera picker');
  };

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      selectedUri.current = res;
      setCroppingImage(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error('Unknown error:', err);
      }
    }
  };


  const renderTypeScene = ({ route, mode }) => {
    switch (route.key) {
      case 'Basic Information':
        return (
          <BasicInfo onRefresh={onRefresh} isLoading={query.isFetching} updateProfileImageCamera={updateProfileImageCamera} handleDocumentPick={handleDocumentPick} cameraPicker={cameraPicker} navigation={navigation} loginData={loginData} />
        );
      case 'Document':
        return (
          <Documents onRefresh={onRefresh} isLoading={query.isFetching} navigation={navigation} loginData={loginData} />
        );
      case 'Bank':
        return (
          <BankDetails onRefresh={onRefresh} isLoading={query.isFetching} navigation={navigation} loginData={loginData} />
        );
        case 'Dealer':
        return (
          <AssignedDealer onRefresh={onRefresh} isLoading={query.isFetching} navigation={navigation} loginData={loginData} />
        );
      default:
        return <Text>Not Available</Text>;
    }
  };

  return <>
    <UserInfo navigation={navigation} selectedFile={selectedFile} handleDocumentPick={handleDocumentPick} handleLogout={() => logout()} loginData={loginData} />
    <TabView
      renderTabBar={filterRenderTabBar}
      navigationState={{ index: activeTab, routes: ROUTES }}
      renderScene={renderTypeScene}
      onIndexChange={setActiveTab}
      lazy
      initialLayout={{ width: '100%' }}
      style={styles.tabView}
    />

    <Modal
      style={{ flex: 1, justifyContent:'center'}}
      animationType="slide"
      transparent={true}
      visible={croppingImage}>
        <CropScreen imageUri={selectedUri.current?.uri} setCroppingImage={setCroppingImage} setSelectedFile={setSelectedFile} />
    </Modal>
  </>;
};

export default UserProfile;
