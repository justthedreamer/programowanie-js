function getOtherNotesListContainer() {
    return document.querySelector('#all-notes .notes');
}

function getPinnedNotesListContainer() {
    return document.querySelector('#pinned .notes');
}

function getAllCheckboxes() {
    return document.querySelectorAll('.container.checkbox')
}

function getNotifyRing() {
    return document.querySelector('#notify-ring')
}

function getNotificationListContainer() {
    return document.querySelector('#notification-list')
}


export default {getOtherNotesListContainer, getPinnedNotesListContainer, getAllCheckboxes, getNotifyRing, getNotificationListContainer}
