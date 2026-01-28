export function getUserDetails(){
    const userDetails = localStorage.getItem("userDetails")
      if(userDetails!=null){
        const currUser = JSON.parse(userDetails)
        return currUser
      }
}