var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/forsale');

router.get('/', function(req, res) {
    var collection = db.get('items');
    collection.find({}, function(err, items) {
        if (err) throw err;
        res.json(items);
    });
});

router.post('/', function(req, res) {
    var collection = db.get('items');
    collection.insert({
        title: req.body.title,
        start_price: req.body.startprice,
        description: req.body.description,
        comments: [],
        start_time: new Date().getTime(),
        end_time: new Date().getTime() + parseInt(req.body.endtime) * 60000,
        bids: []
    }, function(err, item) {
        if (err) throw err;

        res.json(item);
    });
});
router.get('/:id', function(req, res) {
    var collection = db.get('items');
    collection.findOne({
        _id: req.params.id
    }, function(err, item) {
        if (err) throw err;

        res.json(item);
    });
});

router.put('/:id', function(req, res) {
    var collection = db.get('items');
    collection.update({
        _id: req.params.id
    }, {
        $set: {
            comments: req.body.comments
        }
    }, function(err, item) {
        if (err) throw err;

        res.json(item);
    });
});


module.exports = router;