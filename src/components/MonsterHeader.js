import React, { Component } from 'react'

export class MonsterHeader extends Component {
    render() {
        const { monsterImagePathRepo } = this.props;
        return (
            <div style={{ border: '1px solid gray' }}>
                {
                    monsterImagePathRepo.map((picPath, index) => (
                        <img key={index} alt='Monster' src={picPath} height='40px'
                            style={{ margin: '20px' }} />
                    ))
                }
            </div>
        )
    }
}

export default MonsterHeader