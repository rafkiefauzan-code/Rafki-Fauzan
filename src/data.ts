import { LevelData, LevelId, Question, Badge } from './types';

export const LEVEL_LIST: LevelData[] = [
  {
    id: LevelId.LEVEL_1,
    title: "Orientasi dan Peta Konsep",
    subtitle: "Mengenal Jalur Belajar Kronologis Sejarah Makkah",
    description: "Langkah awal memahami garis besar sejarah perjuangan dakwah Nabi Muhammad SAW di kota suci Makkah dan mengembangkan keterampilan berpikir sejarah.",
    historicalThinkingFocus: "Context Overview",
    historicalThinkingDesc: "Memetakan gambaran umum kronologi peristiwa untuk memahami keterkaitan garis waktu dakwah Nabi di Makkah secara terstruktur.",
    objectives: [
      "Menjelaskan pengertian Sejarah Kebudayaan Islam (SKI) Makkah",
      "Mengidentifikasi 10 tahapan besar (level) perjalanan dakwah Nabi",
      "Membuat hubungan timeline sederhana antar masa krusial perjuangan"
    ],
    emoji: "🕌",
    badgeToEarn: "explorer-01"
  },
  {
    id: LevelId.LEVEL_2,
    title: "Kondisi Masyarakat Arab Pra-Islam",
    subtitle: "Sistem Kepercayaan, Sosiologis, dan Ekonomi Jahiliyyah",
    description: "Menyelami realitas sosiologis Jazirah Arab sebelum cahaya Islam bersinar, menganalisis struktur klan, sistem niaga, dan deviasi moral masyarakat Mekkah.",
    historicalThinkingFocus: "Historical Context",
    historicalThinkingDesc: "Memahami suatu peristiwa atau perilaku masyarakat dengan melihat kondisi politik, sosial, budaya, dan spiritual yang melingkupinya pada masa itu.",
    objectives: [
      "Menganalisis sistem kepercayaan penyembahan berhala (Hubal, Lata, Uzza)",
      "Mendeskripsikan struktur sosial kesukuan (tribalisme) yang kaku dan patriarkal",
      "Menjelaskan dinamika ekonomi pasar musiman (seperti Pasar Ukaz) dan riba"
    ],
    emoji: "🏜️",
    badgeToEarn: "context-02"
  },
  {
    id: LevelId.LEVEL_3,
    title: "Kelahiran Nabi Muhammad SAW",
    subtitle: "Kondisi Tahun Gajah dan Berkah Semesta",
    description: "Menelaah peristiwa kelahiran Nabi Muhammad SAW pada 12 Rabiul Awal Tahun Gajah, serta perlindungan Allah atas Ka'bah dari pasukan Abrahah.",
    historicalThinkingFocus: "Chronology",
    historicalThinkingDesc: "Menelaah urutan waktu secara runtut dan sistematis dari kelahiran mulia Nabi Muhammad SAW.",
    objectives: [
      "Menghubungkan peristiwa pasukan gajah Abrahah dengan perlindungan Ka'bah",
      "Menguraikan nasab mulia Nabi Muhammad SAW dari Bani Hasyim",
      "Mengidentifikasi silsilah keluarga terdekat Nabi pada masa awal kelahiran"
    ],
    emoji: "👶",
    badgeToEarn: "birth-03"
  },
  {
    id: LevelId.LEVEL_4,
    title: "Masa Kecil, Remaja, dan Dewasa Nabi",
    subtitle: "Kehidupan Halimah as-Sa'diyah & Gelar Al-Amin",
    description: "Memelajari masa penyusuan di gurun bersama klan Ba'adiah, wafatnya sang ibu Aminah, pengasuhan kakek Abdul Muthalib serta paman Abu Thalib, hingga gelar kejujuran tertinggi.",
    historicalThinkingFocus: "Character Understanding",
    historicalThinkingDesc: "Memahami dan meneladani karakter personal Nabi Muhammad SAW dalam tumbuh kembang kepemimpinan mudanya.",
    objectives: [
      "Menganalisis urgensi pengasuhan anak di padang pasir untuk kestabilan bahasa",
      "Menilai kepemimpinan muda Nabi dalam peletakan kembali batu Hajar Aswad",
      "Mencontoh integritas dagang Nabi yang melahirkan reputasi Al-Amin (Terpercaya)"
    ],
    emoji: "🐫",
    badgeToEarn: "integrity-04"
  },
  {
    id: LevelId.LEVEL_5,
    title: "Diangkat Menjadi Nabi dan Rasul",
    subtitle: "Peristiwa Sakral di Gua Hira & Kerasulan",
    description: "Menganalisis momen luar biasa di Gua Hira saat Malaikat Jibril menyampaikan QS. Al-Alaq 1-5, menandai pelantikan Muhammad SAW sebagai Rasul utusan Allah.",
    historicalThinkingFocus: "Cause and Effect",
    historicalThinkingDesc: "Menganalisis sebab-sebab turunnya wahyu pertama dan dampaknya bagi revolusi spiritual peradaban manusia.",
    objectives: [
      "Menguraikan kronologi penerimaan QS. Al-Alaq ayat 1-5 di Gua Hira",
      "Menjelaskan peran pendampingan tegar dari Sayyidah Khadijah RA",
      "Mengidentifikasi fase transisi psikologis Nabi setelah menerima kenabian"
    ],
    emoji: "📖",
    badgeToEarn: "revelation-05"
  },
  {
    id: LevelId.LEVEL_6,
    title: "Dakwah Sirriyah",
    subtitle: "Assabiqunal Awwalun & Markas Arqam",
    description: "Memotret dakwah awal pasca turunnya perintah QS. Al-Muddatstsir. Pendekatan personal kepada keluarga, sahabat terdekat, dan pembentukan sel kaderisasi di Rumah Arqam bin Abi Arqam.",
    historicalThinkingFocus: "Historical Strategy",
    historicalThinkingDesc: "Mengkaji ketepatan dan rasionalitas strategi perintisan dakwah yang tertutup demi pembentukan karakter kader yang tangguh.",
    objectives: [
      "Menyebutkan nama-nama tokoh kunci Assabiqunal Awwalun",
      "Menjelaskan rasionalisasi pemilihan strategi dakwah secara sembunyi-sembunyi",
      "Menganalisis pentingnya rumah Arqam bin Abi Arqam sebagai madrasah pertama"
    ],
    emoji: "🔑",
    badgeToEarn: "pioneer-06"
  },
  {
    id: LevelId.LEVEL_7,
    title: "Dakwah Jahriyah",
    subtitle: "Seruan Bukit Shafa & Konfrontasi Quraisy",
    description: "Mengkaji keberanian moral dakwah terbuka setelah turunnya QS. Al-Hijr: 94. Deklarasi lantang di Bukit Shafa yang mengguncang oligarki pemimpin klan Quraisy.",
    historicalThinkingFocus: "Strategy and Consequence",
    historicalThinkingDesc: "Menganalisis transisi ke dakwah terang-terangan dan mengidentifikasi konsekuensi sosial, ego politik, serta penolakan kaum elit Quraisy.",
    objectives: [
      "Menjelaskan isi orasi dakwah pertama Nabi Muhammad SAW di Bukit Shafa",
      "Meringkas penolakan keras Abu Lahab beserta motif kekuasaannya",
      "Mengidentifikasi bentuk awal ejekan, intimidasi, dan ancaman fisik Quraisy"
    ],
    emoji: "📣",
    badgeToEarn: "courage-07"
  },
  {
    id: LevelId.LEVEL_8,
    title: "Tantangan dan Hambatan Dakwah",
    subtitle: "Penyiksaan Umar/Bilal & Pemboikotan 3 Tahun",
    description: "Mendeteksi tingkat penindasan fisik terhadap golongan budak, migrasi pertama ke Habasyah (Ethiopia), hingga peristiwa pemblokiran ekonomi total Quraisy terhadap Bani Hasyim.",
    historicalThinkingFocus: "Historical Analysis",
    historicalThinkingDesc: "Menganalisis secara kritis dan logis rintangan fisik serta pemboikotan ekonomi masyarakat Makkah kepada dakwah nabi.",
    objectives: [
      "Menganalisis sebab terjadinya Hijrah pertama ke Abisinia (Habasyah)",
      "Mengidentifikasi pasal-pasal piagam pemboikotan klan Hasim & Muthalib",
      "Mengagumi keteguhan iman tokoh Bilal bin Rabah, Keluarga Yasir, dll"
    ],
    emoji: "⚔️",
    badgeToEarn: "steadfast-08"
  },
  {
    id: LevelId.LEVEL_9,
    title: "Peristiwa Penting Dakwah di Makkah",
    subtitle: "Tahun Duka Cita hingga Perjalanan Langit",
    description: "Mengevaluasi cobaan emosional terbesar saat wafatnya Abu Thalib dan Khadijah RA, penolakan dakwah ke Thaif, dan penghiburan ilahi berupa Isra' Mi'raj serta kewajiban Shalat.",
    historicalThinkingFocus: "Historical Significance",
    historicalThinkingDesc: "Menganalisis dan memahami keagungan momentum emosional 'Amul Huzni serta signifikasi peristiwa Isra' Mi'raj bagi masa depan peradaban.",
    objectives: [
      "Menemukan korelasi istilah 'Amul Huzni' dengan hilangnya perlindungan eksternal Nabi",
      "Merekonstruksi hikmah spiritual dan sains awal di balik perjalanan Isra' Mi'raj",
      "Menjelaskan arti penting perjanjian Bai'at Aqabah I & II bagi masa depan dakwah"
    ],
    emoji: "🌌",
    badgeToEarn: "miraj-09"
  },
  {
    id: LevelId.LEVEL_10,
    title: "Keteladanan Nabi Muhammad SAW",
    subtitle: "Integrasi Nilai Kepemimpinan & Persiapan Hijrah",
    description: "Merangkum 13 tahun fondasi tauhid dan akhlak di Makkah. Menghubungkan seluruh rangkaian penderitaan dengan kemenangan taktis menjelang Hijrah akbar ke Yatsrib (Madinah).",
    historicalThinkingFocus: "Historical Reflection",
    historicalThinkingDesc: "Menarik kesimpulan moral dan keteladanan akhlak mulia dari perjuangan Rasulullah untuk diterapkan dalam kehidupan nyata masa kini.",
    objectives: [
      "Merumuskan 3 nilai utama (Ketabahan, Strategi, Persaudaraan) dari dakwah Makkah",
      "Mengevaluasi kesiapan mental umat Islam dalam meninggalkan tanah air demi prinsip keimanan",
      "Membuat resolusi pribadi dalam kehidupan sehari-hari berdasarkan karakter Rasulullah"
    ],
    emoji: "🏆",
    badgeToEarn: "exemplar-10"
  }
];

export const ALL_BADGES: Badge[] = [
  {
    id: "explorer-01",
    name: "Explorer",
    description: "Berhasil menyelesaikan orientasi dan memetakan gerbang timeline dakwah Makkah.",
    icon: "🗺️",
    unlockedAtLevel: LevelId.LEVEL_1,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "context-02",
    name: "Context Explorer",
    description: "Mampu menjelaskan latar belakang sosiologis era Jahiliyyah secara kontekstual.",
    icon: "🧭",
    unlockedAtLevel: LevelId.LEVEL_2,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "birth-03",
    name: "Time Traveler",
    description: "Mengerti keagungan kelahiran Rasulullah di tengah tahun guncangan gajah.",
    icon: "🌟",
    unlockedAtLevel: LevelId.LEVEL_3,
    color: "from-amber-400 to-orange-500"
  },
  {
    id: "integrity-04",
    name: "Al-Amin",
    description: "Memegang komitmen kejujuran dan amanah dalam tumbuh kembang kepemimpinan.",
    icon: "💎",
    unlockedAtLevel: LevelId.LEVEL_4,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "revelation-05",
    name: "Light Bearer",
    description: "Membawa cahaya pembebasan berpikir dari Gua Hira.",
    icon: "📜",
    unlockedAtLevel: LevelId.LEVEL_5,
    color: "from-rose-500 to-red-600"
  },
  {
    id: "pioneer-06",
    name: "Early Da'wah Pioneer",
    description: "Memahami model dakwah sirriyah dan rintisan awal Rumah Arqam.",
    icon: "🏰",
    unlockedAtLevel: LevelId.LEVEL_6,
    color: "from-violet-500 to-purple-700"
  },
  {
    id: "courage-07",
    name: "Brave Messenger",
    description: "Menunjukkan keberanian menyuarakan kalimatul haq di Bukit Shafa.",
    icon: "⚡",
    unlockedAtLevel: LevelId.LEVEL_7,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "steadfast-08",
    name: "Resilient Believer",
    description: "Teguh secara mental melewati cobaan boikot ekonomi dan intimidasi sosial.",
    icon: "🛡️",
    unlockedAtLevel: LevelId.LEVEL_8,
    color: "from-lime-600 to-emerald-700"
  },
  {
    id: "miraj-09",
    name: "Historical Explorer",
    description: "Mampu merumuskan signifikansi sejarah penting Isra' Mi'raj.",
    icon: "🌌",
    unlockedAtLevel: LevelId.LEVEL_9,
    color: "from-sky-500 to-blue-800"
  },
  {
    id: "exemplar-10",
    name: "HISTO-PATH Master",
    description: "Meraih gelar kejayaan tertinggi dengan integrasi adab sejarah dan akhlak mulia.",
    icon: "👑",
    unlockedAtLevel: LevelId.LEVEL_10,
    color: "from-yellow-500 to-amber-600"
  }
];

export const QUIZ_QUESTIONS: Record<LevelId, Question[]> = {
  [LevelId.LEVEL_1]: [
    {
      id: "q_1_1",
      questionText: "Mengapa keterampilan menyusun urutan kronologi waktu sangat krusial dalam mempelajari sejarah kebudayaan Islam Makkah?",
      options: [
        "Agar kita hafal angka tahun kejadian tanpa maknanya",
        "Untuk melihat kerangka perkembangan perjuangan, mengidentifikasi pola sebab-akibat, serta menghindari pemahaman sejarah yang tumpang tindih",
        "Agar bisa membandingkan peradaban Arab dengan Romawi secara acak",
        "Hanya untuk memenuhi syarat kurikulum ujian sekolah"
      ],
      correctAnswerIndex: 1,
      explanation: "Berpikir kronologis memungkinkan siswa merunut jalannya sejarah secara teratur sehingga terlihat jelas transisi perubahan perjuangan dakwah dari yang rahasia hingga berdaulat."
    },
    {
      id: "q_1_2",
      questionText: "Berapa lamakah rentang waktu perjuangan dakwah Rasulullah SAW di Kota Makkah sebelum diperintah berhijrah ke Madinah?",
      options: [
        "Sekitar 10 tahun",
        "Sekitar 23 tahun total seluruh kerasulan",
        "Sekitar 3 tahun lamanya",
        "Sekitar 13 tahun lamanya"
      ],
      correctAnswerIndex: 3,
      explanation: "Fase dakwah Rasulullah SAW terbagi menjadi dua: Fase Makkah selama kurang lebih 13 tahun, dan Fase Madinah selama 10 tahun."
    }
  ],
  [LevelId.LEVEL_2]: [
    {
      id: "q_2_1",
      questionText: "Kepercayaan dominan masyarakat Quraisy di Makkah sebelum datangnya Islam disebut Jahiliyyah, yang ditandai dengan paganisme. Apakah arti paganisme dalam konteks ini?",
      options: [
        "Menyembah benda-benda astronomi seperti bintang dan bulan saja",
        "Menyembah banyak berhala (patung) seperti Hubal, Lata, Uzza, dan Manat untuk dijadikan perantara kepada Tuhan",
        "Mempercayai bahwa babi adalah hewan keramat",
        "Sistem kepercayaan yang tidak mempercayai keberadaan roh sama sekali"
      ],
      correctAnswerIndex: 1,
      explanation: "Masyarakat Jahiliyyah pada saat itu menaruh ratusan berhala di sekeliling Ka'bah sebagai tuhan sekutu/perantara doa mereka."
    },
    {
      id: "q_2_2",
      questionText: "Bagaimanakah sistem kesukuan (tribalisme) memengaruhi keadilan sosial pada masa pra-Islam di Makkah?",
      options: [
        "Menghasilkan keadilan merata bagi seluruh penduduk tanpa pandang bulu",
        "Siapa yang kuat dan berasal dari suku/klan terpandang (seperti Bani Makhzum atau Bani Umayyah) akan terlindungi hukum, sedangkan budak dan suku lemah tidak memiliki hak asasi yang layak",
        "Sistem kesukuan menolak adanya perdagangan luar negeri",
        "Hukum dijalankan oleh kepolisian formal negara berbentuk kesultanan terpusat"
      ],
      correctAnswerIndex: 1,
      explanation: "Fanatisme kesukuan (ashabiyah) menyebabkan perlindungan hukum bersifat tebang pilih, hanya berpihak kepada klan-klan bangsawan elite."
    },
    {
      id: "q_2_3",
      questionText: "Mengapa pasar musiman seperti Souq Ukaz, Majannah, dan Dzul Majaz sangat penting secara ekonomi bagi penduduk Makkah?",
      options: [
        "Sebagai tempat wisata murni tanpa transaksi",
        "Sebagai pusat sirkulasi komoditas dagang internasional, penyebaran syi'ar syair sastra Arab, sekaligus pusat transaksi usury (riba) kaum borjuis Quraisy",
        "Hanya tempat bertanding pedang antar suku",
        "Sebagai pasar khusus budak wanita saja tanpa ada produk lain"
      ],
      correctAnswerIndex: 1,
      explanation: "Tiga pasar utama ini mengonsolidasikan Makkah sebagai poros dagang terpenting antara Yaman (selatan) dan Syam (utara)."
    }
  ],
  [LevelId.LEVEL_3]: [
    {
      id: "q_3_1",
      questionText: "Mengapa tahun kelahiran Nabi Muhammad SAW dinamakan 'Tahun Gajah'?",
      options: [
        "Karena lahir banyak gajah di wilayah Hijaz pada tahun tersebut",
        "Karena Makkah diserang oleh pasukan berkuda yang membawa puluhan gajah yang dipimpin raja Abrahah asal Yaman untuk meruntuhkan Ka'bah",
        "Tahun di mana kaum muslimin mengekspor gajah ke Afrika",
        "Karena nabi menyukai gajah liar"
      ],
      correctAnswerIndex: 1,
      explanation: "Abrahah al-Asyram memimpin balatentara bergajah untuk menghancurkan Ka'bah demi mengalihkan kiblat ziarah ke gereja buatannya di Yaman, namun dihancurkan oleh burung Ababil."
    }
  ],
  [LevelId.LEVEL_4]: [
    {
      id: "q_4_1",
      questionText: "Gelar 'Al-Amin' disematkan oleh seluruh lapisan masyarakat Makkah kepada Nabi Muhammad SAW karena...",
      options: [
        "Kemampuannya berpidato dengan sangat fasih",
        "Integritas moral tinggi, kejujuran luar biasa dalam ucapan dan bisnis, serta terpercaya dalam menjaga amanah",
        "Kekayaan harta bendanya yang melimpah",
        "Keberaniannya mengalahkan perompak gurun"
      ],
      correctAnswerIndex: 1,
      explanation: "Gelar ini divalidasi bahkan oleh kaum musyrik ketika beliau menengahi perseteruan peletakan kembali Hajar Aswad secara adil menggunakan sorban."
    }
  ],
  [LevelId.LEVEL_5]: [
    {
      id: "q_5_1",
      questionText: "Surah Al-Qur'an manakah yang merupakan wahyu pertama yang diturunkan kepada Nabi Muhammad SAW lewat perantara Jibril di Gua Hira?",
      options: [
        "QS. Al-Fatihah ayat 1-7",
        "QS. Al-Alaq ayat 1-5",
        "QS. Al-Muddatstsir ayat 1-7",
        "QS. Al-Ikhlas ayat 1-4"
      ],
      correctAnswerIndex: 1,
      explanation: "QS. Al-Alaq ayat 1-5 memerintahkan pembacaan (Iqra') sebagai basis pembebasan berpikir berbasis tauhid dan keilmuan."
    }
  ],
  [LevelId.LEVEL_6]: [
    {
      id: "q_6_1",
      questionText: "Di manakah pusat dakwah rahasia yang dijadikan markas kaderisasi, pembinaan ilmu agama, dan tempat berkumpul rahasia umat Islam awal?",
      options: [
        "Di dekat Hajar Aswad secara terangan",
        "Di kediaman paman Nabi, Abu Thalib",
        "Di rumah sahabat Arqam bin Abi Arqam (Darul Arqam)",
        "Di puncak bukit Uhud"
      ],
      correctAnswerIndex: 2,
      explanation: "Rumah Arqam dipilih karena letaknya strategis terlindung di kaki bukit Shafa dan berasal dari klan Bani Makhzum, suku yang tidak dicurigai memfasilitasi Bani Hasyim."
    }
  ],
  [LevelId.LEVEL_7]: [
    {
      id: "q_7_1",
      questionText: "Tempat manakah yang dipilih Rasulullah untuk mengumumkan ajaran Islam secara terbuka pertama kali kepada segenap kerabas klan Quraisy?",
      options: [
        "Di dalam Kakbah",
        "Kemah perbatasan Thaif",
        "Puncak Bukit Shafa",
        "Pasar Ukaz"
      ],
      correctAnswerIndex: 2,
      explanation: "Sesuai tradisi Arab, puncak Bukit Shafa digunakan untuk memberi pengumuman darurat. Dari sana Nabi mendeklarasikan pengesaan Allah dan peringatan hari pembalasan."
    }
  ],
  [LevelId.LEVEL_8]: [
    {
      id: "q_8_1",
      questionText: "Bagaimana isi utama piagam pemboikotan ekonomi dan sosial yang dilakukan kaum Quraisy terhadap Bani Hasyim?",
      options: [
        "Larangan melakukan transaksi jual beli, hubungan pernikahan, ziarah, dan komunikasi sosial dengan Bani Hasyim dan Bani Muthallib",
        "Hanya melarang ibadah haji",
        "Larangan menjual unta ke luar negeri",
        "Mewajibkan pembayaran pajak 50% bagi pengikut Muhammad"
      ],
      correctAnswerIndex: 0,
      explanation: "Pemboikotan total ini berlangsung selama 3 tahun, menyebabkan kaum muslimin terisolasi di Syi'ib Abu Thalib hingga memakan dedaunan kering akibat kelaparan."
    }
  ],
  [LevelId.LEVEL_9]: [
    {
      id: "q_9_1",
      questionText: "Peristiwa agung perjalanan satu malam dari Masjidil Haram ke Masjidil Aqsa lalu naik ke sidratul muntaha di sebut...",
      options: [
        "Fathu Makkah",
        "Isra' Mi'raj",
        "Amul Huzni",
        "Hijrah Habasyah"
      ],
      correctAnswerIndex: 1,
      explanation: "Isra' Mi'raj menjadi mukjizat spiritual mulia sekaligus momentum pensyariatan ibadah Shalat 5 waktu langsung ke Arsy."
    }
  ],
  [LevelId.LEVEL_10]: [
    {
      id: "q_10_1",
      questionText: "Apakah hikmah moral fundamental paling berharga bagi generasi muda dari kegigihan dakwah Rasulullah SAW menghadapi boikot di Makkah?",
      options: [
        "Bahwa perjuangan mulia itu instan tanpa rintangan jika didoakan",
        "Ketabahan memegang teguh kebenaran, kepemimpinan taktis mengkombinasikan strategi rahasia dan publik, serta pentingnya integritas moral",
        "Memaksimalkan perlawanan senjata fisik dalam mengalahkan musuh pemikiran",
        "Menyerah saja pada keadaan jika tekanan lingkungan sosial sudah terlalu masif"
      ],
      correctAnswerIndex: 1,
      explanation: "Urgensi keteguhan moral dikombinasikan dengan strategi taktis (seperti merintis pakta Aqabah dan hijrah) adalah inti utama pelajaran sejarah dakwah Rasulullah."
    }
  ]
};
