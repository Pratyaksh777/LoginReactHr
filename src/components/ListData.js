import React, { useEffect, useState } from 'react'
import { ShowAll } from './UserFunctions'


var list = []

function ListData(props) {

    if (props.choice == 1) {
        console.log(44)
        const data = ShowAll()
        list = data.map(data => <div class="card">
            <h5 class="card-header">{data.name}</h5>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>

                <p class="card-text">{data.description}</p>

            </div>
        </div>)
    }



    return (
        <div>
            {console.log(list)}
            hello
        </div>
    )
}

export default ListData
