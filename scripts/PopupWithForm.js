import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupselector, callback) {
    super(popupselector);
    this._callback = callback;
  }

  __getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
