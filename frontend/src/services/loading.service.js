import { BehaviorSubject } from 'rxjs';

const LoadingSubject = new BehaviorSubject(false);
const LoadingEvent = LoadingSubject.asObservable();

const showLoadingScreen = () => {
  LoadingSubject.next(true);
};

const hideLoadingScreen = () => {
  LoadingSubject.next(false);
};

export { LoadingEvent, showLoadingScreen, hideLoadingScreen };
