const text = document.querySelector('#text');
const button = document.querySelector('#submit');



button.addEventListener('click', (event) => {
    const query = text.value.toLowerCase();
    event.preventDefault(); // Prevent form submission
    fetch('https://stygifan.github.io/data.json')
    .then(response => response.json())
    .then(data => {
        const filteredUsers = data.users.filter(user => 
            Object.values(user).some(value => 
                String(value).toLowerCase().includes(query)
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