const fs = require('fs');
const axios = require('axios');

async function test(params) {
  const res = await axios.get('http://roadstudxp.com/productionData.json')
  if (res) {
    console.log(res.data);
  }
}
test()
