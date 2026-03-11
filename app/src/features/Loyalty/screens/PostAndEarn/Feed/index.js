import React, { useEffect, useState } from 'react';
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
import { useFeedList, useLikePost } from '../../../../../api/hooks/useMasters';
import moment from 'moment';
import { StatusBarHeader } from '../../../../../core/components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../../../../core/assets/SVGs/svg';


const RenderHeader = ({ navigation }) => (
  <View style={{ backgroundColor: '#004CAC' }}>
    {/* <StatusBarHeader height={StatusBar.currentHeight} /> */}
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#CE90FF', '#3600C0']}
      style={{
        backgroundColor: '#3a459c',
        paddingHorizontal: 10,
        paddingBottom: 10,
      }}
    >
      <StatusBarHeader height={StatusBar.currentHeight} />
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LeftArrowIcon />
            </TouchableOpacity>
            <Text style={{
              flex: 0.8,
              textAlign: 'center',
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
            }}>Tutorials</Text>
            <TouchableOpacity onPress={() => navigation.navigate("FAQ")}>
              <HelpIcon
                icon={'arrow-left'}
                style={{ marginRight: 10 }}
                width={30}
                height={30}
                fill="#fff"
                stroke='#fff'
                strokeWidth={0.1}
              />
            </TouchableOpacity>
          </View> */}

      <View style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={styles.headerTitle}>
            Feed
          </Text>
          <Text style={styles.subtitleText}>
            Discover, What other influencers are making?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FeedProfile');
          }}
          style={{
            padding: 4,
            borderWidth: 1.5,
            borderColor: '#fff',
            borderStyle: 'dashed',
            borderRadius: 40,
          }}>
          <UserProfileImage enablePreview={false} style={{ width: 40, height: 40, borderRadius: 40 }} />
        </TouchableOpacity>
      </View>
    </LinearGradient>



  </View>
);

export const FeedList = () => {
  const { data: feedList } = useFeedList();
  const { mutate, isPending: uploading, isSuccess, isError, error } = useLikePost();


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
        <View style={styles.authorSection}>
          {/* <View style={styles.authorAvatar}>
            <Text style={styles.avatarText}>{item.user_name?.charAt(0)}</Text>
          </View> */}
          <View style={styles.authorInfo}>
            {/* <Text style={styles.authorName}>{item.user_name}</Text> */}
            <Text style={styles.timeAgo}>{moment(item.post_createdon).format('DD MMM, YYYY')}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.likeButton, item.isLiked && styles.likeButtonActive]}
            onPress={() => handleLike(item.id)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.likeIcon,
              { color: item.isLiked ? '#FFFFFF' : '#FF6B6B' },
            ]}>
              ♥
              Like
            </Text>
            <Text style={[
              styles.likeCount,
              { color: item.isLiked ? '#FFFFFF' : '#FF6B6B' },
            ]}>
              {item.total_likecount}
            </Text>
          </TouchableOpacity>

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
        images={feedList?.data?.data?.map(post => ({ uri: post.img }))}
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
