 import React from 'react'
 

 
 const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?.id ? users[1].name : users[0].name;
};

 const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser.id ? users[1] : users[0];
};


export  {getSender, getSenderFull};
//export default getSender;
