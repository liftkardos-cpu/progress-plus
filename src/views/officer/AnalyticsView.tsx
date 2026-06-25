import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  PieChart as PieIcon 
} from "lucide-react";

export const AnalyticsView: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState("ปีงบประมาณ 2567");

  // Monthly reporting attendance rate
  const complianceData = [
    { name: "ม.ค.", "มาตามนัด": 92.5, "ขาดรายงานตัว": 7.5 },
    { name: "ก.พ.", "มาตามนัด": 91.8, "ขาดรายงานตัว": 8.2 },
    { name: "มี.ค.", "มาตามนัด": 93.1, "ขาดรายงานตัว": 6.9 },
    { name: "เม.ย.", "มาตามนัด": 89.5, "ขาดรายงานตัว": 10.5 },
    { name: "พ.ค.", "มาตามนัด": 94.2, "ขาดรายงานตัว": 5.8 },
    { name: "มิ.ย.", "มาตามนัด": 95.0, "ขาดรายงานตัว": 5.0 },
  ];

  // Success closed cases cumulative trend
  const trendData = [
    { name: "ไตรมาส 1", "ผู้สำเร็จการคุมประพฤติ": 1420, "เสพซ้ำ/ทำผิดซ้ำ": 42 },
    { name: "ไตรมาส 2", "ผู้สำเร็จการคุมประพฤติ": 1850, "เสพซ้ำ/ทำผิดซ้ำ": 38 },
    { name: "ไตรมาส 3", "ผู้สำเร็จการคุมประพฤติ": 2100, "เสพซ้ำ/ทำผิดซ้ำ": 29 },
    { name: "ไตรมาส 4", "ผู้สำเร็จการคุมประพฤติ": 2480, "เสพซ้ำ/ทำผิดซ้ำ": 15 },
  ];

  const handleExport = (format: string) => {
    alert(`📥 ระบบกำลังสร้างรายงานสถิติวิเคราะห์เชิงลึก รูปแบบ ${format} และเตรียมดาวน์โหลดลงเครื่องคอมพิวเตอร์ของคุณ...`);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-[#0f2d59]">ระบบวิเคราะห์ข้อมูลและรายงานสถิติ (Big Data Analytics)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ประมวลผลดัชนีชี้วัดผลงานหลัก อัตราการรายงานตัว อัตราเสพซ้ำ และรายงานปิดแฟ้มความร่วมมือร่วมกับกระทรวงยุติธรรม
          </p>
        </div>

        {/* Action export buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => handleExport("PDF")}
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow transition-all flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออก PDF</span>
          </button>
          <button
            onClick={() => handleExport("Excel")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow transition-all flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออก Excel</span>
          </button>
        </div>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Compliance bars */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider">อัตราความร่วมมือการรายงานตัว (%)</h3>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 py-1 px-2 rounded">
              เป้าเกณฑ์ขั้นต่ำ: 90%
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B", fontWeight: "bold" }} stroke="#E2E8F0" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748B", fontWeight: "bold" }} stroke="#E2E8F0" />
                <Tooltip />
                <Bar dataKey="มาตามนัด" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="ขาดรายงานตัว" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-5 text-xs font-bold text-slate-600 pt-1">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span>มาตามนัดหมาย</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span>ขาดรายงานตัว/หลีกเลี่ยง</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Success and Relapse Areas cumulative */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#0f2d59] uppercase tracking-wider">ดัชนีวัดผลความสำเร็จสะสมรายไตรมาส</h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 py-1 px-2 rounded-full">
              อัตราเสพซ้ำต่ำสุดเป็นประวัติการณ์
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B", fontWeight: "bold" }} stroke="#E2E8F0" />
                <YAxis tick={{ fontSize: 10, fill: "#64748B", fontWeight: "bold" }} stroke="#E2E8F0" />
                <Tooltip />
                <Area type="monotone" dataKey="ผู้สำเร็จการคุมประพฤติ" stroke="#10B981" fillOpacity={0.1} fill="#10B981" strokeWidth={2} />
                <Area type="monotone" dataKey="เสพซ้ำ/ทำผิดซ้ำ" stroke="#EF4444" fillOpacity={0.1} fill="#EF4444" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-5 text-xs font-bold text-slate-600 pt-1">
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>ผู้สำเร็จตามมาตรการปิดคดีเสร็จสิ้น</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-1.5 rounded-full bg-red-500 inline-block" />
              <span>เสพสารเสพติดซ้ำ/ทำความผิดเพิ่ม</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
