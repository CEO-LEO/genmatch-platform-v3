'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, Plus, MessageCircle, Shield, Users, Award } from 'lucide-react';

export default function FAQPage() {
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'ทั่วไป',
      questions: [
        {
          question: 'GenMatch คืออะไร?',
          answer: 'GenMatch เป็นแพลตฟอร์มจิตอาสาที่ใช้เทคโนโลยีสมัยใหม่ในการเชื่อมโยงผู้สูงอายุที่ต้องการความช่วยเหลือ กับนักศึกษาที่ต้องการทำจิตอาสา สร้างสังคมที่มีน้ำใจและช่วยเหลือกัน'
        },
        {
          question: 'การใช้งาน GenMatch มีค่าใช้จ่ายหรือไม่?',
          answer: 'ไม่ครับ! GenMatch เป็นแพลตฟอร์มฟรีสำหรับผู้ใช้งานทุกคน ไม่มีค่าใช้จ่ายในการสมัครสมาชิก สร้างงานจิตอาสา หรือรับงานจิตอาสา'
        },
        {
          question: 'ใครสามารถใช้งาน GenMatch ได้บ้าง?',
          answer: 'GenMatch เปิดให้บริการสำหรับนักศึกษาที่ต้องการทำจิตอาสา และผู้สูงอายุที่ต้องการความช่วยเหลือ โดยต้องมีอายุ 18 ปีขึ้นไปและมีเบอร์โทรศัพท์ที่ใช้งานได้'
        }
      ]
    },
    {
      category: 'การสมัครสมาชิก',
      questions: [
        {
          question: 'ฉันจะสมัครสมาชิกได้อย่างไร?',
          answer: 'คุณสามารถสมัครสมาชิกได้โดยไปที่หน้า "สมัครสมาชิก" กรอกข้อมูลส่วนตัว เลือกประเภทผู้ใช้ (นักศึกษาหรือผู้สูงอายุ) และยืนยันการสมัครด้วยเบอร์โทรศัพท์'
        },
        {
          question: 'ทำไมต้องใช้เบอร์โทรศัพท์แทนอีเมล?',
          answer: 'เราใช้เบอร์โทรศัพท์เพื่อความปลอดภัยและง่ายต่อการติดต่อ โดยเฉพาะในกรณีฉุกเฉิน และเพื่อยืนยันตัวตนที่เชื่อถือได้'
        },
        {
          question: 'ฉันสามารถเปลี่ยนประเภทผู้ใช้ได้หรือไม่?',
          answer: 'ประเภทผู้ใช้สามารถเปลี่ยนได้โดยการติดต่อทีมสนับสนุน แต่ต้องมีเหตุผลที่เหมาะสมและผ่านการพิจารณา'
        }
      ]
    },
    {
      category: 'สำหรับนักศึกษา',
      questions: [
        {
          question: 'ฉันจะรับงานจิตอาสาได้อย่างไร?',
          answer: 'หลังจากเข้าสู่ระบบแล้ว ไปที่หน้า "ค้นหา" เพื่อดูงานจิตอาสาที่มีอยู่ ใช้ตัวกรองเพื่อหางานที่เหมาะสม และกดปุ่ม "รับงาน" เมื่อพบงานที่ต้องการ'
        },
        {
          question: 'ฉันจะได้รับอะไรจากการทำจิตอาสา?',
          answer: 'คุณจะได้รับประสบการณ์การทำงาน ช่วยเหลือสังคม สร้างความสัมพันธ์ที่ดี และอาจได้รับใบรับรองการทำจิตอาสาสำหรับใช้ในการสมัครงานหรือเรียนต่อ'
        },
        {
          question: 'ฉันสามารถยกเลิกงานที่รับแล้วได้หรือไม่?',
          answer: 'สามารถยกเลิกได้ แต่ควรแจ้งให้ทราบล่วงหน้าและมีเหตุผลที่เหมาะสม เพื่อไม่ให้กระทบต่อผู้สร้างงาน'
        }
      ]
    },
    {
      category: 'สำหรับผู้สูงอายุ',
      questions: [
        {
          question: 'ฉันจะสร้างงานจิตอาสาได้อย่างไร?',
          answer: 'หลังจากเข้าสู่ระบบแล้ว ไปที่หน้า "สร้างงาน" กรอกข้อมูลงานที่ต้องการความช่วยเหลือ เช่น ชื่องาน รายละเอียด สถานที่ เวลา และจำนวนจิตอาสาที่ต้องการ'
        },
        {
          question: 'ฉันจะรู้ได้อย่างไรว่านักศึกษาคนไหนจะมาช่วย?',
          answer: 'เมื่อนักศึกษารับงานแล้ว คุณจะได้รับข้อมูลติดต่อและสามารถประสานงานผ่านระบบแชทได้ทันที'
        },
        {
          question: 'ฉันต้องจ่ายเงินให้นักศึกษาหรือไม่?',
          answer: 'ไม่ครับ! งานจิตอาสาเป็นงานที่ไม่มีค่าใช้จ่าย นักศึกษามาช่วยเหลือด้วยความสมัครใจและจิตอาสา'
        }
      ]
    },
    {
      category: 'ความปลอดภัย',
      questions: [
        {
          question: 'GenMatch มีระบบความปลอดภัยอย่างไร?',
          answer: 'เรามีระบบยืนยันตัวตนด้วยเบอร์โทรศัพท์ การตรวจสอบข้อมูลผู้ใช้ และระบบรายงานพฤติกรรมที่น่าสงสัย เพื่อให้การใช้งานปลอดภัยที่สุด'
        },
        {
          question: 'ฉันควรทำอย่างไรเพื่อความปลอดภัย?',
          answer: 'เลือกสถานที่ที่ปลอดภัยและเป็นสาธารณะ แจ้งครอบครัวหรือคนใกล้ตัวก่อนพบจิตอาสา ไม่ให้ข้อมูลส่วนตัวที่สำคัญ และไม่โอนเงินหรือให้ทรัพย์สินมีค่า'
        },
        {
          question: 'ฉันจะรายงานปัญหาหรือพฤติกรรมที่น่าสงสัยได้อย่างไร?',
          answer: 'คุณสามารถรายงานได้ผ่านหน้า "ติดต่อเรา" หรือส่งอีเมลไปยัง support@genmatch.com เราจะดำเนินการตรวจสอบและแก้ไขปัญหาทันที'
        }
      ]
    },
    {
      category: 'การใช้งานระบบ',
      questions: [
        {
          question: 'ฉันจะติดต่อจิตอาสาได้อย่างไร?',
          answer: 'คุณสามารถติดต่อจิตอาสาได้ผ่านระบบแชทในตัวของ GenMatch ซึ่งปลอดภัยและสะดวกในการประสานงาน'
        },
        {
          question: 'ฉันสามารถอัปโหลดรูปภาพได้หรือไม่?',
          answer: 'ได้ครับ! คุณสามารถอัปโหลดรูปภาพหรือเอกสารที่เกี่ยวข้องกับงานจิตอาสาได้ เพื่อให้จิตอาสาเข้าใจงานได้ชัดเจนขึ้น'
        },
        {
          question: 'ระบบแชททำงานอย่างไร?',
          answer: 'ระบบแชทเป็นแชทในตัวที่เชื่อมต่อระหว่างผู้สร้างงานและจิตอาสา สามารถส่งข้อความ รูปภาพ และไฟล์ได้ทันที'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-600">แพลตฟอร์มจิตอาสา</p>
                </div>
              </Link>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            คำถามที่พบบ่อย
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ค้นหาคำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับการใช้งาน GenMatch
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาคำถาม..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  {categoryIndex === 0 && <HelpCircle className="w-5 h-5 text-white" />}
                  {categoryIndex === 1 && <Plus className="w-5 h-5 text-white" />}
                  {categoryIndex === 2 && <Users className="w-5 h-5 text-white" />}
                  {categoryIndex === 3 && <Award className="w-5 h-5 text-white" />}
                  {categoryIndex === 4 && <Shield className="w-5 h-5 text-white" />}
                  {categoryIndex === 5 && <MessageCircle className="w-5 h-5 text-white" />}
                </div>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isExpanded = expandedFaqs.includes(globalIndex);
                  
                  return (
                    <div key={faqIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <p className="text-gray-600 pt-4 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">ยังมีคำถามอยู่?</h2>
          <p className="text-xl text-purple-100 mb-6">
            ยังไม่พบคำตอบที่คุณต้องการ? ติดต่อเราได้เลย
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              ติดต่อเรา
            </Link>
            <Link 
              href="/help"
              className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              คู่มือการใช้งาน
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
