// ==========================================
// 🇹🇭 ไฟล์: /src/views/officer/OfficerReports.tsx
// คำอธิบาย: ระบบตรวจสอบและอนุมัติการรายงานตัวออนไลน์ของผู้ถูกคุมประพฤติ (Officer Online Reports Auditing)
// โครงสร้างไฟล์:
//   - ส่วนนำเข้าข้อมูลและหัวใบงาน (Imports)
//   - แผงข้อมูลตารางแสดงผู้รายงานตัวออนไลน์ (Reports Table View)
//   - ฟังก์ชันจัดการกดยืนยันอนุมัติหรือปฏิเสธรายงานตัว (Approval and Reject Functions)
//   - แสดงรูปถ่ายคู่พิกัดจีพีเอสจริงในเขต สงขลา (Audit Details Card with GPS Location Check)
// ==========================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  FileText, 
  Search, 
  CheckSquare, 
  XSquare, 
  AlertCircle, 
  Calendar, 
  Clock, 
  UserCheck,
  CheckCircle,
  Clock3
} from "lucide-react";

export const OfficerReports: React.FC = () => {
  const { notifications } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");

  // Mock list of online reports sent by probationers
  const [reports, setReports] = useState([
    {
      id: "REP-6701",
      probationerId: "PB6705-123456",
      name: "นายสมชาย ใจดี",
      date: "25 มิถุนายน 2567",
      time: "08:30 น.",
      location: "สำนักงานคุมประพฤติจังหวัดสงขลา (GPS: 7.1476, 100.6128)",
      text: "ข้าพเจ้านายสมชาย ใจดี มารายงานตัวงวดที่ 8 ประจำเดือนมิถุนายน เรียบร้อยแล้ว ปัจจุบันตั้งใจประกอบสัมมาชีพสุจริต และไม่ได้ไปยุ่งเกี่ยวกับสิ่งเสพติดแต่อย่างใด พฤติกรรมปกดีครับ",
      status: "รออนุมัติ",
      photoUrl: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="r_ส" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#r_ส)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="\'Sarabun\', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ส</text></svg>')}`
    },
    {
      id: "REP-6702",
      probationerId: "PB6705-123459",
      name: "นางสาวสมใจ นึกงาม",
      date: "24 มิถุนายน 2567",
      time: "14:15 น.",
      location: "รายงานตัวออนไลน์ผ่าน Application (GPS: 13.7563, 100.5018)",
      text: "นางสาวสมใจ นึกงาม ประสงค์รายงานตัวออนไลน์งวดที่ 4 ประจำเดือนนี้ ปัจจุบันประกอบอาชีพพนักงานขายเสื้อผ้า ไม่ได้ไปยุ่งเกี่ยวกับกลุ่มเสี่ยง และพยายามทำกิจกรรมความดีสะสมชั่วโมงครบถ้วนตามกำหนดค่ะ",
      status: "อนุมัติแล้ว",
      photoUrl: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="r_ส_2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4c0519"/><stop offset="100%" stop-color="#881337"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#r_ส_2)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="\'Sarabun\', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ส</text></svg>')}`
    },
    {
      id: "REP-6703",
      probationerId: "PB6705-123457",
      name: "นายธนวัฒน์ รักดี",
      date: "22 มิถุนายน 2567",
      time: "10:00 น.",
      location: "รายงานตัวออนไลน์ผ่าน App (GPS: 14.0203, 100.5342)",
      text: "มารายงานตัวออนไลน์ครับ เดือนนี้ได้ไปบำบัดรักษาฟื้นฟูตามที่นัดหมายไว้ พยายามหลีกเลี่ยงเพื่อนฝูงเก่าๆ และตรวจปัสสาวะผ่านทุกครั้งครับ",
      status: "อนุมัติแล้ว",
      photoUrl: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="r_ธ" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#172554"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#r_ธ)"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/><text x="50" y="52" font-family="\'Sarabun\', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ธ</text></svg>')}`
    }
  ]);

  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: "อนุมัติแล้ว" } : r));
    alert("✓ อนุมัติการรายงานตัวออนไลน์เรียบร้อย ข้อมูลบันทึกประวัติการปฏิบัติตามวินัยเรียบร้อย");
  };

  const handleReject = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: "ต้องตรวจสอบเพิ่ม" } : r));
    alert("⚠️ ตีกลับการรายงานตัว เพื่อเรียกตัวเข้ามาสอบถามพฤติกรรมในหน่วยงาน ณ สถานที่จริง");
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.name.includes(searchTerm) || r.probationerId.includes(searchTerm);
    const matchesStatus = statusFilter === "ทั้งหมด" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">ระบบอนุมัติการรายงานตัวออนไลน์</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          ตรวจสอบความถูกต้องของข้อมูล พิกัดพิกัด GPS ภาพถ่ายใบหน้า และรายละเอียดพฤติกรรมก่อนทำการยืนยัน
        </p>
      </div>

      {/* Filter and search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาชื่อผู้รายงานตัว, รหัส..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50/50 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700 outline-none w-full sm:w-auto"
        >
          <option value="ทั้งหมด">สถานะ: ทั้งหมด</option>
          <option value="รออนุมัติ">รออนุมัติ</option>
          <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
          <option value="ต้องตรวจสอบเพิ่ม">ต้องตรวจสอบเพิ่ม</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-6">
            
            {/* Selfie Photo and GPS details */}
            <div className="w-full md:w-48 shrink-0 flex flex-col items-center space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">ภาพถ่ายเซลฟี่ยืนยัน</span>
              <img
                src={report.photoUrl}
                alt="Selfie"
                className="w-36 h-36 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
              />
              <span className="text-[10.5px] font-bold text-emerald-600 flex items-center bg-emerald-50 py-1 px-2.5 rounded-lg">
                🟢 ยืนยันพิกัดสด GPS
              </span>
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-slate-50 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-black text-slate-800">{report.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">ID: {report.probationerId}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-bold mt-1.5">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>วันที่รายงาน: {report.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>เวลา: {report.time}</span>
                    </span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                  report.status === "อนุมัติแล้ว"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : report.status === "รออนุมัติ"
                    ? "bg-blue-50 text-blue-700 border border-blue-100 animate-pulse"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}>
                  {report.status}
                </span>
              </div>

              {/* Message block */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ข้อความคำแถลงและพฤติกรรมจากผู้ถูกคุม:</span>
                <p className="text-xs text-slate-600 leading-relaxed font-bold bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                  "{report.text}"
                </p>
              </div>

              {/* Meta localization GPS path */}
              <div className="text-[10.5px] text-slate-500 font-bold">
                📍 พิกัดการบันทึก: <span className="text-slate-700 font-semibold">{report.location}</span>
              </div>

              {/* Action buttons */}
              {report.status === "รออนุมัติ" && (
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => handleApprove(report.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow transition-all flex items-center space-x-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>ยืนยันอนุมัติ</span>
                  </button>
                  <button
                    onClick={() => handleReject(report.id)}
                    className="bg-white hover:bg-red-50 text-red-500 border border-red-200 font-bold text-xs py-2 px-4 rounded-xl shadow-sm transition-all"
                  >
                    ตีกลับเพื่อตรวจสอบ
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
