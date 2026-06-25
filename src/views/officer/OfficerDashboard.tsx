import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  ChevronDown, 
  User, 
  CheckSquare, 
  FileText,
  Activity,
  HeartHandshake
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

export const OfficerDashboard: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [fiscalYear, setFiscalYear] = useState("ปีงบประมาณ 2567");

  // Monthly trends mock data matching the line chart in Image 1
  const monthlyData = [
    { name: "ม.ค.", "ผู้ถูกคุมประพฤติ": 8500, "รายงานตัว": 6000, "ขาดนัด": 4000, "บริการสังคม (ชม.)": 1900 },
    { name: "ก.พ.", "ผู้ถูกคุมประพฤติ": 8200, "รายงานตัว": 5900, "ขาดนัด": 4300, "บริการสังคม (ชม.)": 1800 },
    { name: "มี.ค.", "ผู้ถูกคุมประพฤติ": 8300, "รายงานตัว": 5600, "ขาดนัด": 3800, "บริการสังคม (ชม.)": 1850 },
    { name: "เม.ย.", "ผู้ถูกคุมประพฤติ": 8900, "รายงานตัว": 6100, "ขาดนัด": 4100, "บริการสังคม (ชม.)": 1650 },
    { name: "พ.ค.", "ผู้ถูกคุมประพฤติ": 8600, "รายงานตัว": 5800, "ขาดนัด": 3800, "บริการสังคม (ชม.)": 1650 },
    { name: "มิ.ย.", "ผู้ถูกคุมประพฤติ": 8800, "รายงานตัว": 5900, "ขาดนัด": 3600, "บริการสังคม (ชม.)": 1600 },
    { name: "ก.ค.", "ผู้ถูกคุมประพฤติ": 8400, "รายงานตัว": 5950, "ขาดนัด": 3800, "บริการสังคม (ชม.)": 1500 },
    { name: "ส.ค.", "ผู้ถูกคุมประพฤติ": 8700, "รายงานตัว": 5700, "ขาดนัด": 3600, "บริการสังคม (ชม.)": 1550 },
    { name: "ก.ย.", "ผู้ถูกคุมประพฤติ": 8500, "รายงานตัว": 5850, "ขาดนัด": 3900, "บริการสังคม (ชม.)": 1300 },
    { name: "ต.ค.", "ผู้ถูกคุมประพฤติ": 8800, "รายงานตัว": 5900, "ขาดนัด": 3750, "บริการสังคม (ชม.)": 1400 },
    { name: "พ.ย.", "ผู้ถูกคุมประพฤติ": 8900, "รายงานตัว": 6000, "ขาดนัด": 3750, "บริการสังคม (ชม.)": 1450 },
    { name: "ธ.ค.", "ผู้ถูกคุมประพฤติ": 9100, "รายงานตัว": 6200, "ขาดนัด": 3800, "บริการสังคม (ชม.)": 1350 },
  ];

  // Donut 1: Gender Statistics
  const genderData = [
    { name: "ชาย", value: 91.2, count: 1130, color: "#1E40AF" },
    { name: "หญิง", value: 8.8, count: 116, color: "#EF4444" }
  ];

  // Donut 2: Case Types
  const caseTypeData = [
    { name: "คดีอาญา", value: 68.3, color: "#1D4ED8" },
    { name: "คดีจราจร", value: 18.7, color: "#3B82F6" },
    { name: "คดีความผิดอื่นๆ", value: 8.9, color: "#60A5FA" },
    { name: "คดีเศรษฐกิจ", value: 4.1, color: "#93C5FD" }
  ];

  // Donut 3: Probation Status
  const statusData = [
    { name: "คุมประพฤติอยู่", value: 8742, color: "#1E40AF" },
    { name: "ใกล้สิ้นสุด", value: 2145, color: "#60A5FA" },
    { name: "สิ้นสุดแล้ว", value: 1959, color: "#10B981" }
  ];

  // Age groups mock values (bar chart)
  const ageGroups = [
    { range: "ต่ำกว่า 20 ปี", percent: "8.5%", width: "w-[8.5%]" },
    { range: "20 - 30 ปี", percent: "34.2%", width: "w-[34.2%]" },
    { range: "31 - 40 ปี", percent: "32.7%", width: "w-[32.7%]" },
    { range: "31 - 50 ปี", percent: "17.6%", width: "w-[17.6%]" },
    { range: "มากกว่า 50 ปี", percent: "7.0%", width: "w-[7.0%]" }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* 4 Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-slate-400 block">จำนวนผู้ถูกคุมประพฤติ</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-[#0f2d59]">12,846</span>
              <span className="text-xs text-slate-500 font-bold">คน</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center">
              ↑ 8.5% <span className="text-slate-400 font-normal ml-1">จากเดือนที่แล้ว</span>
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-slate-400 block">จำนวนผู้รายงานตัววันนี้</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-[#0f2d59]">1,246</span>
              <span className="text-xs text-slate-500 font-bold">คน</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center">
              ↑ 12.3% <span className="text-slate-400 font-normal ml-1">จากเมื่อวาน</span>
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-slate-400 block">ผู้ขาดนัดวันนี้</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-[#0f2d59]">86</span>
              <span className="text-xs text-slate-500 font-bold">คน</span>
            </div>
            <span className="text-[10px] text-green-500 font-bold flex items-center">
              ↓ 5.2% <span className="text-slate-400 font-normal ml-1">จากเมื่อวาน</span>
            </span>
          </div>
          <div className="p-4 bg-red-50 text-red-500 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-slate-400 block">ชั่วโมงบริการสังคมรวม</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-[#0f2d59]">24,356</span>
              <span className="text-xs text-slate-500 font-bold">ชม.</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center">
              ↑ 15.7% <span className="text-slate-400 font-normal ml-1">จากเดือนที่แล้ว</span>
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Grid for Monthly Line Chart & Risk Heat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Line Chart (8 columns on desktop) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#0f2d59]">สถิติการคุมประพฤติรายเดือน</h3>
            <div className="relative">
              <button className="flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-xl text-xs font-bold text-slate-700">
                <span>{fiscalYear}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B", fontWeight: "bold" }} stroke="#E2E8F0" />
                <YAxis domain={[0, 10000]} tick={{ fontSize: 10, fill: "#64748B", fontWeight: "bold" }} stroke="#E2E8F0" />
                <Tooltip />
                <Line type="monotone" dataKey="ผู้ถูกคุมประพฤติ" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="รายงานตัว" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ขาดนัด" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="บริการสังคม (ชม.)" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Line legends */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span>ผู้ถูกคุมประพฤติ</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>รายงานตัว</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>ขาดนัด</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>บริการสังคม (ชม.)</span>
            </div>
          </div>
        </div>

        {/* Heat Map of Risk areas (5 columns on desktop) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-[#0f2d59] mb-4">Heat Map พื้นที่เสี่ยง</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Map of Thailand Representation */}
              <div className="md:col-span-7 flex justify-center py-2">
                <svg viewBox="0 0 200 350" className="w-full max-w-[150px] drop-shadow-md">
                  {/* Stylized shape of Thailand colored in regional risk gradients */}
                  {/* North (Green/Yellow) */}
                  <path d="M70,20 Q85,15 100,25 Q115,35 110,60 Q95,70 80,65 Q60,50 70,20 Z" fill="#67C23A" opacity="0.85" />
                  {/* Northeast (Orange/Red) */}
                  <path d="M110,60 Q130,50 160,65 Q180,85 175,120 Q160,140 130,135 Q110,120 110,60 Z" fill="#F56C6C" opacity="0.9" />
                  {/* Central (Red - High Risk) */}
                  <path d="M85,70 Q105,75 115,100 Q110,140 95,145 Q80,130 85,70 Z" fill="#E6A23C" opacity="0.9" />
                  {/* East */}
                  <path d="M110,140 Q135,145 140,165 Q125,185 110,175 Z" fill="#F56C6C" opacity="0.85" />
                  {/* South (Green/Yellow) */}
                  <path d="M85,145 Q95,150 90,180 L80,240 L85,290 L75,330 L65,310 L75,260 L75,200 L85,145 Z" fill="#409EFF" opacity="0.85" />
                </svg>
              </div>

              {/* Sidebar Listing of high risk zones */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-[11.5px] font-black text-slate-700 block">พื้นที่ที่มีความเสี่ยงสูงสุด</span>
                
                <div className="space-y-2 text-xs font-bold text-slate-700">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[9px] font-black">1</span>
                      <span className="text-[11px]">กรุงเทพมหานคร</span>
                    </span>
                    <span className="text-slate-500 text-[11px]">1,246 คน</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-black">2</span>
                      <span className="text-[11px]">นนทบุรี</span>
                    </span>
                    <span className="text-slate-500 text-[11px]">892 คน</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-[9px] font-black">3</span>
                      <span className="text-[11px]">สมุทรปราการ</span>
                    </span>
                    <span className="text-slate-500 text-[11px]">745 คน</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[9px] font-black">4</span>
                      <span className="text-[11px]">ชลบุรี</span>
                    </span>
                    <span className="text-slate-500 text-[11px]">623 คน</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[9px] font-black">5</span>
                      <span className="text-[11px]">ปทุมธานี</span>
                    </span>
                    <span className="text-slate-500 text-[11px]">512 คน</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map legend */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500 font-bold">
            <span>ระดับความเสี่ยง</span>
            <div className="flex items-center space-x-3.5">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
                <span>ต่ำ</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" />
                <span>ปานกลาง</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-orange-400 inline-block" />
                <span>สูง</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" />
                <span>สูงมาก</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Row of 4 Donut / Demographic Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Chart 1: Gender Statistics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">สถิติแยกตามเพศ</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="w-24 h-24 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={30} outerRadius={42} paddingAngle={2} dataKey="value">
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs font-bold text-slate-700 pl-4 w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-800" />
                  <span>ชาย</span>
                </span>
                <span>91.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>หญิง</span>
                </span>
                <span>8.8%</span>
              </div>
              <div className="text-[10px] text-slate-400 pt-1 text-right">
                1,130 คน
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Age Demographics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5">สถิติแยกตามช่วงอายุ</h3>
          
          <div className="space-y-1.5 pt-1">
            {ageGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>{group.range}</span>
                  <span>{group.percent}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`bg-blue-600 h-full rounded-full ${group.width}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Offense Category Statistics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">ประเภทคดี</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="w-24 h-24 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={caseTypeData} cx="50%" cy="50%" innerRadius={28} outerRadius={40} paddingAngle={2} dataKey="value">
                    {caseTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-[11px] font-bold text-slate-700 pl-4 w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-800" />
                  <span>คดีอาญา</span>
                </span>
                <span>68.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>คดีจราจร</span>
                </span>
                <span>18.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>คดีความผิดอื่นๆ</span>
                </span>
                <span>8.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-200" />
                  <span>คดีเศรษฐกิจ</span>
                </span>
                <span>4.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 4: Probation Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">สถานะการคุมประพฤติ</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="w-24 h-24 shrink-0 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={30} outerRadius={42} paddingAngle={2} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center text */}
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-[12px] font-black text-blue-900 leading-none">12,846</span>
                <span className="text-[7.5px] text-slate-400 font-bold block">ทั้งหมด</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-bold text-slate-700 pl-4 w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-950" />
                  <span className="text-[11px]">คุมประพฤติอยู่</span>
                </span>
                <span className="text-slate-500 text-[10.5px]">8,742 คน</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[11px]">ใกล้สิ้นสุด</span>
                </span>
                <span className="text-slate-500 text-[10.5px]">2,145 คน</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px]">สิ้นสุดแล้ว</span>
                </span>
                <span className="text-slate-500 text-[10.5px]">1,959 คน</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 4: Recent Activities, Important Alerts, and Today's Mission Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Recent Activities */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-[#0f2d59] border-b border-slate-50 pb-2">กิจกรรมล่าสุด</h3>
          
          <div className="space-y-4 pt-1">
            {/* Activity 1 */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Avatar" 
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <span className="text-[12px] font-black text-slate-800 block">นายวสันต์ คำดี</span>
                  <span className="text-[10px] text-slate-400 block font-medium">รายงานตัวผ่าน Application</span>
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 shrink-0">08:30 น.</span>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-black text-xs ring-2 ring-red-100">
                  ⚠️
                </div>
                <div>
                  <span className="text-[12px] font-black text-slate-800 block">นายทวีศักดิ์ มั่นคง</span>
                  <span className="text-[10px] text-red-500 block font-bold">ขาดการรายงานตัว</span>
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 shrink-0">07:45 น.</span>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-black text-xs ring-2 ring-emerald-100">
                  🌱
                </div>
                <div>
                  <span className="text-[12px] font-black text-slate-800 block">น.ส.สุภาภรณ์ ใจงาม</span>
                  <span className="text-[10px] text-slate-400 block font-medium">ทำงานบริการสังคม 6 ชม.</span>
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 shrink-0">08:15 น.</span>
            </div>

            {/* Activity 4 */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-black text-xs ring-2 ring-blue-100">
                  🧪
                </div>
                <div>
                  <span className="text-[12px] font-black text-slate-800 block">นายพิชิต ชัยชนะ</span>
                  <span className="text-[10px] text-slate-400 block font-medium">ตรวจดี - ไม่พบสารเสพติด</span>
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 shrink-0">07:30 น.</span>
            </div>
          </div>
        </div>

        {/* Column 2: Important Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-[#0f2d59] border-b border-slate-50 pb-2">การแจ้งเตือนสำคัญ</h3>
          
          <div className="space-y-4 pt-1">
            {/* Alert 1 */}
            <div className="flex items-start space-x-4 bg-red-50/50 p-3 rounded-xl border border-red-100">
              <div className="p-2 bg-red-500 text-white rounded-lg shrink-0">
                <AlertTriangle className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[12px] font-black text-slate-800 block">ผู้ขาดนัดรายงานตัว</span>
                  <span className="text-red-500 font-black text-xs">86 ราย</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 font-bold leading-relaxed">
                  เพิ่มขึ้น 5 รายจากเมื่อวาน
                </p>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="flex items-start space-x-4 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
              <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[12px] font-black text-slate-800 block">ใกล้ครบกำหนดคุมประพฤติ</span>
                  <span className="text-amber-600 font-black text-xs">145 ราย</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 font-bold leading-relaxed">
                  ภายใน 7 วัน
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Today's Mission */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-[#0f2d59] border-b border-slate-50 pb-2">ภารกิจวันนี้</h3>
          
          <div className="space-y-3.5 pt-1 text-xs font-bold text-slate-700">
            {/* Mission 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
              <span className="flex items-center space-x-3">
                <span className="text-emerald-500">✓</span>
                <span>รายงานตัวที่ต้องดำเนินการ</span>
              </span>
              <span className="text-slate-500 font-black">32 ราย</span>
            </div>

            {/* Mission 2 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
              <span className="flex items-center space-x-3">
                <span className="text-emerald-500">✓</span>
                <span>ติดตามเยี่ยมบ้าน</span>
              </span>
              <span className="text-slate-500 font-black">8 ราย</span>
            </div>

            {/* Mission 3 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
              <span className="flex items-center space-x-3">
                <span className="text-emerald-500">✓</span>
                <span>ตรวจสารเสพติด</span>
              </span>
              <span className="text-slate-500 font-black">15 ราย</span>
            </div>

            {/* Mission 4 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
              <span className="flex items-center space-x-3">
                <span className="text-emerald-500">✓</span>
                <span>บริการสังคมที่นัดหมาย</span>
              </span>
              <span className="text-slate-500 font-black">6 ราย</span>
            </div>
          </div>
        </div>

      </div>

      {/* Blue wave banner with Quote */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 p-6 rounded-2xl border border-blue-800 text-center relative overflow-hidden shadow-md">
        {/* Stylized background lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 flex flex-col justify-between pointer-events-none">
          <div className="h-6 w-full bg-gradient-to-b from-white to-transparent" />
          <div className="h-6 w-full bg-gradient-to-t from-white to-transparent" />
        </div>

        <p className="text-white text-base md:text-lg font-bold tracking-wide">
          “ โอกาสคือการเริ่มต้นใหม่ เราเชื่อว่า...<span className="text-yellow-400 font-extrabold text-lg md:text-xl">คุณทำได้</span> ”
        </p>
      </div>

    </div>
  );
};
