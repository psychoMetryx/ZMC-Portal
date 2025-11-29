import { Article, Category } from '../types';
import Smoking from '../components/articles/Smoking';
import Gout from '../components/articles/Gout';
import PainDiary from '../components/articles/PainDiary';
import Metabolism from '../components/articles/Metabolism';
import CoughChild from '../components/articles/CoughChild';
import CoughAdult from '../components/articles/CoughAdult';
import SoreThroat from '../components/articles/SoreThroat';
import Typhoid from '../components/articles/Typhoid';
import Vertigo from '../components/articles/Vertigo';
import FirstAid from '../components/articles/FirstAid';

// Helper for generic text content
const GenericContent = ({ title, htmlContent }: { title: string, htmlContent: string }) => (
  <div className="prose prose-red max-w-none bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
    <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-red-100 pb-4">{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  </div>
);

export const ARTICLES: Article[] = [
  {
    id: 'smoking',
    title: 'Bebas Asap Rokok',
    description: 'Hitung kerugian finansial akibat rokok dan pelajari Metode 5A untuk berhenti total.',
    category: Category.GAYA_HIDUP,
    icon: 'fa-solid fa-ban-smoking',
    component: <Smoking />
  },
  {
    id: 'metabolism',
    title: 'Cek Metabolisme & Diet',
    description: 'Kalkulator BMR/TDEE dan panduan "Isi Piringku" untuk berat badan ideal.',
    category: Category.GAYA_HIDUP,
    icon: 'fa-solid fa-weight-scale',
    component: <Metabolism />
  },
  {
    id: 'gout',
    title: 'Diet Asam Urat',
    description: 'Cek keamanan makanan favorit Anda dan pelajari panduan diet rendah purin.',
    category: Category.LANSIA,
    icon: 'fa-solid fa-bone',
    component: <Gout />
  },
  {
    id: 'pain-diary',
    title: 'Manajemen Nyeri Lansia',
    description: 'Jurnal digital untuk mencatat skala nyeri harian dan tips perawatan nyeri sendi.',
    category: Category.LANSIA,
    icon: 'fa-solid fa-notes-medical',
    component: <PainDiary />
  },
  {
    id: 'cough-child',
    title: 'Batuk Pilek Anak',
    description: 'Cek napas cepat (Triage) dan kenali beda selesma vs pneumonia pada anak.',
    category: Category.ANAK,
    icon: 'fa-solid fa-baby',
    component: <CoughChild />
  },
  {
    id: 'cough-adult',
    title: 'Batuk Pilek Dewasa',
    description: 'Kapan butuh antibiotik? Cek mandiri gejala dan tanda bahaya batuk dewasa.',
    category: Category.PENYAKIT_UMUM,
    icon: 'fa-solid fa-head-side-cough',
    component: <CoughAdult />
  },
  {
    id: 'sore-throat',
    title: 'Nyeri Tenggorokan',
    description: 'Bedakan radang virus vs bakteri dan tips kumur air garam.',
    category: Category.PENYAKIT_UMUM,
    icon: 'fa-solid fa-virus',
    component: <SoreThroat />
  },
  {
    id: 'vertigo',
    title: 'Vertigo vs Kliyengan',
    description: 'Latihan manuver mandiri dan tanda bahaya stroke pada vertigo.',
    category: Category.PENYAKIT_UMUM,
    icon: 'fa-solid fa-arrows-spin',
    component: <Vertigo />
  },
  {
    id: 'typhoid',
    title: 'Edukasi Tipes',
    description: 'Mitos vs Fakta seputar Tipes dan gejala khas lidah kotor.',
    category: Category.PENYAKIT_UMUM,
    icon: 'fa-solid fa-temperature-high',
    component: <Typhoid />
  },
  {
    id: 'gerd',
    title: 'Asam Lambung (GERD)',
    description: 'Tips nyaman berpuasa bagi penderita Maag/GERD dan menu ramah lambung.',
    category: Category.PENYAKIT_UMUM,
    icon: 'fa-solid fa-fire-burner',
    component: <GenericContent title="Berdamai dengan GERD" htmlContent={`
      <p class="mb-4">GERD adalah naiknya asam lambung ke kerongkongan. Rasanya panas di dada (heartburn) dan mulut pahit.</p>
      <h3 class="font-bold text-lg mb-2">Pantangan Utama (3P)</h3>
      <ul class="list-disc pl-5 mb-6 space-y-1">
        <li><strong>Pedas:</strong> Cabai, merica berlebih.</li>
        <li><strong>Pecut (Asam):</strong> Cuka, asinan, jeruk nipis perut kosong.</li>
        <li><strong>Panas/Lemak:</strong> Gorengan, santan kental, kopi, soda.</li>
      </ul>
      <div class="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
        <strong class="text-yellow-800">Tips Tidur:</strong>
        <p>Jangan langsung tidur setelah makan! Beri jeda 2-3 jam. Jika sering kambuh malam hari, tinggikan bantal kepala sekitar 15-20cm agar asam tidak naik.</p>
      </div>
    `} />
  },
  {
    id: 'cholesterol',
    title: 'Kendalikan Kolesterol',
    description: 'Memahami LDL vs HDL dan panduan makanan lampu lalu lintas untuk kolesterol.',
    category: Category.PENYAKIT_UMUM,
    icon: 'fa-solid fa-heart-pulse',
    component: <GenericContent title="Kolesterol: Musuh dalam Selimut" htmlContent={`
      <p class="mb-4">Kolesterol tinggi seringkali <strong>tanpa gejala</strong>. Jangan tunggu leher pegal. Cek lab rutin di ZMC adalah satu-satunya cara pasti.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border rounded-lg overflow-hidden">
          <thead class="bg-slate-100 font-bold">
            <tr><th class="p-3">Kategori</th><th class="p-3">Makanan</th></tr>
          </thead>
          <tbody>
            <tr class="bg-red-50 border-b"><td class="p-3 font-bold text-red-700">Merah (Hindari)</td><td class="p-3">Jeroan, Kuning Telur, Kulit Ayam, Gorengan, Santan Kental.</td></tr>
            <tr class="bg-yellow-50 border-b"><td class="p-3 font-bold text-yellow-700">Kuning (Batasi)</td><td class="p-3">Daging Merah, Keju, Mentega, Minyak Kelapa.</td></tr>
            <tr class="bg-green-50"><td class="p-3 font-bold text-green-700">Hijau (Perbanyak)</td><td class="p-3">Ikan, Tahu/Tempe, Oatmeal, Apel, Alpukat, Minyak Zaitun.</td></tr>
          </tbody>
        </table>
      </div>
    `} />
  },
  {
    id: 'first-aid',
    title: 'P3K Luka Ringan',
    description: 'Panduan interaktif langkah pertama menangani luka dan tanda infeksi.',
    category: Category.DARURAT,
    icon: 'fa-solid fa-kit-medical',
    component: <FirstAid />
  }
];