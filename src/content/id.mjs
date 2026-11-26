// Bahasa Indonesia (default locale). Shape must stay identical to en.mjs — tests enforce it.
// Product terms (AI, Automation, SaaS, Digital Commerce, Discover…Improve) stay in English by design.

export default {
  common: {
    skip: 'Lewati ke konten utama',
    navLabel: 'Navigasi utama',
    menuOpen: 'Buka menu',
    menuClose: 'Tutup menu',
    currentLanguage: 'Bahasa saat ini',
    statusPrefix: 'Status',
    status: {
      live: 'Aktif',
      building: 'Dalam pembangunan',
      validating: 'Dalam validasi',
      planned: 'Direncanakan',
      method: 'Kerangka kerja',
      draft: 'Draf',
    },
    learnMore: 'Pelajari',
    ogAlt: 'Logo AVERLYNT di atas latar karbon dengan garis rute berwarna teal',
    map: {
      label: 'Peta ekosistem AVERLYNT: empat kapabilitas yang saling terhubung',
      caption: 'Route-Frame: empat kapabilitas, satu jalur kerja.',
    },
    cta: {
      title: 'Mulai dari satu kebutuhan nyata.',
      text: 'Ceritakan masalah yang ingin Anda selesaikan. Setiap masukan kami baca sebagai bahan validasi produk berikutnya.',
      primary: 'Hubungi AVERLYNT',
      secondary: 'Kenali prinsip kami',
    },
  },

  nav: {
    home: 'Beranda',
    platform: 'Platform',
    capabilities: 'Kapabilitas',
    how: 'Cara kerja',
    about: 'Tentang',
    contact: 'Kontak',
    start: 'Mulai',
    signIn: 'Masuk',
    account: 'Akun',
    repo: 'Repositori GitHub',
    privacy: 'Kebijakan Privasi',
    terms: 'Ketentuan Layanan',
  },

  footer: {
    tagline: 'Ekosistem digital independen yang menghubungkan AI, automation, SaaS, dan digital commerce dalam satu jalur kerja.',
    statusLine: 'Fondasi brand dan situs web sudah berjalan. Produk pertama masih divalidasi.',
    ecosystem: 'Ekosistem',
    capabilities: 'Kapabilitas',
    brand: 'AVERLYNT',
    legal: 'Legal',
    rights: 'Hak cipta dilindungi.',
    origin: 'Dibangun di Indonesia, disiapkan untuk pasar global.',
  },

  capabilities: {
    ai: {
      name: 'AI',
      role: 'Memahami konteks',
      summary: 'Kecerdasan untuk membaca konteks, merangkum informasi, dan mendukung keputusan. Manusia tetap memegang kendali.',
      status: 'validating',
      title: 'AI yang membantu memahami, bukan menggantikan penilaian.',
      lede: 'Kapabilitas AI di AVERLYNT diarahkan untuk membaca konteks, menyusun informasi, dan memberi dukungan keputusan pada pekerjaan yang nyata.',
      metaTitle: 'Kapabilitas AI',
      metaDescription: 'Arah kapabilitas AI AVERLYNT: memahami konteks, merangkum informasi, dan mendukung keputusan. Lengkap dengan manfaat, batasan, dan contoh penggunaan.',
      description: [
        'AI adalah lapisan pemahaman dalam ekosistem AVERLYNT. Perannya mengubah informasi yang berserakan, seperti catatan, pertanyaan pelanggan, atau data operasional, menjadi ringkasan dan usulan yang bisa ditindaklanjuti.',
        'Kami memperlakukan AI sebagai asisten yang hasilnya selalu bisa diperiksa. Setiap keluaran dirancang untuk ditinjau manusia sebelum memengaruhi pelanggan, uang, atau keputusan penting.',
      ],
      benefits: [
        'Mempercepat pekerjaan membaca, merangkum, dan menyusun draf awal.',
        'Membantu melihat pola dari informasi yang terlalu banyak untuk dibaca satu per satu.',
        'Memberi titik awal yang konsisten sehingga tim kecil bisa bergerak lebih cepat.',
      ],
      limits: [
        'Model AI bisa keliru atau terdengar yakin saat salah. Hasilnya perlu ditinjau manusia.',
        'Kualitas keluaran bergantung pada kualitas data dan konteks yang diberikan.',
        'Belum ada fitur AI AVERLYNT yang dapat digunakan publik. Halaman ini menjelaskan arah, bukan produk jadi.',
        'Penggunaan model pihak ketiga dapat menimbulkan biaya dan pertimbangan privasi yang harus dinilai per kasus.',
      ],
      useCases: [
        { title: 'Ringkasan percakapan pelanggan', text: 'Merangkum pertanyaan yang sering muncul agar pemilik usaha tahu apa yang paling perlu dijawab.' },
        { title: 'Draf konten produk', text: 'Menyusun draf deskripsi produk dari spesifikasi yang ada, lalu disunting manusia sebelum terbit.' },
        { title: 'Riset awal peluang', text: 'Mengumpulkan dan mengelompokkan bahan riset sebagai titik awal diskusi, bukan kesimpulan akhir.' },
      ],
      connects: 'AI memberi pemahaman. Automation menjalankan langkah berikutnya, SaaS menjadi tempat kerjanya, dan Digital Commerce membawa hasilnya ke pasar.',
    },
    automation: {
      name: 'Automation',
      role: 'Menjalankan alur',
      summary: 'Alur kerja berulang yang berjalan konsisten, dengan titik kendali yang jelas dan mudah diperiksa.',
      status: 'validating',
      title: 'Pekerjaan berulang yang berjalan konsisten.',
      lede: 'Automation di AVERLYNT berarti merancang alur kerja yang jelas pemicunya, jelas langkahnya, dan jelas siapa yang bertanggung jawab saat terjadi pengecualian.',
      metaTitle: 'Kapabilitas Automation',
      metaDescription: 'Arah kapabilitas Automation AVERLYNT: alur kerja berulang yang konsisten dan terkendali. Lengkap dengan manfaat, batasan, dan contoh penggunaan.',
      description: [
        'Automation adalah lapisan eksekusi. Ia mengambil langkah yang sudah dipahami dengan baik, lalu menjalankannya secara berulang tanpa bergantung pada ingatan seseorang.',
        'Alur yang baik dimulai dari proses manual yang sudah terbukti. Kami tidak mengotomatiskan proses yang belum dipahami, karena itu hanya mempercepat kesalahan.',
      ],
      benefits: [
        'Mengurangi pekerjaan manual yang berulang dan rawan terlewat.',
        'Membuat proses berjalan dengan cara yang sama setiap kali.',
        'Memberi jejak yang bisa diperiksa: apa yang berjalan, kapan, dan hasilnya.',
      ],
      limits: [
        'Automation hanya sebaik proses yang diotomatiskan. Proses yang kacau akan tetap kacau, hanya lebih cepat.',
        'Kasus pengecualian tetap memerlukan keputusan manusia.',
        'Belum ada alur otomatis AVERLYNT yang tersedia untuk publik saat ini.',
        'Integrasi dengan layanan lain bergantung pada akses dan batasan layanan tersebut.',
      ],
      useCases: [
        { title: 'Tindak lanjut pesanan', text: 'Mengirim konfirmasi dan pengingat secara berurutan setelah pesanan masuk, tanpa perlu diingat satu per satu.' },
        { title: 'Rekap operasional harian', text: 'Mengumpulkan angka penting dari beberapa sumber ke satu ringkasan pada waktu yang sama setiap hari.' },
        { title: 'Penerusan permintaan', text: 'Meneruskan permintaan masuk ke orang yang tepat berdasarkan aturan yang disepakati.' },
      ],
      connects: 'Automation bergantung pada pemahaman dari AI, berjalan di dalam produk SaaS, dan menjaga operasional Digital Commerce tetap rapi.',
    },
    saas: {
      name: 'SaaS',
      role: 'Menjadi produk',
      summary: 'Perangkat lunak terfokus yang memberi pekerjaan sebuah tempat: satu masalah, satu produk yang jelas.',
      status: 'validating',
      title: 'Perangkat lunak terfokus untuk masalah yang jelas.',
      lede: 'SaaS di AVERLYNT berarti produk perangkat lunak yang dibangun untuk satu masalah yang sudah divalidasi, bukan kumpulan fitur yang mencoba melayani semua orang.',
      metaTitle: 'Kapabilitas SaaS',
      metaDescription: 'Arah kapabilitas SaaS AVERLYNT: perangkat lunak terfokus untuk masalah yang sudah divalidasi. Lengkap dengan manfaat, batasan, dan contoh penggunaan.',
      description: [
        'SaaS adalah lapisan produk. Di sinilah pemahaman dari AI dan alur dari Automation dikemas menjadi sesuatu yang bisa dibuka, dipakai, dan diandalkan setiap hari.',
        'Produk SaaS pertama AVERLYNT belum ditentukan. Kami memilih memvalidasi masalahnya lebih dulu daripada mengumumkan nama dan fitur yang belum ada.',
      ],
      benefits: [
        'Memberi satu tempat yang jelas untuk sebuah pekerjaan, sehingga tidak tersebar di banyak alat.',
        'Bisa diakses dari peramban tanpa pemasangan yang rumit.',
        'Bisa berkembang bertahap mengikuti kebutuhan yang terbukti.',
      ],
      limits: [
        'Belum ada produk SaaS AVERLYNT yang diluncurkan. Nama, fitur, dan harga belum ditetapkan.',
        'Produk terfokus tidak akan cocok untuk setiap kebutuhan. Itu disengaja.',
        'Akun AVERLYNT saat ini hanya menyimpan identitas dasar dan belum membuka fitur produk apa pun.',
      ],
      useCases: [
        { title: 'Ruang kerja satu proses', text: 'Satu aplikasi ringkas untuk satu proses penting, misalnya pencatatan pesanan untuk usaha kecil.' },
        { title: 'Dasbor operasional', text: 'Tampilan sederhana yang menunjukkan kondisi usaha hari ini tanpa perlu membuka banyak sumber.' },
        { title: 'Alat internal tim', text: 'Perangkat kecil yang menggantikan lembar kerja yang sudah terlalu rumit untuk dirawat.' },
      ],
      connects: 'SaaS menjadi rumah bagi AI dan Automation, sekaligus bentuk yang bisa ditawarkan melalui Digital Commerce.',
    },
    commerce: {
      name: 'Digital Commerce',
      role: 'Menjangkau pasar',
      summary: 'Kemampuan mengemas nilai menjadi penawaran, menjualnya secara digital, dan menjalankan operasinya.',
      status: 'validating',
      title: 'Mengubah nilai menjadi aktivitas bisnis digital.',
      lede: 'Digital Commerce di AVERLYNT mencakup cara mengemas penawaran, menjangkau pembeli, dan menjalankan operasi penjualan secara digital.',
      metaTitle: 'Kapabilitas Digital Commerce',
      metaDescription: 'Arah kapabilitas Digital Commerce AVERLYNT: mengemas penawaran, menjangkau pembeli, dan menjalankan operasi penjualan digital secara bertahap.',
      description: [
        'Digital Commerce adalah lapisan pasar. Kapabilitas ini memastikan sesuatu yang bernilai benar-benar sampai ke pembeli: dikemas dengan jelas, bisa ditemukan, dan bisa dibeli.',
        'Kami memandang commerce sebagai operasi yang utuh, mulai dari penawaran sampai layanan setelah pembelian, bukan sekadar halaman pembayaran.',
      ],
      benefits: [
        'Membantu mengemas produk atau jasa menjadi penawaran yang mudah dipahami.',
        'Membuka jalur penjualan digital yang bisa diukur dan diperbaiki.',
        'Menghubungkan penjualan dengan operasional sehingga pertumbuhan tidak menambah kekacauan.',
      ],
      limits: [
        'AVERLYNT belum memproses pembayaran dan belum menjual produk apa pun.',
        'Hasil penjualan bergantung pada produk, pasar, dan eksekusi. Tidak ada janji pendapatan.',
        'Pembayaran, pajak, dan perlindungan konsumen memiliki aturan yang harus dipenuhi sebelum penjualan dimulai.',
      ],
      useCases: [
        { title: 'Penawaran produk digital', text: 'Mengemas keahlian atau perangkat menjadi produk digital dengan halaman penawaran yang jelas.' },
        { title: 'Katalog daring sederhana', text: 'Menampilkan produk dengan informasi rapi sehingga calon pembeli bisa memutuskan lebih cepat.' },
        { title: 'Operasi setelah pembelian', text: 'Menyiapkan alur konfirmasi, pengiriman, dan layanan agar pengalaman pembeli tetap konsisten.' },
      ],
      connects: 'Digital Commerce membawa hasil AI, Automation, dan SaaS ke pasar, lalu mengembalikan masukan pembeli sebagai bahan perbaikan.',
    },
  },

  steps: {
    discover: {
      name: 'Discover',
      local: 'Temukan kebutuhan',
      summary: 'Memahami masalah, konteks, dan hasil yang diinginkan.',
      detail: 'Kami mulai dari percakapan dan pengamatan: siapa yang mengalami masalah, seberapa sering, dan apa akibatnya jika dibiarkan.',
      output: 'Pernyataan masalah yang jelas.',
    },
    validate: {
      name: 'Validate',
      local: 'Uji asumsi',
      summary: 'Memastikan masalahnya nyata sebelum membangun apa pun.',
      detail: 'Asumsi diuji dengan cara termurah yang masih jujur, misalnya wawancara, percobaan manual, atau halaman penawaran sederhana.',
      output: 'Keputusan lanjut, ubah arah, atau berhenti.',
    },
    design: {
      name: 'Design',
      local: 'Rancang sistem',
      summary: 'Merancang alur, peran, dan batasan solusi.',
      detail: 'Solusi dirancang sebagai sistem: bagian mana yang perlu AI, mana yang cukup diotomatiskan, dan mana yang tetap dikerjakan manusia.',
      output: 'Rancangan alur dan ruang lingkup.',
    },
    build: {
      name: 'Build',
      local: 'Bangun bertahap',
      summary: 'Membangun versi terkecil yang benar-benar berguna.',
      detail: 'Pembangunan dilakukan bertahap dengan pengujian di setiap langkah, sehingga setiap versi bisa dipakai dan dinilai.',
      output: 'Versi yang berfungsi dan teruji.',
    },
    operate: {
      name: 'Operate',
      local: 'Jalankan',
      summary: 'Menjalankan solusi dalam pekerjaan sehari-hari.',
      detail: 'Solusi dipakai dalam kondisi nyata dengan kendali yang jelas: siapa memantau, apa yang dicatat, dan kapan manusia mengambil alih.',
      output: 'Operasi yang berjalan dan terpantau.',
    },
    improve: {
      name: 'Improve',
      local: 'Perbaiki',
      summary: 'Belajar dari penggunaan, lalu memperbaiki langkah berikutnya.',
      detail: 'Data penggunaan dan masukan pengguna dikumpulkan untuk memutuskan apa yang diperbaiki, ditambah, atau dihapus.',
      output: 'Daftar perbaikan yang diprioritaskan.',
    },
  },

  pages: {
    home: {
      title: 'AVERLYNT — AI, Automation, SaaS, Digital Commerce',
      description: 'AVERLYNT adalah ekosistem digital independen yang menghubungkan AI, automation, SaaS, dan digital commerce untuk mengubah ide menjadi sistem yang bekerja.',
      eyebrow: 'Ekosistem digital independen',
      h1: 'Ubah ide menjadi sistem yang bekerja.',
      lede: 'AVERLYNT menghubungkan AI, automation, SaaS, dan digital commerce dalam satu jalur kerja, sehingga sebuah kebutuhan bisnis bisa bergerak dari gagasan sampai operasi nyata.',
      primary: 'Jelajahi platform',
      secondary: 'Lihat cara kerja',
      note: 'Fondasi sedang dibangun. Produk pertama masih dalam validasi.',
      value: {
        label: 'Nilai utama',
        title: 'Satu jalur, bukan tumpukan alat.',
        intro: 'Banyak usaha memiliki alat yang bagus tetapi tidak saling terhubung. AVERLYNT dirancang agar setiap kapabilitas menguatkan kapabilitas lainnya.',
        items: [
          { title: 'Berangkat dari kebutuhan', text: 'Setiap pekerjaan dimulai dari masalah bisnis yang nyata, bukan dari tren teknologi atau daftar fitur.' },
          { title: 'Terhubung sejak awal', text: 'Pemahaman, eksekusi, produk, dan pasar dirancang sebagai satu sistem sehingga tidak perlu disambung belakangan.' },
          { title: 'Dibangun bertahap', text: 'Kapabilitas diperkenalkan setelah tervalidasi. Yang belum ada kami sebut belum ada.' },
        ],
      },
      capabilities: {
        label: 'Empat kapabilitas',
        title: 'Empat kapabilitas, satu ekosistem.',
        intro: 'Masing-masing memiliki peran yang jelas. Bersama-sama, keempatnya membentuk jalur dari pemahaman sampai pasar.',
      },
      how: {
        label: 'Cara kerja',
        title: 'Dari kebutuhan sampai perbaikan.',
        intro: 'Enam tahap ini adalah kerangka kerja kami. Saat ini tahapannya dijalankan secara manual dan belum berupa sistem otomatis.',
        link: 'Baca setiap tahap',
      },
      useCases: {
        label: 'Contoh penerapan',
        title: 'Untuk siapa arah ini relevan.',
        intro: 'Tiga gambaran berikut menunjukkan jenis kebutuhan yang ingin kami layani.',
        items: [
          { who: 'Pemilik usaha kecil', title: 'Operasi yang lebih rapi', text: 'Mengurangi pekerjaan berulang seperti rekap pesanan dan tindak lanjut pelanggan agar waktu kembali ke hal yang penting.' },
          { who: 'Pendiri produk digital', title: 'Dari gagasan ke versi pertama', text: 'Memvalidasi masalah, merancang ruang lingkup, lalu membangun versi terkecil yang layak diuji pasar.' },
          { who: 'Kreator dan operator mandiri', title: 'Keahlian menjadi penawaran', text: 'Mengemas keahlian menjadi produk digital dengan jalur penjualan yang bisa diukur.' },
        ],
        note: 'Semua contoh di atas bersifat ilustratif. Ini bukan studi kasus, bukan testimoni, dan bukan hasil dari klien nyata.',
      },
      status: {
        label: 'Status pengembangan',
        title: 'Apa yang sudah ada, apa yang belum.',
        intro: 'Kami memisahkan dengan tegas hal yang sudah berjalan dari hal yang masih direncanakan.',
        items: [
          { title: 'Fondasi brand dan situs web', text: 'Identitas visual, situs dwibahasa, dan dokumentasi sudah tersedia secara publik.', status: 'live' },
          { title: 'Akun AVERLYNT', text: 'Masuk dan pendaftaran akun sudah tersedia. Akun belum membuka fitur produk apa pun.', status: 'live' },
          { title: 'Empat kapabilitas', text: 'Arah AI, Automation, SaaS, dan Digital Commerce sudah dirumuskan. Belum ada yang dirilis sebagai produk.', status: 'validating' },
          { title: 'Produk komersial pertama', text: 'Nama, fitur, dan harga belum ditetapkan. Keputusan menunggu hasil validasi kebutuhan.', status: 'validating' },
          { title: 'Formulir kontak dan email resmi', text: 'Belum tersedia. Untuk saat ini kontak dilakukan melalui GitHub.', status: 'planned' },
        ],
      },
    },

    platform: {
      title: 'Platform dan ekosistem',
      description: 'Cara AI, automation, SaaS, dan digital commerce saling terhubung dalam ekosistem AVERLYNT, beserta prinsip dan batasan yang berlaku saat ini.',
      eyebrow: 'Platform',
      h1: 'Empat kapabilitas yang dirancang sebagai satu sistem.',
      lede: 'Platform AVERLYNT bukan satu aplikasi besar. Ia adalah cara menyusun pemahaman, eksekusi, produk, dan pasar agar saling menguatkan.',
      model: {
        label: 'Model ekosistem',
        title: 'Route-Frame: jalur di dalam kerangka.',
        intro: 'Setiap kapabilitas adalah sebuah titik. Nilainya muncul dari jalur yang menghubungkan titik-titik itu.',
        paragraphs: [
          'AI membaca konteks dan menghasilkan pemahaman. Automation mengubah pemahaman itu menjadi langkah yang berjalan berulang. SaaS memberi keduanya bentuk produk yang bisa dipakai setiap hari. Digital Commerce membawa produk itu ke pasar.',
          'Jalur itu tidak berhenti di pasar. Masukan pembeli kembali menjadi konteks baru bagi AI, sehingga sistem terus diperbaiki. Itulah sebabnya peta kami berbentuk lingkar, bukan garis lurus.',
        ],
      },
      links: {
        label: 'Hubungan antarkapabilitas',
        title: 'Bagaimana satu kapabilitas menguatkan yang lain.',
        intro: 'Empat hubungan utama dalam ekosistem.',
        to: 'ke',
        items: [
          { from: 'ai', to: 'automation', text: 'Pemahaman menentukan langkah. Hasil pembacaan AI menjadi pemicu dan masukan bagi alur otomatis.' },
          { from: 'automation', to: 'saas', text: 'Alur yang terbukti dikemas menjadi fitur produk sehingga bisa dipakai tanpa bantuan teknis.' },
          { from: 'saas', to: 'commerce', text: 'Produk yang jelas bisa ditawarkan, dijual, dan dilayani melalui jalur digital.' },
          { from: 'commerce', to: 'ai', text: 'Masukan dan perilaku pembeli menjadi konteks baru untuk dipahami dan diperbaiki.' },
        ],
      },
      principles: {
        label: 'Prinsip rancangan',
        title: 'Prinsip yang menjaga arah platform.',
        items: [
          { title: 'Manusia memegang kendali', text: 'AI dan automation membantu. Keputusan yang berdampak tetap berada di tangan manusia.' },
          { title: 'Modular', text: 'Setiap kapabilitas bisa dipakai sendiri, lalu dihubungkan saat kebutuhannya terbukti.' },
          { title: 'Biaya awal serendah mungkin', text: 'Infrastruktur dipilih agar bisa dimulai tanpa biaya, lalu ditingkatkan saat ada kebutuhan nyata.' },
          { title: 'Terbuka terhadap batasan', text: 'Setiap kapabilitas ditulis bersama batasannya, agar ekspektasi tetap wajar.' },
        ],
      },
      boundaries: {
        label: 'Batasan saat ini',
        title: 'Yang belum ada di platform ini.',
        intro: 'Agar tidak ada salah paham, berikut hal yang belum tersedia.',
        items: [
          'Belum ada dasbor, aplikasi, atau antarmuka pemrograman yang bisa dipakai publik.',
          'Belum ada integrasi aktif dengan layanan pihak ketiga selain layanan masuk akun.',
          'Belum ada agen AI atau alur otomatis yang berjalan untuk pengguna.',
          'Belum ada harga, paket, atau proses pembayaran.',
        ],
      },
    },

    capabilities: {
      title: 'Kapabilitas',
      description: 'Empat kapabilitas inti AVERLYNT: AI, Automation, SaaS, dan Digital Commerce. Setiap halaman memuat deskripsi, manfaat, batasan, dan contoh penggunaan.',
      eyebrow: 'Kapabilitas',
      h1: 'Empat kapabilitas inti AVERLYNT.',
      lede: 'Setiap kapabilitas dijelaskan apa adanya: perannya, manfaatnya, batasannya, dan contoh penggunaan yang masuk akal.',
      list: {
        label: 'Daftar kapabilitas',
        title: 'Pilih kapabilitas untuk membaca rinciannya.',
        intro: 'Keempatnya berstatus dalam validasi. Belum ada yang dirilis sebagai produk.',
      },
      note: 'Kapabilitas menggambarkan arah pengembangan AVERLYNT. Ketersediaan fitur akan diumumkan di halaman ini setelah benar-benar dirilis.',
    },

    capability: {
      statusNote: 'Kapabilitas ini masih divalidasi dan belum tersedia sebagai produk.',
      description: { label: 'Deskripsi', title: 'Apa peran kapabilitas ini.' },
      benefits: { label: 'Manfaat', title: 'Manfaat yang dituju.' },
      limits: { label: 'Batasan', title: 'Batasan yang perlu diketahui.' },
      useCases: { label: 'Contoh penggunaan', title: 'Contoh penggunaan yang masuk akal.' },
      useCasesNote: 'Contoh bersifat ilustratif dan belum tersedia sebagai fitur.',
      connects: { label: 'Keterhubungan', title: 'Hubungan dengan kapabilitas lain.' },
    },

    how: {
      title: 'Cara kerja',
      description: 'Enam tahap kerja AVERLYNT: Discover, Validate, Design, Build, Operate, dan Improve, beserta penjelasan apa yang sudah berjalan saat ini.',
      eyebrow: 'Cara kerja',
      h1: 'Enam tahap dari kebutuhan sampai perbaikan.',
      lede: 'Kerangka ini menjaga agar setiap hal yang dibangun berangkat dari kebutuhan nyata dan terus diperbaiki setelah dipakai.',
      outputLabel: 'Keluaran: ',
      flow: {
        label: 'Alur kerja',
        title: 'Setiap tahap memiliki keluaran yang jelas.',
        intro: 'Tahap berikutnya hanya dimulai jika keluaran tahap sebelumnya sudah ada.',
      },
      honesty: {
        label: 'Kondisi saat ini',
        title: 'Apa yang sudah berjalan dari alur ini.',
        intro: 'Alur di atas adalah metode kerja, bukan sistem otomatis yang sudah jadi.',
        items: [
          { title: 'Enam tahap kerja', text: 'Dipakai sebagai kerangka dalam membangun AVERLYNT sendiri, termasuk situs ini. Dijalankan secara manual.', status: 'method' },
          { title: 'Otomatisasi antartahap', text: 'Belum ada. Perpindahan dari satu tahap ke tahap berikutnya masih dilakukan manusia.', status: 'planned' },
          { title: 'Alat mandiri bagi pengguna', text: 'Belum ada alat yang memungkinkan pengguna menjalankan alur ini sendiri.', status: 'planned' },
        ],
      },
    },

    about: {
      title: 'Tentang',
      description: 'Identitas, prinsip, dan arah AVERLYNT sebagai brand digital independen yang berawal di Indonesia, termasuk aset brand yang dapat diunduh.',
      eyebrow: 'Tentang',
      h1: 'Brand independen untuk membangun sistem digital yang nyata.',
      lede: 'AVERLYNT berawal di Indonesia dengan arah yang siap berkembang ke pasar global. Kami sedang membangun fondasinya secara terbuka dan bertahap.',
      identity: {
        label: 'Identitas',
        title: 'Siapa AVERLYNT saat ini.',
        paragraphs: [
          'AVERLYNT adalah brand digital independen pada tahap awal. Saat ini wujudnya berupa identitas brand, situs web ini, dan arah produk yang sedang divalidasi.',
          'Kami tidak memiliki cerita besar untuk dijual. Belum ada pelanggan, angka pertumbuhan, atau penghargaan yang bisa ditampilkan, sehingga tidak ada yang kami tampilkan.',
          'Yang kami miliki adalah arah yang jelas: menghubungkan AI, automation, SaaS, dan digital commerce menjadi satu ekosistem yang membantu ide berubah menjadi sistem yang bekerja.',
        ],
      },
      principles: {
        label: 'Prinsip',
        title: 'Prinsip yang kami pegang.',
        items: [
          { title: 'Jujur terhadap status', text: 'Yang sudah berjalan disebut berjalan. Yang masih rencana disebut rencana.' },
          { title: 'Presisi', text: 'Setiap keputusan, mulai dari kata sampai garis, harus punya alasan.' },
          { title: 'Independen', text: 'Identitas, bahasa, dan arah produk dibangun sendiri, bukan meniru brand lain.' },
          { title: 'Bertahap', text: 'Membangun sedikit demi sedikit, menguji setiap langkah, lalu melanjutkan.' },
          { title: 'Hemat sejak awal', text: 'Memulai tanpa biaya infrastruktur selama memungkinkan, lalu berinvestasi saat kebutuhannya terbukti.' },
          { title: 'Indonesia lebih dulu', text: 'Bahasa Indonesia adalah bahasa utama situs ini. Bahasa Inggris tersedia untuk jangkauan global.' },
        ],
      },
      not: {
        label: 'Batas klaim',
        title: 'Hal yang tidak kami klaim.',
        items: [
          'Kami tidak mengklaim memiliki pelanggan, mitra, atau testimoni.',
          'Kami tidak mengklaim angka pengguna, pendapatan, atau kinerja.',
          'Kami tidak mengklaim merek AVERLYNT sudah terdaftar atau sudah melalui pemeriksaan hukum.',
          'Kami tidak mengklaim kepatuhan terhadap standar atau regulasi tertentu.',
        ],
      },
      brand: {
        label: 'Aset brand',
        title: 'Logo AVERLYNT.',
        intro: 'Simbol AVERLYNT adalah huruf A berbentuk kerangka, dengan garis rute yang berakhir pada satu titik sinyal.',
        download: 'Unduh SVG',
        note: 'Nama dan logo AVERLYNT belum didaftarkan sebagai merek dan belum melalui pemeriksaan hukum. Panduan penggunaan lengkap tersedia di berkas DESIGN.md pada repositori.',
        assets: {
          symbol: 'Simbol AVERLYNT',
          horizontal: 'Logo horizontal untuk latar gelap',
          stacked: 'Logo bertumpuk untuk latar gelap',
          horizontalLight: 'Logo horizontal untuk latar terang',
        },
      },
    },

    contact: {
      title: 'Kontak',
      description: 'Cara menghubungi AVERLYNT saat ini. Satu jalur kontak sudah aktif melalui GitHub, sedangkan email resmi dan formulir kontak masih direncanakan.',
      eyebrow: 'Kontak',
      h1: 'Hubungi AVERLYNT.',
      lede: 'Kami sedang memvalidasi produk pertama. Cerita tentang kebutuhan Anda adalah masukan yang paling berharga saat ini.',
      channels: {
        label: 'Jalur kontak',
        title: 'Jalur yang tersedia saat ini.',
        intro: 'Hanya satu jalur yang sudah aktif. Jalur lain kami tampilkan apa adanya agar jelas statusnya.',
        cta: 'Buka GitHub Issues',
        items: [
          { title: 'GitHub Issues', text: 'Tulis pertanyaan atau kebutuhan Anda sebagai issue di repositori AVERLYNT. Diperlukan akun GitHub, dan isi issue dapat dibaca publik.', status: 'live' },
          { title: 'Email resmi', text: 'Alamat email resmi belum ditetapkan. Kami tidak menampilkan alamat yang belum dipantau.', status: 'planned' },
          { title: 'Formulir kontak', text: 'Formulir belum ditetapkan karena penyimpanan dan pengiriman pesannya belum dibangun. Kami tidak memasang formulir yang tidak mengirim apa pun.', status: 'planned' },
        ],
      },
      notice: 'GitHub Issues bersifat publik. Jangan menuliskan data pribadi, kata sandi, atau informasi rahasia bisnis di sana.',
      prepare: {
        label: 'Sebelum menghubungi',
        title: 'Informasi yang membantu kami memahami kebutuhan Anda.',
        items: [
          'Masalah yang ingin diselesaikan, dalam satu atau dua kalimat.',
          'Siapa yang mengalaminya dan seberapa sering.',
          'Cara Anda menanganinya saat ini.',
          'Hasil yang Anda harapkan jika masalah itu teratasi.',
        ],
      },
    },

    account: {
      title: 'Akun',
      description: 'Masuk atau buat akun AVERLYNT. Autentikasi dikelola oleh Clerk, dan akun saat ini hanya menyimpan identitas dasar tanpa fitur produk.',
      eyebrow: 'Akun',
      h1: 'Akun AVERLYNT.',
      lede: 'Akun adalah fondasi untuk produk yang akan datang. Saat ini akun hanya berfungsi untuk masuk dan mengelola identitas dasar Anda.',
      loading: 'Memeriksa sesi…',
      signedOut: {
        title: 'Masuk atau buat akun',
        text: 'Proses masuk berlangsung di halaman aman yang dikelola Clerk pada accounts.averlynt.biz.id. Setelah selesai, Anda kembali ke halaman ini.',
        signIn: 'Masuk',
        signUp: 'Buat akun',
      },
      signedIn: {
        title: 'Anda sudah masuk',
        name: 'Nama',
        email: 'Email',
        session: 'Sesi',
        checking: 'Memverifikasi di server…',
        verified: 'Terverifikasi oleh server',
        unverified: 'Belum dapat diverifikasi oleh server',
        manage: 'Kelola akun',
        signOut: 'Keluar',
        note: 'Belum ada fitur produk, langganan, atau pembayaran yang terhubung dengan akun ini.',
      },
      unavailable: {
        title: 'Masuk hanya tersedia di domain utama',
        text: 'Halaman ini dibuka dari alamat pratinjau. Autentikasi hanya aktif di averlynt.biz.id.',
        cta: 'Buka di averlynt.biz.id',
      },
      error: {
        title: 'Layanan masuk tidak dapat dimuat',
        text: 'Periksa koneksi Anda, lalu muat ulang halaman ini. Jika masalah berlanjut, hubungi kami melalui halaman Kontak.',
      },
      notice: 'Data akun disimpan oleh Clerk sebagai penyedia autentikasi. Rinciannya dijelaskan dalam draf Kebijakan Privasi.',
    },

    legal: {
      eyebrow: 'Legal',
      updated: 'Terakhir diperbarui 26 November 2026.',
      draft: 'Dokumen ini berstatus draf. Isinya menggambarkan praktik situs saat ini, belum ditinjau oleh penasihat hukum, dan bukan pernyataan kepatuhan terhadap peraturan apa pun.',
    },

    privacy: {
      title: 'Kebijakan Privasi',
      description: 'Draf Kebijakan Privasi AVERLYNT: data yang diproses situs ini, penyedia layanan yang terlibat, dan batasan dokumen yang masih berstatus draf.',
      h1: 'Kebijakan Privasi',
      lede: 'Penjelasan singkat tentang data yang diproses saat Anda menggunakan situs ini.',
      sections: [
        {
          title: 'Ruang lingkup',
          paragraphs: ['Dokumen ini berlaku untuk situs averlynt.biz.id. Situs ini berisi informasi brand dan layanan masuk akun. Belum ada produk berbayar.'],
        },
        {
          title: 'Data yang diproses',
          paragraphs: [
            'Jika Anda hanya membaca situs, kami tidak meminta data pribadi. Situs ini tidak memasang pelacak iklan maupun perangkat analitik pihak ketiga, dan huruf dimuat dari server situs ini sendiri.',
            'Jika Anda membuat akun atau masuk, penyedia autentikasi kami memproses data identitas dasar seperti nama, alamat email, dan foto profil dari metode masuk yang Anda pilih.',
          ],
        },
        {
          title: 'Kuki',
          paragraphs: ['Situs ini hanya menggunakan kuki yang diperlukan untuk menjaga sesi masuk. Kuki tersebut dipasang oleh layanan autentikasi saat Anda masuk.'],
        },
        {
          title: 'Penyedia layanan',
          paragraphs: [
            'Situs ini di-hosting di Cloudflare, yang dapat mencatat data teknis seperti alamat IP untuk keperluan pengiriman konten dan keamanan.',
            'Autentikasi dikelola oleh Clerk. Data akun Anda disimpan di sistem Clerk dan tunduk pada kebijakan privasi mereka.',
            'Jika Anda menghubungi kami melalui GitHub Issues, data Anda diproses oleh GitHub sesuai kebijakan mereka.',
          ],
        },
        {
          title: 'Hak Anda',
          paragraphs: ['Anda dapat meminta penghapusan akun melalui halaman Kontak. Karena dokumen ini masih draf, prosedur resmi untuk permintaan data belum ditetapkan.'],
        },
        {
          title: 'Perubahan',
          paragraphs: ['Dokumen ini akan diperbarui saat produk atau cara pemrosesan data berubah. Tanggal pembaruan tercantum di bagian atas halaman.'],
        },
      ],
    },

    terms: {
      title: 'Ketentuan Layanan',
      description: 'Draf Ketentuan Layanan AVERLYNT: status situs, penggunaan akun, kekayaan intelektual, dan batasan tanggung jawab pada tahap awal ini.',
      h1: 'Ketentuan Layanan',
      lede: 'Ketentuan dasar penggunaan situs ini pada tahap awal.',
      sections: [
        {
          title: 'Status layanan',
          paragraphs: ['Situs ini adalah fondasi brand AVERLYNT. Belum ada produk atau layanan berbayar yang ditawarkan, sehingga belum ada perjanjian komersial yang timbul dari penggunaan situs ini.'],
        },
        {
          title: 'Penggunaan situs',
          paragraphs: ['Anda dapat membaca dan membagikan konten situs ini. Anda tidak boleh menggunakannya untuk tujuan melanggar hukum atau mencoba mengganggu operasinya.'],
        },
        {
          title: 'Akun',
          paragraphs: ['Anda bertanggung jawab menjaga keamanan metode masuk Anda. Akun saat ini tidak memberikan akses ke fitur produk apa pun, dan kami dapat mengubah atau menghentikan layanan akun selama tahap awal ini.'],
        },
        {
          title: 'Kekayaan intelektual',
          paragraphs: ['Nama, logo, dan konten AVERLYNT adalah milik pengelola AVERLYNT. Nama dan logo belum didaftarkan sebagai merek. Huruf yang digunakan berlisensi SIL Open Font License.'],
        },
        {
          title: 'Tanpa jaminan',
          paragraphs: ['Informasi di situs ini disediakan apa adanya dan menggambarkan arah pengembangan. Informasi tersebut bukan janji ketersediaan fitur, jadwal, maupun hasil tertentu.'],
        },
        {
          title: 'Perubahan',
          paragraphs: ['Ketentuan ini akan diperbarui sebelum produk pertama diluncurkan. Tanggal pembaruan tercantum di bagian atas halaman.'],
        },
      ],
    },

    notFound: {
      label: 'Halaman tidak ditemukan',
      title: 'Halaman tidak ditemukan',
      text: 'Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.',
      cta: 'Kembali ke beranda',
    },
  },
};
