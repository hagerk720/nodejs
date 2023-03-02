class Ticket {
  id;
  seatNum;
  flightNum;
  departure;
  arrival;
  date;
  constructor(id, seatNum, flightNum, departure, arrival, date) {
    this.id = id;
    this.seatNum = seatNum;
    this.flightNum = flightNum;
    this.departure = departure;
    this.arrival = arrival;
    this.date = date;
  }
}
module.exports = {
  Ticket,
  
};
