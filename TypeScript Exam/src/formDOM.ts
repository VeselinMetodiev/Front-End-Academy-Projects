import { User } from "./user"

export function signInStateDOM() {
    return `
    <h1 class="header center orange-text">Login</h1>
        <div class="container">
        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" required>
        <span id="usernameError" class="helper-text" data-error="wrong" data-success="right"></span>
        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required>
        <span id="passwordError" class="helper-text" data-error="wrong" data-success="right"></span>
        </div>
      `
}

export function registrationStateDom() {
    return `
    <h1 class="header center orange-text">Registration</h1>
        <div class="container">
          <label for="firstName"><b>First Name</b></label>
          <input type="text" placeholder="Enter first name" name="firstName" required>
          <span id="firstNameError" class="helper-text" data-error="wrong" data-success="right"></span>
          <label for="lastName"><b>Last Name</b></label>
          <input type="text" placeholder="Enter last name" name="lastName" required>
          <span id="lastNameError" class="helper-text" data-error="wrong" data-success="right"></span>
          <label for="gender"><b>Gender</b></label>
          <input type="text" placeholder="Enter gender" name="gender" required>
          <span id="genderError" class="helper-text" data-error="wrong" data-success="right"></span>
          <label for="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" required>
          <span id="usernameError" class="helper-text" data-error="wrong" data-success="right"></span>
          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required>
          <span id="passwordError" class="helper-text" data-error="wrong" data-success="right"></span>
          <label for="userPicture"><b>Picture</b></label>
          <input type="text" placeholder="imageURL" name="userPicture" required>
          <span id="userPictureError" class="helper-text" data-error="wrong" data-success="right"></span>
          <label for="description"><b>Description</b></label>
          <input type="text" placeholder="Enter your description" name="description">
          <span id="descriptionError" class="helper-text" data-error="wrong" data-success="right"></span>
        </div>
      `
}

export function loggedInStateDOM(user: User) {
    return `<h1>Congrats ${user.firstName} - ${user.userRole} You successfully logged in!</h1>`
}