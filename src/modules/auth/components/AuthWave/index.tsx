import Svg, { Path } from "react-native-svg";

import theme from "~/src/shared/theme";

/** Layered decorative waves behind the sign-in hero. Purely visual, no hit area. */
export function AuthWave() {
  return (
    <Svg
      width="100%"
      height={320}
      viewBox="0 0 390 320"
      preserveAspectRatio="none"
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
      <Path
        d="M0 0h390v208c-52 29-104 6-158 21C178 244 128 287 68 275 44 271 20 258 0 240z"
        fill={theme.colors["ji-navy-600"]}
        opacity={0.3}
      />
      <Path
        d="M0 0h390v220c-48 41-98 18-150 39-56 24-104 75-166 59-28-7-52-24-74-46z"
        fill={theme.colors["ji-navy-500"]}
        opacity={0.6}
      />
      <Path
        d="M0 0h390v120c-58 49-118 26-176 54-50 23-90 63-146 54-24-5-46-17-68-31z"
        fill={theme.colors["ji-navy-500"]}
      />
    </Svg>
  );
}
