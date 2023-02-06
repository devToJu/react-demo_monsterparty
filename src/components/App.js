import React, { Component } from 'react'
import m1 from '../images/m1.png'
import m2 from '../images/m2.png'
import m3 from '../images/m3.png'
import m4 from '../images/m4.png'
import m5 from '../images/m5.png'
import m6 from '../images/m6.png'
import m7 from '../images/m7.png'
import m8 from '../images/m8.png'
import m9 from '../images/m9.png'
import Anleitung from './Anleitung'
import MonsterHeader from './MonsterHeader'
import MonsterPlayer from './MonsterPlayer'
import Button from 'react-bootstrap/Button'

export class App extends Component {
    constructor(props) {
        super(props);
        this.addMonsterPlayer = this.addMonsterPlayer.bind(this);
        this.removeMonsterPlayer = this.removeMonsterPlayer.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);

        this.monsterImagePathRepo = [m1, m2, m3, m4, m5, m6, m7, m8, m9];

        this.gameOver = true;
        this.monsterIdCounter = 0;
        this.highScore = 0;

        this.state = {
            monsterPlayerRepo: [],
            monsterHelloCounter: 0,
        }
    }

    addMonsterPlayer() {
        if (this.gameOver) {
            return;
        }

        let imageIndex = this.createRandomNumber(8, 1);
        let posX = this.createRandomNumber(510, 10);
        let posY = this.createRandomNumber(510, 10);

        this.monsterIdCounter++;

        this.setState((prevState) => ({
            monsterPlayerRepo: prevState.monsterPlayerRepo.concat({
                id: this.monsterIdCounter,
                imagePath: this.monsterImagePathRepo[imageIndex],
                startPosX: posX,
                startPosY: posY,
                removeMonster: this.removeMonsterPlayer,
                stopGame: this.stopGame
            })
        }))

        this.handleAddMonsterTimer();
    }

    handleAddMonsterTimer() {
        let reduceAddInterval = this.intervalTimeAddMonster > 500 && this.monsterIdCounter % 5 === 0;
        if (reduceAddInterval) {

            this.intervalTimeAddMonster = this.intervalTimeAddMonster - 250;
        }

        setTimeout(() => {
            this.addMonsterPlayer()
        }, this.intervalTimeAddMonster);
    }

    removeMonsterPlayer(playerId) {
        this.setState((prevState) => ({
            monsterPlayerRepo: prevState.monsterPlayerRepo.filter((player) => player.id !== playerId),
            monsterHelloCounter: prevState.monsterHelloCounter + 1
        }))
    }

    startGame() {
        this.gameOver = false;
        this.intervalTimeAddMonster = 2000;
        this.addMonsterPlayer();
    }

    stopGame() {
        this.highScore = this.highScore > this.state.monsterHelloCounter ?
            this.highScore :
            this.state.monsterHelloCounter;

        this.gameOver = true;
        this.monsterIdCounter = 0;

        this.setState({
            monsterPlayerRepo: [],
            monsterHelloCounter: 0
        })
    }

    createRandomNumber(upperBound, lowerBound) {
        const randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + 1;
        return randomNumber;
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>
                <h1 style={{ color: 'green' }}>
                    MonSteRpARty
                </h1>
                <MonsterHeader monsterImagePathRepo={this.monsterImagePathRepo} />
                <Anleitung />
                {
                    this.gameOver ?
                        <p>Highscore: {this.highScore}</p> :
                        <p>Monster begrüßt: {this.state.monsterHelloCounter}</p>
                }
                {
                    this.gameOver ?
                        <Button variant="danger" onClick={this.startGame}>Lets party!!!</Button> :
                        <div className='position-relative' style={{ border: '1px solid gray', width: '600px', height: '600px' }}>
                            {
                                this.state.monsterPlayerRepo.map(
                                    (data, index) => (
                                        <MonsterPlayer key={index} data={data} />
                                    ))
                            }
                        </div>

                }

            </div>
        )
    }
}

export default App