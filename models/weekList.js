const mongoose = require('mongoose');

const weekListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
    }
});

const WeekList = mongoose.model('WeekList', weekListSchema);

module.exports = WeekList;
