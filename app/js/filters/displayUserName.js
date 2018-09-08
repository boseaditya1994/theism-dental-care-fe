function displayUserName() {

return function(user) {
        if (!user) return null;
        return user.firstName + ' ' + user.lastName;
    }
}

export default {
  name: 'displayUserName',
  fn: displayUserName
};