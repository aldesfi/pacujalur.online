let jalurData = [];

    // Baca CSV langsung dari file di direktori yang sama
    fetch("jalur_hari_2.csv")
      .then(response => response.text())
      .then(text => {
        parseCSV(text);
        renderTable();
      })
      .catch(err => console.error("Gagal membaca CSV:", err));

    // Parsing CSV
    function parseCSV(text) {
      const rows = text.trim().split("\n");
      const headers = rows[0].split(",");
      jalurData = rows.slice(1).map(row => {
        const values = row.split(",");
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim() || "");
        return obj;
      });
      // console.log(jalurData);
    }

    // Render tabel
    function renderTable() {
      const tbody = document.querySelector("#jalurTable tbody");
      tbody.innerHTML = "";
      jalurData.forEach(row => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td id="noKiri-${row.No}" class="${row.Pemenang=='L' ? 'ditandai_admin' : localStorage.getItem(`${row.No}`)=='L' ? 'ditandai' : ''}">${row.No} 
          ${!row.Pemenang 
            ? `<input type="checkbox" 
                        id="checkbox-${row.No}#L" 
                        value="${row.No}#L" 
                        style="display: none;" 
                        onchange="toggleCheckbox(this)" 
                        ${localStorage.getItem(row.No) === 'L' ? 'checked' : ''}>`
            : ''
          }
          </td>
          <td id="namaKiri-${row.No}" class="${row.Pemenang=='L' ? 'ditandai_admin' : localStorage.getItem(`${row.No}`)=='L' ? 'ditandai' : ''}">${row.NamaKiri}</td>
          <td id="asalKiri-${row.No}" class="${row.Pemenang=='L' ? 'ditandai_admin' : localStorage.getItem(`${row.No}`)=='L' ? 'ditandai' : ''}">${row.AsalKiri}</td>
          
          <td id="noKanan-${row.No}" class="${row.Pemenang=='R' ? 'ditandai_admin' : localStorage.getItem(`${row.No}`)=='R' ? 'ditandai' : ''}">${row.No} 
          ${!row.Pemenang 
              ? `<input type="checkbox" 
                          id="checkbox-${row.No}#R" 
                          value="${row.No}#R" 
                          style="display: none;" 
                          onchange="toggleCheckbox(this)" 
                          ${localStorage.getItem(row.No) === 'R' ? 'checked' : ''}>`
              : ''
            }
            </td>
          
          <td id="namaKanan-${row.No}" class="${row.Pemenang=='R' ? 'ditandai_admin' : localStorage.getItem(`${row.No}`)=='R' ? 'ditandai' : ''}">${row.NamaKanan}</td>
          <td id="asalKanan-${row.No}" class="${row.Pemenang=='R' ? 'ditandai_admin' : localStorage.getItem(`${row.No}`)=='R' ? 'ditandai' : ''}">${row.AsalKanan}</td>
        `;
        tbody.appendChild(tr);
      });
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