const canvas = document.createElement("canvas");
canvas.id = "map";
const ctx = canvas.getContext('2d');

let cells, cellSize;
let tick = 1;
let run = false;

const set = {
    grid: 30,
    slower: 10,
};

const colors = {
    dead: '#FFFFFF',
    alive: '#000000',
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
            const st = clear ? 'dead' : 'dead';
            const cell = new Cell(x, y, i, j, st);
            tmp.push(cell);
            drawCell(cell);
        }
        cells.push(tmp);
    }
}

function resize() {
    run = false;
    tick = 1;
    const s = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = s;
    canvas.height = s;
    cellSize = s / set.grid;
    canvas.style.setProperty('--size', s + 'px');
    drawGrid();
}

function menu() {
    const gui = new dat.GUI();
    const col = gui.addFolder('Colors');
    const btns = {
        Run: () => { run = true; },
        Stop: () => { run = false; },
        Clear: () => {
            run = false;
            drawGrid(true);
        }
    };

    col.addColor(colors, 'dead');
    col.addColor(colors, 'alive');
    gui.add(set, "grid", 1, 50, 1);
    gui.add(set, "slower", 1, 100, 1);
    gui.add(btns, 'Run');
    gui.add(btns, 'Stop');
    gui.add(btns, 'Clear');

    const addResizeListener = (controller) => {
        if (!controller.__button) {
            controller.onChange(resize);
        }
    };

    gui.__controllers.forEach(addResizeListener);
    Object.values(gui.__folders).forEach(folder => {
        folder.__controllers.forEach(addResizeListener);
    });
}

function checkStatus(cell) {
    const { i, j } = cell;
    const neighbours = [];
    let aliveCount = 0;

    for (let x = Math.max(0, i - 1); x <= Math.min(set.grid - 1, i + 1); x++) {
        for (let y = Math.max(0, j - 1); y <= Math.min(set.grid - 1, j + 1); y++) {
            if (x !== i || y !== j) {
                neighbours.push(cells[x][y]);
            }
        }
    }

    for (const neighbour of neighbours) {
        if (neighbour.status === 'alive') {
            aliveCount++;
        }
    }

    if (cell.status === 'alive') {
        cell.tmp = aliveCount === 2 || aliveCount === 3 ? 'alive' : 'dead';
    } else {
        cell.tmp = aliveCount === 3 ? 'alive' : 'dead';
    }
}

function life() {
    for (const row of cells) {
        for (const cell of row) {
            checkStatus(cell);
        }
    }

    for (const row of cells) {
        for (const cell of row) {
            cell.status = cell.tmp;
            drawCell(cell);
        }
    }
}

function findCellByPos(x, y) {
    const i = Math.floor(x / cellSize);
    const j = Math.floor(y / cellSize);
    return cells[i] && cells[i][j];
}

function defineCell(cell) {
    if (cell) {
        cell.status = cell.status === 'alive' ? 'dead' : 'alive';
        drawCell(cell);
    }
}

let pressed = false,
    target = '';

canvas.addEventListener("mouseup", () => { pressed = false; });
document.addEventListener("mouseup", () => { pressed = false; });

canvas.addEventListener("mousedown", (e) => {
    pressed = true;
    target = findCellByPos(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    defineCell(target);

    canvas.addEventListener("mousemove", (e) => {
        if (!pressed || !target) return false;
        const cell = findCellByPos(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
        if (!cell || (target.x === cell.x && target.y === cell.y)) return false;
        defineCell(cell);
        target = cell;
    });
});

window.requestAnimFrame = (() => {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function update() {
    if (run && tick % set.slower === 0) {
        life();
    }
    tick++;
    window.requestAnimFrame(update);
}

export { canvas, resize, menu, update };
