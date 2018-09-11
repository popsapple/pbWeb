export const DROPEDITORHTML = 'DROPEDITORHTML';
export const DRAGEDITORHTML = 'DRAGEDITORHTML';

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