import { atomWithStorage } from "jotai/utils";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export const todosAtom = atomWithStorage<Todo[]>("todos", []);
