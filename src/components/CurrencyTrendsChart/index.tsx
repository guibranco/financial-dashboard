import React, { useState } from "react";
import { CurrencyTrend } from "../../hooks/useMockApi";

interface CurrencyTrendsChartProps {
  trends: CurrencyTrend[];
}

const CurrencyTrendsChart: React.FC<CurrencyTrendsChartProps> = ({
  trends,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    trends[0]?.currency || "EUR",
  );

  const selectedTrend = trends.find(
    (trend) => trend.currency === selectedCurrency,
  );

  if (!selectedTrend) {
    return <div>No trend data available</div>;
  }

  // Find min and max values for scaling
  const values = selectedTrend.data.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  // Calculate if trend is up or down
  const firstValue = selectedTrend.data[0]?.value || 0;
  const lastValue =
    selectedTrend.data[selectedTrend.data.length - 1]?.value || 0;
  const trendDirection = lastValue >= firstValue ? "up" : "down";
  const percentChange = ((lastValue - firstValue) / firstValue) * 100;

  // Only show every 5th date label to avoid crowding
  const getDateLabel = (index: number) => {
    return index % 5 === 0 ? selectedTrend.data[index].date.slice(5) : "";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Currency Trends</h2>
        <div>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {trends.map((trend) => (
              <option key={trend.currency} value={trend.currency}>
                {trend.currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold">{lastValue.toFixed(4)}</span>
        <span
          className={`ml-2 text-sm font-medium ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}
        >
          {trendDirection === "up" ? "▲" : "▼"}{" "}
          {Math.abs(percentChange).toFixed(2)}%
        </span>
        <span className="ml-2 text-sm text-gray-500">Last 30 days</span>
      </div>

      <div className="h-64 relative">
        {/* Chart grid lines */}
        <div className="absolute inset-0 grid grid-cols-1 grid-rows-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-gray-200 w-full"></div>
          ))}
        </div>

        {/* Chart line */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={
                  trendDirection === "up"
                    ? "rgb(34, 197, 94, 0.2)"
                    : "rgb(239, 68, 68, 0.2)"
                }
              />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <path
            d={`
              M0,${100 - ((selectedTrend.data[0].value - minValue) / range) * 100}
              ${selectedTrend.data
                .map((point, i) => {
                  const x = (i / (selectedTrend.data.length - 1)) * 100;
                  const y = 100 - ((point.value - minValue) / range) * 100;
                  return `L${x},${y}`;
                })
                .join(" ")}
              L100,100 L0,100 Z
            `}
            fill="url(#gradient)"
          />

          {/* Line */}
          <path
            d={`
              M0,${100 - ((selectedTrend.data[0].value - minValue) / range) * 100}
              ${selectedTrend.data
                .map((point, i) => {
                  const x = (i / (selectedTrend.data.length - 1)) * 100;
                  const y = 100 - ((point.value - minValue) / range) * 100;
                  return `L${x},${y}`;
                })
                .join(" ")}
            `}
            fill="none"
            stroke={
              trendDirection === "up" ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
            }
            strokeWidth="2"
          />
        </svg>

        {/* Data points */}
        <div className="absolute inset-0 flex items-end">
          {selectedTrend.data.map((point, i) => {
            const left = `${(i / (selectedTrend.data.length - 1)) * 100}%`;
            const bottom = `${((point.value - minValue) / range) * 100}%`;

            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white border-2 border-blue-500 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100"
                style={{ left, bottom }}
                title={`${point.date}: ${point.value.toFixed(4)}`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {selectedTrend.data.map((point, i) => (
          <div key={i} className={i % 5 === 0 ? "block" : "invisible"}>
            {getDateLabel(i)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyTrendsChart;
