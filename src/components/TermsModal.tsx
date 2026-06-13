'use client';

import { X } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, { dependencies: [isOpen], scope: modalRef });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl h-[80vh] bg-studio-gray border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-studio-black">
          <h3 className="font-serif text-xl italic text-studio-gold">Prosedur, Syarat & Ketentuan</h3>
          <button 
            onClick={onClose} 
            aria-label="Tutup" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div 
          className="p-8 overflow-y-auto font-sans text-sm text-gray-300 leading-relaxed space-y-8 custom-scrollbar"
          data-lenis-prevent
        >
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-4 border-l-2 border-studio-gold pl-3">
              Syarat & Ketentuan Pemesanan
            </h4>
            <ol className="list-decimal list-outside pl-5 space-y-4">
              <li>
                <strong className="text-white block mb-1">Cek Jadwal Tersedia</strong> Pastikan tanggal dan jam sesi yang
                diinginkan masih available sebelum melakukan pemesanan.
              </li>
              <li>
                <strong className="text-white block mb-1">Isi Form & Bayar DP</strong> Lengkapi form booking dan lakukan
                pembayaran DP sebesar 50% ke rekening: 
                <div className="mt-2 bg-black/30 p-3 rounded border border-white/5 font-mono text-studio-gold">
                  BCA 3850870917 <br /> a.n. Tedi Juniardi
                </div>
              </li>
              <li>
                <strong className="text-white block mb-1">Konfirmasi Jadwal Akhir</strong> Tim Aksara akan menghubungi H-1
                untuk memastikan detail waktu dan lokasi sudah sesuai rencana.
              </li>
              <li>
                <strong className="text-white block mb-1">Pelunasan Setelah Sesi</strong> Sisa pembayaran dilakukan setelah
                sesi foto selesai.
              </li>
              <li>
                <strong className="text-white block mb-1">Ketepatan Waktu</strong> Harap datang tepat waktu, karena
                keterlambatan menjadi tanggung jawab klien dan tidak ada tambahan waktu sesi.
              </li>
              <li>
                <strong className="text-white block mb-1">Pengiriman & Pemilihan Foto</strong> Seluruh file foto (JPEG)
                dikirim maksimal 1 hari setelah sesi. Client dapat memilih nomor file foto yang ingin diedit sejak
                softfile dikirim.
              </li>
              <li>
                <strong className="text-white block mb-1">Waktu Proses Editing</strong> Proses editing memakan waktu maksimal
                5 hari kerja.
              </li>
              <li>
                <strong className="text-white block mb-1">Penyimpanan File</strong> File foto disimpan di Google Drive
                maksimal 14 hari. Kehilangan file setelah masa tersebut bukan tanggung jawab kami.
              </li>
            </ol>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-4 border-l-2 border-studio-gold pl-3">
              Ketentuan Tambahan
            </h4>
            <ul className="list-disc list-outside pl-5 space-y-4">
              <li>
                <strong className="text-white block mb-1">Non-Refundable DP</strong> DP yang sudah dibayarkan tidak dapat
                dikembalikan dengan alasan apapun.
              </li>
              <li>
                <strong className="text-white block mb-1">Konfirmasi Jadwal</strong> Jadwal pemotretan wajib dikonfirmasi
                ulang untuk menghindari perubahan mendadak.
              </li>
              <li>
                <strong className="text-white block mb-1">Waktu Mulai</strong> Tim Aksara akan memulai pemotretan tepat waktu
                sesuai kesepakatan.
              </li>
              <li>
                <strong className="text-white block mb-1">Natural Editing</strong> Editing hanya sebatas warna, tone, dan
                pencahayaan. Tidak menerima request perubahan bentuk tubuh.
              </li>
              <li>
                <strong className="text-white block mb-1">Biaya Transportasi</strong> Pemotretan luar kota (Kediri,
                Tulungagung, Surabaya) dikenakan biaya transport Rp 50.000.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
