//this will communicate with the backend main.js and the client, like a middle man
const ipcRenderer = require("electron").ipcRenderer;
const generatePassword = () => {
  ipcRenderer.send(
    "generatePassword",
    document.querySelector(".keyWord").value
  );
};

ipcRenderer.on("receivePassword", (event, data) => {
  //alert(data);
  const passwordTag = document.querySelector("#password");
  passwordTag.innerHTML = data;
});
