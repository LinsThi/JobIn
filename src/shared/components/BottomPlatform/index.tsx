import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { Button } from "~/src/shared/components/Button";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { PLATFORMS } from "~/src/shared/utils/platforms";

export function BottomPlatform() {
  const {
    actions: { handleFollowPlatform, handleUnfollowPlatform, verifyIfPlatformIsFollowed },
  } = useUserDetails();
  const {
    state: { isOpened },
    actions: { handleCloseBottomPlatform },
  } = useBottomPlatform();

  return (
    <Modal animationType="slide" transparent visible={isOpened}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="flex w-4/5 rounded-lg bg-white">
          {Object.entries(PLATFORMS).map(([_, currentPlatform]) => {
            const isFollowed = verifyIfPlatformIsFollowed(currentPlatform);
            const functionToCall = isFollowed ? handleUnfollowPlatform : handleFollowPlatform;

            return (
              <TouchableOpacity
                key={currentPlatform.name}
                onPress={() => functionToCall(currentPlatform)}
                className={`flex flex-row items-center p-4 ${isFollowed ? "bg-slate-300" : "bg-gray-200"}`}>
                <Image
                  className="h-12 w-12 rounded-full"
                  source={{ uri: currentPlatform.shortLogo }}
                />
                <Text className="rounded-tl font-roboto-bold text-xl">{currentPlatform.name}</Text>
              </TouchableOpacity>
            );
          })}

          <Button
            title="Confirmar"
            onPress={handleCloseBottomPlatform}
            customClassName="py-[1rem] rounded-t-none"
          />
        </View>
      </View>
    </Modal>
  );
}
