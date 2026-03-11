import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThemedText from '../../components/ThemedText';
import UploadDocument from '../../assets/icons/UploadDocument.svg';
import CorruptedImage from '../../assets/icons/corruptedImage.svg';
import Pdf from '../../assets/icons/pdf.svg';
import Jpg from '../../assets/icons/Jpg.svg';
import Png from '../../assets/icons/Png.svg';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext, useEffect, useRef, useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { useUpdateDocument } from '../../../api/hooks/useMasters';
import { AuthContext } from '../../../auth/AuthContext';
import Bin from '../../assets/icons/Bin.svg';
import useTheme from '../Theme/useTheme';
import { Images } from '../../assets';
import { Image, Modal } from 'react-native';
import CropScreen from '../CropView';
import { CorruptImageIcon } from '../../assets/SVGs/svg';

const Document = ({ setFieldValue, title, documentKey, document, uploadedUrl }) => {
    const activetheme = useTheme();
    const { mutate, isPending: uploading, isSuccess, isError, error } = useUpdateDocument();
    const GlobelStyle = useGlobelStyle();
    const { loginData } = useContext(AuthContext);
    const [url, setUrl] = useState('');
    const [imageError, setImageError] = useState(false);

    const styles = StyleSheet.create({
        uploadBtn: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 18, marginTop: 15, backgroundColor: '#0b756f' },
        btnText: { color: '#fff' },
        selectedFile: { color: '#004CAC' },
        iconWrapper: {
            backgroundColor: '#cbe1e2',
            height: 40,
            width: 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemWrapper: {
            flexDirection: 'row',
            padding: 10,
            gap: 10,
            alignItems: 'center',
        },
        fileName: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#000',
        },
        fileSize: {
            fontSize: 12,
        },
        uploadTitle: {
            fontSize: 16,
            color: activetheme.text,
            fontWeight: 'bold',
        },
        uploadSubTitle: {
            fontSize: 14,
            color: '#999',
            fontWeight: '500',
        },
        mainWrapper: {
            padding: 10,
            backgroundColor: activetheme.section,
            marginVertical: 10,
            borderRadius: 10,
        },
        boxWrapper: {
            height: 200,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#aaa',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
    });

    useEffect(() => {
        setUrl(uploadedUrl);
    }, []);

    const selectedUri = useRef(null);
    const [croppingImage, setCroppingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleDocumentPick = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            });
            selectedUri.current = res;
            setCroppingImage(true);
            // setSelectedFile(res);
            // setFieldValue(`documentDetails.${documentKey}`, res)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                console.error('Unknown error:', err);
            }
        }
    };

        useEffect(()=>{
          console.log('isCameraVisible');
          if(!croppingImage && selectedUri){
            setSelectedFile(selectedUri.current);
            setFieldValue(`documentDetails.${documentKey}`, selectedUri.current);
          }
        }, [croppingImage]);

    const uploadDocument = async () => {
        if (!selectedFile) {
            Alert.alert('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('documentImage', {
            uri: selectedFile.uri,
            type: selectedFile.type,
            name: selectedFile.name,
        });

        // Optional: Append metadata like document type
        formData.append('doc_type', 'aadhaar_front'); // Change dynamically as needed
        formData.append('userId', loginData?.id); // Change dynamically as needed
        try {

            mutate(formData, {
                onSuccess: (resp) => {
                    setUrl(resp?.data?.data?.url);
                },
            });

        } catch (error) {
            console.error(error);
            alert('Error', 'Failed to upload document.');
        }
    };


    return <View style={styles.mainWrapper}>
        {title && <ThemedText style={{
            fontWeight: 'bold',
        }}>{title}</ThemedText>}
        <View style={styles.boxWrapper}>
            {url ?
                <ImageBackground
                    source={imageError ? Images.corruptedImage : { uri: url }}
                    style={{ height: '100%', width: '100%' }}
                    resizeMode="contain"
                >

                    <Image
                        source={{ uri: url }}
                        style={{ width: 1, height: 1, opacity: 0 }}
                        onError={() => setImageError(true)}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        padding: 5,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setUrl(null);
                            setSelectedFile(null);
                            setImageError(false);
                        }} style={{
                            backgroundColor: '#F9E2E2',
                            height: 30, width: 30, borderRadius: 30,
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Bin height="20" width="20" fill="#f00" />
                        </TouchableOpacity>
                    </View>

                    {imageError && <View style={{position:'absolute', width:'100%', bottom:0, left:0, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{ textAlign:'center', color:'#f00', fontWeight:'500'}}>  Uploaded image is corrupted, kindly re-upload.</Text>
                    </View>}
                </ImageBackground> :
                <>
                    <TouchableOpacity onPress={() => handleDocumentPick()} style={GlobelStyle.alignItemsCenter}>
                        <UploadDocument width={44} height={44} fill="#0b756f" />
                        <ThemedText style={styles.uploadTitle}>Browse and upload {document} here</ThemedText>
                        {/* <ThemedText style={styles.uploadSubTitle}>Supports: Max file size 10MB</ThemedText> */}
                    </TouchableOpacity>

                    {selectedFile && <>
                        {/* <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={uploadDocument}
                            disabled={!selectedFile || uploading}
                        >
                            {uploading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.btnText}>Upload</ThemedText>}
                        </TouchableOpacity> */}
                        <ThemedText style={styles.selectedFile}>Selected File: {selectedFile?.name}</ThemedText>
                    </>}
                </>}
        </View>

        {false && <ScrollView style={{ maxHeight: 100, marginTop: 10 }}>
            <TouchableOpacity style={styles.itemWrapper}>
                <View style={styles.iconWrapper}>
                    <Pdf width={28} height={28} fill="#0b756f" />
                </View>
                <View>
                    <ThemedText style={styles.fileName}>AddharFront.pdf</ThemedText>
                    <ThemedText style={styles.fileSize}>5MB</ThemedText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemWrapper}>
                <View style={styles.iconWrapper}>
                    <Jpg width={28} height={28} fill="#0b756f" />
                </View>
                <View>
                    <Text style={styles.fileName}>AddharFront.jpg</Text>
                    <Text style={styles.fileSize}>5MB</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemWrapper}>
                <View style={styles.iconWrapper}>
                    <Png width={28} height={28} fill="#0b756f" />
                </View>
                <View>
                    <Text style={styles.fileName}>AddharFront.png</Text>
                    <Text style={styles.fileSize}>5MB</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>}

        <Modal
      style={{ flex: 1, justifyContent:'center'}}
      animationType="slide"
      transparent={true}
      visible={croppingImage}>
        <CropScreen shouldUseAspectRatio={false} imageUri={selectedUri.current?.uri} setCroppingImage={setCroppingImage} setSelectedFile={setSelectedFile} />
    </Modal>
    </View>;
};



export default Document;
