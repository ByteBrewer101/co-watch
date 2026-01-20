const UserManager={
    users : [],
    setUsers : function(newUsers){
        this.users = newUsers
    },
}



export function activateUser(id, userName, roomId) {
  const currUser = { id, userName, roomId };

  

  UserManager.setUsers([
    ...UserManager.users.filter((usr) => usr.id != id),
    currUser,
  ]);
  return currUser;
}

export function deactivateUser(id) {
  UserManager.setUsers(UserManager.users.filter((usr) => usr.id !== id));
}

export function getUserInfo(id) {
  return UserManager.users.find((usr) => usr.id == id);
}

export function getUsersInRoom(roomId) {
  return UserManager.users.filter((usr) => usr.roomId === roomId);
}
