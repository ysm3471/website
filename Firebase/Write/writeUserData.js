import {app} from '../FIrebaseClient';
import {getDatabase,ref,set,child,push,update} from 'firebase/database'

export default function writeUserData(uid, name,tag1,tag2, title,album, content,tag,thumbnail) {
  const db = getDatabase(app);

    // A post entry.
    const postData = {
      username: name,
      tag1,
      tag2,
      title,
      album,
      content,
      tag,
      thumbnail,
    };

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return update(ref(db), updates);
}