import { app, dialog, Menu, shell, ipcMain, ipcRenderer, BrowserWindow } from 'electron';
import { buffer } from '../node_modules/rxjs/operators';
import React from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router';
const fs = require('fs-extra')
const path = require('path');

let isWorking = false;

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

    ipcMain.on('root-loaded', (event, arg) => {
      console.log(`[ipcMain] got message from menu ${arg}`);
      this.sender = event.sender;
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
              "accelerator": "Shift+Command+S"
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
              "accelerator": "Shift+Command+W"
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

  pbWebCheck = (tempPath, count, isOpen, cssArr, jsArr) => {
    process.platform === 'darwin' ? tempPath = tempPath : tempPath = tempPath.replace("\\","/")+"/"

    var pbWebPath = tempPath+"PbWeb"

    fs.access(pbWebPath, fs.constants.F_OK, (err) => {  //check if the file is readable.
      if(err){ //pbweb folder does not exist
        fs.mkdir(pbWebPath, (err) => { //create pbweb folder
          if(err){
            console.log("failed to create directory", err);
            isWorking = false;
          } else{
            fs.readdir(pbWebPath, (err, files) => {
              if(err) {
                console.log("failed to read directory1", err);
                isWorking = false;
              } else {
                count = 1;
                if(!isOpen){
                  this.makeWorkingDir(pbWebPath, count, cssArr, jsArr);
                } else{
                  isWorking = false;
                }
              }
            })
          }
        })
      } else { //pbweb folder exists
        fs.readdir(pbWebPath, (err, files) => {
          if(err) {
            console.log("failed to read directory2", err);
            isWorking = false;
          } else {
            if(files.length != 0){
              var max = 0;
              for(var i=0; i<files.length; i++){
                if(files[i].indexOf("untitled-") != -1){
                  var untitled = files[i].split("-");
                  max < parseInt(untitled[1]) ? max = parseInt(untitled[1]) : '';
                }
              }
              count = max+1;
              if(!isOpen){
                this.makeWorkingDir(pbWebPath, count, cssArr, jsArr);
              }else{
                isWorking = false;
              }
            } else {
              count = 1;
              if(!isOpen){
                this.makeWorkingDir(pbWebPath, count, cssArr, jsArr);
              } else{
                isWorking = false;
              }
            }
          }
        })
      }
    });
  }

  makeWorkingDir = (pbWebPath, cnt, cssArr, jsArr) => {
    console.log("mkdir 01")

    //__dirname : 현재 디렉터리의 절대 경로를 제공하는 Node 변수. ex)/Users/clbeemac3/Documents/ReactElectron/app
    var basicThemePath = __dirname+path.sep+"basicTheme";
    var appName = "untitled-"+cnt;
    var untitledPath = pbWebPath+path.sep+appName;

    this.mainWindow.setTitle(`${appName} - PageBuilder`); //set app title

    isWorking = true;

    fs.access(untitledPath, fs.constants.F_OK, (err) => {
      if(!err){
        console.log("already exist folder", err);
        isWorking = false;
        return false;
      } else{
        fs.copy(basicThemePath, untitledPath, (err) => { //fs-extra
          if(err){
            console.log("failed copy basic directory", err);
            isWorking = false;
            return false;
          } else{
            this.selectedFilePath = untitledPath;
            this.workingDirPath = untitledPath;
            var htmlPath = untitledPath+path.sep+"index.html"
            this.editor.send('new-file', htmlPath);
            this.inspectorList(untitledPath, untitledPath, cssArr, jsArr);
          }
        })
      }
    })
  }

  inspectorList = (dirPath, untitledPath, cssArr, jsArr) => {
    var pureCssArray = []
    var pureJsArray = []

    isWorking = true;

    fs.access(dirPath+path.sep+'css' && dirPath+path.sep+'js' && dirPath+path.sep+"resources.json", fs.constants.F_OK, (err) => {
      if(err){
        this.editor.send('error-occurred', "/Error");
        isWorking = false;
        return false;
      } else{
        fs.readFile(dirPath+path.sep+"resources.json", (err, data) => {
          if(err) {
            console.log("failed to read resources.json file", err);
            isWorking = false;
          } else{
            var cssPathArray = []
            var jsPathArray = []
            var splitData = []
            var cssArray = []
            var jsArray = []

            var parseData = JSON.parse(data)
            var parseCSS = parseData.css  // ex)/css/bootstrap.css
            var parseJS = parseData.js

            this.editor.send("resources-open", dirPath, parseCSS, parseJS); //apply resources

            var linkTag =""
            for(let i=0; i<parseCSS.length; i++){
              if(parseCSS[i].match(/(.css)$/)){
                cssPathArray = cssPathArray.concat(parseCSS[i])
                splitData = cssPathArray[i].split(path.sep)
                cssArray = cssArray.concat(splitData[splitData.length-1])
                if(dirPath == untitledPath){
                  linkTag = linkTag.concat(`<link rel="stylesheet" type="text/css" href="${__dirname+path.sep+"basicTheme"+parseData.css[i]}">`)
                } else{
                  linkTag = linkTag.concat(`<link rel="stylesheet" type="text/css" href="${dirPath+parseData.css[i]}">`)
                }
              }
            }
            cssArr.push(linkTag)

            var scriptTag =""
            for(let i=0; i<parseJS.length; i++){
              if(parseJS[i].match(/(.js)$/)){
                jsPathArray = jsPathArray.concat(parseJS[i])
                splitData = jsPathArray[i].split(path.sep)
                jsArray = jsArray.concat(splitData[splitData.length-1])
                if(dirPath == untitledPath){
                  scriptTag = scriptTag.concat(`<script type="text/javascript" src="${__dirname+path.sep+"basicTheme"+parseData.js[i]}"></script>`)
                } else{
                  scriptTag = scriptTag.concat(`<script type="text/javascript" src="${dirPath+parseData.js[i]}"></script>`)
                }
              }
            }
            jsArr.push(scriptTag)
            this.editor.send('css-list', cssArray);
            this.editor.send('js-list', jsArray);

            isWorking = false;
          }
        })
      }
    })
  }

  buildTemplate(osPlatform, tempPath) {
    let saveOk = true;
    let selectedFilePath = '';
    var count = 1;
    var workingDirPath = "";
    var isOpen = false;
    var saveMessage = true;
    var cssArr = [];
    var jsArr = [];

    if(process.platform === "darwin"){
      var returnArray = this.darwinAddMenu(osPlatform)
    }

    const subMenuFile = {
      label: osPlatform.subMenuFile.label,
      submenu: [
        { //new
          label: osPlatform.subMenuFile.submenu[0].label,
          accelerator: osPlatform.subMenuFile.submenu[0].accelerator,
          selector: osPlatform.subMenuFile.submenu[0].selector,
          click: () => {
            this.sender.send('click-file', "/homePage");
            if(isWorking){
              dialog.showMessageBox(
                {
                  message: "현재 새로만들기 진행중입니다.",
                  buttons: ["확인"]
                }
              );
              isWorking = false;
            } else{
              isOpen = false;
              isWorking = true;
              saveOk = true;
              this.pbWebCheck(tempPath, count, isOpen, cssArr, jsArr);
            }
          }
        },
        { //open
          label: osPlatform.subMenuFile.submenu[1].label,
          accelerator: osPlatform.subMenuFile.submenu[1].accelerator,
          click: () => {
            this.sender.send('click-file', "/homePage");
            dialog.showOpenDialog(
              {
                properties: ['openFile'],
                title: 'PageBuilder 파일 열기',
                filters: [
                  { name: 'HTML', extensions: ['htm', 'html'] }
                  // { name: 'CSS', extensions: ['css'] },
                  // { name: 'Javascript', extensions: ['js'] },
                  // { name: 'All Files', extensions: ['*'] }
                ]
              },
              files => {
                if (files !== undefined) { //click ok button
                  if(files[0].match(/(.html)$/)){
                    if(isWorking){
                      dialog.showMessageBox(
                        {
                          message: "현재 열기 진행중입니다.",
                          buttons: ["확인"]
                        }
                      );
                      isWorking = false;
                    } else{
                      isOpen = true;
                      this.pbWebCheck(tempPath, count, isOpen, cssArr, jsArr);

                      var pathArray = files[0].split(path.sep)
                      for(let i=0; i<pathArray.length; i++){
                        if (pathArray[i].match(/(.html)$/)){
                          var selectedfolderPath = files[0].replace(path.sep+pathArray[i],'');
                          var folderName = pathArray[pathArray.length-2]
                        }
                      }
                      this.mainWindow.setTitle(`${folderName} - PageBuilder`)
                      selectedFilePath = selectedfolderPath

                      if(!isWorking){
                        fs.readFile(files[0], (err, data) => {
                          if(err) {
                            console.log("failed to read html file", err)
                            isWorking = false;
                          } else{
                            isWorking = true;
                            var nullData = ""
                            this.inspectorList(selectedFilePath, nullData, cssArr, jsArr)
                            this.editor.send('file-open', data)
                            isWorking = false;
                          }
                        })
                      } else{
                        console.log("Reading file...")
                        isWorking = false;
                      }
                    }
                  }
                  else if(files[0].match(/(.css)$/)){
                    if(!isWorking){
                      fs.readFile(files[0], (err, data) => {
                        if(err) {
                          console.log("failed to read css file", err)
                          isWorking = false;
                        } else{
                          isWorking = true;
                          var nullData = ""
                          this.editor.send("resources-open", nullData, files[0], nullData);

                          if(selectedFilePath != ""){
                            selectedFilePath = selectedFilePath
                          } else{
                            selectedFilePath = this.workingDirPath
                          }
                          isWorking = false;
                        }
                      })
                      var cssSplitData = files[0].split(path.sep)
                      var nullData = ""
                      this.editor.send('add-resources', cssSplitData[cssSplitData.length-1], nullData);
                    }
                  }
                  else if(files[0].match(/(.js)$/)){
                    if(!isWorking){
                      fs.readFile(files[0], (err, data) => {
                        if(err) {
                          console.log("failed to read js file", err)
                          isWorking = false;
                        } else{
                          isWorking = true;
                          var nullData = ""
                          this.editor.send("resources-open", nullData, nullData, files[0]);

                          if(selectedFilePath != ""){
                            selectedFilePath = selectedFilePath
                          } else{
                            selectedFilePath = this.workingDirPath
                          }
                          isWorking = false;
                        }
                      })
                      var jsSplitData = files[0].split(path.sep)
                      var nullData = ""
                      this.editor.send('add-resources', nullData, jsSplitData[jsSplitData.length-1]);
                    }
                  }
                } else{ //click cancle open
                  console.log("Cancel Open")
                  return false;
                }
                saveOk = false;
              }
            );
          }
        },
        { type: osPlatform.subMenuFile.submenu[2].type },
        {
          label: osPlatform.subMenuFile.submenu[3].label,
          accelerator: osPlatform.subMenuFile.submenu[3].accelerator,
          click: () => {
            if (saveOk) { //save new file
              dialog.showSaveDialog(
                {
                  properties: ['saveFile'],
                  title: 'PageBuilder 저장',
                  buttonLabel: 'Save'
                },
                files => {
                  if (files !== undefined) {
                    fs.move(this.workingDirPath, files, {overwrite: true}, (err) => { //fs-extra
                      if(err) {
                        console.log("failed to move directory_save", err);
                        isWorking = false;
                      } else {
                        saveMessage = true;
                        this.editor.send('html-save', files, cssArr, jsArr, saveMessage);
                      }
                    })

                    //set app title
                    var pathArray = files.split(path.sep)
                    var filename = pathArray[pathArray.length-1]
                    this.mainWindow.setTitle(`${filename} - PageBuilder`)

                    saveOk = false;
                    selectedFilePath = files;
                  }
                  else{ //click cancel save
                    console.log("cancel save")
                    saveOk = true;
                    saveMessage = false;
                    return false;
                  }
                }
              );
            } else { //save an existing file
              saveOk = false;
              var pathArray1 = selectedFilePath.split(path.sep)
              var text = ""
              for(var i=0; i<pathArray1.length-1; i++){
                text = text.concat(pathArray1[i]+path.sep)
              }
              var titleArray = this.mainWindow.getTitle().split(" -")
              selectedFilePath = text+titleArray[0]
              fs.readdir(selectedFilePath, (err, data)=>{
                if(err){
                  console.log("failed to read directory_save", err)
                  isWorking = false;
                } else{
                  saveMessage = true;
                  this.editor.send('html-save', selectedFilePath, cssArr, jsArr, saveMessage);
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
                saveOk = true;
                if (files !== undefined) {
                  if(this.workingDirPath == undefined){ this.workingDirPath = "" }
                  fs.access(this.workingDirPath, fs.constants.F_OK, (err) => {
                    if(err){ //saved files
                      fs.copy(selectedFilePath, files, {overwrite: true}, (err) => {
                        if(err) {
                          console.log("failed to copy directory_saveAs", err)
                          isWorking = false;
                        } else{
                          saveMessage = true
                          var pathArray = files.split(path.sep)
                          var filename = pathArray[pathArray.length-1]
                          this.mainWindow.setTitle(`${filename} - PageBuilder`)

                          selectedFilePath = files
                          this.editor.send('html-save', selectedFilePath, cssArr, jsArr, saveMessage);
                        }
                      })
                    } else{ //save new file
                      fs.move(this.workingDirPath, files, {overwrite: true}, (err) => {
                        if(err) {
                          console.log("failed to move directory_saveAs", err);
                          isWorking = false;
                        } else{
                          selectedFilePath = files
                          saveMessage = true

                          var pathArray = files.split(path.sep)
                          var filename = pathArray[pathArray.length-1]
                          this.mainWindow.setTitle(`${filename} - PageBuilder`)

                          this.editor.send('html-save', selectedFilePath, cssArr, jsArr, saveMessage);
                        }
                      })
                    }
                  })
                  saveOk = false;
                } else{ //click cancel saveAs
                  console.log("cancel saveAs")
                  saveOk = false;
                  return false;
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
