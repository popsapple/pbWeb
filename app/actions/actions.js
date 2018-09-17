export const DROPEDITORHTML = 'DROPEDITORHTML';
export const DRAGEDITORHTML = 'DRAGEDITORHTML';
export const SELECTDOCTYPE = 'SELECTDOCTYPE';

let editor = {
	dragitem: ""
}
export function dropEditorHtml(html) {
	console.log("action dropEditorHtml ");
	console.log(html);
	editor.dragitem = html;
    return {
        type: DROPEDITORHTML,
        html: html
    };
}

export function dragEditorHtml() {
	console.log("action dragEditorHtml ");
    return {
        type: DRAGEDITORHTML,
        html: editor.dragitem
    };
}

export function selectDocType(doc) {
    console.log("action SELECTDOCTYPE ");
    return {
        type: SELECTDOCTYPE,
        docType: doc.docType
    };
}