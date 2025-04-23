const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

// 🔥 Add this
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";




app.post("/submit", async (req, res) => {
    try {
        const jsonData = req.body; // now properly parsed
        const response = await axios.post(`${BACKEND_URL}/submit`, jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        res.send(`Response from Flask: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.send(error.response?.data || "Error communicating with backend");
    }
});

app.get("/data", async (req, res) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/data`);
      res.render("data", { entries: response.data });
    } catch (error) {
      console.error(error);
      res.send("Failed to fetch data");
    }
  });

  app.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/data`);
      const entries = response.data;
      res.render("form", { entries }); // ✅ Pass entries to the EJS template
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.render("form", { entries: [] }); // fallback to empty
    }
  });
  
  



app.listen(3000, () => {
  console.log("Frontend running on http://localhost:3000");
});
