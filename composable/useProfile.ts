
export const useProfile = () => {

    const { status, data: session } = useAuth();

  return {
    isAuthenticated: computed(()=>status.value === "authenticated"),
    status: computed(()=> status.value),
    session: computed(()=> session.value),
    // isAuthenticated: false,
    // status: "unauthenticated",
    // session: null,
  }
}
