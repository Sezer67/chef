import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters';
import CustomText from '../UI/CustomText';
import { Colors } from '../../constans';
import { userService } from '../../firebase';
import { userTypes } from '../../types';
import SearchUserCard from './SearchUserCard';
import { cacheUtil } from '../../utils';

type Props = {
    searchText: string;
}
const { width, height } = Dimensions.get('window');

function debounce<T extends any[]>(func: (...args: T) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const SearchResult:FC<Props> = ({searchText}) => {
  
    const [searchResult, setSearchResult] = useState<userTypes.SearchUserResultType[]>([]);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [loadMoreCompleted, setLoadMoreCompleted] = useState<boolean>(false);

    const debounceSearch = debounce( async (text: string) => {
      const res = await userService.searchUser(text);
      setSearchResult(res);
    }, 1000);

    const getCacheSearch = async () => {
      const res = await cacheUtil.getItem('@SearchItemList');
      setSearchResult(JSON.parse(res as any));
    }

    useEffect(() => {
      if(searchText.length > 3){
        debounceSearch(searchText);
      }
      if(searchText.length === 0) {
        getCacheSearch();
      }
    },[searchText])

    const loadMoreItem = async () => {
      if(loadMoreCompleted || searchText.length === 0) return;

      setLoadMore(true);
      const lastItem = searchResult[searchResult.length - 1];
      const results = await userService.searchUser(searchText, lastItem.id);
      if(results.length === 0) {
        setLoadMoreCompleted(true);
      }

      setSearchResult(searchResult.concat(results));
      setLoadMore(false);
    }

    const deleteItem = (id: string) => {
      const newState = searchResult.filter((item) => item.id !== id);
      setSearchResult(newState);
      if(searchText.length === 0) {
        // cahce temizliği
        cacheUtil.removeItemFromList('@SearchItemList', id, 'id');
      }
    }

    const renderFooterLoading = () => {
      if(loadMore) {
        return (<ActivityIndicator size={24} color={'black'} />)
      }
      return null;
    }

  return (
    <View style={styles.container}>
      <View>
        {searchText.length === 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: scale(8) }}>
            <CustomText 
                text='Son Aramalar'
                variant='body'
            />
            <TouchableOpacity>
                <CustomText 
                    text='Tümünü Gör'
                    variant='button'
                    color={Colors.info}
                />
            </TouchableOpacity>
          </View>
        )}
        {/* todo: Son aramalar storage den listelenecek click yaptığı kullanıcılar yalnızca */}
        <FlatList 
          data={searchResult}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <SearchUserCard {...item} deleteItem={deleteItem}  />}
          onEndReachedThreshold={0.25}
          onEndReached={loadMoreItem}
          ListFooterComponent={renderFooterLoading}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: scale(16),
      width: '100%',
      height: height - scale(140) - 75,
    }
})