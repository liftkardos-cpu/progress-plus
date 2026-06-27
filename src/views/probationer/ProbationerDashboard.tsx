import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { GovBanner } from "../../components/GovBanner";
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  Shield, 
  FileText, 
  Star, 
  ArrowRight, 
  Activity, 
  Bell, 
  Briefcase, 
  MessageSquare, 
  MapPin, 
  HeartHandshake, 
  FolderOpen,
  Bot,
  RefreshCw,
  Award,
  ChevronRight,
  Sparkles,
  Search,
  BookOpen,
  Loader2
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export const ProbationerDashboard: React.FC = () => {
  const { probationerProfile, activities, appointments, setCurrentView, addEmergencyRequest } = useApp();

  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [sosReason, setSosReason] = useState("พาหนะเดินทางชำรุดเสียหาย");
  const [sosDetails, setSosDetails] = useState("");
  const [isSosSubmitting, setIsSosSubmitting] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);

  // Helper to format Thai dates
  const formatThaiDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        const thaiMonths = [
          "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
          "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const thaiYear = year + 543;
        return `${day} ${thaiMonths[month - 1]} ${thaiYear}`;
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  // 1. Next Appointment Calculation
  const myAppointments = appointments.filter(
    a => a.probationerId === probationerProfile.id || a.probationerId.replace("PB-", "") === probationerProfile.id.replace("PB-", "")
  );
  const nextAppointment = myAppointments.find(a => a.status === "ยืนยันแล้ว" || a.status === "รอยืนยัน") || myAppointments[0];

  const rawIdNum = parseInt(probationerProfile.id.replace(/\D/g, "")) || 0;
  const offsetDays = (rawIdNum % 20) + 3; // between 3 and 22 days from current date
  
  const baseDate = new Date("2026-06-27");
  baseDate.setDate(baseDate.getDate() + offsetDays);
  
  const autoDateStr = baseDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const autoTimeStr = `${String(8 + (rawIdNum % 4)).padStart(2, "0")}:${(rawIdNum % 2) === 0 ? "30" : "00"}`;
  
  const finalAppointment = nextAppointment || {
    id: `auto-apt-${probationerProfile.id}`,
    probationerId: probationerProfile.id,
    probationerName: probationerProfile.name,
    type: "นัดรายงานตัว",
    date: autoDateStr,
    time: autoTimeStr,
    status: "ยืนยันแล้ว"
  };

  const getDaysRemaining = (targetDateStr: string) => {
    try {
      const target = new Date(targetDateStr);
      const current = new Date("2026-06-27");
      const diffTime = target.getTime() - current.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (e) {
      return offsetDays;
    }
  };

  const remainingDays = getDaysRemaining(finalAppointment.date);

  // Graph data representing hour progression dynamically mapped to completedHours
  const H = probationerProfile.completedHours;
  const chartData = [
    { name: "ม.ค.", hours: Math.round(H * 0.15) },
    { name: "ก.พ.", hours: Math.round(H * 0.35) },
    { name: "มี.ค.", hours: Math.round(H * 0.55) },
    { name: "เม.ย.", hours: Math.round(H * 0.75) },
    { name: "พ.ค.", hours: Math.round(H * 0.90) },
    { name: "มิ.ย.", hours: H },
    { name: "ก.ค.", hours: H }
  ];

  const hoursPct = Math.round((probationerProfile.completedHours / probationerProfile.requiredHours) * 100) || 0;

  // Activities Logic
  const userActivities = activities.filter(act => 
    act.applicants.some(app => app.probationerId === probationerProfile.id || app.probationerId.replace("PB-", "") === probationerProfile.id.replace("PB-", ""))
  );
  
  const completedCount = userActivities.filter(act => 
    act.applicants.some(app => (app.probationerId === probationerProfile.id || app.probationerId.replace("PB-", "") === probationerProfile.id.replace("PB-", "")) && app.status === "เสร็จสิ้น")
  ).length;
  
  const totalActivities = Math.max(probationerProfile.totalActivities, userActivities.length);
  const displayCompleted = completedCount > 0 ? completedCount : Math.max(0, totalActivities - 1);
  const displayPending = totalActivities - displayCompleted;

  let displayActivities: any[] = userActivities.map(act => {
    const applicant = act.applicants.find(app => app.probationerId === probationerProfile.id || app.probationerId.replace("PB-", "") === probationerProfile.id.replace("PB-", ""));
    return {
      title: act.title,
      location: act.location,
      date: act.date,
      hours: act.hours,
      status: applicant?.status || "เสร็จสิ้น",
      category: act.category
    };
  });

  if (displayActivities.length === 0) {
    const mockTemplates = [
      { title: "จัดระเบียบห้องสมุดโรงเรียน", location: "โรงเรียนวัดบ่อยาง", category: "โรงเรียน/การศึกษา", hours: 4 },
      { title: "ทาสีรั้วกั้นทางจราจรชุมชน", location: "ชุมชนเทศบาลเมืองสงขลา", category: "เทศบาล/ชุมชน", hours: 6 },
      { title: "บำเพ็ญล้างทำความสะอาดวิหาร", location: "วัดเขารูปช้าง", category: "วัด/ศาสนสถาน", hours: 4 },
      { title: "ปลูกป่าชายเลนเฉลิมพระเกียรติ", location: "ชายฝั่งเก้าเส้ง", category: "สิ่งแวดล้อม", hours: 8 },
      { title: "จัดเตรียมสถานที่งานประเพณี", location: "สวนสาธารณะสงขลา", category: "สาธารณประโยชน์", hours: 6 },
      { title: "ช่วยงานคัดแยกขยะชุมชน", location: "ชุมชนสวนหมาก", category: "สาธารณประโยชน์", hours: 4 }
    ];

    let currentSum = 0;
    const targetHours = probationerProfile.completedHours;
    const startIdx = rawIdNum % mockTemplates.length;
    
    for (let i = 0; i < mockTemplates.length; i++) {
      const template = mockTemplates[(startIdx + i) % mockTemplates.length];
      if (currentSum + template.hours <= targetHours) {
        displayActivities.push({
          title: template.title,
          location: template.location,
          date: `2026-05-${String(28 - i * 4).padStart(2, "0")}`,
          hours: template.hours,
          status: "เสร็จสิ้น",
          category: template.category
        });
        currentSum += template.hours;
      }
    }
    
    if (currentSum < targetHours) {
      displayActivities.push({
        title: "กิจกรรมบำเพ็ญประโยชน์ทั่วไป",
        location: "สำนักงานคุมประพฤติจังหวัดสงขลา",
        date: "2026-04-10",
        hours: targetHours - currentSum,
        status: "เสร็จสิ้น",
        category: "สาธารณประโยชน์"
      });
    }
  }

  // Conduct Star Calculation
  const conductStars = Math.round(probationerProfile.behaviorScore / 20) || 0;

  const handleQuickAccess = (id: string) => {
    setCurrentView(id);
  };

  return (
    <div className="space-y-6 font-sans bg-slate-50/50 p-1 rounded-3xl">
      
      {/* 1. Header Grid: Personal Identity & Upcoming Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Personal Identity Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#061e3d] via-[#092c5c] to-[#041226] text-white p-6 rounded-3xl shadow-xl border border-blue-950 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          {/* Subtle curved glow effects */}
          <div className="absolute top-[-50%] right-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-55%] left-[-10%] w-72 h-72 bg-blue-400/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center space-x-5 relative z-10">
            <div className="relative">
              <img
                src={probationerProfile.avatarUrl || `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="p_default" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#p_default)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="\'Sarabun\', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">👤</text></svg>')}`}
                alt={probationerProfile.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md"
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-lg border-2 border-[#092c5c]">
                <CheckCircle className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-blue-400 tracking-wider">สวัสดีครับ</span>
              </div>
              <h2 className="text-xl font-black text-white flex items-center space-x-2 mt-0.5">
                <span>{probationerProfile.name}</span>
                <span className="text-xs font-bold text-amber-500">★ {(probationerProfile.behaviorScore / 20).toFixed(1)}</span>
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2 text-slate-300">
                <p className="text-xs flex items-center space-x-1.5">
                  <span className="text-slate-400">รหัสผู้ถูกคุมประพฤติ:</span>
                  <span className="font-mono font-bold text-amber-400 flex items-center space-x-1">
                    <span>{probationerProfile.id}</span>
                    <RefreshCw className="w-3 h-3 text-slate-400 cursor-pointer hover:rotate-45 transition-transform" />
                  </span>
                </p>
                <span className="text-slate-500">|</span>
                <p className="text-xs">
                  <span className="text-slate-400">คดี:</span> <span className="font-semibold text-white">{probationerProfile.charge}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2 relative z-10">
            <span className={`border text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 ${
              probationerProfile.status === "เฝ้าระวังพิเศษ"
                ? "bg-rose-500/25 border-rose-500/40 text-rose-300"
                : probationerProfile.status === "ใกล้ครบกำหนด"
                ? "bg-amber-500/25 border-amber-500/40 text-amber-300"
                : "bg-emerald-500/25 border-emerald-500/40 text-emerald-300"
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                probationerProfile.status === "เฝ้าระวังพิเศษ"
                  ? "bg-rose-400"
                  : probationerProfile.status === "ใกล้ครบกำหนด"
                  ? "bg-amber-400"
                  : "bg-emerald-400"
              }`} />
              <span>{probationerProfile.status === "เฝ้าระวังพิเศษ" ? "เฝ้าระวังพิเศษ" : probationerProfile.status === "ใกล้ครบกำหนด" ? "ใกล้พ้นกำหนด" : "อยู่ระหว่างคุมประพฤติ"}</span>
            </span>
            <button 
              onClick={() => setCurrentView("PROFILE")}
              className="bg-white/10 hover:bg-white text-white hover:text-slate-900 py-2 px-4 rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center space-x-1 shadow-sm"
            >
              <span>ข้อมูลประวัติคดี</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Report Date Notification Card */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-wider block">นัดหมายรายงานตัวครั้งถัดไป</span>
                <h3 className="text-[16px] font-black text-slate-800 mt-0.5 leading-snug">
                  {formatThaiDate(finalAppointment.date)}
                </h3>
              </div>
            </div>
            <span className={`font-extrabold text-[10px] px-2.5 py-1 rounded-xl animate-pulse ${
              remainingDays <= 3 ? "bg-rose-500 text-white" : "bg-blue-600 text-white"
            }`}>
              {remainingDays <= 0 ? "ถึงกำหนดรายงานตัว" : `เหลืออีก ${remainingDays} วัน`}
            </span>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">เวลา {finalAppointment.time} น.</span> (สำนักงานสงขลา)
            </div>
            <button
              onClick={() => setCurrentView("ONLINE_REPORT")}
              className="text-xs text-blue-600 font-black hover:underline flex items-center space-x-0.5"
            >
              <span>รายละเอียด</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* SOS Alert Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-4.5 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-red-100 text-red-600 rounded-2xl border border-red-200 shrink-0">
            <span className="font-bold text-sm">🆘 SOS</span>
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800">ระบบติดต่อประสานงานกรณีเกิดเหตุฉุกเฉิน (SOS Emergency Call)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">เกิดปัญหาพาหนะขัดข้อง ยางระเบิด เจ็บป่วยเฉินกะทันหัน หรือภัยพิบัติระว่างทางในการรายงานตัว / บริการสังคม? ส่งสัญญาณหาพนักงานสงขลาได้ทันที</p>
          </div>
        </div>
        <button
          onClick={() => setIsSosModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2.5 px-5 rounded-2xl shadow transition-all shrink-0 animate-pulse"
        >
          ขอความช่วยเหลือฉุกเฉิน
        </button>
      </div>

      {/* 2. Six Dynamic KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* KPI 1: Accumulated Hours */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">ชั่วโมงบำเพ็ญประโยชน์</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-800 tracking-tight">{probationerProfile.completedHours} / {probationerProfile.requiredHours}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">ชั่วโมงสะสมรวม</p>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${hoursPct}%` }} />
            </div>
            <span className="text-[10px] text-blue-600 font-bold block mt-1">คืบหน้า {hoursPct}%</span>
          </div>
        </div>

        {/* KPI 2: Attended Activities */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">กิจกรรมที่เข้าร่วม</span>
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-800 tracking-tight">{totalActivities}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">กิจกรรมสะสมทั้งหมด</p>
          </div>
          <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-purple-600 font-bold bg-purple-50 py-1 px-2 rounded-lg border border-purple-100/50 w-fit">
            <span>สำเร็จ {displayCompleted} / รอดำเนินการ {displayPending}</span>
          </div>
        </div>

        {/* KPI 3: Reports Count */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">รายงานตัวทั้งหมด</span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-800 tracking-tight">{probationerProfile.completedReports}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">ครั้งที่ทำรายงานตัว</p>
          </div>
          <div className="mt-3 flex items-center space-x-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 py-1 px-2 rounded-lg border border-emerald-100/50 w-fit">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>สำเร็จ {probationerProfile.completedReports} / {probationerProfile.totalReports} ครั้ง</span>
          </div>
        </div>

        {/* KPI 4: Conduct Score */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">คะแนนความประพฤติ</span>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-800 tracking-tight">{probationerProfile.behaviorScore}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">คะแนนเต็ม 100</p>
          </div>
          <div className="mt-3 flex items-center space-x-0.5">
            {[...Array(5)].map((_, idx) => (
              <Star 
                key={idx} 
                className={`w-3 h-3 ${idx < conductStars ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} 
              />
            ))}
          </div>
        </div>

        {/* KPI 5: Uploaded Files */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">เอกสารครบถ้วน</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-800 tracking-tight">{probationerProfile.documentCount} / {probationerProfile.totalDocuments}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">รายการเอกสาร</p>
          </div>
          <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-indigo-600 font-bold bg-indigo-50 py-1 px-2 rounded-lg border border-indigo-100/50 w-fit">
            <span>ค้างส่ง {Math.max(0, probationerProfile.totalDocuments - probationerProfile.documentCount)} รายการ</span>
          </div>
        </div>

        {/* KPI 6: Overall Status */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">สถานะการบำเพ็ญ</span>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className={`text-2xl font-black tracking-tight ${
              probationerProfile.status === "เฝ้าระวังพิเศษ"
                ? "text-rose-600"
                : probationerProfile.status === "ใกล้ครบกำหนด"
                ? "text-amber-600"
                : "text-emerald-600"
            }`}>{probationerProfile.status}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">สถานะพฤติกรรมรวม</p>
          </div>
          <div className="mt-3 flex items-center space-x-1 text-[10px] font-bold py-1 px-2 rounded-lg border w-fit border-emerald-100/50 bg-emerald-50 text-emerald-600">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{probationerProfile.status === "เฝ้าระวังพิเศษ" ? "เฝ้าระวังพิเศษ" : "ประวัติดีเยี่ยม"}</span>
          </div>
        </div>

      </div>

      {/* 3. Main Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Span 2: Charts and Quick Access */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Hour Tracker Chart Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-[15px] font-black text-slate-800">ความคืบหน้าชั่วโมงบำเพ็ญประโยชน์</h3>
                <p className="text-xs text-slate-500 mt-0.5">การบันทึกประวัติชั่วโมงเทียบเคียงกับเป้าหมายตามเกณฑ์ของศาล</p>
              </div>
              <div className="mt-2.5 md:mt-0 flex items-center space-x-2">
                <span className="text-xs text-blue-600 font-bold bg-blue-50 py-1 px-3 rounded-xl border border-blue-100">
                  ชั่วโมงที่ต้องการ: {probationerProfile.requiredHours} ชม.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Circular stats indicator (Left) */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Circle Background track */}
                    <path className="text-slate-200/60" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    {/* Circle Colored Progress */}
                    <path className="text-blue-600" strokeDasharray={`${hoursPct}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-800 tracking-tight">{hoursPct}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">สำเร็จ</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-extrabold text-slate-800">{probationerProfile.completedHours} / {probationerProfile.requiredHours} ชั่วโมง</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">คงเหลืออีก {Math.max(0, probationerProfile.requiredHours - probationerProfile.completedHours)} ชั่วโมง</p>
                </div>
              </div>

              {/* LineChart representation (Right - Span 2) */}
              <div className="md:col-span-2 h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, probationerProfile.requiredHours]} />
                    <Tooltip 
                      contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}
                      labelFormatter={(label) => `เดือน: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#2563eb" 
                      strokeWidth={3} 
                      dot={{ r: 4, strokeWidth: 1, fill: "#2563eb" }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setCurrentView("TRACKER")}
                className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center space-x-1"
              >
                <span>ดูประวัติการบันทึกชั่วโมงทั้งหมด</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Access Menu Options Grid */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>เมนูหลัก (Quick Access)</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Card 1: Online Report */}
              <button
                onClick={() => handleQuickAccess("ONLINE_REPORT")}
                className="p-4 rounded-2xl bg-blue-50/40 hover:bg-blue-50 border border-blue-100/50 hover:border-blue-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-blue-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-blue-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-blue-600 transition-colors">รายงานตัวออนไลน์</h4>
                  <p className="text-[10px] text-slate-400 mt-1">ส่งประวัติรายงานตัวออนไลน์</p>
                </div>
              </button>

              {/* Card 2: Volunteer Activity */}
              <button
                onClick={() => handleQuickAccess("VOLUNTEER")}
                className="p-4 rounded-2xl bg-purple-50/40 hover:bg-purple-50 border border-purple-100/50 hover:border-purple-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-purple-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-purple-500/20">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-purple-600 transition-colors">กิจกรรมบริการสังคม</h4>
                  <p className="text-[10px] text-slate-400 mt-1">ค้นหา / สมัครร่วมงานความดี</p>
                </div>
              </button>

              {/* Card 3: Hourly Tracker */}
              <button
                onClick={() => handleQuickAccess("TRACKER")}
                className="p-4 rounded-2xl bg-amber-50/40 hover:bg-amber-50 border border-amber-100/50 hover:border-amber-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-amber-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-amber-600 transition-colors">ชั่วโมงบำเพ็ญ</h4>
                  <p className="text-[10px] text-slate-400 mt-1">ตรวจคะแนนและชั่วโมงสะสม</p>
                </div>
              </button>

              {/* Card 4: Restart Job Hub */}
              <button
                onClick={() => handleQuickAccess("JOB_HUB")}
                className="p-4 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50 border border-emerald-100/50 hover:border-emerald-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-emerald-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/20">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-emerald-600 transition-colors">หางาน / ฝึกอาชีพ</h4>
                  <p className="text-[10px] text-slate-400 mt-1">งาน คอร์สอบรมวิชาชีพใหม่</p>
                </div>
              </button>

              {/* Card 5: Documents */}
              <button
                onClick={() => handleQuickAccess("DOCUMENTS")}
                className="p-4 rounded-2xl bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-100/50 hover:border-indigo-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-indigo-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-indigo-500/20">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-indigo-600 transition-colors">เอกสารของฉัน</h4>
                  <p className="text-[10px] text-slate-400 mt-1">ดูใบสั่งศาลและฟอร์มส่งตัว</p>
                </div>
              </button>

              {/* Card 6: AI Chat Assistant */}
              <button
                onClick={() => handleQuickAccess("AI_ASSISTANT")}
                className="p-4 rounded-2xl bg-cyan-50/40 hover:bg-cyan-50 border border-cyan-100/50 hover:border-cyan-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-cyan-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-cyan-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-cyan-600 transition-colors">AI Assistant</h4>
                  <p className="text-[10px] text-slate-400 mt-1">ถามตอบข้อข้องใจและนัดหมาย 24 ชม.</p>
                </div>
              </button>

              {/* Card 7: Alert Notifications */}
              <button
                onClick={() => handleQuickAccess("NOTIFICATIONS")}
                className="p-4 rounded-2xl bg-rose-50/40 hover:bg-rose-50 border border-rose-100/50 hover:border-rose-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-rose-500 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-rose-500/20">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-rose-600 transition-colors">แจ้งเตือน</h4>
                  <p className="text-[10px] text-slate-400 mt-1">จดหมายด่วนจากเจ้าหน้าที่คุมประพฤติ</p>
                </div>
              </button>

              {/* Card 8: Settings */}
              <button
                onClick={() => handleQuickAccess("SETTINGS")}
                className="p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200/50 hover:border-slate-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-slate-600 text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-slate-600/20">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-slate-700 transition-colors">ตั้งค่า</h4>
                  <p className="text-[10px] text-slate-400 mt-1">ตั้งค่าผู้ใช้งาน / ความปลอดภัย</p>
                </div>
              </button>

              {/* Card 9: Nearest Facilities Maps */}
              <button
                onClick={() => alert("📍 แสดงแผนที่สถานที่บริการสังคมและสำนักงานคุมประพฤติใกล้ตัวคุณ: คลินิกบำบัดรักษาพยาบาล, วัดสี่มุมเมือง, และสถานสงเคราะห์")}
                className="p-4 rounded-2xl bg-[#fffdf5] hover:bg-[#fffbeb] border border-amber-100/80 hover:border-amber-300 transition-all text-left flex items-start space-x-3.5 group shadow-sm active:scale-95"
              >
                <div className="p-3 bg-[#eab308] text-white rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 block group-hover:text-[#cca43b] transition-colors">สถานที่ใกล้ฉัน</h4>
                  <p className="text-[10px] text-slate-400 mt-1">แผนที่สำนักงานพิกัดบริการสังคม</p>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Right Split: Latest activity, public announcements, and messaging */}
        <div className="space-y-6">
          
          {/* Latest Participated Activities List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4.5">
              <h3 className="text-sm font-black text-slate-800">กิจกรรมบริการสังคมล่าสุด</h3>
              <button 
                onClick={() => setCurrentView("VOLUNTEER")}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                ดูทั้งหมด
              </button>
            </div>

            <div className="space-y-3.5">
              
              {displayActivities.slice(0, 4).map((act, idx) => {
                const bgClass = act.category === "วัด/ศาสนสถาน" ? "bg-amber-100 text-amber-600" :
                                act.category === "โรงเรียน/การศึกษา" ? "bg-blue-100 text-blue-600" :
                                act.category === "สิ่งแวดล้อม" ? "bg-emerald-100 text-emerald-600" :
                                "bg-purple-100 text-purple-600";
                
                return (
                  <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-2xl flex items-center justify-between transition-colors">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgClass}`}>
                        {act.category === "วัด/ศาสนสถาน" ? <Sparkles className="w-5 h-5" /> :
                         act.category === "โรงเรียน/การศึกษา" ? <BookOpen className="w-5 h-5" /> :
                         <HeartHandshake className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-extrabold text-slate-800 truncate">{act.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{act.location} ({formatThaiDate(act.date)})</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        act.status === "เสร็จสิ้น" ? "bg-emerald-100 text-emerald-800" :
                        act.status === "อนุมัติแล้ว" || act.status === "เช็กอินแล้ว" ? "bg-blue-100 text-blue-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {act.status}
                      </span>
                      <p className="text-xs font-black text-slate-700 mt-1 font-mono">{act.hours} ชม.</p>
                    </div>
                  </div>
                );
              })}
              {displayActivities.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-400">ยังไม่มีประวัติกิจกรรมบริการสังคม</p>
                </div>
              )}

            </div>
          </div>

          {/* Department Announcements / News Feed */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full block" />
              <span>ประกาศประชาสัมพันธ์</span>
            </h3>

            <div className="space-y-4">
              
              {/* News Item 1 */}
              <div className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-[#d97706] bg-[#fef3c7] px-2 py-0.5 rounded-lg border border-amber-200">กิจกรรมใหม่</span>
                  <span className="text-[10px] text-slate-400 font-medium">12 พ.ค. 2567</span>
                </div>
                <p className="text-xs font-bold text-slate-800 hover:text-blue-600 cursor-pointer mt-1.5 leading-snug">
                  เปิดลงทะเบียนบำเพ็ญร่วมสร้างสรรค์เพื่อสวัสดิภาพสัตว์ คอกสุนัขบวช
                </p>
              </div>

              {/* News Item 2 */}
              <div className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded-lg border border-blue-200">ข่าวจัดหางาน</span>
                  <span className="text-[10px] text-slate-400 font-medium">10 พ.ค. 2567</span>
                </div>
                <p className="text-xs font-bold text-slate-800 hover:text-blue-600 cursor-pointer mt-1.5 leading-snug">
                  รับสมัครผู้คุมความประพฤติฝึกเตรียมเข้าทำงานโรงงานฝ่ายจัดส่งสินค้าอาหารแปรรูป
                </p>
              </div>

              {/* News Item 3 */}
              <div className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg border border-red-200">ด่วนพิเศษ</span>
                  <span className="text-[10px] text-slate-400 font-medium">08 พ.ค. 2567</span>
                </div>
                <p className="text-xs font-bold text-slate-800 hover:text-blue-600 cursor-pointer mt-1.5 leading-snug">
                  กำหนดส่งส่งใบรับรองเอกสารรายงานตัวพฤติกรรมการบำเพ็ญภายในสัปดาห์นี้
                </p>
              </div>

            </div>
          </div>

          {/* Real-time Notifications List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4.5">
              <h3 className="text-sm font-black text-slate-800">การแจ้งเตือนล่าสุด</h3>
              <button 
                onClick={() => setCurrentView("NOTIFICATIONS")}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                ดูทั้งหมด
              </button>
            </div>

            <div className="space-y-3.5">
              
              {/* Notification 1 */}
              <div className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-normal">เตือนนัดหมายรายงานตัววันที่ 20 พฤษภาคม 2567 ณ สำนักงานคุมประพฤติ</p>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">2 วันที่ผ่านมา</span>
                </div>
              </div>

              {/* Notification 2 */}
              <div className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-normal">อนุมัติการสมัครเข้าร่วมกิจกรรม "จัดระเบียบห้องสมุดโรงเรียนประชารัฐ"</p>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">1 วันที่ผ่านมา</span>
                </div>
              </div>

              {/* Notification 3 */}
              <div className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-normal">เอกสารรับรองคุณวุฒิการสมัครฝึกอาชีพยังว่าง กรุณาดาวน์โหลดแล้วยื่นส่ง</p>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">3 วันที่ผ่านมา</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4. Gov quote Banner */}
      <GovBanner />

      {/* SOS Emergency Modal Overlay */}
      {isSosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-red-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="text-xl">🆘</span>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider">ขอความช่วยเหลือกรณีจำเป็นเร่งด่วน (SOS)</h3>
                  <p className="text-[10px] text-red-100 mt-0.5 font-medium">ส่งสัญญาณด่วนพร้อมพิกัดดาวเทียมไปยังเจ้าหน้าที่จังหวัดสงขลา</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSosModalOpen(false);
                  setSosSuccess(false);
                  setSosDetails("");
                }}
                className="text-white hover:text-red-200 text-xs font-black cursor-pointer"
              >
                ✕ ปิด
              </button>
            </div>

            {/* Modal Body */}
            {!sosSuccess ? (
              <div className="p-6 space-y-4">
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700">ระบุสาเหตุ / ปัญหาความขัดข้องหลัก:</label>
                  <select
                    value={sosReason}
                    onChange={(e) => setSosReason(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/30 text-slate-800 font-bold"
                  >
                    <option value="พาหนะเดินทางชำรุดเสียหาย">🚗 พาหนะเดินทางชำรุดเสียหาย (ยางระเบิด/เครื่องดับ)</option>
                    <option value="เจ็บป่วยฉุกเฉินกะทันหัน">🏥 เจ็บป่วยฉุกเฉินกะทันหัน / ประสบอุบัติเหตุส่วนบุคคล</option>
                    <option value="เกิดภัยพิบัติธรรมชาติ / อุทกภัย">⛈️ เกิดภัยพิบัติธรรมชาติ / อุทกภัยน้ำท่วมเฉียบพลัน</option>
                    <option value="ปัญหาความไม่ปลอดภัยในครอบครัว">🏠 ปัญหาความไม่ปลอดภัย / เหตุจำเป็นเร่งด่วนอื่นๆ</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700">รายละเอียดสถานการณ์ / สถานที่เกิดเหตุ:</label>
                  <textarea
                    required
                    rows={4}
                    value={sosDetails}
                    onChange={(e) => setSosDetails(e.target.value)}
                    placeholder="อธิบายปัญหาและสิ่งที่ต้องการให้เจ้าหน้าที่ประสานช่วยเหลือ เช่น 'รถมอเตอร์ไซค์โซ่ขาดขณะจะเดินทางไปวัดเขารูปช้างเพื่อทำกิจกรรมอาสา'"
                    className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-red-500/30 text-slate-800 font-semibold leading-relaxed"
                  />
                </div>

                {/* Geolocation check inside modal */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-slate-600">พิกัดดาวเทียมเพื่อยืนยันพ้นทัณฑ์บน:</span>
                  </div>
                  <span className="font-mono text-slate-800 bg-white border border-slate-100 py-1 px-2.5 rounded-lg shadow-sm">
                    7.1824° N, 100.5960° E
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsSosModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    disabled={!sosDetails || isSosSubmitting}
                    onClick={() => {
                      setIsSosSubmitting(true);
                      setTimeout(() => {
                        addEmergencyRequest(sosReason, sosDetails, 7.1824, 100.5960);
                        setIsSosSubmitting(false);
                        setSosSuccess(true);
                      }, 1200);
                    }}
                    className={`text-xs font-black py-2 px-5 rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer ${
                      sosDetails && !isSosSubmitting
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {isSosSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>กำลังยื่น SOS...</span>
                      </>
                    ) : (
                      <span>ส่งสัญญาณช่วยเหลือเร่งด่วน</span>
                    )}
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center space-y-5">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto text-xl shadow-inner border border-red-200 animate-bounce">
                  🚨
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800">ส่งสัญญาณขอความช่วยเหลือสำเร็จ!</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    สัญญาณ SOS พร้อมพิกัดดาวเทียมสงขลา อธิบายความเดือดร้อนของคุณ ได้รับการยิงข้อมูลเข้าสู่หน้าแดชบอร์ดเจ้าหน้าที่เรียบร้อยแล้ว พนักงานคุมประพฤติจะรีบติดต่อกลับโดยเร็วที่สุด
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setIsSosModalOpen(false);
                    setSosSuccess(false);
                    setSosDetails("");
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-6 rounded-xl text-xs font-black transition-all shadow"
                >
                  รับทราบและปิดหน้านี้
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
