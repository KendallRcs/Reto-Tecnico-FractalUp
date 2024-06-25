<template>
  <div class="home container">
    <div class="searchbar">
      <b-form-input v-model="text" type="search" placeholder="Ingrese el nombre del país"></b-form-input>
      <b-button variant="primary" class="d-flex">
        <b-icon icon="search" aria-hidden="true" style="margin-right: 5px;"></b-icon> Buscar
      </b-button>
    </div>

    <div class="countries">
      <b-card
        :title="item.name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        v-for="(item, index) in countries"
        :key="index"
        @click="getCountry(item.code)"
      >
        <b-card-text>

          <p>{{ item.code }}</p>
          <p>{{item.continent.name}}</p>
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

export default {
  name: 'HomeView',
  
  data() {
    return {
      data: null,
      text: '',
      selectedCountry: null,
      sidebarVisible: false,
      /* countries: [
        {
          name: 'Argentina',
          code: 'AR',
          continent: {
            name: 'America'
          }
        },
        {
          name: 'Brasil',
          code: 'BR',
          continent: {
            name: 'America'
          }
        },
        {
          name: 'Chile',
          code: 'CH',
          continent: {
            name: 'America'
          }
        },
        {
          name: 'Uruguay',
          code: 'UR',
          continent: {
            name: 'America'
          }
        },
        {
          name: 'Paraguay',
          code: 'PR',
          continent: {
            name: 'America'
          }
        },
        {
          name: 'Perú',
          code: 'PE',
          continent: {
            name: 'America'
          }
        },
        {
          name: 'Colombia',
          code: 'CO',
          continent: {
            name: 'America'
          }
        }
      ], */
      countries: []
    }
  },
  methods: {
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
  },
  mounted() {
    this.getAllCountries();
  },
  components: {
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 1rem;
}
.searchbar{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.countries{
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>