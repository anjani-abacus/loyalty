import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import { useFeed } from '../../../../../api/hooks/useFeed';
import { UserProfileImage } from '../../../../../core/screens/MyProfile/UserProfile';
import { styles } from './styles';
import Settings from '../../../../../core/assets/icons/Settings.svg';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { useMyFeedList, useLikePost } from '../../../../../api/hooks/useMasters';
import { StatusBarHeader } from '../../../../../core/components/StatusBar/StatusBar';

const RenderHeader = ({ navigation }) => (
    <View style={{
        backgroundColor: '#004CAC',
        padding: 20,
        alignItems: 'center',
    }}>
        <StatusBarHeader height={StatusBar.currentHeight} />
        {/* <View style={{
            position: 'absolute',
            top:50,
            right:20
        }}>
            <Settings width={18} height={18} fill={'#eee'} />
        </View> */}
        <View
            style={{
                padding: 4,
                borderWidth: 1.5,
                borderColor: '#fff',
                borderStyle: 'dashed',
                borderRadius: 80,
            }}>
            <UserProfileImage enablePreview={false} style={{ width: 80, height: 80, borderRadius: 40 }} />
        </View>
        <View>
            <Text style={styles.headerTitle}>
                Pankaj Sharma
            </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.subtitleText}>
                        20
                    </Text>
                    <Text style={styles.subTitle}>Posts</Text>
                </View>
                <View style={{ flex: 1, borderLeftWidth: 1, borderColor: '#aaa', borderRightWidth: 1, alignItems: 'center' }}>
                    <Text style={styles.subtitleText}>
                        30
                    </Text>
                    <Text style={styles.subTitle}>
                        Points
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.subtitleText}>
                        30
                    </Text>
                    <Text style={styles.subTitle}>
                        Streak
                    </Text>
                </View>
            </View>
        </View>

    </View>
);

export const FeedList = () => {
    const { data: feedList } = useMyFeedList();
    const { mutate, isPending: uploading, isSuccess, isError, error } = useLikePost();
    // const [posts, setPosts] = useState([
    //     {
    //         id: 1,
    //         image: 'https://picsum.photos/400/600?random=1',
    //         description: 'Beautiful sunset view from the mountains! Perfect evening for a hike. 🌅',
    //         likes: 124,
    //         isLiked: false,
    //         author: 'Adventure Lover',
    //         timeAgo: '2h ago'
    //     },
    //     {
    //         id: 2,
    //         image: 'https://picsum.photos/400/600?random=2',
    //         description: 'Delicious homemade pizza night with friends and family! 🍕✨',
    //         likes: 89,
    //         isLiked: true,
    //         author: 'Food Explorer',
    //         timeAgo: '4h ago'
    //     },
    //     {
    //         id: 3,
    //         image: 'https://picsum.photos/400/600?random=3',
    //         description: 'Morning coffee and fresh air. Starting the day right! ☕️🌸',
    //         likes: 156,
    //         isLiked: false,
    //         author: 'Coffee Enthusiast',
    //         timeAgo: '6h ago'
    //     },
    //     {
    //         id: 4,
    //         image: 'https://picsum.photos/400/600?random=4',
    //         description: 'Weekend adventure at the beach. Sun, sand, and good vibes! 🏖️🌊',
    //         likes: 203,
    //         isLiked: false,
    //         author: 'Beach Wanderer',
    //         timeAgo: '8h ago'
    //     },
    //     {
    //         id: 5,
    //         image: 'https://picsum.photos/400/600?random=5',
    //         description: 'City lights and night vibes. Love this urban energy! 🌃✨',
    //         likes: 91,
    //         isLiked: true,
    //         author: 'City Explorer',
    //         timeAgo: '12h ago'
    //     },
    //     {
    //         id: 6,
    //         image: 'https://picsum.photos/400/600?random=6',
    //         description: 'Fresh flowers from the garden. Nature at its finest! 🌺🌿',
    //         likes: 67,
    //         isLiked: false,
    //         author: 'Garden Lover',
    //         timeAgo: '1d ago'
    //     }
    // ]);

    const [imageViewVisible, setImageViewVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = (postId) => {
    // setPosts(prevPosts =>
    //   prevPosts.map(post =>
    //     post.id === postId
    //       ? {
    //         ...post,
    //         isLiked: !post.isLiked,
    //         likes: post.isLiked ? post.likes - 1 : post.likes + 1
    //       }
    //       : post
    //   )
    // );
  };

  const openImageViewer = (index) => {
    console.log('Opening image viewer for index:', index);
    console.log('Current feelist:', feedList?.data?.data?.length);
    setCurrentImageIndex(index);
    setImageViewVisible(true);
  };

    const renderPost = ({ item, index }) => (
        <View style={styles.postContainer}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    console.log('Image pressed, index:', index);
                    openImageViewer(index);
                }}
                style={styles.imageContainer}
            >
                <FastImage
                    source={{ uri: item.img }}
                    style={styles.postImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                    style={styles.imageOverlay}
                />
            </TouchableOpacity>

            <View style={styles.postContent}>
                {/* <View style={styles.authorSection}>
                    <View style={styles.authorAvatar}>
                        <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
                    </View>
                    <View style={styles.authorInfo}>
                        <Text style={styles.authorName}>{item.author}</Text>
                        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
                    </View>
                </View> */}

                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.actionRow}>
                    {/* <TouchableOpacity
                        style={[styles.likeButton, item.isLiked && styles.likeButtonActive]}
                        onPress={() => handleLike(item.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.likeIcon,
                            { color: item.isLiked ? '#FFFFFF' : '#FF6B6B' }
                        ]}>
                            ♥
                            Like
                        </Text>
                        <Text style={[
                            styles.likeCount,
                            { color: item.isLiked ? '#FFFFFF' : '#FF6B6B' }
                        ]}>
                            {item.total_likecount}
                        </Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareIcon}>↗</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );



    return (
        <View style={styles.container}>
            <FlatList
                data={feedList?.data?.data}
                renderItem={renderPost}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                // numColumns={2}
                // columnWrapperStyle={styles.row}
            />

            <ImageView
                images={feedList?.data?.data.map(post => ({ uri: post.img }))}
                imageIndex={currentImageIndex}
                visible={imageViewVisible}
                onRequestClose={() => {
                    console.log('Closing image viewer');
                    setImageViewVisible(false);
                }}
                animationType="slide"
            />
        </View>
    );
};

const Feed = ({ navigation }) => {
    return <>
        <RenderHeader navigation={navigation} />
        <FeedList navigation={navigation} />
    </>;
};


export default Feed;
