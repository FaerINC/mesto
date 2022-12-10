export default class Userinfo {
  constructor({ profileName, profileAbout, profileAvatarka }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatarka = profileAvatarka
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
  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatarka.src = avatar
  }
}
