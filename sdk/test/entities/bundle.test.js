import { it, expect } from 'vitest'
import { Bundle } from '../../src/entities/bundle'

const item = {
    data: {key: 'value'},
    lastUpdate: new Date()
}

class TestStorage {
    localStorage = {}

    constructor() {}

    setItem(key, jsonString) {
        this.localStorage[key] = jsonString
    }
}

const testStorage = new TestStorage()

const localStorageKey = 'KEY'

it('Creation of a bundle', () => {
    new Bundle(item, localStorageKey, testStorage)
    
    expect(testStorage.localStorage[localStorageKey]).toEqual(JSON.stringify(item))
})

