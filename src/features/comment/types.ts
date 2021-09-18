import {user} from "../user/types";

export type comment = {
  comment: {
    id: number,
    text: string
  },
  nominees: user[],
  user: user,
  reaction_count: number
};
