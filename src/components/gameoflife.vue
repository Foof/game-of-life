<template>
    <div class="game-of-life">
        <table>
            <tbody>
                <tr v-for="row in rows">
                    <td v-for="col in cols">
                        <cell :row="row" :col="col" :active.sync="state[row][col]"></cell>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="toggleInProgress">{{ buttonText }}</button>
    </div>
</template>

<script>
    import store from '../store'
    import Cell from './cell.vue'

    export default {
        components: {
            Cell
        },

        data () {
            return {
                rows: store.rows,
                cols: store.cols,
                state: store.state,
                inProgress: false
            }
        },

        computed: {
            buttonText() {
                return this.inProgress ? 'Stop' : 'Start'
            }
        },

        methods: {
            toggleInProgress() {
                this.inProgress = !this.inProgress
                if (!this.inProgress) return
                const tick = () => {
                    if (this.inProgress) {
                        this.gameTick()
                        setTimeout(tick, 100)
                    }
                }
                setTimeout(tick, 100)
            },

            gameTick() {
                // Duplicate state
                const newState = [];
                for (let i = 0; i < this.state.length; i++) {
                    const row = []
                    for (let j = 0; j < this.state[i].length; j++) {
                        row[j] = this.state[i][j]
                    }
                    newState[i] = row
                }

                // Work out new state
                const rowMaxIndex = this.state.length - 1;
                const colMaxIndex = this.state[0].length - 1;
                for (let i = 0; i < this.state.length; i++) {
                    for (let j = 0; j < this.state[i].length; j++) {
                        const alive = this.state[i][j]
                        let aliveNeighbours = 0

                        const neighbourIndexes = [
                            [(i == 0 ? rowMaxIndex : i - 1), (j == 0 ? colMaxIndex : j - 1)], [(i == 0 ? rowMaxIndex : i - 1), j], [(i == 0 ? rowMaxIndex : i - 1), (j == colMaxIndex ? 0 : j + 1)],
                            [i, (j == 0 ? colMaxIndex : j - 1)], false, [i, (j == colMaxIndex ? 0 : j + 1)],
                            [(i == rowMaxIndex ? 0 : i + 1), (j == 0 ? colMaxIndex : j - 1)], [(i == rowMaxIndex ? 0 : i + 1), j], [(i == rowMaxIndex ? 0 : i + 1), (j == colMaxIndex ? 0 : j + 1)]
                        ]

                        neighbourIndexes.forEach((neighbour) => {
                            if (neighbour && this.state[neighbour[0]][neighbour[1]]) aliveNeighbours++
                        })

                        newState[i][j] = alive ? (aliveNeighbours >= 2 && aliveNeighbours <= 3) : (aliveNeighbours === 3)
                    }
                }

                // Update state with new state
                for (var i = 0; i < newState.length; i++) {
                    for (var j = 0; j < newState[i].length; j++) {
                        this.$set('state[' + i + '][' + j + ']', newState[i][j])
                    }
                }
            }
        }
    }
</script>

<style type="text/css">
    .game-of-life {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .game-of-life table {
        height: 900px;
        width: 900px;
        border-collapse: collapse;
    }

    .game-of-life a {
        display: block;
        height: 100%;
        background-color: #EEE;
    }

    .game-of-life a.active {
        background-color: #666;
    }

    .game-of-life a:hover {
        background-color: #CCC;
    }
</style>