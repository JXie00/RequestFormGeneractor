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


const options = {
    method: "POST",
    Headers: {
        "Content_Type" : "application/json",

    },
    body: JSON.stringify(),
}

const response = ("/api", options)

