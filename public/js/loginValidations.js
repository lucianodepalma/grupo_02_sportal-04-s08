window.addEventListener('load', function() {
    const form = document.querySelector('form.form');

    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{8}$/, // Letras, numeros, guion y guion_bajo.
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }
    
    form.addEventListener('submit', function(e) {
        let errores = false;
        let email = document.getElementById('usuario');
        let pass = document.getElementById('password');
        let errmsg = document.querySelector(".error-msg-usuario");
        let errmsgpass = document.querySelector(".error-msg-password");

        //Validando el input de usuario para que no este el campo en blanco y que sea formato email.
        if(email.value.length > 0 ) {
            let inputValue = email.value;
            if (expresiones.correo.test(inputValue)) {
                errmsg.innerHTML = ' ';
                email.classList.remove('invalid');
            } else {
                errores = true;
                errmsg.innerHTML = 'Debes ingresar un correo electrónico valido.';
                email.classList.add('invalid');
            }

        } else {
            errores = true;
            errmsg.innerHTML = "Debes ingresar el correo electrónico.";
            email.classList.add('invalid');
        }

        //Validando el input de contraseña para que no este el campo en blanco.
        if(pass.value.length > 0 ) {
            errmsgpass.innerHTML = ' ';
            pass.classList.remove('invalid');
        } else {
            errores = true;
            errmsgpass.innerHTML = "Debes ingresar tu contraseña.";
            pass.classList.add('invalid');
        }

        if(errores){ e.preventDefault() }

    })

})