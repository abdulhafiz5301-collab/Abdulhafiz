
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { User, Story } from './types';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import StoryDetails from './pages/StoryDetails';
import CreateStory from './pages/CreateStory';

const MOCK_STORIES: Story[] = [
  // TARIXIY
  {
    id: 'his-my',
    title: 'Muhammad Yusuf: Vatan Ishqi',
    authorId: 'system',
    authorName: 'Adabiyotshunos',
    genre: 'Tarixiy',
    content: 'Muhammad Yusuf o‘zining otashin she’rlari bilan xalq ko‘nglidan chuqur joy olgan shoir edi. U qishloqning oddiy tuprog‘ini muqaddas bilib, undagi har bir giyohni ardoqlardi. Bir kuni u dalalar bo‘ylab sayr qilib yurganida, keksa bir dehqonni uchratib qoldi. Dehqon unga yerning sirlari va ajdodlar merosi haqida so‘zlab berdi. Shoir shu lahzada o‘zining eng mashhur misralarini qog‘ozga tushirdi: "Men seni hech kimga bermayman, Vatan!"\n\nBu misralar nafaqat qog‘ozga, balki millionlab insonlar qalbiga muhrlandi. Shoir o‘z ijodida oddiylik va samimiylikni eng oliy qadriyat deb bildi. Uning har bir she’ri ortida ulkan bir hikoya, xalqning dardu quvonchi yashirin edi. Muhammad Yusuf o‘zbek she’riyatida yangi bir davrni boshlab berdi, u vatanparvarlikni balandparvoz so‘zlar bilan emas, balki ona tuproqqa bo‘lgan cheksiz mehr orqali tasvirladi.',
    createdAt: '2024-06-01',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'his-abbos',
    title: 'Abbosiylar: Hikmatlar Uyi Sirlari',
    authorId: 'system',
    authorName: 'Mirzo Tarix',
    genre: 'Tarixiy',
    content: 'Bog‘dod shahri Abbosiylar xalifaligi davrida ilm-fan markaziga aylandi. Xalifa Horun ar-Rashid tomonidan asos solingan "Baytul Hikma" (Hikmatlar uyi) butun dunyodan olimlarni o‘ziga chorlardi. Bu yerda qadimgi yunon, hind va fors qo‘lyozmalari o‘zbek-arab tillariga tarjima qilinar, astronomiya va matematika bo‘yicha yangi kashfiyotlar qilinar edi.\n\nYosh olim Ahmad ushbu maskanda tunlarni o‘tkazardi. U qadimiy yulduzlar xaritasini o‘rganar ekan, koinotning cheksizligi va uning yaratilishi haqidagi sirlarni anglashga harakat qilardi. Bir kuni u yashirin bir xonani topib oldi. U yerda "Zij" asarlarining noyob nusxalari saqlanardi. Bu kashfiyot Ahmadning hayotini butunlay o‘zgartirib yubordi va uni O‘rta Osiyo olimlari bilan uchrashish uchun uzoq safarga chiqishga undadi. Abbosiylar davri nafaqat qudrat, balki intellektual yuksalish davri ham edi.',
    createdAt: '2024-06-02',
    imageUrl: 'https://images.unsplash.com/photo-1581442116043-4f9e159197c3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'his-umaviy',
    title: 'Ummoviylar: Damashq Gavhari',
    authorId: 'system',
    authorName: 'Solih Al-Fajr',
    genre: 'Tarixiy',
    content: 'Ummoviylar xalifaligi davrida Damashq shahri o‘zining mahobatli masjidlari va bog‘lari bilan mashhur edi. Ulug‘ Damashq masjidi qurilishi insoniyat me’morchiligining cho‘qqisi sifatida e’tirof etilardi. Karvonlar bir uchi Ispaniyadan, ikkinchi uchi Xitoydan kelib, shu yerda uchrashardi.\n\nSavdogar Ibrohim Damashq bozorlarida o‘zining ipak matolari bilan tanilgan edi. U bir kuni masjiddagi mozaikalarni o‘rganayotgan me’morni uchratib qoldi. Me’mor unga naqshlardagi har bir chiziq ma’lum bir ma’no va ilohiy tartibni ifodalashini tushuntirdi. Ibrohim o‘shanda tushundiki, Damashq nafaqat savdo, balki san’at va imon maskani hamdir. Shahar ko‘chalarida arab tili o‘zining eng go‘zal shaklida yangrar, she’riyat va xattotlik san’ati gullab-yashnardi. Ummoviylar davlati kengaygani sari, bu madaniyat dunyoning eng chekka burchaklarigacha yetib bordi.',
    createdAt: '2024-06-03',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop'
  },
  // DETEKTIV
  {
    id: 'det-1',
    title: 'Sirli Maktub',
    authorId: 'system',
    authorName: 'Sherlok O‘zbek',
    genre: 'Detektiv',
    content: 'Toshkentning eski ko‘chalaridan birida, yarim tunda bir maktub topildi. Maktubda faqat bitta sana va sirli manzil yozilgan edi. Izquvar bu ishni o‘rganar ekan, izlar uni eski kutubxonaga olib bordi. Kutubxona mudiri g‘alati xatti-harakatlar qilar, go‘yo nimadandir qo‘rqayotgandek edi. Har bir qadamda yangi bir jumboq paydo bo‘lar, haqiqat esa kutilmagan tomonda edi. Izquvar maktubdagi siyohning turini o‘rganar ekan, uning juda kamyob ekanligini va faqat cheklangan doiradagi insonlar undan foydalanishini aniqladi.',
    createdAt: '2024-05-10',
    imageUrl: 'https://picsum.photos/seed/detective1/800/400'
  },
  {
    id: 'det-2',
    title: 'Xiyonat Izlari',
    authorId: 'system',
    authorName: 'Izquvar Botir',
    genre: 'Detektiv',
    content: 'Katta biznes markazida yuz bergan o‘g‘rilik butun shaharni larzaga keltirdi. Hech qanday barmoq izi qolmagan, kameralar esa o‘chirib qo‘yilgan edi. Ammo qahramonimiz birgina soch tolasini topishga muvaffaq bo‘ldi. Bu soch tolasi jinoyatchini emas, balki kutilmagan guvohni ko‘rsatib berdi. Tergov davomida ma’lum bo‘lishicha, jinoyat uzoq vaqt rejalashtirilgan va ichkaridagi odam yordamida amalga oshirilgan edi. Botir har bir xodim bilan suhbatlashar ekan, yolg‘onni haqiqatdan ajratish uchun o‘zining psixologik mahoratini ishga soldi.',
    createdAt: '2024-05-11',
    imageUrl: 'https://picsum.photos/seed/detective2/800/400'
  },
  {
    id: 'det-3',
    title: 'Yo‘qolgan Olmos',
    authorId: 'system',
    authorName: 'Komissar Ali',
    genre: 'Detektiv',
    content: 'Muzeyning eng qimmatbaho eksponati - moviy olmos yo‘qoldi. Barcha eshiklar yopiq, derazalar butun edi. Bu qanday sodir bo‘ldi? Ali olmos turgan joyni ko‘zdan kechirar ekan, polning ostida yashirin yo‘l borligini sezib qoldi. Bu yo‘l shaharning yer osti kanalizatsiya tizimiga olib chiqardi. Qorong‘u tunnellar ichida davom etgan quvish operatsiyasi kutilmagan yakun topdi. Jinoyatchi olmosni yashirish uchun muzeyning shamollatish tizimidan ham ustalik bilan foydalangan ekan.',
    createdAt: '2024-05-12',
    imageUrl: 'https://picsum.photos/seed/detective3/800/400'
  },
  // FANTASTIKA
  {
    id: 'fan-1',
    title: 'Marslik Mehmon',
    authorId: 'system',
    authorName: 'Astronavt Nozim',
    genre: 'Fantastika',
    content: '2085-yil. Yer sayyorasi birinchi marta o‘zga sayyoralik mehmonni qabul qildi. Bu mehmon nafas olmas, balki energiya bilan oziqlanardi. Uning kelishidan maqsad - insoniyatni yaqinlashayotgan qora tuynukdan ogohlantirish edi. Nozim va uning jamoasi bu mehmon bilan muloqot qilish uchun maxsus qurilma yaratishdi. Dastlabki so‘zlar butun insoniyat tarixini o‘zgartirib yubordi: "Siz yolg‘iz emassiz". Mehmonning kiyimi koinotning yetti xil rangida jilolanar, uning har bir harakati havoda ohangdor tovushlar chiqarardi.',
    createdAt: '2024-05-15',
    imageUrl: 'https://picsum.photos/seed/sci-fi1/800/400'
  },
  {
    id: 'fan-2',
    title: 'Vaqt Mashinasi',
    authorId: 'system',
    authorName: 'Professor Olim',
    genre: 'Fantastika',
    content: 'Olimjon o‘z laboratoriyasida vaqtni boshqarish imkonini beruvchi qurilmani ixtiro qildi. U 100 yil kelajakka sayohat qilishga qaror qildi. U yerda shaharlar havoda suzar, odamlar esa fikr kuchi bilan muloqot qilishardi. Ammo u yerda tabiat butunlay yo‘qolgan edi. Olimjon o‘z vaqtiga qaytib, insoniyatni tabiatni asrashga undashga kirishdi. Chunki kelajak faqat texnologiyadan iborat bo‘lmasligi kerak edi. U o‘zining sayohati haqida kitob yozib, butun dunyo rahbarlariga murojaat qildi.',
    createdAt: '2024-05-16',
    imageUrl: 'https://picsum.photos/seed/sci-fi2/800/400'
  },
  {
    id: 'fan-3',
    title: 'Parallel Dunyo',
    authorId: 'system',
    authorName: 'Lola Dreamer',
    genre: 'Fantastika',
    content: 'Bir kuni Lola ko‘zguga qarasa, u yerdagi aksi unga qarab jilmaydi va qo‘l ishorasi bilan chaqirdi. Lola ko‘zgu ichiga qadam qo‘ydi va o‘zining parallel dunyosiga tushib qoldi. Bu dunyoda hammasi teskari edi: osmon yashil, daraxtlar esa moviy. U yerdagi Lolaning hayoti butunlay boshqacha edi. U taniqli rassom bo‘lib, sehrli bo‘yoqlar bilan hayot bag‘ishlovchi suratlar chizardi. Lola bu dunyoning sirlarini o‘rganishga qaror qildi va u yerda vaqt butunlay boshqacha o‘tishini sezdi.',
    createdAt: '2024-05-17',
    imageUrl: 'https://picsum.photos/seed/sci-fi3/800/400'
  },
  {
    id: 'fan-4',
    title: 'Yulduzlararo Safar',
    authorId: 'system',
    authorName: 'Kapitan Jasur',
    genre: 'Fantastika',
    content: '"Pegas" kosmik kemasi yangi galaktika tomon yo‘l oldi. Maqsad - yashash uchun yaroqli bo‘lgan "Alfa-7" sayyorasini topish. Sayohat 10 yil davom etdi. Ekipaj uyqu holatida edi. Uyg‘onganlarida, kema kutilmagan meteorit yomg‘iriga duch kelgani ma’lum bo‘ldi. Jasur kemani qutqarish uchun ochiq kosmosga chiqishga majbur bo‘ldi. U yerda u yulduzlarning musiqasini eshitdi va kosmos aslida jonli ekanligini angladi. Uning kema bortidagi yagona hamrohi - aqlli robot "Zera" unga yordamga keldi.',
    createdAt: '2024-05-18',
    imageUrl: 'https://picsum.photos/seed/sci-fi4/800/400'
  },
  // ROMANTIKA
  {
    id: 'rom-1',
    title: 'Bahor Nafasi',
    authorId: 'system',
    authorName: 'Laylo Baxtiyorova',
    genre: 'Romantika',
    content: 'Bahorning ilk kunlari edi. Bog‘da ochilgan boychechaklar atrofga o‘zgacha tarovat bag‘ishlardi. Farhod har kuni shu bog‘da o‘tirib, kitob o‘qishni yaxshi ko‘rardi. Bir kuni u yonidagi o‘rindiqda o‘tirgan qizga ko‘zi tushdi. Qizning qo‘lida o‘zi sevadigan asar bor edi. Ularning nigohlari to‘qnashdi va go‘yo dunyo to‘xtab qolgandek bo‘ldi. Birgina jilmayish yangi bir buyuk muhabbat qissasining boshlanishi edi. Ular bir-birlarining ismlarini so‘rashishni ham unutib, soatlab kitoblar haqida suhbatlashishdi.',
    createdAt: '2024-05-20',
    imageUrl: 'https://picsum.photos/seed/romance1/800/400'
  },
  {
    id: 'rom-2',
    title: 'Kechikkan Baxt',
    authorId: 'system',
    authorName: 'Rustam Shoir',
    genre: 'Romantika',
    content: 'Ular maktab davrida bir-birlarini sevishardi, ammo taqdir ularni ayirdi. Oradan 20 yil o‘tdi. Rustam muvaffaqiyatli tadbirkor, Nilufar esa shifokor bo‘lib yetishdi. Kutilmaganda, ular eski sinfdoshlar uchrashuvida uchrashib qolishdi. Vaqt ularni o‘zgartirgan bo‘lsa-da, qalblardagi tuyg‘ular o‘sha-o‘sha samimiy edi. Ular yana bir bor birga bo‘lishga, o‘tgan yillarning o‘rnini to‘ldirishga ahd qilishdi. Rustam o‘zining eski kundaligini Nilufarga ko‘rsatdi, u yerda unga atalgan o‘nlab she’rlar bor edi.',
    createdAt: '2024-05-21',
    imageUrl: 'https://picsum.photos/seed/romance2/800/400'
  },
  {
    id: 'rom-3',
    title: 'Yomg‘irdagi Uchrashuv',
    authorId: 'system',
    authorName: 'Dildora Gulova',
    genre: 'Romantika',
    content: 'Kuchli yomg‘ir savalardi. Madina soyabonsiz qolib, bekatda qaltirab turardi. Shu payt bir yigit unga o‘z soyabonini tutdi. Bu uning hayotidagi eng kutilmagan va yoqimli lahza edi. Ular yomg‘ir ostida uzoq suhbatlashib yurishdi. Yomg‘ir tomchilari ularning kulgulariga hamohang edi. O‘sha kundan boshlab, har safar yomg‘ir yoqqanda, ular o‘zlarining ilk uchrashuvlarini eslab, baxtdan sarmast bo‘lishardi. Yigitning ismi Sardor edi va u aslida o‘sha kuni Madina ishlaydigan bino yoniga uchrashuvga ketayotgan ekan.',
    createdAt: '2024-05-22',
    imageUrl: 'https://picsum.photos/seed/romance3/800/400'
  },
  {
    id: 'rom-4',
    title: 'Taqdir Hazili',
    authorId: 'system',
    authorName: 'Aziz Romantik',
    genre: 'Romantika',
    content: 'Aziz har doim tasodiflarga ishonardi. Bir kuni u yanglishib boshqa raqamga qo‘ng‘iroq qilib yubordi. Go‘shakning narigi tarafidan juda yoqimli ovoz eshitildi. Ular gaplashib qolishdi va bu suhbat soatlab davom etdi. Ma’lum bo‘lishicha, ular juda ko‘p umumiy qiziqishlarga ega ekan. Ular uchrashishga qaror qilishdi va Aziz hayotidagi eng go‘zal insonni topganini angladi. Taqdirning bu kichik hazili katta baxtga aylandi. Uchrashuvda ular bir xil rangdagi kiyimda ekanliklarini ko‘rib hayron qolishdi.',
    createdAt: '2024-05-23',
    imageUrl: 'https://picsum.photos/seed/romance4/800/400'
  },
  // SARGUZASHT
  {
    id: 'adv-1',
    title: 'Tog‘lar Sadosi',
    authorId: 'system',
    authorName: 'Alpinist Ulug‘bek',
    genre: 'Sarguzasht',
    content: 'Tyan-Shan tog‘larining eng baland cho‘qqisiga chiqish Ulug‘bekning azaliy orzusi edi. U o‘z jamoasi bilan yo‘lga chiqdi. Yo‘lda qor bo‘ronlari, tik qoyalar va kutilmagan xavflar kutib turardi. Ammo Ulug‘bekning irodasi mustahkam edi. Cho‘qqiga yetib borganida, uning ko‘z o‘ngida butun dunyo kaftdek namoyon bo‘ldi. Tog‘lar unga mardlik va sabr-toqat darsini bergan edi. Bu hikoya insonning o‘z qo‘rquvlari ustidan qozongan g‘alabasi haqidadir. Pastda qolgan bulutlar xuddi oq dengizga o‘xshardi.',
    createdAt: '2024-05-25',
    imageUrl: 'https://picsum.photos/seed/adventure1/800/400'
  },
  {
    id: 'adv-2',
    title: 'Cho‘l Bo‘risi',
    authorId: 'system',
    authorName: 'Sayyoh Sarvar',
    genre: 'Sarguzasht',
    content: 'Orol dengizining qurigan tubi bo‘ylab sayohat qilish - bu haqiqiy sarguzasht edi. Sarvar o‘zining eski "UAZ" mashinasida qum barxanlari orasidan yo‘l qidira boshladi. Bir kuni u eski kemalar qabristoniga duch keldi. Bu yerda vaqt to‘xtab qolgandek edi. U yerda u qadimiy ashyolarni topdi va dengizning o‘tmishdagi haybati haqida o‘ylay boshladi. Sayohat davomida u tabiatning qudrati va insonning unga ta’siri haqida ko‘p narsalarni tushunib yetdi. Tunda yulduzlar shunchalik yaqin ko‘rinardiki, ularni qo‘l bilan tutish mumkindek edi.',
    createdAt: '2024-05-26',
    imageUrl: 'https://picsum.photos/seed/adventure2/800/400'
  },
  {
    id: 'adv-3',
    title: 'Dengiz Tubidagi Sir',
    authorId: 'system',
    authorName: 'G‘avvos Akmal',
    genre: 'Sarguzasht',
    content: 'Akmal okean tubidagi cho‘kkan kemalarni tadqiq qilish bilan shug‘ullanardi. Bir kuni u Hind okeanining tubida juda g‘alati yaltiroq narsani ko‘rib qoldi. Pastga tushib ko‘rsa, bu qadimiy oltin haykal ekan. Ammo haykalning yonida ulkan akulalar suzib yurardi. Akmal o‘z hayotini xavfga qo‘yib, bu sirni o‘rganishga qaror qildi. U haykalning ortida yashirilgan yozuvlarni topdi, bu yozuvlar yo‘qolgan sivilizatsiya haqida ma’lumot berardi. U o‘sha kundan boshlab okean sirlarini butun dunyoga ko‘rsatishga ahd qildi.',
    createdAt: '2024-05-27',
    imageUrl: 'https://picsum.photos/seed/adventure3/800/400'
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('stories');
    return saved ? JSON.parse(saved) : MOCK_STORIES;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addStory = (newStory: Story) => {
    setStories(prev => [newStory, ...prev]);
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {user && (
          <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link to="/" className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">Leader IT School</Link>
              <div className="flex items-center gap-6">
                <Link to="/" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors hidden sm:inline">Kashf qilish</Link>
                <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-md shadow-blue-100 text-sm">
                  Hikoya yozish
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l">
                  <Link to="/profile" className="flex items-center gap-2 group">
                    <img 
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full border border-slate-200"
                    />
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors hidden md:inline">{user.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Home stories={stories} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile user={user} onUpdate={updateProfile} /> : <Navigate to="/login" />} />
            <Route path="/story/:id" element={user ? <StoryDetails stories={stories} setStories={setStories} /> : <Navigate to="/login" />} />
            <Route path="/create" element={user ? <CreateStory user={user} onSave={addStory} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-white border-t py-8 text-center text-slate-400 text-sm">
          <div className="mb-2 font-bold text-slate-600 text-center">Leader IT School Story Builder</div>
          &copy; {new Date().getFullYear()} Barcha huquqlar himoyalangan.
        </footer>
      </div>
    </Router>
  );
};

export default App;
