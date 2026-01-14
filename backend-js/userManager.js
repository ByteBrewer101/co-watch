const UserManager={
    users : [],
    setUsers : function(newUsers){
        this.users = newUsers
    },
}



export function activateUser(id, userName, roomName) {
  const currUser = { id, userName, roomName };

  

  UserManager.setUsers([
    UserManager.users.filter((usr) => usr.id != id),
    ...currUser,
  ]);
  return currUser;
}

export function deactivateUser(id) {
  UserManager.setUsers(UsersState.users.filter((usr) => usr.id !== id));
}

export function getUser(id) {
  return UserManager.users.find((usr) => usr.id == id);
}

export function getUsersInRoom(roomName) {
  return UserManager.users.filter((usr) => usr.roomName === roomName);
}
