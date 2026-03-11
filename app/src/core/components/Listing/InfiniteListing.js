import React from 'react';
import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import AppNoDataFound from '../No_Data_Found/AppNoDataFound';

const InfiniteListing = ({
  // Data and loading states
  data,
  isRefreshing,
  endReached,

  // Styling
  containerStyle,
  contentContainerStyle,

  // Callbacks
  onRefresh,
  onLoadMore,
  renderItem,

  // Optional props
  ListHeaderComponent,
  ListEmptyComponent,
  keyExtractor,
}) => {
  let onEndReachedCalledDuringMomentum = true;

  const defaultEmptyComponent = (
    <View style={{marginTop: 200}}>
      <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      <AppNoDataFound />
    </View>
  );

  return (
    <View style={[{flex: 1}, containerStyle]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor || (item => item.id?.toString())}
        // Infinite scroll handling
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !endReached) {
            onLoadMore();
            onEndReachedCalledDuringMomentum = true;
          }
        }}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        // Loading indicators
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={() =>
          !isRefreshing && !endReached && <ActivityIndicator />
        }
        // Empty state
        ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
        // Optional components
        ListHeaderComponent={ListHeaderComponent}
        // Styling
        contentContainerStyle={[{paddingBottom: 60}, contentContainerStyle]}
      />
    </View>
  );
};

export default InfiniteListing;

/* Usage
      <InfiniteListing
        data={productList}
        isRefreshing={isRefreshing}
        endReached={endReached}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        renderItem={({item}) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', item)}
          />
        )}
        ListHeaderComponent={
          <AppSearchBar
            term={searchValue}
            onChangeTerm={onSearch}
            onCancel={() => onSearch('')}
            onClear={() => onSearch('')}
            style={searchBarStyle}
            placeHolder="Search here..."
          />
        }
      />
*/
