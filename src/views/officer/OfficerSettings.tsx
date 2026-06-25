import React from "react";
import { Settings, Shield, Bell, Key, Database } from "lucide-react";

export const OfficerSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">ตั้งค่าระบบคุมประพฤติอัจฉริยะ (Officer Portal Settings)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          กำหนดพารามิเตอร์การแจ้งเตือน สิทธิพิกัด GPS อัตราดัชนีชี้วัดผลงานหลัก และความปลอดภัยระดับเจ้าพนักงาน
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-2xl space-y-6 text-xs text-slate-700 font-bold">
        
        {/* Settings block 1 */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-[#0f2d59] flex items-center space-x-2 border-b border-slate-50 pb-2">
            <Shield className="w-4 h-4" />
            <span>สิทธิและการเข้าถึงความมั่นคงภายใน</span>
          </h3>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="block text-slate-800">บังคับใช้อัตลักษณ์ใบหน้า 2-Factor Authentication</span>
                <span className="text-[10px] text-slate-400 font-medium">สแกน Face ID ทุกครั้งที่เข้ารายงานผลตรวจคดีพิเศษ</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="block text-slate-800">ส่ง SMS แจ้งเตือนสู้ระบบส่วนบุคคลผู้ถูกคุมโดยตรง</span>
                <span className="text-[10px] text-slate-400 font-medium">ส่งหมายเตือนและวันนัดอัตโนมัติเมื่อสร้างนัดหมายสำเร็จ</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Settings block 2 */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-black text-[#0f2d59] flex items-center space-x-2 border-b border-slate-50 pb-2">
            <Bell className="w-4 h-4" />
            <span>พารามิเตอร์เงื่อนไขเกณฑ์เตือนภัยดัชนีคดี</span>
          </h3>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="block text-slate-800">แจ้งเตือนสายตรงผ่านเบราว์เซอร์เมื่อพบสารเสพติด</span>
                <span className="text-[10px] text-slate-400 font-medium">เปิดหน้าต่างด่วนเตือนคุมประพฤติสกัดคดีระดับเสี่ยงแดงทันที</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded cursor-pointer" />
            </div>
          </div>
        </div>

        <button 
          onClick={() => alert("💾 บันทึกระบบการตั้งค่าสิทธิเจ้าหน้าที่สำเร็จ")}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-xl text-xs transition-all shadow-md"
        >
          บันทึกการกำหนดค่าระบบ
        </button>

      </div>

    </div>
  );
};
