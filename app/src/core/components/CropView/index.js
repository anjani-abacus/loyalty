import React, {useRef} from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import {CropView} from 'react-native-image-crop-tools';

const CropScreen = ({imageUri, setSelectedFile, setCroppingImage, shouldUseAspectRatio = true}) => {
  const cropRef = useRef();
  const onImageCrop = () => {
    cropRef.current.saveImage(true, 90);
  };

  return (
    <View style={{justifyContent:'center', padding:10, flex:1, backgroundColor: '#000' }}>
      <CropView
        sourceUrl={imageUri}
        style={{flex: 1, alignItems:'center', justifyContent:'center'}}
          ref={cropRef}
        onImageCrop={(res) => {setSelectedFile(res); setCroppingImage(false);}}
        keepAspectRatio={false}

          {...(shouldUseAspectRatio ? { aspectRatio: { width: 1, height: 1 } } : {})}
      />
      <View style={{
        flexDirection:'row',
        width:'100%',
        gap:40,
        justifyContent:'space-between',
      }}>
        <TouchableOpacity style={{flex:1, padding:10, borderRadius:5}} onPress={()=>setCroppingImage(false)}>
          <Text style={{textAlign:'center', color:'#fff'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, padding:10, borderRadius:5}} onPress={()=>onImageCrop()} >
          <Text style={{textAlign:'center', color:'#fff'}}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CropScreen;
