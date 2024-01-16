import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { userTypes } from '../../types';
import { store } from '../../redux/store';

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

export const searchUser = async (text: string, lastItemId?: string): Promise<userTypes.SearchUserResultType[]> => {
    try {
        const { user } = store.getState();
        const defaultQuery = userCollection
                                    .where('firstName', '>=', text.toLowerCase())
                                    .where('firstName', '<=', text.toLowerCase() + '\uf8ff')
                                    .where('firstName', '!=', user.firstName)
                                    .orderBy('firstName', 'asc')
                                    .limit(15);

        let query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData> | undefined = undefined;
        if(lastItemId) {
            console.log("last item id :",lastItemId);
            const lastItemDoc = await userCollection.doc(lastItemId).get();
            console.log("last item data ",lastItemDoc.data())
            query = await defaultQuery.startAfter(lastItemDoc).get();
        } else {
            console.log("last item yok")
            query = await defaultQuery.get();
        }

        const result = query.docs.map(doc => ({
            ...doc.data() as userTypes.SearchUserResultType
        }));
        
        return result;
    } catch (error: any) {
        console.log("error : ",error);
        if(error.code){
            throw error.code;
        }
        throw (error);
    }
}