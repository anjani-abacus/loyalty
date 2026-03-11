import '@testing-library/jest-native/extend-expect';

// Silence React Native warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


// --- Gesture Handler ---
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }) => children,
  PanGestureHandler: ({ children }) => children,
  TapGestureHandler: ({ children }) => children,
  State: {},
}));

// --- Universal Native Module Mock ---
const mockNative = new Proxy({}, { get: () => jest.fn() });

// Frequently failing native libs:
jest.mock('react-native-fs', () => mockNative);

jest.mock('react-native-blob-util', () => mockNative);
jest.mock('react-native-view-shot', () => mockNative);
jest.mock('react-native-image-picker', () => mockNative);
jest.mock('react-native-file-viewer', () => mockNative);
jest.mock('react-native-video', () => mockNative);
jest.mock('react-native-pdf', () => mockNative);
jest.mock('react-native-maps', () => mockNative);

// --- Firebase ---
jest.mock('@react-native-firebase/app', () => () => mockNative);

// --- Notifee ---
jest.mock('@notifee/react-native', () => ({
  onForegroundEvent: jest.fn(() => jest.fn()),   // <-- FIXED
  onBackgroundEvent: jest.fn(() => jest.fn()),
  requestPermission: jest.fn(() => Promise.resolve(true)),
  displayNotification: jest.fn(),
  cancelAllNotifications: jest.fn(),
  createChannel: jest.fn(() => Promise.resolve('mock-channel')),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),

  EventType: {
    PRESS: 'PRESS',
    ACTION_PRESS: 'ACTION_PRESS',
  },

  AndroidImportance: {
    HIGH: 4,
    DEFAULT: 3,
    LOW: 2,
  },
}));

jest.mock('react-native-system-navigation-bar', () => ({
  setNavigationColor: jest.fn(),
  navigationHide: jest.fn(),
  navigationShow: jest.fn(),
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const React = require('react');
  return {
    KeyboardAwareScrollView: ({ children }) => <>{children}</>,
  };
});

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(() => 0),
  getBottomSpace: jest.fn(() => 0),
}));

jest.mock('@react-native-firebase/messaging', () => {
  const mockMessagingInstance = {
    requestPermission: jest.fn(() => Promise.resolve('authorized')),
    onMessage: jest.fn(() => jest.fn()),
    setBackgroundMessageHandler: jest.fn(),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    isDeviceRegisteredForRemoteMessages: jest.fn(() => true),
    registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
    onTokenRefresh: jest.fn(() => jest.fn()),    // <-- ADD THIS LINE
  };

  const messaging = () => mockMessagingInstance;

  messaging.AuthorizationStatus = {
    AUTHORIZED: 'authorized',
    PROVISIONAL: 'provisional',
  };

  return messaging;
});


// --- Permissions ---
jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
  PERMISSIONS: { ANDROID: {}, IOS: {} },
  RESULTS: {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    GRANTED: 'granted',
  },
}));

// --- Element Dropdown ---
jest.mock('react-native-element-dropdown', () => ({
  Dropdown: ({ children }) => children,
  MultiSelect: ({ children }) => children,
}));

// --- DateTimePicker ---
jest.mock('react-native-modal-datetime-picker', () => {
  return ({ onConfirm, onCancel }) => null;
});

// --- RNE UI ---
jest.mock('@rneui/themed', () => ({
  Icon: ({ name }) => `Icon-${name}`,
  Skeleton: () => 'Skeleton',
}));

jest.mock('@rneui/base', () => ({
  ScreenHeight: 800,
  ScreenWidth: 400,
}));

// --- Linear Gradient ---
jest.mock('react-native-linear-gradient', () => ({ children }) => children);

// --- OTP Verify ---
jest.mock('react-native-otp-verify', () => ({
  getOtp: jest.fn(),
  startOtpListener: jest.fn(),
  removeListener: jest.fn(),
  requestHint: jest.fn(),
}));

// --- Haptic Feedback ---
jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

// --- Async Storage ---
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

// --- Config ---
jest.mock('react-native-config', () => ({
  API_URL: 'https://mock.test',
}));

jest.mock('react-native-toast-message', () => {
  const MockToast = () => null;

  return {
    __esModule: true,
    default: MockToast,
    show: jest.fn(),
    hide: jest.fn(),
  };
});

jest.mock('@react-native-community/netinfo', () => {
  return {
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(() =>
      Promise.resolve({
        type: 'wifi',
        isConnected: true,
        isInternetReachable: true,
      })
    ),
    useNetInfo: jest.fn(() => ({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    })),
  };
});

jest.mock('react-native-share', () => ({
  open: jest.fn(() => Promise.resolve({ success: true })),
  shareSingle: jest.fn(() => Promise.resolve({ success: true })),
  isPackageInstalled: jest.fn(() => Promise.resolve({ isInstalled: true })),
  Social: {
    FACEBOOK: 'facebook',
    WHATSAPP: 'whatsapp',
    INSTAGRAM: 'instagram',
  },
  default: {
    open: jest.fn(() => Promise.resolve({ success: true })),
    shareSingle: jest.fn(() => Promise.resolve({ success: true })),
    isPackageInstalled: jest.fn(() => Promise.resolve({ isInstalled: true })),
    Social: {
      FACEBOOK: 'facebook',
      WHATSAPP: 'whatsapp',
      INSTAGRAM: 'instagram',
    },
  },
}));

jest.mock('react-native-network-bandwith-speed', () => ({
  measureConnectionSpeed: jest.fn(() =>
    Promise.resolve({
      downloadSpeed: 50,   // Mbps
      uploadSpeed: 20,     // Mbps
      latency: 30,         // ms
    })
  ),
}));

jest.mock('react-native-webview', () => {
  const MockWebView = ({ children }) => {
    return children || null;
  };

  MockWebView.prototype = {
    postMessage: jest.fn(),
    injectJavaScript: jest.fn(),
  };

  return {
    __esModule: true,
    default: MockWebView,
    WebView: MockWebView,
  };
});

jest.mock('react-native-sound', () => {
  return class Sound {
    constructor(file, basePath, onLoad) {
      // Simulate successful load
      if (onLoad) {
        onLoad(null);
      }
    }

    play = jest.fn((callback) => {
      if (callback) {callback(true);}
    });

    stop = jest.fn((callback) => {
      if (callback) {callback(true);}
    });

    pause = jest.fn();

    release = jest.fn();
  };
});

jest.mock('react-native-vision-camera', () => ({
  Camera: jest.fn().mockImplementation(() => null),

  useCameraDevices: jest.fn(() => ({
    back: { id: 'back', name: 'Back Camera', position: 'back' },
    front: { id: 'front', name: 'Front Camera', position: 'front' },
  })),

  useFrameProcessor: jest.fn(() => jest.fn()),

  requestCameraPermission: jest.fn(() => Promise.resolve('granted')),
  requestMicrophonePermission: jest.fn(() => Promise.resolve('granted')),
  checkCameraPermission: jest.fn(() => Promise.resolve('granted')),
  checkMicrophonePermission: jest.fn(() => Promise.resolve('granted')),
}));

jest.mock('react-native-document-picker', () => {
  return {
    pick: jest.fn(() =>
      Promise.resolve([
        {
          uri: 'file://mock-file.pdf',
          type: 'application/pdf',
          name: 'mock-file.pdf',
          size: 12345,
        },
      ])
    ),

    pickSingle: jest.fn(() =>
      Promise.resolve({
        uri: 'file://mock-file.pdf',
        type: 'application/pdf',
        name: 'mock-file.pdf',
        size: 12345,
      })
    ),

    types: {
      allFiles: '*/*',
      images: 'image/*',
      pdf: 'application/pdf',
      audio: 'audio/*',
      video: 'video/*',
    },
  };
});

jest.mock('@shopify/react-native-skia', () => {
  const MockComponent = () => null;

  return {
    // Basic components
    Canvas: MockComponent,
    Circle: MockComponent,
    Group: MockComponent,
    Path: MockComponent,
    Text: MockComponent,

    // Enums / constants you may import
    FontWeight: {
      Normal: 'normal',
      Bold: 'bold',
      Medium: 'medium',
      Light: 'light',
    },

    // Hooks
    useFont: jest.fn(() => ({
      getTextWidth: () => 100,
    })),

    useValue: jest.fn((initial) => ({ current: initial })),

    // Animation API mock
    runTiming: jest.fn(),
    Easing: { linear: jest.fn() },

    // Default export fallback (important)
    default: {},
  };
});

jest.mock('src/services/ServiceProvider', () => ({
  ApiCall: jest.fn(() => Promise.resolve({ status: 200, data: { success: true } })),
}));

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 28.6139,
        longitude: 77.2090,
        accuracy: 10,
      },
    });
  }),

  watchPosition: jest.fn(() => 1),  // return watch ID = 1

  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('rn-qr-generator', () => ({
  generate: jest.fn(() =>
    Promise.resolve({
      uri: 'file://mock-qr.png',
      width: 200,
      height: 200,
      base64: 'mock-base64-string',
    })
  ),
  generateBase64: jest.fn(() =>
    Promise.resolve({
      base64: 'mock-base64-string',
    })
  ),
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(() => Promise.resolve(true)),
  show: jest.fn(() => Promise.resolve(true)),
  getVisibilityStatus: jest.fn(() => Promise.resolve('visible')),
  // for components importing default:
  default: {
    hide: jest.fn(() => Promise.resolve(true)),
    show: jest.fn(() => Promise.resolve(true)),
    getVisibilityStatus: jest.fn(() => Promise.resolve('visible')),
  },
}));

jest.mock('reactotron-react-native', () => ({
  configure: jest.fn(() => ({
    useReactNative: jest.fn(() => ({
      connect: jest.fn(),
    })),
  })),
  useReactNative: jest.fn(() => ({
    connect: jest.fn(),
  })),
  connect: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  default: {
    configure: jest.fn(() => ({
      useReactNative: jest.fn(() => ({
        connect: jest.fn(),
      })),
    })),
    useReactNative: jest.fn(() => ({
      connect: jest.fn(),
    })),
    connect: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('react-native-version-check', () => ({
  getCurrentVersion: jest.fn(() => '1.0.0'),
  getLatestVersion: jest.fn(() => Promise.resolve('1.0.0')),
  needUpdate: jest.fn(() => Promise.resolve({ isNeeded: false })),
}));
