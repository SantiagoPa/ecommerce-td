export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        id: String(user.id),
        name: user.name || user.login,
        email: user.email,
        image: user.avatar_url,
        provider: 'github'
      },
      loggedInAt: new Date()
    })
    
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/?error=github-auth-failed')
  }
})