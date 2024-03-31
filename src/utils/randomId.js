function sorteiaId(array){
    const randomIndex = Math.floor(Math.random() * array.length)
    const item = array[randomIndex]
    return item

}

export { sorteiaId }