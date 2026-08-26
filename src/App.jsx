import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Hub-wise data upgraded with surrounding nearby offbeat spots & carbon offset metrics
const hubData = {
  Delhi: {
    name: 'Alwar (Offbeat Heritage & Nature)',
    coords: [27.5530, 76.6346],
    distanceInfo: '🚗 ~122 km from Delhi (2.5 hrs via NH 48)',
    hospital: [27.5700, 76.6100],
    hospitalName: 'General Hospital Alwar (2.4 km)',
    crowd: 'Low Density (Safe)',
    desc: 'Escape the city rush to historical Sariska and quiet forts.',
    weather: '24°C, Pleasant & Breezy',
    food: 'Alwar Ka Mawa & Dal Baati Churma',
    ecoScore: '96% Eco-Friendly (Low Carbon Impact)',
    carbonSaved: '14.2 kg CO₂ Saved',
    budgetSplit: { stay: 45, transport: 25, food: 20, reserve: 10 },
    packingList: ['Trekking Shoes 🥾', 'Reusable Water Bottle 💧', 'Binoculars for Safari 🔭', 'Light Jacket 🧥'],
    scenicSpots: [
      { title: 'Sariska Tiger Reserve', tag: 'Wildlife Safari' },
      { title: 'Siliserh Lake Palace', tag: 'Scenic Water View' },
      { title: 'Bala Quila Fort', tag: 'Ancient Architecture' }
    ],
    nearbySpots: [
      { name: 'Sariska Tiger Reserve', coords: [27.3200, 76.4400], desc: 'Famous wildlife sanctuary & tiger habitat' },
      { name: 'Siliserh Lake Palace', coords: [27.5100, 76.5800], desc: 'Royal lakeside palace & boating point' },
      { name: 'Bala Quila Fort', coords: [27.5700, 76.6000], desc: 'Historic hilltop fort overlooking Alwar city' }
    ],
    phrasebook: [
      { english: 'Welcome / Greetings', local: 'Khamma Ghani 🙏' },
      { english: 'How much is this?', local: 'Ye kitne ka hai? 💰' },
      { english: 'Thank you', local: 'Dhanyawad / Bhalai 👍' }
    ],
    itinerary: [
      'Day 1: Arrival & Check-in at Eco-Lodge, Evening walk at Siliserh Lake.',
      'Day 2: Morning wildlife safari at Sariska Tiger Reserve, Evening fort exploration.',
      'Day 3: Local heritage shopping & return journey to Delhi.',
      'Day 4: Sunrise trek to nearby heritage hills and local artisan workshop visit.',
      'Day 5: Eco-village interaction, traditional lunch, and final departure.'
    ],
    emergencyContact: '+91-144-2330011 (Alwar Helpline)',
    chatResponses: {
      safe: 'Alwar and Sariska are very secure for travelers, especially during daylight hours. Local tourist police patrols are active.',
      bestTime: 'October to March is the ideal window due to pleasant weather and active wildlife sightings.',
      food: 'Do not miss authentic Alwar Ka Mawa from the main town halwais!'
    }
  },
  Mumbai: {
    name: 'Matheran (Eco-Sensitive Hill Station)',
    coords: [18.9863, 73.3670],
    distanceInfo: '🚆 ~83 km from Mumbai (2 hrs via Eastern Express Hwy)',
    hospital: [18.9900, 73.3700],
    hospitalName: 'Matheran Cottage Hospital (1.1 km)',
    crowd: 'Very Low (Vehicle-Free Zone)',
    desc: 'Asia’s only automobile-free hill station with pristine viewpoints.',
    weather: '22°C, Mist & Cool Winds',
    food: 'Chikki, Vada Pav & Local Thali',
    ecoScore: '99% Zero-Emission Zone (No Vehicles)',
    carbonSaved: '18.5 kg CO₂ Saved',
    budgetSplit: { stay: 50, transport: 20, food: 20, reserve: 10 },
    packingList: ['Comfortable Walking Shoes 👟', 'Rain Poncho / Umbrella ☔', 'Eco-friendly Snack Box 🍫', 'Cap / Sunglasses 🕶️'],
    scenicSpots: [
      { title: 'Panorama Point', tag: '360° Sunrise View' },
      { title: 'Charlotte Lake', tag: 'Serene Water Body' },
      { title: 'Historic Toy Train', tag: 'Heritage Ride' }
    ],
    nearbySpots: [
      { name: 'Panorama Point', coords: [18.9920, 73.3600], desc: 'Best 360-degree sunrise and sunset view' },
      { name: 'Charlotte Lake', coords: [18.9800, 73.3750], desc: 'Quiet picnic spot with historic Louisa Point nearby' },
      { name: 'Karnala Bird Sanctuary', coords: [18.8850, 73.1150], desc: 'En route green sanctuary with rare bird species' }
    ],
    phrasebook: [
      { english: 'How are you?', local: 'Kasa kay? 😊' },
      { english: 'Let’s go', local: 'Chala 🚶‍♂️' },
      { english: 'Thank you', local: 'Dhanyavad 🙏' }
    ],
    itinerary: [
      'Day 1: Toy train ride/trek up, sunset view at Panorama Point.',
      'Day 2: Echo Point exploration and horse riding through green trails.',
      'Day 3: Charlotte Lake relaxation & checkout.',
      'Day 4: Deep forest nature walk towards Garbut Point and photography.',
      'Day 5: Souvenir shopping at Central Bazaar and peaceful departure.'
    ],
    emergencyContact: '+91-2148-230222 (Matheran Help Desk)',
    chatResponses: {
      safe: 'Extremely safe because no cars or heavy vehicles are allowed inside the hill station. Pedestrian-friendly paths!',
      bestTime: 'September to February offers lush green landscapes and cool misty weather.',
      food: 'Try fresh homemade Chikki varieties at Central Bazaar.'
    }
  },
  Jaipur: {
    name: 'Sambhar Salt Lake (Mirror Lake & Skies)',
    coords: [26.9044, 75.1953],
    distanceInfo: '🚙 ~80 km from Jaipur (1.5 hrs via NH 8)',
    hospital: [26.9200, 75.2000],
    hospitalName: 'Community Health Centre Sambhar (3.0 km)',
    crowd: 'Ultra Low (Peaceful)',
    desc: 'India’s largest inland salt lake, offering surreal photography spots.',
    weather: '29°C, Clear Skies & Sunny',
    food: 'Mirchi Bada & Traditional Ghevar',
    ecoScore: '92% Desert Conservation Hub',
    carbonSaved: '11.0 kg CO₂ Saved',
    budgetSplit: { stay: 40, transport: 35, food: 15, reserve: 10 },
    packingList: ['Sunglasses (High Glare) 🕶️', 'Camera with Tripod 📷', 'Sunscreen & Hat 🧢', 'Electrolyte Drinks 🥤'],
    scenicSpots: [
      { title: 'Infinite Salt Flats', tag: 'Mirror Reflection' },
      { title: 'Shakambari Temple', tag: 'Spiritual Trail' },
      { title: 'Flamingo Point', tag: 'Migratory Birds' }
    ],
    nearbySpots: [
      { name: 'Shakambari Mata Temple', coords: [27.0800, 75.1500], desc: 'Ancient hilltop temple overlooking salt basin' },
      { name: 'Devyani Kund', coords: [26.9150, 75.1800], desc: 'Historic sacred water reservoir' },
      { name: 'Sambhar Lake Railway Yard', coords: [26.9250, 75.1900], desc: 'Vintage salt train tracks and loading station' }
    ],
    phrasebook: [
      { english: 'Hello / Greetings', local: 'Ram Ram Sa 👋' },
      { english: 'Where is this?', local: 'Ye kothe hai? 📍' },
      { english: 'Water please', local: 'Pani milega? 💧' }
    ],
    itinerary: [
      'Day 1: Arrival near salt flats, sunset reflection photography.',
      'Day 2: Migratory bird watching (Shakambari Mata temple trail).',
      'Day 3: Local handicraft tour & return.',
      'Day 4: Exploring Devyani Kund and vintage salt heritage railway yard.',
      'Day 5: Desert sunrise view and traditional Rajasthani feast.'
    ],
    emergencyContact: '+91-1421-222111 (Sambhar Emergency)',
    chatResponses: {
      safe: 'Safe area, but since it is an open salt flat expanse, it is recommended to visit during daylight with local guides.',
      bestTime: 'November to February is perfect for spotting thousands of flamingos and clear reflection skies.',
      food: 'Enjoy spicy Mirchi Badas at local roadside stalls.'
    }
  },
  Bengaluru: {
    name: 'Nandi Hills (Sunrise Viewpoint)',
    coords: [13.3702, 77.6835],
    distanceInfo: '🏍️ ~60 km from Bengaluru (1 hr 15 mins via NH 44)',
    hospital: [13.3800, 77.6700],
    hospitalName: 'Government Hospital Chickballapur (4.5 km)',
    crowd: 'Moderate (Early Morning Best)',
    desc: 'Ancient hill fortress overlooking misty clouds and scenic tracks.',
    weather: '20°C, Misty & Refreshing',
    food: 'Bisi Bele Bath & Filter Coffee',
    ecoScore: '95% Hillside Protected Zone',
    carbonSaved: '12.8 kg CO₂ Saved',
    budgetSplit: { stay: 35, transport: 30, food: 25, reserve: 10 },
    packingList: ['Windcheater / Woolen 🧣', 'Action Camera / Phone Mount 📱', 'Snacks for Early Trek 🥪', 'First Aid Kit 🩹'],
    scenicSpots: [
      { title: 'Tipu’s Drop Summit', tag: 'Cliff Viewpoint' },
      { title: 'Bhoga Nandeeshwara', tag: '9th Century Temple' },
      { title: 'Cloud Horizon Point', tag: 'Sea of Clouds' }
    ],
    nearbySpots: [
      { name: 'Bhoga Nandeeshwara Temple', coords: [13.3650, 77.7050], desc: 'Exquisite 9th-century Chola architectural marvel' },
      { name: 'Skandagiri Hills', coords: [13.4150, 77.6550], desc: 'Popular night-trekking and star-gazing peak' },
      { name: 'Tipu’s Summer Palace', coords: [13.3710, 77.6820], desc: 'Historic wooden citadel at hilltop' }
    ],
    phrasebook: [
      { english: 'Hello', local: 'Namaskara 🙏' },
      { english: 'How are you?', local: 'Hegiddira? 🤝' },
      { english: 'Thank you', local: 'Dhanyavadagalu ✨' }
    ],
    itinerary: [
      'Day 1: Early morning sunrise view, Tipu’s Drop exploration.',
      'Day 2: Cycling through winding green tracks & Bhoga Nandeeshwara Temple.',
      'Day 3: Local vineyard visit & return.',
      'Day 4: Skandagiri base exploration and local pottery village tour.',
      'Day 5: Peaceful hillside meditation and return journey.'
    ],
    emergencyContact: '+91-8156-263222 (Chickballapur Police)',
    chatResponses: {
      safe: 'Very safe, heavily visited by morning trekkers and nature enthusiasts from Bengaluru.',
      bestTime: 'Reach by 5:30 AM to witness the breathtaking sunrise above the cloud layer.',
      food: 'Sip authentic South Indian Filter Coffee at hilltop cafeterias.'
    }
  }
};

function App() {
  const [formData, setFormData] = useState({
    hub: 'Delhi',
    time: '3 Days',
    budget: '₹10,000',
    interest: 'Heritage & Culture',
    crowdPreference: 'Less Crowded'
  });

  const [submitted, setSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Arovia AI Assistant. Ask me about weather, safety, food, or budget for your trip!' }
  ]);

  // Emergency Modal State
  const [isSosActive, setIsSosActive] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckedItems({});
    setSubmitted(true);
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  // Helper to dynamically calculate itinerary days based on selected dropdown time
  const getDynamicItinerary = (destination) => {
    const match = formData.time.match(/\d+/);
    const numDays = match ? parseInt(match[0]) : 3;
    const baseItinerary = destination.itinerary;
    const result = [];

    for (let i = 1; i <= numDays; i++) {
      if (baseItinerary[i - 1]) {
        result.push(baseItinerary[i - 1]);
      } else {
        result.push(`Day ${i}: Exploration of hidden trails, local photography, and eco-sightseeing at ${destination.name}.`);
      }
    }
    return result;
  };

  // Smart Chat Message Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setChatInput('');

    setTimeout(() => {
      const activeDest = hubData[formData.hub] || hubData['Delhi'];
      const lower = userText.toLowerCase();
      let reply = `That's a fantastic query regarding ${activeDest.name}! Our AI routing engine suggests following the recommended day-wise itinerary for the best offbeat experience.`;

      if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        reply = `Hello! I'm your Arovia AI guide. You are exploring ${activeDest.name} starting from ${formData.hub}. Ask me about weather, food, safety, or budget!`;
      } else if (lower.includes('safe') || lower.includes('safety') || lower.includes('danger') || lower.includes('police')) {
        reply = activeDest.chatResponses.safe;
      } else if (lower.includes('weather') || lower.includes('temp') || lower.includes('climate') || lower.includes('rain') || lower.includes('mausam')) {
        reply = `Current weather forecast for ${activeDest.name}: ${activeDest.weather}.`;
      } else if (lower.includes('food') || lower.includes('eat') || lower.includes('dish') || lower.includes('restaurant') || lower.includes('taste') || lower.includes('khana')) {
        reply = `Must-try local delicacy in ${activeDest.name}: ${activeDest.food}!`;
      } else if (lower.includes('time') || lower.includes('season') || lower.includes('month') || lower.includes('when') || lower.includes('best')) {
        reply = activeDest.chatResponses.bestTime;
      } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('money') || lower.includes('price') || lower.includes('expense')) {
        reply = `Your total budget is set to ${formData.budget}. Estimated split: Stay (${activeDest.budgetSplit.stay}%), Transport (${activeDest.budgetSplit.transport}%), Food (${activeDest.budgetSplit.food}%), Reserve (${activeDest.budgetSplit.reserve}%).`;
      } else if (lower.includes('hospital') || lower.includes('emergency') || lower.includes('help')) {
        reply = `Nearest emergency healthcare is ${activeDest.hospitalName}. Helpline: ${activeDest.emergencyContact}.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  // Download Itinerary as Text File
  const downloadItinerary = () => {
    const activeDest = hubData[formData.hub] || hubData['Delhi'];
    const currentItinerary = getDynamicItinerary(activeDest);
    const content = `=================================\n AROVIA - SMART TRAVEL ITINERARY\n=================================\nDestination: ${activeDest.name}\nStarting Hub: ${formData.hub} (${activeDest.distanceInfo})\nTime Allocated: ${formData.time}\nEstimated Budget: ${formData.budget}\nWeather Forecast: ${activeDest.weather}\nLocal Food Specialty: ${activeDest.food}\nEco-Sustainability Score: ${activeDest.ecoScore} (${activeDest.carbonSaved})\n\nDAY-WISE PLAN:\n${currentItinerary.join('\n')}\n\nEMERGENCY & SAFETY:\nNearest Hospital: ${activeDest.hospitalName}\nHelpline: ${activeDest.emergencyContact}\n\nDeveloped by Team Tournex\nArovia Platform`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Arovia_${formData.hub}_Itinerary.txt`;
    a.click();
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const activeDest = hubData[formData.hub] || hubData['Delhi'];
    const text = encodeURIComponent(`🚀 Check out my Arovia Personalized Route for *${activeDest.name}* starting from ${formData.hub} (${formData.time})!\n\n📍 ${activeDest.distanceInfo}\n🌤️ Weather: ${activeDest.weather}\n🌿 Eco-Impact: ${activeDest.carbonSaved}\n\nGenerated via Arovia Platform.`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Leaflet Map Initialization with Auto-Fitting Bounds
  useEffect(() => {
    if (submitted && mapRef.current) {
      const currentDest = hubData[formData.hub] || hubData['Delhi'];

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Arovia Intelligence Routing'
      }).addTo(map);

      const markerCoordinates = [];

      // Main Destination Marker
      L.marker(currentDest.coords).addTo(map)
        .bindPopup(`<b>🎯 Main Hub: ${currentDest.name}</b><br />Crowd: ${currentDest.crowd}`);
      markerCoordinates.push(currentDest.coords);

      // Hospital Marker
      L.circleMarker(currentDest.hospital, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.6,
        radius: 8
      }).addTo(map).bindPopup(`<b>🏥 Emergency Care:</b> ${currentDest.hospitalName}`);
      markerCoordinates.push(currentDest.hospital);

      // Surrounding Offbeat Spot Markers
      currentDest.nearbySpots.forEach((spot) => {
        L.marker(spot.coords).addTo(map)
          .bindPopup(`<b>📍 Offbeat Spot: ${spot.name}</b><br />${spot.desc}`);
        markerCoordinates.push(spot.coords);
      });

      const bounds = L.latLngBounds(markerCoordinates);
      map.fitBounds(bounds, { padding: [40, 40] });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [submitted, formData.hub]);

  const activeDestination = hubData[formData.hub] || hubData['Delhi'];
  const currentItinerary = getDynamicItinerary(activeDestination);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col items-center justify-between p-6 relative">
      
      {/* Header */}
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          AROVIA
        </h1>
        <p className="text-slate-400 mt-1 text-xs italic">
          "Arovia - Where memories meet your next journey"
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl bg-slate-800/60 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl my-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Starting Hub */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Starting Tourism Hub</label>
              <select 
                name="hub" 
                value={formData.hub} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Bengaluru">Bengaluru</option>
              </select>
            </div>

            {/* Time Constraint (Dropdown) & Budget Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Time Constraint (Duration)</label>
                <select 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="1 Day">1 Day</option>
                  <option value="2 Days">2 Days</option>
                  <option value="3 Days">3 Days</option>
                  <option value="4 Days">4 Days</option>
                  <option value="5 Days">5 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Budget</label>
                <input 
                  type="text" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Interests</label>
              <select 
                name="interest" 
                value={formData.interest} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Heritage & Culture">Heritage & Culture</option>
                <option value="Nature & Wildlife">Nature & Wildlife</option>
                <option value="Adventure & Trekking">Adventure & Trekking</option>
                <option value="Spiritual & Wellness">Spiritual & Wellness</option>
              </select>
            </div>

            {/* Crowd Preference */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Crowd Preference</label>
              <select 
                name="crowdPreference" 
                value={formData.crowdPreference} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Less Crowded">Less Crowded (Offbeat Hidden Gem)</option>
                <option value="Moderate">Moderate</option>
                <option value="Popular Hub">Popular Hub</option>
              </select>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 rounded-lg transition duration-200 shadow-lg cursor-pointer mt-2"
            >
              Generate Personalized Route 🚀
            </button>
          </form>
        ) : (
          /* Result & Interactive Map Screen */
          <div className="space-y-5">
            
            {/* SIH 2026 Alignment Badge */}
            <div className="bg-indigo-950/60 border border-indigo-700/50 p-2.5 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-indigo-300 tracking-wide uppercase">
                🏆 Smart India Hackathon 2026 | Sustainable Tourism & Tourist Safety Platform
              </span>
            </div>

            <div className="flex justify-between items-center bg-cyan-950/40 border border-cyan-800 p-4 rounded-xl">
              <div>
                <h2 className="text-lg font-bold text-cyan-400">{activeDestination.name}</h2>
                <p className="text-xs text-slate-300 mt-1">{activeDestination.desc}</p>
                <p className="text-[11px] text-amber-300 mt-1 font-mono">📍 {activeDestination.distanceInfo} | ⏱️ {formData.time}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30 whitespace-nowrap">
                  {activeDestination.crowd}
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  🌿 {activeDestination.carbonSaved}
                </span>
              </div>
            </div>

            {/* Scenic Spot Preview Gallery Cards */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Scenic Spot Highlights & Map Pins 📸</h3>
              <div className="grid grid-cols-3 gap-3">
                {activeDestination.scenicSpots.map((spot, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-800 p-3 rounded-xl border border-slate-700 text-center shadow-md flex flex-col justify-between">
                    <span className="text-2xl mb-1">🌄</span>
                    <div>
                      <p className="text-xs font-bold text-white">{spot.title}</p>
                      <span className="text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-full inline-block mt-1 border border-cyan-800/40">{spot.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather & Local Food Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <span className="text-xl">🌤️</span>
                <div>
                  <p className="text-slate-400">Weather Forecast</p>
                  <p className="text-cyan-300 font-semibold">{activeDestination.weather}</p>
                </div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <span className="text-xl">🍲</span>
                <div>
                  <p className="text-slate-400">Local Food Special</p>
                  <p className="text-cyan-300 font-semibold">{activeDestination.food}</p>
                </div>
              </div>
            </div>

            {/* Map Header Updated */}
            <div className="pt-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Smart Routing & Destination Map 🗺️</span>
            </div>

            {/* Stable Interactive Map Box */}
            <div 
              ref={mapRef} 
              className="w-full h-80 rounded-xl border border-slate-700 z-10 shadow-inner"
            ></div>
            <p className="text-[10px] text-slate-400 text-center italic">
              ℹ️ Map displays multiple surrounding offbeat pins & emergency care stations clearly. Click any marker!
            </p>

            {/* Emergency Assistant & Nearby Services Button */}
            <button 
              onClick={() => setIsSosActive(true)}
              className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-red-500/40 animate-pulse text-sm"
            >
              <span>🚨</span> Emergency Assistant & Nearby Services
            </button>

            {/* Budget Breakdown Visualizer */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cyan-300 uppercase tracking-wider">AI Budget Split Estimation</span>
                <span className="text-slate-400">Total: {formData.budget}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                <div style={{ width: `${activeDestination.budgetSplit.stay}%` }} className="bg-cyan-500" title="Stay & Lodge"></div>
                <div style={{ width: `${activeDestination.budgetSplit.transport}%` }} className="bg-blue-500" title="Transport"></div>
                <div style={{ width: `${activeDestination.budgetSplit.food}%` }} className="bg-emerald-500" title="Food"></div>
                <div style={{ width: `${activeDestination.budgetSplit.reserve}%` }} className="bg-amber-500" title="Emergency"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                <span className="text-cyan-400">Stay ({activeDestination.budgetSplit.stay}%)</span>
                <span className="text-blue-400">Transport ({activeDestination.budgetSplit.transport}%)</span>
                <span className="text-emerald-400">Food ({activeDestination.budgetSplit.food}%)</span>
                <span className="text-amber-400">Reserve ({activeDestination.budgetSplit.reserve}%)</span>
              </div>
            </div>

            {/* Dynamic Day-Wise Itinerary Section */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Smart AI Itinerary Plan ({formData.time})</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentItinerary.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Language & Cultural Phrasebook Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Local Language Phrasebook & Tips 🗣️</h3>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {activeDestination.phrasebook.map((phrase, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700 text-center">
                    <p className="text-[10px] text-slate-400">{phrase.english}</p>
                    <p className="text-xs font-bold text-cyan-300 mt-0.5">{phrase.local}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Interactive Packing Checklist */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Smart Packing Checklist</h3>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {activeDestination.packingList.map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 hover:bg-slate-800">
                    <input 
                      type="checkbox" 
                      checked={!!checkedItems[item]} 
                      onChange={() => handleCheckboxChange(item)}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <span className={checkedItems[item] ? 'line-through text-slate-500' : ''}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Emergency & Safety Footer Info */}
            <div className="flex justify-between items-center bg-red-950/30 border border-red-900/50 p-3 rounded-xl text-xs">
              <span className="text-red-400 font-medium">Hospital: {activeDestination.hospitalName}</span>
              <span className="text-slate-300 font-mono">Helpline: {activeDestination.emergencyContact}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 rounded-lg transition duration-200 text-xs cursor-pointer"
              >
                ← Modify
              </button>
              <button 
                onClick={downloadItinerary}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition duration-200 text-xs cursor-pointer shadow-md"
              >
                📥 Download
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 rounded-lg transition duration-200 text-xs cursor-pointer shadow-md flex items-center justify-center gap-1"
              >
                <span>💬</span> Share
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Assistant & Nearby Services Modal Window */}
      {isSosActive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-red-600 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl border border-red-600/40">
              🚨
            </div>
            <h2 className="text-xl font-bold text-red-500 tracking-wide">Emergency Assistant & Nearby Services</h2>
            <p className="text-xs text-slate-300">
              Live GPS coordinates, nearest medical care, and regional emergency services have been successfully synced and broadcasted.
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left space-y-1.5 text-xs font-mono">
              <p className="text-slate-400">📍 Status: <span className="text-red-400 font-bold">Services Synced</span></p>
              <p className="text-slate-400">🏥 Nearest Care: <span className="text-white">{activeDestination.hospitalName}</span></p>
              <p className="text-slate-400">📞 Active Helpline: <span className="text-cyan-400">{activeDestination.emergencyContact}</span></p>
              <p className="text-slate-400">🛰️ Coords: <span className="text-amber-400">{activeDestination.coords[0]}, {activeDestination.coords[1]}</span></p>
            </div>

            <button 
              onClick={() => setIsSosActive(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-xs border border-slate-700 cursor-pointer"
            >
              Close Assistant Window
            </button>
          </div>
        </div>
      )}

      {/* Floating AI Chat Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition transform hover:scale-105 border border-cyan-400/40"
          >
            <span className="text-xl">🤖</span>
            <span className="text-xs font-semibold pr-1">Ask AI Assistant</span>
          </button>
        ) : (
          <div className="w-80 h-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
            {/* Chat Header */}
            <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-base">🤖</span>
                <span className="text-xs font-bold text-cyan-400">Arovia AI Guide</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-800 border-t border-slate-700 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about budget, weather, safety..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button 
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer / Team Credits */}
      <footer className="text-center text-xs text-slate-500 pb-2">
        Developed by <span className="text-slate-400 font-medium">Team Tournex</span>
      </footer>

    </div>
  );
}

export default App;