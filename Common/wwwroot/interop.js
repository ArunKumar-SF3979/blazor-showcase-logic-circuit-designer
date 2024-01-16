﻿function CommonKeyboardCommands_newDiagram() {
    var origin = window.location.origin;
    if (!origin) {
        origin = window.location.protocol + '//'
            + window.location.hostname
            + (window.location.port ? ':' + window.location.port : '');
    }
    window.open(origin + window.location.pathname);
};
function getDiagramFileName(dialogName) {
    if (dialogName === 'export')
        return document.getElementById('diagramName').innerHTML.toString();
    if (dialogName === 'save')
        return document.getElementById('saveFileName').value.toString();
    else
        return document.getElementById('diagramName').innerHTML.toString();
}
importData = function (object) {
    var orgDataSource = []; var columnsList = []
    orgDataSource = JSON.parse(object);
    var dada = orgDataSource[0];
    for (var prop in dada) { columnsList.push(prop) }
    return columnsList
};
function RestartApplication() {
    location.reload();
}
function printContent(diagram) {
    var content = document.getElementById(diagram);
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = content.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}
function saveDiagram(data, filename) {
    if (window.navigator.msSaveBlob) {
        let blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, filename + '.json');
    } else {
        let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        let a = document.createElement('a');
        a.href = dataStr;
        a.download = filename + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}

function downloadFile(data, filename) {
    let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
    let anchorElement = document.createElement('a');
    anchorElement.href = dataString;
    anchorElement.download = filename + '.json';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    anchorElement.remove();
}
UtilityMethods_hideElements = function (elementType, diagramType) {
    var diagramContainer = document.getElementsByClassName('LogicCircuit-container')[0];
    if (diagramContainer.classList.contains(elementType)) {        
            diagramContainer.classList.remove(elementType);        
    }
    else {
        diagramContainer.classList.add(elementType);
    }
    window.dispatchEvent(new Event('resize'));
};
function hideMenubar() {
    UtilityMethods_hideElements('hide-menubar');
}
function getHyperLinkValueFromDocument(id, attribute) {
    return document.getElementById(id).value;
}
function setHyperLinkValuesToDocument(id, value) {
    document.getElementById(id).value = value;
}
function click() {
    document.getElementById('UploadFiles').click();
}
function hideElements(elementType) {
    var diagramContainer = document.getElementsByClassName('LogicCircuit-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
        diagramContainer.classList.remove(elementType);
    } else {
        diagramContainer.classList.add(elementType);
    }
}
function click() {
    document.getElementById('defaultfileupload').click();
}
function loadFile(file) {
    var base64 = file.rawFile.replace("data:application/json;base64,", "");
    var json = atob(base64)
    return json;
}
function loadCSVFile(file) {

    var base64 = file.rawFile.replace("data:text/csv;base64,", "");
    var json = atob(base64)
    return json;

}
function loadXMLFile(file) {

    var base64 = file.rawFile.replace("data:text/xml;base64,", "");
    var json = atob(base64) 
    return json;

}

function diagramNameKeyDown(args) {
    if (args.which === 13) {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
}

function diagramNameChange(args, isSet) {
    if (isSet) {
        document.getElementById('diagramName').innerHTML = args;
    }
    else {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
        //document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
    }
}
function renameDiagram1(args) {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    var element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
}
UtilityMethods_native = function (object) {
    var selectedItems = JSON.parse(object);    
    console.log(selectedItems);
};
function pageSizeUpdate() {
    window.dispatchEvent(new Event('resize'));
}

window.downloadPdf = function downloadPdf(base64String, fileName) {
    var sliceSize = 512;
    var byteCharacters = atob(base64String);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);

        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {
        type: 'application/pdf'
    });
    var blobUrl = window.URL.createObjectURL(blob);
    this.triggerDownload("PDF", fileName, blobUrl);
}

triggerDownload: function triggerDownload(type, fileName, url) {
    var anchorElement = document.createElement('a');
    anchorElement.download = fileName + '.' + type.toLocaleLowerCase();
    anchorElement.href = url;
    anchorElement.click();
}
function getViewportBounds() {

    var bounds = document.getElementsByClassName('e-control e-diagram e-lib e-droppable e-tooltip')[0].getBoundingClientRect();

    return { width: bounds.width, height: bounds.height };

}

var instantObj;
var isIntervalSet = false;
window.InvokeClockEvent = (dotNetHelper, timer) => {
    if (!isIntervalSet) {
        instantObj = dotNetHelper;
    }
    if (window.blazorIntervalId) {
        clearInterval(window.blazorIntervalId);
    }
    
    window.blazorIntervalId = setInterval(() => {
        dotNetHelper.invokeMethodAsync('ChangeState');
    }, timer);
    isIntervalSet = true;
};
window.clearBlazorInterval = () => {

    if (window.blazorIntervalId) {
        clearInterval(window.blazorIntervalId);
        window.blazorIntervalId = null;
    }
    
};
function WireMouseEvents() {
    document.getElementById('diagramContainerDiv').addEventListener('mousedown', function (event) {
        
        var clickedElementId = event.target.id;
        instantObj.invokeMethodAsync('OnMouseDownEvent', clickedElementId);

    });
    document.getElementById('diagramContainerDiv').addEventListener('mouseup', function (event) {
        
        var ElementId = event.target.id;
        instantObj.invokeMethodAsync('OnMouseUpEvent', ElementId);
    });
}
window.addEventListener('mousedown', function (event) {
    document.getElementById('diagramContainerDiv').addEventListener('mousedown', function (event) {
        
        var clickedElementId = event.target.id;
        instantObj.invokeMethodAsync('OnMouseDownEvent', clickedElementId);
        
    });
});
window.addEventListener('mouseup', function (event) {

    document.getElementById('diagramContainerDiv').addEventListener('mouseup', function (event) {
        // Get the ID of the clicked element
        var ElementId = event.target.id;
        instantObj.invokeMethodAsync('OnMouseUpEvent', ElementId);
    });
});

function BlurSelectedItem(id) {
    var menuItem = document.getElementById(id);
    menuItem.blur();
}