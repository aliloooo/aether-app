import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';

const WeatherAlerts = ({ data }) => {
    // In a real app, this would come from the API (e.g. OneCall API)
    // Here we mock an alert based on current conditions for demonstration
    const getMockAlerts = () => {
        const alerts = [];
        if (data.main.temp > 35) {
            alerts.push({
                type: 'warning',
                title: 'Heat Advisory',
                description: 'High temperatures expected. Stay hydrated and avoid outdoor activities.'
            });
        }
        if (data.wind.speed > 10) {
            alerts.push({
                type: 'info',
                title: 'High Wind',
                description: 'Strong winds detected. Secure loose outdoor objects.'
            });
        }
        if (data.weather[0].main === 'Rain') {
            alerts.push({
                type: 'info',
                title: 'Precipitation',
                description: 'Rainy conditions expected. Carry an umbrella.'
            });
        }
        return alerts;
    };

    const alerts = getMockAlerts();

    if (alerts.length === 0) return null;

    return (
        <div className="flex flex-col gap-3">
            {alerts.map((alert, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border ${alert.type === 'warning'
                            ? 'bg-orange-500/10 border-orange-500/20 text-orange-200'
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
                        }`}
                >
                    <div className={`p-2 rounded-xl ${alert.type === 'warning' ? 'bg-orange-500/20' : 'bg-blue-500/20'}`}>
                        {alert.type === 'warning' ? <AlertTriangle size={18} /> : <Info size={18} />}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">{alert.title}</h4>
                        <p className="text-xs opacity-70 mt-0.5">{alert.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default WeatherAlerts;
