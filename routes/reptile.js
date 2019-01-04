var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('easy node')
    request('https://www.guahao.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //返回的body为抓到的网页的html内容
            console.log('??')
            var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
            var navText = $('.g-container').html(); //拿到导航栏的内容
            res.send(navText);
        }
    })
});

module.exports = router;