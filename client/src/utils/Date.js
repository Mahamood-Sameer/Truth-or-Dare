import date from "date-and-time";


var now = new Date();
const pattern = date.compile("ddd, MMM DD, HH:mm A");
now = date.format(now, pattern);


export default now;