import axios from 'axios'
//baseURL: 'https://smartbookmark-backend-urtjok3rza-wl.a.run.app',
//CREATING CLIENT WITH BASE URL
const apiClient = axios.create({
  baseURL: 'https://smartbookmark-backend-urtjok3rza-wl.a.run.app',
  headers: {
    'Content-Type': 'application/json',
  },
})

//EXPORTING THE NEW AXIOS INSTANCE
export default apiClient
