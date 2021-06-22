// const { json } = require("express");

const canvas = document.querySelector('#samplecanvas');

if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(40, 60, 5, 0, 2 * Math.PI);

    ctx.stroke();
}

let data = {
    name:"IDOnt",
    age: 11,
};

const options = {
    method: "POST",
    Headers: {
        "Content_Type" : "application/json",

    },
    body: JSON.stringify(data),
}
const response = fetch("/api", options)

console.log(response.response);