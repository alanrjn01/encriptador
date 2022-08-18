/*
  constantes con elementos del HTML
*/
const encryptButton = document.getElementById("encrypt-button");
const decryptButton = document.getElementById("decrypt-button");
const copyButton = document.getElementById("copyButton");
const translatedTextHtml = document.getElementById("translated-text");
const clipboardContainerId = document.getElementById("clipboardContainerId");
const nightIcon = document.getElementById("switchModes");
let defaultMode = true;

/*
  comprueba si el cuadro de texto esta vacio y devuelve true o false
*/
const checkTextArea = () => {
  return translatedTextHtml.innerHTML == "";
};

/*
  comprueba si el textarea no esta vacio y tiene texto para encriptar.
  creo una variable para el texto encriptado, el cual voy a ir rellenando en el for
  se recorre el texto buscando coincidencias con las vocales y agregando en la posicion en la que se encuentran
  las encriptaciones que les correspondan, si no coincide con ninguna vocal, almacena el caracter sin cambios
*/
const Encrypt = () => {
  let text = document.getElementById("textarea").value;
  let textReplace = text.replace(/[$%&|<>#]/g, "");
  let encryptedText = "";
  if (textReplace != "") {
    for (let i = 0; i <= textReplace.length; i++) {
      if (
        textReplace.charAt(i) === "a" ||
        textReplace.charAt(i) === "á" ||
        textReplace.charAt(i) === "A" ||
        textReplace.charAt(i) === "Á"
      )
        encryptedText += "ai";
      else if (
        textReplace.charAt(i) === "e" ||
        textReplace.charAt(i) === "é" ||
        textReplace.charAt(i) === "E" ||
        textReplace.charAt(i) === "É"
      )
        encryptedText += "enter";
      else if (
        textReplace.charAt(i) === "i" ||
        textReplace.charAt(i) === "í" ||
        textReplace.charAt(i) === "I" ||
        textReplace.charAt(i) === "Í"
      )
        encryptedText += "imes";
      else if (
        textReplace.charAt(i) === "o" ||
        textReplace.charAt(i) === "ó" ||
        textReplace.charAt(i) === "O" ||
        textReplace.charAt(i) === "Ó"
      )
        encryptedText += "ober";
      else if (
        textReplace.charAt(i) === "u" ||
        textReplace.charAt(i) === "ú" ||
        textReplace.charAt(i) === "U" ||
        textReplace.charAt(i) === "Ú"
      )
        encryptedText += "ufat";
      else encryptedText += textReplace.charAt(i);
    }
    translatedTextHtml.innerHTML = encryptedText;
    copyButton.onclick = () => {
      copyToClipboard(translatedTextHtml.innerHTML);
    };
  }
};

/*
  recoje el texto a desencriptar y creo una variable para el nuevo texto, a su vez utilizo una bandera
  la bandera en cada iteracion se colocara en true, y si entra a alguna de las condiciones se pondra en false
  las condiciones comprueban si la posicion sobre la cual se esta recorriendo el texto coincide con una vocal
  y las posteriores letras que componen el codigo encriptado, de esta forma detecta que esa frase hay que
  desencriptarla. agrega en la posicion la vocal correspondiente y saltea las posiciones para no recorrer
  las letras que corresponden al cifrado
*/
const Decrypt = () => {
  let encryptedText = document.getElementById("textarea").value;
  let decryptedText = "";
  let flag = true;
  if (encryptedText != "") {
    for (let i = 0; i < encryptedText.length; i++) {
      flag = true;
      if (
        encryptedText.charAt(i) === "a" &&
        encryptedText.charAt(i + 1) === "i"
      ) {
        decryptedText += "a";
        i += 1;
        flag = false;
      }
      if (
        encryptedText.charAt(i) === "e" &&
        encryptedText.charAt(i + 1) === "n" &&
        encryptedText.charAt(i + 2) === "t" &&
        encryptedText.charAt(i + 3) === "e" &&
        encryptedText.charAt(i + 4) === "r"
      ) {
        decryptedText += "e";
        i += 4;
        flag = false;
      }
      if (
        encryptedText.charAt(i) === "i" &&
        encryptedText.charAt(i + 1) === "m" &&
        encryptedText.charAt(i + 2) === "e" &&
        encryptedText.charAt(i + 3) === "s"
      ) {
        decryptedText += "i";
        i += 3;
        flag = false;
      }
      if (
        encryptedText.charAt(i) === "o" &&
        encryptedText.charAt(i + 1) === "b" &&
        encryptedText.charAt(i + 2) === "e" &&
        encryptedText.charAt(i + 3) === "r"
      ) {
        decryptedText += "o";
        i += 3;
        flag = false;
      }
      if (
        encryptedText.charAt(i) === "u" &&
        encryptedText.charAt(i + 1) === "f" &&
        encryptedText.charAt(i + 2) === "a" &&
        encryptedText.charAt(i + 3) === "t"
      ) {
        decryptedText += "u";
        i += 3;
        flag = false;
      }
      if (flag) decryptedText += encryptedText.charAt(i);
    }
    translatedTextHtml.innerHTML = decryptedText;
    copyButton.onclick = () => {
      copyToClipboard(translatedTextHtml.innerHTML);
    };
  }
};

/*
  recibe un texto y mediante un try and catch lo almacena en el portapapeles del usuario y crea 
  un elemento <p> que aparece y desaparece con un mensaje de notificacion
*/
const copyToClipboard = (value) => {
  try {
    navigator.clipboard.writeText(value);
    createTextNotification("p", "copyText", "texto copiado");
  } catch {
    alert("ha ocurrido un error al copiar el texto");
    console.log("error");
  }
};

/*
  recibe una etiqueta, una id, y un texto. a partir de esto crea un elemento html hijo de clipboardContainer
  con un setTimeOut lo elimina al transcurrir 1 segundo
*/
const createTextNotification = (element, id, HTMLText) => {
  let textNotification = document.createElement(element);
  textNotification.id = id;
  textNotification.innerHTML = HTMLText;
  !defaultMode ? (textNotification.style.color = "#E8E0E0") : null;
  clipboardContainerId.appendChild(textNotification);
  setTimeout(() => {
    textNotification.style.opacity = "0";
    setTimeout(() => {
      textNotification.remove();
    }, 1000);
  }, 1000);
};

/*
  funcion que aplica estilos en el css de los elementos para efectuar un modo noche
*/
const useNightMode = () => {
  console.log(document.getElementById("body").className);
  document.getElementById("body").className += " body-night-mode";
  document.getElementById("textarea").className += " text-area-night-mode";
  translatedTextHtml.className += " text-area-night-mode";
  document.getElementById("wavePath").setAttribute("fill", "rgb(148 145 155)");
  document.getElementsByTagName("h1")[0].className += " text-night-mode";
  document.getElementById("appDescription").className += " text-night-mode";
  document.getElementById("padlockLocked").setAttribute("fill", "#E8E0E0");
  document.getElementById("padlockOpen").setAttribute("fill", "#E8E0E0");
  document.getElementById("switchModes").className += " switch-mode-night-mode";
  document.getElementById("decrypt-button").className += " button-night-mode";
  document.getElementById("encrypt-button").className += " button-night-mode";
  document.getElementById("copyButton").className += " button-night-mode";
  document.getElementById("footerText").className += " text-night-mode";
  document.getElementById("githubPath").setAttribute("fill", "white");
  document.getElementById("imgMode").src = "assets/sun.svg";
};

/*
  funcion que aplica estilos en el css de los elementos para volver al estilo por defecto 
*/
const useDefaultMode = () => {
  document.getElementById("body").className = "";
  document.getElementById("textarea").className = "text-area";
  translatedTextHtml.className = "text-area";
  document.getElementById("wavePath").setAttribute("fill", "#0099ff");
  document.getElementsByTagName("h1")[0].className = "title";
  document.getElementById("appDescription").className = "app-description";
  document.getElementById("padlockLocked").setAttribute("fill", "black");
  document.getElementById("padlockOpen").setAttribute("fill", "black");
  document.getElementById("switchModes").className = "switch-mode-button";
  document.getElementById("decrypt-button").className = "button";
  document.getElementById("encrypt-button").className = "button";
  document.getElementById("copyButton").className = "copy-button";
  document.getElementById("footerText").className = "footer-text";
  document.getElementById("githubPath").setAttribute("fill", "black");
  document.getElementById("imgMode").src = "assets/night-mode.svg";
};

/*
  detecta el click en el boton de switchModes para cambiar entre el modo noche y el modo default
*/
document.getElementById("switchModes").addEventListener("click", () => {
  if (defaultMode) {
    useNightMode();
    defaultMode = !defaultMode;
  } else {
    useDefaultMode();
    defaultMode = !defaultMode;
  }
});

/*
  usa la funcion checkTextArea para comprobar si la frase por defecto del cuadro de traduccion
  sigue en el mismo, de ser asi inserta un mensaje de que no hay nada para copiar
*/
copyButton.onclick = () => {
  if (checkTextArea())
    createTextNotification("p", "cantCopy", "no hay nada que copiar");
};

/*
  url para el texto del footer
*/
document.getElementById("footerText").onclick = () => {
  window.open("https://github.com/alanrjn01");
};

document.getElementById("githubSvg").onclick = () => {
  window.open("https://github.com/alanrjn01");
};

/*
  asignacion de funciones a los botones de encriptar y desencriptar
*/
encryptButton.onclick = Encrypt;
decryptButton.onclick = Decrypt;
