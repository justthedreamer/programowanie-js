function removeChild(node){
    if (node){
        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
    }
}

export default {removeChild}