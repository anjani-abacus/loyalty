import { useEffect, useRef, useState } from 'react';
// import BackgroundGeolocation from "react-native-background-geolocation";
import { Switch } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { SAVE_GEOLOCATION } from '../services/BaseService';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



const BgLocation = () => {
    const [enableLocation, setEnableLocation] = useState(false);
    const [changePace, setChangePace] = useState(false);
    const isFirstRendering = useRef(true);
    const savedData = useRef([]);
    // const intervals = setInterval(() => {
    //     // alert(savedData?.current?.length)
    //     toast.show('savedLoctions ===> '+savedData?.current?.length, {type: 'danger', duration: 3000});
    // }, 6000);



    // const storages = async (lat, lng) => {
    //     const data = await AsyncStorage.getItem('asdf');
    //     const dataArr = JSON.parse(data)
    //     if(dataArr?.location?.length){
    //         const arr = {location:[...dataArr?.location, {lat, lng}]}
    //         AsyncStorage.setItem('asdf', JSON.stringify(arr))

    //         savedData.current = dataArr?.location
    //     }else{
    //         AsyncStorage.setItem('asdf', JSON.stringify({location:[{lat, lng}]}))
    //     }
    // }

    // const bgConfigs = () => {
    //     DeviceInfo.getUniqueId().then(uniqueId => {
    //         const config = {
    //             // Geolocation Config
    //             desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    //             distanceFilter: 10,
    //             // Activity Recognition
    //             stopTimeout: 5,
    //             // Application config
    //             url: SAVE_GEOLOCATION,
    //             extras: {
    //                 user_id: "559",
    //                 device_id: uniqueId
    //             },
    //             debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    //             logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    //             stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    //             startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    //             // HTTP / SQLite config
    //             // url: 'http://yourserver.com/locations',
    //             // batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
    //             // autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
    //             // headers: {              // <-- Optional HTTP headers
    //             //   "X-FOO": "bar"
    //             // },
    //             // params: {               // <-- Optional HTTP params
    //             //   "auth_token": "maybe_your_server_authenticates_via_token_YES?"
    //             // }
    //         }


    //         /// 1.  Subscribe to events.
    //         BackgroundGeolocation.onLocation((location) => {
    //             // alert('[onLocation]', location);
    //             toast.show('onLocation', {type: 'danger', duration: 3000});
    //             storages(location?.coords?.latitude, location?.coords?.longitude)
    //         })

    //         BackgroundGeolocation.onMotionChange((event) => {
    //             // alert('[onMotionChange]', event);
    //             toast.show('onMotionChange', {type: 'danger', duration: 3000});
    //         });

    //         BackgroundGeolocation.onActivityChange((event) => {
    //             // alert('[onActivityChange]', event);
    //             toast.show('onActivityChange', {type: 'danger', duration: 3000});
    //         })

    //         BackgroundGeolocation.onProviderChange((event) => {
    //             // alert('[onProviderChange]', event);
    //             toast.show('onProviderChange', {type: 'danger', duration: 3000});
    //         })

    //         BackgroundGeolocation.onHttp((event) => {
    //             // alert('[onHttp]', event);
    //             toast.show('onHttp', {type: 'danger', duration: 3000});
    //         })


    //         BackgroundGeolocation.ready(config).then((state) => {
    //             // YES -- .ready() has now resolved.
    //             // alert('bg ready');
    //             toast.show('Bg Ready', {type: 'danger', duration: 3000});
    //         });

    //     });


    // }
    // useEffect(() => {
    //     bgConfigs()

    // }, [])

    // useEffect(() => {
    //     if (enableLocation) {
    //         // BackgroundGeolocation.getCurrentPosition(options);
    //         BackgroundGeolocation.start();
    //     } else {
    //         BackgroundGeolocation.stop();
    //         AsyncStorage.removeItem("asdf")
    //     }
    // }, [enableLocation])

    // useEffect(()=>{
    //     if(isFirstRendering.current){
    //         isFirstRendering.current = false
    //         return
    //     }
    //     BackgroundGeolocation.changePace(changePace)

    // }, [changePace])


    return <>
        {/* <Text>bg location</Text>
        <Switch value={enableLocation} onValueChange={setEnableLocation} />
        <Text>changePace</Text>
        <Switch value={changePace} onValueChange={setChangePace} /> */}
    </>;
};
export default BgLocation;
// export {bgConfigs}
