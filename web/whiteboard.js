/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var moused = false;
var canvas = document.getElementById("myCanvas");



var context = canvas.getContext("2d");

context.fillStyle = "gray";
context.fillRect(0,0,canvas.width,canvas.height);

canvas.addEventListener("click",defineImage,false);
canvas.addEventListener("mousemove",defineImage,false);
canvas.addEventListener("mousedown",startLine,false);
canvas.addEventListener("mouseup",closeLine,false);

document.getElementById("download").addEventListener("click",function(){
   nombre = window.prompt("Ingrese el nombre del archivo sin extension","dibujo");
   nombre = nombre + ".png";
   this.href = canvas.toDataURL();
   this.download = nombre;
});

document.getElementById("clear").addEventListener("click",function(){
   
   
    context.fillStyle = "gray";
    context.fillRect(0,0,canvas.width,canvas.height);
    
});

function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function startLine(evt){
    var currentPos = getCurrentPos(evt);
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }
    
    for (i = 0; i < document.inputForm.size.length; i++) {
        if (document.inputForm.size[i].checked) {
            var size = document.inputForm.size[i];
            break;
        }
    }
    
    var json = JSON.stringify({
        "action": "startLine",
        "shape": "circle",
        "color": color.value,
        "size": size.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });
    
    drawImageText(json);
    sendText(json);
    
}

function closeLine(evt){
    var json = JSON.stringify({
        "action": "closeLine",
        "shape": "",
        "color": "",
        "coords": {
            "x": "",
            "y": ""
        }
    });
    
    drawImageText(json);
    sendText(json);
}


function defineImage(evt) {
    
   
        var currentPos = getCurrentPos(evt);
    
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }
            
    
    
    
    
    var json = JSON.stringify({
        "action": "draw",
        "shape": "circle",
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });
    drawImageText(json);
        sendText(json);
        
    }
    
    

function clear(){
    

    


    
}

function download(){
    
}


function drawImageText(image) {
    var json = JSON.parse(image);
    switch(json.action){
        case "startLine":
            context.beginPath();
            context.strokeStyle = json.color;
            context.lineCap = "round";
            context.lineWidth = json.size;
            context.moveTo(json.coords.x,json.coords.y);
            console.log("startLine");
            moused = true;
            break;
        case "closeLine":
            
            context.closePath();
            console.log("endLine");
            moused = false;
            break;
        case "draw":
            if(moused){
                context.lineTo(json.coords.x,json.coords.y);
                context.stroke();
                console.log(json);
            }
            break;
    }
    
    
}