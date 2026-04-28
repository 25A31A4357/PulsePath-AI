const { useState, useEffect, useRef } = React;

function Icon({ name, className }) {
    const spanRef = useRef(null);
    useEffect(() => {
        if (spanRef.current) {
            spanRef.current.innerHTML = `<i data-lucide="${name}" class="${className}"></i>`;
            lucide.createIcons({ root: spanRef.current });
        }
    }, [name, className]);
    return <span ref={spanRef} className="inline-flex items-center justify-center"></span>;
}

const EMERGENCY_CONFIG = {
    'Organ Transport': { priority: 95, color: 'text-red-500', bg: 'bg-red-500', hex: '#ef4444', desc: 'Fastest route only. Alerts to all checkpoints.' },
    'Heart Attack': { priority: 85, color: 'text-orange-600', bg: 'bg-orange-600', hex: '#ea580c', desc: 'Fastest optimized route. Alerts to most traffic zones.' },
    'Accident': { priority: 70, color: 'text-orange-400', bg: 'bg-orange-400', hex: '#fb923c', desc: 'Balanced route. Alerts only in congested zones.' },
    'Pregnancy': { priority: 55, color: 'text-yellow-400', bg: 'bg-yellow-400', hex: '#facc15', desc: 'Optimal route. Minimal alerts.' },
    'Other': { priority: 65, color: 'text-purple-400', bg: 'bg-purple-400', hex: '#a855f7', desc: 'Custom mission. Standard optimized routing.' },
};

const MAP_ROUTES = [
    {
        id: 1,
        aiPath: "M50 50 L50 150 L250 150 L250 250 L350 250",
        stdPath: "M50 50 L150 50 L150 250 L350 250",
        start: { x: 50, y: 50 },
        end: { x: 350, y: 250 },
        checkpoints: [
            { x: 50, y: 150, trigger: [10, 40], type: 'red' },
            { x: 250, y: 150, trigger: [40, 70], type: 'red' },
            { x: 250, y: 250, trigger: [70, 100], type: 'yellow' }
        ]
    },
    {
        id: 2,
        aiPath: "M50 50 L150 50 L150 150 L350 150 L350 250",
        stdPath: "M50 50 L50 350 L350 350 L350 250",
        start: { x: 50, y: 50 },
        end: { x: 350, y: 250 },
        checkpoints: [
            { x: 150, y: 50, trigger: [10, 30], type: 'red' },
            { x: 150, y: 150, trigger: [30, 60], type: 'yellow' },
            { x: 350, y: 150, trigger: [60, 100], type: 'red' }
        ]
    },
    {
        id: 3,
        aiPath: "M50 50 L250 50 L250 350 L350 350 L350 250",
        stdPath: "M50 50 L50 150 L350 150 L350 250",
        start: { x: 50, y: 50 },
        end: { x: 350, y: 250 },
        checkpoints: [
            { x: 250, y: 50, trigger: [15, 45], type: 'red' },
            { x: 250, y: 350, trigger: [45, 75], type: 'red' },
            { x: 350, y: 350, trigger: [75, 100], type: 'yellow' }
        ]
    }
];

function App() {
    const [view, setView] = useState('landing'); 

    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 border-b border-gray-800 glass-panel sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
                        <Icon name="activity" className="text-brand-neon" />
                        <span className="glow-text">PulsePath AI</span>
                    </div>
                    {view === 'landing' && (
                        <button title="Access the main simulation dashboard" onClick={() => setView('dashboard')} className="px-5 py-2.5 bg-brand-neon hover:bg-blue-500 text-white rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                            Launch Dashboard
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-grow flex flex-col">
                {view === 'landing' ? <LandingPage onStart={() => setView('dashboard')} /> : <Dashboard />}
            </main>
            
            {view === 'dashboard' && (
                <footer className="p-5 border-t border-gray-800 bg-brand-900 text-center text-sm text-gray-500">
                    <p className="font-bold text-gray-400 mb-1">Deployment & Future Scope</p>
                    <p>This solution requires collaboration with city authorities and smart traffic infrastructure for real-world deployment.</p>
                    <p className="text-xs mt-2 text-gray-600">Features integration with traffic signals, emergency services coordination, smart signal automation, and a centralized monitoring system.</p>
                </footer>
            )}
        </div>
    );
}

function LandingPage({ onStart }) {
    return (
        <div className="flex-grow flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 map-container opacity-40 pointer-events-none"></div>
            <div className="ambulance-demo">
                <Icon name="ambulance" className="w-16 h-16" />
            </div>
            
            <div className="text-center z-10 p-10 glass-panel rounded-3xl max-w-3xl mx-4 shadow-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Saving Lives with <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-accent glow-text">
                        AI-Powered Routing
                    </span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Smart city emergency response solution that clears traffic for ambulances, 
                    optimizes routes in real-time, and predicts delays to ensure faster hospital arrivals.
                </p>
                <div className="flex justify-center">
                    <button title="Begin the interactive traffic clearance simulation" onClick={onStart} className="px-10 py-4 bg-brand-neon hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.6)] w-full sm:w-auto">
                        Start Simulation
                    </button>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const [emergencyType, setEmergencyType] = useState('Organ Transport');
    const [pickup, setPickup] = useState('City Center');
    const [destination, setDestination] = useState('General Hospital');
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('map');
    const [connectivity, setConnectivity] = useState('online');
    const [predictedDelay, setPredictedDelay] = useState('low');
    const [isCritical, setIsCritical] = useState(false);
    const [customType, setCustomType] = useState('');
    const [routeIndex, setRouteIndex] = useState(0);
    const [simCount, setSimCount] = useState(0);
    const [lastEmergency, setLastEmergency] = useState(null);
    const [cumulativeStats, setCumulativeStats] = useState({
        timeSaved: 0, signals: 0, lives: 0, criticalRuns: 0,
        perType: { 'Organ Transport': 0, 'Heart Attack': 0, 'Accident': 0, 'Pregnancy': 0, 'Other': 0 },
        customMissions: []
    });

    const config = EMERGENCY_CONFIG[emergencyType];
    // If critical is toggled on for lower-priority types, upgrade them
    const effectiveConfig = (isCritical && (emergencyType === 'Accident' || emergencyType === 'Pregnancy' || emergencyType === 'Other'))
        ? { ...config, priority: emergencyType === 'Accident' ? 88 : (emergencyType === 'Pregnancy' ? 82 : 85), desc: 'CRITICAL — Fastest route only. All traffic zones alerted. Full clearance.' }
        : config;
    
    useEffect(() => {
        const delays = ['low', 'medium', 'high'];
        const interval = setInterval(() => {
            if (!isSimulating) setPredictedDelay(delays[Math.floor(Math.random() * delays.length)]);
        }, 8000);
        return () => clearInterval(interval);
    }, [isSimulating]);

    useEffect(() => {
        let interval;
        if (isSimulating) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        clearInterval(interval);
                        setIsSimulating(false);
                        return 100;
                    }
                    return p + (effectiveConfig.priority > 80 ? 1.5 : 0.8);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isSimulating, config.priority]);

    useEffect(() => {
        if (!isSimulating && progress === 100) {
            const timeSavedMap = { 'Organ Transport': 12.5, 'Heart Attack': 8.5, 'Accident': 7.0, 'Pregnancy': 4.5 };
            const signalsMap   = { 'Organ Transport': 22,   'Heart Attack': 17,   'Accident': 13,   'Pregnancy': 8 };
            const bonus = isCritical ? 3.5 : 0;
            const finalType = emergencyType === 'Other' ? (customType || 'Custom Emergency') : emergencyType;
            setSimCount(c => c + 1);
            setCumulativeStats(prev => ({
                ...prev,
                timeSaved: +(prev.timeSaved + (timeSavedMap[emergencyType] || 7) + bonus).toFixed(1),
                signals:   prev.signals + (signalsMap[emergencyType] || 10) + (isCritical ? 8 : 0) + Math.floor(Math.random() * 5),
                lives:     prev.lives + (effectiveConfig.priority >= 85 ? 2 : 1),
                criticalRuns: prev.criticalRuns + (isCritical && canBeCritical ? 1 : 0),
                perType:   { ...prev.perType, [emergencyType]: (prev.perType[emergencyType] || 0) + 1 },
                customMissions: emergencyType === 'Other' ? [finalType, ...prev.customMissions].slice(0, 5) : prev.customMissions
            }));
            setLastEmergency(isCritical && (emergencyType === 'Accident' || emergencyType === 'Pregnancy' || emergencyType === 'Other') ? `${finalType} (Critical)` : finalType);
        }
    }, [isSimulating, progress]);

    const startSim = () => {
        setActiveTab('map');
        setProgress(0);
        setIsSimulating(true);
        // Pick a new random route index
        setRouteIndex(Math.floor(Math.random() * MAP_ROUTES.length));
    };
    const canBeCritical = emergencyType === 'Accident' || emergencyType === 'Pregnancy' || emergencyType === 'Other';

    return (
        <div className="container mx-auto p-4 md:p-6 flex flex-col gap-6 flex-grow">
            
            {isCritical && canBeCritical && (
                <div className="w-full p-3 rounded-lg font-bold flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse">
                    <Icon name="siren" className="w-5 h-5" />
                    🚨 CRITICAL {emergencyType.toUpperCase()} — Maximum Priority Activated · All Zones Alerted
                </div>
            )}
            {connectivity !== 'online' && (
                <div className={`w-full p-3 rounded-lg font-bold flex items-center justify-center gap-2 ${connectivity === 'offline' ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]'}`}>
                    <Icon name={connectivity === 'offline' ? "wifi-off" : "wifi"} className="w-5 h-5" />
                    ⚠️ {connectivity === 'offline' ? 'Offline Mode – Using Pre-stored Shortest Routes' : 'Low Connectivity – Using Cached Routes & Last Traffic Data'}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
                {/* Left Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    
                    <div className="glass-panel p-4 rounded-xl flex justify-between items-center">
                        <span className="text-sm text-gray-400 font-bold">Network Status</span>
                        <div className="flex bg-brand-800 rounded-lg overflow-hidden border border-gray-700">
                            <button title="Connect to live city traffic data" onClick={() => setConnectivity('online')} className={`px-3 py-1.5 text-xs font-bold transition-colors ${connectivity === 'online' ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Online 🟢</button>
                            <button title="Use cached data due to poor connection" onClick={() => setConnectivity('low')} className={`px-3 py-1.5 text-xs font-bold transition-colors border-x border-gray-700 ${connectivity === 'low' ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Low 🟡</button>
                            <button title="Simulate complete network failure fallback" onClick={() => setConnectivity('offline')} className={`px-3 py-1.5 text-xs font-bold transition-colors ${connectivity === 'offline' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Offline 🔴</button>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl">
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                            <Icon name="settings-2" className="w-5 h-5 text-gray-400" /> Setup Mission
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Emergency Type</label>
                                <select className={`w-full bg-brand-800/80 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-1 transition-all font-bold ${config.color}`}
                                    value={emergencyType} onChange={e => setEmergencyType(e.target.value)}>
                                    <option className="text-orange-400">Accident</option>
                                    <option className="text-orange-600">Heart Attack</option>
                                    <option className="text-red-500">Organ Transport</option>
                                    <option className="text-yellow-400">Pregnancy</option>
                                    <option className="text-purple-400">Other</option>
                                </select>
                            </div>

                            {emergencyType === 'Other' && (
                                <div className="animate-in slide-in-from-top-2 duration-300">
                                    <label className="block text-sm text-gray-400 mb-1.5 font-medium">Specify Emergency</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Severe Burn, Stroke..."
                                        className="w-full bg-brand-800/80 border border-purple-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-all font-bold placeholder:text-gray-600"
                                        value={customType}
                                        onChange={e => setCustomType(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Critical Severity Toggle — only for Accident, Pregnancy, & Other */}
                            {canBeCritical && (
                                <div className={`rounded-xl p-3 border transition-all duration-300 ${isCritical ? 'bg-red-500/10 border-red-500/60' : 'bg-brand-800/40 border-gray-700/50'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                                <Icon name="alert-triangle" className={`w-4 h-4 ${isCritical ? 'text-red-400' : 'text-gray-400'}`} />
                                                Critical Severity
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">Situation is life-threatening</div>
                                        </div>
                                        <button
                                            title="Toggle critical severity — upgrades routing priority to maximum"
                                            onClick={() => setIsCritical(v => !v)}
                                            className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${isCritical ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'bg-gray-600'}`}>
                                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${isCritical ? 'left-6' : 'left-0.5'}`}></span>
                                        </button>
                                    </div>
                                    {isCritical && (
                                        <div className="mt-2 text-xs text-red-400 font-medium">
                                            ↑ Priority upgraded to {effectiveConfig.priority}/100 · Full zone clearance enabled
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Starting Point</label>
                                <input type="text" className="w-full bg-brand-800/50 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-brand-neon" value={pickup} onChange={e => setPickup(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Destination Point</label>
                                <input type="text" className="w-full bg-brand-800/50 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-brand-neon" value={destination} onChange={e => setDestination(e.target.value)} />
                            </div>
                            
                            <button title="Execute the AI routing based on selected mission parameters" onClick={startSim} disabled={isSimulating}
                                className={`w-full py-4 rounded-xl font-bold text-lg mt-4 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] flex justify-center items-center gap-2 ${isSimulating ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-none' : 'bg-brand-neon hover:bg-blue-500 text-white hover:scale-[1.02]'}`}>
                                {isSimulating ? <><Icon name="loader-2" className="w-5 h-5 animate-spin" /> Simulating...</> : 'Start Simulation'}
                            </button>
                        </div>
                    </div>

                    <div className="glass-panel p-5 rounded-xl border border-gray-700/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Icon name="clock" className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-bold text-gray-300">Predictive Delay (Next 5 Mins)</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 bg-brand-900/50 p-3 rounded-lg">
                            <div className="flex gap-2">
                                <div className={`w-3 h-3 rounded-full ${predictedDelay === 'high' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-gray-700'}`}></div>
                                <div className={`w-3 h-3 rounded-full ${predictedDelay === 'medium' ? 'bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-gray-700'}`}></div>
                                <div className={`w-3 h-3 rounded-full ${predictedDelay === 'low' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-gray-700'}`}></div>
                            </div>
                            <span className={`text-sm font-bold capitalize ${predictedDelay === 'high' ? 'text-red-500' : predictedDelay === 'medium' ? 'text-orange-500' : 'text-green-500'}`}>
                                {predictedDelay} Traffic
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-3 px-1">
                            {predictedDelay === 'high' ? 'High delay detected. Auto-suggesting alternate paths.' : predictedDelay === 'medium' ? 'Medium delay. Monitoring intersections.' : 'Low delay. Continue on optimal route.'}
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl flex-grow">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Icon name="cpu" className="w-5 h-5 text-purple-400" /> AI Decision Engine
                        </h2>
                        
                        <div className="space-y-3 text-sm">
                            <div className="bg-brand-800/40 p-3 rounded-lg border border-gray-700/50">
                                <span className="text-gray-400 text-xs block mb-1">Reasoning Logic</span>
                                <span className="text-white font-medium flex items-center gap-2">
                                    <Icon name="activity" className={`w-4 h-4 ${config.color}`} /> 
                                    <span className={isCritical && canBeCritical ? 'text-red-400' : config.color}>{emergencyType}{isCritical && canBeCritical ? ' 🚨 CRITICAL' : ''}</span> &rarr; {effectiveConfig.priority >= 85 ? 'High Priority' : 'Standard Priority'}
                                </span>
                            </div>
                            <div className="bg-brand-800/40 p-3 rounded-lg border border-gray-700/50">
                                <span className="text-gray-400 text-xs block mb-1">Routing Behavior</span>
                                <span className={isCritical && canBeCritical ? 'text-red-300' : 'text-gray-200'}>{effectiveConfig.desc}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-gray-400">Priority Score</span>
                                <span className={`font-bold ${isCritical && canBeCritical ? 'text-red-400' : config.color} bg-brand-900 px-2 py-1 rounded`}>{effectiveConfig.priority} / 100</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Traffic Alerts Sent</span>
                                <span className="font-bold text-white">{effectiveConfig.priority >= 85 ? 'All Zones' : 'Congested Only'}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Main Area */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    
                    {/* Hospital Notification Panel */}
                    <div className={`transition-all duration-500 overflow-hidden ${isSimulating ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.15)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                            <div className="flex items-center gap-4 pl-2">
                                <div className="bg-red-500/20 p-2 rounded-full">
                                    <Icon name="alert-octagon" className="w-6 h-6 text-red-500 animate-pulse" />
                                </div>
                                <div>
                                    <div className="text-red-400 font-bold text-lg">Incoming Emergency Patient – Prepare Immediately</div>
                                    <div className="text-sm text-red-300 flex items-center gap-2 mt-1">
                                        <Icon name="radio" className="w-3 h-3" /> Hospital Notified • Code {config.priority >= 85 ? 'Red' : 'Yellow'}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right pr-4">
                                <div className="text-xs text-red-400 uppercase tracking-widest font-bold mb-1">Live ETA</div>
                                <div className="text-3xl font-bold text-white font-mono bg-brand-900 px-3 py-1 rounded border border-red-500/30">
                                    {Math.max(0, Math.floor(10 - (progress/10)))}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map/Analytics Area */}
                    <div className="glass-panel rounded-2xl flex-grow relative flex flex-col border border-gray-700/50 overflow-hidden min-h-[500px]">
                        <div className="flex border-b border-gray-700/50 bg-brand-800/80">
                            <button title="View real-time ambulance tracking on the city map" onClick={() => setActiveTab('map')} className={`flex-1 py-4 font-semibold transition-colors border-b-2 ${activeTab === 'map' ? 'border-brand-neon text-white bg-brand-800' : 'border-transparent text-gray-400 hover:text-white'}`}>
                                <span className="flex items-center justify-center gap-2"><Icon name="map" className="w-4 h-4" /> Live Tracking System</span>
                            </button>
                            <button title="View system performance and historical metrics" onClick={() => setActiveTab('analytics')} className={`flex-1 py-4 font-semibold transition-colors border-b-2 ${activeTab === 'analytics' ? 'border-brand-neon text-white bg-brand-800' : 'border-transparent text-gray-400 hover:text-white'}`}>
                                <span className="flex items-center justify-center gap-2"><Icon name="bar-chart-2" className="w-4 h-4" /> Analytics Dashboard</span>
                            </button>
                        </div>

                        <div className="relative flex-grow">
                            {activeTab === 'map' ? (
                                <MapSimulation progress={progress} isSimulating={isSimulating} config={effectiveConfig} connectivity={connectivity} pickup={pickup} destination={destination} routeIndex={routeIndex} />
                            ) : (
                                <AnalyticsDashboard simCount={simCount} stats={cumulativeStats} lastEmergency={lastEmergency} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MapSimulation({ progress, isSimulating, config, connectivity, pickup, destination, routeIndex }) {
    const routeColor = connectivity === 'offline' ? '#a855f7' : '#0ea5e9'; // Purple if offline, blue if online
    const activeRoute = MAP_ROUTES[routeIndex] || MAP_ROUTES[0];
    
    // Default fallback if input is empty
    const pickupText = pickup || 'Starting Point';
    const destText = destination || 'Destination';

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-brand-900">
            <div className="absolute inset-0 map-container opacity-50"></div>
            <div className="relative w-full h-full p-8 z-10 flex items-center justify-center">
                <svg className="w-full h-full max-w-2xl drop-shadow-2xl" viewBox="0 0 400 400">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="emergencyGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* City grid lines */}
                    <path d="M50 50 L350 50 M50 150 L350 150 M50 250 L350 250 M50 350 L350 350" fill="none" stroke="#1f2937" strokeWidth="2" />
                    <path d="M50 50 L50 350 M150 50 L150 350 M250 50 L250 350 M350 50 L350 350" fill="none" stroke="#1f2937" strokeWidth="2" />

                    {/* Building Blocks */}
                    <g fill="#111827" stroke="#374151" strokeWidth="1">
                        <rect x="70" y="70" width="60" height="60" rx="4" />
                        <rect x="170" y="70" width="60" height="60" rx="4" />
                        <rect x="270" y="70" width="60" height="60" rx="4" />
                        <rect x="70" y="170" width="60" height="60" rx="4" />
                        <rect x="170" y="170" width="60" height="60" rx="4" />
                        <rect x="270" y="170" width="60" height="60" rx="4" />
                        <rect x="70" y="270" width="60" height="60" rx="4" />
                        <rect x="170" y="270" width="60" height="60" rx="4" />
                        <rect x="270" y="270" width="60" height="60" rx="4" />
                    </g>

                    {/* Checkpoints (Traffic Alerts) */}
                    <g opacity={isSimulating ? 1 : 0.4} className="transition-opacity duration-1000">
                        {activeRoute.checkpoints.map((cp, i) => {
                            const isCleared = progress > cp.trigger[0] && progress < cp.trigger[1];
                            const isPassed = progress >= cp.trigger[1];
                            const color = isPassed || isCleared ? "#22c55e" : (cp.type === 'red' ? "#ef4444" : "#eab308");
                            return (
                                <g key={i}>
                                    <circle cx={cp.x} cy={cp.y} r="12" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4,2" />
                                    <circle cx={cp.x} cy={cp.y} r="4" fill={color} filter={isCleared ? "url(#glow)" : ""} />
                                </g>
                            );
                        })}
                    </g>

                    {/* Standard Route (Congested) */}
                    <path d={activeRoute.stdPath} fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8,4" opacity="0.5" />
                    
                    {/* Active AI Route */}
                    <path d={activeRoute.aiPath} fill="none" stroke={routeColor} strokeWidth="6" 
                            className={isSimulating ? "route-line" : ""} opacity={isSimulating || progress === 100 ? 1 : 0.2} filter={isSimulating ? "url(#glow)" : ""} />

                    {/* Starting Point */}
                    <g transform={`translate(${activeRoute.start.x}, ${activeRoute.start.y})`}>
                        <path d="M0 -25 C-10 -25 -18 -16 -18 -6 C-18 8 0 25 0 25 C0 25 18 8 18 -6 C18 -16 10 -25 0 -25 Z" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                        <circle cx="0" cy="-6" r="6" fill="#fff" />
                        <text x="15" y="-15" fill="#e5e7eb" fontSize="14" fontWeight="bold" filter="url(#glow)">{pickupText}</text>
                    </g>
                    
                    {/* Destination Point */}
                    <g transform={`translate(${activeRoute.end.x}, ${activeRoute.end.y})`}>
                        <path d="M0 -25 C-10 -25 -18 -16 -18 -6 C-18 8 0 25 0 25 C0 25 18 8 18 -6 C18 -16 10 -25 0 -25 Z" fill="#22c55e" stroke="#fff" strokeWidth="2" />
                        <circle cx="0" cy="-6" r="6" fill="#fff" />
                        <text x="-15" y="-35" fill="#e5e7eb" fontSize="14" fontWeight="bold" textAnchor="end" filter="url(#glow)">{destText}</text>
                    </g>

                    {/* Live Ambulance Icon & Animation */}
                    {(isSimulating || progress === 100) && (
                        <g>
                            <animateMotion dur={`${100/(config.priority > 80 ? 1.5 : 0.8) * 0.1}s`} repeatCount="1" path={activeRoute.aiPath} begin="0s" fill="freeze" />
                            
                            {/* Pulse Aura */}
                            <circle r="18" fill="none" stroke={config.hex} strokeWidth="2" opacity="0.4" className="animate-ping" />

                            {/* Ambulance Icon Container */}
                            <foreignObject width="32" height="32" x="-16" y="-16">
                                <div className="w-full h-full bg-white rounded-lg shadow-xl flex items-center justify-center border-2" style={{borderColor: config.hex}}>
                                    <Icon name="ambulance" className={`w-5 h-5 ${config.color}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}
                    {progress === 100 && !isSimulating && (
                        <g transform={`translate(${activeRoute.end.x}, ${activeRoute.end.y})`}>
                            <circle r="18" fill="none" stroke={config.hex} strokeWidth="2" opacity="0.4" className="animate-ping" />
                            <foreignObject width="32" height="32" x="-16" y="-16">
                                <div className="w-full h-full bg-white rounded-lg shadow-xl flex items-center justify-center border-2" style={{borderColor: config.hex}}>
                                    <Icon name="ambulance" className={`w-5 h-5 ${config.color}`} />
                                </div>
                            </foreignObject>
                        </g>
                    )}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-gray-900/95 p-4 rounded-xl text-xs text-gray-300 border border-gray-700 shadow-2xl backdrop-blur-md">
                    <div className="font-bold mb-3 text-white flex items-center gap-2"><Icon name="layers" className="w-4 h-4" /> Map Legend</div>
                    <div className="grid grid-cols-1 gap-y-3">
                        <div className="flex items-center gap-2"><div className="w-4 h-1 bg-red-500 rounded"></div> <span className="font-semibold">Standard Route:</span> Heavily congested traffic</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-1 bg-sky-500 rounded"></div> <span className="font-semibold">Online AI Route:</span> Optimized path with real-time data</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-1 bg-purple-500 rounded"></div> <span className="font-semibold">Offline Fallback:</span> Pre-calculated shortest path</div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full border-2 border-red-500 flex items-center justify-center"><div className="w-1 h-1 bg-red-500 rounded-full"></div></div> 
                            <span className="font-semibold text-red-400">Congested Zone:</span> AI actively clearing traffic (Turns green when cleared)
                        </div>
                    </div>
                </div>

                {isSimulating && (
                    <div className="absolute top-4 left-4 bg-gray-900/90 p-3 rounded-xl border border-gray-700 shadow-xl max-w-[250px]">
                        <div className="text-xs font-bold text-gray-400 mb-1">Live Action Log</div>
                        <div className="text-sm text-green-400 flex items-center gap-2"><Icon name="zap" className="w-4 h-4" /> Traffic light cleared</div>
                        {config.priority >= 85 && <div className="text-sm text-sky-400 flex items-center gap-2 mt-1"><Icon name="radio" className="w-4 h-4" /> Broadcasting siren warning</div>}
                    </div>
                )}
            </div>
        </div>
    );
}

function AnalyticsDashboard({ simCount, stats, lastEmergency }) {
    const colorMap = {
        'Organ Transport': { bg: 'bg-red-500',    text: 'text-red-400',    shadow: 'rgba(239,68,68,0.5)'  },
        'Heart Attack':    { bg: 'bg-orange-600', text: 'text-orange-400', shadow: 'rgba(234,88,12,0.5)'  },
        'Accident':        { bg: 'bg-orange-400', text: 'text-orange-300', shadow: 'rgba(251,146,60,0.5)' },
        'Pregnancy':       { bg: 'bg-yellow-400', text: 'text-yellow-300', shadow: 'rgba(250,204,21,0.5)' },
        'Other':           { bg: 'bg-purple-500', text: 'text-purple-400', shadow: 'rgba(168,85,247,0.5)' }
    };
    const formatTime = (mins) => {
        if (mins < 60) return `${mins.toFixed(1)}m`;
        const h = Math.floor(mins / 60);
        const m = Math.round(mins % 60).toString().padStart(2, '0');
        return `${h}h ${m}m`;
    };
    const noData = simCount === 0;
    const maxRuns = Math.max(...Object.values(stats.perType), 1);

    return (
        <div className="absolute inset-0 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Icon name="pie-chart" className="text-brand-neon" /> System Analytics
                </h3>
                {!noData && (
                    <span className="text-xs bg-brand-900 border border-gray-700 rounded-full px-3 py-1 text-gray-400">
                        {simCount} run{simCount > 1 ? 's' : ''} completed
                    </span>
                )}
            </div>
            <p className="text-gray-500 text-sm mb-6">
                {noData ? 'No simulations run yet — start one to generate live analytics.' : `Live data · Last mission: ${lastEmergency}`}
            </p>

            {noData ? (
                <div className="flex flex-col items-center justify-center h-56 text-center border border-dashed border-gray-700 rounded-2xl bg-brand-900/40">
                    <div className="text-5xl mb-4 opacity-20">📊</div>
                    <p className="text-gray-400 font-semibold text-lg">Awaiting Mission Data</p>
                    <p className="text-gray-600 text-sm mt-2 max-w-xs">Run a simulation from the Setup Mission panel to populate this dashboard.</p>
                </div>
            ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-brand-800/50 border border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:border-brand-neon transition-colors duration-300">
                    <div className="text-gray-400 text-sm mb-2 font-medium">Total Time Saved</div>
                    <div className="text-4xl font-extrabold text-brand-neon">{formatTime(stats.timeSaved)}</div>
                    <div className="text-green-400 text-xs mt-2 flex items-center justify-center gap-1">
                        <Icon name="trending-up" className="w-3 h-3" /> {(stats.timeSaved / simCount).toFixed(1)}m avg per run
                    </div>
                </div>
                <div className="bg-brand-800/50 border border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:border-purple-400 transition-colors duration-300">
                    <div className="text-gray-400 text-sm mb-2 font-medium">Signals Preempted</div>
                    <div className="text-4xl font-extrabold text-purple-400">{stats.signals.toLocaleString()}</div>
                    <div className="text-gray-500 text-xs mt-2">Across {simCount} active mission{simCount > 1 ? 's' : ''}</div>
                </div>
                <div className="bg-brand-800/50 border border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:border-green-400 transition-colors duration-300">
                    <div className="text-gray-400 text-sm mb-2 font-medium">Lives Impacted (Simulated)</div>
                    <div className="text-4xl font-extrabold text-green-400">{stats.lives}</div>
                    <div className="text-gray-500 text-xs mt-2">Successful rapid transits</div>
                </div>
            </div>

            {/* Critical Runs Alert Card */}
            {stats.criticalRuns > 0 && (
                <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-5 mb-6 flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500/20 p-2 rounded-full">
                            <Icon name="alert-triangle" className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <div className="text-red-400 font-bold text-sm">Critical Severity Activations</div>
                            <div className="text-gray-500 text-xs mt-0.5">Accident or Pregnancy cases escalated to maximum priority</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-extrabold text-red-400">{stats.criticalRuns}</div>
                        <div className="text-xs text-gray-500">{Math.round((stats.criticalRuns / simCount) * 100)}% of all runs</div>
                    </div>
                </div>
            )}

            <div className="bg-brand-800/50 border border-gray-700 rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold mb-6 text-gray-300">Simulations Run by Emergency Type</h4>
                <div className="space-y-5">
                    {Object.entries(stats.perType).map(([type, runs]) => {
                        const { bg, text, shadow } = colorMap[type];
                        const pct = Math.round((runs / maxRuns) * 100);
                        return (
                            <div key={type} className="flex items-center gap-4">
                                <div className="w-36 text-sm text-gray-400 font-semibold flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${bg}`}></div> {type}
                                </div>
                                <div className="flex-grow bg-gray-700 rounded-full h-4 overflow-hidden">
                                    <div className={`${bg} h-4 rounded-full transition-all duration-700`}
                                        style={{width: `${pct}%`, boxShadow: `0 0 10px ${shadow}`}}></div>
                                </div>
                                <div className={`w-20 text-right font-bold ${text}`}>{runs} run{runs !== 1 ? 's' : ''}</div>
                            </div>
                        );
                    })}
                </div>
                <p className="text-xs text-gray-600 mt-5 flex items-center gap-1">
                    <Icon name="info" className="w-3 h-3" /> Bar width reflects relative frequency of each emergency type
                </p>
            </div>

            {/* Custom Missions List */}
            {stats.customMissions && stats.customMissions.length > 0 && (
                <div className="mt-6 bg-brand-800/30 border border-gray-800 rounded-2xl p-5 shadow-inner">
                    <h5 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                        <Icon name="list" className="w-4 h-4 text-purple-400" /> Recent Custom Missions
                    </h5>
                    <div className="flex flex-wrap gap-2">
                        {stats.customMissions.map((name, i) => (
                            <span key={i} className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1.5 rounded-lg font-medium animate-in fade-in zoom-in duration-300">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            </>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
