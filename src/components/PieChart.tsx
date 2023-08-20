import React, { useState, useEffect } from "react";
import "./pieChart.css";
import { colors } from "../сonsts";
import { cosX, sinY, getRandomInt } from "../utils/helpers";

interface ISector {
  angle: number;
  radius: number;
  color: string;
}

const PieChart: React.FC = () => {
  const [sectors, setSectors] = useState<ISector[]>([]);

  useEffect(() => {
    generateDiagram();
  }, []);

  const generateDiagram = (): void => {
    const numSectors = getRandomInt(2, 8);
    const randomValues = Array.from({ length: numSectors }, () =>
      Math.random()
    );

    // Random radius between 70 and 200px
    const radiusValues = Array.from({ length: numSectors }, () =>
      getRandomInt(70, 200)
    );

    // Calculate total random value for angle calculations
    const totalRandomValue = randomValues.reduce((acc, val) => acc + val, 0);

    // Calculate angles for each sector based on random values
    const angles = randomValues.map(
      (value) => (360 * value) / totalRandomValue
    );

    // Create sector data with angles, radius, and color
    const sectorData = angles.map((angle, index) => ({
      angle,
      radius: radiusValues[index],
      color: colors[index],
    }));

    setSectors(sectorData);
  };

  return (
    <div className="chart-container">
      <svg
        className={"chart"}
        width="400"
        height="400"
        onClick={generateDiagram}
      >
        {sectors.map((sector, index) => {
          const startAngle = sectors
            .slice(0, index)
            .reduce((acc, sector) => acc + sector.angle, 0);

          const endAngle = startAngle + sector.angle;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = cosX(sector.radius, startRad);
          const y1 = sinY(sector.radius, startRad);
          const x2 = cosX(sector.radius, endRad);
          const y2 = sinY(sector.radius, endRad);

          return (
            <path
              key={index}
              d={`M200,200 L${x1},${y1} A${sector.radius},${sector.radius} 0 ${
                sector.angle > 180 ? 1 : 0
              } 1 ${x2},${y2} Z`}
              fill={sector.color}
            />
          );
        })}
        <circle cx="200" cy="200" r="33" fill="black" />
      </svg>
    </div>
  );
};

export default PieChart;
