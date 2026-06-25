import React from "react";
import { Compass, Sparkles, CheckCircle2, UserCheck, HeartHandshake } from "lucide-react";

export const RehabilitationPlan: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-[#0f2d59]">แผนการแก้ไขฟื้นฟูผู้ถูกคุมความประพฤติรายบุคคล (Rehabilitation Framework)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          ออกแบบกิจกรรมปรับทัศนคติ บำบัดอาการติดยา และแผนสนับสนุนพัฒนาการประกอบอาชีพในกลุ่มคดีเพื่อคืนคนดีสู่สังคม
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Plan 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2.5 py-0.5 rounded-full">แผนการรักษาวินัย</span>
            <Compass className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-sm font-black text-slate-800">แผนปรับพฤติกรรม (CBT Training)</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-bold">
            มุ่งเน้นการจัดอบรมกลุ่มพฤติกรรมจิตบำบัด ข้อมูลสัมมนาระดับความเครียด และการควบคุมอารมณ์ คุมจริยศาสตร์เบื้องต้น
          </p>
          <div className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-lg">
            ✓ เข้าฝึกอบรม 12 งวด (ครั้งละ 3 ชั่วโมง)
          </div>
        </div>

        {/* Plan 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2.5 py-0.5 rounded-full">แผนบำบัดรักษาสารเสพติด</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-sm font-black text-slate-800">แผนบำบัด Matrix Program</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-bold">
            แนวทางการบำบัดผู้ติดยาเสพติดให้โทษโดยเน้นกระบวนการให้คำปรึกษา แฟ้มประวัติผู้เสพ และวิเคราะห์การหลีกพ้นเพื่อนกลุ่มเสี่ยง
          </p>
          <div className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-lg">
            ✓ ดำเนินการคัดกรองปัสสาวะสัปดาห์ละ 1 ครั้ง
          </div>
        </div>

        {/* Plan 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-black px-2.5 py-0.5 rounded-full">ส่งเสริมการสร้างงาน</span>
            <HeartHandshake className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-sm font-black text-slate-800">แคมเปญ ReStart Job Hub</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-bold">
            ประสานงานกับกลุ่มบริษัทค้าปลีกชั้นนำ และกรมการจัดหางาน เพื่อให้สิทธิ์ผู้ประพฤติดีเข้าฝึกวิชาชีพและมีรายได้มั่นคง
          </p>
          <div className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-lg">
            ✓ ฝึกทักษะช่างฝีมือ SCG / CP ALL สำเร็จ
          </div>
        </div>

      </div>

    </div>
  );
};
