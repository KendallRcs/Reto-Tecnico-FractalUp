<template>
  <div class="home container">
    <div class="searchbar">
      <b-form-input v-model="text" type="search" placeholder="Ingrese el nombre del país" @focus="openFilterContinent"></b-form-input>
      <b-button variant="primary" class="d-flex" @click="searchCountry">
        <b-icon icon="search" aria-hidden="true" style="margin-right: 5px;"></b-icon> Buscar
      </b-button>
    </div>

    <div v-if="showFilterContinent" class="filter-menu">
      <div class="continents-container">
        <b-card
          v-for="continent in continents"
          :key="continent"
          class="continent-card"
          :class="{ selected: selectedContinents.includes(continent) }"
          @click="toggleContinent(continent)"
        >
          <b-card-img :src="getImageSrc(continent)" alt="Continente Imagen" class="continent-card-image"></b-card-img>
          <b-card-text>{{ continent }}</b-card-text>
        </b-card>
      </div>
      <div class="buttons">
        <b-button variant="danger" @click="clearFilters">Eliminar Filtros</b-button>
        <b-button variant="secondary" @click="closeFilterContinent">Cerrar</b-button>
      </div>
    </div>

    <div class="countries">
      <b-card
        v-for="(item, index) in countries"
        :key="index"
        :title="item.name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        @click="getCountry(item.code)"
      >
        <b-card-text>
          <p>{{ item.code }}</p>
          <p>{{ item.continent.name }}</p>
        </b-card-text>
      </b-card>
    </div>

    <b-sidebar id="sidebar-1" shadow :visible="sidebarVisible" @hidden="sidebarVisible = false" right>
      <div class="px-3 py-2" v-if="selectedCountry">
        <h3>{{ selectedCountry.name }}</h3>
        <p><strong>Capital:</strong> {{ selectedCountry.capital }}</p>
        <p><strong>Continente:</strong> {{ selectedCountry.continent.code }} - {{ selectedCountry.continent.name }}</p>
        <p><strong>Monedas:</strong> {{ selectedCountry.currency }}</p>
        <p><strong>Idiomas:</strong> {{ selectedCountry.languages.map(lang => lang.name).join(', ') }}</p>
        <p v-if="selectedCountry.states.length > 0"><strong>Estados:</strong> {{ selectedCountry.states.map(state => state.name).join(', ') }}</p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const countryClicked = gql`
  query Country($code: ID!){
    country(code: $code) {
      capital
      code
      continent {
        code
        name
      }
      currencies
      currency
      emoji
      emojiU
      languages {
        code
        name
        native
        rtl
      }
      name
      states {
        code
        name
      }
    }
  }
`;
const allCountries = gql`
  {
    countries {
      capital
      code
      continent {
        code
        name
      }
      currencies
      currency
      emoji
      emojiU
      languages {
        code
        name
        native
        rtl
      }
      name
      states {
        code
        name
      }
    }
  }
`;
const countriesFiltered = gql`
  {
    countries {
      capital
      code
      continent {
        code
        name
      }
      currencies
      currency
      emoji
      emojiU
      languages {
        code
        name
        native
        rtl
      }
      name
      states {
        code
        name
      }
    }
  }
`;

export default {
  name: 'HomeView',
  
  data() {
    return {
      data: null,
      text: '',
      selectedCountry: null,
      sidebarVisible: false,
      continents: ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'],
      selectedContinents: [],
      showFilterContinent: false,
      countries: []
    }
  },
  methods: {
    openFilterContinent() {
      this.showFilterContinent = true;
    },
    closeFilterContinent() {
      this.showFilterContinent = false;
    },
    clearFilters() {
      this.selectedContinents = [];
      this.searchCountry();
    },
    toggleContinent(continent) {
      const index = this.selectedContinents.indexOf(continent);
      if (index === -1) {
        this.selectedContinents.push(continent);
      } else {
        this.selectedContinents.splice(index, 1);
      }
      this.searchCountry();
    },
    getImageSrc(continent) {
      switch (continent) {
        case "Africa":
          return "https://media.istockphoto.com/id/1218138872/es/vector/mapa-del-continente-africano.jpg?s=612x612&w=0&k=20&c=toWpSdYUEpn30fHd_c6GLyt5NmvhKE5tSP_WRHN5IEI="
        case "Antarctica":
          return "https://media.istockphoto.com/id/1303917802/es/vector/mapa-de-siluetas-ant%C3%A1rticas.jpg?s=612x612&w=0&k=20&c=7g2z6xg1bG5Q2ivwuMJ66pMSjCmNsauFa1159jk-tHg="
        case "Asia":
          return "https://www.shutterstock.com/image-vector/asia-map-vector-blue-color-600nw-1937869900.jpg"
        case "Europe":
          return "https://img.freepik.com/vector-premium/mapa-mundo-europa-mapa-silueta-continente-europa_532867-80.jpg"
        case "North America":
          return "https://img.freepik.com/vector-premium/diseno-vectorial-mapa-continente-americano_739746-512.jpg"
        case "Oceania":
          return "https://static.vecteezy.com/system/resources/previews/003/589/325/non_2x/doodle-freehand-drawing-of-australia-map-free-vector.jpg"
        case "South America":
          return "https://media.istockphoto.com/id/1136699983/es/vector/ilustraci%C3%B3n-vectorial-con-mapa-del-continente-de-sudam%C3%A9rica-siluetas-azules.jpg?s=612x612&w=0&k=20&c=nKMpAazSDks-mL-rtfMEzMVmkjjck0nOGwZobQTRcPw="
        default:
          break;
      }
    },
    async getAllCountries() {
      try {
        const result = await this.$apollo.query({
          query: allCountries,
        });
        this.countries = result.data.countries;
        console.log('Countries:', this.countries);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async getCountry(code) {
      try {
        const result = await this.$apollo.query({
          query: countryClicked,
          variables: { code: code }
        });
        this.selectedCountry = result.data.country;
        console.log('Country:', this.selectedCountry);
        this.sidebarVisible = true;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async searchCountry() {
      try {
        const result = await this.$apollo.query({
          query: countriesFiltered,
        });
        this.countries = result.data.countries.filter(country => country.name.toLowerCase().includes(this.text.toLowerCase()));
        if(this.selectedContinents.length > 0) {
          this.countries = this.countries.filter(country => this.selectedContinents.includes(country.continent.name));
        }
        console.log('Countries:', this.countries);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  mounted() {
    this.getAllCountries();
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 1rem;
}
.searchbar {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.countries {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.filter-menu {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.continents-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.continent-card {
  cursor: pointer;
  width: 150px;
  border: 1px solid transparent;
  text-align: center;
}
.continent-card.selected {
  border: 2px solid #009cff;
}
.continent-card-image{
  height: 115px;
  object-fit: cover;

}
.buttons {
  display: flex;
  gap: 1rem;
}
</style>
