import React from 'react'
import {retriveLaunche} from './API'

const LauncheDetails = ({name, img, id, handleShow, setLaunche, status}) => {
    return (
        <div className="teal card">
            <div className="content">
                <div className="header">{name}</div>
                <img className="right floated mini ui image" alt="image" src={img}></img>
            </div>
            <div className="ui inverted segment">
            <i className={`info ${status ? 'green' : 'orange'} circle icon`}></i>&nbsp;
                <button className="ui inverted button" onClick={() => {
                   retriveLaunche(id)
                    .then(res => {
                        setLaunche({id: res.id, name: res.name, details: res.details, image: res.links.patch.small})
                    })
                    .catch(err => console.log(err))
                   handleShow()
                }}>Launche info</button>

            </div>
        </div>
    )
}

export default LauncheDetails