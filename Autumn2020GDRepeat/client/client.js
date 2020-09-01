
const sock = io();

const writeEvent = (text) => {
    const parent = document.querySelector("#events");

    const el = document.createElement("li");
    el.innerHTML = text;

    parent.appendChild(el);
};

writeEvent("welcome to Run a Ton");

sock.on("message", writeEvent());