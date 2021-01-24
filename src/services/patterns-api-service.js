//get all users
import TokenService from '../services/token-service'
import config from '../config'

const PatternsApiService = {
  getAllPatterns() {
    return fetch(`${config.API_ENDPOINT}/patterns`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}
export default PatternsApiService
//get all projects of user
//get all patterns for project
//save pattern
//add new pattern
//