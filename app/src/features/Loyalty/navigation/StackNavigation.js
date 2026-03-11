import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal } from 'react-native';
import Registration from '../../../features/Loyalty/screens/Registration';
import Faq from '../../../features/Loyalty/screens/Faq';
import { AboutUs, ContactUs } from '../../../features/Loyalty/screens/Contact';
import ProductsList from '../../../core/screens/Products/ProductList';
import useGlobelStyle from '../../../core/assets/Style/GlobelStyle';
import { MenuProvider } from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';
import TicketList from '../../../core/screens/Ticket/TicketList';
import TicketAdd from '../../../core/screens/Ticket/TicketAdd';
import TicketDetail from '../../../core/screens/Ticket/TicketDetail';
import Catalogue from '../../../core/screens/Catalogue';
import CategoryList from '../../../core/screens/Products/CategoryList';
import SubCategoryList from '../../../core/screens/Products/SubCategoryList';
import ProductDetail from '../../../core/screens/Products/ProductDetail';
import VideoTutorials from '../../../core/screens/VideoTutorials';
import MyProfile from '../../../core/screens/MyProfile';
import { AppCamera } from '../../../core/components/Camera/AppCamera';
import PointHistory from '../../../features/Loyalty/screens/PointHistory';
import LeaderBoard from '../../../features/Loyalty/screens/LeaderBoard';
import BadgesList from '../../../features/Loyalty/screens/Badges';
import TrackRequestList from '../../../features/Loyalty/screens/TrackRequest';
import RedeemRequestDetail from '../../../features/Loyalty/screens/TrackRequest/Detail';
import LoyaltyGiftGalleryDetail from '../../../features/Loyalty/screens/RedeemGifts/Detail';
import LoyaltyRedeemRequest from '../../../features/Loyalty/screens/RedeemGifts/LoyaltyRedeemRequest';
import SpinAndWin from '../../../features/Loyalty/screens/SpinAndWheel';
import PurchaseRequestList from '../../../features/Loyalty/screens/PurchaseRequest';
import PurchaseRequestDetails from '../../../features/Loyalty/screens/PurchaseRequest/Detail';
import AddNewPurchaseRequest from '../../../features/Loyalty/screens/PurchaseRequest/AddNewPurchaseRequest';
import Notifications from '../../../core/screens/Notifications';
import Permission from '../../../core/components/Permissions/Permission';
import FullScreenPdf, { AiChatBot } from '../../../core/screens/Catalogue/FullScreenPdf';
import LoyaltyHome from '../../../features/Loyalty/screens/Home/LoyaltyHome';
import ScanQRCode from '../../../features/Loyalty/screens/ScanQrCode';
import UpdateProfile from '../../../features/Loyalty/screens/UpdateProfile';
import LanguageType from '../../../core/screens/Login/LanguageType';
import TabNavigation from './TabNavigation';
import { EnterCouponCode } from '../../../features/Loyalty/screens/ScanQrCode/EnterCouponCode';
import Theme from '../../../core/components/Theme';
import VideoPlayer from '../../../core/screens/VideoTutorials/VideoPlayer';
import { toastConfig } from '../../../services/ToastService';
import Toast from 'react-native-toast-message';
import useTheme from '../../../core/components/Theme/useTheme';
import DocumentViewer from '../../../core/components/DocumentViewer';
import AddressFormScreen from '../../../core/components/FormManager/AddressFormScreen';
import Feed from '../screens/PostAndEarn/Feed';
import FeedProfile from '../screens/PostAndEarn/FeedProfile';
import RedeemGifts from '../../../features/Loyalty/screens/RedeemGifts';
import ScreenWrapper from './ScreenWrapper';
import Support from '../screens/Support';
import CoinDetail from '../screens/CoinDetail';
import RedeemSection from '../screens/RedeemGifts/RedeemSection';

const HomeStack = createStackNavigator();


const StackNavigation = ({ navigation }) => {
  const activeTheme = useTheme();
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();

  const screens = [

    {
      name: 'My Profile',
      component: MyProfile,
      title: t('MyProfile'),
      menu: false,
      header: false,
    },
    {
      name: 'notifications',
      component: Notifications,
      title: t('Notification'),
      menu: false,
      header: false,
    },
    {
      name: 'LanguageType',
      component: LanguageType,
      title: t('ChangeLanguage'),
      menu: false,
      header: false,
    },

    {
      name: 'ContactUs',
      component: ContactUs,
      title: t('Contact'),
      menu: false,
      header: false,
    },
    {
      name: 'Support',
      component: Support,
      title: t('Support'),
      menu: false,
      header: false,
    },
    {
      name: 'Registration',
      component: Registration,
      title: t('Registration'),
      menu: false,
      header: true,
    },
    {
      name: 'Address',
      component: AddressFormScreen,
      title: t('Address'),
      menu: false,
      header: false,
    },
    {
      name: 'Update Profile',
      component: UpdateProfile,
      title: t('Update Profile'),
      menu: false,
      header: false,
    },
    {
      name: 'UpdateProfile',
      component: UpdateProfile,
      title: t('Update Profile'),
      menu: false,
      header: true,
    },

    {
      name: 'TicketList',
      component: TicketList,
      title: t('Tickets'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'TicketDetail',
      component: TicketDetail,
      title: t('Ticket Detail'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'EnterCouponCode',
      component: EnterCouponCode,
      title: t('EnterCouponCode'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'TicketAdd',
      component: TicketAdd,
      title: t('Add Ticket'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'Document Viewer',
      component: DocumentViewer,
      title: t('Catalogue'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'Catalogue',
      component: Catalogue,
      title: t('Catalogue'),
      menu: false,
      header: false,
      transparentHeader: false,
    },

    {
      name: 'Category',
      component: CategoryList,
      title: t('Category'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'SubCategory',
      component: SubCategoryList,
      title: t('Sub Category'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'ProductList',
      component: ProductsList,
      title: t('Products'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'ProductDetail',
      component: ProductDetail,
      title: t('Product Detail'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'VideoTutorials',
      component: VideoTutorials,
      title: t('Video Tutorials'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'VideoPlayer',
      component: VideoPlayer,
      title: t('Video Player'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'AboutUs',
      component: AboutUs,
      title: t('About Us'),
      menu: false,
      header: false,
      transparentHeader: false,
    },

    {
      name: 'LoyaltyVideos',
      component: VideoTutorials,
      title: t('Videos'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'FAQ',
      component: Faq,
      title: t('FAQ'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'ScanQrCode',
      component: ScanQRCode,
      title: t('Scan Qr Code'),
      menu: false,
      header: false,
      transparentHeader: true,
    },
    {
      name: 'CoinDetail',
      component: CoinDetail,
      title: t('Coin Detail'),
      menu: false,
      header: false,
      transparentHeader: true,
    },
    {
      name: 'AppCamera',
      component: AppCamera,
      title: t('AppCamera'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'PointHistory',
      component: PointHistory,
      title: t('Point History'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'Badges',
      component: BadgesList,
      title: t('Badges'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'TrackRequest',
      component: TrackRequestList,
      title: t('Track Request'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'TrackRequestDetail',
      component: RedeemRequestDetail,
      title: t('Track Request Detail'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'LoyaltyGiftGallery',
      component: RedeemGifts,
      title: t('Redeem Points'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'RedeemSection',
      component: RedeemSection,
      title: t('Redeem Points'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'LoyaltyGiftGalleryDetail',
      component: LoyaltyGiftGalleryDetail,
      title: t('Redeem Points'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'LoyaltyRedeemRequest',
      component: LoyaltyRedeemRequest,
      title: t('Confirm your redeem request...!'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'SpinAndWin',
      component: SpinAndWin,
      title: t('Spin & Win'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'LeaderBoard',
      component: LeaderBoard,
      title: t('Leader Board'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'PurchaseRequest',
      component: PurchaseRequestList,
      title: t('Purchase Request'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'PurchaseRequestDetails',
      component: PurchaseRequestDetails,
      title: t('Purchase Request Details'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'AddPurchaseRequest',
      component: AddNewPurchaseRequest,
      title: t('Add Purchase Request'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'Permissons',
      component: Permission,
      title: t('Permissons'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'Theme',
      component: Theme,
      title: t('Theme'),
      menu: false,
      header: true,
      transparentHeader: false,
    },
    {
      name: 'PDFFullScreen',
      component: FullScreenPdf,
      title: t('Catalogue'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'Feed',
      component: Feed,
      title: 'Feed',
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'FeedProfile',
      component: FeedProfile,
      title: 'Profile',
      menu: false,
      header: false,
      transparentHeader: false,
    },
    {
      name: 'Chat Ai',
      component: AiChatBot,
      title: t('Welcome To Ai Chat Bot'),
      menu: false,
      header: false,
      transparentHeader: false,
    },
  ];

  return (
    <MenuProvider>
      <HomeStack.Navigator name={Modal} screenOptions={{ headerShown: false }}>
        <HomeStack.Screen
          name="BottomNavigation"
          component={TabNavigation}
          options={{
            headerShown: false,
            gestureEnabled: true,
          }}
        />

        <HomeStack.Screen
          name="Back"
          component={LoyaltyHome}
          options={{
            headerShown: false,
            gestureEnabled: true,
          }}
        />

        {screens.map(row => {
          const WrappedComponent = (props) => (
            <ScreenWrapper>
              <row.component {...props} />
            </ScreenWrapper>
          );

          return (
            <HomeStack.Screen
              name={row.name}
              key={row.name}
              component={WrappedComponent}
              options={() => ({
                title: row.title,
                headerTintColor: row.transparentHeader
                  ? activeTheme.Dark
                  : activeTheme.White,
                headerStyle: row.transparentHeader
                  ? GlobelStyle.transparentHeader
                  : GlobelStyle.themedHeader,
                headerTitleStyle: {
                  textAlign: 'left',
                  fontSize: 14,
                  color: '#fff',
                },
                headerShown: row.header,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              })}
            />
          );
        })}

      </HomeStack.Navigator>
    </MenuProvider>
  );
};

export default StackNavigation;
