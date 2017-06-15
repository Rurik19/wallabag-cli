import { showInfo } from '../../cli-ui';

export const action = (args, callback) => {
            showInfo();
            callback();
      };
