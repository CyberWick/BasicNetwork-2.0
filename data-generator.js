const axios = require("axios");
// const url = "http://192.168.0.146:4000/channels/mychannel/chaincodes/test_cc";
const url = "http://localhost:4000/channels/mychannel/chaincodes/test_cc";
let pk = null;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njg2NTIwNjgsInVzZXJuYW1lIjoidGVzdF91c2VyIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1Njg2MTYwNjh9.g9NZnhY3G2MHub9I8iH17npWONcZKHcUiUk7Cnifbkw"
let conf = {
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
};

let farmerCount = 15
let heapLotCount = 3
let farmerPrefix = "MP1301000"
let farmerKeyArray = []
let heapLotPrefix = "2019101"
let heapLotKeyArray = []
let tcPrefix = "ORG/TC/1802/101"
let tcKey = null

const createPostData = async (pk, data) => {
	// console.log("Inside createPostData: DATA", data)
	// console.log("Inside createPostData: JSON DATA", JSON.stringify(data))
	return {
		fcn: "CreateSampleData",
		peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
		chaincodeName: "test_cc",
		channelName: "mychannel",
		args: [JSON.stringify(data), pk]
	}
}

const postFarmerData = async (pk) => {
	console.log(pk)
	let data = {
		created_at: (new Date).getTime(),
		name: 'Ramlal Oberoi',
		weight: 1000
	}
	let postData = await createPostData("cotton_purchased_2019_rabi#" + pk.toString(), data)
	// console.log("before AXIOS call", postData)

	return axios.post(url, postData, conf
	).then(function (response) { console.log(`${pk.toString()} => `, response.data); }
	).catch(function (error) { console.log(error); });

};

const postHeapLotData = async (pk, farmersList) => {
	console.log(pk, farmersList)
	let data = {
		created_at: (new Date).getTime(),
		weight: 1000,
		consumed_weight: '0',
		farmers: farmersList
	}
	let postData = await createPostData("heap_lot_created#" + pk.toString(), data)

	return axios.post(url, postData, conf
	).then(function (response) { console.log(`${pk.toString()} => `, response.data); }
	).catch(function (error) { console.log(error); });
};
