import { FlatList, Text, View } from "react-native";

import ListSaved from "~/src/assets/svg/images/list_saved.svg";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import { ListEmptyComponent } from "~/src/shared/components/FlatList/ListEmptyComponent";
import useUserDetails from "~/src/shared/store/useUserDetails";

export default function SavedScreen() {
  const {
    state: { vacantionSaved },
  } = useUserDetails();

  return (
    <View className="flex flex-1 bg-background px-4 dark:bg-background-dark">
      <Text className="font-inter-bold text-3xl text-fontDefault dark:text-fontDefault-dark">
        Oportunidades salvas
      </Text>

      <FlatList
        data={vacantionSaved}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CardVacantion item={item} showIconToSave />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparatorComponent />}
        ListEmptyComponent={() => (
          <View className="pt-32">
            <ListEmptyComponent
              text="Comece a salvar as vagas que se encaixam no seu perfil"
              Image={() => <ListSaved width={200} height={200} />}
              customClass="px-8"
            />
          </View>
        )}
      />
    </View>
  );
}
