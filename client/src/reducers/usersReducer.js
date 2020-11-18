import update from "react-addons-update";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "../constants/actionTypes";

const initStore = {
  user: {
    userId: "ant",
    userName: "Ant User",
    userPhoto: "/api/images/ant.png",
    bot: false,
    userAbout:
      "Ants are eusocial insects of the family Formicidae and, along with the related wasps and bees, belong to the order Hymenoptera. Ants appear in the fossil record across the globe in considerable diversity during the latest Early Cretaceous and early Late Cretaceous, suggesting an earlier origin.",
  },
  error: {},
};

export const usersReducer = (store = initStore, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(store, {
        user: {
          $set: action.payload.user,
        },
        error: {
          $set: {},
        },
      });
    case LOGIN_ERROR:
      return update(store, {
        error: {
          $set: action.payload.error,
        },
      });
    case LOGOUT_SUCCESS:
      return update(store, {
        user: {
          $set: null,
        },
        error: {
          $set: {},
        },
      });
    case LOGOUT_ERROR:
      return update(store, {
        error: {
          $set: {},
        },
      });
    default:
      return store;
  }
};
