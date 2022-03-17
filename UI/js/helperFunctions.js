function getClickedButton(target, notNeededChildElems = []) {

    if(notNeededChildElems.includes(target.tagName)){ // get btn element
        target = target.parentElement;
    }

    return new Node(target);

}

function addClickEvent(elems, handler) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', handler);
    }
}