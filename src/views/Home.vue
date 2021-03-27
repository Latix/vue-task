<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container style='display:flex; position:absolute; top:0; bottom:0; right:0; left:0;'>
      <v-row style="align-items: center;margin: auto;">
        <v-col
          cols="4"
          md="6"
        >
        <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
      <v-subheader>INDEXED DB STORAGE ANALYSIS</v-subheader>
      <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Time to sort data</v-list-item-title>
            <v-list-item-subtitle>12 seconds</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Push Time</v-list-item-title>
            <v-list-item-subtitle>10 seconds</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Time to accept new data</v-list-item-title>
            <v-list-item-subtitle>15 seconds</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      </v-col>
        <v-col
          cols="8"
          md="6"
        >
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="name"
                label="Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="phone"
                label="Phone"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="dob"
                label="Dob"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="address"
                label="Address"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="bvn"
                label="Bvn"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row style="justify-content: center;">
            <v-btn
                type="submit"
                depressed
                style="color: #fff;background-color: #419789;padding: 25px;"
              >
              Submit
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script>
import db from '../firebase/firebaseInit';

export default {
  name: 'Home',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      bvn: ''
    }
  },
  methods: {
    handleSubmit() {
      if (this.name == '' || this.email == '' || this.phone == '' || this.dob == '' || this.address == '' || this.bvn == '') {
         alert("Please provide all fields!");
      } else {
        db.collection('demo_data').add({
            name: this.name,
            email: this.email,
            phone: this.phone,
            dob: this.dob,
            address: this.address,
            bvn: this.bvn,
          })
            .then(function () {
              console.log('Document saved!')
            })
            .catch(function (error) {
              console.error('Error adding document: ')
            });
      }
    }
  },
  created() {
    // const start = new Date().getTime();
    
    // setTimeout(function () {
    //   const end = new Date().getTime();
    //   const diff = end - start;
    //   const seconds = Math.floor(diff / 1000 % 60);
    //   console.log(seconds);
    // }, 5000);
  }
}
</script>
