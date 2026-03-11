import { View, Text, SafeAreaView, FlatList, Platform } from 'react-native';
import React, { useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { ActivityIndicator, Appbar, TextInput } from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import AppTextInput from '../../../core/components/TextInput/AppTextInput';
import useActiveTheme from '../../../core/components/Theme/useActiveTheme';
import { useTranslation } from 'react-i18next';
import AppBoldText from '../../../core/components/BoldText/AppBoldText';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import AppNoDataFound from '../../../core/components/No_Data_Found/AppNoDataFound';

const FullScreenPdf = ({ route }) => {
    const { link } = route.params;
    const [error, setError] = useState(false);
    const activeTheme = useActiveTheme();



    // Properly encode the URL
    const encodedUrl = encodeURIComponent(link);
    const gViewUrl = Platform.OS == 'android' ? `https://docs.google.com/gview?embedded=true&url=${encodedUrl}` : link;

    // Fallback to direct PDF URL (if supported by device)
    const webViewHtml = `
      <html>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body style="margin:0;">
          <iframe 
            src="${gViewUrl}" 
            style="width:100%; height:100%; border:none;"
          ></iframe>
        </body>
      </html>
    `;

    const handleReload = () => {
        setError(false);
        setLoading(true);
    };

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 20 }}>Failed to load PDF</Text>
                <TouchableOpacity onPress={handleReload}>
                    <Text style={{ color: 'blue' }}>Tap to retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <WebView
            style={{ flex: 1 }}
            originWhitelist={['*']}
            source={{ html: webViewHtml }}

            onError={(syntheticEvent) => {
                console.error('WebView error:', syntheticEvent.nativeEvent);
                setError(true);

            }}
            onHttpError={(syntheticEvent) => {
                console.error('HTTP error:', syntheticEvent.nativeEvent);
                setError(true);

            }}
            renderLoading={() => <ActivityIndicator size="large" color={activeTheme.themeColor} style={{ position: 'absolute', alignSelf: 'center', top: '50%' }} />}
            startInLoadingState={true}

            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"

            setSupportMultipleWindows={false}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
        />
    );
};

export default FullScreenPdf;




export const AiChatBot = ({ navigation }) => {
    const [activityRemarList, setactivityRemarList] = useState([]);
    const [remarkData, setremarkData] = useState('');
    const [loading, setLoading] = useState(false);
    const GlobelStyle = useGlobelStyle();
    const activeTheme = useActiveTheme();
    const { t } = useTranslation();



    const apiKey = 'AIzaSyDQPMtv9-ERW3F2z0cBL3f-Ow5tCiKYf_k';

    const RemarkLog = ({ item, index }) => {


        return (
            <View
                style={
                    item.changes_by_name == 'AI'
                        ? GlobelStyle.leftRemarkContainer
                        : GlobelStyle.rightRemarkContainer
                }>
                <View style={GlobelStyle.bubbleContainer}>
                    <View
                        style={
                            item.changes_by_name == 'AI'
                                ? GlobelStyle.bubble
                                : GlobelStyle.Rightbubble
                        }>
                        <Text
                            style={
                                item.changes_by_name == 'AI'
                                    ? GlobelStyle.leftRemarkText
                                    : GlobelStyle.rightRemarkText
                            }>
                            <AppBoldText>{item.msg ? item.msg : ''}</AppBoldText>
                        </Text>

                        <View
                            style={
                                item.changes_by_name == 'AI'
                                    ? GlobelStyle.leftCorner
                                    : GlobelStyle.rightCorner
                            } />
                    </View>
                </View>
                <View
                    style={
                        item.changes_by_name == 'AI'
                            ? GlobelStyle.leftDateTimeData
                            : GlobelStyle.rightDateTimeData
                    }>
                    <Text style={GlobelStyle.smLabel}>
                        <AppBoldText>
                            {item.changes_by_name}
                            {' . '}
                        </AppBoldText>
                        {moment(item.date_created).format('DD MMM YYYY')}
                    </Text>
                </View>
            </View>
        );
    };


    const generateText = async (text) => {
        try {
            const requestBody = {
                contents: [{ parts: [{ text }] }], // Corrected request structure
            };
            setLoading(true);
            setremarkData(''); // Clear the input field

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${response.status} - ${response.statusText}: ${errorData?.error?.message || 'API Error'}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                const generatedText = data.candidates[0].content.parts[0].text; // Corrected response parsing

                setactivityRemarList(prevList => [
                    ...prevList,
                    { msg: generatedText, changes_by_name: 'AI', date_created: new Date().toISOString() },
                ]);


            } else {
                throw new Error('Unexpected response format');
            }
            setLoading(false);

        } catch (err) {
            setLoading(false);
            Toast.show({ type: 'error', text1: err, visibilityTime: 6000 });
            console.error('Gemini API Error:', err);
        }
    };

    return (
        <View style={GlobelStyle.container}>
            <Appbar.Header style={[GlobelStyle.AppbarHeader]}>
                <Appbar.BackAction
                    color={activeTheme.Light}
                    size={22}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    titleStyle={[GlobelStyle.AppbarContent]}
                    title={'Welcome To Ai Chat Bot'}
                />
                <Appbar.Action
                    color={activeTheme.Light}
                    icon="text-to-speech"
                    isLeading
                    onPress={() => {

                    }}
                />
            </Appbar.Header>
            {
                activityRemarList.length > 0 && <View style={{ margin: 5, paddingBottom: 100 }}>
                    <FlatList
                        data={activityRemarList}
                        renderItem={RemarkLog}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            }
            {
                activityRemarList.length < 1 &&
                <View style={{ flex: 1 }}>
                    <AppNoDataFound title={'Enter Your Questions'} />
                </View>
            }

            <View
                style={[
                    GlobelStyle.marginHorizontal16,
                    {
                        position: 'absolute',
                        bottom: 0,
                        left: -15,
                        right: 0,
                        width: '100%',
                    },
                ]}>

                <AppTextInput
                    label={t('Ask Me Anything') + ' *'}
                    mode="outlined"
                    placeholder={t('Ask Me Anything...')}
                    placeholderTextColor={activeTheme.Medium}
                    type="textInput"
                    value={remarkData}
                    onChangeText={val => {
                        setremarkData(val);

                    }}
                    autoCorrect={true}
                    right={
                        <TextInput.Icon
                            size={30}
                            icon="send"
                            loading={loading}
                            color={activeTheme.themeColor}
                            onPress={() => {

                                if (remarkData.length < 1) {
                                    Toast.show({ type: 'error', text1: 'Please Add Remark First...', visibilityTime: 6000 });
                                } else {
                                    setactivityRemarList(prevList => [
                                        ...prevList,
                                        { msg: remarkData, changes_by_name: 'user', date_created: new Date().toISOString() },
                                    ]);
                                    generateText(remarkData);
                                }
                            }}
                        />
                    }
                />

            </View>
        </View>
    );
};

