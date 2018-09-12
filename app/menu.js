import { app, dialog, Menu, shell, ipcMain, ipcRenderer, BrowserWindow } from 'electron';
import { buffer } from '../node_modules/rxjs/operators';
const fs = require('fs-extra')
import ErrorPage from './components/404Error'
import React from 'react';
import { Link } from 'react-router-dom'
import ErrorPage1 from './containers/ErrorPage'

let isDirCopying = false;

export default class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    ipcMain.on('editor-loaded', (event, arg) => {
      console.log(`[ipcMain] got message from menu ${arg}`);
      this.editor = event.sender;
    });

    /*ipcMain.on('componentlist-drag', (event, arg) => {
      event.sender.send('componentlist-draginsert', arg);
    }); */

    ipcMain.on('SelectEditComponent', (event, arg) => {
      event.sender.send('SelectEditComponent', arg); //event.sender
    });     
  }

  buildMenu() { 
    const option = 
    {
      "mac": {
        "subMenuAbout": {
          "label": "PageBuilder",
          "submenu": [
            {
              "label": "About ElectronReact",
              "selector": "orderFrontStandardAboutPanel:"
            },
            {
              "type": "separator"
            },
            {
              "label": "Services",
              "submenu": []
            },
            {
              "type": "separator"
            },
            {
              "label": "Hide ElectronReact",
              "accelerator": "Command+H",
              "selector": "hide:"
            },
            {
              "label": "Hide Others",
              "accelerator": "Command+Shift+H",
              "selector": "hideOtherApplications:"
            },
            {
              "label": "Show All",
              "selector": "unhideAllApplications:"
            },
            {
              "type": "separator"
            },
            {
              "label": "Quit",
              "accelerator": "Command+Q"
            }
          ]
        },
        "subMenuFile": {
          "label": "File",
          "submenu": [
            {
              "label": "New",
              "accelerator": "Command+N",
              "selector": "new"
            },
            {
              "label": "Open...",
              "accelerator": "Command+O"
            },
            {
              "type": "separator"
            },
            {
              "label": "Save",
              "accelerator": "Command+S"
            },
            {
              "label": "Save as...",
              "accelerator": "Command+A"
            },
            {
              "label": "Print",
              "accelerator": "Command+P"
            },
            {
              "label": "Export...",
              "accelerator": "Command+Q"
            },
            {
              "type": "separator"
            },
            {
              "label": "Close",
              "accelerator": "Command+W"
            }
          ]
        },
        "subMenuEdit": {
          "label": "Edit",
          "submenu": [
            {
              "label": "Undo",
              "accelerator": "Command+Z",
              "selector": "undo:"
            },
            {
              "label": "Redo",
              "accelerator": "Shift+Command+Z",
              "selector": "redo:"
            },
            {
              "type": "separator"
            },
            {
              "label": "Cut",
              "accelerator": "Command+X",
              "selector": "cut:"
            },
            {
              "label": "Copy",
              "accelerator": "Command+C",
              "selector": "copy:"
            },
            {
              "label": "Paste",
              "accelerator": "Command+V",
              "selector": "paste:"
            },
            {
              "label": "Select All",
              "accelerator": "Command+A",
              "selector": "selectAll:"
            }
          ]
        },
        "subMenuViewDev": {
          "label": "View",
          "submenu": [
            {
              "label": "Preview",
              "accelerator": "Ctrl+Command+P"
            },
            {
              "label": "Reload",
              "accelerator": "Command+R"
            },
            {
              "label": "Toggle Full Screen",
              "accelerator": "Ctrl+Command+F"
            },
            {
              "label": "Toggle Developer Tools",
              "accelerator": "Alt+Command+I"
            }
          ]
        },
        "subMenuWindow": {
          "label": "Window",
          "submenu": [
            {
              "label": "Minimize",
              "accelerator": "Command+M",
              "selector": "performMiniaturize:"
            },
            {
              "label": "Close",
              "accelerator": "Command+W",
              "selector": "performClose:"
            },
            {
              "type": "separator"
            },
            {
              "label": "Bring All to Front",
              "selector": "arrangeInFront:"
            }
          ]
        },
        "subMenuHelp": {
          "label": "Help",
          "submenu": [
            {
              "label": "Learn More"
            },
            {
              "label": "Documentation"
            },
            {
              "label": "Community Discussions"
            },
            {
              "label": "Search Issues"
            }
          ]
        }
      },
      "window": {
        "subMenuFile": {
          "label": "&파일",
          "submenu": [
            {
              "label": "&새로 만들기",
              "accelerator": "Ctrl+N",
              "selector": "new file"
            },
            {
              "label": "&열기",
              "accelerator": "Ctrl+O"
            },
            { "type": "separator" },
            {
              "label": "&저장",
              "accelerator": "Ctrl+S"
            },
            {
              "label": "&다른이름으로 저장",
              "accelerator": "Ctrl+A"
            },
            {
              "label": "&인쇄",
              "accelerator": "Ctrl+P"
            },
            {
              "label": "&내보내기",
              "accelerator": "Ctrl+Q"
            },
            { "type": "separator" },
            {
              "label": "&닫기",
              "accelerator": "Ctrl+W"
            }
          ]
        },
        "subMenuViewDev": {
          "label": "&보기",
          "submenu": [
            {
              "label": "&Preview",
              "accelerator": "Ctrl+P"
            },
            {
              "label": "&Reload",
              "accelerator": "Ctrl+R"
            },
            {
              "label": "Toggle &Full Screen",
              "accelerator": "F11"
            },
            {
              "label": "Toggle &Developer Tools",
              "accelerator": "Alt+Ctrl+I"
            }
          ]
        },
        "subMenuHelp": {
          "label": "Help",
          "submenu": [
            {
              "label": "Learn More"
            },
            {
              "label": "Documentation"
            },
            {
              "label": "Community Discussions"
            },
            {
              "label": "Search Issues"
            }
          ]
        }
      }
    }

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }
    const macTempPath = process.env.TMPDIR
    const windowTempPath = process.env.Temp

    const template =
      process.platform === 'darwin'
        ? this.buildTemplate(option.mac, macTempPath)
        : this.buildTemplate(option.window, windowTempPath);
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

  darwinAddMenu = (osPlatform) => {
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
          accelerator: osPlatform.subMenuAbout.submenu[4].accelerator, //option.mac.subMenuAbout.submenu[4].accelerator
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: osPlatform.subMenuAbout.submenu[5].accelerator,
          selector: 'hideOtherApplications:'
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: osPlatform.subMenuAbout.submenu[8].accelerator,
          click: () => {
            app.quit();
          }
        }
      ]
    };

    const subMenuEdit = {
      label: osPlatform.subMenuEdit.label,
      submenu: [
        { label: osPlatform.subMenuEdit.submenu[0].label, accelerator: osPlatform.subMenuEdit.submenu[0].accelerator, selector: osPlatform.subMenuEdit.submenu[0].selector },
        { label: osPlatform.subMenuEdit.submenu[1].label, accelerator: osPlatform.subMenuEdit.submenu[1].accelerator, selector: osPlatform.subMenuEdit.submenu[1].selector },
        { type: osPlatform.subMenuEdit.submenu[2].type },
        { label: osPlatform.subMenuEdit.submenu[3].label, accelerator: osPlatform.subMenuEdit.submenu[3].accelerator, selector: osPlatform.subMenuEdit.submenu[3].selector },
        { label: osPlatform.subMenuEdit.submenu[4].label, accelerator: osPlatform.subMenuEdit.submenu[4].accelerator, selector: osPlatform.subMenuEdit.submenu[4].selector },
        { label: osPlatform.subMenuEdit.submenu[5].label, accelerator: osPlatform.subMenuEdit.submenu[5].accelerator, selector: osPlatform.subMenuEdit.submenu[5].selector },
        {
          label: osPlatform.subMenuEdit.submenu[6].label,
          accelerator: osPlatform.subMenuEdit.submenu[6].accelerator,
          selector: osPlatform.subMenuEdit.submenu[6].selector
        }
      ]
    };

    const subMenuWindow = {
      label: osPlatform.subMenuWindow.label,
      submenu: [
        {
          label: osPlatform.subMenuWindow.submenu[0].label,
          accelerator: osPlatform.subMenuWindow.submenu[0].accelerator,
          selector: osPlatform.subMenuWindow.submenu[0].selector
        },
        { label: osPlatform.subMenuWindow.submenu[1].label, accelerator: osPlatform.subMenuWindow.submenu[1].accelerator, selector: osPlatform.subMenuWindow.submenu[1].selector },
        { type: osPlatform.subMenuWindow.submenu[2].type },
        { label: osPlatform.subMenuWindow.submenu[3].label, selector: osPlatform.subMenuWindow.submenu[3].selector }
      ]
    };
    return [
      subMenuAbout,
      subMenuEdit,
      subMenuWindow
    ];
  }

  pbWebCheck = (tempPath, count, isOpen) => {
    process.platform === 'darwin' ? tempPath = tempPath : tempPath = tempPath.replace("\\","/")+"/"
 
    var pbWebPath = tempPath+"PbWeb"

    fs.access(pbWebPath)
      .then(()=>{ //이미 폴더가 존재할경우
        fs.readdir(pbWebPath, (err, dirList) => {
          if(err) console.log("ACESS ERROR 01 :: "+err)
          if(!err){
            if(dirList.length != 0){
              var max = 0;
              for(var i=0; i<dirList.length; i++){
                if(dirList[i].indexOf("untitled-") != -1){
                  var untitled = dirList[i].split("-");
                  max < parseInt(untitled[1]) ? max = parseInt(untitled[1]) : '';
                }
              }
              count = max+1;
              if(!isOpen){
                this.makeWorkingDir(pbWebPath, count);
              }
            } else {
              count = 1;
              if(!isOpen){
                this.makeWorkingDir(pbWebPath, count);
              }
            }
          }
        })
      })
      .catch(()=>{ //폴더가 없을 경우
        fs.mkdir(pbWebPath, (err)=> {
          if(err) console.log("ACESS ERROR 02 :: "+err)
          if(!err){
            fs.readdir(pbWebPath, (err, dirList) => {
              if(err) console.log(err)
              if(!err){
                if(dirList.length != 0){
                  var max = 0;
                  for(var i=0; i<dirList.length; i++){
                    if(dirList[i].indexOf("untitled-") != -1){
                      var untitled = dirList[i].split("-");
                      max < parseInt(untitled[1]) ? max = parseInt(untitled[1]) : '';
                    }
                  }
                  count = max+1;
                  if(!isOpen){
                    this.makeWorkingDir(pbWebPath, count);
                  }
                } else {
                  count = 1;
                  if(!isOpen){
                    this.makeWorkingDir(pbWebPath, count);
                  }
                }
              }
            })
          }
        }) 
        
      })
  }


  makeWorkingDir = (pbWebPath, cnt) => {
    //__dirname : 현재 디렉터리의 절대 경로를 제공하는 Node 변수. ex)/Users/clbeemac3/Documents/ReactElectron/app
    var basicThemePath = __dirname+"/basicTheme" 
    var appName = "untitled-"+cnt
    var untitledPath = pbWebPath+"/"+appName

    this.mainWindow.setTitle(`${appName} - PageBuilder`) //app title 설정

    isDirCopying = true;

    fs.copy(basicThemePath, untitledPath, (err) => { 
      if(err) {
        console.log("ACESS ERROR 03 :: "+err);
        isDirCopying = false;
      }
      if(!err){
        isDirCopying = false;
        var htmlPath = untitledPath+"/index.html" //새로 생성한 폴더의 index.html 읽어와야 함.
        var htmlPathArray = htmlPath.split("/")
        for(let i=0; i<htmlPathArray.length; i++){
          if (htmlPathArray[i].match(/(.html)$/)){
            var folderPath = htmlPath.replace("/"+htmlPathArray[i],'');
          }
        }    
        //console.log("makeWorkingDir In 04")
        this.workingDirPath = untitledPath
  
        //delay 주지 않을 시 생성한 폴더를 찾지 못함.
        this.editor.send('new-file', htmlPath)
        this.inspectorList(folderPath)

      }
    })
  }

  inspectorList = (dirPath) => {
    var pureCssArray = []
    var pureJsArray = []
    
    fs.access(dirPath+'/css' && dirPath+'/js' && dirPath+"/resources.json")
     .then(()=>{
      fs.readdir(dirPath+'/css', (err, cssList) => {
        if(err) console.log("ACESS ERROR 04 :: "+err)
        if(!err){
          for(let i=0; i<cssList.length; i++){
            if(cssList[i].match(/(.css)$/)){
              pureCssArray = pureCssArray.concat(cssList[i])
            }
          }
          this.editor.send('css-list', pureCssArray);
        }
      })

      fs.readdir(dirPath+'/js', (err, jsList) => {
        if(err) console.log("ACESS ERROR 05 :: "+err)
        if(!err){
          for(let i=0; i<jsList.length; i++){
            if(jsList[i].match(/(.js)$/)){
              pureJsArray = pureJsArray.concat(jsList[i])
            }
          }
          this.editor.send('js-list', pureJsArray);
        }
      })

      
      fs.readFile(dirPath+"/resources.json", (err, data) => { 
        if(err) console.log("ACESS ERROR 06 :: "+err)
        if(!err){
          var parseData = JSON.parse(data)
          this.editor.send("css-open", dirPath, parseData.css);
          this.editor.send("js-open", dirPath, parseData.js);
        }
      })
     })
     .catch(()=>{ //css 폴더, js 폴더, resources.json 파일 중 하나라도 없을 경우 에러 처리
      console.log("404 Error!!") 
      // this.editor.send('error-control', '404Error');

     })
  }

  buildTemplate(osPlatform, tempPath) {
    let saveOk = true;
    let selectedFilePath = '';
    var count = 1;
    var workingDirPath = "";
    var isOpen = false; 
    var saveMessage = true;

    if(process.platform === "darwin"){
      var returnArray = this.darwinAddMenu(osPlatform)
    }

    const subMenuFile = {
      label: osPlatform.subMenuFile.label,
      submenu: [
        {
          label: osPlatform.subMenuFile.submenu[0].label,
          accelerator: osPlatform.subMenuFile.submenu[0].accelerator,
          selector: osPlatform.subMenuFile.submenu[0].selector,
          click: () => {
            if(isDirCopying){
              console.log("현재 진행중입니다");
              return false;
            }else{
              console.log("현재 진행중이 아닙니다");
              isOpen = false;
              this.pbWebCheck(tempPath, count, isOpen);  
            }
          }        
        },
        {
          label: osPlatform.subMenuFile.submenu[1].label,
          accelerator: osPlatform.subMenuFile.submenu[1].accelerator,
          click: () => {
            if(isDirCopying){
              console.log("현재 진행중입니다_open");
              return false;
            }else{
              console.log("현재 진행중이 아닙니다_open");
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
                  if (files !== undefined) {
                    if(files[0].match(/(.html)$/)){
                      isOpen = true;

                      this.pbWebCheck(tempPath, count, isOpen)

                      var pathArray = files[0].split("/")
                      for(let i=0; i<pathArray.length; i++){
                        if (pathArray[i].match(/(.html)$/)){
                          var selectedfolderPath = files[0].replace("/"+pathArray[i],'');
                          var folderName = pathArray[pathArray.length-2]
                        }
                      }
                      this.mainWindow.setTitle(`${folderName} - PageBuilder`)
                      selectedFilePath = selectedfolderPath 
                      isDirCopying = true;
                      fs.readFile(files[0], (err, data)=>{
                        if(err) {
                          console.log(err)
                          isDirCopying = false;
                        }
                        if(!err){
                          this.editor.send('file-open', files[0])
                          this.inspectorList(selectedfolderPath)
                          isDirCopying = false;
                        }
                      })
                    }
                    else if(files[0].match(/(.css)$/)){
                      pathArray = files[0].split("/")
                      for(let i=0; i<pathArray.length; i++){
                        if(pathArray[i].match(/(.css)$/)){
                          selectedfolderPath = files[0].replace("/css/"+pathArray[i],'');
                        }
                      }
                      
                      fs.copy(files[0], selectedfolderPath+"/css", (err) => {
                        if(err){
                          console.log(err)
                        } else{
                          this.inspectorList(selectedfolderPath)
                        }
                        
                      })
                    } 
                    else if(files[0].match(/(.js)$/)){
                      this.inspectorList(selectedfolderPath)
                      fs.copy(files[0], selectedfolderPath+"/js", (err) => {
                        if(err) console.log(err)
                        else{
                          this.inspectorList(selectedfolderPath)
                        }
                      })                  
                    } 
                  } else{
                    //여러번 할 경우 MaxListenersExceededWarning 발생
                    // this.mainWindow.webContents.reload();
                  }
                  saveOk = false;
                }
              );
            }
          }
        },
        { type: osPlatform.subMenuFile.submenu[2].type },
        {
          label: osPlatform.subMenuFile.submenu[3].label,
          accelerator: osPlatform.subMenuFile.submenu[3].accelerator,
          click: () => {
            if (saveOk) { //새로운 파일을 저장할 경우
              dialog.showSaveDialog(
                {
                  properties: ['saveFile'],
                  title: 'PageBuilder 저장',
                  buttonLabel: 'Save'
                },
                files => {
                  if (files !== undefined) {
                    fs.move(this.workingDirPath, files, (err) => {
                      if(err) console.log(err);
                      if(!err) {
                        saveMessage = true;
                        console.log("save1 : "+files)
                        this.editor.send('html-save', files, saveMessage);
                      }
                    })
                    //저장한 title로 app title 설정하는 부분
                    var pathArray = files.split("/")
                    var filename = pathArray[pathArray.length-1]
                    this.mainWindow.setTitle(`${filename} - PageBuilder`)

                    saveOk = false;
                    selectedFilePath = files;     
                  } 
                  else{ //저장 다이얼로그에서 취소 클릭 시
                    //여러번 할 경우 MaxListenersExceededWarning 발생
                    // this.mainWindow.webContents.reload();
                    saveOk = true;
                    saveMessage = false;
                  }
                }
              );
            } else { //존재하는 파일에 덮어쓰기할 경우
              var pathArray1 = selectedFilePath.split("/")
              var text = ""
              for(var i=0; i<pathArray1.length-1; i++){
                text = text.concat(pathArray1[i]+"/")
              }
              var titleArray = this.mainWindow.getTitle().split(" -")
              selectedFilePath = text+titleArray[0]
              saveMessage = true;

              fs.readdir(selectedFilePath, (err, data)=>{
                if(err) console.log(err)
                if(!err){
                  this.editor.send('html-save', selectedFilePath, saveMessage);
                }
              })
            }
          }
        },
        {
          label: osPlatform.subMenuFile.submenu[4].label,
          accelerator: osPlatform.subMenuFile.submenu[4].accelerator,
          click: () => {
            dialog.showSaveDialog(
              {
                properties: ['saveAsFile'],
                title: 'PageBuilder 다른이름으로 저장'
              },
              files => {
                console.log("saveAs files : "+files)
                saveOk = true;

                if (files !== undefined) {
                  fs.access(this.workingDirPath)
                    .then(()=>{ //저장하지 않은 파일일 경우(처음부터 saveAs 눌렀을 때)
                      fs.move(this.workingDirPath, files, (err) => {
                        if(err) console.log(err)
                        if(!err){
                          selectedFilePath = files
                          saveMessage = true
                          console.log("saveAs1 : "+files)
                          this.editor.send('html-save', selectedFilePath, saveMessage);
                        }
                      })

                      //저장한 title로 app title 설정하는 부분
                      var pathArray = files.split("/")
                      var filename = pathArray[pathArray.length-1]
                      this.mainWindow.setTitle(`${filename} - PageBuilder`)

                    })
                    .catch(()=>{ //이미 저장되어있는 파일일 경우(save한 상태에서 saveAs를 눌렀을 경우)
                      console.log("==> select : "+selectedFilePath)
                      fs.copy(selectedFilePath, files, (err) => {
                        if(err) console.log(err);
                        if(!err){
                          saveMessage = true

                          //저장한 title로 app title 설정하는 부분
                          var pathArray = files.split("/")
                          var filename = pathArray[pathArray.length-1]
                          this.mainWindow.setTitle(`${filename} - PageBuilder`)

                          selectedFilePath = files
                          console.log("saveAs2 : "+selectedFilePath)
                          this.editor.send('html-save', selectedFilePath, saveMessage);
                        }
                      })
                      // dialog.showMessageBox(
                      //   { message: "저장되었습니다.",
                      //     buttons: ["확인"]
                      //   }
                      // );
                    })

                  saveOk = false;
                }
                else{                  
                  //여러번 할 경우 MaxListenersExceededWarning 발생
                  // this.mainWindow.webContents.reload();
                }
              }
            );
          }
        },
        {
          label: osPlatform.subMenuFile.submenu[5].label,
          accelerator: osPlatform.subMenuFile.submenu[5].accelerator
        },
        {
          label: osPlatform.subMenuFile.submenu[6].label,
          accelerator: osPlatform.subMenuFile.submenu[6].accelerator
        },
        { type: osPlatform.subMenuFile.submenu[7].type },
        {
          label: osPlatform.subMenuFile.submenu[8].label,
          accelerator: osPlatform.subMenuFile.submenu[8].accelerator,
          click: () => {
            this.mainWindow.close();
          }
        }
      ]
    };

    const subMenuViewDev = {
      label: osPlatform.subMenuViewDev.label,
      submenu: [
        {
          label: osPlatform.subMenuViewDev.submenu[0].label,
          accelerator: osPlatform.subMenuViewDev.submenu[0].accelerator,
          click: () => {
            this.editor.send('preview-open',()=>{
            });
            //this.mainWindow.webContents.reload();
          }
        },
        {
          label: osPlatform.subMenuViewDev.submenu[1].label,
          accelerator: osPlatform.subMenuViewDev.submenu[1].accelerator,
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: osPlatform.subMenuViewDev.submenu[2].label,
          accelerator: osPlatform.subMenuViewDev.submenu[2].accelerator,
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: osPlatform.subMenuViewDev.submenu[3].label,
          accelerator: osPlatform.subMenuViewDev.submenu[3].accelerator,
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };

    const subMenuHelp = {
      label: osPlatform.subMenuHelp.label,
      submenu: [
        {
          label: osPlatform.subMenuHelp.submenu[0].label,
          click() {
            shell.openExternal('http://electron.atom.io');
          }
        },
        {
          label: osPlatform.subMenuHelp.submenu[1].label,
          click() {
            shell.openExternal(
              'https://github.com/atom/electron/tree/master/docs#readme'
            );
          }
        },
        {
          label: osPlatform.subMenuHelp.submenu[2].label,
          click() {
            shell.openExternal('https://discuss.atom.io/c/electron');
          }
        },
        {
          label: osPlatform.subMenuHelp.submenu[3].label,
          click() {
            shell.openExternal('https://github.com/atom/electron/issues');
          }
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    if(process.platform === "darwin"){
      return [
        returnArray[0],
        subMenuFile,
        returnArray[1],
        subMenuView,
        returnArray[2],
        subMenuHelp   
      ];
    } else{
      return [
        subMenuFile,
        subMenuView,
        subMenuHelp
      ];
    }
    
  }

}
