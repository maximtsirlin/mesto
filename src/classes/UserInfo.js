export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._profileAvatar = document.querySelector(avatarSelector);

  }

  getUserInfo() {
    const name = this._nameElement.textContent;
    const info = this._infoElement.textContent;
    const avatar = this._profileAvatar.src;
    return { name, info, avatar };
  }

  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = job;
    this._profileAvatar.textContent = avatar;
  }
}
