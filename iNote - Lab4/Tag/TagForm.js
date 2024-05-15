function getTagListContainer() {
    return document.querySelector('#tag-form-tag-list')
}

function getTagName() {
    const tagInput = document.querySelector('#tag-form-tag-name')
    return tagInput.value
}

function getTagColor() {
    const tagColor = document.querySelector('#tag-form-tag-color')
    return tagColor.value
}

function getAddButton() {
    return document.querySelector('#tag-form-add-tag-button')
}

function clear() {
    const tagInput = document.querySelector('#tag-form-tag-name')
    tagInput.value = ''
}

export default {getTagListContainer,getTagName,getTagColor,getAddButton,clear}