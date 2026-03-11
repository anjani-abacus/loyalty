import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Divider, Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import useStyles from './style';
import UpsideArrow from '../../../../core/assets/icons/UpsideArrow.svg';
import DownsideArrow from '../../../../core/assets/icons/DownsideArrow.svg';
import EarnedPoint from '../../../../core/assets/icons/EarnedPoint.svg';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import useTheme from '../../../../core/components/Theme/useTheme';
import ArrowLeftDown from '../../../../core/assets/icons/ArrowLeftDown.svg';
import ArrowRightUp from '../../../../core/assets/icons/ArrowRightUp.svg';
export const Card = ({ item, type, openBottomSheet }) => {
    const styles = useStyles();
    const GlobelStyle = useGlobelStyle();
    const activeTheme = useTheme();
    const { t } = useTranslation();
    return <TouchableOpacity onPress={()=>{type == 'Scan History' ? openBottomSheet() : null;}} style={[styles.container, {backgroundColor:activeTheme.section}]}>
        {
            type == 'Ledger' ?
                (item.credit > 0 ?
                    <View style={[styles.arrowIcon, styles.upsideIcon]}>
                        <ArrowLeftDown width={24} height={24} fill="#53AB58" />
                    </View>
                    :
                    <View style={[styles.arrowIcon, styles.downsideIcon]}>
                        <ArrowRightUp width={42} height={42} fill="#FF2524" />
                    </View>) :
                type == 'Scan History' ?
                    <View style={[styles.arrowIcon, styles.upsideIcon]}>
                        <EarnedPoint fill="#4caf50" width={34} height={34} />
                    </View>
                    : null
        }
        <View style={styles.content}>
            {type == 'Ledger' && <Text style={styles.text} numberOfLines={2}>
                {item.transaction_remark || '--'}
            </Text>}
            {
            type == 'Scan History' &&
            <>
            <Text style={[styles.text, { textTransform: 'uppercase' }]} numberOfLines={2}>
                Coupon: {item?.coupon_code}
            </Text>
            <Text style={[styles.text, { marginTop:5 }]} numberOfLines={2}>
                Product Name: {item?.product_detail}
            </Text>
            </>
            }
            <Text style={styles.date} duration={1000} animation={'slideInRight'}>
                {moment((type == 'Ledger' ? item?.date_created : item?.scanned_date)).format('DD MMM YYYY hh:mm a')}
            </Text>
        </View>
        {type == 'Ledger' && <View style={[GlobelStyle.alignItemsEnd]}>
            {
                item.credit > 0 ? <Text style={styles.Creditpoints}>+{item.credit} {t('Pt')}</Text> :
                    <Text style={styles.DebitPoints}>-{item.debit} {t('Pt')}</Text>
            }
            <Text style={styles.date}>{t('Balance')}: {item.balance} {t('Pt')}</Text>
        </View>}
        {type == 'Scan History' && <View style={[GlobelStyle.alignItemsEnd]}>
            {
                <Text style={styles.Creditpoints}>+{item.total_point} {t('Pt')}</Text>
            }
        </View>}
    </TouchableOpacity>;
};
