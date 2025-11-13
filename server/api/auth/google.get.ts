export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        id: user.sub,
        name: user.name,
        email: user.email,
        image: user.picture,
        provider: 'google'
      },
      loggedInAt: new Date()
    })
    
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/?error=google-auth-failed')
  }
})