import React from "react";
import { Map, MapPin, AlertCircle, Eye, ShieldCheck } from "lucide-react";

export const HeatMapView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">แผนที่พิกัดระวังภัยเชิงรุก (Heat Map - Risk Densities)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          จำลองระบบตรวจสอบความหนาแน่นของผู้กระทำความผิดเชิงพื้นที่เพื่อตรวจพิกัด GPS อัตโนมัติ ป้องกันการละเมิดความประพฤติ
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Map Representation */}
          <div className="md:col-span-8 flex justify-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <svg viewBox="0 0 500 350" className="w-full max-w-[380px] drop-shadow-md">
              <rect width="500" height="350" fill="none" />
              {/* Map base outline */}
              <path d="M150,50 L250,50 L300,100 L320,150 L280,250 L180,300 L120,280 L100,180 L110,120 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
              
              {/* Simulated Heat circles (High density) */}
              <circle cx="200" cy="120" r="45" fill="#EF4444" opacity="0.35" />
              <circle cx="200" cy="120" r="20" fill="#EF4444" opacity="0.6" />
              <circle cx="200" cy="120" r="6" fill="#B91C1C" />

              {/* Density 2 */}
              <circle cx="260" cy="180" r="35" fill="#F59E0B" opacity="0.35" />
              <circle cx="260" cy="180" r="15" fill="#F59E0B" opacity="0.6" />
              <circle cx="260" cy="180" r="5" fill="#D97706" />

              {/* Pin markers */}
              <g transform="translate(190,100)">
                <path d="M10,0 C4,0 0,4 0,10 C0,18 10,28 10,28 C10,28 20,18 20,10 C20,4 16,0 10,0 Z" fill="#2563EB" />
                <circle cx="10" cy="10" r="4" fill="#FFFFFF" />
              </g>
              <text x="215" y="105" fontSize="10" fontWeight="bold" fill="#1E40AF">จุดเฝ้าระวังหลัก ปทุมธานี</text>
            </svg>
          </div>

          {/* Right sidebar listings */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">สถิติจำนวนเขตคดีหนาแน่น</span>
            
            <div className="space-y-3.5 text-xs text-slate-700 font-bold">
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-start space-x-2.5">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 block">เขตคลองหลวง จ.ปทุมธานี</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">มีจุดเสี่ยงสารเสพติดสูงสุดสะสม: 142 ราย</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-start space-x-2.5">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 block">เขตปากเกร็ด จ.นนทบุรี</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">จุดหนาแน่นประชากรคดีจราจร: 89 ราย</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-800 block">เขตบางพลี จ.สมุทรปราการ</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">เขตปลอดภัยสูง วินัยดี: 125 ราย</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
