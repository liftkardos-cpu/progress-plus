import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { UserRole } from "../types";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Users, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  Calendar, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  ClipboardCheck,
  CheckCircle2,
  Building,
  Key
} from "lucide-react";

export const LoginView: React.FC = () => {
  const { setRole, setIsLoggedIn, addNotification } = useApp();
  const [selectedTab, setSelectedTab] = useState<UserRole>("PROBATIONER");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isDemoOpen, setIsDemoOpen] = useState(true);

  // Auto-fill mock login details for demonstration
  const handleSimulateLogin = (role: UserRole, email: string, pass: string) => {
    setSelectedTab(role);
    setUsername(email);
    setPassword(pass);
    addNotification(
      `จำลองบัญชีผู้ใช้สำเร็จ`,
      `กรอกอีเมลสาธิตและสลับระบบไปยังบทบาท "${
        role === "PROBATIONER" ? "ผู้ถูกคุมประพฤติ" : role === "OFFICER" ? "เจ้าหน้าที่" : "หน่วยงานภาคี"
      }" เรียบร้อยแล้ว`,
      "ระบบ"
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setRole(selectedTab);
    setIsLoggedIn(true);
    addNotification(
      "เข้าสู่ระบบสำเร็จ",
      `ยินดีต้อนรับเข้าสู่ระบบ SMART PROBATION ECOSYSTEM`,
      "ระบบ"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf5fc] via-[#f4fafe] to-[#e4f2fd] flex flex-col justify-between font-sans relative overflow-x-hidden select-none">
      
      {/* 🛠️ DEMO ACCOUNTS PANEL (floating at the top) */}
      {isDemoOpen && (
        <div className="relative z-50 bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex flex-col md:flex-row items-center justify-between text-xs text-amber-900 gap-2 backdrop-blur-md">
          <div className="flex items-center space-x-2 font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>🛠️ แผงจำลองบัญชีผู้ใช้สำหรับทดสอบ (Demo Accounts Simulation) — คลิกเพื่อจำลองอีเมลและรหัสผ่านทั้ง 3 ฝั่งได้ทันที</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {/* 1. Probationer Demo */}
            <button
              onClick={() => handleSimulateLogin("PROBATIONER", "somchai.jaidee@email.com", "somchai123")}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                selectedTab === "PROBATIONER"
                  ? "bg-[#1b439c] text-white border-blue-600 shadow-sm"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              1. ผู้ถูกคุมประพฤติ
            </button>

            {/* 2. Officer Demo */}
            <button
              onClick={() => handleSimulateLogin("OFFICER", "nattapong.officer@probation.go.th", "officer123")}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                selectedTab === "OFFICER"
                  ? "bg-blue-700 text-white border-blue-600 shadow-sm"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              2. เจ้าหน้าที่
            </button>

            {/* 3. Partner Demo */}
            <button
              onClick={() => handleSimulateLogin("PARTNER", "hatyai.partner@hatyai.go.th", "partner123")}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                selectedTab === "PARTNER"
                  ? "bg-emerald-700 text-white border-emerald-600 shadow-sm"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              3. หน่วยงานภาคี
            </button>

            {/* Close button */}
            <button
              onClick={() => setIsDemoOpen(false)}
              className="text-amber-700 hover:text-amber-900 ml-2 font-bold text-xs hover:underline cursor-pointer"
            >
              ซ่อนแผง
            </button>
          </div>
        </div>
      )}

      {/* Main Container - Skyline & Justice background element */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:px-10 flex flex-col justify-center relative z-10">
        
        {/* Responsive Grid System: Left branding (7 cols), Right form (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* =============================================================
              LEFT SIDE: BRANDING, BRIDGE GRAPHICS, AND STATS PANELS
              ============================================================= */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
            
            {/* Top Thai Government Seal and department names */}
            <div className="flex items-center space-x-3.5">
              {/* High fidelity SVG of Department of Probation Emblem */}
              <div className="w-14 h-14 shrink-0 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full select-none">
                  <circle cx="50" cy="50" r="48" fill="#1e3a8a" stroke="#d97706" strokeWidth="2.5" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,2" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#d97706" strokeWidth="1.5" />
                  {/* Thai Sacred Emblem (Trisula & Scales representation) */}
                  <path d="M50 18 C50 18, 56 32, 56 42 C56 50, 50 54, 50 54 C50 54, 44 50, 44 42 C44 32, 50 18, 50 18 Z" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                  <path d="M50 25 C50 25, 53 34, 53 41 C53 46, 50 49, 50 49 C50 49, 47 46, 47 41 C47 34, 50 25, 50 25 Z" fill="#d97706" />
                  {/* Scales base inside the circle */}
                  <path d="M30 65 L70 65 M50 54 L50 78 M35 78 L65 78" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  {/* Wings of justice */}
                  <path d="M30 45 Q40 45 44 42 Q40 50 30 52 Z" fill="#d97706" stroke="#ffffff" strokeWidth="1" />
                  <path d="M70 45 Q60 45 56 42 Q60 50 70 52 Z" fill="#d97706" stroke="#ffffff" strokeWidth="1" />
                  <path d="M22 72 Q50 82 78 72" fill="none" stroke="#ffffff" strokeWidth="1" />
                </svg>
              </div>
              
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold tracking-tight text-slate-800 leading-tight">กรมคุมประพฤติ</h3>
                <p className="text-[10px] font-bold tracking-widest text-blue-800 uppercase font-mono">DEPARTMENT OF PROBATION</p>
              </div>
            </div>

            {/* Heading Titles */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-black text-[#031d44] tracking-tight leading-none uppercase">
                SMART PROBATION
                <span className="block mt-1">ECOSYSTEM</span>
              </h1>
              <p className="text-sm font-medium text-slate-700">
                ระบบบริหารงานคุมประพฤติอัจฉริยะ เพื่อการฟื้นฟูและคืนคนดีสู่สังคม
              </p>
            </div>

            {/* Motivational Quote & Bridge/Scales Illustration */}
            <div className="relative py-4">
              
              {/* Quote container */}
              <div className="text-center bg-white/45 backdrop-blur-sm border border-white/40 py-4 px-6 rounded-2xl shadow-sm max-w-lg mx-auto relative z-20">
                <p className="text-slate-700 text-sm font-semibold">
                  “ โอกาสคือการเริ่มต้นใหม่ เราเชื่อว่า...<span className="text-blue-600 font-extrabold">คุณทำได้</span> ”
                </p>
              </div>

              {/* Spectacular Bridge Background Graphic */}
              <div className="w-full h-44 relative mt-4 overflow-hidden rounded-3xl flex items-end justify-center pointer-events-none select-none">
                
                {/* Glowing radial background represent solar light */}
                <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl z-0" />
                
                {/* Scales of justice in the background */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-0 opacity-25">
                  <svg viewBox="0 0 200 200" className="w-40 h-40 text-blue-900 fill-none stroke-current" strokeWidth="3" strokeLinecap="round">
                    <path d="M70 180 L130 180 M90 180 L90 170 L110 170 L110 180" />
                    <path d="M100 170 L100 40" strokeWidth="4" />
                    <circle cx="100" cy="35" r="6" fill="currentColor" />
                    <path d="M40 60 Q100 55 160 60" strokeWidth="4" />
                    <path d="M40 60 L25 110 M40 60 L55 110" strokeWidth="1.5" />
                    <path d="M160 60 L145 110 M160 60 L175 110" strokeWidth="1.5" />
                    <path d="M20 110 Q40 120 60 110 Z" fill="currentColor" opacity="0.3" />
                    <path d="M140 110 Q160 120 180 110 Z" fill="currentColor" opacity="0.3" />
                  </svg>
                </div>

                {/* Suspension bridge arch wires and path */}
                <div className="absolute bottom-0 w-full h-24 z-10 opacity-70">
                  <svg viewBox="0 0 600 100" className="w-full h-full text-blue-500 fill-none stroke-current" strokeWidth="1.5">
                    <path d="M0,90 Q300,10 600,90" />
                    <path d="M0,95 Q300,30 600,95" />
                    {/* Bridge vertical cords */}
                    <line x1="100" y1="80" x2="100" y2="92" />
                    <line x1="200" y1="52" x2="200" y2="94" />
                    <line x1="300" y1="42" x2="300" y2="95" />
                    <line x1="400" y1="52" x2="400" y2="94" />
                    <line x1="500" y1="80" x2="500" y2="92" />
                  </svg>
                </div>

                {/* Road surface gradient */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-sky-200/50 to-transparent z-10 border-b border-sky-300/30" />

                {/* 5 Silhouettes of people walking towards the future */}
                <div className="flex items-end justify-center space-x-6 pb-2 relative z-20">
                  {/* Person 1 */}
                  <div className="w-3.5 h-10 bg-slate-800 rounded-t-full relative opacity-85 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-slate-800 rounded-full absolute -top-3.5 left-1/2 -translate-x-1/2" />
                  </div>
                  {/* Person 2 */}
                  <div className="w-4 h-12 bg-slate-800 rounded-t-full relative opacity-90 shadow-sm">
                    <div className="w-3 h-3 bg-slate-800 rounded-full absolute -top-4 left-1/2 -translate-x-1/2" />
                  </div>
                  {/* Person 3 (center) */}
                  <div className="w-4 h-14 bg-[#1b439c] rounded-t-full relative opacity-100 shadow-md">
                    <div className="w-3 h-3 bg-[#1b439c] rounded-full absolute -top-4 left-1/2 -translate-x-1/2" />
                  </div>
                  {/* Person 4 */}
                  <div className="w-3.5 h-11 bg-slate-800 rounded-t-full relative opacity-85 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-slate-800 rounded-full absolute -top-3.5 left-1/2 -translate-x-1/2" />
                  </div>
                  {/* Person 5 */}
                  <div className="w-3.5 h-9 bg-slate-800 rounded-t-full relative opacity-80 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-slate-800 rounded-full absolute -top-3 left-1/2 -translate-x-1/2" />
                  </div>
                </div>

              </div>
            </div>

            {/* 1. Translucent Connected Parties Card ("ระบบที่เชื่อมโยงทุกภาคส่วน") */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider pl-1">
                ระบบที่เชื่อมโยงทุกภาคส่วน
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Item 1: ผู้ถูกคุมประพฤติ */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">ผู้ถูกคุมประพฤติ</span>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    ติดตามประพฤติ รายงานตัว และพัฒนาตนเอง
                  </p>
                </div>

                {/* Item 2: เจ้าหน้าที่ */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    {/* High fidelity SVG of officer peak cap */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600 fill-current">
                      <path d="M12 2C8 2 4 5 4 8c0 0 3 0 4-1 .5-.5 1-1.5 4-1.5s3.5 1 4 1.5c1 1 4 1 4 1 0-3-4-6-8-6z" />
                      <path d="M4 9c0 .5.5 1 1 1h14c.5 0 1-.5 1-1H4z" opacity="0.8" />
                      <path d="M5 11c0 3 2.5 6 7 6s7-3 7-6H5z" opacity="0.5" />
                      <path d="M8 18c0 1.5 1.5 3 4 3s4-1.5 4-3H8z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">เจ้าหน้าที่</span>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    บริหารจัดการ ติดตาม และประเมินผลอย่างมีประสิทธิภาพ
                  </p>
                </div>

                {/* Item 3: หน่วยงานภาคี */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">หน่วยงานภาคี</span>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    บูรณาการความร่วมมือ เพื่อการฟื้นฟูอย่างยั่งยืน
                  </p>
                </div>

                {/* Item 4: เพื่อสังคมที่ปลอดภัย */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">เพื่อสังคมที่ปลอดภัย</span>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    ลดการกระทำผิดซ้ำ สร้างคนดีคืนสู่สังคม
                  </p>
                </div>

              </div>
            </div>

            {/* 2. Translucent Stats Card ("ข้อมูลภาพรวม ( ณ วันที่ 20 พฤษภาคม 2567 )") */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider pl-1">
                ข้อมูลภาพรวม <span className="text-[10px] text-slate-500 font-medium tracking-normal">( ณ วันที่ 20 พฤษภาคม 2567 )</span>
              </h4>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                
                {/* Stat Col 1: ผู้ถูกคุมประพฤติ */}
                <div className="space-y-1 pl-1">
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-[#1b439c] shrink-0" />
                    <span className="text-[10px] text-slate-700 font-bold">ผู้ถูกคุมประพฤติทั้งหมด</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-lg font-black text-[#031d44] block">28,246 <span className="text-[11px] font-medium text-slate-600">ราย</span></span>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">↑ 9.8% จากเดือนที่ผ่านมา</span>
                  </div>
                </div>

                {/* Stat Col 2: รายงานตัววันนี้ */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <ClipboardCheck className="w-4 h-4 text-[#1b439c] shrink-0" />
                    <span className="text-[10px] text-slate-700 font-bold">รายงานตัววันนี้</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-lg font-black text-[#031d44] block">1,245 <span className="text-[11px] font-medium text-slate-600">ราย</span></span>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">↑ 15.7% จากเมื่อวาน</span>
                  </div>
                </div>

                {/* Stat Col 3: ชั่วโมงบำเพ็ญ */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#1b439c] shrink-0" />
                    <span className="text-[10px] text-slate-700 font-bold">ชั่วโมงบริการสังคมรวม</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-lg font-black text-[#031d44] block">1,245,678 <span className="text-[11px] font-medium text-slate-600">ชั่วโมง</span></span>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">↑ 12.3% จากเดือนที่ผ่านมา</span>
                  </div>
                </div>

                {/* Stat Col 4: อัตราผิดซ้ำ */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1b439c] shrink-0" />
                    <span className="text-[10px] text-slate-700 font-bold">อัตราการกระทำผิดซ้ำ</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-lg font-black text-[#031d44] block">12.45%</span>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">↓ 2.35% จากเดือนที่ผ่านมา</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* =============================================================
              RIGHT SIDE: THE MAGNIFICENT WHITE LOGIN CARD
              ============================================================= */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-xl border border-white/60 max-w-[460px] w-full space-y-6 relative z-10">
              
              {/* Form header titles */}
              <div className="text-center space-y-1.5">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">เข้าสู่ระบบ</h2>
                <p className="text-xs font-bold text-blue-800 uppercase font-mono tracking-wider">SMART PROBATION ECOSYSTEM</p>
                <p className="text-xs font-medium text-slate-400">กรุณาเข้าสู่ระบบเพื่อใช้งานระบบ</p>
              </div>

              {/* Roles switcher tabs (3 roles) */}
              <div className="grid grid-cols-3 gap-2">
                
                {/* 1. Probationer Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedTab("PROBATIONER")}
                  className={`py-3.5 px-1 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                    selectedTab === "PROBATIONER"
                      ? "bg-blue-50/50 border-blue-600 text-[#1b439c] ring-2 ring-blue-600/10"
                      : "border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white"
                  }`}
                >
                  <User className={`w-5 h-5 ${selectedTab === "PROBATIONER" ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="text-[10px] sm:text-xs font-bold">ผู้ถูกคุมประพฤติ</span>
                </button>

                {/* 2. Officer Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedTab("OFFICER")}
                  className={`py-3.5 px-1 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                    selectedTab === "OFFICER"
                      ? "bg-blue-50/50 border-blue-600 text-[#1b439c] ring-2 ring-blue-600/10"
                      : "border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white"
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center ${selectedTab === "OFFICER" ? "text-blue-600" : "text-slate-400"}`}>
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                      <path d="M12 2C8 2 4 5 4 8c0 0 3 0 4-1 .5-.5 1-1.5 4-1.5s3.5 1 4 1.5c1 1 4 1 4 1 0-3-4-6-8-6z" />
                      <path d="M4 9c0 .5.5 1 1 1h14c.5 0 1-.5 1-1H4z" opacity="0.8" />
                      <path d="M5 11c0 3 2.5 6 7 6s7-3 7-6H5z" opacity="0.5" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold">เจ้าหน้าที่</span>
                </button>

                {/* 3. Partner Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedTab("PARTNER")}
                  className={`py-3.5 px-1 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                    selectedTab === "PARTNER"
                      ? "bg-blue-50/50 border-blue-600 text-[#1b439c] ring-2 ring-blue-600/10"
                      : "border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white"
                  }`}
                >
                  <Building className={`w-5 h-5 ${selectedTab === "PARTNER" ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="text-[10px] sm:text-xs font-bold">หน่วยงานภาคี</span>
                </button>

              </div>

              {/* actual form fields */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-500">
                    เลขประจำตัวประชาชน / เลขบัตรประจำตัวเจ้าหน้าที่ / อีเมล
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        selectedTab === "PROBATIONER"
                          ? "กรอกเลขประจำตัวประชาชน 13 หลักหรืออีเมล"
                          : selectedTab === "OFFICER"
                          ? "กรอกเลขบัตรประจำตัวเจ้าหน้าที่ / อีเมล"
                          : "กรอกเลขทะเบียนหน่วยงาน / อีเมล"
                      }
                      className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] font-bold text-slate-500">
                      รหัสผ่าน
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("💡 หากท่านไม่ทราบหรือลืมรหัสผ่าน กรุณาตรวจสอบจากหนังสือแนะนำ หรือติดต่อสำนักงานคุมประพฤติสายด่วน 0 2141 4740เพื่อดำเนินการขอรหัสผ่านใหม่")}
                      className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Key className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="กรอกรหัสผ่าน"
                      className="block w-full pl-11 pr-11 py-3 border border-slate-200 rounded-2xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Remember checkbox */}
                <div className="flex items-center">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-slate-50 border border-slate-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white stroke-2 fill-none stroke-current" style={{ display: rememberMe ? "block" : "none" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="ml-2 text-xs font-bold text-slate-500 select-none">
                      จดจำฉันไว้ในระบบ
                    </span>
                  </label>
                </div>

                {/* blue Login button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white py-3 px-4 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-md shadow-blue-600/10 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>เข้าสู่ระบบ</span>
                </button>

              </form>

              {/* Or separator */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[11px] text-slate-400 font-bold uppercase">หรือ</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Alternative login methods (ThaiID / Digital ID) */}
              <div className="space-y-2.5">
                
                {/* Login with ThaiID */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab("PROBATIONER");
                    setUsername("somchai.jaidee@email.com");
                    setPassword("somchai123");
                    setRole("PROBATIONER");
                    setIsLoggedIn(true);
                    addNotification("เข้าสู่ระบบด้วย ThaiID", "การสแกนใบหน้าและเชื่อมต่อฐานข้อมูลกรมการปกครองผ่าน ThaiID สำเร็จ", "ระบบ");
                  }}
                  className="w-full border border-slate-200 hover:border-blue-600 bg-white text-slate-700 hover:text-blue-600 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2.5 shadow-xs cursor-pointer"
                >
                  {/* High fidelity ThaiID Seal vector */}
                  <div className="w-5 h-5 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="48" fill="#1e3a8a" />
                      <circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <path d="M12 35 C30 20, 70 20, 88 35 L82 45 C65 33, 35 33, 18 45 Z" fill="#ef4444" />
                      <path d="M18 45 C35 33, 65 33, 82 45 L76 55 C60 45, 40 45, 24 55 Z" fill="#ffffff" />
                      <path d="M24 55 C40 45, 60 45, 76 55 L70 65 C55 58, 45 58, 30 65 Z" fill="#1e40af" />
                      <path d="M30 65 C45 58, 55 58, 70 65 L64 75 C52 70, 48 70, 36 75 Z" fill="#ffffff" />
                      <path d="M36 75 C48 70, 52 70, 64 75 L58 85 C50 82, 50 82, 42 85 Z" fill="#ef4444" />
                      <circle cx="50" cy="50" r="14" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
                      <path d="M50 42 L50 58 M42 50 L58 50" stroke="#d97706" strokeWidth="2" />
                    </svg>
                  </div>
                  <span>เข้าสู่ระบบด้วย <span className="font-extrabold">ThaiID</span></span>
                </button>

                {/* Login with Digital ID */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab("PROBATIONER");
                    setUsername("somchai.jaidee@email.com");
                    setPassword("somchai123");
                    setRole("PROBATIONER");
                    setIsLoggedIn(true);
                    addNotification("เข้าสู่ระบบด้วย Digital ID", "การตรวจสอบอัตลักษณ์ตัวบุคคลแบบดิจิทัลสำเร็จเรียบร้อย", "ระบบ");
                  }}
                  className="w-full border border-slate-200 hover:border-emerald-600 bg-white text-slate-700 hover:text-emerald-600 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2.5 shadow-xs cursor-pointer"
                >
                  {/* High fidelity Digital ID vector */}
                  <div className="w-5 h-5 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="48" fill="#0f172a" />
                      <circle cx="50" cy="50" r="44" fill="none" stroke="#06b6d4" strokeWidth="2" />
                      <path d="M30 50 Q50 30 70 50" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
                      <path d="M25 55 Q50 20 75 55" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                      <path d="M35 45 Q50 35 65 45" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" />
                      <path d="M40 60 Q50 50 60 60" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="4" fill="#06b6d4" />
                    </svg>
                  </div>
                  <span>เข้าสู่ระบบด้วย <span className="font-extrabold">Digital ID</span></span>
                </button>

              </div>

              {/* Bottom user manual link */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => alert("📖 เปิดคู่มือการสอนใช้งานระบบสารสนเทศคุมประพฤติอัจฉริยะ (Smart Probation PDF) สำหรับประชาชนและหน่วยงานภาคีเครือข่ายเรียบร้อย")}
                  className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>คู่มือการใช้งานระบบ</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =============================================================
          FOOTER STRIP (At the very bottom, exactly like image)
          ============================================================= */}
      <div className="bg-[#031d44] text-white py-6 border-t border-blue-950 px-4 md:px-10 mt-auto select-none">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Block */}
          <div className="text-center lg:text-left">
            <h4 className="text-xs font-black tracking-wider text-slate-100 uppercase">SMART PROBATION ECOSYSTEM</h4>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider mt-0.5 uppercase">POWERED BY DEPARTMENT OF PROBATION</p>
          </div>

          {/* Center Block (Phone & Clock) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-slate-200">
            {/* Phone */}
            <div className="flex items-center space-x-2 font-medium">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block font-semibold leading-none">ติดต่อสอบถาม</span>
                <span className="font-bold">0 2141 4740</span>
              </div>
            </div>

            {/* Clock */}
            <div className="flex items-center space-x-2 font-medium">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block font-semibold leading-none">เวลาทำการ</span>
                <span className="font-bold">จันทร์ - ศุกร์ 08:30 - 16:30 น.</span>
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div className="text-center lg:text-right text-[11px] text-slate-400 font-medium">
            <span className="block font-bold text-slate-200">เวอร์ชัน 1.0.0</span>
            <span className="block mt-0.5">© 2024 Department of Probation. All Rights Reserved.</span>
          </div>

        </div>
      </div>

    </div>
  );
};
