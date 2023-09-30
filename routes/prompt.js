const mongoose = require("mongoose");
const express = require("express");
const axios = require('axios');
// const modal = require("../models/input");
const userPrompt = require("../models/story")
const router = express.Router()


router.post("/api/prompt", async(req, res)=>{
    try {
        // Define the API URL you want to fetch data from
        const apiUrl = 'https://api.textcortex.com/v1/texts/expansions'; // Replace with your API URL
    

const authToken = 'gAAAAABlEHSWZu6aRG9xu690WxoHfE8mi_ntLgRxjsYrwegj_PwKNs2Bo9rkcqHDIpGOXy_m7bA3PromVDic1rI5n_UO996hRXYjEuOGnrLgfjDBw7mhQdeJlbIfaWAPOiJt-YbuKJP6';



        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`, // Set the Authorization header with the token
          };


          const requestData = req.body.body


          // const user = await userDetails.findById(req.user.id);


        // Make an Axios GET request to the API
        const response = await axios.post(apiUrl, requestData, {headers});
      
        // Check if the response status is successful (e.g., 200 OK)
        if (response.status === 200) {
          // Access the API data from the response


          const apiData = response.data;
    

            const newData = new userPrompt ({
             
                storyPrompt: req.body.body['text'],
                story: apiData.data.outputs[0].text,
                id: apiData.data.outputs[0].id,
                upvotes : 0,


              })
              console.log( req.body.body['text']  , "<<<<<<----- storyprompt")
              console.log( apiData.data.outputs[0].text , "<<<<<<----- story")
              console.log(apiData.data.outputs[0].id,  "<<<<<<----- id")
            

          // You can now use the 'apiData' in your code or send it as a response
          res.json(apiData);
             await  newData.save()


        } else {
          // Handle other response statuses if needed
          res.status(response.status).json({ error: 'Failed to fetch data' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

module.exports= router;

