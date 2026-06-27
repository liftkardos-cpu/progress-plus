import React, { useState, useEffect } from "react";
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
  Activity,
  User,
  History,
  TrendingDown
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

export const RiskAssessmentView: React.FC = () => {
  const { probationersList, riskAssessmentRecords, addRiskAssessmentRecord } = useApp();

  // Selected probationer
  const [selectedId, setSelectedId] = useState(probationersList[0]?.id || "");
  const selectedProbationer = probationersList.find(p => p.id === selectedId) || probationersList[0];

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
    level: "ต่ำ",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/50",
    recommendation: "แนะนำพบเจ้าหน้าที่ตามเงื่อนไขปกติ (1 ครั้งต่อเดือน) และสนับสนุนพาสปอร์ตส่งเสริมวิชาชีพสุจริต"
  });

  // When selected probationer changes, look if there is an existing assessment and pre-fill
  useEffect(() => {
    if (selectedProbationer) {
      const recordsForUser = riskAssessmentRecords.filter(r => r.probationerId === selectedProbationer.id);
      if (recordsForUser.length > 0) {
        const latest = recordsForUser[0]; // First is latest due to unshift
        setAnswers({
          crimeHistory: latest.crimeHistory,
          drugUsage: latest.drugUsage,
          environment: latest.environment,
          compliance: latest.compliance
        });
        
        let color = "text-emerald-600 bg-emerald-50 border-emerald-200/50";
        if (latest.riskLevel.includes("สูง")) {
          color = "text-red-600 bg-red-50 border-red-200/50";
        } else if (latest.riskLevel === "ปานกลาง") {
          color = "text-amber-600 bg-amber-50 border-amber-200/50";
        }

        setRiskResult({
          score: latest.totalScore,
          level: latest.riskLevel,
          color,
          recommendation: latest.recommendation
        });
        setIsCalculated(true);
      } else {
        // Reset
        setAnswers({
          crimeHistory: 0,
          drugUsage: 0,
          environment: 0,
          compliance: 0
        });
        setIsCalculated(false);
      }
    }
  }, [selectedId, riskAssessmentRecords]);

  const handleCalculate = () => {
    const totalScore = answers.crimeHistory + answers.drugUsage + answers.environment + answers.compliance;
    
    let level = "ต่ำ";
    let color = "text-emerald-600 bg-emerald-50 border-emerald-200/50";
    let rec = "แนะนำพบเจ้าหน้าที่ตามเงื่อนไขปกติ (1 ครั้งต่อเดือน) และสนับสนุนพาสปอร์ตส่งเสริมวิชาชีพสุจริต";

    if (totalScore >= 9) {
      level = "สูงมาก / เฝ้าระวังรุนแรง";
      color = "text-red-600 bg-red-50 border-red-200/50";
      rec = "⚠️ ต้องเพิ่มมาตรการคุมเข้มเป็นพิเศษ! บังคับรายงานตัวสัปดาห์ละ 1 ครั้ง และสุ่มสกัดตรวจสารเสพติด (Urine Test) ทุกรอบนัดหมาย ห้ามเข้าใกล้สถานบริการกลุ่มเสี่ยง";
    } else if (totalScore >= 5) {
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
  };

  const handleSaveAssessment = () => {
    if (!selectedProbationer) return;
    
    addRiskAssessmentRecord({
      probationerId: selectedProbationer.id,
      probationerName: selectedProbationer.name,
      crimeHistory: answers.crimeHistory,
      drugUsage: answers.drugUsage,
      environment: answers.environment,
      compliance: answers.compliance,
      totalScore: riskResult.score,
      riskLevel: riskResult.level,
      recommendation: riskResult.recommendation,
      officerName: "นายณัฐพงษ์ มั่นคง"
    });

    alert(`✓ บันทึกดัชนีชี้วัดความเสี่ยงความประพฤติของ ${selectedProbationer.name} เรียบร้อยแล้ว สถิติและประวัติการวิเคราะห์ถูกปรับปรุงแบบเรียลไทม์`);
  };

  // Recharts Data 1: Breakdown of individual domains
  const barChartData = [
    { name: "ประวัติอาญา", คะแนน: answers.crimeHistory, "ระดับสูงสุด": 3 },
    { name: "การเกี่ยวข้องกับสารเสพติด", คะแนน: answers.drugUsage, "ระดับสูงสุด": 3 },
    { name: "สภาพแวดล้อม/คบเพื่อน", คะแนน: answers.environment, "ระดับสูงสุด": 3 },
    { name: "การเข้าร่วมรายงานตัว", คะแนน: answers.compliance, "ระดับสูงสุด": 3 },
  ];

  // Recharts Data 2: Risk distribution among all probationers (dynamic)
  // Let's analyze the latest risk levels of all probationers dynamically!
  const getRiskDistribution = () => {
    let lowCount = 0;
    let medCount = 0;
    let highCount = 0;

    probationersList.forEach(p => {
      // Find latest assessment for this user
      const userRecords = riskAssessmentRecords.filter(r => r.probationerId === p.id);
      if (userRecords.length > 0) {
        const rL = userRecords[0].riskLevel;
        if (rL === "ต่ำ") lowCount++;
        else if (rL === "ปานกลาง") medCount++;
        else highCount++;
      } else {
        // Fallback default
        if (p.behaviorScore > 80) lowCount++;
        else if (p.behaviorScore > 50) medCount++;
        else highCount++;
      }
    });

    return [
      { name: "ต่ำ", value: lowCount, color: "#10b981" },
      { name: "ปานกลาง", value: medCount, color: "#f59e0b" },
      { name: "สูงมาก / เฝ้าระวัง", value: highCount, color: "#ef4444" }
    ];
  };

  const distributionData = getRiskDistribution();

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-[#0f2d59]">ศูนย์ประเมินดัชนีเฝ้าระวังความเสี่ยงการกระทำผิดซ้ำ (Risk Assessment & Analytics)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          กรอกข้อมูลสัมภาษณ์พฤติกรรม ตรวจสอบ และวิเคราะห์แนวโน้มการกระทำผิดซ้ำของผู้ถูกคุมประพฤติรายบุคคลในเขตจังหวัดสงขลา
        </p>
      </div>

      {/* Selector bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">กำลังประเมินพฤติกรรม</span>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="font-bold text-sm text-[#0f2d59] outline-none bg-transparent cursor-pointer"
            >
              {probationersList.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedProbationer && (
          <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">ข้อหาหลัก</span>
              <span className="text-slate-700 font-medium truncate max-w-[200px] block">{selectedProbationer.charge}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">คะแนนความประพฤติปะปน</span>
              <span className="text-slate-700 font-black">{selectedProbationer.behaviorScore} / 100</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Scorecard input fields (7 columns) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider">แบบสอบถามเฝ้าระวังพฤติกรรม (Behavior Risk Survey)</h3>
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
                  <span>ชุมชนเสี่ยง (2 ค.)</span>
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

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-[#0f2d59] hover:bg-blue-950 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
              >
                <span>📊</span> คำนวณความเสี่ยงเชิงลึก
              </button>
              
              {isCalculated && (
                <button
                  onClick={handleSaveAssessment}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 animate-fade-in"
                >
                  <span>💾</span> บันทึกลงระบบและอัปเดตประวัติทันที
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Diagnostic Report (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider block">ผลการวิเคราะห์พฤติกรรม</h3>
                {isCalculated && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                    {selectedProbationer?.name}
                  </span>
                )}
              </div>
              
              <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-4">
                <div className="relative w-32 h-32 flex items-center justify-center bg-white rounded-full ring-4 ring-slate-100 shadow-sm">
                  <div className="text-center">
                    <span className="text-3xl font-black text-blue-900 block font-mono">
                      {isCalculated ? riskResult.score : "—"}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">คะแนนรวมความเสี่ยง</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">ระดับเฝ้าระวังพฤติกรรมผิดซ้ำ:</span>
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black inline-block border shadow-sm transition-all ${isCalculated ? riskResult.color : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {isCalculated ? riskResult.level : "กรุณากดคำนวณด้านซ้าย"}
                  </span>
                </div>
              </div>

              {isCalculated && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">แนวปฏิบัติและการควบคุมพฤติกรรม:</span>
                  <p className="text-[11.5px] text-slate-600 font-bold leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    "{riskResult.recommendation}"
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium border-t border-slate-50 pt-3 mt-4">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>ดัชนีนี้ประมวลผลอิงตามมาตรฐานความประพฤติสากลของจังหวัดสงขลา</span>
            </div>
          </div>
        </div>

      </div>

      {/* Analytics Graphs Section - Requirement #2 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-black text-[#0f2d59] flex items-center gap-1.5">
            <span>📈</span> ระบบวิเคราะห์แนวโน้มการกระทำผิดซ้ำเชิงสถิติ (Recidivism Analytics Dashboard)
          </h3>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">แผนภาพประมวลผลความหนาแน่นและจำแนกอัตราความเสี่ยงคดีความในจังหวัดสงขลา</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Bar Chart of Behavior domains of selected user */}
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-black text-slate-700 mb-3 flex items-center gap-1.5">
              <span>📊</span> ดัชนีจำแนกสี่ขอบเขตความประพฤติของ: <span className="text-blue-700">{selectedProbationer?.name}</span>
            </h4>
            <div className="h-64 text-xs font-sans">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10, fontWeight: "bold" }} />
                  <YAxis stroke="#64748b" domain={[0, 3]} tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e293b", color: "#fff", borderRadius: "12px", border: "none" }}
                    labelStyle={{ fontWeight: "bold", fontSize: "11px" }}
                  />
                  <Legend tick={{ fontSize: 10 }} />
                  <Bar dataKey="คะแนน" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="ระดับสูงสุด" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={16} opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Pie Chart of risk distribution dynamically */}
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-700 mb-3 flex items-center gap-1.5">
                <span>🍩</span> อัตราส่วนและขอบเขตความเสี่ยงของผู้ถูกคุมประพฤติรวม (Songkhla Risk Distribution)
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="h-48 md:col-span-7 font-sans">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", color: "#fff", borderRadius: "12px", border: "none" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legends list */}
              <div className="md:col-span-5 space-y-2 text-[11px] font-bold">
                {distributionData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-500 font-semibold">เสี่ยง{item.name}</span>
                    </div>
                    <span className="text-slate-800 font-extrabold">{item.value} คน</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50/30 p-2.5 rounded-xl text-[10px] text-blue-700 border border-blue-50/50 mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>ดัชนีระดับสูงมากและปานกลางสะท้อนถึงการวางนโยบายคุมเข้มและรายงานตัวเสริมพิเศษ</span>
            </div>
          </div>
        </div>
      </div>

      {/* History of Assessments Log */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-4 h-4 text-slate-500" />
          ประวัติการประเมินและคัดกรองพฤติกรรมในระบบ (Historical Assessment Ledger)
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-100">
                <th className="p-4">รายชื่อผู้ถูกคุมประพฤติ</th>
                <th className="p-4">วันที่ประเมิน</th>
                <th className="p-4 text-center">คะแนนรวม</th>
                <th className="p-4">ระดับความเสี่ยง</th>
                <th className="p-4">มาตรการควบคุม</th>
                <th className="p-4">ผู้ประเมิน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
              {riskAssessmentRecords.map((rec) => {
                let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                if (rec.riskLevel.includes("สูง")) {
                  badgeColor = "bg-red-50 text-red-700 border-red-100 animate-pulse";
                } else if (rec.riskLevel === "ปานกลาง") {
                  badgeColor = "bg-amber-50 text-amber-700 border-amber-100";
                }

                return (
                  <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">
                      <div>{rec.probationerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{rec.probationerId}</div>
                    </td>
                    <td className="p-4">{rec.date}</td>
                    <td className="p-4 text-center font-black font-mono text-blue-900 text-sm">{rec.totalScore}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-full border ${badgeColor}`}>
                        {rec.riskLevel}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs truncate text-[11px] font-medium text-slate-500" title={rec.recommendation}>
                      {rec.recommendation}
                    </td>
                    <td className="p-4 text-slate-500 font-semibold">{rec.officerName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
