import {
  mount
} from "@vue/test-utils";
import MessageBox from "@/components/MessageBox.vue";
const testMessage = {
  type: 'important',
  timestamp: 12312313,
  title: 'Тестовый заголовок',
  text: 'Текст, текст.'
}
describe('MessageBox.vue', () => {
  it("Все свойства компонента заданы корректно", () => {
    const wrapper = mount(MessageBox, {
      propsData: {
        message: testMessage
      }
    });
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("Должен инициализироваться корректно", () => {
    const wrapper = mount(MessageBox, {
      propsData: {
        message: testMessage
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
  it("Отрисовывает компонент InForm", () => {
    const wrapper = mount(MessageBox, {
      propsData: {
        message: testMessage
      }
    });
    expect(wrapper.findComponent(MessageBox).exists()).toBeTruthy();
  });
  it("Корректная обработка входных данных", () => {
    const wrapper = mount(MessageBox, {
      propsData: {
        message: testMessage
      }
    });
    expect(wrapper.find("h3").text()).toBe("Тестовый заголовок");
  });
  it("Корректная обработка входной даты", () => {
    const wrapper = mount(MessageBox, {
      propsData: {
        message: testMessage
      }
    });
    expect(wrapper.find("h4").text()).toBe('1 янв. 1970 г., 6:25');
  })
});