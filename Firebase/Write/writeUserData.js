import {app} from '../FIrebaseClient';
import {getDatabase,ref,set,child,push,update} from 'firebase/database'

export default function writeUserData(name,tag1,tag2, title,album, content,tag,thumbnail,time) {
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
      time,
    };

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + 'post/' + newPostKey] = postData;
  
    return update(ref(db), updates);
}