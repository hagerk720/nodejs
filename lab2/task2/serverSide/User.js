class User {
  name;
  mobile;
  email;
  address;
  constructor(name, mobile, email, address) {
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.address = address;
  }
}
module.exports = {
  User,
};
