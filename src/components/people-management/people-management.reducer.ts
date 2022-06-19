import api from "../../api"


const apiUrl = 'pessoas'

export const deletePeople = (peopleId:any = null) =>{
    return api.delete(`${apiUrl}/${peopleId}`)
}

export const updatePeople = (peopleId:any = null, people:any = null) =>{
    return api.patch(`${apiUrl}/${peopleId}`, people)
}

export const getPeople = (filterList:any, page:Number = 1) =>{
    const apiUrlFilter = `${apiUrl}?_page=${page}${filterList ? `${filterList['name'] ? `&name_like=${filterList['name']}`: ''}`:''}${filterList ? `${filterList['cpf'] ? `&cpf_like=${filterList['cpf']}`: ''}`:''}${filterList ? `${filterList['birthday_date'] ? `&birthday_date_like=${filterList['name']}`: ''}`:''}${filterList ? `${filterList['email'] ? `&email_like=${filterList['email']}`: ''}`:''}`  
    return api.get(apiUrlFilter)
}

export const createPeople = (people:any) =>{
    return api.post(`${apiUrl}`, people)
}