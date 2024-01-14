import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { scale } from 'react-native-size-matters';
import CustomText from '../UI/CustomText';
import { Colors } from '../../constans';

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
    
    const debounceSearch = debounce((text: string) => {
        console.log("debounce : ",text);
    }, 1000);

    useEffect(() => {
        if(searchText.length > 3){
            debounceSearch(searchText);
        }
    },[searchText])

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
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
        {/* todo: Son aramalar storage den listelenecek click yaptığı kullanıcılar yalnızca */}
      </View>
    </ScrollView>
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