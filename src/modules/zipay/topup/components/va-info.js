/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const VAInfo = ({ state = { va_number: '8577085713470777' } }) => {
  const [copied, setCopied] = useState(false);

  const [transferMethods, setTransferMethod] = useState([]);

  const handleOpenClose = (id) => {
    const index = transferMethods.findIndex(
      (transferMethod) => transferMethod.id === id
    );

    const newTransferMethod = [...transferMethods];
    newTransferMethod[index] = {
      ...newTransferMethod[index],
      opened: !newTransferMethod[index].opened,
    };

    setTransferMethod(newTransferMethod);
  };

  useState(() => {
    let selectedTransferMethod = transferMethodList.find(
      (method) => method.bank_name === state.bank_name
    );

    setTransferMethod(
      selectedTransferMethod.methods.map((method) => ({
        ...method,
        opened: false,
      }))
    );
  }, []);

  return (
    <DialogContent dividers style={{ padding: '16px 0' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={1}
        style={{ marginBottom: 16 }}
      >
        <Grid item>
          <Typography variant="body2">{state.bank_name} VA Number</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="secondary">
            {state.va_number}
          </Typography>
        </Grid>
        <Grid item>
          <CopyToClipboard
            text={state.va_number}
            onCopy={() => {
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {!copied ? (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{ padding: '2px 24px' }}
              >
                Copy
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ padding: '2px 24px' }}
              >
                Copied to clipboard
              </Button>
            )}
          </CopyToClipboard>
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Typography variant="caption" color="textSecondary">
            Minimum topup Rp 10.000
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Maksimum topup Rp 10.000.000
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Typography
        variant="body1"
        color="textPrimary"
        style={{ fontWeight: 600, padding: '0 16px', marginTop: 16 }}
      >
        Instruksi pembayaran
      </Typography>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {transferMethods.map((transferMethod) => (
          <div key={transferMethod.id}>
            <ListItem button onClick={() => handleOpenClose(transferMethod.id)}>
              <ListItemText primary={transferMethod.name} />
              {transferMethod.opened ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={transferMethod.opened} timeout="auto" unmountOnExit>
              <Box pl={2} pr={2}>
                <div
                  style={{ maxWidth: 446 }}
                  dangerouslySetInnerHTML={{
                    __html: transferMethod.instructions,
                  }}
                />
              </Box>
            </Collapse>
            <Divider variant="middle" />
          </div>
        ))}
      </List>
    </DialogContent>
  );
};

VAInfo.propTypes = {
  state: PropTypes.object,
  handleNext: PropTypes.func,
  setState: PropTypes.func,
};

export default VAInfo;

const transferMethodList = [
  {
    id: '1',
    bank_name: 'Bank Mandiri',
    methods: [
      {
        id: '1',
        name: 'ATM Mandiri',
        instructions: `<ol>
        <li>Masukkan kartu ATM dan PIN Anda</li>
        <li>Pilih Menu Bayar/Beli</li>
        <li>Pilih Lainnya</li>
        <li>Pilih Multi Payment</li>
        <li>Input 70014 sebagai Kode Institusi</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Pilih Benar</li>
        <li>Pilih Ya</li>
        <li>Pilih Ya</li>
        <li>Ambil bukti bayar Anda</li>
        <li>Selesai</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Mandiri Internet Banking',
        instructions: `<ol>
        <li>Login Mobile Banking</li>
        <li>Pilih Bayar</li>
        <li>Pilih Multi Payment</li>
        <li>Input Transferpay sebagai Penyedia Jasa</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Pilih IDR</li>
        <li>Pilih Lanjutkan</li>
        <li>Bukti bayar diampilkan</li>
        <li>Selesai</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Mandiri  mBanking',
        instructions: `<ol>
        <li>Login Mobile Banking</li>
        <li>Pilih Bayar</li>
        <li>Pilih Multi Payment</li>
        <li>Input Transferpay sebagai Penyedia Jasa</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Pilih Lanjut</li>
        <li>Input OTP dan PIN</li>
        <li>Pilih OK</li>
        <li>Bukti bayar diampilkan</li>
        <li>Selesai</li>
        </ol>`,
      },
    ],
  },

  {
    id: '2',
    bank_name: 'Bank International Indonesia Maybank',
    methods: [
      {
        id: '1',
        name: 'Aplikasi M2U',
        instructions: `<ol>
        <li>Login Aplikasi M2U menggunakan fingerprint atau password</li>
        <li>Pilih Transfer</li>
        <li>Pilih Virtual Acccount</li>
        <li>Pilih Pilih Sumber Tabungan</li>
        <li>Masukkan Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Masukkan jumlah transfer, Klik Proses</li>
        <li>Klik Konfirmasi dan Minta TAC</li>
        <li>Masukkan SMS Token/TAC</li>
        <li>Klik OK</li>
        <li>Transaksi Selesai</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Maybank ATM',
        instructions: `<ol>
        <li>Masukkan kartu ATM dan PIN Anda</li>
        <li>Pilih Menu Transfer</li>
        <li>Pilih Virtual Account</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Pilih Benar</li>
        <li>Pilih Ya</li>
        <li>Ambil bukti bayar Anda</li>
        <li>Transaksi Selesai</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Maybank Internet Banking',
        instructions: `<ol>
        <li>Login Internet Banking</li>
        <li>Pilih Rekening dan Transaksi</li>
        <li>Pilih Maybank Virtual Account</li>
        <li>Pilih Sumber Tabungan</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Input Nominal, misal 20000</li>
        <li>Klik Submit</li>
        <li>Input SMS Token</li>
        <li>Bukti bayar ditampilkan</li>
        <li>Selesai</li>
        </ol>`,
      },
      {
        id: '4',
        name: 'Maybank SMS Banking',
        instructions: `<ol>
        <li>Klik App Maybank SMS Banking</li>
        <li>Input Passcode (jika ada)</li>
        <li>Pilih Media Koneksi: SMS, USSD, atau Data (lihat indikator koneksi pada pojok kanan atas)</li>
        <li>Pada Menu Utama, klik icon Transfer</li>
        <li>Pilih Virtual Account</li>
        <li>Pada kolom Rekening Sumber, masukkan rekening sumber (pada media koneksi USSD tidak diperlukan)</li>
        <li>Pada kolom Jumlah, masukkan jumlah yang akan dibayarkan</li>
        <li>pada kolom No Ref/Berita, masukkan No Ref/Berita</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Klik tombol Kirim</li>
        <li>Masukkan PIN yang dikirimkan melalui SMS</li>
        <li>Selesai</li>
        </ol>`,
      },
    ],
  },

  {
    id: '3',
    bank_name: 'Bank Permata',
    methods: [
      {
        id: '1',
        name: 'ATM Permata',
        instructions: `<ol>
        <li>Masukkan kartu ATM dan PIN Anda</li>
        <li>Di menu utama, pilih Transaksi Lainnya</li>
        <li>Pilih Pembayaran</li>
        <li>Pilih Pembayaran Lainnya</li>
        <li>Pilih Virtual Account</li>
        <li>Masukkan 16 digit no Virtual Account dan tekan Benar</li>
        <li>Di halaman konfirmasi transfer akan muncul jumlah yan dibayarkan, no Virtual Account, dan nama toko. Jika informasinya telah cocok, tekan Benar</li>
        <li>Pilih rekening pembayaran Anda dan tekan Benar.</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Permata Internet Banking',
        instructions: `<ol>
        <li>Login Internet Banking kemudian pilih Menu Pembayaran</li>
        <li>Lalu pilih sub menu Pembyaran Tagihan dan klik Virtual Account</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Input jumlah total tagihan pada kolom Total Pembayaran. Kemudian klik Submit</li>
        <li>Input kode yang telah dikirimkan melalui SMS</li>
        <li>Selesai</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Permata  Mobile Banking',
        instructions: `<ol>
        <li>Silahkan login mobile banking yang dimiliki Permata Bank</li>
        <li>Lalu klik Menu Pembayaran Tagihan dan pilih Menu Virtual Account</li>
        <li>Kemudian pilih Tagihan Anda dan pilih Daftar Tagihan Baru</li>
        <li>Masukkan nomor rekening dengan nomor Virtual Account Anda (contoh: 7810202001539202) sebagai Nomor Tagihan. Apabila selesai silahkan klik Konfirmasi</li>
        <li>Masukkan Nama Pengingat setelah itu klik Lanjut. Apabila selesai silahkan klik Konfirmasi</li>
        <li>Masukkan jumlah nominal tagihan sesuai dengan invoice. Apabila selesai silahkan klik Konfirmasi</li>
        <li>Masukkan Response Code dan klik Konfirmasi apabila telah selesai</li>
        <li>Proses transfer telah selesai</li>
        </ol>`,
      },
    ],
  },
  {
    id: '4',
    bank_name: 'Bank Permata Syariah',
    methods: [
      {
        id: '1',
        name: 'ATM Permata',
        instructions: `<ol>
        <li>Masukkan kartu ATM dan PIN Anda</li>
        <li>Di menu utama, pilih Transaksi Lainnya</li>
        <li>Pilih Pembayaran</li>
        <li>Pilih Pembayaran Lainnya</li>
        <li>Pilih Virtual Account</li>
        <li>Masukkan 16 digit no Virtual Account dan tekan Benar</li>
        <li>Di halaman konfirmasi transfer akan muncul jumlah yan dibayarkan, no Virtual Account, dan nama toko. Jika informasinya telah cocok, tekan Benar</li>
        <li>Pilih rekening pembayaran Anda dan tekan Benar.</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Permata Internet Banking',
        instructions: `<ol>
        <li>Login Internet Banking kemudian pilih Menu Pembayaran</li>
        <li>Lalu pilih sub menu Pembyaran Tagihan dan klik Virtual Account</li>
        <li>Input Virtual Account Number di atas, misal 70014XXXXXXXXXXX</li>
        <li>Input jumlah total tagihan pada kolom Total Pembayaran. Kemudian klik Submit</li>
        <li>Input kode yang telah dikirimkan melalui SMS</li>
        <li>Selesai</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Permata  Mobile Banking',
        instructions: `<ol>
        <li>Silahkan login mobile banking yang dimiliki Permata Bank</li>
        <li>Lalu klik Menu Pembayaran Tagihan dan pilih Menu Virtual Account</li>
        <li>Kemudian pilih Tagihan Anda dan pilih Daftar Tagihan Baru</li>
        <li>Masukkan nomor rekening dengan nomor Virtual Account Anda (contoh: 7810202001539202) sebagai Nomor Tagihan. Apabila selesai silahkan klik Konfirmasi</li>
        <li>Masukkan Nama Pengingat setelah itu klik Lanjut. Apabila selesai silahkan klik Konfirmasi</li>
        <li>Masukkan jumlah nominal tagihan sesuai dengan invoice. Apabila selesai silahkan klik Konfirmasi</li>
        <li>Masukkan Response Code dan klik Konfirmasi apabila telah selesai</li>
        <li>Proses transfer telah selesai</li>
        </ol>`,
      },
    ],
  },

  {
    id: '5',
    bank_name: 'Bank Central Asia',
    methods: [
      {
        id: '1',
        name: 'ATM BCA',
        instructions: `<ol>
        <li>Masukkan kartu ATM BCA &amp; PIN.</li>
        <li>Pilih menu TRANSAKSI LAINNYA &gt; TRANSFER &gt; KE REKENING BCA VIRTUAL.</li>
        <li>Masukkan nomor Virtual Account yang ditampilkan sebelumnya. (3901085640276xxx)</li>
        <li>Masukkan jumlah Top Up yang ingin dibayarkan.</li>
        <li>Ikuti instruksi untuk menyelesaikan Transaksi.</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'BCA Internet Banking (Klik BCA)',
        instructions: `<ol>
        <li>Login ke website KLIKBCA .</li>
        <li>Pilih menu TRANSFER DANA &gt; TRANSFER KE BCA VIRTUAL ACCOUNT.</li>
        <li>Masukkan nomor Virtual Account yang ditampilkan sebelumnya. (3901085640276xxx)</li>
        <li>Masukkan jumlah Top Up yang ingin dibayarkan.</li>
        <li>Ikuti instruksi untuk menyelesaikan Transaksi.</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'BCA Mobile Banking (M-BCA)',
        instructions: `<ol>
        <li>Login ke aplikasi mobile mBCA.</li>
        <li>Pilih menu M-TRANSFER &gt; BCA VIRTUAL ACCOUNT.</li>
        <li>Masukkan nomor Virtual Account yang ditampilkan sebelumnya (3901085640276xxx)</li>
        <li>Masukkan jumlah Top Up yang ingin dibayarkan.</li>
        <li>Masukkan PIN m-BCA Anda.</li>
        <li>Ikuti instruksi untuk menyelesaikan Transaksi</li>
        </ol>`,
      },
      {
        id: '4',
        name: 'BCA SIM Tool Kit',
        instructions: `<ol>
        <li>Pilih menu m-BCA pada menu SIMCARD anda.</li>
        <li>Pilih menu m-PAYMENT &gt; LAINNYA.</li>
        <li>Ketik TVA lalu tekan OK.</li>
        <li>Masukkan nomor Virtual Account yang ditampilkan sebelumnya (3901085640276xxx)</li>
        <li>Masukkan BCA PIN Anda lalu tekan OK.</li>
        <li>Masukkan jumlah Top Up yang ingin dibayarkan.</li>
        <li>Masukkan BCA PIN Anda lalu tekan OK.</li>
        <li>Anda akan menerima SMS konfirmasi</li>
        </ol>`,
      },
    ],
  },

  {
    id: '6',
    bank_name: 'Bank Negara Indonesia',
    methods: [
      {
        id: '1',
        name: 'ATM BNI',
        instructions: `<ol>
        <li>Masukkan kartu ATM</li>
        <li>Pilih Bahasa</li>
        <li>Masukkan PIN</li>
        <li>Pilih MENU LAINNYA</li>
        <li>Pilih TRANSFER dan pilih jenis rekening yang akan digunakan (Contoh: "Dari Rekening Tabungan")</li>
        <li>Pilih Virtual Account Billing. Masukkan nomor Virtual Account Anda</li>
        <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</li>
        <li>Konfirmasi, apabila telah sesuai, lanjutkan transaksi</li>
        <li>Transaksi Anda telah selesai.</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'BNI Mobile Banking',
        instructions: `<ol>
        <li>Akses BNI Mobile Banking melalui handphone.</li>
        <li>Masukkan User ID dan password.</li>
        <li>Pilih menu Transfer.</li>
        <li>Pilih menu Virtual Account Billing, lalu pilih rekening debet.</li>
        <li>Masukkan nomor Virtual Account Anda pada menu Input Baru.</li>
        <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.</li>
        <li>Konfirmasi transaksi dan masukkan Password Transaksi.</li>
        <li>Pembayaran Anda Telah Berhasil.</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'BNI iBank Personal',
        instructions: `<ol>
        <li>Akses ibank.bni.co.id kemudian klik Enter.</li>
        <li>Masukkan User ID dan password.</li>
        <li>Klik menu Transfer, lalu pilih Virtual Account Billing.</li>
        <li>Kemudian, masukan nomor Virtual Account Anda (Contoh: 8277087781881441) yang akan dibayarkan.</li>
        <li>Lalu pilih rekening debet yang akan digunakan. Kemudian tekan Lanjut.</li>
        <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.</li>
        <li>Masukkan Kode Otentikasi Token.</li>
        <li>Anda akan menerima notifikasi bahwa transaksi berhasil.</li>
        </ol>`,
      },
      {
        id: '4',
        name: 'BNI SMS Banking',
        instructions: `<ol>
        <li>Buka aplikasi SMS Banking BNI.</li>
        <li>Pilih menu Transfer.</li>
        <li>Pilih menu Transfer rekening BNI.</li>
        <li>Masukkan nomor rekening tujuan dengan 16 digit Nomor Virtual Account</li>
        <li>Masukkan nominal transfer sesuai tagihan. Nominal yang berbeda tidak dapat diproses.</li>
        <li>Pilih Proses, kemudian Setuju.</li>
        <li>Balas sms dengan mengetik pin sesuai dengan instruksi BNI. Anda akan menerima notif bahwa transaksi berhasil.</li>
        <li>Atau dapat juga langsung mengetik sms dengan format: TRF[SPASI]NomorVA[SPASI]NOMINAL dan kemudian kirim ke 3346. Contoh: TRF 1234567891011121 44000</li>
        </ol>`,
      },
      {
        id: '5',
        name: 'BNI ATM Bersama',
        instructions: `<ol>
        <li>Masukkan kartu ke mesin ATM Bersama.</li>
        <li>Pilih Transaksi Lainnya.</li>
        <li>Pilih menu Transfer.</li>
        <li>Pilih Transfer ke Bank Lain.</li>
        <li>Masukkan kode bank BNI (009) dan 16 Digit Nomor Virtual Account (Contoh: 1234567891011121).</li>
        <li>Masukkan nominal transfer sesuai tagihan Anda. Nominal yang berbeda tidak dapat diproses.</li>
        <li>Konfirmasi rincian Anda akan tampil pada layar.</li>
        <li>Jika sudah sesuai, klik 'Ya' untuk melanjutkan.</li>
        <li>Transaksi Anda telah berhasil.</li>
        </ol>`,
      },
    ],
  },

  {
    id: '7',
    bank_name: 'Bank KEB Hana Indonesia',
    methods: [
      {
        id: '1',
        name: 'ATM',
        instructions: `<ol>
        <li>Masukkan kartu ATM</li>
        <li>Pilih Bahasa</li>
        <li>Masukkan PIN</li>
        <li>Pilih MENU LAINNYA</li>
        <li>Pilih TRANSFER dan pilih jenis rekening yang akan digunakan (Contoh: "Dari Rekening Tabungan")</li>
        <li>Pilih Virtual Account Billing. Masukkan nomor Virtual Account Anda</li>
        <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</li>
        <li>Konfirmasi, apabila telah sesuai, lanjutkan transaksi</li>
        <li>Transaksi Anda telah selesai.</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Internet Banking',
        instructions: `<ol>
        <li>Login Internet Banking</li>
        <li>Pilih menu Transfer kemudian Pilih Withdrawal Account Information</li>
        <li>Pilih Account Number anda</li>
        <li>Input Nomor Virtual Account, misal. 9772XXXXXXXXXXXX</li>
        <li>Input Nominal, misal. 10000</li>
        <li>Click Submit</li>
        <li>Input SMS Pin</li>
        <li>Bukti bayar akan ditampilkan</li>
        <li>Selesai</li>
        </ol>`,
      },
    ],
  },
  {
    id: '8',
    bank_name: 'Bank Rakyat Indonesia',
    methods: [
      {
        id: '1',
        name: 'ATM BRI',
        instructions: `<ol>
        <li>Pilih menu Transaksi Lain, kemudian pilih menu Pembayaran</li>
        <li>Setelah itu klik Menu Lainnya, lalu pilih menu Briva</li>
        <li>Masukkan nomor rekening dengan nomor Virtual Account (88810085640276xxx) dan pilih Benar</li>
        <li>Ketika muncul konfirmasi pembayaran, silahkan pilih Ya</li>
        <li>Transaksi telah selesai dan silahkan ambil bukti pembayaran anda</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Internet Banking',
        instructions: `<ol>
        <li>Silahkan login Internet Banking, kemudian pilih Menu Pembayaran</li>
        <li>Lalu pilih menu Briva</li>
        <li>Masukkan nomor rekening dengan nomor Virtual Account (88810085640276xxx) kemudian klik Kirim</li>
        <li>Setelah itu, masukkan password serta mToken internet banking</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Mobile Banking',
        instructions: `<ol>
        <li>Silahkan login Mobile Banking, lalu pilih menu Pembayaran</li>
        <li>Setelah itu klik menu Briva</li>
        <li>Masukkan nomor rekening dengan nomor Virtual Account (88810085640276xxx)&nbsp;</li>
        <li>Lalu masukkan PIN Mobile Banking dan klik Kirim</li>
        <li>Transaksi sudah selesai. Bukti pembayaran anda akan dikirimkan melalui notifikasi SMS</li>
        </ol>`,
      },
    ],
  },
  {
    id: '9',
    bank_name: 'BANK CIMB NIAGA',
    methods: [
      {
        id: '1',
        name: 'ATM',
        instructions: `<ol>
        <li>Masukkan kartu ATM dan PIN anda</li>
        <li>Pilih TRANSFER &gt; Rekening CIMB Niaga/Rekening Ponsel Lain &gt; Rekening CIMB Niaga lain</li>
        <li>Masukkan jumlah top up yang ingin dibayarkan</li>
        <li>Masukkan (8059085640276xxx) sebagai rekening tujuan</li>
        <li>Pilih rekening sumber pembayaran</li>
        <li>Konfirmasi pembayaran anda</li>
        </ol>`,
      },
      {
        id: '2',
        name: 'Internet Banking (CIMB Click)',
        instructions: `<ol>
        <li>Login ke CIMB Clicks</li>
        <li>Pilih TRANSFER dan pilih rekening sumber pembayaran di bagian &ldquo;Transfer Dari&rdquo;</li>
        <li>Masukkan jumlah top up yang ingin dibayarkan</li>
        <li>Di bagian &ldquo;Transfer ke&rdquo;, pilih Akun Lainnya (CIMB Niaga/Rekening Ponsel), lalu tekan LANJUT</li>
        <li>Pilih Bank CIMB Niaga / Rekening Ponsel</li>
        <li>Masukkan (8059085640276xxx)&nbsp;sebagai rekening tujuan dan tekan LANJUT</li>
        <li>Masukkan 6 digit mPIN anda dan tekan SUBMIT</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Mobile Banking (Go Mobile)',
        instructions: `<ol>
        <li>Pilih TRANSFER lalu pilih Transfer ke Rekening CIMB Niaga Lainnya</li>
        <li>Pilih rekening sumber pembayaran</li>
        <li>Masukkan&nbsp;(8059085640276xxx)&nbsp;sebagai rekening tujuan</li>
        <li>Masukkan jumlah top up yang ingin dibayarkan lalu tekan LANJUT</li>
        <li>Konfirmasi pembayaran anda dan masukkan PIN Mobile Banking anda</li>
        </ol>`,
      },
      {
        id: '4',
        name: 'UMB',
        instructions: `<ol>
        <li>Dial *141*8#</li>
        <li>Pilih Transfer &gt; Rek CIMB Niaga lain</li>
        <li>Pilih Rekening CIMB Niaga</li>
        <li>Masukkan No Virtual Account</li>
        <li>Ikuti Instruksi selanjutnya</li>
        </ol>`,
      },
    ],
  },
  {
    id: '10',
    bank_name: 'BANK DANAMON INDONESIA',
    methods: [
      {
        id: '1',
        name: 'ATM DANAMON',
        instructions: `<ol>
        <li>Input&nbsp;<strong>PIN ATM&nbsp;</strong>Anda</li>
        <li>Pilih&nbsp;<strong>Menu Pembayaran</strong></li>
        <li>Pilih&nbsp;<strong>Virtual Account</strong></li>
        <li>Masukkan&nbsp;<strong>Nomor Virtual Account&nbsp;</strong>7915062300XXXXXX atau 79150623XXXXXXXX<strong><br /></strong></li>
        <li>Masukkan&nbsp;<strong>Nominal</strong></li>
        <li>Pada layar&nbsp;<strong>konfirmasi pembayaran</strong>, pastikan&nbsp;<strong>transaksi</strong>&nbsp;sudah benar</li>
        <li>Pilih&nbsp;<strong>Ya</strong>&nbsp;untuk memproses&nbsp;<strong>transaksi</strong></li>
        </ol>`,
      },
      {
        id: '2',
        name: 'ATM Lain',
        instructions: `<ol>
        <li>Masuk ke&nbsp;<strong>menu transfer</strong></li>
        <li>Pilih tujuan&nbsp;<strong>rekening Bank lain (Online Transfer)</strong></li>
        <li>Masukkan&nbsp;<strong>Kode Bank Danamon</strong>&nbsp;(011) +&nbsp;<strong>nomor Virtual Account&nbsp;</strong>7915062300XXXXXX atau 79150623XXXXXXXX</li>
        <li>Masukkan&nbsp;<strong>Nominal pembayaran</strong></li>
        <li>Pada layar&nbsp;<strong>konfirmasi pembayaran</strong>, harap pastikan nama tujuan dan nominal transaksi sudah tepat</li>
        <li><strong>Konfirmasi</strong>&nbsp;pembayaran</li>
        </ol>`,
      },
      {
        id: '3',
        name: 'Internet Banking',
        instructions: `<ol>
        <li>Masuk ke&nbsp;<strong>menu transfer</strong>&nbsp;ke bank lain</li>
        <li>Pilih&nbsp;<strong>transfer online</strong></li>
        <li>Pilih&nbsp;<strong>Bank tujuan</strong>,&nbsp;<strong>Bank Danamon</strong></li>
        <li>Masukkan&nbsp;&nbsp;<strong>nomor</strong>&nbsp;<strong>Virtual Account&nbsp;</strong>7915062300XXXXXX atau 79150623XXXXXXXX</li>
        <li>Masukkan&nbsp;<strong>Nominal pembayaran</strong></li>
        <li>Pada layar konfirmasi pembayaran, harap pastikan nama tujuan dan nominal transaksi sudah tepat</li>
        <li>Konfirmasi&nbsp;<strong>pembayaran</strong></li>
        </ol>`,
      },
      {
        id: '4',
        name: 'Mobile Banking (D-Mobile)',
        instructions: `<ol>
        <li><strong>Login</strong>&nbsp;pada Aplikasi&nbsp;<strong>D-Mobile</strong></li>
        <li>Pilih&nbsp;<strong>Virtual Account</strong></li>
        <li>Masukan&nbsp;<strong>Nomor Virtual Account&nbsp;</strong>7915062300XXXXXX atau 79150623XXXXXXXX<strong><br /></strong></li>
        <li>Masukkan&nbsp;<strong>Nominal</strong></li>
        <li>Pada layar&nbsp;<strong>konfirmasi pembayaran,</strong>&nbsp;pastikan transaksi sudah benar</li>
        <li>pilih&nbsp;<strong>Ya</strong>&nbsp;untuk memproses&nbsp;<strong>transaksi</strong></li>
        </ol>`,
      },
    ],
  },
];
