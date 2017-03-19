var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('fruits_store', {
    	member: req.session.member || null, 
    	fruit_store: '政大水果店' ,
    	store_dscrp:'政大最好吃水果店',
    	fruit_1_img:'http://www.wall001.com/photograph/fruit_strawberry/mxxx01/fruit_strawberry_wallpaper_Vol_014_SN156.JPG',
    	fruit_1_name:'新鮮有機大湖草莓',
    	fruit_1_price:'400',
    	fruit_1_unit:'300g/1盒',
    	fruit_1_dscrp:'新鮮草莓薰红的季節，酸酸甜甜扣人心弦的好滋味不能錯過。 一顆顆熟透的草莓，深红心形外觀，鲜嫩欲滴，這股紅色魅力，讓人欲罷不能!',
    	fruit_2_img:'http://www.17itaiwan.tw/sendbinary.asp?path=4540107475&Width=270',
    	fruit_2_name:'台南七股哈密瓜',
    	fruit_2_price:'500',
    	fruit_2_unit:'250g/1顆',
    	fruit_3_img:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSwD19H9mBn3w-rxSIJWwn5oN41090_5QnwkD1swZzKCGxxWmSZag',
    	fruit_3_name:'阿牛聖女番茄',
    	fruit_3_price:'300',
    	fruit_3_unit:'500g/1盒'
    });
});

module.exports = router;
