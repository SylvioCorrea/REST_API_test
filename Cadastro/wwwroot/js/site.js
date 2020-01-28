const uri = 'api/Pessoas';
let pessoas = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addEmailTextbox = document.getElementById('add-email');
    const addBirthDate = document.getElementById('add-birth');
    const addImageBox = document.getElementById('add-image');

    let nameVal = addNameTextbox.value.trim();

    let emailVal = addEmailTextbox.value.trim();
    if (emailVal === '') emailVal = null;

    let birthVal = addBirthDate.value;
    if (birthVal === '') birthVal = null;

    //let imageVal;
    //if (addImageBox.files > 0) {
    //    imageVal = addImageBox.files[0];
    //} else {
    //    imageVal = null;
    //}

    const item = {
        nome: nameVal,
        email: emailVal,
        nascimento: birthVal,
        //foto: null
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addEmailTextbox.value = '';
            addBirthDate.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = pessoas.find(item => item.id === id);

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-name').value = item.nome;
    document.getElementById('edit-email').value = item.email;
    document.getElementById('edit-birth').value = item.nascimento;
    document.getElementById('editForm').style.display = 'block';
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;

    let name = document.getElementById('edit-name').value.trim();
    let email = document.getElementById('edit-email').value.trim();
    let birth = document.getElementById('edit-birth').value;

    if (email === '') email = null;
    if (birth === '') birth = null;

    const item = {
        id: parseInt(itemId, 10),
        nome: name,
        email: email,
        nascimento: birth
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}


function searchDB() {
    let nameSearch = document.getElementById('name-search').value.trim();
    let emailSearch = document.getElementById('email-search').value.trim();
    fetch(`${uri}?name=${nameSearch}&email=${emailSearch}`)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function clearSearch() {
    document.getElementById('name-search').value = '';
    document.getElementById('email-search').value = '';
    getItems();
}


function _displayItems(data) {
    const tBody = document.getElementById('pessoasTable');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let cellNumber = 0;

        let td1 = tr.insertCell(cellNumber++);
        let nameNode = document.createTextNode(item.nome);
        td1.appendChild(nameNode);

        let td2 = tr.insertCell(cellNumber++);
        let emailString = (item.email)? item.email : 'indisponível';
        let emailNode = document.createTextNode(emailString);
        td2.appendChild(emailNode);

        let td3 = tr.insertCell(cellNumber++);
        let birthString;
        if (item.nascimento !== null) {
            let birthDate = new Date(item.nascimento);
            let day = birthDate.getDate();
            /* getMonth() returns months as zero indexed values
             * because this is javascript, of course, so you need to add 1.*/
            let month = birthDate.getMonth() + 1;
            let year = birthDate.getFullYear();
            birthString = `${day}/${month}/${year}`;
        } else {
            birthString = 'indisponível';
        }
        let birthNode = document.createTextNode(birthString);
        td3.appendChild(birthNode);

        let td4 = tr.insertCell(cellNumber++);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(cellNumber++);
        td5.appendChild(deleteButton);
    });

    pessoas = data;
}