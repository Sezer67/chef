import auth from '@react-native-firebase/auth';
import { RegisterType } from './auth.type';
import firestore from '@react-native-firebase/firestore';

const userCollection = firestore().collection('users');

export const registerEmailAndPassword = async (body: RegisterType) => {
    try {
        await isUniqueUsername(body.username);
        console.log("alt satıra geçti"); // hatalı olsa da geliyor buraya
        const result = await auth().createUserWithEmailAndPassword(body.email, body.password);
        await userCollection
                .doc(result.user.uid)
                .set({
                    id: result.user.uid,
                    email: result.user.email,
                    username: body.username,
                    photoURL: null,
                    phoneNumber: null,
                    firstName: body.firstName,
                    lastName: body.lastName,
                })
    } catch (error: any) {
        console.log("register func erro : ",error);
        if(error.code === 'auth/email-already-in-use'){
            throw new Error('Email zaten kullanılıyor.')
        }
    }
}

export const getUsername = async () => {
    try {
        const docs = await userCollection.where('username', '==', 'asd').get();
        console.log("docs : ",docs.docs);
        console.log("asd",docs.empty)
    } catch (error) {
        console.log("hata : ",error);
    }
}

export const isUniqueUsername = async (username: string) => {
    try {
        const usernameDoc = await userCollection.where("username", "==", username).get();
        console.log("username doc : ",usernameDoc.docs)
        return usernameDoc.empty;
    } catch (error) {
        console.log("eis unique error  :",error);
        throw new Error('auth/username-already-in-use');
    }
}