import arrow_right from './arrow_right.svg';
import arrow_right_blue from './arrow_right_blue.svg';

import gift from './gift.svg';
import password from './password.svg';
import redeem from './redeem.svg';
import scan from './scan.svg';
import scanWhite from './scanWhite.svg';
import share from './share.svg';
import social from './social.svg';
import spin_wheel from './spin_wheel.svg';

import track_request from './track_request.svg';
import tutorials from './tutorials.svg';
import SupportWhite from './SupportWhite.svg';
import Document from './document.svg';
import Faq from './Faq.svg';
import Badge from './Badge.svg';

import products from './products.svg';
import dashboard from './dashboard.svg';
import info from './Info.svg';
import event from './event.svg';
import followup from './followup.svg';
import expense from './expense.svg';
import holidays from './holidays.svg';
import checkin from './checkin.svg';
import attendance from './attendance.svg';
import announcement from './announcement.svg';
import order from './order.svg';
import leave from './leave.svg';
import pdf from './pdf.svg';
import survey from './survey.svg';
import task from './task.svg';
import travel from './travel.svg';
import target from './target.svg';
import enquiry from './enquiry.svg';

import useTheme from '../../components/Theme/useTheme';

import home from './tabs/home.svg';
import activeHome from './tabs/activeHome.svg';
import spin from './tabs/spin.svg';
import activeSpin from './tabs/activeSpin.svg';
import notification from './tabs/notification.svg';
import activeNotification from './tabs/activeNotification.svg';
import history from './tabs/history.svg';
import activeHistory from './tabs/activeHistory.svg';

import postEarn from './tiles/postEarn.svg';
import badge from './tiles/badge.svg';
import faq from './tiles/faq.svg';
import document from './tiles/document.svg';
import contact from './tiles/contact.svg';
import about from './tiles/about.svg';
import videos from './tiles/videos.svg';
import product from './tiles/product.svg';
import support from './tiles/Support.svg';
import query from './tiles/Query.svg';

export const icons = {

  'arrow_right': arrow_right,
  'arrow_right_blue': arrow_right_blue,

  'postEarn': postEarn,
  'badge': badge,
  'faq': faq,
  'document': document,
  'contact': contact,
  'about': about,
  'videos': videos,
  'product': product,

  'gift': gift,
  'info': info,
  'password': password,
  'redeem': redeem,
  'scan': scan,
  'scanWhite': scanWhite,
  'share': share,
  'social': social,
  'spin_wheel': spin_wheel,
  'support': support,
  'query':query,
  'track_request': track_request,
  'tutorials': tutorials,
  'SupportWhite': SupportWhite,
  'Document':Document,
  'Faq':Faq,
  'Badge':Badge,
  'dashboard':dashboard,
  'order':order,
  'products':products,
  'expense':expense,
  'event':event,
  'announcement':announcement,
  'followup':followup,
  'holidays':holidays,
  'checkin':checkin,
  'attendance':attendance,
  'leave':leave,
  'task':task,
  'survey':survey,
  'pdf':pdf,
  'travel':travel,
  'target':target,
  'enquiry':enquiry,

  'home':home,
  'activeHome':activeHome,
  'spin':spin,
  'activeSpin':activeSpin,
  'notification':notification,
  'activeNotification':activeNotification,
  'history': history,
  'activeHistory':activeHistory,
};

export const DynamicIcon = ({iconName, fill, width, height}) => {
    const activeTheme = useTheme();
    const IconComponent = icons[(iconName || 'Document')];
    return <IconComponent fill={fill || activeTheme.text} width={width || 18} height={height || 18} />;
};
