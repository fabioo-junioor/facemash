<script setup>
import { onMounted, reactive } from 'vue'
import CardImage from './components/CardImage.vue'
import Loader from './components/Loader.vue'
import { getApi, getPersonApi } from './utils/connectionApi.js'
import { sorteiaId } from './utils/randomId.js'
import { db, collection, getDocs, addDoc, updateDoc, doc } from './api/db/connFirebase.js'

const dbFacemash = reactive({
  dbLista: []

})
const loader = reactive({
  show: false,
  mensagem: 'Carregando...'

})
const todosDados = reactive({
  dados: [],
  ids: [],

})
const personagem1 = reactive({
  id: '',
  nome: '',
  imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-de-galeria-icone_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1709856000&semt=ais',
  especie: ''
  
})
const personagem2 = reactive({
  id: '',
  nome: '',
  imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-de-galeria-icone_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1709856000&semt=ais',
  especie: ''

})

const buscaTodosDados = async () => {
  await todosDados.dados.data.filter((e) => {
    if(e.attributes.image != null){
      todosDados.ids.push(e.id)

    }
  })
}
const buscaDadosPersonagem = async () => {
  personagem1.id = sorteiaId(todosDados.ids)
  personagem2.id = sorteiaId(todosDados.ids)

  var dados = await getPersonApi(personagem1.id)
  personagem1.nome =  dados.data.attributes.name
  personagem1.imagem =  dados.data.attributes.image
  personagem1.especie =  dados.data.attributes.species
  
  dados = await getPersonApi(personagem2.id)
  personagem2.nome =  dados.data.attributes.name
  personagem2.imagem =  dados.data.attributes.image
  personagem2.especie =  dados.data.attributes.species
  
}
const personagemEscolhido = async (id) => {
  //console.log('escolheu: ', id)
  let personagem = null
  personagem = await existePersonagemDb(id)
  if(personagem != null){
    await atualizaVoto(personagem.idDoc, personagem.id, personagem.todosVotos+1)

  }else{
    await adicionaVoto(id)

  }  
  await getDbFacemash()
  await buscaDadosPersonagem()

}
const getDbFacemash = async () => {
  dbFacemash.dbLista = []
  var dbShot = await getDocs(collection(db, 'facemash'))
  dbShot.docs.map((e) => {
    dbFacemash.dbLista.push({idDoc: e.id, id: e.data().id, totalVotos: e.data().totalVotos})

  })
}
const existePersonagemDb = async (id) => {
  let exixte = null
  for(var i=0; i<dbFacemash.dbLista.length; i++){
    if(dbFacemash.dbLista[i].id == id){
      return exixte = { idDoc: dbFacemash.dbLista[i].idDoc, id: dbFacemash.dbLista[i].id, todosVotos: dbFacemash.dbLista[i].totalVotos }

    }
  }
  return exixte

}
const adicionaVoto = async (id) => {
  await addDoc(collection(db, 'facemash'), {id: id, totalVotos: 1})
  console.log('adiconado!')

}
const atualizaVoto = async (idDoc, id, totalVotos) => {
  let ref = doc(db, 'facemash', idDoc)
  await updateDoc(ref,  {
    totalVotos: totalVotos

  })
  console.log('atualizado!')

}

onMounted(async () => {
  await getDbFacemash()
  for(var i=1; i<=47; i++){
    todosDados.dados = await getApi(i)
    loader.mensagem = `Carregando... ${(i*2.12).toFixed(0)}%`

  }  
  if(todosDados.dados.errors){
    loader.show = false
    loader.mensagem = 'Erro no servidor!'

  }else{
    loader.show = true
    loader.mensagem = 'Carregando...'
    await buscaTodosDados()
    await buscaDadosPersonagem()

  }  
})

</script>

<template>
  <div id="app">
    <div class="app-header">
      <h1>Facemash</h1>
    </div>
    <div class="app-cards">
      <div class="app-cards-loader" v-if="!loader.show">
        <Loader
          :msg="loader.mensagem" />
      </div>
      <div class="app-cards-body" v-else>
        <div class="left-card">
          <button @click="personagemEscolhido(personagem1.id)">
            <CardImage 
              :nome="personagem1.nome"
              :imagem="personagem1.imagem"
              :especie="personagem1.especie" />
          </button>
        </div>
        <div>
          <span>OU</span>
        </div>
        <div class="right-card">
          <button @click="personagemEscolhido(personagem2.id)">
            <CardImage
              :nome="personagem2.nome"
              :imagem="personagem2.imagem"
              :especie="personagem2.especie" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');

  #app{
    height: 100vh;
    width: 100vw;
    background: #11998e;
    background: -webkit-linear-gradient(to right, #38ef7d, #11998e);
    background: linear-gradient(to right, #38ef7d, #11998e);
    font-family: "Dosis", sans-serif;

    .app-header{
      height: 8rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(139, 0, 0);

      h1{
        color: white;
        font-size: 3rem;

      }
    }
    .app-cards{
      height: calc(100vh - 8rem);
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .app-cards-loader{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

      }
      .app-cards-body{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        button{
          border: none;
          padding: 0;
          border-radius: 5px;
          margin: 1rem;
          background-color: #6d6d6d;
  
          &:hover{
            background-color: #535353;
            cursor: pointer;
  
          }        
        }
        span{
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          
        }
      }
    }
  }
/*################################################*/
@media only screen and (max-width: 1560px) {

}
@media only screen and (max-width: 1200px) {

}
@media only screen and (max-width: 992px) {

}
@media only screen and (max-width: 720px) {
  #app{
    height: auto;

    .app-cards{
      height: auto;

      .app-cards-loader{
        height: calc(100vh - 8rem);
      }

      .app-cards-body{
        height: auto;
        flex-direction: column;
        
      }
    }
  }

}
@media only screen and (max-width: 481px) {

}
@media only screen and (max-width: 360px) {
  
}
</style>
