import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '16px 32px',
    background: theme.palette.background.paper,
    minHeight: '100vh',
    paddingBottom: 32,
  },
  title: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  card: {
    padding: 16,
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const faqsData = [
  {
    id: '1',
    question: 'Sahabatkebaikan.org ini apaan sih?',
    answer: `<p>SahabatKebaikan.org adalah website yang digagas oleh Bhakti Aditya, Arwan Khoiruddin, dan Yeni Nurjanah&nbsp;yang&nbsp; bergerak di bidang penggalangan dana donasi (<em>Digital Crowdfunding</em>), training, dan pendampingan terhadap lembaga atau stakeholder secara profesional.</p>

    <p>SahabatKebaikan.org dikelola badan hukum Yayasan BaitulMaalKu yang kegiatanya dilaksanakan berdasarkan UU Nomor 9 Tahun 1961 tentang Pengumpulan Uang atau Barang, PP Nomor 29 Tahun 1980 tentang Pelaksanaan Pengumpulan Sumbangan , Keputusan Menteri Sosial Republik Indonesia Nomor 56/HUK/1996 tentang Pengumpulan Uang oleh Masyarakat.</p>
    
    <p>Selain itu juga, SahabatKebaikan.org dilaksanakan berdasarkan UU Nomor 23 Tahun 2011 tentang Pengelolaan Zakat, PP Nomor 14 Tahun 2014 tentang Pelaksanaan UU Pengelolaan Zakat.</p>
    `,
    opened: false,
  },
  {
    id: '2',
    question:
      'Apakah Kegiatan Penggalangan Dana sahabatkebaikan.org Memiliki Izin?',
    answer: `<p>Yayasan BMKu dengan LAZ BaitulMaalKu sudah mendapatkan rekomendasi BAZNAS dan Izin Operasional berdasarkan SK yang diterbitkan Kementerian Agama No. 1676 tahun 2019. BMKu juga sudah mendapatkan surat rekomendasi dari MUI untuk dapat berkontribusi lebih luas bagi masyarakat dan rakyat Indonesia.</p>`,
    opened: false,
  },
  {
    id: '3',
    question: 'Apa Prinsip Penggalangan Dana di sahabatkebaikan.org?',
    answer: `Transparansi, Akuntabilitas, Partisipasi, Pendampingan, Berkelanjutan, dan Kemandirian.`,
    opened: false,
  },
  {
    id: '4',
    question: 'Bagaimana cara kerja SahabatKebaikan.org?',
    answer: `<p>SahabatKebaikan.org mempertemukan antara donatur dengan penerima manfaat melalui website, mengembangkan proyek-proyek sosial melalui lembaga mitra profesional maupun partner lapangan yang terlatih di berbagai wilayah di Indonesia, serta memfasilitasi fundraiser untuk meggalang dana secara luas melalui SahabatKebaikan.org.</p>`,
    opened: false,
  },
  {
    id: '5',
    question:
      'Dana donasi yang terkumpul disimpan di rekening atas nama siapa?',
    answer: `<p>Dana donasi yang terkumpul terlebih dahulu ditampung di rekening Bank Syariah Mandiri nomor 7128975677 a.n Yayasan BaitulMaalKu.</p>`,
    opened: false,
  },
  {
    id: '6',
    question:
      'Apakah Kegiatan Penggalangan Dana sahabatkebaikan.org Memiliki Izin?',
    answer: `<p>Yayasan BMKu dengan LAZ BaitulMaalKu sudah mendapatkan rekomendasi BAZNAS dan Izin Operasional berdasarkan SK yang diterbitkan Kementerian Agama No. 1676 tahun 2019. BMKu juga sudah mendapatkan surat rekomendasi dari MUI untuk dapat berkontribusi lebih luas bagi masyarakat dan rakyat Indonesia.</p>`,
    opened: false,
  },
  {
    id: '7',
    question: 'Bagaimana cara pencairan donasi yang sudah terkumpul?',
    answer: `<p>Kamu para penggalang dana dapat melakukan pencairan donasi yang berhasil terkumpul sesuai tenggat waktu yang telah Kamu tentukan. Proses pencairan dana diproses setelah diajukan oleh penggalang dana dan dilakukan setiap pekan pada hari yang telah ditetapkan oleh SahabatKebaikan.org. Pencairan donasi hanya dilakukan terhadap akun yang sudah terverifikasi oleh SahabatKebaikan.org.</p>`,
    opened: false,
  },
  {
    id: '8',
    question: 'Syarat Pencairannya gimana?',
    answer: `<p>Syarat pencairan donasi Lembaga Mitra Profesional dengan melampirkan dokumen melalui&nbsp;admin@SahabatKebaikan.org:</p>

    <ul>
      <li>Akta Pendirian;</li>
      <li>SK Kemenkumham;</li>
      <li>NPWP Badan;</li>
      <li>Keterangan Domisili;</li>
      <li>Tanda Daftar Yayasan;</li>
      <li>Izin Operasional (apabila ada);</li>
      <li>KTP Ketua Yayasan + Foto Selfie;</li>
      <li>Rekening a.n Yayasan.</li>
    </ul>
    
    <p>Syarat pencairan donasi individu dengan&nbsp;<em>mengupload</em>&nbsp;dan melampirkan dokumen melalui fitur unggah SahabatKebaikan.org:</p>
    
    <ul>
      <li>KTP + Foto Selfie (berlaku juga untuk penerima manfaat yang diwakilkan oleh wali);</li>
      <li>Surat Kuasa apabila diwakilkan;</li>
      <li>Rekening a.n penerima manfaat atau wali.</li>
    </ul>
    `,
    opened: false,
  },
  {
    id: '9',
    question:
      'Program penggalangan dana jenis apa saja yang bisa saya lakukan?',
    answer: `<p>Kamu dapat melakukan penggalangan dana untuk program yang berhubungan dengan zakat, wakaf, qurban, pendidikan, kesehatan, kemanusiaan, proyek-proyek sosial dan tidak bertentangan dengan undang-undang yang berlaku di Negara Kesatuan Republik Indonesia.</p>

    <p>Selain itu, secara khusus, Kamu bisa menggalang dana untuk mendukung pengembangan usaha kecil di berbagai wilayah di Indonesia.</p>
    `,
    opened: false,
  },
  {
    id: '10',
    question: 'Bagaimana cara menggalang dana di SahabatKebaikan.org?',
    answer: `<p><em>Platform</em>&nbsp;SahabatKebaikan.org hanya memberikan akses penggalangan dana kepada lembaga mitra profesional dan partner lapangan terlatih. Hal ini dilakukan untuk menegakkan prinsip-prinsip yang telah ditetapkan oleh SahabatKebaikan.org (baca di QnA soal Prinsip SahabatKebaikan.org). Jika lembagamu atau kamu sendiri ingin terlibat dalam aktifitas kebaikan dengan menggalang dana di platform kami, berikut langkah-langkahnya :</p>
  
      <ol>
        <li>Kunjungi platform SahabatKebaikan.org.</li>
        <li>Registrasi akun pada menu login kemudian &ldquo;register now&rdquo;</li>
        <li>Masukkan username, email dan password, lalu submit</li>
        <li>Setelah kamu masuk, akan ada menu baru, yaitu pendaftaran. Arahkan mouse ke arah menu &ldquo;Pendaftaran&rdquo;, lalu klik pada mitra.</li>
        <li>Isi semua field yang ada.&nbsp;</li>
        <li>Bila akun sudah diverifikasi oleh admin sahabatkebaikan.org, maka kami akan memberitahu melalui email atau telefon atau whatsapp pada kontak penanggung jawab.</li>
        <li>Setelah verifikasi lanjutan dilaksanakan dan kamu atau lembagamu berhasil lolos sebagai partner lapangan atau lembaga mitra, maka selanjutnya kamu dapat melakukan penggalangan dana dan akan ada training untuk melakukannya melalui google classroom.</li>
        <li>Sebagai campaigner, maka ketika membuka sahabatkebaikan.org dan login, maka kamu akan mendapatkan sebuah menu baru yaitu dashboard. Dashboard ini akan berisi menu-menu yang bisa digunakan dalam mengatur campaign kamu.</li>
        <li>Untuk membuat campaign, klik dashboard lalu klik tombol &ldquo;buat campaign baru&rdquo;. Kemudian isi&nbsp;<em>form</em>&nbsp;penggalangan dana meliputi menentukan program, target dana, batas waktu penggalangan dana, dan judul kampanye.</li>
        <li>Mengisi deskripsi konten meliputi teks, foto atau video.</li>
        <li>Setiap penggalangan dana yang dibuat akan dimoderasi oleh team SahabatKebaikan.org</li>
        <li>Team SahabatKebaikan.org akan melakukan kurasi dan menghubungi Kamu dalam kaitannya penggalangan dana tersebut</li>
        <li>jika proses moderasi dan kurasi selesai, maka penggalangan dana kamu sudah bisa dilihat di&nbsp;<a href="https://www.benihbaik.com/">https://www.SahabatKebaikan.org</a></li>
      </ol>
      
      <p>Kamu dapat melakukan penggalangan dana donasi dengan memilih tenggat waktu 30 hari, 60 hari, dan 90 hari, atau tidak berbatas waktu. Limit penggalangan dana donasi dibatasi sesuai kebutuhan penerima manfaat dan tergantung dari nilai proyek sosial yang disusun oleh mitra lembaga atau partner lapangan serta pertimbangan dari tim SahabatKebaikan.org.</p>
      `,
    opened: false,
  },
  {
    id: '11',
    question: 'Bagaimana cara saya berdonasi?',
    answer: `<ol>
      <li>Kunjungi platform SahabatKebaikan.org;</li>
      <li>Pilih program penggalangan dana yang tayang di&nbsp;<em>homepage</em>;</li>
      <li>Masukkan nilai donasi yang kamu kehendaki;</li>
      <li>Klik donasi sekarang;</li>
      <li>Pilih metode pembayaran yang sudah bekerjasama dengan SahabatKebaikan.org;</li>
      <li>Anda dapat menyertakan nama atau tanpa nama (<em>anonymous</em>);</li>
      <li>Klik donasi sekarang.</li>
      <li>Ikuti instruksi yang diberikan</li>
    </ol>
    `,
    opened: false,
  },
  {
    id: '12',
    question:
      'Metode pembayaran apa saja yang dapat Anda gunakan untuk berdonasi?',
    answer: `<p>Melalui kerjasama sistem elektronik SahabatKebaikan.org telah terintegrasi dengan Mitra Bank (&ldquo;Transfer Antar Bank&rdquo; atau &ldquo;<em>Virtual Account</em>&rdquo;) dan Perusahaam Sistem Pembayaran Non Bank (&ldquo;Dompet Elektronik&rdquo;) sebagai&nbsp;<em>channel</em>&nbsp;pembayaran donasi bagi Donatur, yaitu:</p>

    <ul>
      <li>Bank Syariah Mandiri 7128975677;</li>
      <li>Mitra Perusahaan&nbsp;<em>Payment Gateway, yaitu&nbsp;</em>iPay88, diantaranya : Virtual Account, OVO, DANA, LinkAja, dll (sementara yang diaktifkan hanya Virtual Account)</li>
    </ul>
    `,
    opened: false,
  },
  {
    id: '13',
    question: 'Apakah ada biaya yang dikenakan atas program penggalangan dana?',
    answer: `<p><strong>Biaya Operasional</strong></p>

    <p>SahabatKebaikan.org akan mengambil 5% (lima persen) setiap dana donasi yang berhasil terkumpul untuk satu kampanye penggalangan dana.<strong><em>&nbsp;Kecuali kampanye jenis Zakat dan Yatim, SahabatKebaikan.org tidak mengambil biaya operasional terhadap program tersebut.</em></strong></p>
    
    <p><strong>Biaya Admin Mitra Pembayaran</strong>:</p>
    
    <ul>
      <li>Virtual Account: Rp. 5.000,-;</li>
    </ul>
    `,
    opened: false,
  },
  {
    id: '14',
    question: 'Dalam kondisi apa saja dana donasi dialihkan?',
    answer: `<p>SahabatKebaikan.org sewaktu-waktu akan mengalihkan dana donasi baik melibatkan atau tanpa kesepakatan, apabila ditemukan kondisi-kondisi sebagai berikut:</p>

    <ul>
      <li>Penerima manfaat meninggal dunia; akan dialihkan kepada kampanye yang serupa setelah biaya tunggakan/hutang penerima manfaat tertunaikan.</li>
      <li>Dana donasi yang terkumpul melebihi target yang dibutuhkan;</li>
      <li>Dana donasi yang digunakan masih tersisa;</li>
      <li>Dan donasi terindikasi dan terbukti secara hukum merupakan hasil dari tindak pidana pencucian uang atau tindak pidana kriminal lainnya</li>
    </ul>
    `,
    opened: false,
  },
  {
    id: '15',
    question:
      'Apakah saya ada kewajiban untuk membuat laporan penggunaan donasi?',
    answer: `Sebagai transparansi dan pertanggungjawaban kepada publik, donatur, dan Kementerian Sosial RI, Anda diwajibkan menyampaikan update aktivitas penggunaan donasi melalui fitur yang sudah tersedia di SahabatKebaikan.org.    `,
    opened: false,
  },
];

const FaqScreen = () => {
  const classes = useStyles();
  const [faqs, setFaqs] = useState(faqsData);

  const handleOpenClose = (id) => {
    const index = faqs.findIndex((faq) => faq.id === id);

    console.log('index', index);

    const newFaqs = [...faqs];
    newFaqs[index] = {
      ...newFaqs[index],
      opened: !newFaqs[index].opened,
    };

    console.log('newFaqs', newFaqs[index]);

    setFaqs(newFaqs);
  };

  return (
    <Box className={classes.root}>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {faqs.map((faq) => (
          <div key={faq.id}>
            <ListItem button onClick={() => handleOpenClose(faq.id)}>
              <ListItemText primary={faq.question} />
              {faq.opened ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq.opened} timeout="auto" unmountOnExit>
              <Box pl={2} pr={2}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: faq.answer,
                  }}
                />
              </Box>
            </Collapse>
            <Divider variant="middle" />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default FaqScreen;
