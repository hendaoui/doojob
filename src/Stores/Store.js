import { action, observable } from 'mobx';

class AppStore {
    @observable showSpinner = false;
    @observable cameraPhoto = null;
    @observable cameraType = "back";
    @observable cameraPurpose = null;

    @action toggleSpinner(state) {
        this.showSpinner = state;
    }

    @action saveCameraPhoto(photo) {
        this.cameraPhoto = photo ? "data:image/png;base64," + photo : null;
    }

    @action setCameraType(type) {
        this.cameraType = type;
    }

    @action setCameraPurpose(purpose = null) {
        this.cameraPurpose = purpose;
    }
}

const Store = new AppStore();
export default Store;