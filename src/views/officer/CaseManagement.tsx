// ==========================================
// 🇹🇭 ไฟล์: /src/views/officer/CaseManagement.tsx
// คำอธิบาย: หน้าจอจัดการประวัติข้อมูลผู้ถูกคุมประพฤติ (Case Management View)
// โครงสร้างไฟล์:
//   - ส่วนนำเข้าข้อมูลและโมดูลเชื่อมต่อ (Imports, Types)
//   - ตัวแปรค้นหาและการประเมินพฤติกรรม (Filtering & Behavioral Scoring)
//   - ตารางรายชื่อคดีและระดับความเสี่ยง (Probationers List)
//   - รายละเอียดประวัติ ข้อมูลที่อยู่ศาลเจ้าของคดี และกิจกรรมที่ผ่านเกณฑ์ (Profile Details Page)
// ==========================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Search, 
  UserCheck, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Filter,
  Plus,
  SlidersHorizontal,
  Award,
  ChevronRight,
  Activity,
  HeartHandshake
} from "lucide-react";
import { ProfileData } from "../../types";

export const CaseManagement: React.FC = () => {
  const { probationersList, selectProbationer, updateBehaviorScore, observationNotes, addObservationNote } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [chargeFilter, setChargeFilter] = useState("ทั้งหมด");
  const [selectedProbationer, setSelectedProbationer] = useState<ProfileData | null>(null);
  const [diaryContent, setDiaryContent] = useState("");
  
  // Scoring state
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoringUser, setScoringUser] = useState<ProfileData | null>(null);
  const [newScore, setNewScore] = useState(100);

  // Generate drug tests and status details for the list dynamically
  const probationers = (probationersList && probationersList.length > 0 ? probationersList : [
    {
      id: "PB6705-123456",
      name: "นายสมชาย ใจดี",
      age: 28,
      gender: "ชาย",
      avatarUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="fb_0" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#fb_0)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="'Sarabun', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ส</text></svg>`)}`,
      charge: "ขับรถในขณะมึนเมาสุราเป็นเหตุให้ผู้อื่นได้รับอันตรายแก่กายหรือจิตใจ (พ.ร.บ.จราจรทางบก พ.ศ. 2522)",
      probationPeriod: { start: "20 พฤษภาคม 2567", end: "20 พฤษภาคม 2568", remainingDays: 324 },
      behaviorScore: 95,
      completedHours: 36,
      requiredHours: 48,
      status: "ปกติ"
    },
    {
      id: "PB6705-123457",
      name: "นายธนวัฒน์ รักดี",
      age: 24,
      gender: "ชาย",
      avatarUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="fb_1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#020617"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#fb_1)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="'Sarabun', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ธ</text></svg>`)}`,
      charge: "มีไว้ในครอบครองซึ่งยาเสพติดให้โทษประเภท 1 (เมทแอมเฟตามีน/ยาบ้า) เพื่อเสพโดยไม่ได้รับอนุญาต (ประมวลกฎหมายยาเสพติด พ.ศ. 2564)",
      probationPeriod: { start: "15 มีนาคม 2567", end: "15 มีนาคม 2568", remainingDays: 258 },
      behaviorScore: 68,
      completedHours: 12,
      requiredHours: 24,
      status: "เฝ้าระวังพิเศษ"
    },
    {
      id: "PB6705-123458",
      name: "นายวิชัย ใจกล้า",
      age: 32,
      gender: "ชาย",
      avatarUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="fb_2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#172554"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#fb_2)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="'Sarabun', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ว</text></svg>`)}`,
      charge: "ขับรถในขณะหย่อนความสามารถในอันที่จะขับขี่และก่อให้เกิดความเสียหายแก่ทรัพย์สินผู้อื่น (พ.ร.บ.จราจรทางบก พ.ศ. 2522)",
      probationPeriod: { start: "10 มกราคม 2567", end: "10 มกราคม 2568", remainingDays: 198 },
      behaviorScore: 88,
      completedHours: 40,
      requiredHours: 48,
      status: "ใกล้ครบกำหนด"
    },
    {
      id: "PB6705-123459",
      name: "นางสาวสมใจ นึกงาม",
      age: 29,
      gender: "หญิง",
      avatarUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="fb_3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4c0519"/><stop offset="100%" stop-color="#881337"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#fb_3)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="'Sarabun', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ส</text></svg>`)}`,
      charge: "บุกรุกเคหสถานของผู้อื่นในเวลากลางคืนโดยร่วมกันกระทำความผิด (ประมวลกฎหมายอาญา มาตรา 365)",
      probationPeriod: { start: "05 มิถุนายน 2567", end: "05 มิถุนายน 2568", remainingDays: 345 },
      behaviorScore: 92,
      completedHours: 18,
      requiredHours: 36,
      status: "ปกติ"
    }
  ]) as any[];

  // Filter list
  const filteredList = probationers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.charge.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "ทั้งหมด" || p.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Count helper
  const totalCount = probationers.length;
  const normalCount = probationers.filter(p => p.status === "ปกติ").length;
  const watchCount = probationers.filter(p => p.status === "เฝ้าระวังพิเศษ").length;
  const nearEndCount = probationers.filter(p => p.status === "ใกล้ครบกำหนด").length;

  const handleOpenScoreModal = (p: any) => {
    setScoringUser(p);
    setNewScore(p.behaviorScore);
    setShowScoreModal(true);
  };

  const handleSaveScore = () => {
    if (scoringUser) {
      updateBehaviorScore(scoringUser.id, newScore);
      alert(`💾 บันทึกคะแนนพฤติกรรม นาย ${scoringUser.name} เป็น ${newScore} คะแนน เรียบร้อย`);
      setShowScoreModal(false);
      setScoringUser(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-[#0f2d59]">ทะเบียนข้อมูลผู้ถูกคุมประพฤติ</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            จัดการแฟ้มประวัติ ประเมินคะแนนความประพฤติ และตรวจสอบผลประเมินวินัยรายบุคคล
          </p>
        </div>
        <button 
          onClick={() => alert("➕ ดึงแบบฟอร์มเพิ่มผู้ถูกคุมประพฤติเข้าสู่ระบบเครือข่ายความมั่นคง")}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow transition-all flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มทะเบียนใหม่</span>
        </button>
      </div>

      {/* 3 Stat boxes at top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold text-slate-400 block">สถานะความประพฤติ: ปกติ</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-600">{normalCount}</span>
              <span className="text-xs text-slate-500 font-bold">คน</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">เกณฑ์วินัยปลอดภัยสูง</span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-full">
            <UserCheck className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold text-slate-400 block">เฝ้าระวังพิเศษ (เสี่ยงสูง)</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-red-500">{watchCount}</span>
              <span className="text-xs text-slate-500 font-bold">คน</span>
            </div>
            <span className="text-[10px] text-red-500 font-bold block mt-1">⚠️ ต้องติดตามรายงานตัวถี่ถ้วน</span>
          </div>
          <div className="p-3.5 bg-red-50 text-red-500 rounded-full">
            <ShieldAlert className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold text-slate-400 block">ใกล้ครบกำหนดคุมประพฤติ</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-amber-500">{nearEndCount}</span>
              <span className="text-xs text-slate-500 font-bold">คน</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">เตรียมพ้นกำหนดภายใน 30 วัน</span>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-500 rounded-full">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

      </div>

      {/* Database control filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาชื่อ, รหัสผู้ถูกคุมประพฤติ, หรือประเภทคดี..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50/50 rounded-xl text-xs focus:bg-white focus:ring-1 focus:ring-blue-600 outline-none transition-all font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex items-center space-x-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">กรองตามสถานะ:</span>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700 outline-none"
          >
            <option value="ทั้งหมด">ทั้งหมด ({totalCount})</option>
            <option value="ปกติ">ปกติ ({normalCount})</option>
            <option value="เฝ้าระวังพิเศษ">เฝ้าระวังพิเศษ ({watchCount})</option>
            <option value="ใกล้ครบกำหนด">ใกล้ครบกำหนด ({nearEndCount})</option>
          </select>
        </div>
      </div>

      {/* Main Table view */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-4 px-6">ผู้ถูกคุมประพฤติ</th>
                <th className="py-4 px-4">คดี / ข้อหาร้องฟ้อง</th>
                <th className="py-4 px-4 text-center">ระยะเวลา</th>
                <th className="py-4 px-4 text-center">ชั่วโมงบริการสังคม</th>
                <th className="py-4 px-4 text-center">คะแนนพฤติกรรม</th>
                <th className="py-4 px-4 text-center">ผลตรวจสารเสพติด</th>
                <th className="py-4 px-6 text-right">การจัดการ</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((p) => {
                // Determine drug status and color
                let drugLabel = "ผ่านล่าสุด (02/06/67)";
                let drugBg = "bg-emerald-50 text-emerald-700 border-emerald-200/40";
                
                if (p.id === "PB6705-123457") {
                  drugLabel = "พบสาร (14/05/67)";
                  drugBg = "bg-red-50 text-red-600 border-red-200/40 animate-pulse";
                } else if (p.id === "PB6705-123459") {
                  drugLabel = "รอนัดตรวจปัสสาวะ";
                  drugBg = "bg-blue-50 text-blue-600 border-blue-200/40";
                }

                // Determine score tag
                let scoreTag = "ดีเยี่ยม";
                let scoreColor = "text-emerald-600";
                if (p.behaviorScore < 70) {
                  scoreTag = "เฝ้าระวังสูง";
                  scoreColor = "text-red-500";
                } else if (p.behaviorScore < 90) {
                  scoreTag = "ปานกลาง";
                  scoreColor = "text-amber-500";
                }

                return (
                  <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* User profile details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.avatarUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <span className="font-extrabold text-slate-800 text-[12.5px] block">{p.name}</span>
                          <span className="font-mono text-[9px] text-slate-400 block font-semibold">ID: {p.id}</span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5">{p.gender} • อายุ {p.age} ปี</span>
                        </div>
                      </div>
                    </td>

                    {/* Charge / Offense */}
                    <td className="py-4 px-4 max-w-[180px]">
                      <span className="font-bold text-slate-700 text-[11.5px] line-clamp-2 leading-relaxed" title={p.charge}>
                        {p.charge}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-[11px] text-slate-600 font-bold block">{p.probationPeriod.start}</span>
                      <span className="text-[10px] text-slate-400 font-medium block">ถึง {p.probationPeriod.end}</span>
                      <span className="text-[10px] text-blue-600 font-extrabold mt-1 block bg-blue-50 py-0.5 px-2 rounded-full w-max mx-auto">
                        เหลือ {p.probationPeriod.remainingDays} วัน
                      </span>
                    </td>

                    {/* Volunteer hours */}
                    <td className="py-4 px-4">
                      <div className="max-w-[120px] mx-auto space-y-1 text-center">
                        <span className="text-xs font-black text-slate-700">{p.completedHours} / {p.requiredHours} ชม.</span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full" 
                            style={{ width: `${Math.min(100, (p.completedHours / p.requiredHours) * 100)}%` }} 
                          />
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold">
                          คิดเป็น {Math.round((p.completedHours / p.requiredHours) * 100)}%
                        </span>
                      </div>
                    </td>

                    {/* Behavior score */}
                    <td className="py-4 px-4 text-center">
                      <div className="space-y-0.5">
                        <span className="text-base font-black text-slate-800">{p.behaviorScore}</span>
                        <span className="text-[9.5px] font-bold text-slate-400">/ 100</span>
                        <span className={`text-[9.5px] font-black block ${scoreColor}`}>{scoreTag}</span>
                      </div>
                    </td>

                    {/* Drug test status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg border ${drugBg} inline-block`}>
                        {drugLabel}
                      </span>
                    </td>

                    {/* Actions button */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedProbationer(p)}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-1.5 px-2.5 rounded-lg text-[10.5px] font-bold transition-all shadow-sm"
                        >
                          ดูรายละเอียด
                        </button>
                        <button
                          onClick={() => handleOpenScoreModal(p)}
                          className="bg-blue-600 hover:bg-blue-500 text-white py-1.5 px-2.5 rounded-lg text-[10.5px] font-bold transition-all shadow-sm"
                        >
                          บันทึกพฤติกรรม
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Detail Case Probationer Profile modal */}
      {selectedProbationer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative border border-slate-100 animate-fade-in space-y-5 max-h-[92vh] overflow-y-auto">
            
            {/* Header info modal */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedProbationer.avatarUrl}
                  alt={selectedProbationer.name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <h3 className="text-base font-black text-[#0f2d59]">{selectedProbationer.name}</h3>
                  <span className="text-[11px] text-slate-400 font-bold block">รหัสทะเบียนคุมประพฤติ: {selectedProbationer.id}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
                    สถานะ: {selectedProbationer.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedProbationer(null);
                  setDiaryContent("");
                }}
                className="text-slate-400 hover:text-slate-600 text-base font-bold bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid Detail Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">ข้อมูลส่วนบุคคล</span>
                <p>อายุ: <span className="font-medium text-slate-600">{selectedProbationer.age} ปี</span></p>
                <p>เลขบัตรประจำตัว: <span className="font-mono font-semibold text-slate-600">1-2345-67890-12-3</span></p>
                <p>เบอร์ติดต่อ: <span className="font-mono font-medium text-slate-600">081-234-5678</span></p>
                <p>ที่อยู่: <span className="font-medium text-slate-600">จ.สงขลา</span></p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">รายละเอียดทางคดีหลัก</span>
                <p>ศาลวินิจฉัย: <span className="font-medium text-slate-600">ศาลแขวงสงขลา / ศาลจังหวัดสงขลา</span></p>
                <p>เลขที่คดีแดง: <span className="font-mono text-slate-600">อ.1234/2567</span></p>
                <p>ข้อหาฟ้อง: <span className="font-medium text-slate-600 line-clamp-2">{selectedProbationer.charge}</span></p>
              </div>
            </div>

            {/* Sentence conditions list mockup */}
            <div className="space-y-2">
              <span className="text-xs font-black text-[#0f2d59] block">เงื่อนไขการคุมประพฤติและวินัยความมั่นคง</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg">
                  <span className="text-emerald-600 font-bold text-xs">✔</span>
                  <span>รายงานตัว 12 ครั้งใน 1 ปี</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg">
                  <span className="text-emerald-600 font-bold text-xs">✔</span>
                  <span>งานอาสา {selectedProbationer.requiredHours} ชั่วโมง</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg">
                  <span className="text-emerald-600 font-bold text-xs">✔</span>
                  <span>สุ่มตรวจปัสสาวะสม่ำเสมอ</span>
                </div>
              </div>
            </div>

            {/* Diary / Daily Observation Note for Officer */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0f2d59] flex items-center gap-1.5">
                  <span className="text-sm">📝</span> อนุทินการบันทึกสังเกตการณ์รายวัน (Probation Daily Diary)
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  AUTO TIMESTAMPED
                </span>
              </div>

              {/* List of notes */}
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {observationNotes.filter(note => note.probationerId === selectedProbationer.id).length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic text-center py-6 bg-slate-50 rounded-2xl">
                    ยังไม่มีบันทึกการสังเกตการณ์พฤติกรรมสำหรับบุคคลนี้
                  </p>
                ) : (
                  observationNotes
                    .filter(note => note.probationerId === selectedProbationer.id)
                    .map((note) => (
                      <div key={note.id} className="bg-slate-50 p-3 rounded-xl space-y-1.5 border border-slate-100">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                          <span className="text-blue-900 font-black flex items-center gap-1">
                            👤 {note.officerName}
                          </span>
                          <span className="font-mono text-slate-500">📅 {note.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {note.content}
                        </p>
                      </div>
                    ))
                )}
              </div>

              {/* Form to add note */}
              <div className="space-y-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                <textarea
                  value={diaryContent}
                  onChange={(e) => setDiaryContent(e.target.value)}
                  placeholder="กรอกบันทึกสังเกตการณ์สั้นๆ เช่น พฤติกรรม ทัศนคติ อุปสรรค ความร่วมมือ หรือข้อเสนอแนะเพิ่มเติม..."
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none resize-none font-medium h-16"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (!diaryContent.trim()) return;
                      addObservationNote(selectedProbationer.id, diaryContent);
                      setDiaryContent("");
                    }}
                    disabled={!diaryContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold text-[10.5px] py-1.5 px-4 rounded-lg shadow-sm transition-all flex items-center gap-1"
                  >
                    <span>➕</span> เพิ่มบันทึกสังเกตการณ์ออโต้ไทม์สแตมป์
                  </button>
                </div>
              </div>
            </div>

            {/* Close button */}
            <div className="flex items-center justify-end border-t border-slate-100 pt-3">
              <button
                onClick={() => {
                  setSelectedProbationer(null);
                  setDiaryContent("");
                }}
                className="bg-[#0f2d59] hover:bg-blue-900 text-white font-bold text-xs py-2 px-5 rounded-xl shadow-md transition-all"
              >
                ปิดแฟ้มประวัติ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Scoring editor Behavior Score */}
      {showScoreModal && scoringUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-black text-[#0f2d59]">แก้ไขคะแนนพฤติกรรม</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-bold">
                ชื่อผู้ประเมิน: นาย {scoringUser.name}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">คะแนนปัจจุบัน:</span>
                <span className="text-sm font-black text-slate-800">{scoringUser.behaviorScore} คะแนน</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block">ระบุคะแนนความประพฤติใหม่ (0 - 100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newScore}
                  onChange={(e) => setNewScore(parseInt(e.target.value) || 0)}
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-extrabold focus:bg-white focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Actions modal buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2 text-xs font-bold">
              <button
                onClick={() => setShowScoreModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveScore}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl shadow-md transition-all"
              >
                บันทึกคะแนน
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
