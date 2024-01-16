import AsyncStorage from "@react-native-async-storage/async-storage"

type Keys = '@SearchItemList' | '@Bakacaz'

const moveToFirst = (array: any[], item: any, key: string): any[] | -1 => {
    const index = array.findIndex((v) => v[key] === item[key]);
    if(index !== -1) {
        array.splice(index, 1);
        array.unshift(item);
        return array;
    }
    return -1;
}

export const addItemFromList = async (key: Keys, value: string) => {
    // last value alınacak ve id ye kontrol ediliyor.
    const lastList = await AsyncStorage.getItem(key);
    const parsedValue = JSON.parse(value);
    let newValue: any[] = [];

    if(lastList) {
        console.log("lsat list var");
        newValue = JSON.parse(lastList);
        console.log("last list değeri : ",newValue);
        let res = moveToFirst(newValue, parsedValue, 'id');
        if(res === -1) {
            newValue.push(parsedValue);
        } else {
            newValue = res;
        }
        console.log("taşıma işleminden sonra last list değeri")
    } else {
        newValue.push(parsedValue);
    }
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
}

export const removeItemFromList = async (key: Keys, value: string, uniqueKey: string) => {
    let item = await getItem(key);
    
    if(!item) return;
    const list = JSON.parse(item);
    const index = list.findIndex((v: any) => v[uniqueKey] === value);
    
    if(index === -1) return;
    list.splice(index, 1);

    await AsyncStorage.setItem(key, JSON.stringify(list));

}

export const getItem = async (key: Keys) => {
    return await AsyncStorage.getItem(key);
}