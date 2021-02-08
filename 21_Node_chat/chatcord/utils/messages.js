///////////////////////////
//1․Այստեղ օգտագործում ենք "moment" մոդուլը հաղղորդագրության ժամանակագրության և տեսքը ապահովելու համար

const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
