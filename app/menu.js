import { app, dialog, Menu, shell, ipcMain } from 'electron';
const fs = require('fs')

export default class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    ipcMain.on('editor-loaded', (event, arg) => {
      console.log(`[ipcMain] got message from menu ${arg}`);
      this.editor = event.sender;
    });
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu; 
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDefaultTemplate() {
    let saveOk = true;
    let selectedFilePath = '';
    
    const templateDefault = [
      {
        label: '&파일',
        submenu: [
          {
            label: '&새로 만들기',
            accelerator: 'Ctrl+N'
          },
          {
            label: '&열기',
            accelerator: 'Ctrl+O',
            click: () => {
              dialog.showOpenDialog(
                {
                  properties: ['openFile'],
                  title: 'PageBuilder 파일 열기',
                  filters: [
                    { name: 'HTML', extensions: ['htm', 'html'] },
                    { name: 'CSS', extensions: ['css'] },
                    { name: 'Javascript', extensions: ['js'] },
                    { name: 'All Files', extensions: ['*'] }
                  ]
                },
                files => {
                  if (files.length === 1) {
                    if(files[0].match(/(.html)$/)){
                      this.editor.send('file-open', files[0]); //선택한 파일의 경로. ex)/Users/clbeemac3/Desktop/test_index/index.html
                      var htmlPathArray = files[0].split("\\")
                      for(let i=0; i<htmlPathArray.length; i++){
                        if (htmlPathArray[i].match(/(.html)$/)){
                          this.mainWindow.setTitle(`[ ${htmlPathArray[i]} ] - PageBuilder`)
                        }
                      }
                    }
                    
                    if(files[0].match(/(.js)$/)){
                      this.editor.send('js-open', files[0]);
                    }
                   
                    if(files[0].match(/(.css)$/)){
                      this.editor.send('css-open', files[0]);
                    }
                    
                    saveOk = false;
                    selectedFilePath = files;
                  }
                }
              );
            }
          },
          {
            label: '&저장',
            accelerator: 'Ctrl+S',
            click: () => {
              if (saveOk) {
                dialog.showSaveDialog(
                  {
                    properties: ['saveFile'],
                    title: 'PageBuilder 저장'
                  },
                  files => {
                    this.editor.send('html-save', files);
                    saveOk = false;
                    selectedFilePath = files;
                    console.log('==title1==\n' + app.title);
                  }
                );
              } else {
                this.editor.send('html-save', selectedFilePath);
              }
            }
          },
          {
            label: '&다른이름으로 저장',
            accelerator: 'Ctrl+A',
            click: () => {
              dialog.showSaveDialog(
                {
                  properties: ['saveAsFile'],
                  title: 'PageBuilder 다른이름으로 저장'
                },
                files => {
                  this.editor.send('html-saveAs', files);
                }
              );
            }
          },
          {
            label: '&인쇄',
            accelerator: 'Ctrl+P'
          },
          {
            label: '&내보내기',
            accelerator: 'Ctrl+Q'
          },
          {
            label: '&닫기',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&보기',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                }
              ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/atom/electron/tree/master/docs#readme'
              );
            }
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];

    return templateDefault;
  }

  buildDarwinTemplate() {
    let saveOk = true;
    let selectedFilePath = '';

    const subMenuAbout = {
      label: 'PageBuilder',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };

    const subMenuFile = {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'Command+N',
          selector: 'new file',
          click: () => {
            console.log("new file")
          }
        },
        {
          label: 'Open...',
          accelerator: 'Command+O',
          click: () => {
            dialog.showOpenDialog(
              {
                properties: ['openFile'],
                title: 'PageBuilder 파일 열기',
                filters: [
                  { name: 'HTML', extensions: ['htm', 'html'] },
                  { name: 'CSS', extensions: ['css'] },
                  { name: 'Javascript', extensions: ['js'] },
                  { name: 'All Files', extensions: ['*'] }
                ]
              },
              files => {
                if (files.length === 1) {
                  if(files[0].match(/(.html)$/)){
                    this.editor.send('file-open', files[0]); //선택한 파일의 경로. ex)/Users/clbeemac3/Desktop/sample_html/index.html
                    var htmlPathArray = files[0].split("/")
                    for(let i=0; i<htmlPathArray.length; i++){
                      if (htmlPathArray[i].match(/(.html)$/)){
                        this.mainWindow.setTitle(`[ ${htmlPathArray[i]} ] - PageBuilder`)
                        var folderPath = files[0].replace(htmlPathArray[i],''); //특정문자 제거
                        
                      }
                    }
                    fs.readdir(folderPath+'css', function(error, cssList){
                      console.log('---------cssList-----------')
                      console.log(cssList);
                      this.editor.send('css-list', cssList)
                    })
                    fs.readdir(folderPath+'js', function(error, jsList){
                      console.log('---------jsList-----------')
                      console.log(jsList);
                      this.editor.send('js-list', jsList)
                    })
                  }
                  
                  if(files[0].match(/(.js)$/)){
                    this.editor.send('js-open', files[0]);
                  }
                 
                  if(files[0].match(/(.css)$/)){
                    this.editor.send('css-open', files[0]);
                  }
                  
                  saveOk = false;
                  selectedFilePath = files;
                }
              }
            );
          }
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'Command+S',
          click: () => {
            if (saveOk) {
              dialog.showSaveDialog(
                {
                  properties: ['saveFile'],
                  title: 'PageBuilder 저장'
                },
                files => {
                  this.editor.send('html-save', files);
                  saveOk = false;
                  selectedFilePath = files;
                  console.log('==title1==\n' + app.title);
                }
              );
            } else {
              this.editor.send('html-save', selectedFilePath);
            }
          }
        },
        {
          label: 'Save as...',
          accelerator: 'Command+A',
          click: () => {
            dialog.showSaveDialog(
              {
                properties: ['saveAsFile'],
                title: 'PageBuilder 다른이름으로 저장'
              },
              files => {
                this.editor.send('html-saveAs', files);
              }
            );
          }
        },
        {
          label: 'Print',
          accelerator: 'Command+P'
        },
        {
          label: 'Export...',
          accelerator: 'Command+Q'
        },
        { type: 'separator' },
        {
          label: 'Close',
          accelerator: 'Command+W',
          click: () => {
            this.mainWindow.close();
          }
        }
      ]
    };

    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: '보기',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' }
      ]
    };
    const subMenuHelp = {
      label: '도움말',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('http://electron.atom.io');
          }
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/atom/electron/tree/master/docs#readme'
            );
          }
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://discuss.atom.io/c/electron');
          }
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/atom/electron/issues');
          }
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [
      subMenuAbout,
      subMenuFile,
      subMenuEdit,
      subMenuView,
      subMenuWindow,
      subMenuHelp
    ];
  }
}
