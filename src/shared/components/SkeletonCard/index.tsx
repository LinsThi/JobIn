import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export function SkeletonCard() {
  return (
    <View style={{ height: 100, flexDirection: "row", padding: 10 }}>
      <Skeleton colorMode="light" width={48} height={48} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Skeleton colorMode="light" height={20} width="60%" />
        <Skeleton colorMode="light" height={15} width="80%" style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}
