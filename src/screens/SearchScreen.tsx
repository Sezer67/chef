import { Animated, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomInput from '../components/UI/CustomInput'
import { scale } from 'react-native-size-matters'
import useAppTheme from '../hooks/useAppTheme';
import SearchResult from '../components/Search/SearchResult';
import CustomText from '../components/UI/CustomText';
import { language } from '../languages';

const SearchScreen = () => {

    const { themeColors } = useAppTheme();
    const [searchText, setSearchText] = useState<string>('');
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const searchInputRef = useRef<TextInput>(null);
    const inputContainerWidth = useRef(new Animated.Value(1)).current;

    const handleCancelSearch = () => {
        setInputFocused(false);
        setSearchText('');
        searchInputRef.current?.blur();
        inputContainerWidth.setValue(0.75);
        Animated.timing(inputContainerWidth, {
            toValue: 1,
            duration: 500, // Animasyon süresi (milisaniye cinsinden)
            useNativeDriver: false,
        }).start();
    }
    const handleFocus = () => {
        setInputFocused(true);

        // Focus olduğunda animasyon ile input boyutunu büyüt
        Animated.timing(inputContainerWidth, {
            toValue: 4.5,
            duration: 500, // Animasyon süresi (milisaniye cinsinden)
            useNativeDriver: false,
        }).start();
    };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Animated.View style={{ flex: inputContainerWidth }}>
            <CustomInput
                inputRef={searchInputRef}
                placeholder='Ara'
                rightIcon='search'
                value={searchText}
                onChangeText={(val) => setSearchText(val)}
                onFocus={handleFocus}
                onBlur={handleCancelSearch}
            />
        </Animated.View>
        {
            inputFocused && (
                <TouchableOpacity onPress={handleCancelSearch} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CustomText  text={language('cancel')} variant='button' />
                </TouchableOpacity>
            )
        }
      </View>
      {
        inputFocused && (
            <View>
                <SearchResult searchText={searchText} />
            </View>
        )
      }
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: scale(16),
        flexDirection: 'row',
        alignItems: 'center',
    },
})