export const getAvatarUrl = (avatarId: number | string) => {
  const id = Math.min(8, Math.max(1, parseInt(String(avatarId), 10)))

  return new URL(`../assets/avatars/${id}.png`, import.meta.url).href
}
