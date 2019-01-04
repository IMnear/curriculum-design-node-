var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('easy node')
    request('http://news.baidu.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //返回的body为抓到的网页的html内容
            var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
            var arr = [];
            $(".ulist.focuslistnews").each(function (index, element) { //下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
                var $eleItem = $(element).find('.bold-item a');
                var $eleItemSon = $(element).find('.bold-item ~ li a')
                arr.push({
                    title: $eleItem.text(),
                    href: $eleItem.attr('href'),
                    item: {
                        title: $eleItemSon.text(),
                        href: $eleItemSon.attr('href')
                    }
                });
            });
            res.send(arr);
        }
    })
});

module.exports = router;