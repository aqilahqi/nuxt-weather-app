import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  states: ["Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Wilayah Persekutuan",
    "Labuan",
    "Sabah",
    "Putrajaya"
  ],
  cities: [{
      name: "Johor",
      list: [
        "Johor Bahru",
        "Tebrau",
        "Pasir Gudang",
        "Bukit Indah",
        "Skudai",
        "Kluang",
        "Batu Pahat",
        "Muar",
        "Ulu Tiram",
        "Senai",
        "Segamat",
        "Kulai",
        "Kota Tinggi",
        "Pontian Kechil",
        "Tangkak",
        "Bukit Bakri",
        "Yong Peng",
        "Pekan Nenas",
        "Labis",
        "Mersing",
        "Simpang Renggam",
        "Parit Raja",
        "Kelapa Sawit",
        "Buloh Kasap",
        "Chaah"
      ],
    },
    {
      name: "Kedah",
      list: [
        "Sungai Petani",
        "Alor Setar",
        "Kulim",
        "Jitra / Kubang Pasu",
        "Baling",
        "Pendang",
        "Langkawi",
        "Yan",
        "Sik",
        "Kuala Nerang",
        "Pokok Sena",
        "Bandar Baharu"
      ],
    },
    {
      name: "Kelantan",
      list: [
        "Kota Bharu",
        "Pangkal Kalong",
        "Tanah Merah",
        "Peringat",
        "Wakaf Baru",
        "Kadok",
        "Pasir Mas",
        "Gua Musang",
        "Kuala Krai",
        "Tumpat"
      ],
    },
    {
      name: "Melaka",
      list: [
        "Bandaraya Melaka",
        "Bukit Baru",
        "Ayer Keroh",
        "Klebang",
        "Masjid Tanah",
        "Sungai Udang",
        "Batu Berendam",
        "Alor Gajah",
        "Bukit Rambai",
        "Ayer Molek",
        "Bemban",
        "Kuala Sungai Baru",
        "Pulau Sebang"
      ],
    },
    {
      name: "Negeri Sembilan",
      list: [
        "Seremban",
        "Port Dickson",
        "Nilai",
        "Bahau",
        "Tampin",
        "Kuala Pilah"
      ],
    },
    {
      name: "Pahang",
      list: [
        "Kuantan",
        "Temerloh",
        "Bentong",
        "Mentakab",
        "Raub",
        "Jerantut",
        "Pekan",
        "Kuala Lipis",
        "Bandar Jengka",
        "Bukit Tinggi"
      ],
    },
    {
      name: "Perak",
      list: [
        "Ipoh",
        "Taiping",
        "Sitiawan",
        "Simpang Empat",
        "Teluk Intan",
        "Batu Gajah",
        "Lumut",
        "Kampung Koh",
        "Kuala Kangsar",
        "Sungai Siput Utara",
        "Tapah",
        "Bidor",
        "Parit Buntar",
        "Ayer Tawar",
        "Bagan Serai",
        "Tanjung Malim",
        "Lawan Kuda Baharu",
        "Pantai Remis",
        "Kampar"
      ],
    },
    {
      name: "Perlis",
      list: [
        "Kangar",
        "Kuala Perlis"
      ],
    },
    {
      name: "Pulau Pinang",
      list: [
        "Bukit Mertajam",
        "Georgetown",
        "Sungai Ara",
        "Gelugor",
        "Ayer Itam",
        "Butterworth",
        "Perai",
        "Nibong Tebal",
        "Permatang Kucing",
        "Tanjung Tokong",
        "Kepala Batas",
        "Tanjung Bungah",
        "Juru"
      ],
    },
    {
      name: "Sabah",
      list: [
        "Kota Kinabalu",
        "Sandakan",
        "Tawau",
        "Lahad Datu",
        "Keningau",
        "Putatan",
        "Donggongon",
        "Semporna",
        "Kudat",
        "Kunak",
        "Papar",
        "Ranau",
        "Beaufort",
        "Kinarut",
        "Kota Belud"
      ],
    },
    {
      name: "Sarawak",
      list: [
        "Kuching",
        "Miri",
        "Sibu",
        "Bintulu",
        "Limbang",
        "Sarikei",
        "Sri Aman",
        "Kapit",
        "Batu Delapan Bazaar",
        "Kota Samarahan"
      ],
    },
    {
      name: "Selangor",
      list: [
        "Subang Jaya",
        "Klang",
        "Ampang Jaya",
        "Shah Alam",
        "Petaling Jaya",
        "Cheras",
        "Kajang",
        "Selayang Baru",
        "Rawang",
        "Taman Greenwood",
        "Semenyih",
        "Banting",
        "Balakong",
        "Gombak Setia",
        "Kuala Selangor",
        "Serendah",
        "Bukit Beruntung",
        "Pengkalan Kundang",
        "Jenjarom",
        "Sungai Besar",
        "Batu Arang",
        "Tanjung Sepat",
        "Kuang",
        "Kuala Kubu Baharu",
        "Batang Berjuntai",
        "Bandar Baru Salak Tinggi",
        "Sekinchan",
        "Sabak",
        "Tanjung Karang",
        "Beranang",
        "Sungai Pelek"
      ],
    },
    {
      name: "Terengganu",
      list: [
        "Kuala Terengganu",
        "Chukai",
        "Dungun",
        "Kerteh",
        "Kuala Berang",
        "Marang",
        "Paka",
        "Jerteh"
      ],
    },
    {
      name: "Wilayah Persekutuan",
      list: [
        "Kuala Lumpur",
        "Labuan",
        "Putrajaya"
      ]
    },
  ]
}
const mutations = {}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
