import { Routes, Route } from 'react-router-dom';
import Product from '../modules/Master/product/index.jsx';
import Category from '../modules/Master/category/index.jsx';


import PDF from '../modules/Master/PDF/index.jsx';
import Layout from '../layouts/MainLayout.jsx';
import CreateProduct from '../modules/Master/product/CreateProduct.jsx';

import InfluencerNetwork from '../modules/network/influencers/index.jsx';
import ManageUser from "../modules/userManagement/index.jsx";
import { Login } from "../modules/Auth/Login.jsx";
import OtpVerification from "../modules/Auth/otpVerification.jsx";
import ProtectedRoute from "../routes/ProtectedRoutes.jsx";
import Logout from "../modules/Auth/Logout.jsx";
import BonusPoint from '../modules/bonus/bonus-point/index.jsx';
import SpinWinList from '../modules/bonus/spin&win/index.jsx';
import Badges from "../modules/bonus/badge/index.jsx"

import RedeemCash from "../modules/redeem/cash"
import GiftGallery from '../modules/giftGallery/index.jsx';

// import RedeemGift from "../modules/redeem/gift"
import RedeemGift from "../modules/redeem/gift/index.jsx"
import ReprintCoupon from "../modules/reprintCoupon"
import RolesnPermission from "../modules/Roles&Permission/Designation/index.jsx"
import Ticket from "../modules/ticket/index.jsx"
import InfluencerNetworkDetail from '../modules/network/influencers/pages/Detail.jsx';
import AddCategory from "../modules/Master/category/add/index.jsx"
import SubCategory from "../modules/Master/subcategory/index.jsx"
import InfluencerForm from '../modules/network/influencers/pages/Form.jsx';
import LeaderboardList from '../modules/bonus/Leaderboard/index.jsx';
import QrCode from '../modules/QrCode/index.jsx';
// import GiftGalleryAdd from '../modules/giftGallery/pages/Add.jsx';
import BonusPointAdd from '../modules/bonus/bonus-point/pages/Add.jsx';
import AddQrCode from '../modules/QrCode/pages/Add.jsx';
import QrCodeDetail from '../modules/QrCode/pages/Detail.jsx';
import PointCategory from "../modules/Master/pointCategoryList/index.jsx"
import ProductDetail from '../modules/Master/product/pages/Detail.jsx';
import GiftGalleryAdd from '../modules/giftGallery/pages/Add.jsx';
import BadgesAdd from '../modules/bonus/badge/pages/Add.jsx';
import SpinWinAdd from '../modules/bonus/spin&win/pages/Add.jsx';
import ProductAdd from '../modules/Master/product/pages/Form.jsx';
import ReferralPointMaster from '../modules/Master/referralPointMaster/index.jsx';
import AddPDF from '../modules/Master/PDF/add/index.jsx';
import VideoTutorial from "../modules/videoTutorial/index.jsx";

import UserDetail from '../modules/userManagement/pages/Detail.jsx';
import StreakList from '../modules/streak/index.jsx';
import PostEarnList from '../modules/postEarn/index.jsx';
import Dashboard from "../modules/Dashboard/index.jsx";
import Banner from "../modules/appManagement/banner/index.jsx";
import AddBanner from "../modules/appManagement/banner/add/index.jsx"
import VideoList from '../modules/appManagement/videoList/index.jsx';
import AddVideo from '../modules/appManagement/videoList/add/index.jsx';
import AboutUs from '../modules/appManagement/aboutUs/index.jsx';
import FaqList from '../modules/appManagement/FAQ/index.jsx';

import UserForm from '../modules/userManagement/pages/Form.jsx';

import { Contact } from '../modules/appManagement/aboutUs/contact/index.jsx';

// import { Contact } from '../modules/appManagement/contact/index.jsx';


import AddFaq from '../modules/appManagement/FAQ/add/index.jsx';
import UserScan from '../modules/reports/index.jsx';
import NotFoundPage from '../404notFound/notFound.jsx';
import CustomerNetwork from '../modules/network/customers/index.jsx';
import CustomerDetail from '../modules/network/customers/pages/Detail.jsx';
import PublicRoute from './PublicRoutes.jsx';


const AppRoutes = () => {
    // return <Routes>
    //     {/* PUBLIC ROUTES */}
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/otpverification" element={<OtpVerification />} />
    //     <Route path="/logout" element={<Logout />} />

    //     {/* PRIVATE ROUTES */}
    //     <Route
    //         path="/"
    //         element={
    //             <ProtectedRoute>
    //                 <Layout />
    //                 <Dashboard />
    //             </ProtectedRoute>
    //         }
    //     >

     return   <Routes>
      {/* PUBLIC ROUTES - blocked for already-authenticated users */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/otpverification"
        element={
          <PublicRoute>
            <OtpVerification />
          </PublicRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />

  
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout /> 
          </ProtectedRoute>
        }
      >
            <Route path="product" element={<Product />} />
            <Route path="add-product" element={<ProductAdd />} />
            <Route path="edit-product/:id" element={<ProductAdd />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="productEdit" element={<ProductDetail />} />
            <Route path="product/createproduct" element={<CreateProduct />} />
            <Route path="category" element={<Category />} />
            <Route path='add-category' element={<AddCategory />} />
            <Route path="giftGallery" element={<GiftGallery />} />
            <Route path="add-gift" element={<GiftGalleryAdd />} />
            <Route path="influencer-user/:id" element={<InfluencerNetworkDetail />} />
            <Route path="influencer/:influencerCategory" element={<InfluencerNetwork />} />
            <Route path="influencer/:influencerCategory/:id" element={<InfluencerNetworkDetail />} />
            <Route path="customer/:customerCategory" element={<CustomerNetwork />} />
            <Route path="customer/:customerCategory/:id" element={<CustomerDetail />} />
            <Route path="QrCode" element={<QrCode />} />
            <Route path="QrCode/:id" element={<QrCodeDetail />} />
            <Route path="add-qrCode" element={<AddQrCode />} />
            <Route path="subcategory" element={<SubCategory />} />
            <Route path="referral-point-master" element={<ReferralPointMaster />} />
            <Route path="influencerAdd" element={<InfluencerForm />} />
            <Route path="influencerEdit" element={<InfluencerForm />} />
            <Route path="role-and-permission" element={<RolesnPermission />} />
            <Route path="point-category" element={<PointCategory />} />
            <Route path="users" element={<ManageUser />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="add-user" element={<UserForm />} />
            <Route path="edit-user/:id" element={<UserForm />} />
            <Route path="streak-list" element={<StreakList />} />
            <Route path="post-earn-list" element={<PostEarnList />} />

            <Route path="reprintCouponCode" element={<ReprintCoupon />} />
            <Route path="bonus-point" element={<BonusPoint />} />
            <Route path="add-bonus-point" element={<BonusPointAdd />} />
            <Route path="spin-win" element={<SpinWinList />} />
            <Route path="add-spin-win" element={<SpinWinAdd />} />
            <Route path="edit-spin-win/:id" element={<SpinWinAdd />} />
            <Route path="leaderboard" element={<LeaderboardList />} />
            <Route path="badges" element={<Badges />} />
            <Route path="add-badge" element={<BadgesAdd />} />
            <Route path="redeem-request/cash" element={<RedeemCash />} />
            <Route path="redeem-request/gift" element={<RedeemGift />} />
            <Route path="ticket" element={<Ticket />} />
            <Route path="video-tutorial" element={<VideoTutorial />} />

            <Route path="pdf" element={<PDF />} />
            <Route path="pdf/add-pdf" element={<AddPDF />} />
            <Route path="add-pdf" element={<AddPDF />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path='banner' element={<Banner />} />
            <Route path='add-banner' element={<AddBanner />} />
            <Route path='video-list' element={<VideoList />} />
            <Route path='add-video' element={<AddVideo />} />
            <Route path='about-us' element={<AboutUs />} />
            <Route path="faq" element={<FaqList />} />
            <Route path="add-faq" element={<AddFaq />} />
            <Route path="edit-faq/:id" element={<AddFaq />} />
            <Route path="contact" element={<Contact />} />

            {/* REPORTS */}
            <Route path="reports/:report" element={<UserScan />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
}
export default AppRoutes;