export const SHOWEDITORVIEW = 'SHOWEDITORVIEW';
export const SETEDITORVIEW = 'SETEDITORVIEW';


export function showEditorView() {
    return {
        type: SHOWEDITORVIEW
    };
}

export function setEditorView(ele){
    return {
        type: SETEDITORVIEW,
        ele: ele
    };
}