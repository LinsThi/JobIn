import React, { useState } from "react";
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { G, Path, Svg, Text as SvgText } from "react-native-svg";

const data = [
  { label: "Uma habilidade qualquer 1", value: 30, color: "#FF9999" },
  { label: "Habilidade de ler 1", value: 20, color: "#99CC99" },
  { label: "Liderança 1", value: 50, color: "#9999FF" },
];

const radius = 90;
const innerRadius = 60;
const center = { x: 100, y: 100 };

const calculateAngle = (value: number, total: number) => (value / total) * 360;

type Props = {
  dataToChart: { skill: string; count: number; color: string }[];
};

export function CustomPieChart({ dataToChart }: Props) {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<number | null>(null);

  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativeAngle = 0;

  const onPressSlice = (index: number) => {
    setSelected(selected === index ? null : index);
  };

  const onPressOutside = () => {
    setSelected(null);
  };

  return (
    <View>
      {width > 390 ? (
        <TouchableOpacity onPress={onPressOutside} activeOpacity={1}>
          <View className="flex-row pt-6">
            <View className="flex-col gap-2 pt-2">
              {dataToChart.map((item, index) => (
                <View key={index} className="w-32 flex-row items-center gap-1">
                  <View style={{ backgroundColor: item.color }} className="h-4 w-4 rounded-full" />
                  <Text className="font-inter-extra-light text-sm" numberOfLines={2}>
                    {item.skill}
                  </Text>
                </View>
              ))}
            </View>

            <View className="items-center">
              <Svg width={230} height={230} viewBox="0 0 200 200">
                <G x={center.x} y={center.y}>
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

                    const labelRadius = expandedRadius * 0.75;
                    const labelX =
                      labelRadius * Math.cos((Math.PI * (startAngle + endAngle)) / 2 / 180);
                    const labelY =
                      labelRadius * Math.sin((Math.PI * (startAngle + endAngle)) / 2 / 180);

                    return (
                      <G key={index}>
                        <Path
                          d={pathData}
                          fill={
                            selected === index || selected === null ? item.color : item.color + "50"
                          }
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
                              {item.skill}
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
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressOutside} activeOpacity={1}>
          <View className="items-center">
            <Svg width={230} height={230} viewBox="0 0 200 200">
              <G x={center.x} y={center.y}>
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

                  const labelRadius = expandedRadius * 0.75;
                  const labelX =
                    labelRadius * Math.cos((Math.PI * (startAngle + endAngle)) / 2 / 180);
                  const labelY =
                    labelRadius * Math.sin((Math.PI * (startAngle + endAngle)) / 2 / 180);

                  return (
                    <G key={index}>
                      <Path
                        d={pathData}
                        fill={
                          selected === index || selected === null ? item.color : item.color + "50"
                        }
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
                            {item.skill}
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
          </View>

          <View className="flex-row flex-wrap gap-2 pb-6">
            {dataToChart.map((item, index) => (
              <View key={index} className="w-[7.2rem] flex-row items-center gap-1">
                <View style={{ backgroundColor: item.color }} className="h-4 w-4 rounded-full" />
                <Text className="font-inter-extra-light text-sm" numberOfLines={2}>
                  {item.skill}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
