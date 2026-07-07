import React, { useState } from 'react';
import { Flame, Share2, UserPlus, MapPin, Clock, Heart, ShieldAlert, Download } from 'lucide-react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [seatNumber, setSeatNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', neighborhood: '',
    emergency_contact: '', health_notes: '', prayer_request: '',
    is_whatsapp: false, volunteer: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Generate Unique Seat Number
    const timestamp = Date.now().toString().slice(-4);
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const newSeat = `IGN-${randomChar}${timestamp}`;
    setSeatNumber(newSeat);

    const payload = { 
      ...formData, 
      seat_number: newSeat, 
      theme: "KATHIZO", 
      venue: "Hall of Tyrannus, El-Rehoboth Global Missions HQ, No. 5, Nunku Road, Off Yakubu Gowon Way, Secreteriat Flyover", 
      time: "9:00 PM" 
    };

    try {
      // Production Endpoints for Dashboard Collection and n8n Automation Engine
      const formspreeURL = "https://formspree.io/f/your_formspree_id"; 
      const n8nURL = "https://your-instance.n8n.cloud/webhook/ignite-registration"; 

      await Promise.all([
        fetch(formspreeURL, { 
          method: "POST", 
          body: JSON.stringify(payload), 
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } 
        }),
        fetch(n8nURL, { 
          method: "POST", 
          body: JSON.stringify(payload), 
          mode: 'no-cors' 
        })
      ]);

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("Network connectivity issue encountered. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS SCREEN (DIGITAL PASS GENERATOR) ---
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 font-sans">
        <div id="printable-ticket" className="w-full max-w-sm bg-neutral-900 border-2 border-orange-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(255,77,0,0.3)]">
          <div className="bg-gradient-to-br from-orange-600 to-amber-500 p-6 text-center text-black">
            <Flame className="w-8 h-8 mx-auto mb-2" />
            <h2 className="text-2xl font-black italic uppercase leading-none">Ignite | Kathizo</h2>
            <p className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-70">Official Entry Pass</p>
            <div className="mt-4 bg-black text-white inline-block px-6 py-2 rounded-full font-mono text-2xl font-bold shadow-xl border border-white/10">
              {seatNumber}
            </div>
          </div>

          <div className="p-6 space-y-5 bg-neutral-900">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <div className="max-w-[60%]">
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">Registrant</p>
                <p className="text-lg font-bold truncate">{formData.full_name}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">Time</p>
                <p className="text-lg font-bold uppercase">9:00 PM</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">Venue</p>
              <p className="font-semibold text-sm">Thrive House</p>
              <p className="text-xs text-gray-400">Opposite St. Murumba's College, Jos</p>
            </div>

            <div className="space-y-3 pt-2 print:hidden">
              <button 
                onClick={() => window.print()}
                className="w-full py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition shadow-lg"
              >
                <Download className="w-4 h-4" /> Save Ticket / PDF
              </button>
              
              <button 
                onClick={() => {
                  const text = encodeURIComponent(`I'm attending IGNITE: KATHIZO! 🔥 Seat: ${seatNumber}. See you at Thrive House, 9PM!`);
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }}
                className="w-full py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <Share2 className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>
            
            <p className="text-center text-[9px] text-gray-500 uppercase tracking-widest italic leading-relaxed">
              Present this at the door.<br/>Screen-recording or Screenshot is also valid.
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-gray-500 text-sm font-medium hover:text-orange-500 transition print:hidden"
        >
          Register another person
        </button>
      </div>
    );
  }

  // --- REGISTRATION SCREEN ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-[85vh] flex flex-col items-center justify-center p-4 text-center">
        <Flame className="w-16 h-16 text-orange-500 mb-4 animate-pulse" />
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 italic uppercase leading-none">Kathizo</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-8 text-gray-400 text-sm font-medium">
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500 shrink-0"/> Thrive House, Jos</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500 shrink-0"/> 9:00 PM</span>
        </div>
        <button 
          onClick={() => document.getElementById('form').scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-4 bg-orange-600 rounded-full font-bold hover:bg-orange-500 transition shadow-[0_0_20px_rgba(234,88,12,0.4)] active:scale-95"
        >
          Secure My Seat
        </button>
      </section>

      {/* Main Forms Section */}
      <main id="form" className="w-full max-w-2xl mx-auto px-4 pb-24">
        <div className="bg-neutral-900 border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 italic">
            <UserPlus className="text-orange-500" /> Registration
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Group 1: Personal Info */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Personal Info</label>
              <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-orange-500 outline-none transition text-sm" onChange={e => setFormData({...formData, full_name: e.target.value})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-orange-500 outline-none transition text-sm" onChange={e => setFormData({...formData, email: e.target.value})} />
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 rounded-xl focus-within:border-orange-500 transition">
                  <input type="tel" required placeholder="Phone" className="bg-transparent flex-1 outline-none py-4 text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  <label className="text-[9px] flex items-center gap-1 opacity-60 cursor-pointer">
                    <input type="checkbox" onChange={e => setFormData({...formData, is_whatsapp: e.target.checked})} /> WA?
                  </label>
                </div>
              </div>
            </div>

            {/* Group 2: Logistics & Safety Dropdowns */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <label className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-2"><ShieldAlert size={12}/> Logistics & Safety</label>
              <select required className="w-full bg-neutral-800 border border-white/10 p-4 rounded-xl outline-none focus:border-orange-500 text-sm appearance-none" onChange={e => setFormData({...formData, neighborhood: e.target.value})}>
                <option value="">Select Neighborhood </option>
                <optgroup label="Jos North">
                  <option value="Tudun Wada">Tudun Wada</option>
                  <option value="Farin Gada">Farin Gada</option>
                  <option value="Gada Biu">Gada Biu</option>
                  <option value="Jenta">Jenta</option>
                  <option value="Dong Kassa">Dong Kassa</option>
                  <option value="Federal/State/Rantya">Federal Lowcost/State Lowcost/Rantya</option>
                  <option value="ECWA STAFF">ECWA STAFF</option>
                  <option value="Angwa Rukuba/RingRoad/Tina Junction">Angwa Rukuba/RingRoad/Tina Junction</option>
                  <option value="UNIJOS Hostels">UNIJOS Hostels</option>
                </optgroup>
                <optgroup label="Jos South">
                  <option value="Rayfield">Rayfield</option>
                  <option value="Bukuru">Bukuru</option>
                  <option value="Zarmaganda">Zarmaganda</option>
                  <option value="Dadinkowa">Dadinkowa</option>
                  <option value="Gyel">Gyel</option>
                  <option value="Du">Du</option>
                </optgroup>
                <option value="Other">Other / Outside Jos</option>
              </select>
              <input type="text" required placeholder="Emergency Contact (Name & Number)" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-orange-500 text-sm" onChange={e => setFormData({...formData, emergency_contact: e.target.value})} />
              <textarea placeholder="Any health concerns or allergies? (Optional)" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl h-24 outline-none focus:border-orange-500 text-sm resize-none" onChange={e => setFormData({...formData, health_notes: e.target.value})}></textarea>
            </div>

            {/* Group 3: Spiritual & Intercessory Elements */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <label className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-2"><Heart size={12}/> Spiritual</label>
              <textarea placeholder="What are you trusting God for at KATHIZO?" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl h-32 outline-none focus:border-orange-500 text-sm resize-none" onChange={e => setFormData({...formData, prayer_request: e.target.value})}></textarea>
              <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer active:bg-white/10 transition">
                <input type="checkbox" className="accent-orange-500 w-4 h-4" onChange={e => setFormData({...formData, volunteer: e.target.checked})} />
                <span className="text-xs font-medium uppercase tracking-widest">Volunteer for IGNITE team</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-orange-500 hover:text-white transition active:scale-95 shadow-xl disabled:opacity-50">
              {loading ? "SETTLING..." : "CLAIM MY KATHIZO PASS"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
