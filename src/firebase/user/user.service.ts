import firestore from '@react-native-firebase/firestore';

const userCollection = firestore().collection('users');

export const updateProfilePicture = async (id: string, photoURL: string | null) => {
    try {
        await userCollection.doc(id).update({
            photoURL
        });
    } catch (error: any) {
        if(error.code){
            throw error.code;
        }
        throw (error);
    }
}