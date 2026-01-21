const UserManager = {
  users: [],
  setUsers: function (newUsers) {
    this.users = newUsers
  },
}



function activateUser(id, userName, roomId) {
  const currUser = { id, userName, roomId };



  UserManager.setUsers([
    ...UserManager.users.filter((usr) => usr.id != id),
    currUser,
  ]);
  return currUser;
}

function deactivateUser(id) {
  UserManager.setUsers(UserManager.users.filter((usr) => usr.id !== id));
}

function getUserInfo(id) {
  return UserManager.users.find((usr) => usr.id == id);
}

function getUsersInRoom(roomId) {
  return UserManager.users.filter((usr) => usr.roomId === roomId);
}


module.exports = {
  activateUser,
  deactivateUser,
  getUserInfo,
  getUsersInRoom,
};