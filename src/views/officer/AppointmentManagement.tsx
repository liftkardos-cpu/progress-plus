import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  MoreVertical, 
  Trash2,
  FileText,
  Activity,
  HeartHandshake
} from "lucide-react";

export const AppointmentManagement: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState("มิถุนายน 2567");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New appointment state form
  const [newAppt, setNewAppt] = useState({
    name: "นายสมชาย ใจดี",
    date: "2026-06-25",
    time: "09:00",
    type: "รายงานตัวประจำงวด",
    note: "ติดตามความคืบหน้าการทำงานชั่วโมงอาสา"
  });

  // Week appointments
  const [appointments, setAppointments] = useState([
    {
      id: "APT-001",
      name: "นายสมชาย ใจดี",
      idCode: "PB6705-123456",
      type: "รายงานตัวประจำงวด",
      date: "25 มิถุนายน 2567",
      time: "09:00 น.",
      status: "ยืนยันนัด",
      color: "border-blue-500 text-blue-700 bg-blue-50"
    },
    {
      id: "APT-002",
      name: "นายธนวัฒน์ รักดี",
      idCode: "PB6705-123457",
      type: "ตรวจหาสารเสพติด",
      date: "26 มิถุนายน 2567",
      time: "10:30 น.",
      status: "ยืนยันนัด",
      color: "border-amber-500 text-amber-700 bg-amber-50"
    },
    {
      id: "APT-003",
      name: "นายวิชัย ใจกล้า",
      idCode: "PB6705-123458",
      type: "กิจกรรมบริการสังคมบำเพ็ญสาธารณประโยชน์",
      date: "28 มิถุนายน 2567",
      time: "08:00 น.",
      status: "รอยืนยัน",
      color: "border-emerald-500 text-emerald-700 bg-emerald-50 animate-pulse"
    },
    {
      id: "APT-004",
      name: "นางสาวสมใจ นึกงาม",
      idCode: "PB6705-123459",
      type: "แผนฟื้นฟูและปรับทัศนคติ",
      date: "29 มิถุนายน 2567",
      time: "13:00 น.",
      status: "ยืนยันนัด",
      color: "border-purple-500 text-purple-700 bg-purple-50"
    }
  ]);

  const handleCreate = () => {
    const formattedDate = new Date(newAppt.date).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const newObj = {
      id: `APT-${Date.now()}`,
      name: newAppt.name,
      idCode: "PB6705-" + Math.floor(100000 + Math.random() * 900000),
      type: newAppt.type,
      date: formattedDate,
      time: newAppt.time + " น.",
      status: "ยืนยันนัด",
      color: newAppt.type.includes("ตรวจ") 
        ? "border-amber-500 text-amber-700 bg-amber-50"
        : newAppt.type.includes("บำเพ็ญ")
        ? "border-emerald-500 text-emerald-700 bg-emerald-50"
        : "border-blue-500 text-blue-700 bg-blue-50"
    };

    setAppointments([newObj, ...appointments]);
    setShowAddModal(false);
    alert("✓ บันทึกคิวนัดหมายลงในปฏิทินส่วนกลาง และจัดส่งข้อความแจ้งเตือนทาง SMS ไปยังผู้ถูกคุมประพฤติ เรียบร้อย");
  };

  const handleCancelAppt = (id: string) => {
    if (confirm("ต้องการลบเวลานัดหมายนี้ใช่หรือไม่?")) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and top bar actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-[#0f2d59]">ระบบติดตามตารางนัดหมาย</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            สร้างนัด รายงานตัวนัดวิชาชีพ ตรวจสารเสพติด ตรวจปัสสาวะ และพาสปอร์ตอาสาบำเพ็ญธรรม
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>สร้างนัดหมายใหม่</span>
        </button>
      </div>

      {/* Main Grid Calendar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Weekly List of Appointments (5 columns) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <span className="text-xs font-black text-[#0f2d59] uppercase tracking-wider block">รายการนัดหมายสัปดาห์นี้</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2.5 py-0.5 rounded-full">
                {appointments.length} รายการ
              </span>
            </div>

            <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
              {appointments.map((appt) => (
                <div key={appt.id} className={`p-4 border-l-4 rounded-xl shadow-sm transition-all relative ${appt.color}`}>
                  
                  {/* Delete button top right */}
                  <button 
                    onClick={() => handleCancelAppt(appt.id)}
                    className="absolute top-3.5 right-3.5 text-slate-400 hover:text-red-500 transition-colors"
                    title="ลบนัดหมาย"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-black">{appt.name}</span>
                    <span className="text-[9px] text-slate-400 font-bold">({appt.idCode})</span>
                  </div>

                  <p className="text-[11px] font-bold mt-1.5 leading-relaxed">
                    ภารกิจ: {appt.type}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] mt-2.5 font-bold text-slate-500 border-t border-slate-100 pt-2">
                    <span className="flex items-center space-x-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{appt.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{appt.time}</span>
                    </span>
                  </div>

                  <span className="text-[9.5px] font-black uppercase mt-2.5 inline-block bg-white/75 px-2.5 py-0.5 rounded-full border">
                    สถานะ: {appt.status}
                  </span>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Calendar Sheet representation (7 columns) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header calendar navigation */}
            <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
              <h3 className="text-sm font-black text-[#0f2d59] flex items-center space-x-2">
                <CalendarIcon className="w-4.5 h-4.5 text-blue-600" />
                <span>{currentMonth}</span>
              </h3>
              
              <div className="flex items-center space-x-1">
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid days layout */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-2">
              <div>อา</div>
              <div>จ</div>
              <div>อ</div>
              <div>พ</div>
              <div>พฤ</div>
              <div>ศ</div>
              <div>ส</div>
            </div>

            {/* Month Days Numbers Grid (June 2026 representation starting Monday 1st) */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-slate-700">
              {/* Empty days padding */}
              <div className="aspect-square bg-slate-50/20 rounded-xl" />
              
              {Array.from({ length: 30 }).map((_, idx) => {
                const dayNum = idx + 1;
                
                // Color badges depending on appointments days
                let hasAppt = false;
                let badgeColor = "";
                
                if (dayNum === 25) {
                  hasAppt = true;
                  badgeColor = "bg-blue-500";
                } else if (dayNum === 26) {
                  hasAppt = true;
                  badgeColor = "bg-amber-500";
                } else if (dayNum === 28) {
                  hasAppt = true;
                  badgeColor = "bg-emerald-500";
                } else if (dayNum === 29) {
                  hasAppt = true;
                  badgeColor = "bg-purple-500";
                }

                return (
                  <div 
                    key={idx} 
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative cursor-pointer hover:bg-blue-50/50 transition-all border ${
                      dayNum === 25 
                        ? "border-blue-200 bg-blue-50/20 font-black text-blue-600 ring-2 ring-blue-600/10" 
                        : "border-slate-100"
                    }`}
                  >
                    <span>{dayNum}</span>
                    {hasAppt && (
                      <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${badgeColor}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar legends and status colors */}
          <div className="border-t border-slate-50 pt-4 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10.5px] font-bold text-slate-500">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block" />
              <span>รายงานตัวประจำเดือน</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" />
              <span>ตรวจสารปัสสาวะ</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
              <span>บำเพ็ญสังคมอาสา</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-purple-500 inline-block" />
              <span>ปรับปรุงฟื้นฟูเจตคติ</span>
            </span>
          </div>

        </div>

      </div>

      {/* MODAL: Create appointment Form */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-black text-[#0f2d59]">สร้างรายการนัดหมายใหม่</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-bold">
                เพิ่มกำหนดรายงานตัวหรืองานบำเพ็ญสาธารณะเข้าฐานระบบ
              </p>
            </div>

            <div className="space-y-3.5 text-xs font-bold text-slate-600">
              {/* Select probationer */}
              <div className="space-y-1">
                <label className="block text-[11px] text-slate-400">เลือกผู้ถูกคุมประพฤติ:</label>
                <select
                  value={newAppt.name}
                  onChange={(e) => setNewAppt({ ...newAppt, name: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="นายสมชาย ใจดี">นายสมชาย ใจดี</option>
                  <option value="นายธนวัฒน์ รักดี">นายธนวัฒน์ รักดี</option>
                  <option value="นายวิชัย ใจกล้า">นายวิชัย ใจกล้า</option>
                  <option value="นางสาวสมใจ นึกงาม">นางสาวสมใจ นึกงาม</option>
                </select>
              </div>

              {/* Select Type */}
              <div className="space-y-1">
                <label className="block text-[11px] text-slate-400">ประเภทงานนัดหมาย:</label>
                <select
                  value={newAppt.type}
                  onChange={(e) => setNewAppt({ ...newAppt, type: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="รายงานตัวประจำงวด">รายงานตัวประจำงวด</option>
                  <option value="ตรวจหาสารเสพติด">ตรวจหาสารเสพติด (ตรวจปัสสาวะ)</option>
                  <option value="กิจกรรมบริการสังคมบำเพ็ญสาธารณประโยชน์">กิจกรรมบริการสังคมบำเพ็ญสาธารณประโยชน์</option>
                  <option value="แผนฟื้นฟูและปรับทัศนคติ">แผนฟื้นฟูและปรับทัศนคติ</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-400">วันที่นัด:</label>
                  <input
                    type="date"
                    value={newAppt.date}
                    onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-400">เวลานัด:</label>
                  <input
                    type="time"
                    value={newAppt.time}
                    onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="block text-[11px] text-slate-400">หมายเหตุ / คำสั่งเจ้าหน้าที่เพิ่มเติม:</label>
                <input
                  type="text"
                  value={newAppt.note}
                  onChange={(e) => setNewAppt({ ...newAppt, note: e.target.value })}
                  placeholder="เช่น ตรวจปัสสาวะหาสารเสพติดประเภท 1"
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* Modal actions buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2 text-xs font-bold">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl shadow-md transition-all"
              >
                บันทึกกำหนดนัด
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
