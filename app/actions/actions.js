export const DROPEDITORHTML = 'DROPEDITORHTML';
export const DRAGEDITORHTML = 'DRAGEDITORHTML';


export function dropEditorHtml(html) {
    return {
        type: DROPEDITORHTML,
        html: html
    };
}

export function dragEditorHtml(html) {
    return {
        type: DRAGEDITORHTML,
        html: html
    };
}