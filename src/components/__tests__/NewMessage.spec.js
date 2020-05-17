import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import NewMessage from '../NewMessage.vue';

const localVue = createLocalVue();
describe('NewMessage.vue', () => {
  it("Должен инициализироваться корректно", () => {
    const wrapper = shallowMount(NewMessage, localVue);
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.is(NewMessage)).toBeTruthy();
  });
})