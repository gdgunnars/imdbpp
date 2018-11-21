import { BehaviorSubject } from 'rxjs';

const LoadingSubject = new BehaviorSubject({});
const LoadingEvent = LoadingSubject.asObservable();

const showScreen = (screenKey) => {
  LoadingSubject.next({ [screenKey]: true });
};



const hideScreen = () => {
  LoadingSubject.next({});
};

export { LoadingEvent, showScreen, hideScreen };
