export const SHOWEDITORVIEW = 'SHOWEDITORVIEW';
export const FINDEDITOR = 'FINDEDITOR';


export function showEditorView() {
    return {
        type: SHOWEDITORVIEW
    };
}

export function findEditor(){
    console.log("findEditor");
    return {
        type: FINDEDITOR
    };
}