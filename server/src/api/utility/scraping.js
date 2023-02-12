const axios = require("axios");
const cheerio = require("cheerio");
const Product = require('../models/products');


const scrape = () => {
    const productsData = []
    axios.get('https://fruitguys.co.il/product-category/fruits-and-vegetables/vegetables/').then((response) => {
        extracted(response, productsData, "vegetable");
    }).then(() => axios.get('https://fruitguys.co.il/product-category/fruits-and-vegetables/fruits/').then((response) => {
        extracted(response, productsData, 'fruit');
    }));
}

function extracted(response, productsData, category) {
    const body = response.data;
    const $ = cheerio.load(body);
    const products = $(".type-product");

    products.each((index, el) => {
        const product = {};
        let price = $(el).find('div > div.product_veg_weight_unit__price > div.product_veg_weight_reg_price > span').text().match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g);
        price === null ? price = $(el).find('div > div.product_veg_weight_reg_price > span.product_veg_regular').text().match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g) : null;
        product.name = $(el).find('h2').text();
        product.price = price === null ? 10 : parseFloat(price[0]);
        product.imgUrl = $(el).find('img').attr('src');
        product.productType = category;
        product.isKosher = Math.random() < 0.5;
        product.description = "";
        product.priceUnits = "קילו";
        product.availability = true;
        product.quantityPerPrice = 1;
        product.id = Math.round(Math.random() * (99999 - 9999));

        const newProduct = new Product(product);
        newProduct.save();
    });
}
module.exports = scrape;
