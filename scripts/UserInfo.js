export default class Userinfo {
  constructor({ profileName, profileAbout }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  }
  // достали значения со страницы
  getUserInfo() {
    const profileValues = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };

    return profileValues;
  }
  //редактим инфу профиля
  setUserInfo({ inputAddName, inputAddAbout }) {
    this._profileName.textContent = inputAddName;
    this._profileAbout.textContent = inputAddAbout;
  }
}
