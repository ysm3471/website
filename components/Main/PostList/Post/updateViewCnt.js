import { getDatabase, onValue, query, ref, update } from 'firebase/database'
import { app } from '@/Firebase/FIrebaseClient';

export default function updateViewCnt(id) {
  const db = getDatabase(app);
  let cnt = 0;

  const viewcntRef = query(ref(db, `user-posts/post/${id}/viewcnt`)) ;

  onValue(viewcntRef, (snapshot) => {
    cnt = snapshot.val();
  });

  cnt++;
  const updates = {};
  updates[`/user-posts/post/${id}/viewcnt`] = cnt;    // 인자로 받은 postData를 배열형태로 저장함

  return update(ref(db), updates);  // 만든 배열을 새로 만든 post에 업데이트함
}