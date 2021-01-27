//get all users
import TokenService from '../services/token-service'
import config from '../config'

const PatternsApiService = {
  getAllPatterns() {
    return fetch(`${config.API_ENDPOINT}/patterns`, {
      headers: {
        'content-type':'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAllPatternIds(){
    return fetch(`${config.API_ENDPOINT}/patterns?columns=id`, {
      headers: {
        'content-type':'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getPatternById(id){
    return fetch(`${config.API_ENDPOINT}/patterns/${id}`,{
      method: 'GET',
      headers: {
        'content-type':'application/json'
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deletePattern(id){
    return fetch(`${config.API_ENDPOINT}/patterns/${id}`,{
      method: 'DELETE',
      headers: {
        'content-type':'application/json'
      },
    })
  },
  newEmptyPattern(){
    return fetch(`${config.API_ENDPOINT}/patterns`,{
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
    })
  },
  replacePattern(id, pattern){
    return fetch(`${config.API_ENDPOINT}/patterns/${id}`,{
      method: 'PUT',
      headers: {
        'content-type':'application/json'
      },//body = pattern
    })
  }
}
export default PatternsApiService
//get all projects of user
//get all patterns for project
//save pattern
//add new pattern
//