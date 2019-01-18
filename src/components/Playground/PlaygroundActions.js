import gql from 'graphql-tag';
import { fetchGraphQL, mutationGraphQL } from '../../GlobalActions';


export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS'
export const CREATE_INITIATIVE = 'CREATE_INITIATIVE'


const getPlaygroundsQuery = gql`
  {
    playgrounds {
      id
      name
      lng
      lat
      status
      volunteerCount
      votes
    }
  }
`;

const createInitiativeQuery = gql`
    mutation CreateInitiative($input: CreateInitiativeInput!) {
        createInitiative(input: $input) {
          id
          name
          lng
          lat
          status
          volunteerCount
          votes
        }
    }
`;

export const fetchPlaygrounds = () => fetchGraphQL(GET_PLAYGROUNDS, getPlaygroundsQuery)
export const createInitiative = (name, lat, lng) => {

  console.log("NAME: " + name + " lat: " + lat + " lng: " + lng)

  return mutationGraphQL(CREATE_INITIATIVE, createInitiativeQuery, {
    input: {
      initiativeId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // generate a uuid
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
        }),
      name,
      lat,
      lng,
      type: "smokefree",
      status: "not_started",
    }
  })
}
    
    

