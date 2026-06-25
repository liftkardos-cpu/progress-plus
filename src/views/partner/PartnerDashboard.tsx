import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Search, 
  MapPin, 
  CheckCircle, 
  Calendar, 
  Users, 
  Star, 
  Camera, 
  Clock, 
  Award, 
  Bell, 
  FileText, 
  FolderOpen, 
  ArrowRight, 
  Upload, 
  X, 
  Trash2, 
  Edit, 
  ChevronRight, 
  Settings, 
  MessageSquare, 
  ChevronDown, 
  Plus, 
  Filter,
  Check,
  AlertCircle
} from "lucide-react";

export const PartnerDashboard: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    activities, 
    probationersList, 
    approveApplicant, 
    checkInActivity, 
    checkOutActivity, 
    submitEvaluation, 
    addNotification,
    addActivity,
    deleteActivity
  } = useApp();

  // Internal navigation state for deep screens inside Partner Views
  const [internalSubView, setInternalSubView] = useState<string | null>(null);

  // States for adding / editing activity modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActTitle, setNewActTitle] = useState("");
  const [newActLocation, setNewActLocation] = useState("");
  const [newActCategory, setNewActCategory] = useState("สาธารณประโยชน์");
  const [newActHours, setNewActHours] = useState(4);
  const [newActMax, setNewActMax] = useState(25);
  const [newActDate, setNewActDate] = useState("2026-06-25");
  const [newActTime, setNewActTime] = useState("08:30 - 12:00");

  // States for interactive Attendance / Evaluation workflow
  const [selectedAttendee, setSelectedAttendee] = useState({
    id: "PB6705-123456",
    name: "นายสมชาย ใจดี",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=facearea&facepad=2&q=80",
    checkIn: "08:35:22",
    checkOut: "12:05:18",
    date: "25 พ.ค. 2567",
    signature: "สมชาย ใจดี"
  });

  // Ratings states for Evaluation Screen
  const [ratingResponsibility, setRatingResponsibility] = useState(5);
  const [ratingPunctuality, setRatingPunctuality] = useState(4);
  const [ratingCooperation, setRatingCooperation] = useState(5);
  const [ratingBehavior, setRatingBehavior] = useState(4);
  const [evaluationComment, setEvaluationComment] = useState(
    "ตั้งใจทำงานดีมาก ให้ความร่วมมือกับทีมเป็นอย่างดี ควรได้รับการสนับสนุนให้เข้าร่วมกิจกรรมต่อเนื่อง"
  );
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(true);

  // Filter and search states for Activity Management
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("สถานะทั้งหมด");
  const [categoryFilter, setCategoryFilter] = useState("ประเภทกิจกรรม");

  // Local activity list mirroring and extending the global activities for Hat Yai municipal branding
  const initialLocalActivities = [
    {
      id: "hatyai-1",
      title: "ทำความสะอาดวัด",
      organizer: "วัดหัวขวางพระอารามหลวง",
      location: "วัดหัวขวางพระอารามหลวง",
      address: "ต. หาดใหญ่ อ. หาดใหญ่ จ. สงขลา",
      date: "25 พ.ค. 2567",
      time: "08:30 - 12:00 น.",
      hours: 6,
      maxParticipants: 30,
      currentParticipants: 28,
      status: "กำลังดำเนินการ",
      category: "สาธารณประโยชน์",
      imageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "hatyai-2",
      title: "ปลูกต้นไม้ เพิ่มพื้นที่สีเขียว",
      organizer: "สวนสาธารณะเทศบาลนครหาดใหญ่",
      location: "สวนสาธารณะเทศบาลนครหาดใหญ่",
      address: "ต. คอหงส์ อ. หาดใหญ่ จ. สงขลา",
      date: "26 พ.ค. 2567",
      time: "08:30 - 12:00 น.",
      hours: 4,
      maxParticipants: 40,
      currentParticipants: 35,
      status: "กำลังดำเนินการ",
      category: "พัฒนาสิ่งแวดล้อม",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "hatyai-3",
      title: "จัดห้องสมุดเพื่อการเรียนรู้",
      organizer: "ห้องสมุดชุมชนเทศบาลนครหาดใหญ่",
      location: "ห้องสมุดชุมชนเทศบาลนครหาดใหญ่",
      address: "ต. หาดใหญ่ อ. หาดใหญ่ จ. สงขลา",
      date: "1 มิ.ย. 2567",
      time: "09:00 - 15:00 น.",
      hours: 5,
      maxParticipants: 25,
      currentParticipants: 10,
      status: "เปิดรับสมัคร",
      category: "การศึกษา",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "hatyai-4",
      title: "เก็บขยะชายหาด",
      organizer: "ชายหาดสมิหลา",
      location: "ชายหาดสมิหลา",
      address: "ต. บ่อยาง อ. เมืองสงขลา จ. สงขลา",
      date: "2 มิ.ย. 2567",
      time: "07:00 - 11:00 น.",
      hours: 4,
      maxParticipants: 50,
      currentParticipants: 22,
      status: "เปิดรับสมัคร",
      category: "พัฒนาสิ่งแวดล้อม",
      imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "hatyai-5",
      title: "ทาสีปรับปรุงศูนย์เด็กเล็ก",
      organizer: "ศูนย์พัฒนาเด็กเล็กบ้านคลองเตย",
      location: "ศูนย์พัฒนาเด็กเล็กบ้านคลองเตย",
      address: "ต. คลองแห อ. หาดใหญ่ จ. สงขลา",
      date: "8 มิ.ย. 2567",
      time: "08:30 - 16:30 น.",
      hours: 7,
      maxParticipants: 20,
      currentParticipants: 18,
      status: "รออนุมัติ",
      category: "พัฒนาชุมชน",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=60"
    }
  ];

  const [localActs, setLocalActs] = useState(initialLocalActivities);

  // Active view switcher (combining global state and internal workflow switches)
  const activeView = internalSubView || currentView;

  // Render Star Utility for Ratings
  const renderStars = (rating: number, onStarClick?: (newRating: number) => void) => {
    return (
      <div className="flex space-x-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onStarClick && onStarClick(star)}
            className={`transition-transform hover:scale-110 ${onStarClick ? "cursor-pointer" : "cursor-default"}`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating 
                  ? "fill-amber-400 text-amber-400" 
                  : "text-slate-200 fill-none"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Handle addition of new activity
  const handleAddNewActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle || !newActLocation) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newActivity = {
      id: `hatyai-${Date.now()}`,
      title: newActTitle,
      organizer: "เทศบาลนครหาดใหญ่",
      location: newActLocation,
      address: "อ. หาดใหญ่ จ. สงขลา",
      date: new Date(newActDate).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" }),
      time: newActTime,
      hours: Number(newActHours),
      maxParticipants: Number(newActMax),
      currentParticipants: 0,
      status: "เปิดรับสมัคร" as const,
      category: newActCategory,
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60"
    };

    setLocalActs([newActivity, ...localActs]);
    
    // Mirror to global context
    addActivity({
      title: newActTitle,
      category: newActCategory,
      organizer: "เทศบาลนครหาดใหญ่",
      location: newActLocation,
      province: "สงขลา",
      date: newActDate,
      time: newActTime,
      hours: Number(newActHours),
      maxParticipants: Number(newActMax),
      description: `กิจกรรม ${newActTitle} โดยความร่วมมือระหว่างเทศบาลนครหาดใหญ่และกรมคุมประพฤติ เพื่อการบำเพ็ญสาธารณประโยชน์`,
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60",
      status: "เปิดรับสมัคร"
    });

    setIsAddModalOpen(false);
    setNewActTitle("");
    setNewActLocation("");
    
    addNotification(
      "สร้างกิจกรรมบริการสังคมใหม่สำเร็จ",
      `เทศบาลนครหาดใหญ่ได้สร้างกิจกรรม '${newActTitle}' สะสมชั่วโมงงานจำนวน ${newActHours} ชั่วโมงในระบบเรียบร้อย`,
      "หน่วยงานภาคี"
    );
  };

  // Handle deletion of activity
  const handleDeleteActivity = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบกิจกรรมนี้ออกจากระบบ?")) {
      setLocalActs(localActs.filter(act => act.id !== id));
      addNotification(
        "ลบกิจกรรมบริการสังคมเรียบร้อย",
        "กิจกรรมที่คุณเลือกได้รับการนำออกจากระบบบำเพ็ญประโยชน์แล้ว",
        "หน่วยงานภาคี"
      );
    }
  };

  return (
    <div className="space-y-6 font-sans select-none pb-12">
      
      {/* -------------------------------------------------------------
          1. DASHBOARD VIEW (Image 1)
          ------------------------------------------------------------- */}
      {activeView === "PARTNER_DASHBOARD" && (
        <div className="space-y-6">
          
          {/* Welcome Hero Banner Section */}
          <div className="relative bg-gradient-to-r from-[#031d44] via-[#04395e] to-[#0d5c75] rounded-3xl text-white p-8 overflow-hidden shadow-xl border border-blue-900/40">
            {/* Ambient overlay graphics resembling building or skyline silhouette */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-30 flex items-end justify-end pointer-events-none">
              <svg viewBox="0 0 500 300" className="w-full h-full text-white fill-current">
                {/* Traditional architectures, city, trees silhouettes */}
                <path d="M50,300 L50,180 L100,180 L100,150 L120,150 L120,180 L150,180 L150,300 Z" />
                <path d="M120,300 L120,220 L180,220 L180,190 L220,190 L220,300 Z" />
                <path d="M250,300 L250,100 L290,60 L330,100 L330,300 Z" opacity="0.6" />
                <path d="M300,300 L300,140 L350,100 L400,140 L400,300 Z" />
                {/* bridge/arches */}
                <path d="M0,280 Q250,200 500,280 L500,300 L0,300 Z" opacity="0.4" />
              </svg>
            </div>

            <div className="relative z-10 max-w-xl space-y-3">
              <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">ยินดีต้อนรับ,</p>
              <h1 className="text-3xl font-black text-white tracking-wide">
                เทศบาลนครหาดใหญ่
              </h1>
              <p className="text-sm font-medium text-emerald-400">หน่วยงานภาคีเครือข่าย</p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 font-medium">
                ร่วมสร้างสังคมปลอดภัย คืนคนดีสู่สังคม โดยสนับสนุนสถานที่และงานบำเพ็ญประโยชน์เพื่อช่วยขัดเกลาจิตใจและฟื้นฟูวินัยผู้ถูกคุมประพฤติ
              </p>
            </div>

            {/* Date Indicator Dropdown top right */}
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center space-x-2 shadow-sm cursor-pointer hover:bg-white/15 transition-colors">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>20 พฤษภาคม 2567</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 4 KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: ผู้สมัครทั้งหมด */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-bold block">จำนวนผู้สมัครทั้งหมด</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-slate-800">128</span>
                  <span className="text-xs font-bold text-slate-500">คน</span>
                </div>
                <div className="flex items-center text-[10px] text-emerald-500 font-bold">
                  <span>↑ 18.4% จากเดือนที่แล้ว</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                {/* mini sparkline */}
                <svg className="w-16 h-6 mt-4 text-blue-500 fill-none stroke-current" strokeWidth="2">
                  <path d="M0,15 L10,12 L20,18 L30,8 L40,14 L50,5 L60,10" />
                </svg>
              </div>
            </div>

            {/* Card 2: ผู้ที่เข้าร่วมแล้ว */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-bold block">จำนวนผู้ที่เข้าร่วมแล้ว</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-slate-800">96</span>
                  <span className="text-xs font-bold text-slate-500">คน</span>
                </div>
                <div className="flex items-center text-[10px] text-emerald-500 font-bold">
                  <span>↑ 14.2% จากเดือนที่แล้ว</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                {/* mini sparkline */}
                <svg className="w-16 h-6 mt-4 text-emerald-500 fill-none stroke-current" strokeWidth="2">
                  <path d="M0,18 L10,14 L20,15 L30,10 L40,12 L50,8 L60,4" />
                </svg>
              </div>
            </div>

            {/* Card 3: ชั่วโมงบริการรวม */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-bold block">ชั่วโมงบริการสังคมรวม</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-slate-800">2,456</span>
                  <span className="text-xs font-bold text-slate-500">ชม.</span>
                </div>
                <div className="flex items-center text-[10px] text-emerald-500 font-bold">
                  <span>↑ 22.7% จากเดือนที่แล้ว</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                {/* mini sparkline */}
                <svg className="w-16 h-6 mt-4 text-indigo-500 fill-none stroke-current" strokeWidth="2">
                  <path d="M0,15 L10,10 L20,12 L30,5 L40,16 L50,4 L60,8" />
                </svg>
              </div>
            </div>

            {/* Card 4: กิจกรรมที่ดำเนินการ */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-bold block">กิจกรรมที่ดำเนินการ</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-slate-800">8</span>
                  <span className="text-xs font-bold text-slate-500">กิจกรรม</span>
                </div>
                <div className="flex items-center text-[10px] text-emerald-500 font-bold">
                  <span>↑ 2 กิจกรรม จากเดือนที่แล้ว</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                {/* mini sparkline */}
                <svg className="w-16 h-6 mt-4 text-amber-500 fill-none stroke-current" strokeWidth="2">
                  <path d="M0,12 L10,12 L20,8 L30,15 L40,10 L50,10 L60,6" />
                </svg>
              </div>
            </div>

          </div>

          {/* Main Charts & Quick Action Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col (Col Span 2) - Bar charts and Doughnut */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Social Services Hours Statistics */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">สถิติชั่วโมงบริการสังคม</h3>
                    <span className="text-[10px] text-slate-400 block mt-0.5">จำแนกรายเดือน</span>
                  </div>
                  {/* Select filter fiscal year */}
                  <div className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-bold flex items-center space-x-1 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span>ปีงบประมาณ 2567</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Simulated bar chart representation of months */}
                <div className="pt-6 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 top-0 h-44 flex flex-col justify-between pointer-events-none opacity-50">
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">3K</div>
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">2.5K</div>
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">2K</div>
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">1.5K</div>
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">1K</div>
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">500</div>
                    <div className="border-b border-dashed border-slate-100 w-full text-[9px] text-slate-400 font-mono text-left pt-1">0</div>
                  </div>

                  {/* Bars container */}
                  <div className="h-44 flex items-end justify-between px-6 relative z-10">
                    
                    {/* Columns representation */}
                    {[
                      { m: "ต.ค.", h: "45%" },
                      { m: "พ.ย.", h: "55%" },
                      { m: "ธ.ค.", h: "50%" },
                      { m: "ม.ค.", h: "62%" },
                      { m: "ก.พ.", h: "58%" },
                      { m: "มี.ค.", h: "65%" },
                      { m: "เม.ย.", h: "70%" },
                      { m: "พ.ค.", h: "82%", active: true },
                      { m: "มิ.ย.", h: "35%" },
                      { m: "ก.ค.", h: "30%" },
                      { m: "ส.ค.", h: "42%" },
                      { m: "ก.ย.", h: "38%" }
                    ].map((month, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 space-y-2 group cursor-pointer">
                        <div className="w-5 sm:w-6 bg-slate-100 rounded-t-md hover:bg-blue-200 transition-all relative overflow-hidden flex items-end h-32">
                          <div 
                            style={{ height: month.h }} 
                            className={`w-full rounded-t-md transition-all duration-500 ${
                              month.active 
                                ? "bg-blue-600 shadow-md shadow-blue-500/25" 
                                : "bg-blue-400 group-hover:bg-blue-500"
                            }`} 
                          />
                          {month.active && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-black py-0.5 px-2 rounded shadow-lg whitespace-nowrap z-20">
                              พ.ค. 2,456 ชม.
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{month.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Types doughnut representation */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4">ประเภทกิจกรรม</h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                  {/* Doughnut structure */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      {/* Grey Base Ring */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      {/* Ring 1 (พัฒนาสิ่งแวดล้อม 40.2%) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="40.2 59.8" strokeDashoffset="0" />
                      {/* Ring 2 (สาธารณประโยชน์ 30.6%) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="30.6 69.4" strokeDashoffset="-40.2" />
                      {/* Ring 3 (พัฒนาชุมชน 18.5%) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="18.5 81.5" strokeDashoffset="-70.8" />
                      {/* Ring 4 (การศึกษา 10.7%) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ec4899" strokeWidth="3" strokeDasharray="10.7 89.3" strokeDashoffset="-89.3" />
                    </svg>
                    
                    {/* Center text overlay */}
                    <div className="absolute text-center">
                      <span className="text-xl font-black text-slate-800 block">2,456</span>
                      <span className="text-[10px] text-slate-400 font-bold block">ชั่วโมง</span>
                    </div>
                  </div>

                  {/* Legend side list */}
                  <div className="space-y-3.5 flex-1 max-w-xs text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                        <span className="font-bold text-slate-600">พัฒนาสิ่งแวดล้อม</span>
                      </div>
                      <span className="font-bold text-slate-800">40.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                        <span className="font-bold text-slate-600">สาธารณประโยชน์</span>
                      </div>
                      <span className="font-bold text-slate-800">30.6%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                        <span className="font-bold text-slate-600">พัฒนาชุมชน</span>
                      </div>
                      <span className="font-bold text-slate-800">18.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-pink-500 rounded-full" />
                        <span className="font-bold text-slate-600">การศึกษา</span>
                      </div>
                      <span className="font-bold text-slate-800">10.7%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col - Active Activities List & Compact Calendar */}
            <div className="space-y-6">
              
              {/* Active Activities List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">กิจกรรมที่กำลังดำเนินการ</h3>
                  <button 
                    onClick={() => setCurrentView("ACTIVITY_MANAGEMENT")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-1"
                  >
                    <span>ดูทั้งหมด</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {localActs.slice(0, 4).map((act, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                      <img 
                        src={act.imageUrl} 
                        alt={act.title} 
                        className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-100" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{act.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{act.location}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-1">{act.date} • {act.hours} ชม.</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                          {act.currentParticipants} คน
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Calendar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ปฏิทินกิจกรรม</h3>
                  <span className="text-xs font-bold text-slate-800">พฤษภาคม 2567</span>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
                  <span>อา.</span><span>จ.</span><span>อ.</span><span>พ.</span><span>พฤ.</span><span>ศ.</span><span>ส.</span>
                </div>

                {/* Dates grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-700">
                  {/* May 2567 calendar days mock */}
                  <span className="text-slate-300">28</span>
                  <span className="text-slate-300">29</span>
                  <span className="text-slate-300">30</span>
                  <span>1</span>
                  <span>2</span>
                  <span className="relative flex items-center justify-center">
                    3
                    <span className="absolute bottom-0.5 w-1 h-1 bg-emerald-500 rounded-full" />
                  </span>
                  <span className="relative flex items-center justify-center">
                    4
                    <span className="absolute bottom-0.5 w-1 h-1 bg-amber-500 rounded-full" />
                  </span>

                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>

                  <span>12</span>
                  <span>13</span>
                  <span>14</span>
                  <span>15</span>
                  <span>16</span>
                  <span>17</span>
                  <span>18</span>

                  <span>19</span>
                  <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md shadow-blue-500/20 mx-auto">20</span>
                  <span>21</span>
                  <span>22</span>
                  <span>23</span>
                  <span>24</span>
                  <span>25</span>

                  <span>26</span>
                  <span>27</span>
                  <span>28</span>
                  <span>29</span>
                  <span>30</span>
                  <span>31</span>
                  <span className="text-slate-300">1</span>
                </div>

                {/* Color Legends */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-50 text-[9px] font-bold text-slate-500">
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>กำลังดำเนินการ</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>กิจกรรมใกล้เริ่ม</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span>กิจกรรมสิ้นสุด</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom lists row: Attendees, Notification logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Latest Attendees */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                <h3 className="text-xs font-bold text-slate-800">ผู้เข้าร่วมกิจกรรมล่าสุด</h3>
                <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">ดูทั้งหมด</span>
              </div>
              
              <div className="space-y-3.5">
                {[
                  { name: "นายณัฐวุฒิ ใจดี", id: "PB6705-123456", job: "ปรับปรุงภูมิทัศน์สวนสาธารณะ", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
                  { name: "น.ส.จิราภรณ์ รักดี", id: "PB6705-123457", job: "ปรับปรุงภูมิทัศน์สวนสาธารณะ", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
                  { name: "นายกิตติพงษ์ เสือทอง", id: "PB6705-123458", job: "ปรับปรุงภูมิทัศน์สวนสาธารณะ", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" }
                ].map((att, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs">
                    <img src={att.avatar} alt={att.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" />
                    <div className="flex-1">
                      <span className="font-bold text-slate-800 block">{att.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{att.id}</span>
                      <span className="text-[10px] text-blue-600 block mt-0.5 truncate">{att.job}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">20 พ.ค. 2567</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Notifications logs */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                <h3 className="text-xs font-bold text-slate-800">การแจ้งเตือน</h3>
                <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">ดูทั้งหมด</span>
              </div>
              
              <div className="space-y-3.5 text-xs">
                
                {/* Notice 1 */}
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 block">มีผู้สมัครใหม่</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">มีผู้สมัครเข้าร่วมกิจกรรมใหม่ 8 รายการ</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">20 พ.ค. 2567</span>
                </div>

                {/* Notice 2 */}
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 block">ใกล้สิ้นสุดกิจกรรม</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">กิจกรรม ปลูกต้นไม้เพิ่มพื้นที่สีเขียว ใกล้สิ้นสุดใน 3 วัน</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">20 พ.ค. 2567</span>
                </div>

                {/* Notice 3 */}
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 block">รอการยืนยันชั่วโมง</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">มีผู้เข้าร่วมรอการยืนยันชั่วโมง 15 รายการ</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">20 พ.ค. 2567</span>
                </div>

              </div>
            </div>

            {/* 3. Partner Quick Navigation Helper Card */}
            <div className="bg-[#fffcf0] p-5 rounded-2xl border border-amber-200/50 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2 text-xs">
                <span className="p-1 px-2.5 bg-amber-100 text-amber-800 rounded-full text-[9px] font-bold inline-block">ทางลัดจำลองกิจกรรม</span>
                <h4 className="text-sm font-bold text-slate-800">ระบบจำลองการเข้าร่วมงาน</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  เพื่อจำลองระบบ 100% คุณสามารถคลิกปุ่มด้านล่างเพื่อเปิดหน้าจัดการตรวจสอบ QR Code และฟอร์มประเมินคุณภาพเพื่อสะสมชั่วโมงงานให้ นายสมชาย ใจดี ทันที!
                </p>
              </div>
              <button 
                onClick={() => setInternalSubView("ATTENDANCE_VERIFICATION")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow flex items-center justify-center space-x-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>จำลองการสแกน QR Code</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* -------------------------------------------------------------
          2. ACTIVITY MANAGEMENT VIEW (Image 2)
          ------------------------------------------------------------- */}
      {activeView === "ACTIVITY_MANAGEMENT" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header block with breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-wide">จัดการกิจกรรมบริการสังคม</h2>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1 font-semibold">
                <span className="cursor-pointer hover:text-blue-600" onClick={() => { setInternalSubView(null); setCurrentView("PARTNER_DASHBOARD"); }}>หน้าหลัก</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-500">กิจกรรมบริการสังคม</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-500">จัดการกิจกรรม</span>
              </div>
            </div>

            {/* Quick Actions Add Activity */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มกิจกรรมใหม่</span>
              </button>
              <button className="border border-slate-200 hover:bg-slate-50 p-2 rounded-xl text-slate-500 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High-level stats cards row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">กิจกรรมทั้งหมด</span>
              <span className="text-xl font-black text-slate-800 block mt-1">24</span>
              <span className="text-[9px] text-slate-400 font-bold">กิจกรรม</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">กำลังดำเนินการ</span>
              <span className="text-xl font-black text-emerald-600 block mt-1">12</span>
              <span className="text-[9px] text-emerald-500 font-bold">กิจกรรม</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">เสร็จสิ้นแล้ว</span>
              <span className="text-xl font-black text-blue-600 block mt-1">9</span>
              <span className="text-[9px] text-blue-500 font-bold">กิจกรรม</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">มีผู้สมัครรวม</span>
              <span className="text-xl font-black text-indigo-600 block mt-1">786</span>
              <span className="text-[9px] text-indigo-500 font-bold">คน</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center col-span-2 lg:col-span-1">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">ชั่วโมงรวม</span>
              <span className="text-xl font-black text-amber-600 block mt-1">12,456</span>
              <span className="text-[9px] text-amber-500 font-bold">ชม.</span>
            </div>
          </div>

          {/* Filter row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="ค้นหากิจกรรม, สถานที่, ประเภทกิจกรรม" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-700"
              />
            </div>

            {/* Dropdown 1 */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 bg-slate-50 p-2 rounded-xl text-xs text-slate-600 font-semibold outline-none focus:ring-2 focus:ring-blue-600/20 cursor-pointer w-full sm:w-auto"
            >
              <option>สถานะทั้งหมด</option>
              <option>กำลังดำเนินการ</option>
              <option>เปิดรับสมัคร</option>
              <option>รออนุมัติ</option>
            </select>

            {/* Dropdown 2 */}
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-slate-200 bg-slate-50 p-2 rounded-xl text-xs text-slate-600 font-semibold outline-none focus:ring-2 focus:ring-blue-600/20 cursor-pointer w-full sm:w-auto"
            >
              <option>ประเภทกิจกรรม</option>
              <option>สาธารณประโยชน์</option>
              <option>พัฒนาสิ่งแวดล้อม</option>
              <option>การศึกษา</option>
              <option>พัฒนาชุมชน</option>
            </select>

            {/* Filter button */}
            <button className="border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 px-4 py-2 rounded-xl flex items-center space-x-1 w-full sm:w-auto justify-center">
              <Filter className="w-3.5 h-3.5" />
              <span>ตัวกรอง</span>
            </button>
          </div>

          {/* Activities Cards Grid List */}
          <div className="space-y-4">
            {localActs
              .filter(act => {
                const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      act.category.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = statusFilter === "สถานะทั้งหมด" || act.status === statusFilter;
                const matchesCategory = categoryFilter === "ประเภทกิจกรรม" || act.category === categoryFilter;
                return matchesSearch && matchesStatus && matchesCategory;
              })
              .map((act) => {
                const progressPercentage = Math.round((act.currentParticipants / act.maxParticipants) * 100);
                
                return (
                  <div key={act.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    
                    {/* Left: Photo + basic details */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1 min-w-0">
                      <img 
                        src={act.imageUrl} 
                        alt={act.title} 
                        className="w-full sm:w-28 h-28 sm:h-24 rounded-xl object-cover ring-1 ring-slate-100 shrink-0" 
                      />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-black text-slate-800 hover:text-blue-600 cursor-pointer transition-colors truncate">
                            {act.title}
                          </h3>
                        </div>
                        <p className="text-xs font-bold text-slate-500 truncate">{act.organizer}</p>
                        
                        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[10.5px] text-slate-400 font-semibold">
                          <span className="flex items-center space-x-1 truncate">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{act.address}</span>
                          </span>
                          <span className="flex items-center space-x-1 shrink-0">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{act.date} &nbsp; {act.time}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-x-4 pt-1 text-[11px] font-bold text-slate-500">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-100">
                            รับสมัคร {act.maxParticipants} คน
                          </span>
                          <span className="flex items-center space-x-1 text-blue-600">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{act.hours} ชั่วโมง</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle / Right: Participants count & Status tags & actions */}
                    <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center w-full lg:w-44 shrink-0 gap-3 border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0">
                      
                      <div className="space-y-1.5 w-full text-left lg:text-right">
                        <div className="flex items-center justify-between lg:justify-end lg:space-x-2">
                          {act.status === "กำลังดำเนินการ" && (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                              กำลังดำเนินการ
                            </span>
                          )}
                          {act.status === "เปิดรับสมัคร" && (
                            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                              เปิดรับสมัคร
                            </span>
                          )}
                          {act.status === "รออนุมัติ" && (
                            <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-100">
                              รออนุมัติ
                            </span>
                          )}
                        </div>

                        {/* Progress Bar participant count */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between lg:justify-end text-[10px] font-black text-slate-700 lg:space-x-1">
                            <span className="lg:hidden text-slate-400 font-bold">ผู้สมัคร:</span>
                            <span>ผู้สมัคร {act.currentParticipants} / {act.maxParticipants} คน</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${progressPercentage}%` }} 
                              className={`h-full rounded-full ${
                                act.status === "กำลังดำเนินการ" ? "bg-emerald-500" : "bg-blue-600"
                              }`} 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center space-x-1.5">
                        {act.id === "hatyai-1" && (
                          <button 
                            onClick={() => {
                              setInternalSubView("ATTENDANCE_VERIFICATION");
                            }}
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10.5px] px-2.5 py-1.5 rounded-lg border border-blue-100 transition-colors"
                          >
                            เช็กเข้าร่วม
                          </button>
                        )}
                        <button className="border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 transition-colors">
                          <Edit className="w-3 h-3" />
                          <span>แก้ไข</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteActivity(act.id)}
                          className="border border-red-200 hover:bg-red-50 text-red-600 p-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
          </div>

          {/* Bottom Pagination controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
            <span>แสดง 1 - 5 จาก 24 กิจกรรม</span>
            <div className="flex items-center space-x-1">
              <button className="p-1 px-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">&lt;</button>
              <button className="p-1 px-3 bg-blue-600 text-white rounded-lg shadow">1</button>
              <button className="p-1 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">2</button>
              <button className="p-1 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">3</button>
              <button className="p-1 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">4</button>
              <button className="p-1 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">5</button>
              <button className="p-1 px-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">...</button>
              <button className="p-1 px-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">&gt;</button>
            </div>
            {/* select items per page */}
            <select className="border border-slate-200 rounded-lg p-1 px-2 bg-slate-50 font-semibold cursor-pointer outline-none">
              <option>แสดง 5 / หน้า</option>
              <option>แสดง 10 / หน้า</option>
              <option>แสดง 20 / หน้า</option>
            </select>
          </div>

        </div>
      )}

      {/* -------------------------------------------------------------
          3. ATTENDANCE VERIFICATION VIEW (Image 3)
          ------------------------------------------------------------- */}
      {activeView === "ATTENDANCE_VERIFICATION" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-wide">ยืนยันการเข้าร่วมกิจกรรม</h2>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1 font-semibold">
                <span className="cursor-pointer hover:text-blue-600" onClick={() => setInternalSubView(null)}>หน้าหลัก</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="cursor-pointer hover:text-blue-600" onClick={() => setInternalSubView("ACTIVITY_MANAGEMENT")}>กิจกรรม</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-500">ยืนยันการเข้าร่วมกิจกรรม</span>
              </div>
            </div>
            
            <button 
              onClick={() => setInternalSubView("ACTIVITY_MANAGEMENT")}
              className="border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 px-4 py-2 rounded-xl"
            >
              กลับหน้ากิจกรรม
            </button>
          </div>

          {/* Success scan alert top */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center space-x-3 shadow-sm">
            <div className="p-1.5 bg-emerald-600 text-white rounded-full">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-xs font-bold">สแกน QR Code สำเร็จ</span>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Col Span 2) - Activity Info, User Info, Timestamps */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* ข้อมูลกิจกรรม */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">ข้อมูลกิจกรรม</h3>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=400&auto=format&fit=crop&q=60" 
                    alt="วัด" 
                    className="w-full sm:w-24 h-24 rounded-xl object-cover ring-1 ring-slate-100" 
                  />
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-slate-800">ทำความสะอาดวัด</h4>
                    <p className="text-xs font-bold text-slate-500">วัดหัวขวางพระอารามหลวง</p>
                    <p className="text-xs text-slate-400 font-semibold">ต. หาดใหญ่ อ. หาดใหญ่ จ. สงขลา</p>
                    <p className="text-[11px] text-slate-500 font-medium">25 พฤษภาคม 2567 &nbsp;|&nbsp; 08:30 - 12:00 น.</p>
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 inline-block">กำลังดำเนินการ</span>
                  </div>
                </div>
              </div>

              {/* ข้อมูลผู้เข้าร่วม + QR Code display side-by-side */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">ข้อมูลผู้เข้าร่วม</h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* profile photo and names */}
                  <div className="flex items-center space-x-4 text-xs">
                    <img 
                      src={selectedAttendee.avatar} 
                      alt={selectedAttendee.name} 
                      className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md shrink-0" 
                    />
                    <div className="space-y-1">
                      <span className="font-black text-slate-800 text-sm block">{selectedAttendee.name}</span>
                      <span className="text-[11px] font-mono text-slate-400 font-bold block">รหัสประตัว: {selectedAttendee.id}</span>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100 inline-block">ผู้ถูกคุมประพฤติ</span>
                      <p className="text-[10px] text-slate-500 font-medium pt-1">เจ้าหน้าที่ควบคุม : นายณัฐวุฒิ ใจดี</p>
                    </div>
                  </div>

                  {/* QR Code graphic */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center space-y-1 shrink-0">
                    <span className="text-[9px] text-slate-400 font-extrabold block">QR Code</span>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 inline-block shadow-sm">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 text-slate-800">
                        {/* Simulated QR Code pixels */}
                        <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                        <rect x="5" y="5" width="15" height="15" fill="white" />
                        <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                        <rect x="80" y="5" width="15" height="15" fill="white" />
                        <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                        <rect x="5" y="80" width="15" height="15" fill="white" />
                        
                        <rect x="35" y="10" width="10" height="10" fill="currentColor" />
                        <rect x="55" y="15" width="10" height="10" fill="currentColor" />
                        <rect x="15" y="35" width="10" height="15" fill="currentColor" />
                        <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                        <rect x="70" y="45" width="15" height="10" fill="currentColor" />
                        <rect x="35" y="70" width="15" height="15" fill="currentColor" />
                        <rect x="65" y="75" width="10" height="10" fill="currentColor" />
                        <rect x="85" y="85" width="10" height="10" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* เวลาเข้า/ออก Timestamps Timeline */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">ประวัติเวลาเข้า - ออก</h3>
                
                <div className="flex items-center justify-around gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  
                  {/* เช็กอิน */}
                  <div className="text-center space-y-1.5 flex-1">
                    <div className="flex items-center justify-center space-x-1.5 text-blue-600">
                      <Clock className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">เวลาเข้า</span>
                    </div>
                    <span className="text-2xl font-black text-slate-800 block">{selectedAttendee.checkIn}</span>
                    <span className="text-[10px] font-bold text-slate-400">{selectedAttendee.date}</span>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-slate-300">
                    <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  {/* เช็กเอาต์ */}
                  <div className="text-center space-y-1.5 flex-1">
                    <div className="flex items-center justify-center space-x-1.5 text-red-500">
                      <Clock className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">เวลาออก</span>
                    </div>
                    <span className="text-2xl font-black text-slate-800 block">{selectedAttendee.checkOut}</span>
                    <span className="text-[10px] font-bold text-slate-400">{selectedAttendee.date}</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column - Images, Signature, Hours Summary */}
            <div className="space-y-6">
              
              {/* ภาพถ่ายกิจกรรม */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">ภาพถ่ายกิจกรรม (อย่างน้อย 2 รูป)</h3>
                
                {/* Image thumbnails grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative group rounded-lg overflow-hidden border border-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300" 
                      alt="cleanup1" 
                      className="w-full h-20 object-cover" 
                    />
                  </div>
                  <div className="relative group rounded-lg overflow-hidden border border-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300" 
                      alt="cleanup2" 
                      className="w-full h-20 object-cover" 
                    />
                  </div>
                  <div className="relative group rounded-lg overflow-hidden border border-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300" 
                      alt="cleanup3" 
                      className="w-full h-20 object-cover" 
                    />
                  </div>
                  
                  {/* Upload button */}
                  <button className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-slate-100/50 rounded-lg flex flex-col items-center justify-center p-2 text-slate-400 hover:text-blue-600 transition-all h-20">
                    <Upload className="w-4 h-4 mb-1" />
                    <span className="text-[9px] font-bold">อัปโหลดเพิ่ม</span>
                  </button>
                </div>
              </div>

              {/* ลายเซ็นผู้เข้าร่วม */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">ลายเซ็นผู้เข้าร่วม</h3>
                
                {/* handwriting sign box */}
                <div className="border border-slate-200 border-dashed rounded-xl p-4 bg-[#fcfdfd] text-center relative flex flex-col items-center justify-center min-h-[90px]">
                  {/* Simulated elegant cursive signature */}
                  <span className="font-serif italic text-3xl font-black text-[#1b263b] tracking-wider select-none">
                    {selectedAttendee.signature}
                  </span>
                  
                  {/* verified badge status bottom right */}
                  <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-black py-0.5 px-2 rounded-full shadow-sm">
                    <Check className="w-2.5 h-2.5" />
                    <span>ยืนยันแล้ว</span>
                  </div>
                </div>

                <button className="w-full border border-red-200 hover:bg-red-50 text-red-600 font-bold py-1.5 px-3 rounded-lg text-[10.5px] transition-colors flex items-center justify-center space-x-1">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ลบลายเซ็น</span>
                </button>
              </div>

              {/* สรุปชั่วโมง */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">สรุปชั่วโมง</h3>
                </div>

                <div className="flex items-center space-x-4 bg-blue-50 p-3.5 rounded-xl border border-blue-100">
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-blue-900 block">3 ชั่วโมง 30 นาที</span>
                    <span className="text-[9.5px] text-blue-500 font-bold block">จากเวลาทั้งหมด 3 ชั่วโมง 30 นาที</span>
                  </div>
                </div>

                {/* alert success bottom */}
                <div className="flex items-center space-x-1.5 text-emerald-700 text-[10.5px] font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>ยืนยันเข้าร่วมสำเร็จ บันทึกข้อมูลเมื่อ 25 พ.ค. 2567 12:05 น.</span>
                </div>
              </div>

            </div>

          </div>

          {/* Action buttons footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button 
              onClick={() => setInternalSubView("ACTIVITY_MANAGEMENT")}
              className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition-colors"
            >
              ยกเลิก
            </button>
            <button 
              onClick={() => {
                setInternalSubView("PERFORMANCE_EVALUATION");
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow"
            >
              บันทึกและยืนยัน
            </button>
          </div>

        </div>
      )}

      {/* -------------------------------------------------------------
          4. PERFORMANCE EVALUATION VIEW (Image 4)
          ------------------------------------------------------------- */}
      {activeView === "PERFORMANCE_EVALUATION" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-wide">ประเมินผลการเข้าร่วมกิจกรรม</h2>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1 font-semibold">
                <span className="cursor-pointer hover:text-blue-600" onClick={() => setInternalSubView(null)}>หน้าหลัก</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="cursor-pointer hover:text-blue-600" onClick={() => setInternalSubView("ACTIVITY_MANAGEMENT")}>กิจกรรม</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-500">ประเมินผลการเข้าร่วมกิจกรรม</span>
              </div>
            </div>
            
            <button 
              onClick={() => setInternalSubView("ATTENDANCE_VERIFICATION")}
              className="border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 px-4 py-2 rounded-xl"
            >
              กลับหน้าสแกนเวลา
            </button>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Col Span 2) - Activity Info, Ratings */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* ข้อมูลกิจกรรม */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">ข้อมูลกิจกรรม</h3>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=400&auto=format&fit=crop&q=60" 
                    alt="วัด" 
                    className="w-full sm:w-24 h-24 rounded-xl object-cover ring-1 ring-slate-100" 
                  />
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-800">ทำความสะอาดวัด</h4>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">เสร็จสิ้นแล้ว</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500">วัดหัวขวางพระอารามหลวง</p>
                    <p className="text-xs text-slate-400 font-semibold">ต. หาดใหญ่ อ. หาดใหญ่ จ. สงขลา</p>
                    <p className="text-[11px] text-slate-500 font-bold">25 พฤษภาคม 2567  &nbsp;•&nbsp; รวม 3 ชั่วโมง 30 นาที</p>
                  </div>
                </div>
              </div>

              {/* เกณฑ์การประเมิน star criteria */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">เกณฑ์การประเมิน</h3>
                
                <div className="space-y-4">
                  
                  {/* Criteria 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-slate-800 block">ความรับผิดชอบ</span>
                      <span className="text-[10px] text-slate-400 font-medium block">ความตั้งใจในการทำงานที่ได้รับมอบหมาย</span>
                    </div>
                    {renderStars(ratingResponsibility, setRatingResponsibility)}
                  </div>

                  {/* Criteria 2 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-slate-800 block">ความตรงต่อเวลา</span>
                      <span className="text-[10px] text-slate-400 font-medium block">มาเข้าร่วมกิจกรรมตรงต่อเวลา</span>
                    </div>
                    {renderStars(ratingPunctuality, setRatingPunctuality)}
                  </div>

                  {/* Criteria 3 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-slate-800 block">ความร่วมมือ</span>
                      <span className="text-[10px] text-slate-400 font-medium block">การทำงานร่วมกับผู้อื่นในกลุ่ม/ทีม</span>
                    </div>
                    {renderStars(ratingCooperation, setRatingCooperation)}
                  </div>

                  {/* Criteria 4 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-slate-800 block">พฤติกรรม</span>
                      <span className="text-[10px] text-slate-400 font-medium block">ความเหมาะสมและมารยาทในการเข้าร่วมกิจกรรม</span>
                    </div>
                    {renderStars(ratingBehavior, setRatingBehavior)}
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column - User details, Additional comments */}
            <div className="space-y-6">
              
              {/* ข้อมูลผู้ถูกประเมิน */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">ผู้รับการประเมิน</h3>
                
                <div className="flex items-center space-x-3 text-xs">
                  <img src={selectedAttendee.avatar} alt="somchai" className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100" />
                  <div>
                    <span className="font-bold text-slate-800 block">{selectedAttendee.name}</span>
                    <span className="text-[10.5px] font-mono text-slate-400 font-bold">{selectedAttendee.id}</span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">เจ้าหน้าที่ควบคุม : นายณัฐวุฒิ ใจดี</p>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3 text-[11px] font-bold text-slate-500 space-y-1">
                  <p>เวลาเข้าออก : <span className="text-slate-800 font-mono">08:35 - 12:05 น.</span></p>
                  <p>รวมเวลาที่ทำ : <span className="text-blue-600">3 ชม. 30 น.</span></p>
                </div>
              </div>

              {/* ข้อคิดเห็นเพิ่มเติม */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">ข้อคิดเห็นเพิ่มเติม</h3>
                  <span className="text-[10px] text-slate-400">{evaluationComment.length} / 500</span>
                </div>
                
                <textarea 
                  rows={4} 
                  maxLength={500}
                  value={evaluationComment}
                  onChange={(e) => setEvaluationComment(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-700 font-medium"
                  placeholder="เขียนคำติชม/คำแนะนำสำหรับผู้ถูกคุมประพฤติ"
                />
              </div>

              {/* Success checklist alert */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold">
                  <Check className="w-4 h-4 stroke-[3] bg-emerald-600 text-white rounded-full p-0.5" />
                  <div>
                    <span className="block">ส่งผลประเมินสำเร็จ</span>
                    <span className="text-[9.5px] text-emerald-600 font-bold">บันทึกเมื่อ 25 พ.ค. 2567 12:15 น.</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  ผลการประเมินนี้จะถูกส่งกลับไปยังเจ้าหน้าที่คุมความประพฤติของผู้เข้าร่วมโดยอัตโนมัติ เพื่อประกอบการพิจารณาและติดตามพฤติกรรมต่อไป
                </p>
              </div>

            </div>

          </div>

          {/* Action buttons footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button 
              onClick={() => setInternalSubView("ATTENDANCE_VERIFICATION")}
              className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition-colors"
            >
              ยกเลิก
            </button>
            <button 
              onClick={() => {
                // Submit logic simulation
                submitEvaluation(
                  "act-1", 
                  selectedAttendee.id, 
                  { 
                    responsibility: ratingResponsibility, 
                    punctuality: ratingPunctuality, 
                    cooperation: ratingCooperation, 
                    behavior: ratingBehavior 
                  }, 
                  evaluationComment
                );
                
                // Add success toast/alert
                alert("🎉 บันทึกข้อมูลและส่งผลการประเมินระดับคุณธรรมให้ศาลและพนักงานคุมประพฤติสำเร็จ!");
                
                // Complete check-out manually under the hood
                checkOutActivity("act-1", selectedAttendee.id, "12:05:18", [], "สมชาย ใจดี");

                addNotification(
                  "ส่งผลประเมินพฤติกรรมสำเร็จ",
                  `ส่งใบรายงานประเมินของสะสมชั่วโมง ${selectedAttendee.name} สำหรับงาน 'ทำความสะอาดวัด' สำเร็จเรียบร้อยแล้ว`,
                  "หน่วยงานภาคี"
                );

                // return to dashboard
                setInternalSubView(null);
                setCurrentView("PARTNER_DASHBOARD");
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow"
            >
              บันทึกและส่งผลประเมิน
            </button>
          </div>

        </div>
      )}


      {/* -------------------------------------------------------------
          5. SECONDARY PLATFORM PARTNER TABS
          ------------------------------------------------------------- */}

      {/* 5.1 Applicants list tab (ผู้สมัครเข้าร่วมกิจกรรม) */}
      {activeView === "APPLICANTS_MANAGEMENT" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-black text-slate-800">ผู้สมัครเข้าร่วมกิจกรรมของหน่วยงาน</h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">ตรวจสอบใบสมัครจากผู้ถูกคุมประพฤติที่ยื่นขอเข้าร่วมงานบริการสังคม</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <th className="p-4">ผู้สมัคร</th>
                  <th className="p-4">รหัสคดี</th>
                  <th className="p-4">กิจกรรมที่ยื่นขอ</th>
                  <th className="p-4">วันที่บำเพ็ญประโยชน์</th>
                  <th className="p-4">สถานะใบสมัคร</th>
                  <th className="p-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {[
                  { name: "นายสมชาย ใจดี", id: "PB6705-123456", job: "ทำความสะอาดวัด", date: "25 พ.ค. 2567", status: "อนุมัติแล้ว", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
                  { name: "นายธนวัฒน์ รักดี", id: "PB6705-123457", job: "ปลูกต้นไม้ เพิ่มพื้นที่สีเขียว", date: "26 พ.ค. 2567", status: "รอดำเนินการ", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
                  { name: "นายวิชัย ใจกล้า", id: "PB6705-123458", job: "จัดห้องสมุดเพื่อการเรียนรู้", date: "1 มิ.ย. 2567", status: "รอดำเนินการ", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 flex items-center space-x-2.5">
                      <img src={item.avatar} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-bold text-slate-800">{item.name}</span>
                    </td>
                    <td className="p-4 font-mono">{item.id}</td>
                    <td className="p-4 font-bold text-blue-600">{item.job}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] font-black rounded-full border ${
                        item.status === "อนุมัติแล้ว" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-1.5">
                      {item.status === "รอดำเนินการ" ? (
                        <>
                          <button 
                            onClick={() => {
                              approveApplicant("act-1", item.id);
                              alert(`อนุมัติใบสมัครของคุณ ${item.name} เข้าร่วมกิจกรรมบำเพ็ญประโยชน์สำเร็จ!`);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2.5 rounded-lg text-[10px]"
                          >
                            อนุมัติเข้างาน
                          </button>
                          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1 px-2.5 rounded-lg text-[10px]">
                            ปฏิเสธ
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-bold">ดำเนินการแล้ว</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5.2 Participants list tab (ผู้เข้าร่วมกิจกรรม) */}
      {activeView === "PARTICIPANTS_MANAGEMENT" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-black text-slate-800">ผู้เข้าร่วมกิจกรรมสะสมชั่วโมง</h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">รายชื่อผู้ถูกคุมความประพฤติที่สแกนเช็กอินเข้าสู่สถานที่ปฏิบัติธรรมและทำความสะอาดแล้ว</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "นายสมชาย ใจดี", id: "PB6705-123456", job: "ทำความสะอาดวัด", checkIn: "08:35:22", status: "เช็กอินเข้าแล้ว", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
              { name: "นางสาวสุรีย์ เสมอใจ", id: "PB6705-123459", job: "ทำความสะอาดวัด", checkIn: "08:40:15", status: "เช็กอินเข้าแล้ว", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" }
            ].map((p, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                <div className="flex items-center space-x-3">
                  <img src={p.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white" />
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">{p.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{p.id}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 font-bold">
                  <p>กิจกรรม: <span className="text-blue-600">{p.job}</span></p>
                  <p>เวลาสแกนเข้า: <span className="text-slate-800 font-mono">{p.checkIn}</span></p>
                  <p>สถานะปัจจุบัน: <span className="text-emerald-600">{p.status}</span></p>
                </div>

                <button 
                  onClick={() => {
                    setSelectedAttendee({
                      ...selectedAttendee,
                      id: p.id,
                      name: p.name,
                      avatar: p.avatar,
                      checkIn: p.checkIn
                    });
                    setInternalSubView("ATTENDANCE_VERIFICATION");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-sm"
                >
                  เปิดสแกนตรวจสอบความถูกต้อง
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5.3 Service Hours verified history ledger (ชั่วโมงบริการสังคม) */}
      {activeView === "SERVICE_HOURS" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800">สมุดทะเบียนการตรวจสอบชั่วโมงสะสม</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">บัญชีบันทึกการส่งชั่วโมงบำเพ็ญประโยชน์ที่ลงลายมือชื่อและผ่านการประเมินระดับคุณธรรมแล้ว</p>
            </div>
            {/* Search Input ledger */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="ค้นหาชื่อ, รหัสคดี" className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <th className="p-4">ผู้บำเพ็ญประโยชน์</th>
                  <th className="p-4">รหัสคดี</th>
                  <th className="p-4">ชั่วโมงสะสมเพิ่ม</th>
                  <th className="p-4">ชื่อกิจกรรม</th>
                  <th className="p-4">ผู้ตรวจประเมิน</th>
                  <th className="p-4">การรับรองของศาล</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {[
                  { name: "นายสมชาย ใจดี", id: "PB6705-123456", hours: "3.5 ชม.", job: "ทำความสะอาดวัดหัวขวาง", r: "เทศบาลนครหาดใหญ่", court: "ผ่านการอนุมัติแล้ว" },
                  { name: "นางสาวสุรีย์ เสมอใจ", id: "PB6705-123459", hours: "4.0 ชม.", job: "ปลูกต้นไม้เพิ่มพื้นที่เขียว", r: "เทศบาลนครหาดใหญ่", court: "ผ่านการอนุมัติแล้ว" },
                  { name: "นายวิชัย ใจกล้า", id: "PB6705-123458", hours: "6.0 ชม.", job: "ทาสีปรับปรุงศูนย์เด็ก", r: "เทศบาลนครหาดใหญ่", court: "รอศาลลงตราประทับ" }
                ].map((ledger, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{ledger.name}</td>
                    <td className="p-4 font-mono">{ledger.id}</td>
                    <td className="p-4 font-black text-emerald-600">{ledger.hours}</td>
                    <td className="p-4">{ledger.job}</td>
                    <td className="p-4 text-slate-500">{ledger.r}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] font-black rounded-full border ${
                        ledger.court === "ผ่านการอนุมัติแล้ว" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {ledger.court}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5.4 Partner Reports & Statistics (รายงานและสถิติ) */}
      {activeView === "REPORTS_STATS" && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-black text-slate-800">รายงานข้อมูลผู้มีจิตอาสาและสถิติสะสม</h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">รายงานรวมประสิทธิภาพและอัตราการสำเร็จเงื่อนไขบำเพ็ญประโยชน์รายไตรมาส</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase">คะแนนพฤติกรรมเฉลี่ย</span>
              <span className="text-4xl font-black text-emerald-600 block">4.8</span>
              <div className="flex justify-center">{renderStars(5)}</div>
              <p className="text-[10px] text-slate-400">เกณฑ์ดีเยี่ยมเป็นประโยชน์สูงสุดแก่ท้องถิ่น</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase">อัตราความสำเร็จของงาน (Success Rate)</span>
              <span className="text-4xl font-black text-blue-600 block">94.2%</span>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[94.2%]" />
              </div>
              <p className="text-[10px] text-slate-400">อัตราผู้ผ่านประเมินโดยไม่พฤติกรรมเกเร</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase">ชั่วโมงงานที่ส่งมอบให้ท้องถิ่นรวม</span>
              <span className="text-4xl font-black text-indigo-600 block">12.4K</span>
              <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2.5 py-0.5 rounded-full border border-indigo-100 inline-block">พ.ค. 2567</span>
              <p className="text-[10px] text-slate-400">คิดเป็นมูลค่าการฟื้นฟูชุมชนและสิ่งแวดล้อมปัดกวาด</p>
            </div>
          </div>

          {/* Bar Chart Mock representation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800">จำแนกผู้เข้าร่วมสะสมตามประเภทพฤติกรรม</h3>
            <div className="space-y-4 pt-2">
              {[
                { label: "ตรงต่อเวลาร้อยละ 90 ขึ้นไป", count: 85, color: "bg-emerald-500" },
                { label: "ความมีวินัยและเอาใจใส่ต่องานจิตอาสา", count: 76, color: "bg-blue-500" },
                { label: "ความกระตือรือร้นและมารยาทดีเยี่ยม", count: 90, color: "bg-amber-500" },
                { label: "ความอดทนและสุภาพเรียบร้อย", count: 80, color: "bg-indigo-500" }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span>{stat.label}</span>
                    <span>{stat.count} %</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className={`${stat.color} h-full rounded-full`} style={{ width: `${stat.count}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5.5 Documents Announcements (เอกสารและประกาศ) */}
      {activeView === "DOCUMENTS_ANNOUNCEMENTS" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-black text-slate-800">เอกสารคู่มือและประกาศพันธมิตร</h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">ดาวน์โหลดหนังสือสั่งการ ระเบียบกระทรวงยุติธรรม และข้อกำหนดการดูแลผู้คุมประพฤติ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
            {[
              { title: "คู่มือการจัดตั้งสถานที่บำเพ็ญสาธารณประโยชน์สำหรับหน่วยงานภาคี.pdf", size: "3.2 MB", date: "15 พฤษภาคม 2567" },
              { title: "ข้อบังคับและกฎระเบียบกระทรวงยุติธรรม ว่าด้วยเรื่องชั่วโมงจิตอาสา 2566.pdf", size: "1.8 MB", date: "10 พฤษภาคม 2567" },
              { title: "แบบฟอร์มการประเมินระดับคุณธรรมและมารยาทผู้ถูกคุมประพฤติ (สากล).docx", size: "520 KB", date: "02 พฤษภาคม 2567" },
              { title: "ขั้นตอนจำลองการสแกน QR Code และอนุมัติโอนเวลางานศาล.pdf", size: "2.1 MB", date: "28 เมษายน 2567" }
            ].map((doc, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-300 transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block truncate max-w-xs">{doc.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{doc.size} &nbsp;•&nbsp; {doc.date}</span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 hover:underline">ดาวน์โหลด</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5.6 Notifications (ข้อความแจ้งเตือน) */}
      {activeView === "NOTIFICATIONS" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-black text-slate-800">กล่องข้อความแจ้งเตือนและร้องขอสิทธิ์</h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">ข้อความและสัญญาณแจ้งเตือนระบบจากพนักงานคุมประพฤติและผู้บำเพ็ญประโยชน์</p>
          </div>

          <div className="space-y-4 text-xs font-bold text-slate-600">
            {[
              { title: "มีคำร้องขอเข้าร่วมกิจกรรม ‘ทำความสะอาดวัด’", desc: "ผู้คุมประพฤติ นายธนวัฒน์ รักดี ได้ยื่นใบสมัครเข้าร่วมกิจกรรมกรุณากดตรวจสอบ", date: "เมื่อสักครู่", category: "คำขอเข้าร่วม", urgent: true },
              { title: "อนุมัติการตรวจสอบประวัติพันธมิตรสำเร็จ", desc: "ศาลแขวงปัตตานีได้ประทับตรารับรอง เทศบาลนครหาดใหญ่ เป็นสถานที่ทำความดีครบถ้วน", date: "1 วันที่ผ่านมา", category: "ระบบ", urgent: false },
              { title: "ปรับปรุงคุณลักษณะลายมือชื่อผู้เช็กเข้าร่วม", desc: "อัปเกรดระบบเพื่อความปลอดภัย ปัจจุบันระบบบังคับต้องถ่ายรูปอย่างน้อย 2 รูปขณะทำความสะอาดลานวัด", date: "3 วันที่ผ่านมา", category: "อัปเดต", urgent: false }
            ].map((n, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border flex items-start space-x-3.5 ${
                n.urgent ? "bg-red-50/50 border-red-100" : "bg-slate-50 border-slate-100"
              }`}>
                <div className={`p-2 rounded-xl shrink-0 ${n.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-800 text-sm block">{n.title}</span>
                    {n.urgent && <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">ด่วนที่สุด</span>}
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{n.desc}</p>
                  <p className="text-[10px] text-slate-400 font-medium pt-1">{n.date} &nbsp;•&nbsp; หมวดหมู่: {n.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5.7 Settings (ตั้งค่า) */}
      {activeView === "SETTINGS" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fade-in max-w-xl">
          <div>
            <h2 className="text-xl font-black text-slate-800">ตั้งค่าข้อมูลบัญชีหน่วยงานภาคี</h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">ตั้งค่าข้อมูลเทศบาลนครหาดใหญ่ พิกัดจีพีเอส และผู้ควบคุมสิทธิ์สแกนตรวจสอบ</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("💾 บันทึกข้อมูลการตั้งค่าหน่วยงานสำเร็จ!"); }} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="block text-slate-600 font-bold">ชื่อหน่วยงานภาษาไทย</label>
              <input type="text" defaultValue="เทศบาลนครหาดใหญ่" className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <div className="space-y-1">
              <label className="block text-slate-600 font-bold">ที่ตั้ง / พิกัดละติจูด-ลองจิจูดกลาง</label>
              <input type="text" defaultValue="7.0084, 100.4767 (คอหงส์ หาดใหญ่ สงขลา)" className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-slate-600 font-bold">ชื่อผู้ประสานงานหลัก</label>
                <input type="text" defaultValue="นายณัฐวุฒิ ใจดี" className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50" />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-600 font-bold">เบอร์โทรศัพท์ติดต่อ</label>
                <input type="text" defaultValue="074-200-000 ต่อ 112" className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50" />
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
              <div>
                <span className="font-bold text-slate-800 block">เปิดใช้งานความปลอดภัยการสแกน Face ID</span>
                <span className="text-[10px] text-slate-400 font-medium">บังคับสแกนลายนิ้วมือหรือ Face ID สำหรับผู้ควบคุมสแกนทุกครั้งก่อนตรวจสอบลายเซ็น</span>
              </div>
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow">
              บันทึกการตั้งค่าหน่วยงาน
            </button>

          </form>
        </div>
      )}


      {/* -------------------------------------------------------------
          6. ADD ACTIVITY MODAL DIALOG
          ------------------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h3 className="text-base font-black text-slate-800">เพิ่มกิจกรรมบำเพ็ญประโยชน์ใหม่</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewActivity} className="space-y-4 text-xs text-left">
              
              <div className="space-y-1">
                <label className="block text-slate-600 font-bold">ชื่อกิจกรรมบำเพ็ญประโยชน์</label>
                <input 
                  type="text" 
                  required
                  placeholder="เช่น ทำความสะอาดลานวัด, ปรับภูมิทัศน์ชุมชน" 
                  value={newActTitle}
                  onChange={(e) => setNewActTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-600 font-bold">สถานที่ทำความดี (วัด/ชุมชน)</label>
                <input 
                  type="text" 
                  required
                  placeholder="เช่น วัดหัวขวางพระอารามหลวง, โรงเรียนชุมชน" 
                  value={newActLocation}
                  onChange={(e) => setNewActLocation(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-600 font-bold">ประเภทหมวดหมู่งาน</label>
                  <select 
                    value={newActCategory}
                    onChange={(e) => setNewActCategory(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white cursor-pointer"
                  >
                    <option>สาธารณประโยชน์</option>
                    <option>พัฒนาสิ่งแวดล้อม</option>
                    <option>การศึกษา</option>
                    <option>พัฒนาชุมชน</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-600 font-bold">ชั่วโมงสะสมสะสม</label>
                  <input 
                    type="number" 
                    min={1}
                    max={24}
                    value={newActHours}
                    onChange={(e) => setNewActHours(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-600 font-bold">จำนวนคนรับสมัครสูงสุด</label>
                  <input 
                    type="number" 
                    min={5}
                    max={100}
                    value={newActMax}
                    onChange={(e) => setNewActMax(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-600 font-bold">วันที่จัดกิจกรรม</label>
                  <input 
                    type="date" 
                    value={newActDate}
                    onChange={(e) => setNewActDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/15"
                >
                  บันทึกสร้างกิจกรรม
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
