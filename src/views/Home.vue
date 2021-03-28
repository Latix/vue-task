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
      <v-subheader>LOCAL DB STORAGE ANALYSIS</v-subheader>
      <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Time to sort data</v-list-item-title>
            <v-list-item-subtitle>Duration: Local Db takes {{ new_data_time_obj.duration_sort_time }} second(s) to sort {{ new_data_time_obj.size }} amount of data</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Time to accept new data</v-list-item-title>
            <v-list-item-subtitle><b>Insert Time</b></v-list-item-subtitle>
            <v-list-item-subtitle>Start Insert Time: {{ new_data_time_obj.start_insert_time }}</v-list-item-subtitle>
            <v-list-item-subtitle>Finish Insert Time: {{ new_data_time_obj.end_insert_time }}</v-list-item-subtitle>
            <v-list-item-subtitle>Duration: {{ new_data_time_obj.duration_insert_time }} second(s)</v-list-item-subtitle>
            <v-divider></v-divider>
            <v-list-item-subtitle><b>Display Time</b></v-list-item-subtitle>
            <v-list-item-subtitle>Start Display Time: {{ new_data_time_obj.start_display_time }}</v-list-item-subtitle>
            <v-list-item-subtitle>Finish Display Time: {{ new_data_time_obj.end_display_time }}</v-list-item-subtitle>
            <v-list-item-subtitle>Duration: {{ new_data_time_obj.duration_display_time }} second(s)</v-list-item-subtitle>
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
import Localbase from 'localbase';
import { executeWithTime } from '../firebase/actions';
let index_db = new Localbase('db');
index_db.config.debug = false;

export default {
  name: 'Home',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      bvn: '',
      new_data_time_obj: {
        duration_sort_time: '...',
        size: '...',
        start_insert_time: '...',
        end_insert_time: '...',
        duration_insert_time: '...',
        start_display_time: '...',
        end_display_time: '...',
        duration_display_time: '...'
      },
      data_array: []
    }
  },
  methods: {
    handleSubmit() {
      if (this.name == '' || this.email == '' || this.phone == '' || this.dob == '' || this.address == '' || this.bvn == '') {
         alert("Please provide all fields!");
      } else {
        db.collection('contacts').add({
            name: this.name,
            email: this.email,
            phone: this.phone,
            dob: this.dob,
            address: this.address,
            bvn: this.bvn,
            created_at: new Date()
          })
            .then(function (res) {
              alert('Document saved!')
            })
            .catch(function (error) {
              alert('Error adding document: ')
            });
      }
    },
  },
  mounted() {
    db.collection('demo_data').onSnapshot( snap => {
        var execResult = executeWithTime(async () => {
            await snap.forEach(doc => {
                localStorage.setItem(doc.id, JSON.stringify({
                  name: doc.data().name,
                  email: doc.data().email,
                  phone: doc.data().phone,
                  dob: doc.data().dob,
                  address: doc.data().address,
                  bvn: doc.data().bvn
                }));
            })
          }
        );

        this.new_data_time_obj.start_insert_time    = execResult.startTime.toLocaleString();
        this.new_data_time_obj.end_insert_time      = execResult.stopTime.toLocaleString();
        this.new_data_time_obj.duration_insert_time = execResult.difference;
        console.clear();  

        var execResultDisplay = executeWithTime(async () => {
          await Object.keys(localStorage).forEach(function (key) {
            console.log(localStorage.getItem(key));
          });
        });
        
        this.new_data_time_obj.start_display_time    = execResultDisplay.startTime.toLocaleString();
        this.new_data_time_obj.end_display_time      = execResultDisplay.stopTime.toLocaleString();
        this.new_data_time_obj.duration_display_time = execResultDisplay.difference;
        console.clear();  

        if (localStorage.length > 0) {
          var storageArray = [];
          for (var i = 0;i < localStorage.length;i++) {
            storageArray.push(localStorage.key(i) + localStorage.getItem(localStorage.key(i)));
          }
          var sortedArray = storageArray.sort();
        }

        var execResultSort = executeWithTime(async () => {
          await sortedArray.forEach((data) => {
            console.log(data);
          });
        });

        this.new_data_time_obj.duration_sort_time = execResultSort.difference;
        this.new_data_time_obj.size = localStorage.length;
        console.clear();     
    });
  }
}
</script>
