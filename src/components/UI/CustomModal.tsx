import { useDispatch, useSelector } from "react-redux";
import { RootReduxType } from "../../types/reducer.type";
import { appActions } from "../../redux/app.reducer";
import { modalTypes } from "../../types";
import ReactNativeModal from "react-native-modal";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constans";
import MessageModal from "../modals/MessageModal";
import { AntDesign } from '@expo/vector-icons';
import SelectPhotoModal from "../modals/SelectPhotoModal";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get('window');

const CustomModal = () => {
	const [isBottomSheet, setIsBottomSheet] = useState<boolean>(false);
	const appState = useSelector((state: RootReduxType) => state.app);

	const dispatch = useDispatch();

    console.log("app : ",appState);
	useEffect(() => {
		if(appState.activeModal === modalTypes.Variables.SelectPhoto){
			setIsBottomSheet(true);
		} else {
			setIsBottomSheet(false);
		}
	},[appState.activeModal]);

	const backdropPress = () => {
		dispatch(appActions.hideModal());
	};

	const renderActiveModal = () => {
		switch (appState.activeModal) {
			case modalTypes.Variables.Message:
				return <MessageModal message={appState.data.message} status={appState.data.status} />;
			case modalTypes.Variables.SelectPhoto:
				return <SelectPhotoModal headerText={appState.data.headerText} isRemovableButton={appState.data.isRemovableButton} removeAction={appState.data.removeAction}  />
			default:
				return <></>;
		}
	};
	return (
		<ReactNativeModal
			key="modal"
			isVisible={appState.modalVisible}
			style={isBottomSheet ? {margin: 0 ,padding: 0} : {}}
			animationIn={'slideInUp'}
			animationOut={'slideOutDown'}
			deviceHeight={height}
			deviceWidth={width}
			animationInTiming={500}
			animationOutTiming={500}
			hasBackdrop
			backdropColor={Colors.dark}
			backdropOpacity={0.7}
			onBackdropPress={backdropPress}>
			{
				!isBottomSheet ? (
					<View>
						<View style={{ width: '100%', alignItems: 'flex-end', marginBottom: 8 }}>
							<TouchableOpacity onPress={backdropPress}>
								<AntDesign name="closecircleo" size={18} color={'#d0d0d0'} />
							</TouchableOpacity>
						</View>
						{renderActiveModal()}
					</View>
				) : renderActiveModal()
			}
		</ReactNativeModal>
	);
};

export default CustomModal;