import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImpactEntry from '../../areas/donor-screens/ImpactEntry';
import Impact from '../../areas/donor-screens/Impact';
import { COLOURS } from '../Colours';

const ImpactStack = createNativeStackNavigator();

const ImpactDonorRoutes = () => {
  return (
    <ImpactStack.Navigator initialRouteName="ImpactEntryScreen">
      <ImpactStack.Screen
        name="ImpactEntryScreen"
        component={ImpactEntry}
              options={{
                  headerTitle: "Unify Social Impact",
          
        }}
      />
      <ImpactStack.Screen
        name="ImpactScreen"
        component={Impact}
              options={{
                  headerTitle: "Social Impact",
          headerTintColor: COLOURS.white,
          headerTitleStyle: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: COLOURS.primaryMain,
          },
          headerBackVisible: false,
          headerShadowVisible: false,
        }}
      />
    </ImpactStack.Navigator>
  );
};
export default ImpactDonorRoutes;
