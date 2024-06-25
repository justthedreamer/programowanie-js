import ActionResult from '../Utilities/ActionResult.js'

const TagsKey = 'tags'

function GetTagsJson() {
    const items = localStorage.getItem(TagsKey)
    return items === null ? [] : JSON.parse(items)
}

function CommitTags(tags) {
    const stringify = JSON.stringify(tags)
    localStorage.setItem(TagsKey, stringify)
}

export default class TagAggregate {
    constructor() {
        this.tags = []
        this.#initTags();
    }
    #initTags() {
        const tags = GetTagsJson()
        if (tags) {
            this.tags = tags
        }
    }
    add(tag) {
        const exists = this.getTagByName(tag.name)

        if (exists) {
            return new ActionResult(false, 'Tag with provided name already exists.');
        }
        
        this.tags.push(tag)
        CommitTags(this.tags)
        return new ActionResult(true, "Tag added successfully.");
    }
    remove(tag) {
        const index = this.tags.indexOf(tag)
        if (index !== undefined && index !== null) {
            this.tags.splice(index, 1)
            CommitTags(this.tags)
        }
    }
    getTags() {
        return this.tags
    }
    getTagByName(tagName) {
        return this.tags.find(tag => {
            return tag.name === tagName.toLowerCase();
        });
    }
}