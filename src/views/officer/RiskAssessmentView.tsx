import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  ShieldAlert, 
  ChevronRight, 
  Info, 
  HelpCircle, 
  Flame, 
  CheckCircle,
  FileText,
  TrendingUp,
  Activity
} from "lucide-react";

export const RiskAssessmentView: React.FC = () => {
  // Scorecard question answers state
  const [answers, setAnswers] = useState({
    crimeHistory: 0,
    drugUsage: 0,
    environment: 0,
    compliance: 0
  });

  const [isCalculated, setIsCalculated] = useState(false);
  const [riskResult, setRiskResult] = useState({
    score: 0,
    level: "ต่ำมาก",
    color: "text-emerald-500 bg-emerald-50 border-emerald-100",
    recommendation: "แนะนำพบเจ้าหน้าที่เพื่อติดตามนัดหมายตามเงื่อนไขปกติ 1 ครั้งต่อเดือน และสนับสนุนให้ทำความดีตามรอบนัดหมาย"
  });

  const handleCalculate = () => {
    const totalScore = answers.crimeHistory + answers.drugUsage + answers.environment + answers.compliance;
    
    let level = "ต่ำ";
    let color = "text-emerald-600 bg-emerald-50 border-emerald-200/50";
    let rec = "แนะนำพบเจ้าหน้าที่ตามเงื่อนไขปกติ (1 ครั้งต่อเดือน) และสนับสนุนพาสปอร์ตส่งเสริมวิชาชีพสุจริต";

    if (totalScore >= 9) {
      level = "สูงมาก / เฝ้าระวังรุนแรง";
      color = "text-red-600 bg-red-50 border-red-200/50 animate-bounce";
      rec = "⚠️ ต้องเพิ่มมาตรการคุมเข้มเป็นพิเศษ! บังคับรายงานตัวสัปดาห์ละ 1 ครั้ง และสุ่มสกัดตรวจสารเสพติด (Urine Test) ทุกรอบนัดหมาย ห้ามเข้าใกล้สถานบริการกลุ่มเสี่ยง";
    } else if (totalScore >= 6) {
      level = "ปานกลาง";
      color = "text-amber-600 bg-amber-50 border-amber-200/50";
      rec = "แนะนำพิจารณาเพิ่มความถี่การพบเจ้าหน้าที่ (2 ครั้งต่อเดือน) ร่วมกับการส่งเข้ารับการบำบัดฟื้นฟูตามหลักสูตรปรับเปลี่ยนพฤติกรรมสะสม";
    }

    setRiskResult({
      score: totalScore,
      level,
      color,
      recommendation: rec
    });
    setIsCalculated(true);
    alert("✓ ระบบคำนวณระดับดัชนีเฝ้าระวังความเสี่ยงประพฤติผิดซ้ำสำเร็จ พร้อมปรับปรุงประวัติดัชนีเพื่อเสนอผู้บริหารคดีรับทราบ");
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">ระบบประเมินดัชนีความเสี่ยงกระทำความผิดซ้ำ (Risk Watch Index)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          คำนวณสถิติและวิเคราะห์พฤติกรรมเพื่อคัดกรองระดับความเสี่ยงในการกระทำความผิดซ้ำของผู้ถูกคุมประพฤติ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Scorecard input fields (7 columns) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-50 pb-3">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider">แบบประเมินพฤติกรรมและความเสี่ยงทางวินัย</h3>
          </div>

          <div className="space-y-5">
            {/* Question 1: Crime history */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-800 block">1. ประวัติการกระทำความผิดทางอาญาและความรุนแรงในอดีต</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.crimeHistory === 0 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q1" checked={answers.crimeHistory === 0} onChange={() => setAnswers({...answers, crimeHistory: 0})} className="h-4 w-4" />
                  <span>ไม่มี (0 คะแนน)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.crimeHistory === 1 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q1" checked={answers.crimeHistory === 1} onChange={() => setAnswers({...answers, crimeHistory: 1})} className="h-4 w-4" />
                  <span>เคย 1 ครั้ง (1 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.crimeHistory === 2 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q1" checked={answers.crimeHistory === 2} onChange={() => setAnswers({...answers, crimeHistory: 2})} className="h-4 w-4" />
                  <span>2-3 ครั้ง (2 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.crimeHistory === 3 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q1" checked={answers.crimeHistory === 3} onChange={() => setAnswers({...answers, crimeHistory: 3})} className="h-4 w-4" />
                  <span>บ่อยครั้ง (3 ค.)</span>
                </label>
              </div>
            </div>

            {/* Question 2: Drug usage */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-800 block">2. ประวัติการเกี่ยวข้อง ติด หรือจำหน่ายสารเสพติดให้โทษ</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.drugUsage === 0 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q2" checked={answers.drugUsage === 0} onChange={() => setAnswers({...answers, drugUsage: 0})} className="h-4 w-4" />
                  <span>ไม่มี (0 คะแนน)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.drugUsage === 1 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q2" checked={answers.drugUsage === 1} onChange={() => setAnswers({...answers, drugUsage: 1})} className="h-4 w-4" />
                  <span>เคยลองเสพ (1 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.drugUsage === 2 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q2" checked={answers.drugUsage === 2} onChange={() => setAnswers({...answers, drugUsage: 2})} className="h-4 w-4" />
                  <span>เสพประจำ (2 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.drugUsage === 3 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q2" checked={answers.drugUsage === 3} onChange={() => setAnswers({...answers, drugUsage: 3})} className="h-4 w-4" />
                  <span>ติดรุนแรง (3 ค.)</span>
                </label>
              </div>
            </div>

            {/* Question 3: Environment/Peers */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-800 block">3. สภาพแวดล้อมที่อยู่อาศัย ชุมชน และการคบหาสมาคมกลุ่มเพื่อนเสี่ยง</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.environment === 0 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q3" checked={answers.environment === 0} onChange={() => setAnswers({...answers, environment: 0})} className="h-4 w-4" />
                  <span>ปลอดภัยดี (0 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.environment === 1 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q3" checked={answers.environment === 1} onChange={() => setAnswers({...answers, environment: 1})} className="h-4 w-4" />
                  <span>เสี่ยงบางครั้ง (1 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.environment === 2 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q3" checked={answers.environment === 2} onChange={() => setAnswers({...answers, environment: 2})} className="h-4 w-4" />
                  <span>มีแหล่งชุมชนเสี่ยง (2 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.environment === 3 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q3" checked={answers.environment === 3} onChange={() => setAnswers({...answers, environment: 3})} className="h-4 w-4" />
                  <span>อยู่จุดอิทธิพลลบ (3 ค.)</span>
                </label>
              </div>
            </div>

            {/* Question 4: Compliance */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-800 block">4. ความตรงต่อเวลาและการเข้าร่วมกิจกรรมตามมาตรการบังคับคุมประพฤติ</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.compliance === 0 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q4" checked={answers.compliance === 0} onChange={() => setAnswers({...answers, compliance: 0})} className="h-4 w-4" />
                  <span>ตรงต่อเวลาเสมอ (0 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.compliance === 1 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q4" checked={answers.compliance === 1} onChange={() => setAnswers({...answers, compliance: 1})} className="h-4 w-4" />
                  <span>เลื่อนนัดบ้าง (1 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.compliance === 2 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q4" checked={answers.compliance === 2} onChange={() => setAnswers({...answers, compliance: 2})} className="h-4 w-4" />
                  <span>ขาดนัดบางงวด (2 ค.)</span>
                </label>
                <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${answers.compliance === 3 ? "border-blue-600 bg-blue-50/20 text-blue-800 font-bold" : "border-slate-100"}`}>
                  <input type="radio" name="q4" checked={answers.compliance === 3} onChange={() => setAnswers({...answers, compliance: 3})} className="h-4 w-4" />
                  <span>ขาดสม่ำเสมอ/หนี (3 ค.)</span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-all"
              >
                คำนวณและประมวลระดับความเสี่ยง
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Diagnostic Report and Dial Gauge indicator (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between flex-1">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider block">ผลดัชนีวิเคราะห์ความเสี่ยงพฤติกรรม</h3>
              
              <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-4">
                <div className="relative w-36 h-36 flex items-center justify-center bg-white rounded-full ring-4 ring-slate-100">
                  <div className="text-center">
                    <span className="text-3xl font-black text-blue-900 block">
                      {isCalculated ? riskResult.score : "—"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">คะแนนรวมความเสี่ยง</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10.5px] text-slate-400 font-bold block">ระดับประเมินความเสี่ยงผิดซ้ำ:</span>
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black inline-block border ${isCalculated ? riskResult.color : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {isCalculated ? riskResult.level : "กรุณากดคำนวณด้านซ้าย"}
                  </span>
                </div>
              </div>

              {isCalculated && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">ข้อเสนอแนะและวิธีการควบคุมตัวบุคคล:</span>
                  <p className="text-[11.5px] text-slate-600 font-bold leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    "{riskResult.recommendation}"
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium border-t border-slate-50 pt-3 mt-4">
              <Info className="w-3.5 h-3.5" />
              <span>ดัชนีคำนวณอัตโนมัติอิงตามเกณฑ์กรมคุมประพฤติสากล</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
