[![npm version](https://badge.fury.io/js/%40essent%2Fnativescript-snackbar.svg)](https://www.npmjs.com/package/@essent/nativescript-snackbar)

# NativeScript Snackbar :lollipop: :chocolate_bar:

Use the Material Design Snackbar in your {N} app, iOS uses [Material Snackbar Cocoapod](https://material.io/develop/ios/components/snackbars/)

### Snackbar Usage

![Snackbar](./screens/snackbar.gif)

## Installation

### NativeScript 4x

`tns plugin add @essent/nativescript-snackbar`

## Usage

### TS

```typescript
import { SnackBar, SnackBarOptions } from "@essent/nativescript-snackbar";

// Create an instance of SnackBar
let snackbar = new SnackBar();

/// Show a simple snackbar with no actions
public showSimple() {
    snackbar.simple('Snackbar', 'red', '#fff').then((args) => {
         this.set('jsonResult', JSON.stringify(args));
   })
}

/// Show an Action snack bar
public showAction() {
  let options: SnackBarOptions = {
    actionText: this.get('actionText'),
    actionTextColor: '#ff4081', // Optional, Android only
    snackText: this.get('snackText'),
    textColor: '#346db2', // Optional, Android only
    hideDelay: 3500,
    backgroundColor: '#eaeaea' // Optional, Android only
  };

  snackbar.action(options).then((args) => {
    if (args.command === "Action") {
      this.set('jsonResult', JSON.stringify(args));
    } else {
      this.set('jsonResult', JSON.stringify(args));
    }
  });
}
```

### API

Show a simple SnackBar (color args will only work on Android)

* **simple(snackText: string, textColor?: string, backgroundColor?: string): Promise<any>**

Show a SnackBar with Action.

* **action(options: SnackBarOptions): Promise<any>**

Manually dismiss an active SnackBar

* **dismiss(): Promise<any>**

### SnackBarOptions Interface

* **actionText: string**
* **actionTextColor: string**
* **snackText: string**
* **hideDelay: number**
* **textColor: string**
* **backgroundColor: string**
