/**
 * Get youtube video id form url.
 * Return false if not matched any.
 */
export default function getYtVideoId(url: string) {
  const regExp =
    /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i;
  const match = url.match(regExp);
  return match && match[1]?.length === 11 ? match[1] : false;
}
