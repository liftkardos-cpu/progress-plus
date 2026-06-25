import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  HeartHandshake, 
  Clock, 
  FileCheck, 
  Users, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Search,
  CheckCircle,
  XCircle,
  FileText,
  Building,
  QrCode
} from "lucide-react";

export const VolunteerControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState("กิจกรรมที่กำลังดำเนินการ");

  // Activities list matching image 4
  const [activities, setActivities] = useState([
    {
      id: "ACT-101",
      title: "บำเพ็ญประโยชน์ทำความสะอาดกวาดลานวัด",
      location: "วัดชลประทานรังสฤษฏ์ พระอารามหลวง จ.นนทบุรี",
      date: "25 มิถุนายน 2567",
      hours: 6,
      currentParticipants: 8,
      maxParticipants: 15,
      status: "เปิดรับสมัคร",
      agency: "เทศบาลนครนนทบุรี",
      type: "บำรุงศาสนสถาน"
    },
    {
      id: "ACT-102",
      title: "ปลูกป่าชายเลนและอนุรักษ์แนวปะการังชายฝั่งจิตอาสา",
      location: "ศูนย์ศึกษาธรรมชาติกองทัพบกบางปู จ.สมุทรปราการ",
      date: "28 มิถุนายน 2567",
      hours: 8,
      currentParticipants: 15,
      maxParticipants: 15,
      status: "เต็มแล้ว",
      agency: "กรมป่าไม้ / มูลนิธิป่าชายเลน",
      type: "สิ่งแวดล้อม"
    },
    {
      id: "ACT-103",
      title: "ช่วยจัดเตรียมอาหารและทำความสะอาดสถานรับเลี้ยงสุนัขจรจัด",
      location: "ศูนย์พักพิงสัตว์ไร้บ้านปากเกร็ด จ.นนทบุรี",
      date: "30 มิถุนายน 2567",
      hours: 4,
      currentParticipants: 5,
      maxParticipants: 10,
      status: "เปิดรับสมัคร",
      agency: "สมาคมพิทักษ์สัตว์ไทย",
      type: "ช่วยเหลือสัตว์"
    }
  ]);

  // Network partner request submissions matching image 4
  const [requests, setRequests] = useState([
    {
      id: "REQ-201",
      title: "กิจกรรมปรับปรุงภูมิทัศน์ทาสีทางม้าลายและรั้วโรงเรียน",
      agency: "โรงเรียนเทศบาลปากเกร็ด / เทศบาลนครปากเกร็ด",
      date: "05 กรกฎาคม 2567",
      hours: 6,
      targetParticipants: 20,
      status: "รอพิจารณา",
      contact: "นายพรหมมินทร์ (082-345-6789)"
    },
    {
      id: "REQ-202",
      title: "อาสาจัดหนังสือทำสื่อการเรียนรู้สำหรับเด็กพิการทางสายตา",
      agency: "ห้องสมุดคนตาบอดแห่งชาติ",
      date: "12 กรกฎาคม 2567",
      hours: 4,
      targetParticipants: 12,
      status: "รอพิจารณา",
      contact: "น.ส.อารยา (089-765-4321)"
    }
  ]);

  const handleApproveRequest = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (req) {
      // Add to activities
      const newAct = {
        id: `ACT-${Date.now()}`,
        title: req.title,
        location: req.agency,
        date: req.date,
        hours: req.hours,
        currentParticipants: 0,
        maxParticipants: req.targetParticipants,
        status: "เปิดรับสมัคร",
        agency: req.agency,
        type: "จิตอาสาชุมชน"
      };
      setActivities([newAct, ...activities]);
      setRequests(prev => prev.filter(r => r.id !== id));
      alert(`✓ อนุมัติจัดกิจกรรม "${req.title}" สำเร็จ! กิจกรรมถูกขึ้นทะเบียนพร้อมเปิดสมัครทางเบราว์เซอร์ผู้ถูกคุมประพฤติแล้ว`);
    }
  };

  const handleRejectRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    alert("❌ ปฏิเสธคำร้องขอกิจกรรมเรียบร้อย ระบบได้แจ้งผลกลับไปยังหน่วยงานภาคีหลัก");
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">ระบบจัดการงานบริการสังคมและกิจกรรมอาสา</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          อนุมัติกิจกรรมจากภาคี พาสปอร์ตเช็กชื่อสแกนเวลา QR Code สะสมคะแนนความประพฤติ
        </p>
      </div>

      {/* 3 Stats blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold text-slate-400 block">ชั่วโมงบำเพ็ญรวมสะสม</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-[#0f2d59]">24,356</span>
              <span className="text-xs text-slate-500 font-bold">ชม.</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold block mt-1">✓ ตรวจวัดตามเกณฑ์มาตรฐาน</span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-full">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold text-slate-400 block">กิจกรรมสาธารณะที่เปิดอยู่</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-blue-600">{activities.length}</span>
              <span className="text-xs text-slate-500 font-bold">งาน</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">ประสานงานกับหน่วยงานภาคี</span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-full">
            <HeartHandshake className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold text-slate-400 block">ผู้เข้าร่วมบำเพ็ญประโยชน์เดือนนี้</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-600">248</span>
              <span className="text-xs text-slate-500 font-bold">ราย</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold block mt-1">↑ 18.5% จากเดือนก่อน</span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-full">
            <Users className="w-5.5 h-5.5" />
          </div>
        </div>
      </div>

      {/* Main split control panel (Left: active activities, Right: partner applications) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Active Activities (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider">บัญชีรายชื่อกิจกรรมอาสาบำเพ็ญที่กำลังดำเนินงาน</h3>
              <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2.5 py-0.5 rounded-full">
                {activities.length} งานที่ใช้งานอยู่
              </span>
            </div>

            {/* List */}
            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-all bg-slate-50/20 space-y-3">
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2 py-0.5 rounded-md">
                        {act.type}
                      </span>
                      <h4 className="text-[13px] font-black text-slate-800 mt-1.5 leading-relaxed">
                        {act.title}
                      </h4>
                    </div>

                    <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-full ${
                      act.status === "เปิดรับสมัคร" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {act.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 font-bold">
                    <p className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1 font-medium">{act.location}</span>
                    </p>
                    <p className="flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-500">หน่วยงานรับผิดชอบ: {act.agency}</span>
                    </p>
                  </div>

                  {/* Activity Stats details */}
                  <div className="grid grid-cols-3 gap-3 bg-white p-2.5 rounded-xl border border-slate-100 text-center text-xs font-bold text-slate-700">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">สะสมชั่วโมงคดี</span>
                      <span className="text-blue-600 font-black text-sm">{act.hours} ชม.</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">วันที่ปฏิบัติงาน</span>
                      <span className="text-slate-600 text-[10px] leading-relaxed block mt-0.5">{act.date}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">จำนวนผู้สมัคร</span>
                      <span className="text-slate-700 font-black text-sm">{act.currentParticipants} / {act.maxParticipants} คน</span>
                    </div>
                  </div>

                  {/* Button interactions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400 font-bold">ID: {act.id}</span>
                    
                    <div className="flex items-center space-x-1.5">
                      <button 
                        onClick={() => alert(`📌 กำลังดึงไฟล์พาสปอร์ตอาสาบำเพ็ญงานและสร้าง QR Code เช็กอินสำหรับกิจกรรมนี้...`)}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-[10.5px] font-bold transition-all flex items-center space-x-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>สร้างป้ายคิวสแกน QR</span>
                      </button>
                      <button 
                        onClick={() => alert(`📊 ตรวจสอบข้อมูลผู้สมัครจำนวน ${act.currentParticipants} รายเพื่ออนุมัติเวลาการทำงานความดี`)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-[10.5px] font-bold transition-all"
                      >
                        อนุมัติเวลาอาสา
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Side: Network partner request submissions (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider">คำขออนุญาตจัดกิจกรรมใหม่จากหน่วยงานภาคี</h3>
              <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2.5 py-0.5 rounded-full">
                {requests.length} คำร้องใหม่
              </span>
            </div>

            {/* List of Applications */}
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-6 text-slate-400 font-bold text-xs">
                  ไม่มีคำร้องค้างคาในระบบ
                </div>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="p-4 border border-amber-100 rounded-2xl bg-amber-50/20 space-y-3 relative">
                    <span className="absolute top-3.5 right-3.5 text-[9px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full animate-pulse">
                      รออนุมัติ
                    </span>

                    <span className="text-[9px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded">
                      สะสม {req.hours} ชั่วโมง
                    </span>

                    <h4 className="text-xs font-black text-slate-800 mt-1 leading-relaxed pr-12">
                      {req.title}
                    </h4>

                    <div className="space-y-1.5 text-[11px] text-slate-600 font-bold">
                      <p>จัดโดย: <span className="text-slate-800">{req.agency}</span></p>
                      <p>วันที่เสนอ: <span className="text-slate-800">{req.date}</span></p>
                      <p>เป้าหมายรับสมัคร: <span className="text-slate-800">{req.targetParticipants} คน</span></p>
                      <p>ผู้ประสานงาน: <span className="text-blue-600">{req.contact}</span></p>
                    </div>

                    {/* Approve/Reject buttons */}
                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-amber-200/30">
                      <button
                        onClick={() => handleRejectRequest(req.id)}
                        className="bg-white hover:bg-red-50 text-red-500 border border-red-200 text-[10.5px] font-bold py-1.5 px-3 rounded-lg transition-all"
                      >
                        ปฏิเสธ
                      </button>
                      <button
                        onClick={() => handleApproveRequest(req.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-[10.5px] font-bold py-1.5 px-3 rounded-lg transition-all shadow"
                      >
                        อนุมัติและเปิดรับสมัคร
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
