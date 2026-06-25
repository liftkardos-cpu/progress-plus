import React from "react";
import { MapPin, AlertCircle, ShieldCheck, Map as MapIcon } from "lucide-react";

export const HeatMapView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">แผนที่พิกัดระวังภัยเชิงรุก (Heat Map - Risk Densities)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          ระบุพิกัดความหนาแน่นเชิงสถิติของผู้กระทำความผิดเชิงพื้นที่แบบเรียลไทม์ เพื่อช่วยพนักงานคุมประพฤติสอดส่องและจัดกิจกรรมบำเพ็ญประโยชน์ในจังหวัดสงขลาอย่างมีประสิทธิภาพ
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Map Representation (Real Google Map embed for Songkhla) */}
          <div className="md:col-span-8 flex flex-col bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <MapIcon className="w-3.5 h-3.5 text-[#cca43b]" />
                <span>พื้นที่พิกัดภูมิศาสตร์จริง (เขต อ.เมืองสงขลา จ.สงขลา)</span>
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-bold">LIVE HEAT MAP</span>
            </div>
            
            <div className="relative h-96 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-inner">
              <iframe
                title="Google Map Songkhla Province"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126685.22851458925!2d100.55013149580436!3d7.147614041185542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d29aba4cb07b9%3A0x10346c5fa8bc460!2z4Lit4LmL4LmA4Lih4Li34Lit4LiH4Liq4LiH4LiC4Lil4Liy!5e0!3m2!1sth!2sth!4v1719291000000!5m2!1sth!2sth"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Warning badges simulated over real map */}
              <div className="absolute top-3 left-3 bg-[#ef4444]/95 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-md border border-red-500/30 flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                <span>จุดเฝ้าระวังสูงสุด: ต.บ่อยาง (คดีจราจร/เมาแล้วขับ)</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-emerald-600/95 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                <span>จุดปลอดภัยเสี่ยงต่ำ: ต.เขารูปช้าง (ม.ทักษิณ)</span>
              </div>
            </div>
          </div>

          {/* Right sidebar listings */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-3">สถิติจำนวนเขตคดีหนาแน่น (จ.สงขลา)</span>
              
              <div className="space-y-3 text-xs text-slate-700 font-bold">
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-start space-x-2.5">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-800 block">ต.บ่อยาง อ.เมืองสงขลา</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">คดีจราจรและขับเสพหนาแน่นสูง: 142 ราย</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-start space-x-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-800 block">ต.เขารูปช้าง อ.เมืองสงขลา</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">ใกล้ ม.ทักษิณ (เขตฟื้นฟูพัฒนา): 48 ราย</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-emerald-800 block">ต.ทุ่งหวัง อ.เมืองสงขลา</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">สถิติปฏิบัติตามเกณฑ์ดีเยี่ยม: 125 ราย</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-700 block text-xs">💡 ระบบแจ้งเตือนเชิงรุก:</span>
              <p className="leading-relaxed font-semibold">
                หากพนักงานคุมประพฤติพบเห็นผู้ถูกควบคุมตัวเข้าไปใกล้เขตเสี่ยงหรือนอกเวลาพิกัดจำกัด ระบบจะประมวลสัญญานเตือนแจ้งทันทีผ่าน Line Notify และ Smart SMS
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
