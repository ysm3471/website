export default async function getLen(page) {
  let respone;
  if (page === "all") respone = await fetch(`https://forum-641a9-default-rtdb.asia-southeast1.firebasedatabase.app/user-posts/post.json?shallow=true`);
  else respone = await fetch(`https://forum-641a9-default-rtdb.asia-southeast1.firebasedatabase.app/user-posts/post.json?orderBy=%22tag1%22&equalTo=%22${page}%22`);

  const result = await respone.json();

  return result;
}