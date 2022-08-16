/*
  constantes con elementos del HTML
*/
const encryptButton = document.getElementById("encrypt-button");
const decryptButton = document.getElementById("decrypt-button");
const copyButton = document.getElementById("copy-button");
const translatedTextHtml = document.getElementById("translated-text");
const clipboardContainerId = document.getElementById("clipboardContainerId");
const nightIcon = document.getElementById("switchModes");
let defaultMode = true




/*
  comprueba si el cuadro de texto esta vacio o tiene la frase por defecto y devuelve true o false
*/
const checkTextArea = () => {
  return (
    translatedTextHtml.innerHTML == "" ||
    translatedTextHtml.innerHTML ==
      "todavia no hay nada que mostrar. intenta encriptar algo!"
  );
};


/*
  comprueba si el textarea no esta vacio y tiene texto para encriptar.
  creo una variable para el texto encriptado, el cual voy a ir rellenando en el for
  se recorre el texto buscando coincidencias con las vocales y agregando en la posicion en la que se encuentran
  las encriptaciones que les correspondan, si no coincide con ninguna vocal, almacena el caracter sin cambios
*/
const Encrypt = () => {
  let text = document.getElementById("textarea").value;
  let encryptedText = "";
  if (text != "") {
    for (let i = 0; i <= text.length; i++) {
      if (text.charAt(i) === "a" || text.charAt(i)==="á" || text.charAt(i) === "A" || text.charAt(i)==="Á") encryptedText += "ai";
      else if (text.charAt(i) === "e" || text.charAt(i) === "é" || text.charAt(i) === "E" || text.charAt(i) === "É") encryptedText += "enter";
      else if (text.charAt(i) === "i" || text.charAt(i) === "í" || text.charAt(i) === "I" || text.charAt(i) === "Í") encryptedText += "imes";
      else if (text.charAt(i) === "o" || text.charAt(i) === "ó" || text.charAt(i) === "O" || text.charAt(i) === "Ó") encryptedText += "ober";
      else if (text.charAt(i) === "u" || text.charAt(i) === "ú" || text.charAt(i) === "U" || text.charAt(i) === "Ú") encryptedText += "ufat";
      else encryptedText += text.charAt(i);
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

const copyToClipboard = (value) => {
  try{
    navigator.clipboard.writeText(value)
    let textNotification = document.createElement("p")
    textNotification.id = "copy-text"
    textNotification.innerHTML = "texto copiado"
    !defaultMode ? textNotification.style.color="#E8E0E0" : null
    clipboardContainerId.appendChild(textNotification)
    setTimeout(()=>{
      textNotification.style.opacity="0"
      setTimeout(()=>{textNotification.remove()},1000)
    },1000)
  }
  catch{
    alert("ha ocurrido un error al copiar el texto")
    console.log("error")
  }
  
};

const useNightMode = () => {
  document.getElementById("body").style.background="#2E3540"
  document.getElementById("textarea").style.background="rgb(67 71 72)"
  document.getElementById("textarea").style.color="#E8E0E0"
  translatedTextHtml.style.background="rgb(67 71 72)"
  translatedTextHtml.style.color="#E8E0E0"
  document.getElementById("wave-design").style.fill="rgb(148 145 155)"
  document.getElementsByTagName("h1")[0].style.color="#E8E0E0"
  document.getElementById("appDescription").style.color="#E8E0E0"
  document.getElementById("padlockLocked").style.fill="#E8E0E0"
  document.getElementById("padlockOpen").style.fill="#E8E0E0"
  document.getElementById("switchModes").style.background= "rgb(197 170 130)"
  document.getElementById("nightMode").src="assets/sun.svg"
  
}

const useDefaultMode = () => {
  document.getElementById("body").style.background="#F1F0F0"
  document.getElementById("textarea").style.background="#FDF2D6"
  document.getElementById("textarea").style.color="#1b1717"
  translatedTextHtml.style.background="#FDF2D6"
  translatedTextHtml.style.color="#1b1717"
  document.getElementById("wave-design").style.fill="#0099ff"
  document.getElementsByTagName("h1")[0].style.color="#1b1717"
  document.getElementById("appDescription").style.color="#1b1717"
  document.getElementById("padlockLocked").style.fill="black"
  document.getElementById("padlockOpen").style.fill="black"
  document.getElementById("switchModes").style.background= "rgb(138, 142, 184)"
  document.getElementById("nightMode").src="assets/night-mode.svg"
}


/*
  asignacion de las funciones a los botones
*/

document.getElementById("switchModes").addEventListener("click",()=>{
  if(defaultMode){
    useNightMode()
    defaultMode = !defaultMode
  }else{
    useDefaultMode()
    defaultMode = !defaultMode
  }
})

/*
  usa la funcion checkTextArea para comprobar si la frase por defecto del cuadro de traduccion
  sigue en el mismo, de ser asi ejecuta un alert en el navegador diciendo que no se puede copiar 
*/
copyButton.onclick = () => {
  if (checkTextArea()) alert("no hay nada para copiar")
};

encryptButton.onclick = Encrypt;
decryptButton.onclick = Decrypt;
