import axios from 'axios'

export const showLaunchesResults = (setData) => {
    axios
    .get('https://api.spacexdata.com/v4/launches/past')
    .then(response => { 
        setData(response.data)
    })
    .catch(error => { console.log(error)})

}

export  const retriveLaunche = (id) => {
    return axios
    .get(`https://api.spacexdata.com/v4/launches/${id}`)
    .then(response => { 
        return response.data
    })
    .catch(error => { console.log(error)})
}