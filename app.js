fetch('https://stygifan.github.io/data.json')
.then(response => response.json())
.then(data => {
    createTable(data.users);
})
.catch(error => console.error('Error fetching JSON:', error));

function createTable(users) {
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    let row = tableHead.insertRow();
    Object.keys(users[0]).forEach(key => {
        let th = document.createElement('th');
        th.textContent = key;
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