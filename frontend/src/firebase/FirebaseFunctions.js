import firebase from 'firebase/compat/app';

async function doCreateUserWithEmailAndPassword(email, password) {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await doSignOut();
    return user.uid;
}

async function doSignInUserWithEmailAndPassword(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
    let socialProcider = null;
    if (provider === 'google') {
        socialProcider = new firebase.auth.GoogleAuthProvider();
    }
    await firebase.auth().signInWithPopup(socialProcider);
}

async function doSignOut() {
    await firebase.auth().signOut();
}

// async function doChangePassword(email, oldPassword, newPassword) {
//     let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
//     await firebase.auth().currentUser.reauthenticateWithCredential(credential);
//     await firebase.auth().currentUser.updatePassword(newPassword);
//     await doSignOut();
// }

// async function doPasswordReset(email) {
//     await firebase.auth().sendPasswordReset(email);
// }

// async function doPasswordUpdate(email) {
//     await firebase.auth().passwordUpdate(email);
// }


export {
    doCreateUserWithEmailAndPassword,
    doSignInUserWithEmailAndPassword,
    doSocialSignIn,
    doSignOut,
    // doChangePassword,
    // doPasswordReset,
    // doPasswordUpdate
};