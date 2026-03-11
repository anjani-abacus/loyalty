import { Gesture } from 'react-native-gesture-handler';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import { useSharedValue, withDecay, withTiming, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useSpinWinPoint, useSpinWin } from '../../../../api/hooks/useSpinwin';
import { useFocusEffect } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const wheelSize = width - 80;
const center = wheelSize / 2;

export const useSpinWheelConfig = (setTotalEarnedPoints) => {
  const { isLoading, refetch: fetchSpinWinDetails, data: spinWinDetails, isFetching } = useSpinWin({ filter: {} }); //for slabs
  // spinWinDetails?.data?.data[0]?.assigned_spin
  const [calibrationDeg, setCalibrationDeg] = useState(-16);
  const { mutate: mutateSpinWinPoint, data: spinWinPoint } = useSpinWinPoint(); //to send win request
  const WinSound = useRef(new Sound(require('../../static/Sounds/WinSound.wav'), Sound.MAIN_BUNDLE, (err) => {
    if (err) {console.warn(`Failed to load tick sound instance ${i}`, err);}
  }));

  useFocusEffect(useCallback(() => {
    fetchSpinWinDetails();
  }, []));

  const rotation = useSharedValue(0);
  const startAngle = useSharedValue(0);
  const [showWinModal, setShowWinModal] = useState({ state: false, pointSegment: {} });
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpeakerOn, setSpeakerOn] = useState(true);
  const speakerRef = useSharedValue(isSpeakerOn);
  // const segments = spinWinDetails?.data?.data[0]?.assigned_spin;
  // const segments = [
  //   {color: '#7b56cc', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 21, "slab_point": "19"},
  //   {color: '#c1a6ff', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 21, "slab_point": "11"},
  //   { color: '#004CAC', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 21, "slab_point": "77" },
  //   { color: '#18a9da', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 21, "slab_point": "100" },
  //   { color: '#004CAC', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 21, "slab_point": "65" },
  //   { color: '#18a9da', "date_created": "2025-08-13T12:21:15.000Z", "spin_id": 21, "slab_point": "98" },
  //   { color: '#004CAC', "date_created": "2025-08-13T12:21:15.000Z", "spin_id": 21, "slab_point": "1" },
  //   { color: '#18a9da', "date_created": "2025-08-13T12:21:15.000Z", "spin_id": 21, "slab_point": "0" }
  // ]
  // const segments = [
  //   {color: '#7b56cc', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 1, "slab_point": "50"},
  //   {color: '#c1a6ff', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 2, "slab_point": "100"},
  //   { color: '#7b56cc', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 3, "slab_point": "200" },
  //   { color: '#c1a6ff', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 4, "slab_point": "300" },
  //   { color: '#7b56cc', "date_created": "2025-08-13T12:21:14.000Z", "spin_id": 5, "slab_point": "500" },
  //   { color: '#c1a6ff', "date_created": "2025-08-13T12:21:15.000Z", "spin_id": 6, "slab_point": "600" },
  //   { color: '#7b56cc', "date_created": "2025-08-13T12:21:15.000Z", "spin_id": 7, "slab_point": "700" },
  //   { color: '#c1a6ff', "date_created": "2025-08-13T12:21:15.000Z", "spin_id": 8, "slab_point": "800" }
  // ]
  // const segments = spinWinDetails?.data?.data[0]?.slab_point?.map((elem, i)=>{
  //   if(i%2){
  //     return {color: '#7b56cc', "spin_id": 1, "slab_point": elem}
  //   }else{
  //     return {color: '#c1a6ff', "spin_id": 1, "slab_point": elem}
  //   }
  // })

  const segments = useMemo(() => {
    const list = spinWinDetails?.data?.data[0]?.slab_point ?? [];
    return list.map((elem, i) => ({
      color: i % 2 ? '#7b56cc' : '#c1a6ff',
      spin_id: spinWinDetails?.data?.data[0]?.id, // assign correct spin_id
      slab_point: elem,
    }));
  }, [spinWinDetails]);

  const segmentsLength = useSharedValue(0);

  useEffect(() => {
    segmentsLength.value = segments.length;
  }, [segments]);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const TICK_POOL_SIZE = 5;
  const tickSoundPool = useRef([]);
  const lastTickTime = useRef(0);
  const TICK_INTERVAL = 50;
  const tickIndex = useRef(0);

  useEffect(() => {
    if (showWinModal?.state && speakerRef.value) {
      WinSound.current.stop(() => {
        WinSound.current.play();
      });
    }
  }, [showWinModal]);

  useEffect(() => {
    Sound.setCategory('Playback', true);

    for (let i = 0; i < TICK_POOL_SIZE; i++) {
      const tick = new Sound(require('../../static/Sounds/Tick.wav'), Sound.MAIN_BUNDLE, (err) => {
        if (err) {console.warn(`Failed to load tick sound instance ${i}`, err);}
      });
      tickSoundPool.current.push(tick);
    }

    return () => {
      tickSoundPool.current.forEach((sound) => sound.release());
    };
  }, []);


  const getAngle = (x, y) => {
    'worklet';
    const dx = x - center;
    const dy = y - center;
    const radians = Math.atan2(dy, dx);
    const angle = (radians * 180) / Math.PI;
    return angle;
  };

  const pan = Gesture.Pan()
    .onBegin((e) => {
      const angle = getAngle(e.x, e.y);
      startAngle.value = angle - rotation.value;
    })
    .onUpdate((e) => {
      const angle = getAngle(e.x, e.y);
      rotation.value = angle - startAngle.value;
    })
    .onEnd((e) => {
      const velocity = e.velocityX + e.velocityY;
      rotation.value = withDecay({
        velocity: velocity * 0.01,
        deceleration: 0.98,
      });
    });

  const handleTick = () => {
    if (!speakerRef.value || tickSoundPool.current.length === 0) {return;}

    const now = Date.now();
    if (now - lastTickTime.current < TICK_INTERVAL) {return;}

    if (speakerRef.value) {
      const sound = tickSoundPool.current[tickIndex.current];
      sound.stop(() => sound.play());
    }

    tickIndex.current = (tickIndex.current + 1) % tickSoundPool.current.length;

    lastTickTime.current = now;
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  };

  useEffect(() => {
    speakerRef.value = isSpeakerOn;
  }, [isSpeakerOn]);

  useAnimatedReaction(
    () => {

      const normalized = (rotation.value % 360 + 360) % 360;
      return Math.floor(normalized / (360 / (segmentsLength.value || 1)));
    },
    (currSeg, prev) => {
      if (currSeg !== prev && speakerRef.value) {
        runOnJS(handleTick)();
      }
    },
    []
  );

const spin = useCallback(() => {
  if (!segments || segments.length === 0) {
    console.warn('Spin attempted before segments loaded');
    return;
  }

  if (isSpinning) {return;}
  setIsSpinning(true);

  const spinAmount = 360 * 5 + Math.floor(Math.random() * 360);
  const targetRotation = rotation.value + spinAmount;

  rotation.value = withTiming(targetRotation, { duration: 6000 }, (finished) => {
    if (!finished) {return;}

    const wobble = [
      { angle: -8, duration: 300 },
      { angle: 5, duration: 280 },
      { angle: -3, duration: 250 },
      { angle: 1.5, duration: 220 },
    ];

    // ✅ Perform selection *after* wobble, not now
    const finalizeSelection = () => {
      const segmentAngle = 360 / segments.length;
      const normalized = ((rotation.value % 360) + 360) % 360;

      // Pointer visually at top → 270° (add calibration)
      const pointerAngle = 270 + calibrationDeg;

      const relativeAngle = (pointerAngle - normalized + 360) % 360;

      // ✅ nearest slice center = perfect accuracy
      const index = Math.round(relativeAngle / segmentAngle) % segments.length;

      const selectedSegment = segments[index];

      if (!selectedSegment) {
        runOnJS(setIsSpinning)(false);
        console.warn('Selected segment undefined', { index, normalized, relativeAngle });
        return;
      }

      runOnJS(handleSpinResult)(selectedSegment);
      runOnJS(setIsSpinning)(false);
    };

    // ✅ Wobble animation chain
    const animateWobble = (i = 0) => {
      if (i >= wobble.length) {
        // last micro-adjust before final stop
        rotation.value = withTiming(targetRotation, { duration: 120 }, () => {
          finalizeSelection(); // 🎯 Select after wobble
        });
        return;
      }

      const { angle, duration } = wobble[i];
      rotation.value = withTiming(targetRotation + angle, { duration }, () => {
        animateWobble(i + 1);
      });
    };

    animateWobble();
  });
}, [segments, isSpinning, segmentsLength, calibrationDeg]);


  const handleSpinResult = (segment) => {
    mutateSpinWinPoint(
      {
        spin_id: Number(spinWinDetails?.data?.data[0]?.id),
        slab_point: Number(segment.slab_point),
      },
      {
        onSuccess: (data) => {
          // setShowWinModal(true);
          setShowWinModal({ state: true, pointSegment: segment });
          // setModalMessage(data?.message || "You won 🎉");
        },
        onError: (error) => {
          console.log('Spin failed:', error?.message);
        },
      }
    );
  };


  return {
    wheelSize,
    center,
    rotation,
    startAngle,
    isSpinning,
    setIsSpinning,
    isSpeakerOn,
    setSpeakerOn,
    showWinModal,
    setShowWinModal,
    segments,
    spin,
    disabledButton:(segments.length === 0 || isSpinning),
    speakerRef,
    pan,
  };
};
