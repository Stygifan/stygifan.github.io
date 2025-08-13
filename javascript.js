function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("info");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      // Try to parse as numbers
      let xContent = x.innerHTML.trim();
      let yContent = y.innerHTML.trim();
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