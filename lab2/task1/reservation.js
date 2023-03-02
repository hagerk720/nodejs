class Reservation {
  tickets = [];
  addTicket(ticket) {
    this.tickets.push(ticket);
  }
  displayTicket(id) {
    let ticket = this.tickets.find((t) => t.id == id);
    if (ticket) {
      console.log(ticket);
    }
  }
  updateTicket(id, ticket) {
    this.tickets.map((t) => {
      if (t.id == id && ticket.id == id) {
        return (t = ticket);
      }
    });
  }
  displayAllTickets() {
    this.tickets.forEach((t) => console.log(t));
  }
}
module.exports = {
  Reservation,
};
