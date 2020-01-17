
const path = require('path');
const { app, Menu, Tray } = require('electron');

// eventually stores the Tray instance
let tray = null;

app.on('ready', () => {
    tray = new Tray(path.join(__dirname, '/Icon.png'));

    // on Windows, register click event listener to open menu
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

