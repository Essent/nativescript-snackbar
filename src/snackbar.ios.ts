import { SnackBarOptions } from './index';
import { Accuracy } from 'tns-core-modules/ui/enums';

declare const MDCSnackbarManager: any;
declare const MDCSnackbarMessage: any;
declare const MDCSnackbarMessageAction: any;

export class SnackBar {
  private _snackbar = null;
  private _isDismissedManual: boolean = false;

  public simple(snackText: string) {
    return new Promise((resolve, reject) => {
      const timeout = 3;
      try {
        this._snackbar = new MDCSnackbarMessage();
        this._snackbar.duration = timeout;
        this._snackbar.text = snackText;
        this._snackbar.completionHandler = function(b: boolean) {
          resolve({
            command: 'Dismiss',
            reason: b ? 'Swipe' : 'Timeout',
            event: ''
          });
        };
        MDCSnackbarManager.showMessage(this._snackbar);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public action(options: SnackBarOptions) {
    return new Promise((resolve, reject) => {
      try {
        if (!options.hideDelay) options.hideDelay = 3000;

        this._snackbar = new MDCSnackbarMessage();
        this._snackbar.duration = options.hideDelay / 1000;
        this._snackbar.text = options.snackText;
        this._snackbar.completionHandler = function(b: boolean) {
          resolve({
            command: 'Dismiss',
            reason: b ? 'Swipe' : 'Timeout',
            event: ''
          });
        };

        let action = new MDCSnackbarMessageAction();
        action.handler = function() {
          resolve({
            command: 'Action',
            event: ''
          });
        };
        action.title = options.actionText;
        this._snackbar.action = action;
        MDCSnackbarManager.showMessage(this._snackbar);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public dismiss(options) {
    return new Promise((resolve, reject) => {
      if (this._snackbar !== null && this._snackbar != 'undefined') {
        try {
          this._isDismissedManual = true;
          MDCSnackbarManager.dismissAndCallCompletionBlocksWithCategory(null);

          //Return AFTER the item is dismissed, 200ms delay
          setTimeout(() => {
            resolve({
              action: 'Dismiss',
              reason: 'Manual'
            });
          }, 200);
        } catch (ex) {
          reject(ex);
        }
      } else {
        resolve({
          action: 'None',
          message: 'No actionbar to dismiss'
        });
      }
    });
  }
}
