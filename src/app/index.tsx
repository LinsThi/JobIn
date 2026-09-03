import { Redirect } from "expo-router";

import useAuth from "~/src/shared/store/useAuth";

export default function Index() {
  const status = useAuth((store) => store.state.status);

  if (status === "signedOut") return <Redirect href="/(auth)/sign-in" />;
  if (status === "needsProfile") return <Redirect href="/profile" />;
  if (status === "ready") return <Redirect href="/(tabs)" />;

  return null;
}
