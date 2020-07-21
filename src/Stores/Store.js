import { action, observable } from 'mobx';

class AppStore {
    @observable showSpinner = false;
    @observable cameraPhoto = null;
    @observable cameraPurpose = null;

    @action toggleSpinner(state) {
        this.showSpinner = state;
    }

    @action saveCameraPhoto(photo) {
        this.cameraPhoto = photo ? "data:image/png;base64," + photo : null;
    }

    @action setCameraPurpose(purpose = null) {
        this.cameraPurpose = purpose;
    }
}

const Store = new AppStore();
export default Store;