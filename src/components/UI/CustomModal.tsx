import { useDispatch, useSelector } from "react-redux";
import { RootReduxType } from "../../types/reducer.type";
import { appActions } from "../../redux/app.reducer";
import { modalTypes } from "../../types";
import ReactNativeModal from "react-native-modal";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constans";
import MessageModal from "../modals/MessageModal";
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CustomModal = () => {
	const appState = useSelector((state: RootReduxType) => state.app);
	const dispatch = useDispatch();

    console.log("app : ",appState);


	const backdropPress = () => {
		dispatch(appActions.hideModal());
	};

	const renderActiveModal = () => {
		switch (appState.activeModal) {
			case modalTypes.Variables.Message:
				return <MessageModal message={appState.data.message} status={appState.data.status} />;
			default:
				return <></>;
		}
	};
	return (
		<ReactNativeModal
			key="modal"
			isVisible={appState.modalVisible}
			animationIn="bounceIn"
			deviceHeight={height}
			deviceWidth={width}
			animationInTiming={500}
			animationOut="bounceOut"
			animationOutTiming={300}
			hasBackdrop
			backdropColor={Colors.dark}
			backdropOpacity={0.7}
			onBackdropPress={backdropPress}>
			<View>
                <View style={{ width: '100%', alignItems: 'flex-end', marginBottom: 8 }}>
                    <TouchableOpacity onPress={backdropPress}>
                        <AntDesign name="closecircleo" size={18} color={'#d0d0d0'} />
                    </TouchableOpacity>
                </View>
                {renderActiveModal()}
            </View>
		</ReactNativeModal>
	);
};

export default CustomModal;