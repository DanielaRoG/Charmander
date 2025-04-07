// Controlador de login - loginController.js

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar elementos del formulario
    const form = document.querySelector("loginForm");
    const emailInput = document.getElementById("email_login");
    const passwordInput = document.getElementById("password_login");
    const loginButton = document.querySelector(".btn-success");
    
    // Crear contenedor para mensajes
    const messageContainer = document.createElement("div");
    messageContainer.id = "loginMessages";
    messageContainer.className = "mt-3";
    //form.appendChild(messageContainer);
    
    // Función para mostrar mensaje
    function showMessage(message, type) {
      messageContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    }
    
    // Validar campos vacíos
    function validateFields() {
      // Resetear mensajes previos
      messageContainer.innerHTML = "";
      let isValid = true;
      
      // Validar email
      if (!emailInput.value.trim()) {
        emailInput.classList.add("is-invalid");
        isValid = false;
      } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
      }
      
      // Validar contraseña
      if (!passwordInput.value.trim()) {
        passwordInput.classList.add("is-invalid");
        isValid = false;
      } else {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
      }
      
      if (!isValid) {
        showMessage("Por favor completa todos los campos", "danger");
      }
      
      return isValid;
    }
    
    // Autenticar usuario
    async function authenticateUser(email, password) {
      try {
        // Intentar obtener usuarios del servidor
        const response = await fetch("http://localhost:3002/users");
        
        if (!response.ok) {
          throw new Error("Error al conectar con el servidor");
        }
        
        const users = await response.json();
        
        // Buscar coincidencia de email y contraseña
        const foundUser = users.find(user => 
          user.email === email && user.password === password
        );
        
        if (foundUser) {
          // Almacenar información del usuario en sessionStorage
          sessionStorage.setItem("currentUser", JSON.stringify({
            id: foundUser.id,
            nombre: foundUser.nombre,
            email: foundUser.email
          }));
          
          showMessage("¡Inicio de sesión exitoso! Redirigiendo...", "success");
          
          // Redireccionar después de 1.5 segundos
          setTimeout(() => {
            window.location.href = "./index.html";
          }, 1500);
          
          return true;
        } else {
          showMessage("Email o contraseña incorrectos", "danger");
          return false;
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
        showMessage(`Error: ${error.message}. Usando autenticación local.`, "warning");
        
        // Plan B: Autenticación local con datos predefinidos si el servidor falla
        const usersLocal = [
          {
            "id": "1",
            "nombre": "Denisse Hernández",
            "telefono": "3318483237",
            "direccion": "5 de febrero 227",
            "email": "denissehernandez2002@gmail.com",
            "password": "1234567"
          },
          {
            "id": "2",
            "nombre": "Aylen Vázquez",
            "telefono": "3318483237",
            "direccion": "5 de febrero 227",
            "email": "denissehernandez2002@gmail.com",
            "password": "lkmmlmlkmlkml"
          },
          {
            "id": "3",
            "nombre": "Aylen Vázquez",
            "telefono": "3318483237",
            "direccion": "5 de febrero 227",
            "email": "denissehernandez2002@gmail.com",
            "password": "sjnsdkjsdshkhsjkd"
          },
          {
            "id": "4",
            "nombre": "daniela",
            "telefono": "5562555137",
            "direccion": "Topiltzin #4490,Col.El Zapote",
            "email": "dany.rodgarcia@gmail.com",
            "password": "999999"
          }
        ];
  
        const localUser = usersLocal.find(user => 
          user.email === email && user.password === password
        );
        
        if (localUser) {
          sessionStorage.setItem("currentUser", JSON.stringify({
            id: localUser.id,
            nombre: localUser.nombre,
            email: localUser.email
          }));
          
          showMessage("¡Inicio de sesión exitoso con autenticación local! Redirigiendo...", "success");
          
          setTimeout(() => {
            window.location.href = "./index.html";
          }, 1500);
          
          return true;
        } else {
          showMessage("Email o contraseña incorrectos", "danger");
          return false;
        }
      }
    }
    
    // Mejorar interacción de usuario con validación en tiempo real
    emailInput.addEventListener("input", function() {
      if (emailInput.classList.contains("is-invalid") && emailInput.value.trim()) {
        emailInput.classList.remove("is-invalid");
      }
    });
    
    passwordInput.addEventListener("input", function() {
      if (passwordInput.classList.contains("is-invalid") && passwordInput.value.trim()) {
        passwordInput.classList.remove("is-invalid");
      }
    });
    
    // Manejar el envío del formulario
    loginButton.addEventListener("click", async function(e) {
      e.preventDefault();
      
      // Validar campos
      if (validateFields()) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Autenticar usuario
        await authenticateUser(email, password);
      }
    });
    
    // Permitir envío con Enter
    form.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        loginButton.click();
      }
    });
    
    // Verificar si el usuario ya ha iniciado sesión
    function checkLoggedInStatus() {
      const currentUser = sessionStorage.getItem("currentUser");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        showMessage(`Ya has iniciado sesión como ${user.nombre}. Redirigiendo...`, "info");
        
        setTimeout(() => {
          window.location.href = "./index.html";
        }, 1500);
      }
    }
    
    // Verificar estado de inicio de sesión al cargar la página
    checkLoggedInStatus();
  });