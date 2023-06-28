import { app } from '../FIrebaseClient';
import { getDatabase, ref, child, push, update } from 'firebase/database'

export default function writeUserData(name, tag1, tag2, title, album, content, tag, thumbnail, time) {
  const db = getDatabase(app);

  const postData = {
    username: name,
    tag1,
    tag2,
    title,
    album,
    content,
    tag,
    thumbnail,
    time,
    viewcnt:0
  };

  const newPostKey = push(child(ref(db), '/user-posts/post/')).key; // post에 key를 부여하면서 생성 후 키를 받음


  const updates = {};
  updates['/user-posts/post/' + newPostKey] = postData;    // 인자로 받은 postData를 배열형태로 저장함

  return update(ref(db), updates);  // 만든 배열을 새로 만든 post에 업데이트함
}