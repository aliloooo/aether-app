import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

const WeatherChart = ({ data }) => {
    // Process forecast data for the chart (next 24 hours)
    const chartData = data?.list?.slice(0, 8).map(item => ({
        time: format(new Date(item.dt * 1000), 'HH:mm'),
        temp: Math.round(item.main.temp),
        rain: Math.round((item.pop || 0) * 100),
    })) || [];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/60 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">{payload[0].payload.time}</p>
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-black text-lg">{payload[0].value}°C</span>
                        <span className="text-blue-400 font-bold text-xs">{payload[1].value}% Rain</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />

                    <Area
                        type="monotone"
                        dataKey="temp"
                        stroke="#fff"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorTemp)"
                    />
                    <Area
                        type="monotone"
                        dataKey="rain"
                        stroke="#60a5fa"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRain)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherChart;
