import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicIcon } from '../../../core/assets/icons';
import BumpShape, { BellIcon, ScanIcon, ScanQrIcon } from '../../../core/assets/SVGs/svg';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const TabBarLayout = (props) => {
    const { state, descriptors, navigation } = props;
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#ddb8f6ff', '#FFFFFF']}
            style={{
                backgroundColor: 'transparent', // keep transparent so gradient is visible
                elevation: 0, // remove default Android shadow if you want smooth gradient
                borderTopWidth: 0, // remove solid top border
                position: 'absolute',
                bottom: 0,
                width: '100%',
                flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20,
                elevation: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -6 },
                shadowOpacity: 1,
                shadowRadius: 10,
            }}
        >
            <View style={[styles.container, {
                paddingBottom: insets.bottom,
            }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const icon = () => options.tabBarIcon?.(isFocused) || (() => { });


                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={styles.tab}
                        >
                            {(label == 'Scan and Win' || label == 'स्कैन करें और जीतें') ?
                                <View>
                                    <View style={{ position: 'absolute', zIndex: -1, top: -65, right: -48 }}>
                                        <BumpShape />
                                    </View>
                                    <Animatable.View
                                        animation={{
                                            0: { scale: 0, opacity: 1 },
                                            1: { scale: 1, opacity: 0 }, // expand & fade out
                                        }}
                                        iterationCount="infinite"
                                        duration={2000}
                                        easing="ease-out"
                                        style={{
                                            position: 'absolute',
                                            width: 100,
                                            bottom: -20,
                                            left: -20,
                                            height: 100,
                                            borderRadius: 100,
                                            backgroundColor: '#3600C0',
                                            zIndex: -1, // 👈 put behind the button
                                        }}
                                    />

                                    {/* Main button with gradient */}
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={['#3600C0', '#CE90FF']}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 30,
                                            height: 60,
                                            width: 60,
                                            marginTop: -33,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 4,
                                            elevation: 6,
                                        }}
                                    >
                                        <ScanQrIcon width={30} height={30} fill="#fff" />
                                    </LinearGradient>
                                </View> :
                                label == 'Notifications' ? <BellIcon isNewNotification={true} width={26} height={26} fill={isFocused ? '#003EEE' : '#888'} stroke={isFocused ? '#003EEE' : '#888'} /> :
                                    <View>
                                        {icon({ focused: isFocused })}
                                    </View>}

                            {<Text style={[styles.label, isFocused && styles.activeLabel]}>
                                {label}
                            </Text>}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </LinearGradient>

    );
};

export default TabBarLayout;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopColor: '#ddd',
        paddingTop: 8,
        justifyContent: 'space-around',
    },
    tab: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#8e8e93',
        marginTop: 4,
        textAlign:'center',
    },
    activeLabel: {
        color: '#007AFF',
        fontWeight: '600',
    },
});
