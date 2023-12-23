import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../navigations/navigation.type"

export const useAppNavigaton = () => {
    return useNavigation<NavigationProp<RootStackParamList>>();
}