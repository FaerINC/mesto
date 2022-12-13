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

  getServerProfileInfo({name, about, avatar, cohort, _id}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._cohort = cohort;
    this.id = _id;
  }

  renderProfile() {
    this._profileName.textContent = this._name;
    this._profileAbout.textContent = this._about;
  }
  //редактим инфу профиля
  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }

  renderAvatarServer() {
    this._profileAvatarka.src = this._avatar;
  }

  renderAvatar(avatar) {
    this._profileAvatarka.src = avatar;
  }
}
