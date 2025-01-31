import React from "react";
import { View } from "react-native";
import { G, Path, Svg, Text as SvgText, TSpan } from "react-native-svg";

const calculateAngle = (value: number, total: number) => (value / total) * 360;

const indexAdjustment = (index: number) => {
  switch (index) {
    case 1:
      return 3;
    case 2:
      return 7;
    case 3:
      return 10;
    case 4:
      return 5;
    default:
      return 0;
  }
};

type Props = {
  dataToChart: { skill: string; count: number; color: string }[];
  selected: number | null;
  total: number;
  radius: number;
  innerRadius: number;
  cumulativeAngle: number;
  onPressSlice: (index: number) => void;
};

export function PieChart({
  dataToChart,
  selected,
  total,
  radius,
  innerRadius,
  cumulativeAngle,
  onPressSlice,
}: Props) {
  return (
    <Svg width={230} height={230} viewBox="0 0 200 200">
      <G x={100} y={100}>
        {dataToChart.map((item, index) => {
          const angle = calculateAngle(item.count, total);
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;

          const expandedRadius = selected === index ? radius * 1.1 : radius;

          const startXOuter = expandedRadius * Math.cos((Math.PI * startAngle) / 180);
          const startYOuter = expandedRadius * Math.sin((Math.PI * startAngle) / 180);
          const endXOuter = expandedRadius * Math.cos((Math.PI * endAngle) / 180);
          const endYOuter = expandedRadius * Math.sin((Math.PI * endAngle) / 180);

          const startXInner = innerRadius * Math.cos((Math.PI * startAngle) / 180);
          const startYInner = innerRadius * Math.sin((Math.PI * startAngle) / 180);
          const endXInner = innerRadius * Math.cos((Math.PI * endAngle) / 180);
          const endYInner = innerRadius * Math.sin((Math.PI * endAngle) / 180);

          cumulativeAngle = endAngle;

          const pathData = `
            M${startXOuter},${startYOuter}
            A${expandedRadius},${expandedRadius} 0 ${angle > 180 ? 1 : 0} 1 ${endXOuter},${endYOuter}
            L${endXInner},${endYInner}
            A${innerRadius},${innerRadius} 0 ${angle > 180 ? 1 : 0} 0 ${startXInner},${startYInner} Z
          `;

          const labelRadius =
            innerRadius +
            (expandedRadius - innerRadius) * Math.max((item.count / total) * 2, 0.4) +
            indexAdjustment(index);

          const labelX = labelRadius * Math.cos((Math.PI * (startAngle + endAngle)) / 2 / 180);
          const labelY = labelRadius * Math.sin((Math.PI * (startAngle + endAngle)) / 2 / 180);

          let parts;

          if (item.skill.includes(" de ")) {
            parts = String(item.skill).split(" de");
            parts[0] += " de";
          } else {
            parts = [item.skill];
          }

          return (
            <G key={index}>
              <Path
                d={pathData}
                fill={selected === index || selected === null ? item.color : item.color + "50"}
                stroke={selected === index ? "#666" : "none"}
                strokeWidth={selected === index ? 1 : 0}
                onPress={() => onPressSlice(index)}
              />

              {selected === index && (
                <View>
                  <SvgText
                    x={0}
                    y={0}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={12}
                    fill="#333"
                    fontWeight="bold">
                    {parts.map((part, index) => (
                      <TSpan key={index} x={0} dy={index > 0 ? 14 : 0}>
                        {part}
                      </TSpan>
                    ))}
                  </SvgText>

                  <SvgText
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={14}
                    fill="#333"
                    fontWeight="bold">
                    {Number(item.count).toFixed(0)}%
                  </SvgText>
                </View>
              )}
            </G>
          );
        })}
      </G>
    </Svg>
  );
}
