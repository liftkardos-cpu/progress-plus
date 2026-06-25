import React from "react";
import { useApp } from "../context/AppContext";
import {
  Home,
  User,
  Clock,
  HeartHandshake,
  Calendar,
  Briefcase,
  FolderOpen,
  Bell,
  Bot,
  Settings,
  LayoutDashboard,
  Users,
  ClipboardList,
  Activity,
  ShieldAlert,
  FileText,
  Compass,
  Map,
  MessageSquare,
  Sparkles,
  LogOut,
  Headset,
  Phone,
  ChevronDown
} from "lucide-react";

export const Sidebar: React.FC<{ onClose?: () => void; className?: string }> = ({ onClose, className = "" }) => {
  const { role, currentView, setCurrentView, setIsLoggedIn, probationerProfile } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (onClose) onClose();
  };

  // Menu items config depending on selected role
  const getMenuItems = () => {
    switch (role) {
      case "PROBATIONER":
        return [
          { id: "DASHBOARD", label: "หน้าหลัก", icon: Home },
          { id: "PROFILE", label: "ข้อมูลส่วนตัว", icon: User },
          { id: "TRACKER", label: "ชั่วโมงบำเพ็ญประโยชน์", icon: Clock },
          { id: "VOLUNTEER", label: "กิจกรรมบริการสังคม", icon: HeartHandshake },
          { id: "ONLINE_REPORT", label: "รายงานตัวออนไลน์", icon: Calendar },
          { id: "JOB_HUB", label: "หางาน / ฝึกอาชีพ", icon: Briefcase },
          { id: "DOCUMENTS", label: "เอกสารของฉัน", icon: FolderOpen },
          { id: "NOTIFICATIONS", label: "ข้อความ / แจ้งเตือน", icon: Bell, badge: 3 },
          { id: "AI_ASSISTANT", label: "AI Assistant", icon: Bot },
          { id: "SETTINGS", label: "ตั้งค่า", icon: Settings }
        ];
      case "OFFICER":
        return [
          { id: "OFFICER_DASHBOARD", label: "หน้าหลัก", icon: LayoutDashboard },
          { id: "CASE_MANAGEMENT", label: "ข้อมูลผู้ถูกคุมประพฤติ", icon: Users },
          { id: "OFFICER_REPORTS", label: "รายงานตัว", icon: ClipboardList },
          { id: "APPOINTMENT_MANAGEMENT", label: "ติดตามนัดหมาย", icon: Calendar },
          { id: "VOLUNTEER_CONTROL", label: "บริการสังคม", icon: HeartHandshake },
          { id: "DRUG_TEST", label: "ตรวจดี / ตรวจสารเสพติด", icon: Activity },
          { id: "RISK_ASSESSMENT", label: "ประเมินความเสี่ยง", icon: ShieldAlert },
          { id: "ANALYTICS", label: "รายงาน", icon: FileText },
          { id: "REHABILITATION_PLAN", label: "แผนการแก้ไขฟื้นฟู", icon: Compass },
          { id: "HEAT_MAP", label: "ข้อมูลพื้นที่ (Heat Map)", icon: Map },
          { id: "SETTINGS", label: "ตั้งค่า", icon: Settings }
        ];
      case "PARTNER":
        return [
          { id: "PARTNER_DASHBOARD", label: "หน้าหลัก", icon: Home },
          { id: "ACTIVITY_MANAGEMENT", label: "กิจกรรมของหน่วยงาน", icon: Briefcase },
          { id: "APPLICANTS_MANAGEMENT", label: "ผู้สมัครเข้าร่วมกิจกรรม", icon: ClipboardList },
          { id: "PARTICIPANTS_MANAGEMENT", label: "ผู้เข้าร่วมกิจกรรม", icon: Users },
          { id: "SERVICE_HOURS", label: "ชั่วโมงบริการสังคม", icon: Clock },
          { id: "REPORTS_STATS", label: "รายงานและสถิติ", icon: FileText },
          { id: "DOCUMENTS_ANNOUNCEMENTS", label: "เอกสารและประกาศ", icon: FolderOpen },
          { id: "NOTIFICATIONS", label: "ข้อความแจ้งเตือน", icon: Bell, badge: 3 },
          { id: "SETTINGS", label: "ตั้งค่า", icon: Settings }
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`w-full lg:w-64 bg-[#091535] text-white flex flex-col h-full lg:min-h-screen shadow-2xl shrink-0 lg:border-r border-blue-900/30 font-sans ${className}`}>
      {/* Brand Header with Seal Logo */}
      <div className="p-5 flex flex-col items-center text-center border-b border-blue-900/40 bg-[#060e26]">
        <div className="relative mb-3 flex items-center justify-center">
          {/* Circular yellow border outer, then dark blue inner */}
          <div className="w-16 h-16 bg-[#001D3D] rounded-full border-2 border-blue-400 flex items-center justify-center shadow-lg relative p-1">
            {/* Custom vector scales of justice/seal emblem resembling the official seal */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300 fill-current">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="2,2" />
              {/* Outer seal decorative lines */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#60a5fa" strokeWidth="1" />
              {/* Scales Beam */}
              <path d="M20,45 Q50,38 80,45 L80,43 Q50,36 20,43 Z" fill="#60a5fa" />
              {/* Pillar representing traditional architecture */}
              <path d="M48,72 L52,72 L52,35 L48,35 Z" fill="#3b82f6" />
              <path d="M42,75 L58,75 L58,72 L42,72 Z" fill="#60a5fa" />
              <path d="M45,35 L55,35 L50,22 Z" fill="#60a5fa" />
              {/* Left Pan */}
              <line x1="25" y1="44" x2="18" y2="58" stroke="#3b82f6" strokeWidth="1" />
              <line x1="25" y1="44" x2="32" y2="58" stroke="#3b82f6" strokeWidth="1" />
              <path d="M15,58 L35,58 Q25,64 15,58 Z" fill="#60a5fa" />
              {/* Right Pan */}
              <line x1="75" y1="44" x2="68" y2="58" stroke="#3b82f6" strokeWidth="1" />
              <line x1="75" y1="44" x2="82" y2="58" stroke="#3b82f6" strokeWidth="1" />
              <path d="M65,58 L85,58 Q75,64 65,58 Z" fill="#60a5fa" />
            </svg>
          </div>
        </div>
        <h2 className="text-sm font-bold tracking-wide text-white">กรมคุมประพฤติ</h2>
        <p className="text-[10px] font-medium tracking-wider text-blue-400 mt-0.5">DEPARTMENT OF PROBATION</p>

        {role === "PARTNER" && (
          <div className="mt-4 w-full">
            <div className="flex items-center justify-between px-3 py-2 bg-blue-950/60 border border-blue-900/40 rounded-xl text-left cursor-pointer hover:bg-blue-900/40 transition-colors">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-200">เทศบาลนครหาดใหญ่</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (item.id === "PROFILE" && currentView === "DOCUMENTS");
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center px-4 py-2.5 rounded-xl text-[12.5px] font-medium transition-all duration-200 group text-left ${
                isActive
                  ? "bg-[#1b439c] text-white font-bold shadow-md shadow-blue-900/50"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 mr-3 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                }`}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Support Call Card (Bottom) */}
      <div className="mx-4 my-4 p-4 rounded-2xl bg-gradient-to-b from-blue-950/60 to-blue-900/40 border border-blue-500/20 text-center space-y-3">
        <div className="flex justify-center">
          <Headset className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-[11px] text-slate-300 leading-snug">
          ต้องการความช่วยเหลือ?<br />ติดต่อเจ้าหน้าที่คุมประพฤติ
        </p>
        <button 
          onClick={() => alert("📞 กำลังติดต่อเจ้าหน้าที่คุมประพฤติประจำตัวของคุณ: นางสาวกัลยา รักษดี (โทร. 02-123-4567)")} 
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>ติดต่อเลย</span>
        </button>
      </div>

      {/* Footer Meta info */}
      <div className="p-3.5 bg-[#060e26] border-t border-blue-900/30 text-[9px] text-slate-500 flex items-center justify-between">
        <div>
          <span>เวอร์ชัน 1.0.0</span>
          <p className="text-slate-600">© 2024 Department of Probation</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 bg-red-950/30 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-900/30"
          title="ออกจากระบบ"
        >
          <LogOut className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
