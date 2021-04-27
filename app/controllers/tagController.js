const { Tag } = require('../models');

const tagController = {
    showTags: (req, res) => {
        Tag.findAll().then(tags => {
            res.render('tags', { tags });
        });
    }
};

module.exports = tagController;