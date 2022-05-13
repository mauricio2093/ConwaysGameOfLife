/*======  Table Generator  ======*/

let columns = 90; //90
let rows = 40;
let side = 15; //15

let screem = [];

document.addEventListener("keydown", (e) => {  //keyboard controll
    e.preventDefault(); // prevent movement of scroll
    switch (e.keyCode) {
        case 39:
            nextStatus()
            console.log("keyborard on");
            break;
    
        default:
            break;
    }
})

const tableGenerator = () => {
    let html = "<table cellpadding=0 cellspacing=0 id='table'>";
    for(let y = 0; y < rows; y++){
        html +="<tr>";
        for(let x = 0; x < columns; x++){
            html +=`<td id="cell__${x}-${y}" onmouseup="changeStatus(${x},${y})">`;
            html +="</td>";
        };
        html +="</tr>";
    };
    html += "</table>";
    const container = document.getElementById("table__container");
    container.innerHTML = html;
    const table  = document.getElementById('table');
    table.style.width = side*columns+"px";
    table.style.height = side*rows+"px"; 
}
const changeStatus = (x, y) => {
    let cell = document.getElementById(`cell__${x}-${y}`);
    if(cell.style.background != "white"){
        cell.style.background = "white";
    }else{
        cell.style.background="";
    };
}
const screemShot = () => {
    screem=[];
    for(let x = 0; x < columns; x++){
        screem.push([]);
        for(let y = 0; y  < rows; y++){
            let cell = document.getElementById(`cell__${x}-${y}`);
            screem[x][y] = cell.style.background == "white";
        };
    };
}

const aliveCount = (x,y) => {
    let alive = 0;
    
    for(let i = -1 ; i <= 1 ; i++){
        for(let j = -1; j  <= 1; j++){
            
            if(i == 0 && j == 0){
                continue
            }
            try {
                if(screem[x + i][y + j]){
                    alive++  
                    console.log(alive);
                }
            } catch(e) { };

            if(alive > 3){
                return alive
            }
            
        }
    }
    return alive
}
const nextStatus = () => {
    screemShot();
    for(let x = 0; x < columns; x++){
        for(let y = 0; y  < rows; y++){
            let alive = aliveCount(x,y);
            let cell = document.getElementById(`cell__${x}-${y}`);
            
            if(screem[x][y]) {  //cell alive
                if(alive < 2 || alive > 3){
                    cell.style.background = ""; // dies from loneliness or overpupulation
                }
            }else{ //cell alive
                if(alive === 3){
                    cell.style.background= "white";
                }
            };
        };
    };
    
}
tableGenerator();
