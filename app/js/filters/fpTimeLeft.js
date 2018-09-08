function fpTimeLeft() {
var moment = require('moment');

//This filter is used for time 
 return function(date) {
       if (!date) return null;

       var diff = moment(date).diff(moment());
       // in milliseconds
       var duration = moment.duration(diff);

       if (duration.years() > 0) {
           return duration.years() + 'y & ' + duration.months() + 'm';
       } else if (duration.months() > 0) {
           return duration.months() + 'm & ' + duration.days() + 'd';
       } else if (duration.days() > 0) {
           return duration.days() + 'd & ' + duration.hours() + 'h';
       } else if (duration.hours() > 0) {
           return duration.hours() + 'h & ' + duration.minutes() + 'm';
       } else if (duration.minutes() > 0) {
           return duration.minutes() + 'm';
       }else
       {
           return null;
       }
   }
}

export default {
 name: 'fpTimeLeft',
 fn: fpTimeLeft
};