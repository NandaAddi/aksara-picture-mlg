'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: 'Apakah melayani foto di luar Malang?',
    answer: (
      <>
        Tentu! Kami sangat sering melayani klien di <strong>Surabaya, Kediri, dan Tulungagung</strong>. Akan
        dikenakan biaya transportasi tambahan yang terjangkau sesuai jarak lokasi. Hubungi admin untuk
        detail biaya transport.
      </>
    ),
  },
  {
    question: 'Bagaimana prosedur booking jadwal?',
    answer: (
      <>
        Cek ketersediaan via WhatsApp. Jika slot aman, isi form booking dan lakukan pembayaran <strong>DP
        50%</strong>. Pelunasan dilakukan setelah sesi foto selesai. Jadwal Anda resmi terkunci setelah
        bukti transfer DP kami terima.
      </>
    ),
  },
  {
    question: 'Berapa lama proses editing foto?',
    answer: (
      <>
        Softfile (foto asli) dikirim maksimal 1x24 jam via Google Drive. Proses editing (tone & color)
        memakan waktu maksimal <strong>5 hari kerja</strong> setelah Anda memilih foto favorit Anda dari
        katalog yang kami kirim.
      </>
    ),
  },
  {
    question: 'Bisa request konsep foto?',
    answer: (
      <>
        Sangat bisa. Baik itu konsep <em>studio minimalis</em>, <em>street style</em>, atau <em>outdoor</em>
        yang ceria, kami siap mewujudkannya. Jangan ragu mengirimkan referensi moodboard atau gaya yang Anda
        inginkan kepada kami.
      </>
    ),
  },
  {
    question: 'Apakah file mentah (RAW) diberikan?',
    answer: (
      <>
        Kami memberikan seluruh file original (JPG high-res) kepada klien. Namun untuk file RAW (.ARW/.CR2),
        kami tidak memberikannya kecuali ada kesepakatan khusus atau biaya tambahan (buy out).
      </>
    ),
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4" id="faq-accordion">
      {faqData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-white/10 group">
            <button
              className="w-full text-left py-6 flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className={`font-serif text-xl text-white group-hover:text-studio-gold transition-colors pr-8 ${isOpen ? 'text-studio-gold' : ''}`}>
                {item.question}
              </h3>
              <Plus
                className={`text-studio-gold w-6 h-6 transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-sm text-gray-400 leading-relaxed pb-6 pl-2 border-l-2 border-studio-gold/50 ml-1">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
