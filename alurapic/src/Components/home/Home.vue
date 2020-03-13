<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre por parte do título">
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto">
        <meu-painel :titulo="foto.titulo"> 
            <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>
        </meu-painel>       
      </li>
    </ul>

  </div>
</template>

<script>
import Painel from '../Shared/Painel/Painel.vue';
import ImagemResponsiva from '../Shared/imagem-responsiva/ImagemResponsiva.vue';

export default {

  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva
  },

  data() {

    return {

      titulo: 'Alurapic', 
      fotos: [],
      filtro: ''
    }
  },
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
        .then(res => res.json())
        .then(fotos => this.fotos = fotos, err => console.log(err));
  },

  computed: {
    fotosComFiltro() {
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(),'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  }
}

</script>

<style>
  .centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }

  .imagem-responsiva {
    width: 100%;
  }

  .filtro {
    display: block;
    width: 100%;
    height: 30px;
  }
</style>
