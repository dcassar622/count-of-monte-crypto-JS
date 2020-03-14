export function setupDBListener(User, userDB) {
  //realtime database listener
  db.collection("users")
    .doc(userDB.uid)
    .collection("entries")
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        User.renderEntries();
      });
    });
}
