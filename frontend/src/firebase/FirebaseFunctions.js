import firebase from 'firebase/compat/app';

async function doCreateUserWithEmailAndPassword(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({ email: email })
}

// async function doChangePassword(email, oldPassword, newPassword) {
//     let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
//     await firebase.auth().currentUser.reauthenticateWithCredential(credential);
//     await firebase.auth().currentUser.updatePassword(newPassword);
//     await doSignOut();
// }

async function doSignInUserWithEmailAndPassword(email, password) {
    await firebase.auth().signInUserWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
    let socialProcider = null;
    if (provider === 'google') {
        socialProcider = new firebase.auth.GoogleAuthProvider();
    }
    await firebase.auth().signInWithPopup(socialProcider);
}


// async function doPasswordReset(email) {
//     await firebase.auth().sendPasswordReset(email);
// }

// async function doPasswordUpdate(email) {
//     await firebase.auth().passwordUpdate(email);
// }

async function doSignOut() {
    await firebase.auth().signOut();
}


export {
    doCreateUserWithEmailAndPassword,
    // doChangePassword,
    doSignInUserWithEmailAndPassword,
    doSocialSignIn,
    // doPasswordReset,
    // doPasswordUpdate
    doSignOut
};