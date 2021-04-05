import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      // on map les utilisateurs
      usersData.map((user) => {
        // on verifie que les utilisateurs proposés ne sont pas les meme que l'utilsateur actuel
        // et on verifie que les utilisateurs proposés ne sont pas deja suivis par l'utilisateur actuel
        if (user._id !== userData._id && !user.followers.includes(userData._id))
        // en retour on push dans l'array vide les utilisateurs qu'on a mappé et qui correspondent aux conditions dans le if
          return array.push(user._id);
          return null
      });

      // pour eviter que les utilisateurs proposés soient toujours les memes
      // on randomise les propositions
      array.sort(() => 0.5 - Math.random());

      // on affiche le nombre de propositions par rapport à la taille de notre ecran
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }

      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint && friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
              // pour eviter d'avoir Array.prototype.map() expects a value to be returned at the end of arrow function il faut return null
              return null
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
