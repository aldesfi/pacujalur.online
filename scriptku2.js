let jalurData = [];

    // Baca CSV langsung dari file di direktori yang sama
    fetch("putaran1.csv")
      .then(response => response.text())
      .then(text => {
        parseCSV(text);
        renderTable();
        // hitungAsal();
      })
      .catch(err => console.error("Gagal membaca CSV:", err));

    // Parsing CSV
    function parseCSV(text) {
      const rows = text.trim().split("\n");
      const headers = rows[0].split(";");
      jalurData = rows.slice(1).map(row => {
        const values = row.split(";");
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim() || "");
        return obj;
      });
      // console.log(jalurData);
    }

    // Render tabel
    function renderTable() {
      console.log(jalurData.length);
      const tbody = document.querySelector("#jalurTable tbody");
      let jumlah_aduan = jalurData.length/2;
      tbody.innerHTML = "";
      for (let index = 1; index <= jumlah_aduan; index++) {
        const element = jalurData[index];
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index}</td>
          `;
      // Ambil data kiri dari localStorage
    var kiri = localStorage.getItem(index + 'L');
    // console.log("Kiri:", kiri);
    if (kiri) {
      kiri = parseInt(kiri, 10); // ubah ke angka index (kalau memang index)
      var dataKiri = jalurData.at(kiri);
      // console.log("Data Kiri:", dataKiri);

      if (dataKiri) {
        tr.innerHTML += `
          <td>${dataKiri.NamaJalur}</td>
          <td>${dataKiri.Asal}</td>
        `;
      }
    } else {
      tr.innerHTML += `
        <td>¬</td>
        <td>¬</td>
      `;
    }
    tr.innerHTML += `<td>${index}</td>`;
    let kanan = localStorage.getItem(index + 'R');
    if (kanan) {
      kanan = parseInt(kanan, 10);
      let dataKanan = jalurData.at(kanan);

          if (dataKanan) {
            tr.innerHTML += `
              <td>${dataKanan.NamaJalur}</td>
              <td>${dataKanan.Asal}</td>
            `;
          }
        } else {
          tr.innerHTML += `
            <td>¬</td>
            <td>¬</td>
          `;
        }
        tbody.appendChild(tr);
      }
      // jalurData.forEach(row => {
      //   let tr = document.createElement("tr");
      //     tr.innerHTML = `
      //      <td>${row.No}</td><td></td><td></td><td></td><td></td><td></td>`;
      //     tbody.appendChild(tr);
      // });
    }

    // Filter tabel
    function filterTable() {
      const inputNama = document.getElementById("searchNama").value.toLowerCase();
      const filterAsal = document.getElementById("filterAsal").value.toLowerCase();
      const tbody = document.querySelector("#jalurTable tbody");
      const trs = tbody.getElementsByTagName("tr");

      for (let i = 0; i < trs.length; i++) {
        let tds = trs[i].getElementsByTagName("td");
        let namaKiri = tds[1].textContent.toLowerCase();
        let asalKiri = tds[2].textContent.toLowerCase();
        let namaKanan = tds[4].textContent.toLowerCase();
        let asalKanan = tds[5].textContent.toLowerCase();

        let cocokNama = (namaKiri.includes(inputNama) || namaKanan.includes(inputNama));
        let cocokAsal = (filterAsal === "" || asalKiri.includes(filterAsal) || asalKanan.includes(filterAsal));

        trs[i].style.display = (cocokNama && cocokAsal) ? "" : "none";
      }
    }

     function generatePDF() {
      const element = document.getElementById('jalurTable');
      const opt = {
      filename:     `pacujalur-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`,
      margin:       [5, 5, 5, 5],
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).toPdf().get('pdf').save();
  }

  function resetCheck() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const namaElements = document.querySelectorAll('[id^="namaKiri-"], [id^="namaKanan-"]');
    const asalElements = document.querySelectorAll('[id^="asalKiri-"], [id^="asalKanan-"]');
    const noElements = document.querySelectorAll('[id^="noKiri-"], [id^="noKanan-"]');
    localStorage.clear(); // Hapus semua data di localStorage
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.classList.remove('ditandai');
    });
    namaElements.forEach(element => {
      element.classList.remove('ditandai');
    });
    asalElements.forEach(element => {
      element.classList.remove('ditandai');
    });
    noElements.forEach(element => {
      element.classList.remove('ditandai');
    });
  }

  
  function munculkanCheck() {
    const aktifLidiButton = document.getElementById('aktif_lidi');
    aktifLidiButton.classList.toggle('active');
    aktifLidiButton.textContent = aktifLidiButton.classList.contains('active') ? 'Simpan Lidi' : 'Pakai Lidi';
    const resetLidiButton = document.getElementById('reset_lidi');
    resetLidiButton.style.display = aktifLidiButton.classList.contains('active') ? 'inline' : 'none';
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.style.display = checkbox.style.display === 'none' ? 'inline' : 'none';
    });

  }
  function toggleCheckbox(checkbox) {
    const value = checkbox.value;
    console.log("Checkbox toggled:", value);
    const [no, side] = value.split("#");
    console.log("No:", no, "Side:", side);
    if(side=="L") {
      const checkboxElement = document.getElementById(`checkbox-${no}#R`);
      if (checkboxElement.checked) {
        checkboxElement.checked = !checkboxElement.checked;
      }
      const namaElement = document.getElementById(`namaKiri-${no}`);
      const asalElement = document.getElementById(`asalKiri-${no}`);
      const noElement = document.getElementById(`noKiri-${no}`);
      const namaElementKanan = document.getElementById(`namaKanan-${no}`);
      const asalElementKanan = document.getElementById(`asalKanan-${no}`);
      const noElementKanan = document.getElementById(`noKanan-${no}`);
      if (namaElement) {
        namaElement.classList.toggle('ditandai');
        namaElementKanan.classList.remove('ditandai');
      }
      if (asalElement) {
        asalElement.classList.toggle('ditandai');
        asalElementKanan.classList.remove('ditandai');
      }
      if (noElement) {
        noElement.classList.toggle('ditandai');
        noElementKanan.classList.remove('ditandai');
      }
    } else {
      const checkboxElement = document.getElementById(`checkbox-${no}#L`);
      if (checkboxElement.checked) {
        checkboxElement.checked = !checkboxElement.checked;
      }
      const namaElement = document.getElementById(`namaKanan-${no}`);
      const asalElement = document.getElementById(`asalKanan-${no}`);
      const noElement = document.getElementById(`noKanan-${no}`);
      const namaElementKiri = document.getElementById(`namaKiri-${no}`);
      const asalElementKiri = document.getElementById(`asalKiri-${no}`);
      const noElementKiri = document.getElementById(`noKiri-${no}`);
      if (namaElement) {
        namaElement.classList.toggle('ditandai');
        namaElementKiri.classList.remove('ditandai');
      }
      if (asalElement) {
        asalElement.classList.toggle('ditandai');
        asalElementKiri.classList.remove('ditandai');
      }
      if (noElement) {
        noElement.classList.toggle('ditandai');
        noElementKiri.classList.remove('ditandai');
      }
    }
    localStorage.setItem(no, side);
  }

  // function hitungAsal() {
  //   const table = document.getElementById("jalurTable");
  //   const asalCounter = {};
  //   let total = 0;

  //   // Loop baris <tbody> saja supaya tidak kena baris footer
  //   const rows = table.querySelectorAll("tbody tr");

  //   rows.forEach(row => {
  //     const cells = row.cells;

  //     // Pastikan ada minimal 6 kolom (No, NamaKiri, AsalKiri, No, NamaKanan, AsalKanan)
  //     if (cells.length >= 6) {
  //       // Ambil teks, lalu split berdasarkan '/'
  //       const asalKiri = cells[2].textContent.trim().split("/").pop().trim();
  //       const asalKanan = cells[5].textContent.trim().split("/").pop().trim();
  //       if (asalKiri) {
  //         asalCounter[asalKiri] = (asalCounter[asalKiri] || 0) + 1;
  //         total++;
  //       }
  //       if (asalKanan) {
  //         asalCounter[asalKanan] = (asalCounter[asalKanan] || 0) + 1;
  //         total++;
  //       }
  //     }
  //   });

  //   // Update tampilan pada <span>
  //   document.querySelectorAll("#asalList .asal").forEach(el => {
  //     const kode = el.getAttribute("data-code");
  //     el.textContent = asalCounter[kode] || 0;
  //   });

  //    // Update total
  //   document.getElementById("totalAsal").textContent = total;
  // }