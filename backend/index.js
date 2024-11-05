const express = require("express");
const app = express();
const PORT = 3000;
let fetchedData = null;
app.get("/", (req, res) => {
  res.send("Hii");
});
const fetchData = async () => {
  if (!fetchedData) {
    const response = await fetch("https://fakestoreapi.com/products");
    fetchedData = await response.json();
  } else console.log("No need to fetch Data");
  return fetchedData;
};
app.get("/products", async (req, res) => {
  const data = await fetchData();
  res.json(data);
});
app.get("/products/:category", async (req, res) => {
  try {
    let category = req.params.category;
    let products = await fetchData();
    const categoryItems = products.filter(
      (product) => product.category == category
    );
    res.json(categoryItems);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
