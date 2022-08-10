import { AppStateEnum, UserRole, UserStatus } from "./enums.js";
import { loggedInStateDOM, registrationStateDom, signInStateDOM } from "./formDOM.js";
import { FormFieldDict } from "./shared-types.js";
import { AppStateStore } from "./state-store.js";
import { User } from "./user.js";
import { UsersAPI } from "./users-api-client.js";
import { ValidationConfig, ValidationResult } from "./validate.js";

class UsersController {
  mainSection = document.getElementById("main-section") as HTMLElement;
  loginButton = document.getElementById("login-button") as HTMLButtonElement;
  registerButton = document.getElementById("register-button") as HTMLButtonElement;
  protected addUserForm = document.getElementById("add-user-form")! as HTMLFormElement;
  erorrsDiv = document.getElementById("errors")! as HTMLElement;

  init() {
    this.loginButton.addEventListener("click", () => { this.changeAppState() });
    this.registerButton.addEventListener("click", () => { this.GoToRegistration() });
    this.addUserForm.addEventListener("change", this.validateForm, true);
    this.mainSection.innerHTML = signInStateDOM();
  }

    private GoToRegistration() {
      AppStateStore.appState = AppStateEnum.REGISTRATION;
      this.mainSection.innerHTML = registrationStateDom();
      this.registerButton.style.display = 'none';
      this.loginButton.innerText = 'Register';
    }

    getUserFormSnapshot(addUserForm: HTMLFormElement): User {
        const formData = new FormData(addUserForm);
        const user: FormFieldDict<string> = {};
        formData.forEach((value, key) => {
          user[key] = value.toString();
        });
        return new User(
            user.firstName,
            user.lastName,
            user.username,
            user.password,
            user.gender,
            UserRole.USER,
            user.userPicture,
            user.description,
            UserStatus.ACTIVE,
            new Date(),
            new Date(),
        );
      }

  private async changeAppState() {
    try {
      this.validateForm;
    this.erorrsDiv.innerHTML = '';
    if (AppStateStore.appState === AppStateEnum.SIGNIN) {
    const user = this.getUserFormSnapshot(this.addUserForm);
    const allUsers = await UsersAPI.getAllUsers();
    if(user.username === ''){
      throw 'Please enter some data';
    }
    const match = allUsers.filter(us => us.username === user.username && us.password === us.password)
    if(match.length > 0){
      AppStateStore.appState = AppStateEnum.LOGGEDIN;
      this.mainSection.innerHTML = loggedInStateDOM(match[0]);
      this.registerButton.style.display = 'none';
      this.loginButton.innerText = 'Log out';
    } else {
        throw('Username or the password does not exist in the database.');
    }
    } else if (AppStateStore.appState === AppStateEnum.REGISTRATION) {
      if(document.getElementsByClassName('err').length === 0){
        const user = this.getUserFormSnapshot(this.addUserForm);
        if(user.username === ''){
          throw 'Please enter some data';
        }
        const userSubmit = await UsersAPI.addNewUser(user);
        AppStateStore.appState = AppStateEnum.LOGGEDIN;
        this.mainSection.innerHTML = loggedInStateDOM(user);
        this.registerButton.style.display = 'none';
        this.loginButton.innerText = 'Log out';
      } else {
        throw('You still have validation errors!');
      }
      } else if (AppStateStore.appState === AppStateEnum.LOGGEDIN) {
      AppStateStore.appState = AppStateEnum.SIGNIN;
      this.mainSection.innerHTML = signInStateDOM();
      this.loginButton.innerText = 'Login';
      this.registerButton.style.display = 'block';
    }
  } catch(err){
    this.showError(err);
  }
  }

  validateForm = (event: Event) => {
    this.erorrsDiv.innerHTML = '';
    const validationResult: ValidationResult<User> = {};
    const config = AppStateStore.postFormValidationConfig;
    const formSnapshot = this.getUserFormSnapshot(this.addUserForm);
    let field: keyof ValidationConfig<User>;
    for (field in config) {
      const validator = config[field];
      const validationErrors: string[] = [];
      if (validator !== undefined) {
        if (Array.isArray(validator)) {
          // Type guard
          validator.forEach((rule) => {
            try {
              const snap = formSnapshot[field]; // it must be separated in a constant otherwise the ternary operator does not work
              rule(snap ? snap.toString() : "", field); //When snap is NaN for number fields(empty) it will become empty string
            } catch (err) {
              validationErrors.push(err as string);
            }
          });
          if (validationErrors.length > 0) {  //Add all validation errors from the forEach loop
            validationResult[field] = validationErrors;
          }
        } else {
          try {
            validator(formSnapshot[field]!.toString(), field);
          } catch (err) {
            validationResult[field] = [err as string];
          }
        }
      }
    }
    if(AppStateStore.appState === AppStateEnum.REGISTRATION){
    this.showValidationErrors(validationResult);
    }
  };

  showValidationErrors(validationResult: ValidationResult<User>) {
    AppStateStore.postFormErrors = [];
    console.log(document.getElementsByClassName('err').length);
    for(const element of document.getElementsByClassName('err')){
      for(const child of element.childNodes){
      (child as HTMLElement).remove();
      element.remove();
      }
    }
    let field: keyof ValidationResult<User>;
    for (field in validationResult) {
      const fieldError = `${field}Error`;
      const fieldErrorSpan = document.getElementById(fieldError);
      const filedErrors = validationResult[field];
      if (filedErrors !== undefined) {
        for (const err of filedErrors) {
          AppStateStore.postFormErrors.push(`${field} -> ${err}<br>`);
          if(fieldErrorSpan){
          fieldErrorSpan.innerHTML += (`<div class='err'>${field} -> ${err}<br></div>`);
          }
        }
      }
    }
    this.showError(AppStateStore.postFormErrors.join('')); // default is ,
  }
  showError(err: any) {
    this.erorrsDiv.innerHTML = `<div>${err}</div>`;
  }
}

const usersController = new UsersController();

usersController.init();
