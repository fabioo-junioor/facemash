<script setup>
defineProps(['nome', 'imagem', 'especie'])

</script>

<template>
    <div id="card-personagem">
        <img class="card-imagem" :src="imagem" :alt="nome" />
        <h3 class="card-nome"><span>Nome:</span> {{nome}}</h3>
        <hr>
        <h4 class="card-especie"><span>Especie:</span> {{especie}}</h4>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');

    #card-personagem{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .5rem;
        font-family: "Dosis", sans-serif;
        border-radius: 5px;

        .card-imagem{
            width: 18rem;
            height: 20rem;
            border-radius: 5px;

        }
        .card-nome{
            padding: 1rem 0;
            font-size: 1.2rem;
            color: white;

            span{
                font-weight: bold;
                
            }
        }
        hr{
            width: 80%;
            border: 1px solid white;

        }
        .card-especie{
            padding: 1rem 0;
            font-size: 1.1rem;
            color: white;

            span{
                font-weight: bold;

            }
        }
    }
</style>