import { save } from './reducer'

const SAVE_INTERVAL = 2000;

export default(store) => {
  setInterval(() => {
    store.dispatch(save());
  }, SAVE_INTERVAL);
}
