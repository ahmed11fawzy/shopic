const passwordInput = document.querySelector('#password');
const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#name');
const submitBtn = document.querySelector('#signup');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


passwordInput.addEventListener('input', () => {
    validatePassword();
});


function validatePassword() {
    let password = passwordInput.value;

    if (password.length >= 8) {

        document.querySelector('#passLength').classList.add('d-none');
        if (passwordRegex.test(password)) {
            passwordInput.classList.add('is-valid');
            passwordInput.classList.remove('is-invalid');
            document.querySelector('#passValid').classList.add('d-none');
            return true;
        } else {
            passwordInput.classList.add('is-invalid');
            passwordInput.classList.remove('is-valid');
            document.querySelector('#passValid').classList.remove('d-none');
            return false;
        }

    } else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        document.querySelector('#passLength').classList.remove('d-none');
        return false;
    }
}


emailInput.addEventListener('input', () => {
    validateEmail();
});

function validateEmail() {
    let email = emailInput.value;

    if (emailRegex.test(email)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        document.querySelector('#emailValid').classList.add('d-none');
        return true;
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        document.querySelector('#emailValid').classList.remove('d-none');
        return false;
    }
}
nameInput.addEventListener('input', () => { validateName(); });
function validateName() {
    let name = nameInput.value;
    if (name.length >= 3) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        document.querySelector('#nameValid').classList.add('d-none');
        return true;
    } else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        document.querySelector('#nameValid').classList.remove('d-none');
        return false;
    }
}
submitBtn.addEventListener('click', (e) => {

    if (validatePassword() && validateEmail() && validateName()) {
        const user = new User(nameInput.value, emailInput.value, passwordInput.value);
        console.log(user);
        sendData(user);
        location.href = 'index.html';
    }
    else {
        alert('Please fill the form correctly');
    }
});
async function sendData(user) {
    let defaultUser = {

        "name": "asd",
        "email": "afreus@gmail.com",
        "password": "afreUs11",
        "role": "customer",
        "avatar": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"

    }

    Object.assign(defaultUser, user);
    console.log(defaultUser);
    console.log(JSON.stringify(defaultUser));
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defaultUser),  // data can be `string` or {object}!
        });
        const data = await response.json(user);
        console.log(data);
    } catch (error) {
        console.error(error);
    }

}
function User(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
}



