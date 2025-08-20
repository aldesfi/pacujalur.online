<?php
// counter.php — file-based traffic counter (no DB)
// Simpan total kunjungan di file, tanpa hitung pengunjung unik

$storeDir = __DIR__ . '/counter_store';
if (!is_dir($storeDir)) mkdir($storeDir, 0775, true);

// File penyimpanan total views
$viewsFile = "$storeDir/views.txt";

// Helpers
function safe_read_int($file) {
    if (!file_exists($file)) return 0;
    $h = fopen($file, 'r'); if (!$h) return 0;
    if (flock($h, LOCK_SH)) { 
        $data = trim(stream_get_contents($h)); 
        flock($h, LOCK_UN); 
    } else { 
        $data = '0'; 
    }
    fclose($h);
    return (int)($data === '' ? 0 : $data);
}

function safe_write_int($file, $value) {
    $h = fopen($file, 'c+');
    if ($h && flock($h, LOCK_EX)) {
        ftruncate($h, 0); rewind($h);
        fwrite($h, (string)$value);
        fflush($h); flock($h, LOCK_UN);
    }
    if ($h) fclose($h);
}

// Hitung total kunjungan
$totalViews = safe_read_int($viewsFile) + 1;
safe_write_int($viewsFile, $totalViews);

// Variabel untuk dipakai di halaman
$COUNTER_TOTAL_VIEWS = $totalViews;