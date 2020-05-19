import {
  mount
} from "@vue/test-utils";
import MainAlert from "@/components/MainAlert.vue";
import axios from 'axios';
jest.mock('axios');

let toResolvePromise = () => {
  axios.get.mockImplementationOnce(() => Promise.resolve({
    data: [{
      message_id: 5,
      timestamp: "2020-05-02T11:47:08.000Z",
      title: "asd",
      body: "asdd",
      from_user_id: 13,
      destination_id: 0,
      type: "usual",
      broadcast: "common",
    }]
  }));
}
let errorMessage = new Error('Test error');
let toRejectPromise = () => {
  axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
}
// jest.mock("axios", () => ({
//   get: jest.fn(() => Promise.resolve({
//     data: [{
//       message_id: 5,
//       timestamp: "2020-05-02T11:47:08.000Z",
//       title: "asd",
//       body: "asdd",
//       from_user_id: 13,
//       destination_id: 0,
//       type: "usual",
//       broadcast: "common",
//     }]
//   }))
// }));
describe("MainAlert.vue", () => {
  it("Все свойства компонента заданы корректно", async () => {
    toResolvePromise();
    const wrapper = await mount(MainAlert);
    expect(await wrapper.isVueInstance).toBeTruthy();
  });
  it("Должен инициализироваться корректно", async () => {
    toResolvePromise();
    const wrapper = await mount(MainAlert);
    expect(await wrapper.vm).toBeTruthy();
  });
  it("Отрисовывает компонент InForm", async () => {
    toResolvePromise();
    const wrapper = await mount(MainAlert);
    expect(await wrapper.findComponent(MainAlert).exists()).toBeTruthy();
  });
  it("Корректная обработка http запроса", async () => {
    toResolvePromise();
    const wrapper = await mount(MainAlert);
    expect(await wrapper.vm.common.length).not.toBe(0);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/messages?common=true');
  });
  it("Обработка ошибки http запроса", async () => {
    toRejectPromise();
    const wrapper = await mount(MainAlert);
    expect(await wrapper.vm.errorMessage).toBe(errorMessage);
  })
});