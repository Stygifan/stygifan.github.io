const text = document.querySelector('#text');
const button = document.querySelector('#submit');



button.addEventListener('click', (event) => {
    event.preventDefault();
    const queries = text.value.toLowerCase().split(/[\s,]+/).filter(q => q); // Split by space or comma
    fetch('https://stygifan.github.io/data.json')
    .then(response => response.json())
    .then(data => {
        const filteredUsers = data.users.filter(user =>
            queries.some(query =>
                Object.values(user).some(value =>
                    String(value).toLowerCase().includes(query)
                )
            )
        );
        const existingTable = document.getElementById('info');
        if (existingTable) {
            existingTable.remove();
        }
        createTable(filteredUsers);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});



const resetButton = document.querySelector('#resetBtn');
resetButton.addEventListener('click', () => {
const existingTable = document.getElementById('info');
    if (existingTable) {
        existingTable.remove();
    }
    fetch('https://stygifan.github.io/data.json')
    .then(response => response.json())
    .then(data => {
        createTable(data.users);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});