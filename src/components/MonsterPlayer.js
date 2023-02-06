import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

export class MonsterPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 100
        }
    }

    componentDidMount() {
        this.intervalIdRemove = setInterval(() => (this.props.data.stopGame()), 5000);
        this.intervalIdProgress = setInterval(() => this.reduceProgress(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalIdRemove);
        clearInterval(this.intervalIdProgress);
    }

    reduceProgress() {
        this.setState((prevState) =>
        ({
            progress: prevState.progress - 20
        }))
    }

    render() {
        return (
            <button style={{
                height: '80px', width: '80px', border: '1px solid red', backgroundColor: 'transparent',
                position: 'absolute', left: `${this.props.data.startPosY}px`, top: `${this.props.data.startPosX}px`
            }}
                onClick={() => (this.props.data.removeMonster(this.props.data.id))} >
                <img alt='Monster' src={this.props.data.imagePath} height='40px'></img>
                <ProgressBar now={this.state.progress} />
            </button>
        )
    }
}

export default MonsterPlayer