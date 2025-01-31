import React, { useState } from "react";
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import { PieChart } from "~/src/shared/components/PieChart";

const radius = 90;
const innerRadius = 60;

type Props = {
  dataToChart: { skill: string; count: number; color: string }[];
};

export function PieChartSkills({ dataToChart }: Props) {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<number | null>(null);

  const total = dataToChart.reduce((acc, item) => acc + item.count, 0);

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
              <PieChart
                dataToChart={dataToChart}
                selected={selected}
                total={total}
                radius={radius}
                innerRadius={innerRadius}
                cumulativeAngle={0}
                onPressSlice={onPressSlice}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressOutside} activeOpacity={1}>
          <View className="items-center">
            <PieChart
              dataToChart={dataToChart}
              selected={selected}
              total={total}
              radius={radius}
              innerRadius={innerRadius}
              cumulativeAngle={0}
              onPressSlice={onPressSlice}
            />
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
