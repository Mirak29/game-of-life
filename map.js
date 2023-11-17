export const canvas = document.createElement("canvas");
canvas.id = "map"; // Définition de l'ID "map" pour l'élément canvas
const ctx = canvas.getContext('2d');

let cells, cellSize;
let tick = 1;
let run = false;

const set = {
    grid: 30, 
    slower: 10,
};

const colors = {
    dead: '#0a0911',
    alive: '#5915bb',
};

class Cell {
    constructor(x, y, i, j, status) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.status = status;
    this.tmp = 'dead';
    }
}

function drawCell(cell) {
    ctx.beginPath();
    ctx.fillStyle = colors[cell.status];
    ctx.rect(cell.x, cell.y, cellSize, cellSize);
    ctx.fill();
    ctx.stroke();
}

function drawGrid(clear) {
    cells = [];

    for (let i = 0; i < set.grid; i++) {
        const tmp = [];
        for (let j = 0; j < set.grid; j++) {
            const x = i * cellSize;
            const y = j * cellSize;
            const st = clear ? 'dead' : 'dead'; // On démarre toutes les cellules comme mortes si clear est vrai
            const cell = new Cell(x, y, i, j, st);
            tmp.push(cell);
            drawCell(cell);
        }
        cells.push(tmp);
    }
}      

export function resize() {
    run = false;
    tick = 1;
    const s = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = s;
    canvas.height = s;
    cellSize = s / set.grid;
    canvas.style.setProperty('--size', s + 'px');
    drawGrid();
}

resize();
window.addEventListener('resize', resize);
