import React, { useState, useMemo, useCallback } from 'react';
import {
  MapPin, Compass, CloudSun, UtensilsCrossed, Wallet, ShieldAlert,
  MessageCircle, Download, Share2, Check, X, Phone, Leaf, Backpack,
  Languages, Navigation, Send, ChevronLeft, HeartPulse, Sparkles
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA — unchanged content, same shape as the original app          */
/* ------------------------------------------------------------------ */
const hubData = {
  Delhi: {
    name: 'Alwar', tag: 'Offbeat Heritage & Nature',
    coords: [27.5530, 76.6346],
    distanceInfo: '122 km from Delhi · ~2.5 hrs via NH 48',
    hospital: [27.5700, 76.6100], hospitalName: 'General Hospital Alwar (2.4 km)',
    crowd: 'Low density', desc: 'Escape the city rush to historical Sariska and quiet forts.',
    weather: '24°C · pleasant & breezy', food: 'Alwar Ka Mawa & Dal Baati Churma',
    ecoScore: '96% eco-friendly', carbonSaved: '14.2 kg CO₂ saved',
    budgetSplit: { stay: 45, transport: 25, food: 20, reserve: 10 },
    packingList: ['Trekking shoes', 'Reusable water bottle', 'Binoculars for safari', 'Light jacket'],
    scenicSpots: [
      { title: 'Sariska Tiger Reserve', tag: 'Wildlife safari' },
      { title: 'Siliserh Lake Palace', tag: 'Scenic water view' },
      { title: 'Bala Quila Fort', tag: 'Ancient architecture' }
    ],
    nearbySpots: [
      { name: 'Sariska Tiger Reserve', coords: [27.3200, 76.4400], desc: 'Wildlife sanctuary & tiger habitat' },
      { name: 'Siliserh Lake Palace', coords: [27.5100, 76.5800], desc: 'Royal lakeside palace & boating point' },
      { name: 'Bala Quila Fort', coords: [27.5700, 76.6000], desc: 'Hilltop fort overlooking Alwar city' }
    ],
    phrasebook: [
      { english: 'Welcome', local: 'Khamma Ghani' },
      { english: 'How much is this?', local: 'Ye kitne ka hai?' },
      { english: 'Thank you', local: 'Dhanyawad' }
    ],
    itinerary: [
      'Arrival & check-in at eco-lodge, evening walk at Siliserh Lake.',
      'Morning wildlife safari at Sariska Tiger Reserve, evening fort exploration.',
      'Local heritage shopping & return journey to Delhi.',
      'Sunrise trek to nearby heritage hills and artisan workshop visit.',
      'Eco-village interaction, traditional lunch, and final departure.'
    ],
    emergencyContact: '+91-144-2330011',
    chatResponses: {
      safe: 'Alwar and Sariska are very secure for travellers, especially in daylight. Tourist police patrols are active.',
      bestTime: 'October to March is ideal — pleasant weather and active wildlife sightings.',
      food: 'Don\u2019t miss authentic Alwar Ka Mawa from the main-town halwais.'
    }
  },
  Mumbai: {
    name: 'Matheran', tag: 'Eco-Sensitive Hill Station',
    coords: [18.9863, 73.3670],
    distanceInfo: '83 km from Mumbai · ~2 hrs via Eastern Express Hwy',
    hospital: [18.9900, 73.3700], hospitalName: 'Matheran Cottage Hospital (1.1 km)',
    crowd: 'Very low · vehicle-free', desc: 'Asia\u2019s only automobile-free hill station with pristine viewpoints.',
    weather: '22°C · mist & cool winds', food: 'Chikki, Vada Pav & local thali',
    ecoScore: '99% zero-emission zone', carbonSaved: '18.5 kg CO₂ saved',
    budgetSplit: { stay: 50, transport: 20, food: 20, reserve: 10 },
    packingList: ['Comfortable walking shoes', 'Rain poncho / umbrella', 'Eco-friendly snack box', 'Cap / sunglasses'],
    scenicSpots: [
      { title: 'Panorama Point', tag: '360° sunrise view' },
      { title: 'Charlotte Lake', tag: 'Serene water body' },
      { title: 'Historic Toy Train', tag: 'Heritage ride' }
    ],
    nearbySpots: [
      { name: 'Panorama Point', coords: [18.9920, 73.3600], desc: 'Best 360° sunrise and sunset view' },
      { name: 'Charlotte Lake', coords: [18.9800, 73.3750], desc: 'Quiet picnic spot near Louisa Point' },
      { name: 'Karnala Bird Sanctuary', coords: [18.8850, 73.1150], desc: 'En-route sanctuary with rare bird species' }
    ],
    phrasebook: [
      { english: 'How are you?', local: 'Kasa kay?' },
      { english: 'Let\u2019s go', local: 'Chala' },
      { english: 'Thank you', local: 'Dhanyavad' }
    ],
    itinerary: [
      'Toy-train ride / trek up, sunset view at Panorama Point.',
      'Echo Point exploration and horse riding through green trails.',
      'Charlotte Lake relaxation & checkout.',
      'Deep-forest nature walk towards Garbut Point and photography.',
      'Souvenir shopping at Central Bazaar and peaceful departure.'
    ],
    emergencyContact: '+91-2148-230222',
    chatResponses: {
      safe: 'Extremely safe — no cars or heavy vehicles allowed inside the hill station. Pedestrian-friendly paths throughout.',
      bestTime: 'September to February brings lush green landscapes and cool misty weather.',
      food: 'Try fresh homemade chikki varieties at Central Bazaar.'
    }
  },
  Jaipur: {
    name: 'Sambhar Salt Lake', tag: 'Mirror Lake & Skies',
    coords: [26.9044, 75.1953],
    distanceInfo: '80 km from Jaipur · ~1.5 hrs via NH 8',
    hospital: [26.9200, 75.2000], hospitalName: 'Community Health Centre, Sambhar (3.0 km)',
    crowd: 'Ultra low · peaceful', desc: 'India\u2019s largest inland salt lake, with surreal photography spots.',
    weather: '29°C · clear & sunny', food: 'Mirchi Bada & traditional Ghevar',
    ecoScore: '92% conservation hub', carbonSaved: '11.0 kg CO₂ saved',
    budgetSplit: { stay: 40, transport: 35, food: 15, reserve: 10 },
    packingList: ['Sunglasses (high glare)', 'Camera with tripod', 'Sunscreen & hat', 'Electrolyte drinks'],
    scenicSpots: [
      { title: 'Infinite Salt Flats', tag: 'Mirror reflection' },
      { title: 'Shakambari Temple', tag: 'Spiritual trail' },
      { title: 'Flamingo Point', tag: 'Migratory birds' }
    ],
    nearbySpots: [
      { name: 'Shakambari Mata Temple', coords: [27.0800, 75.1500], desc: 'Hilltop temple overlooking the salt basin' },
      { name: 'Devyani Kund', coords: [26.9150, 75.1800], desc: 'Historic sacred water reservoir' },
      { name: 'Sambhar Lake Railway Yard', coords: [26.9250, 75.1900], desc: 'Vintage salt-train tracks and loading station' }
    ],
    phrasebook: [
      { english: 'Hello', local: 'Ram Ram Sa' },
      { english: 'Where is this?', local: 'Ye kothe hai?' },
      { english: 'Water please', local: 'Pani milega?' }
    ],
    itinerary: [
      'Arrival near salt flats, sunset reflection photography.',
      'Migratory bird watching along the Shakambari Mata temple trail.',
      'Local handicraft tour & return.',
      'Exploring Devyani Kund and the vintage salt-heritage railway yard.',
      'Desert sunrise view and a traditional Rajasthani feast.'
    ],
    emergencyContact: '+91-1421-222111',
    chatResponses: {
      safe: 'A safe, open salt-flat expanse — best visited in daylight with a local guide.',
      bestTime: 'November to February is perfect for spotting flamingos and clear reflection skies.',
      food: 'Enjoy spicy mirchi badas at the local roadside stalls.'
    }
  },
  Bengaluru: {
    name: 'Nandi Hills', tag: 'Sunrise Viewpoint',
    coords: [13.3702, 77.6835],
    distanceInfo: '60 km from Bengaluru · ~1 hr 15 min via NH 44',
    hospital: [13.3800, 77.6700], hospitalName: 'Government Hospital, Chickballapur (4.5 km)',
    crowd: 'Moderate · best at dawn', desc: 'Ancient hill fortress overlooking misty clouds and scenic tracks.',
    weather: '20°C · misty & refreshing', food: 'Bisi Bele Bath & filter coffee',
    ecoScore: '95% protected hillside', carbonSaved: '12.8 kg CO₂ saved',
    budgetSplit: { stay: 35, transport: 30, food: 25, reserve: 10 },
    packingList: ['Windcheater / woolen', 'Action camera / phone mount', 'Snacks for early trek', 'First-aid kit'],
    scenicSpots: [
      { title: 'Tipu\u2019s Drop Summit', tag: 'Cliff viewpoint' },
      { title: 'Bhoga Nandeeshwara', tag: '9th-century temple' },
      { title: 'Cloud Horizon Point', tag: 'Sea of clouds' }
    ],
    nearbySpots: [
      { name: 'Bhoga Nandeeshwara Temple', coords: [13.3650, 77.7050], desc: '9th-century Chola architectural marvel' },
      { name: 'Skandagiri Hills', coords: [13.4150, 77.6550], desc: 'Popular night-trekking and star-gazing peak' },
      { name: 'Tipu\u2019s Summer Palace', coords: [13.3710, 77.6820], desc: 'Historic wooden citadel at the hilltop' }
    ],
    phrasebook: [
      { english: 'Hello', local: 'Namaskara' },
      { english: 'How are you?', local: 'Hegiddira?' },
      { english: 'Thank you', local: 'Dhanyavadagalu' }
    ],
    itinerary: [
      'Early sunrise view, Tipu\u2019s Drop exploration.',
      'Cycling through winding green tracks & Bhoga Nandeeshwara Temple.',
      'Local vineyard visit & return.',
      'Skandagiri base exploration and a local pottery-village tour.',
      'Peaceful hillside meditation and return journey.'
    ],
    emergencyContact: '+91-8156-263222',
    chatResponses: {
      safe: 'Very safe — heavily visited by morning trekkers and nature enthusiasts from Bengaluru.',
      bestTime: 'Reach by 5:30 AM to catch the sunrise above the cloud layer.',
      food: 'Sip authentic South Indian filter coffee at the hilltop cafeterias.'
    }
  }
};

const HUBS = Object.keys(hubData);
const TIMES = ['1 Day', '2 Days', '3 Days', '4 Days', '5 Days'];
const INTERESTS = ['Heritage & Culture', 'Nature & Wildlife', 'Adventure & Trekking', 'Spiritual & Wellness'];
const CROWD_PREFS = ['Less Crowded', 'Moderate', 'Popular Hub'];

/* ------------------------------------------------------------------ */
/*  FIELD MAP — custom SVG "expedition map" (no external map library) */
/* ------------------------------------------------------------------ */
function FieldMap({ destination }) {
  const W = 440, H = 300, PAD = 46;

  const points = useMemo(() => {
    const all = [destination.coords, destination.hospital, ...destination.nearbySpots.map(s => s.coords)];
    const lats = all.map(p => p[0]);
    const lngs = all.map(p => p[1]);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const latRange = (maxLat - minLat) || 0.02;
    const lngRange = (maxLng - minLng) || 0.02;
    const project = ([lat, lng]) => ({
      x: PAD + ((lng - minLng) / lngRange) * (W - 2 * PAD),
      y: H - PAD - ((lat - minLat) / latRange) * (H - 2 * PAD)
    });
    return {
      hub: project(destination.coords),
      hospital: project(destination.hospital),
      spots: destination.nearbySpots.map(s => ({ ...s, p: project(s.coords) }))
    };
  }, [destination]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <pattern id="contour" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 Q15 10 30 30 T60 30" fill="none" stroke="#C89B4A" strokeOpacity="0.10" strokeWidth="1" />
          <path d="M0 45 Q15 25 30 45 T60 45" fill="none" stroke="#7FA084" strokeOpacity="0.10" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#contour)" />

      {/* dashed routes from hub to each waypoint */}
      {points.spots.map((s, i) => (
        <line key={i} x1={points.hub.x} y1={points.hub.y} x2={s.p.x} y2={s.p.y}
          stroke="#C89B4A" strokeWidth="1.25" strokeDasharray="5 5" strokeOpacity="0.55" />
      ))}
      <line x1={points.hub.x} y1={points.hub.y} x2={points.hospital.x} y2={points.hospital.y}
        stroke="#BD5B38" strokeWidth="1.25" strokeDasharray="3 4" strokeOpacity="0.6" />

      {/* waypoint markers */}
      {points.spots.map((s, i) => (
        <g key={i}>
          <circle cx={s.p.x} cy={s.p.y} r="4.5" fill="#0E1A15" stroke="#7FA084" strokeWidth="2" />
          <text x={s.p.x} y={s.p.y - 10} textAnchor="middle" fontSize="9.5" fill="#CBD8CC" fontFamily="Inter, sans-serif">
            {s.name.length > 18 ? s.name.slice(0, 17) + '\u2026' : s.name}
          </text>
        </g>
      ))}

      {/* hospital marker */}
      <g>
        <circle cx={points.hospital.x} cy={points.hospital.y} r="5" fill="#2A1512" stroke="#BD5B38" strokeWidth="2" />
        <path d={`M${points.hospital.x - 2.5} ${points.hospital.y} h5 M${points.hospital.x} ${points.hospital.y - 2.5} v5`}
          stroke="#E8B4A0" strokeWidth="1.4" />
      </g>

      {/* hub marker, pulsing */}
      <g>
        <circle cx={points.hub.x} cy={points.hub.y} r="12" fill="#C89B4A" opacity="0.18">
          <animate attributeName="r" values="10;16;10" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.28;0.02;0.28" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx={points.hub.x} cy={points.hub.y} r="6.5" fill="#C89B4A" stroke="#0E1A15" strokeWidth="1.5" />
      </g>

      {/* compass rose */}
      <g transform={`translate(${W - 42}, 40) rotate(8)`} opacity="0.8">
        <circle r="20" fill="none" stroke="#EDE7D8" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M0 -18 L4 0 L0 18 L-4 0 Z" fill="#EDE7D8" fillOpacity="0.5" />
        <text y="-24" textAnchor="middle" fontSize="9" fill="#EDE7D8" fillOpacity="0.7" fontFamily="IBM Plex Mono, monospace">N</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const [formData, setFormData] = useState({
    hub: 'Delhi', time: '3 Days', budget: '10000',
    interest: 'Heritage & Culture', crowdPreference: 'Less Crowded'
  });
  const [submitted, setSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! I\u2019m your Arovia field guide. Ask me about weather, safety, food, or budget for this route.' }
  ]);
  const [isSosActive, setIsSosActive] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setCheckedItems({});
    setSubmitted(true);
  }, []);

  const handleCheckboxChange = useCallback((item) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const activeDestination = hubData[formData.hub] || hubData.Delhi;

  const currentItinerary = useMemo(() => {
    const match = formData.time.match(/\d+/);
    const numDays = match ? parseInt(match[0], 10) : 3;
    const base = activeDestination.itinerary;
    const result = [];
    for (let i = 0; i < numDays; i++) {
      result.push(base[i] || `Exploration of hidden trails and eco-sightseeing near ${activeDestination.name}.`);
    }
    return result;
  }, [formData.time, activeDestination]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setChatInput('');

    const lower = text.toLowerCase();
    let reply = `Following the day-wise route for ${activeDestination.name} is your best bet for an offbeat experience.`;
    if (/\b(hi|hello|hey)\b/.test(lower)) {
      reply = `Hello! You\u2019re routed to ${activeDestination.name} from ${formData.hub}. Ask me about weather, food, safety, or budget.`;
    } else if (/(safe|danger|police)/.test(lower)) {
      reply = activeDestination.chatResponses.safe;
    } else if (/(weather|temp|climate|rain)/.test(lower)) {
      reply = `Current forecast for ${activeDestination.name}: ${activeDestination.weather}.`;
    } else if (/(food|eat|dish|restaurant|taste)/.test(lower)) {
      reply = `Must-try in ${activeDestination.name}: ${activeDestination.food}.`;
    } else if (/(time|season|month|when|best)/.test(lower)) {
      reply = activeDestination.chatResponses.bestTime;
    } else if (/(budget|cost|money|price|expense)/.test(lower)) {
      const b = activeDestination.budgetSplit;
      reply = `Budget \u20b9${formData.budget}: stay ${b.stay}%, transport ${b.transport}%, food ${b.food}%, reserve ${b.reserve}%.`;
    } else if (/(hospital|emergency|help)/.test(lower)) {
      reply = `Nearest care: ${activeDestination.hospitalName}. Helpline ${activeDestination.emergencyContact}.`;
    }
    setTimeout(() => setMessages(prev => [...prev, { sender: 'ai', text: reply }]), 500);
  }, [chatInput, activeDestination, formData.hub, formData.budget]);

  const downloadItinerary = useCallback(() => {
    const d = activeDestination;
    const content =
`AROVIA \u2014 FIELD ITINERARY
========================
Destination: ${d.name} (${d.tag})
Starting hub: ${formData.hub} \u2014 ${d.distanceInfo}
Duration: ${formData.time}
Budget: \u20b9${formData.budget}
Weather: ${d.weather}
Local food: ${d.food}
Sustainability: ${d.ecoScore}, ${d.carbonSaved}

DAY-WISE PLAN
${currentItinerary.map((s, i) => `Day ${i + 1}: ${s}`).join('\n')}

EMERGENCY
Hospital: ${d.hospitalName}
Helpline: ${d.emergencyContact}

Arovia Platform \u00b7 Team Tournex`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Arovia_${formData.hub}_Itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [activeDestination, formData, currentItinerary]);

  const shareOnWhatsApp = useCallback(() => {
    const d = activeDestination;
    const text = encodeURIComponent(
      `Arovia route: ${d.name} from ${formData.hub} (${formData.time})\n${d.distanceInfo}\nWeather: ${d.weather}\nEco-impact: ${d.carbonSaved}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }, [activeDestination, formData]);

  return (
    <div className="min-h-screen w-full" style={{ background: '#0E1A15', color: '#EDE7D8', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .ledger-row + .ledger-row { border-top: 1px dashed rgba(237,231,216,0.14); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(200,155,74,0.4); border-radius: 4px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .45s ease both; }
        input:focus, select:focus { outline: none; box-shadow: 0 0 0 2px rgba(200,155,74,0.45); }
        @media (prefers-reduced-motion: reduce) { .fade-up, * { animation: none !important; transition: none !important; } }
      `}</style>

      {/* backdrop texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(#C89B4A 0.6px, transparent 0.6px)', backgroundSize: '22px 22px' }} />

      <div className="relative max-w-3xl mx-auto px-5 py-10 sm:py-14">
        {/* header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <Compass size={22} strokeWidth={1.6} color="#C89B4A" />
            <div>
              <h1 className="font-display text-2xl tracking-wide leading-none" style={{ color: '#EDE7D8' }}>Arovia</h1>
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#7FA084' }}>Sustainable Route Log</p>
            </div>
          </div>
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border" style={{ borderColor: 'rgba(200,155,74,0.35)', color: '#C89B4A' }}>
            SIH 2026
          </span>
        </header>

        {/* panel */}
        <div className="rounded-2xl border overflow-hidden fade-up" style={{ background: '#16241C', borderColor: 'rgba(237,231,216,0.1)' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="pb-4" style={{ borderBottom: '1px dashed rgba(237,231,216,0.14)' }}>
                <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7FA084' }}>Expedition brief</p>
                <h2 className="font-display text-xl">Plan your offbeat route</h2>
              </div>

              <Field label="Starting hub" icon={<MapPin size={13} />}>
                <select name="hub" value={formData.hub} onChange={handleChange} className={selectClass}>
                  {HUBS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration" icon={<Navigation size={13} />}>
                  <select name="time" value={formData.time} onChange={handleChange} className={selectClass}>
                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Budget (\u20b9)" icon={<Wallet size={13} />}>
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} className={selectClass} />
                </Field>
              </div>

              <Field label="Primary interest" icon={<Sparkles size={13} />}>
                <select name="interest" value={formData.interest} onChange={handleChange} className={selectClass}>
                  {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>

              <Field label="Crowd preference" icon={<Leaf size={13} />}>
                <select name="crowdPreference" value={formData.crowdPreference} onChange={handleChange} className={selectClass}>
                  {CROWD_PREFS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              <button type="submit"
                className="w-full font-semibold text-sm py-3.5 rounded-xl mt-2 transition-transform hover:-translate-y-0.5"
                style={{ background: '#C89B4A', color: '#0E1A15' }}>
                Chart my route
              </button>
            </form>
          ) : (
            <div className="p-5 sm:p-7 space-y-5 fade-up">
              {/* destination header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7FA084' }}>{activeDestination.tag}</p>
                  <h2 className="font-display text-2xl leading-tight">{activeDestination.name}</h2>
                  <p className="text-sm mt-1.5 max-w-md" style={{ color: 'rgba(237,231,216,0.7)' }}>{activeDestination.desc}</p>
                  <p className="font-mono text-[11px] mt-2" style={{ color: '#C89B4A' }}>{activeDestination.distanceInfo} \u00b7 {formData.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block font-mono text-[10px] px-2.5 py-1 rounded-full border" style={{ borderColor: 'rgba(127,160,132,0.4)', color: '#7FA084' }}>
                    {activeDestination.crowd}
                  </span>
                  <p className="font-mono text-[10px] mt-1.5" style={{ color: '#C89B4A' }}>{activeDestination.carbonSaved}</p>
                </div>
              </div>

              {/* scenic spot stamps */}
              <div className="grid grid-cols-3 gap-2.5">
                {activeDestination.scenicSpots.map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center border" style={{ background: '#1D3226', borderColor: 'rgba(200,155,74,0.2)' }}>
                    <p className="text-xs font-semibold leading-snug">{s.title}</p>
                    <p className="font-mono text-[9px] mt-1" style={{ color: '#7FA084' }}>{s.tag}</p>
                  </div>
                ))}
              </div>

              {/* weather / food */}
              <div className="grid grid-cols-2 gap-3">
                <InfoCard icon={<CloudSun size={16} color="#C89B4A" />} label="Weather" value={activeDestination.weather} />
                <InfoCard icon={<UtensilsCrossed size={16} color="#C89B4A" />} label="Local food" value={activeDestination.food} />
              </div>

              {/* field map */}
              <div>
                <SectionLabel icon={<MapPin size={12} />} text="Route map" />
                <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(237,231,216,0.12)', background: '#111F17' }}>
                  <FieldMap destination={activeDestination} />
                </div>
              </div>

              <button onClick={() => setIsSosActive(true)}
                className="w-full flex items-center justify-center gap-2 font-semibold text-sm py-3 rounded-xl border transition-transform hover:-translate-y-0.5"
                style={{ background: 'rgba(189,91,56,0.15)', borderColor: '#BD5B38', color: '#E8AA92' }}>
                <ShieldAlert size={16} /> Emergency assistant & nearby services
              </button>

              {/* budget */}
              <div className="rounded-xl p-4 border" style={{ background: '#1D3226', borderColor: 'rgba(237,231,216,0.1)' }}>
                <div className="flex justify-between items-center mb-2">
                  <SectionLabel icon={<Wallet size={12} />} text="Budget split" />
                  <span className="font-mono text-xs" style={{ color: '#EDE7D8' }}>\u20b9{formData.budget}</span>
                </div>
                <div className="w-full h-2.5 rounded-full overflow-hidden flex" style={{ background: '#0E1A15' }}>
                  <div style={{ width: `${activeDestination.budgetSplit.stay}%`, background: '#C89B4A' }} />
                  <div style={{ width: `${activeDestination.budgetSplit.transport}%`, background: '#7FA084' }} />
                  <div style={{ width: `${activeDestination.budgetSplit.food}%`, background: '#4C7A63' }} />
                  <div style={{ width: `${activeDestination.budgetSplit.reserve}%`, background: '#BD5B38' }} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 font-mono text-[10px]" style={{ color: 'rgba(237,231,216,0.65)' }}>
                  <span>Stay {activeDestination.budgetSplit.stay}%</span>
                  <span>Transport {activeDestination.budgetSplit.transport}%</span>
                  <span>Food {activeDestination.budgetSplit.food}%</span>
                  <span>Reserve {activeDestination.budgetSplit.reserve}%</span>
                </div>
              </div>

              {/* itinerary */}
              <div className="rounded-xl p-4 border" style={{ background: '#1D3226', borderColor: 'rgba(237,231,216,0.1)' }}>
                <SectionLabel icon={<Navigation size={12} />} text={`Itinerary \u00b7 ${formData.time}`} />
                <ul className="mt-2.5 space-y-2.5">
                  {currentItinerary.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: '#C89B4A' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ color: 'rgba(237,231,216,0.85)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* phrasebook */}
              <div className="rounded-xl p-4 border" style={{ background: '#1D3226', borderColor: 'rgba(237,231,216,0.1)' }}>
                <SectionLabel icon={<Languages size={12} />} text="Phrasebook" />
                <div className="grid grid-cols-3 gap-2 mt-2.5">
                  {activeDestination.phrasebook.map((p, i) => (
                    <div key={i} className="rounded-lg p-2 text-center border" style={{ background: '#0E1A15', borderColor: 'rgba(237,231,216,0.08)' }}>
                      <p className="text-[9.5px]" style={{ color: 'rgba(237,231,216,0.5)' }}>{p.english}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: '#7FA084' }}>{p.local}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* packing checklist */}
              <div className="rounded-xl p-4 border" style={{ background: '#1D3226', borderColor: 'rgba(237,231,216,0.1)' }}>
                <SectionLabel icon={<Backpack size={12} />} text="Packing checklist" />
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  {activeDestination.packingList.map((item, i) => {
                    const on = !!checkedItems[item];
                    return (
                      <label key={i}
                        className="flex items-center gap-2 text-xs px-2.5 py-2 rounded-lg border cursor-pointer select-none"
                        style={{ background: '#0E1A15', borderColor: on ? 'rgba(200,155,74,0.4)' : 'rgba(237,231,216,0.08)' }}>
                        <span className="w-4 h-4 rounded flex items-center justify-center border shrink-0"
                          style={{ borderColor: on ? '#C89B4A' : 'rgba(237,231,216,0.3)', background: on ? '#C89B4A' : 'transparent' }}>
                          {on && <Check size={11} color="#0E1A15" strokeWidth={3} />}
                        </span>
                        <input type="checkbox" className="hidden" checked={on} onChange={() => handleCheckboxChange(item)} />
                        <span style={{ color: on ? 'rgba(237,231,216,0.4)' : '#EDE7D8', textDecoration: on ? 'line-through' : 'none' }}>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* emergency strip */}
              <div className="flex justify-between items-center gap-3 rounded-xl p-3.5 border text-xs"
                style={{ background: 'rgba(189,91,56,0.1)', borderColor: 'rgba(189,91,56,0.3)' }}>
                <span className="flex items-center gap-1.5" style={{ color: '#E8AA92' }}><HeartPulse size={13} /> {activeDestination.hospitalName}</span>
                <span className="font-mono flex items-center gap-1.5" style={{ color: '#EDE7D8' }}><Phone size={12} /> {activeDestination.emergencyContact}</span>
              </div>

              {/* actions */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <ActionBtn onClick={() => setSubmitted(false)} icon={<ChevronLeft size={14} />} label="Modify" muted />
                <ActionBtn onClick={downloadItinerary} icon={<Download size={14} />} label="Download" accent />
                <ActionBtn onClick={shareOnWhatsApp} icon={<Share2 size={14} />} label="Share" />
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-[11px] mt-8" style={{ color: 'rgba(237,231,216,0.35)' }}>
          Developed by <span style={{ color: '#7FA084' }}>Team Tournex</span>
        </footer>
      </div>

      {/* SOS modal */}
      {isSosActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(6,10,8,0.85)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 text-center space-y-4 border-2 fade-up" style={{ background: '#16241C', borderColor: '#BD5B38' }}>
            <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center border" style={{ background: 'rgba(189,91,56,0.15)', borderColor: '#BD5B38' }}>
              <ShieldAlert size={26} color="#E8AA92" />
            </div>
            <h2 className="font-display text-lg" style={{ color: '#E8AA92' }}>Emergency assistant</h2>
            <p className="text-xs" style={{ color: 'rgba(237,231,216,0.65)' }}>
              Live coordinates and the nearest medical care for this route.
            </p>
            <div className="rounded-lg p-3 text-left space-y-1.5 font-mono text-[11px]" style={{ background: '#0E1A15', border: '1px solid rgba(237,231,216,0.1)' }}>
              <p style={{ color: 'rgba(237,231,216,0.5)' }}>Nearest care <span style={{ color: '#EDE7D8' }}>{activeDestination.hospitalName}</span></p>
              <p style={{ color: 'rgba(237,231,216,0.5)' }}>Helpline <span style={{ color: '#7FA084' }}>{activeDestination.emergencyContact}</span></p>
              <p style={{ color: 'rgba(237,231,216,0.5)' }}>Coords <span style={{ color: '#C89B4A' }}>{activeDestination.coords[0]}, {activeDestination.coords[1]}</span></p>
            </div>
            <button onClick={() => setIsSosActive(false)}
              className="w-full py-2.5 rounded-lg text-xs font-semibold border" style={{ borderColor: 'rgba(237,231,216,0.15)', color: '#EDE7D8' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* chat widget */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-xs shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: '#C89B4A', color: '#0E1A15' }}>
            <MessageCircle size={16} /> Ask field guide
          </button>
        ) : (
          <div className="w-80 h-96 rounded-2xl flex flex-col overflow-hidden border shadow-2xl fade-up" style={{ background: '#16241C', borderColor: 'rgba(237,231,216,0.12)' }}>
            <div className="flex justify-between items-center px-3.5 py-3 border-b" style={{ borderColor: 'rgba(237,231,216,0.1)' }}>
              <span className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#C89B4A' }}><Compass size={14} /> Arovia field guide</span>
              <button onClick={() => setIsChatOpen(false)} style={{ color: 'rgba(237,231,216,0.5)' }}><X size={15} /></button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                    style={m.sender === 'user'
                      ? { background: '#C89B4A', color: '#0E1A15', borderBottomRightRadius: 2 }
                      : { background: '#1D3226', color: '#EDE7D8', borderBottomLeftRadius: 2, border: '1px solid rgba(237,231,216,0.08)' }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-2.5 flex gap-2 border-t" style={{ borderColor: 'rgba(237,231,216,0.1)' }}>
              <input type="text" placeholder="Ask about budget, weather, safety\u2026" value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 text-xs" style={{ background: '#0E1A15', border: '1px solid rgba(237,231,216,0.12)', color: '#EDE7D8' }} />
              <button type="submit" className="px-3 rounded-lg" style={{ background: '#C89B4A', color: '#0E1A15' }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  small presentational helpers                                      */
/* ------------------------------------------------------------------ */
const selectClass = "w-full rounded-lg px-3.5 py-3 text-sm bg-transparent";
const selectStyleWrap = { background: '#1D3226', border: '1px solid rgba(237,231,216,0.14)', color: '#EDE7D8' };

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: '#7FA084' }}>
        {icon} {label}
      </label>
      <div style={selectStyleWrap} className="rounded-lg">
        {children}
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl p-3 flex items-center gap-2.5 border" style={{ background: '#1D3226', borderColor: 'rgba(237,231,216,0.1)' }}>
      {icon}
      <div>
        <p className="text-[10px]" style={{ color: 'rgba(237,231,216,0.5)' }}>{label}</p>
        <p className="text-xs font-semibold" style={{ color: '#EDE7D8' }}>{value}</p>
      </div>
    </div>
  );
}

function SectionLabel({ icon, text }) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#7FA084' }}>
      {icon} {text}
    </span>
  );
}

function ActionBtn({ onClick, icon, label, accent, muted }) {
  const style = accent
    ? { background: '#C89B4A', color: '#0E1A15' }
    : muted
      ? { background: 'transparent', color: '#EDE7D8', border: '1px solid rgba(237,231,216,0.15)' }
      : { background: '#1D3226', color: '#EDE7D8', border: '1px solid rgba(237,231,216,0.12)' };
  return (
    <button onClick={onClick} style={style}
      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-transform hover:-translate-y-0.5">
      {icon} {label}
    </button>
  );
}
