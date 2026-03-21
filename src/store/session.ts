import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isLoaded: boolean,
  session: Session | null,
}

const initialState = {
  isLoaded: false,
  session: null
} as State;

const useSessionStore = create(combine(initialState, (set) => ({
    actions: {
      setSession: (session: Session | null) => {
        set({ session, isLoaded: true });
      }
    }
  }),
  {
    name: "sessionStore"
  }
));

export const useSession = () => {
  return useSessionStore(store => store.session);
};

export const useIsSessionLoaded = () => {
  return useSessionStore(store => store.isLoaded);
};

export const useSetSession = () => {
  return useSessionStore((store) => store.actions.setSession);
};