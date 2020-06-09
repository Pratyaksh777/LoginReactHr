import { apiRequest } from "../actions/api";
import { LOGIN } from "../actions/auth";

const SERVER_URL = `http://localhost:3333`;

export const appMiddleware = () => next => action => {
  next(action);
  switch (action.type) {
    case LOGIN: {
      next(
        apiRequest({
          url: `${SERVER_URL}/interviewees/1`,
          method: "POST",
          data: action.payload
        })
      );
      break;
    }
    default:
      break;
  }
};