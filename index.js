const express = require("express");
const app = express();
const config = require("./utils/config");

const merchant_model = require("./models/merchant");

app.use(express.static('build'))
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "/");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/api/", async (req, res) => {
    const response = await merchant_model.getMerchants()
    try {
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error)
    }
});

app.post('/api/merchants', async (req, res) => {
    const response = await merchant_model.createMerchant(req.body)
    try {
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/api/merchants/:id', async (req, res) => {
    const response = await merchant_model.deleteMerchant(req.params.id)
    try {
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(config.PORT, () => {
  console.log(`Server listenning on port ${config.PORT}`);
});
