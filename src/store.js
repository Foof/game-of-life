const state = []
const rows = 30
const cols = 30

for (let i = 0; i < rows; i++) {
    state.push([])
    for (let j = 0; j < cols; j++) {
        state[i].push(Math.random() > .5 ? false : true)
    }    
}

export default {
    rows: rows,
    cols: cols,
    state: state
}