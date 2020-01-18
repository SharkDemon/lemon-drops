
const path = require('path');
const { app, Menu, Tray } = require('electron');

// eventually stores the Tray instance
let tray = null;

app.on('ready', () => {

    // hides the dock icon if running on MacOS
    if (app.dock) app.dock.hide();

    tray = new Tray(path.join(__dirname, '/Icon.png'));

    // if Windows, register click event listener to open menu
    if (process.platform === 'win32') {
        tray.on('click', tray.popUpContextMenu);
    }

    // build the menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click() { app.quit() }
        }
    ]);

    tray.setToolTip('Clipmaster');
    tray.setContextMenu(menu);
});

