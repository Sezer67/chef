import storage from '@react-native-firebase/storage';
export const uploadImage = () => {

}

export const getImage = async (ref: string) => {
    return await storage().ref(ref).getDownloadURL();
}