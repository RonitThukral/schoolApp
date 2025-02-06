import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Svg, G, Rect, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");

const GroupedBarChart = ({ data1, data2, fullStrength1, fullStrength2, classLabels }) => {
  const chartHeight = 130;
  const barWidth = 11;
  const groupSpacing = 15;

  const maxValue = Math.max(...fullStrength1, ...fullStrength2);
  const scale = chartHeight / maxValue;

  return (
    <Svg width={width} height={chartHeight + 15} style={styles.svgs}>
      {classLabels.map((label, index) => {
        const x = index * (barWidth * 2 + groupSpacing) + 11;

        const barAHeight = data1[index] * scale;
        const barBHeight = data2[index] * scale;

        const remainingAHeight = (fullStrength1[index] - data1[index]) * scale;
        const remainingBHeight = (fullStrength2[index] - data2[index]) * scale;

        return (
          <G key={index}>
            {/* Remaining Strength Bar A */}
            <Rect
              x={x}
              y={chartHeight - barAHeight - remainingAHeight}
              width={barWidth}
              height={remainingAHeight}
              fill="white"
            />
            {/* Attendance Bar A */}
            <Rect
              x={x}
              y={chartHeight - barAHeight}
              width={barWidth}
              height={barAHeight}
              fill="#ff942b"
            />
            {/* Remaining Strength Bar B */}
            <Rect
              x={x + barWidth}
              y={chartHeight - barBHeight - remainingBHeight}
              width={barWidth}
              height={remainingBHeight}
              fill="white"
            />
            {/* Attendance Bar B */}
            <Rect
              x={x + barWidth}
              y={chartHeight - barBHeight}
              width={barWidth}
              height={barBHeight}
              fill="#8ec7ff"
            />
            {/* Label */}
            <SvgText
              x={x + barWidth / 1}
              y={chartHeight + 13.5}
              fontSize={8}
              textAnchor="middle"
              fill="#666"
              fontWeight="bold"
              
            >
              {label}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
};

const AttendanceStats = () => {
  const [isToggled, setIsToggled] = useState(false);

  const fullStrengthA1 = [40, 50, 60, 45, 55, 65, 75];
  const fullStrengthB1 = [30, 45, 55, 35, 50, 60, 70];

  const fullStrengthA2 = [50, 60, 70, 65, 75, 85, 90];
  const fullStrengthB2 = [40, 55, 65, 50, 70, 80, 85];

  const dataA1 = [20, 40, 50, 30, 45, 55, 65];
  const dataB1 = [10, 25, 35, 20, 30, 40, 50];

  const dataA2 = [30, 40, 50, 60, 65, 75, 80];
  const dataB2 = [20, 30, 40, 45, 55, 65, 70];

  const classLabels1 = ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4"];
  const classLabels2 = ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11"];

  const dataA = isToggled ? dataA2 : dataA1;
  const dataB = isToggled ? dataB2 : dataB1;

  const fullStrengthA = isToggled ? fullStrengthA2 : fullStrengthA1;
  const fullStrengthB = isToggled ? fullStrengthB2 : fullStrengthB1;

  const classLabels = isToggled ? classLabels2 : classLabels1;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Attendance</Text>
          <View style={styles.legendAndArrow}>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#8EC7FF" }]} />
                <Text style={styles.legendText}>Section A</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#FF942B" }]} />
                <Text style={styles.legendText}>Section B</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsToggled(!isToggled)}>
              <Text style={styles.arrow}>{isToggled ? "<" : ">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <GroupedBarChart
            data1={dataA}
            data2={dataB}
            fullStrength1={fullStrengthA}
            fullStrength2={fullStrengthB}
            classLabels={classLabels}
          />
          <Text style={styles.yAxisLabel}>Number of students</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:8989099
  },
  card: {
    width: responsiveWidth(90),
    backgroundColor: "#EEF7FF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 220,
    ...Platform.select({
      ios: {
width :'85%'
      },
      
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  legendAndArrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 8,
    fontWeight: "500",
  },
  arrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    marginLeft: 10,
    ...Platform.select({
      ios: {
        marginLeft:10
      },
      
    }),
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#EEF7FF",
    borderRadius: 8,
    padding: 5,
  },
  yAxisLabel: {
    position: "absolute",
    left: responsiveWidth(-10),
    top: 50,
    fontSize: 11,
    fontWeight: "900",
    color: "#666",
    transform: [{ rotate: "-90deg" }],
    textAlign: "center",
  },
  svgs: {
    position: "relative",
    left: responsiveWidth(20),
    bottom: 10,
  },
});

export default AttendanceStats;
