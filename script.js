const scriptURL = 'URL_APPS_SCRIPT_ANDA'; // Ganti dengan URL Web App Anda

document.getElementById('inputForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const item = document.getElementById('item').value;
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const fotoNota = document.getElementById('fotoNota').files[0];
  const totalCup = parseInt(document.getElementById('totalCup').value);
  const totalPiring = parseInt(document.getElementById('totalPiring').value);

  // Konversi foto ke base64
  const reader = new FileReader();
  reader.readAsDataURL(fotoNota);
  reader.onload = function () {
    const fotoBase64 = reader.result;

    // Kirim data ke Google Apps Script
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify({ item, type, amount, fotoNota: fotoBase64, totalCup, totalPiring }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Tampilkan pesan sukses di console
        addToTable(item, type, amount, fotoBase64, totalCup, totalPiring); // Tambahkan data ke tabel
      })
      .catch((error) => console.error('Error:', error));
  };

  document.getElementById('inputForm').reset();
});

function addToTable(item, type, amount, fotoNota, totalCup, totalPiring) {
  const tableBody = document.querySelector('#reportTable tbody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${new Date().toLocaleString()}</td>
    <td>${item}</td>
    <td>${type === 'pendapatan' ? 'Pendapatan' : 'Pengeluaran'}</td>
    <td>Rp ${amount.toLocaleString()}</td>
    <td><img src="${fotoNota}" alt="Nota" style="width: 100px;"></td>
    <td>${totalCup}</td>
    <td>${totalPiring}</td>
  `;

  tableBody.appendChild(newRow);
}
