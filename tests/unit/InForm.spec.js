import {
  mount,
  createLocalVue
} from "@vue/test-utils";
import InForm from "@/components/InForm.vue";
import Vuex from 'vuex';
const localVue = createLocalVue()
localVue.use(Vuex)
let actions;
let store;
beforeEach(() => {
  actions = {
    AUTH_REQUEST: jest.fn()
  };
  store = new Vuex.Store({
    actions
  });
});

describe("InForm.vue", () => {
  it("Все свойства компонента заданы корректно", () => {
    const wrapper = mount(InForm);
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("Должен инициализироваться корректно", () => {
    const wrapper = mount(InForm, localVue);
    expect(wrapper.vm).toBeTruthy();
  });
  it("Отрисовывает компонент InForm", () => {
    const wrapper = mount(InForm);
    expect(wrapper.findComponent(InForm).exists()).toBeTruthy();
  });
  it("Содержимое шаблона отображается корректно", () => {
    const wrapper = mount(InForm, localVue);
    expect(wrapper.text()).toMatch("Войти в электроннуюсистему заявок");
  });
  it("Должен соотноситься со снэпшотом компонента", () => {
    const wrapper = mount(InForm, localVue);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("Попытка авторизации проходит успешно", () => {
    const wrapper = mount(InForm, {
      store,
      localVue
    })
    const loginInput = wrapper.find('#login');
    const passwordInput = wrapper.find('#password');
    const btn = wrapper.find('#auth-btn');
    loginInput.element.value = 'log'
    passwordInput.element.value = 'pass'
    btn.trigger('click');
    expect(actions.AUTH_REQUEST).toHaveBeenCalled();
  });
});