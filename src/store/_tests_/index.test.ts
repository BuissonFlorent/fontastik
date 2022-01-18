import { store } from '../index'
import MockedFirebase from 'firebase/firestore'

jest.mock('firebase/firestore', () => ({
  getDocs: jest.fn(() => Promise.resolve([])),
  addDoc: jest.fn(() => Promise.resolve(true)),
  getFirestore: jest.fn(),
  collection: jest.fn()
}))

describe('Store index.ts', () => {
  test('mocks', () => {
    expect(store).toBeTruthy()
  })
  test('gets local user from localStorage', () => {
    localStorage.setItem('user', '{"userID": "anything"}')
    store.commit('getLocalUser')
    expect(store.state.user.userID).toBe('anything')
  })
  test('gets cards from localStorage', () => {
    localStorage.setItem('cards', '{"card1": "value1"}')
    store.commit('getLocalCards')
    expect(store.state.cards[0]).toBe('value1')
  })
  test('sends user to firestore', async () => {
    await store.dispatch('sendUserToDB')
    expect(MockedFirebase.addDoc).toHaveBeenCalled()
  })
})