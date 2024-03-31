async function getApi(pg){
    try{
        const response = await fetch(`https://api.potterdb.com/v1/characters?page[number]=${pg}`)
        const data = await response.json()
        return data

    }catch(err){
        console.log('Erro: ', err)

    }
}

async function getPersonApi(id){
    try{
        const response = await fetch(`https://api.potterdb.com/v1/characters/${id}`)
        const data = await response.json()
        return data

    }catch(err){
        console.log('Erro: ', err)

    }
}

export { getApi, getPersonApi }