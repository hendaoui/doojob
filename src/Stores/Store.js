import {action, observable} from 'mobx';
class AppStore {
  @observable showSpinner = false;
  @observable cameraPhoto = null;
  @observable cameraType = 'back';
  @observable cameraPurpose = null;
  @observable currentUser = null;
  @observable accessToken = null;

  @action toggleSpinner(state) {
    this.showSpinner = state;
  }

  @action saveCameraPhoto(photo) {
    this.cameraPhoto = photo ? 'data:image/png;base64,' + photo : null;
  }

  @action setCameraType(type) {
    this.cameraType = type;
  }

  @action setCameraPurpose(purpose = null) {
    this.cameraPurpose = purpose;
  }

  @action setCurrentUser(user = null) {
    this.currentUser = user;
  }
  
  @action setAccessToken(token = null) {
    this.accessToken = token;
  }
}

const Store = new AppStore();
export default Store;
