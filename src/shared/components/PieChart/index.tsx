import React from "react";
import { G, Path, Svg, Text as SvgText, TSpan } from "react-native-svg";

import useTheme from "~/src/shared/store/useTheme";

// Função para calcular o ângulo de cada fatia com base no valor e no total
const calculateAngle = (value: number, total: number) => (value / total) * 360;

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
  const {
    state: { theme },
  } = useTheme();

  return (
    <Svg width={230} height={230} viewBox="0 0 200 200">
      <G x={100} y={100}>
        {dataToChart.map((item, index) => {
          const angle = calculateAngle(item.count, total); // Cálculo do ângulo da fatia
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;

          const expandedRadius = selected === index ? radius * 1.1 : radius; // Aumenta o raio da fatia selecionada

          // Cálculo das coordenadas para o caminho da fatia (A e L representam o arco e a linha, respectivamente)
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

          // Cálculo do ângulo central para a label
          const centralAngle = (startAngle + endAngle) / 2;

          // const labelRadius =
          //   innerRadius + (expandedRadius - innerRadius) * Math.max((item.count / total) * 2, 0.4); // Define a distância do centro ao texto
          const labelRadius = radius - 10;
          console.log(item.skill, (item.count / total) * 2);
          const labelX = labelRadius * Math.cos((Math.PI * centralAngle) / 180); // Calcula a coordenada X para a label
          const labelY = labelRadius * Math.sin((Math.PI * centralAngle) / 180); // Calcula a coordenada Y para a label

          // Dividir o nome da habilidade caso tenha " de " para quebrar em partes
          let parts;
          if (item.skill.includes(" de ")) {
            parts = String(item.skill).split(" de");
            parts[0] += " de";
          } else {
            parts = [item.skill];
          }

          return (
            <G key={index} onPressIn={() => onPressSlice(index)}>
              <Path
                d={pathData}
                fill={selected === index || selected === null ? item.color : item.color + "50"} // Aplica cor, com opacidade quando não selecionado
                stroke={selected === index ? "#666" : "none"}
                strokeWidth={selected === index ? 1 : 0}
              />
              {selected === index && (
                <G>
                  <SvgText
                    x={0}
                    y={0}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={12}
                    fill={theme === "dark" ? "#FFFFFF" : "#000000"}
                    fontWeight="bold">
                    {parts.map((part, idx) => (
                      <TSpan key={idx} x={0} dy={idx > 0 ? 14 : 0}>
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
                    fill="#FFFFFF"
                    fontWeight="bold">
                    {`${Number(item.count).toFixed(0)}%`}
                  </SvgText>
                </G>
              )}
            </G>
          );
        })}
      </G>
    </Svg>
  );
}
