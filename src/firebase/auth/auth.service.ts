import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CompleteProfileType, LoginType, RegisterType } from './auth.type';
import firestore from '@react-native-firebase/firestore';
import { errors } from '../../constans';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { collectionTypes } from '../../types';

const userCollection = firestore().collection('users');
const usernameCollection = firestore().collection('usernames');

export const registerEmailAndPassword = async (body: RegisterType): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
        const isUnique = await isUniqueUsername(body.username);
        if(!isUnique) {
            throw errors.auth['username-already-in-use'];
        }
        const createdUser = await auth().createUserWithEmailAndPassword(body.email, body.password);
        await userCollection
                .doc(createdUser.user.uid)
                .set({
                    id: createdUser.user.uid,
                    email: createdUser.user.email,
                    username: body.username,
                    photoURL: null,
                    phoneNumber: body.phoneNumber,
                    firstName: null,
                    lastName: null,
                    withGoogle: false,
                });
        createUsernameInfo(body.username, body.email, body.phoneNumber);
        return createdUser;
    } catch (error: any) {
        if(error.code){
            throw error.code;
        }
        throw (error);
    }
}

export const googleSignIn = async (): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential use firebase
        const res = await auth().signInWithCredential(googleCredential);
        if(res.additionalUserInfo?.isNewUser) {
            await userCollection.doc(res.user.uid).set({
                id: res.user.uid,
                email: res.user.email,
                username: null,
                password: null,
                photoURL: res.user.photoURL,
                phoneNumber: res.user.phoneNumber,
                firstName: res.additionalUserInfo.profile?.given_name || null,
                lastName: res.additionalUserInfo.profile?.family_name || null,
                withGoogle: true,
            });
        } else {
            // eğer kullanıcının withGoogle değeri false ise true ya çekilsin.
            // email ile kayıt olan kullanıcı sonradan google ile girerse birdaha email ile giremiyor.
            // ve normallogin denediğinde withGoogle true ise maile kod gönder kodla giriş yapma ekranına yönlendir.
            await userCollection.doc(res.user.uid).update({
                withGoogle: true,
            });
        }
        return res;
    } catch (error: any) {
        if(error.code === statusCodes.SIGN_IN_CANCELLED) {
            throw errors.auth['google-signin-canceled']
        } else if(error.code === statusCodes.IN_PROGRESS) {
            throw errors.auth['google-in-progress']
        } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
            throw errors.auth['google-play-service']
        } else {
            throw error;
        }
        
    }
}

export const normalSignIn = async (body: LoginType) => {
    try {
        let email = body.username;
        console.log("emailk : ",email);
        if(!body.username.includes('@')) {
            const user = await getUserAuthInfoByUsername(body.username);
            email = user.email;
        }
        console.log("sonra email : ",email);
        const result = await auth().signInWithEmailAndPassword(email, body.password);
        return result;
    } catch (error: any) {
        if(error.code){
            throw error.code;
        }
        throw (error);
    }
}

export const logout = async () => {
    await auth().signOut();
    await GoogleSignin.signOut();
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
        const usernameDoc = await usernameCollection.doc(username).get();
        console.log("doc : ",usernameDoc);
        return !usernameDoc.exists;
    } catch (error) {
        console.log("error : ",error);
        throw error;
    }
}

export const completeProfile = async (body: CompleteProfileType) => {
    try {
        if(body.withGoogle) {
            const isUnique = await isUniqueUsername(body.username);
            if(!isUnique) {
                throw errors.auth['username-already-in-use'];
            }
            await createUsernameInfo(body.username,body.email || '',body.phoneNumber);
        }
        await userCollection.doc(body.id).update({
            ...body,
        });
    } catch (error: any) {
        if(error.code){
            throw error.code;
        }
        throw (error);
    }
}

export const getCurrentUser = async (): Promise<collectionTypes.UserCollection> => {
    const user = auth().currentUser;
    if(!user) throw 'user-not-avaliable';

    const info = await userCollection.doc(user.uid).get();
    return info.data() as collectionTypes.UserCollection;
}

const getUserAuthInfoByUsername = async (username: string): Promise<collectionTypes.UsernameCollection> => {
    try {
        const usernameDoc = await usernameCollection.doc(username).get();
        if(!usernameDoc.exists) {
            throw 'username-notfound'
        }
        console.log("username docs : ",usernameDoc);
        return usernameDoc.data() as collectionTypes.UsernameCollection;
    } catch (error) {
        console.log("error : ",error);
        throw error;
    }
}

const createUsernameInfo = async (username: string, email: string, phoneNumber: string | null) => {
    try {
        await usernameCollection.doc(username).set({
            username,
            email,
            phoneNumber,
        })
    } catch (error) {
        throw error;
    }
}

