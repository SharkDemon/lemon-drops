
const path = require('path');
const { app, Menu, Tray, systemPreferences } = require('electron');

const clippings = [];
// eventually stores the Tray instance
let tray = null;

// check the platform and returns appropriate icon
const getIcon = () => {
    if (process.platform === 'win32') return 'icon-light@2x.ico';
    if (systemPreferences.isDarkMode()) return 'icon-light.png';
    return 'icon-dark.png';
};

app.on('ready', () => {
    // hides the dock icon if running on MacOS
    if (app.dock) app.dock.hide();

    tray = new Tray(path.join(__dirname, getIcon()));

    // if Windows, register click event listener to open menu
    if (process.platform === 'win32') {
        tray.on('click', tray.popUpContextMenu);
    }
    updateMenu();
    tray.setToolTip('Clipmaster');
});

const updateMenu = () => {
    // build the menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Create New Clipping',
            click() { null; }
        },
        { type: 'separator' },
        ...clippings.map( (clipping, index) => ({ label: clipping })),
        { type: 'separator' },
        {
            label: 'Quit',
            click() { app.quit() }
        }
    ]);
    tray.setContextMenu(menu);
};
