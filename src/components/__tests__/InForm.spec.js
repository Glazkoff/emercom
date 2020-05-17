import { mount, createLocalVue } from "@vue/test-utils";
import InForm from "../InForm.vue";

const localVue = createLocalVue();
describe("InForm.vue", () => {
  it("Должен инициализироваться корректно", () => {
    const wrapper = mount(InForm, localVue);
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.is(InForm)).toBeTruthy();
  });
  it("Содержимое шаблона отображается корректно", () => {
    const wrapper = mount(InForm, localVue);
    expect(wrapper.text()).toMatch("Войти в электроннуюсистему заявок");
  });
  it("Должен соотноситься со снэпшотом компонента", () => {
    const wrapper = mount(InForm, localVue);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("1+1=3", () => {
    expect(1 + 2).toEqual(3);
  });
});
