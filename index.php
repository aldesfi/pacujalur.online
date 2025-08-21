<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Undian Pacu Jalur Event Nasional Tepian Narosa | Kuantan Singingi</title>

  <!-- Meta SEO -->
  <meta name="description" content="Ikuti Undian Pacu Jalur Event Nasional Tepian Narosa, Kecamatan Kuantan Tengah, Kabupaten Kuantan Singingi. Acara budaya terbesar di Riau dengan tradisi balap jalur yang mendunia. Saksikan juga live streaming viral Pacu Jalur langsung dari Tepian Narosa. Link Nonton Live Streaming Festival Pacu Jalur 2025 Hari Ini">
  <meta name="keywords" content="Pacu Jalur, Event Nasional, Tepian Narosa, Kuantan Tengah, Kuantan Singingi, Budaya Riau, Undian Pacu Jalur, Live Streaming Pacu Jalur, Pacu Jalur Viral, Link Nonton Live Streaming Festival Pacu Jalur 2025 Hari Ini">
  <meta name="author" content="Pacu Jalur Tepian Narosa">

  <!-- Open Graph (Facebook & WhatsApp) -->
  <meta property="og:title" content="Undian Pacu Jalur Event Nasional Tepian Narosa">
  <meta property="og:description" content="Event budaya terbesar di Riau: Pacu Jalur Tepian Narosa, Kuantan Tengah, Kuantan Singingi. Ikuti undian sekarang.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.pacujalur.online/">
  <meta property="og:image" content="https://www.pacujalur.online/logo.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Undian Pacu Jalur Event Nasional Tepian Narosa">
  <meta name="twitter:description" content="Ikuti Undian Pacu Jalur Event Nasional Tepian Narosa, acara budaya terbesar di Kuantan Singingi.">
  <meta name="twitter:image" content="https://www.pacujalur.online/logo.png">

  <!-- Favicon -->
  <link rel="icon" href="logo.png" type="image/x-icon">
  
  <link rel="stylesheet" href="gayaku.css">
</title>

</head>
<body >

<h2>
  <img src="logo_big.png" alt="Logo" style="width: 20%; display: block; margin: 0 auto;">
  UNDIAN PACU JALUR EVENT NASIONAL TAHUN 2025 <br>
  TEPIAN NAROSA, KAB. KUANTAN SINGINGI
</h2>

  <!-- Filter -->
  <div>
  
  <input type="text" id="searchNama" onkeyup="filterTable()" placeholder="Cari Nama Jalur...">
  <select id="filterAsal" onchange="filterTable()">
    <option value="">-- Semua (Asal) --</option>
    <option value="INM">Inuman</option>
    <option value="INHU">Indragiri Hulu</option>
    <option value="PGN">Pangean</option>
    <option value="KT">Kuantan Tengah</option>
    <option value="/KH">Kuantan Hilir</option>
    <option value="GT">Gunung Toar</option>
    <option value="KM">Kuantan Mudik</option>
    <option value="HK">Hulu Kuantan</option>
    <option value="SR">Sentajo Raya</option>
    <option value="CRT">Cerenti</option>
    <option value=" KHS">Kuantan Hilir Seberang</option>
    <option value="BNI">Benai</option>
    <option value="PCR">Pucuk Rantau</option>
    <option value="SGG">Singingi</option>
    <option value="SBR">Sumatra Barat</option>
    <option value="LTD">Logas Tanah Darat</option>
    <!-- asal lain bisa ditambah -->
  </select>

<button onclick="generatePDF()" class="btn-download">Unduh PDF</button>
<button id="aktif_lidi" onclick="munculkanCheck()" class="btn-download">Pakai Lidi</button>
<button id="reset_lidi" onclick="resetCheck()" class="btn-download" style="display: none;">Reset Lidi</button>
<button id="hasil.php" onclick="window.location.href='hasil.php'" class="btn-download">Hasil</button>

</div>

  <!-- Tabel Data -->
  <table id="jalurTable" >
    <thead>
      <tr>
        <td style="text-align: center;" colspan="2"><?php require __DIR__ . '/counter.php'; ?>
        <?= htmlspecialchars($COUNTER_TOTAL_VIEWS) ?> views
        </td>
        <td colspan="4">*Data yang anda masukkan tidak dikirim ke server dan hanya tersimpan di perangkat Anda masing-masing.</td>
      </tr>
      <tr>
        <td colspan="6" style="text-align: center; font-weight: bold; background-color: #000000; color: white;"> Putaran Pertama </td>
      </tr>
      <tr style="position: sticky; top: 0; background: white; z-index: 1;">
        <th>No</th>
        <th>Nama Jalur (Kiri)</th>
        <th>Asal (Kiri)</th>
        <th>No</th>
        <th>Nama Jalur (Kanan)</th>
        <th>Asal (Kanan)</th>
      </tr>
    </thead>
    <tbody></tbody>
    <tr><td class="ditandai_admin"></td><td colspan="5">Ditandai Admin</td></tr>
    <tr><td class="ditandai"></td><td colspan="5">Ditandai Pengguna</td></tr>
    <tr><td colspan="6">Last update: 21:40 WIB</td></tr>
    <!-- <tr>
      <td colspan="6" >
      <ul id="asalList" style="list-style: none; padding: 0;">
  <li>Inuman: <span class="asal" data-code="INM">~</span></li>
  <li>Indragiri Hulu: <span class="asal" data-code="INHU">~</span></li>
  <li>Pangean: <span class="asal" data-code="PGN">~</span></li>
  <li>Kuantan Tengah: <span class="asal" data-code="KT">~</span></li>
  <li>Kuantan Hilir: <span class="asal" data-code="KH">~</span></li>
  <li>Gunung Toar: <span class="asal" data-code="GT">~</span></li>
  <li>Kuantan Mudik: <span class="asal" data-code="KM">~</span></li>
  <li>Hulu Kuantan: <span class="asal" data-code="HK">~</span></li>
  <li>Sentajo Raya: <span class="asal" data-code="SR">~</span></li>
  <li>Cerenti: <span class="asal" data-code="CRT">~</span></li>
  <li>Kuantan Hilir Seberang: <span class="asal" data-code="KHS">~</span></li>
  <li>Benai: <span class="asal" data-code="BNI">~</span></li>
  <li>Pucuk Rantau: <span class="asal" data-code="PCR">0</span></li>
  <li>Singingi: <span class="asal" data-code="SGG">~</span></li>
  <li>Sumatra Barat: <span class="asal" data-code="SBR">~</span></li>
  <li>Logas Tanah Darat: <span class="asal" data-code="LTD">~</span></li>
  <li>Total: <span class="asal" id="totalAsal">~</span></li>
</ul>

</tr> -->
    </tr>
  </table>
    <script src="scriptku1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <p>
  <strong>Disclaimer</strong><br>
  <em>Penggunaan Local Storage</em><br><br>
  Aplikasi ini menggunakan <em>Local Storage</em> pada perangkat Anda untuk menyimpan data sementara, seperti hasil undian atau catatan jalur.<br>
  Data tidak dikirim ke server dan hanya tersimpan di perangkat Anda masing-masing.<br>
  Penghapusan riwayat browser, cache, atau penggunaan perangkat lain dapat menyebabkan data hilang.<br><br>
  Dengan menggunakan aplikasi ini, Anda dianggap telah memahami dan menyetujui ketentuan di atas.
</p>
</body>
<?php include __DIR__ . '/footer.php'; ?>
</html>