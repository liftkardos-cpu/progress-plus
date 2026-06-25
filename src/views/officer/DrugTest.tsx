import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Activity, 
  Search, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Clock, 
  AlertTriangle,
  Beaker
} from "lucide-react";

export const DrugTest: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // New drug test record form state
  const [newTest, setNewTest] = useState({
    name: "นายสมชาย ใจดี",
    date: "2026-06-25",
    result: "ไม่พบสารเสพติด (ผ่าน)",
    labNo: "LAB-67204",
    note: "ตรวจคัดกรองปัสสาวะด้วยชุดตรวจสารแอมเฟตามีน"
  });

  // Drug test log histories
  const [tests, setTests] = useState([
    {
      id: "DT-001",
      name: "นายสมชาย ใจดี",
      idCode: "PB6705-123456",
      date: "02 มิถุนายน 2567",
      result: "ผ่าน (ปกติ)",
      labNo: "LAB-67104",
      note: "สุ่มตรวจสารเสพติดเมทแอมเฟตามีนประจำเดือน ผ่านเกณฑ์ปกติ",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      id: "DT-002",
      name: "นายธนวัฒน์ รักดี",
      idCode: "PB6705-123457",
      date: "14 พฤษภาคม 2567",
      result: "พบสารแอมเฟตามีน (ตกเกณฑ์)",
      labNo: "LAB-67098",
      note: "ผลตรวจสารปัสสาวะเป็นบวก ได้ทำรายงานเสนอส่งตัวเข้าบำบัดฟื้นฟูค่ายปรับเปลี่ยนพฤติกรรม",
      statusColor: "text-red-500 bg-red-50 border-red-100 animate-pulse"
    },
    {
      id: "DT-003",
      name: "นายวิชัย ใจกล้า",
      idCode: "PB6705-123458",
      date: "10 พฤษภาคม 2567",
      result: "ผ่าน (ปกติ)",
      labNo: "LAB-67085",
      note: "ตรวจประจำงวด 4 ผลคัดกรองปกติ ปัสสาวะสะอาด",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      id: "DT-004",
      name: "นางสาวสมใจ นึกงาม",
      idCode: "PB6705-123459",
      date: "12 มิถุนายน 2567",
      result: "ผ่าน (ปกติ)",
      labNo: "LAB-67120",
      note: "ตรวจคัดกรองปกติเรียบร้อยดี",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
    }
  ]);

  const handleRecordTest = () => {
    const formattedDate = new Date(newTest.date).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const isPassed = newTest.result.includes("ไม่พบ");

    const newObj = {
      id: `DT-${Date.now()}`,
      name: newTest.name,
      idCode: "PB6705-" + Math.floor(100000 + Math.random() * 900000),
      date: formattedDate,
      result: isPassed ? "ผ่าน (ปกติ)" : "พบสารแอมเฟตามีน (ตกเกณฑ์)",
      labNo: newTest.labNo,
      note: newTest.note,
      statusColor: isPassed 
        ? "text-emerald-600 bg-emerald-50 border-emerald-100"
        : "text-red-500 bg-red-50 border-red-100 animate-pulse"
    };

    setTests([newObj, ...tests]);
    setShowAddForm(false);
    alert("✓ บันทึกประวัติผลตรวจสารเสพติดประจำตัวคดีเรียบร้อย พร้อมปรับสถานะความเสี่ยงในดัชนีเรียบร้อย");
  };

  const filteredTests = tests.filter(t => t.name.includes(searchTerm) || t.idCode.includes(searchTerm));

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-[#0f2d59]">ระบบประวัติการตรวจสารเสพติด (Urine Drug Test Logs)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            บันทึกผลการตรวจปัสสาวะคัดกรองสารเสพติด ยืนยันใบรับรองแพทย์ห้องปฏิบัติการทางนิติวิทยาศาสตร์
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow transition-all flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>บันทึกผลการตรวจใหม่</span>
        </button>
      </div>

      {/* Main filter container */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาชื่อผู้ถูกตรวจ, รหัสทะเบียน..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50/50 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Grid of logs cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4 relative overflow-hidden">
            
            <div className="flex items-start justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Beaker className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">{test.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold">รหัส: {test.idCode}</span>
                </div>
              </div>

              <span className={`px-2.5 py-1 text-[9.5px] font-black rounded-lg border ${test.statusColor}`}>
                {test.result}
              </span>
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-600">
              <p className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>วันที่ตรวจ: <span className="text-slate-800">{test.date}</span></span>
              </p>
              <p className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>เลขที่ห้องแล็บ: <span className="font-mono text-slate-800">{test.labNo}</span></span>
              </p>
              
              <div className="mt-2 pt-2 border-t border-slate-50 space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">คำสั่ง / ความเห็นของเจ้าหน้าที่คุมประพฤติ:</span>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  "{test.note}"
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* FORM MODAL: Record drug test results */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-black text-[#0f2d59]">บันทึกผลคัดกรองสารเสพติด</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-bold">
                บันทึกผลปัสสาวะเพื่อยืนยันพฤติกรรมวินัยการฟื้นฟู
              </p>
            </div>

            <div className="space-y-3.5 text-xs font-bold text-slate-600">
              
              {/* Select probationer */}
              <div className="space-y-1">
                <label className="block text-[11px] text-slate-400">เลือกผู้ส่งตรวจ:</label>
                <select
                  value={newTest.name}
                  onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="นายสมชาย ใจดี">นายสมชาย ใจดี</option>
                  <option value="นายธนวัฒน์ รักดี">นายธนวัฒน์ รักดี</option>
                  <option value="นายวิชัย ใจกล้า">นายวิชัย ใจกล้า</option>
                  <option value="นางสาวสมใจ นึกงาม">นางสาวสมใจ นึกงาม</option>
                </select>
              </div>

              {/* Select Result */}
              <div className="space-y-1">
                <label className="block text-[11px] text-slate-400">ผลการตรวจทางเคมี:</label>
                <select
                  value={newTest.result}
                  onChange={(e) => setNewTest({ ...newTest, result: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="ไม่พบสารเสพติด (ผ่าน)">ไม่พบสารเสพติด (ผ่าน / ปกติ)</option>
                  <option value="พบสารแอมเฟตามีน (ตกเกณฑ์)">พบสารแอมเฟตามีน (บวก / ตกเกณฑ์)</option>
                </select>
              </div>

              {/* Lab code and test date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-400">เลขคุมแล็บ LAB NO:</label>
                  <input
                    type="text"
                    value={newTest.labNo}
                    onChange={(e) => setNewTest({ ...newTest, labNo: e.target.value })}
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-400">วันที่ตรวจวัด:</label>
                  <input
                    type="date"
                    value={newTest.date}
                    onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Comment text */}
              <div className="space-y-1">
                <label className="block text-[11px] text-slate-400">ระบุความเห็นพฤติกรรม:</label>
                <input
                  type="text"
                  value={newTest.note}
                  onChange={(e) => setNewTest({ ...newTest, note: e.target.value })}
                  placeholder="เช่น สุ่มสกัดตรวจปัสสาวะพบผลปกติเรียบร้อย"
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none"
                />
              </div>

            </div>

            {/* Modal actions buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2 text-xs font-bold">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleRecordTest}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl shadow-md transition-all"
              >
                บันทึกประวัติแล็บ
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
