export const useProfile = () => {
    const { status, data: session, signIn, signOut } = useAuth();

    return {
        isAuthenticated: computed(() => status.value === "authenticated"),
        status: computed(() => status.value),
        session: computed(() => session.value),
        signIn,
        signOut,
        // isAuthenticated: computed(() => false),
        // status: computed(()=>"unauthenticated"),
        // session: computed(()=>null),
        // signIn: ()=>console.log("signIn"),
        // signOut: ()=>console.log("signOut"),
    }
}