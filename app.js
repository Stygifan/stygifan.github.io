fetch('https://stygifan.github.io/data.json')
.then(response => response.json())
.then(data => {
    createTable(data.users);
})
.catch(error => console.error('Error fetching JSON:', error));

function createTable(users) {
    const table = document.createElement('table');
    table.id = 'info'; // Add this line
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    let row = tableHead.insertRow();
    Object.keys(users[0]).forEach((key, idx) => {
        let th = document.createElement('th');
        th.textContent = key;
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortTable(idx)); // Add this line
        row.appendChild(th);
    });

    users.forEach(user => {
        let row = tableBody.insertRow();
        Object.values(user).forEach(value => {
            let cell = row.insertCell();
            cell.textContent = value;
        });
    });

    document.body.appendChild(table);
}


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('info');
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      let xContent = x.textContent.trim();
      let yContent = y.textContent.trim();
      let xNum = parseFloat(xContent);
      let yNum = parseFloat(yContent);
      let bothNumbers = !isNaN(xNum) && !isNaN(yNum);
      if (dir == "asc") {
        if (bothNumbers) {
          if (xNum > yNum) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (xContent.toLowerCase() > yContent.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      } else if (dir == "desc") {
        if (bothNumbers) {
          if (xNum < yNum) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (xContent.toLowerCase() < yContent.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

