<template>
  <div class="main-screen">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <h2>Общие и личные оповещения</h2>
      <div class="push push-success" v-if="success">
        <h3>Успех!</h3>
        <p>
          Заявка успешно отправлена. Вы можете отправить ещё одну или
          просмотреть весь список своих заявок
        </p>
        <div class="input-form btn-row">
          <button @click="newRequest()">Отправить ещё одну</button>
          <router-link to="list" tag="button"
            >Просмотреть весь список</router-link
          >
        </div>
      </div>
      <div class="request-main" v-else-if="error">
        <h3>Ошибка</h3>
        <div class="btn-row">
          <button @click="newRequest()">Отправить ещё одну</button>
          <router-link to="list" tag="button"
            >Просмотреть весь список</router-link
          >
        </div>
      </div>
      <div class="request-wrap" v-else-if="!success && !error">
        <div class="request-main">
          <h3>Новая заявка</h3>
          <div class="input-form">
            <label for="fio">ФИО</label>
            <input
              type="text"
              id="fio"
              placeholder="Фамилия Имя Отчество"
              v-model="fio"
              disabled
            />
            <small>Добавлено автоматически</small>
          </div>
          <div class="input-form">
            <label for="departmentid">Номер отдела</label>
            <input
              type="text"
              id="departmentid"
              placeholder="129301"
              v-model="department_id"
              disabled
            />
            <small>Добавлено автоматически</small>
          </div>
          <div class="technical-service">
            <label for="">Устройства для тех.обслуживания</label>
            <div class="devices-wrap" v-if="checked_devices.length === 0">
              Добавьте устройство из списка справа
            </div>
            <div
              class="devices-wrap"
              v-for="(device, index) in checked_devices"
              :key="index"
            >
              <div class="devices-block">
                <div class="device-title">{{ device.name }}</div>
                <div class="device-characteristics">
                  <div class="characteristics-title">Характеристики</div>
                  <div class="characteristics-text">
                    {{ device.characteristics }}
                  </div>
                </div>
                <div class="input-form">
                  <label for="servicetype">Тип обслуживания</label>
                  <select
                    name="servicetype"
                    id="servicetype"
                    v-model="checked_service[device.device_id]"
                  >
                    <option
                      :value="type.type"
                      v-for="(type, count) in device.types"
                      :key="count"
                      >{{ type.description }}</option
                    >
                  </select>
                  <!-- <small>Добавлено автоматически</small> -->
                </div>
                <div class="input-form">
                  <label>Комментарий для специалиста</label>
                  <textarea
                    name=""
                    placeholder="Ваш комментарий к устройству"
                    v-model="device.comment"
                  >
                  </textarea>
                  <!-- <small>Добавлено автоматически</small> -->
                </div>
              </div>
              <button
                class="deleteBtn"
                @click="deleteFromChecked(index, device.device_id)"
              >
                &times;
              </button>
            </div>
          </div>
          <div class="input-form">
            <label for="departmentid">Общий комментарий</label>
            <textarea
              name=""
              placeholder="Ваш комментарий к заявке"
              v-model="common_comment"
            >
            </textarea>
            <!-- <small>Добавлено автоматически</small> -->
          </div>
          <div class="input-form">
            <small
              >В заявке указано пунктов:
              <strong>{{ checked_devices.length }}</strong> </small
            ><br />
            <button @click="sendRequest()">Отправить</button>
          </div>
        </div>
        <div class="request-side">
          <div class="devices-list-wrap">
            <button @click="addDevice()">Добавить устройство</button>
            <div class="loading-box" v-if="devicesLoading">
              <loading></loading>
            </div>
            <div
              class="devices-list-block"
              v-for="(depdevice, index) in department_devices"
              :key="index"
            >
              <button class="list-btn" @click="addToChecked(index)">
                Добавить в заявку
              </button>

              <div class="list-data">
                <div class="data-title">
                  {{ depdevice.name }} (#{{ depdevice.device_id }})
                </div>
                <div class="data-description">
                  <strong>Характеристики</strong>:<br />
                  {{ depdevice.characteristics }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-wrap"
      v-if="modal"
      @click.self="closeModal()"
      tabindex="0"
    >
      <div class="outer">
        <div class="relative">
          <h2>Добавить устройство</h2>
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <div>
              <div class="input-form">
                <label for="new_device.name">Название</label>
                <input
                  type="text"
                  id="new_device.name"
                  placeholder="Название устройства"
                  v-model="new_device.name"
                />
                <!-- <small>Добавлено автоматически</small> -->
              </div>
              <div class="input-form">
                <label for="new_device.characteristics"
                  >Характеристики устройства</label
                >
                <input
                  type="text"
                  id="new_device.characteristics"
                  placeholder="Название устройства"
                  v-model="new_device.characteristics"
                />
                <!-- <small>Добавлено автоматически</small> -->
              </div>
              <div class="input-form">
                <label for="new_device.characteristics"
                  >Типы обслуживания</label
                >
                <div
                  class="input-form types"
                  v-for="(type, index) in new_device.types"
                  :key="index"
                >
                  <label>Тип #{{ type.type + 1 }}</label>
                  <input
                    type="text"
                    placeholder="Тип обслуживания"
                    v-model="new_device.types[index].description"
                  />
                  <button
                    class="deleteBtn delete-type"
                    @click="deleteType(index)"
                  >
                    &times;
                  </button>
                </div>

                <small @click="addType()" class="btn-small"
                  >+ Добавить тип</small
                >
              </div>
              <div class="input-form">
                <button @click="sendDevice()">Добавить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import Loading from "@/components/Loading.vue";

import axios from "axios";
export default {
  name: "Write",
  data() {
    return {
      success: false,
      error: false,
      modal: false,
      fio: "",
      department_id: -1,
      new_device: {
        name: "",
        characteristics: "",
        types: [
          {
            type: 0,
            description: "",
          },
        ],
        department_id: -1,
      },
      department_devices: [],
      checked_service: {},
      checked_devices: [],
      common_comment: "",
      devicesLoading: false,
    };
  },
  methods: {
    addDevice() {
      this.modal = true;
    },
    addType() {
      let newType = {
        type: this.new_device.types.length,
        description: "",
      };
      this.new_device.types.push(newType);
    },
    closeModal() {
      this.modal = false;
    },
    deleteType(index) {
      this.new_device.types.splice(index, 1);
      let i = 0;
      this.new_device.types.map((el) => {
        el.type = i;
        i++;
        return el;
      });
    },
    sendDevice() {
      this.new_device.department_id = this.department_id;
      console.log("Новое устройтсво", this.new_device);
      axios.post("http://localhost:8080/api/devices", this.new_device).then(
        (res) => {
          console.log(res);
          if (res.status == 200) {
            // this.success = true;
          }
        },
        (err) => {
          console.log("Write. Error: ", err);
        }
      );
      this.modal = false;
      this.getDevices();
    },
    addToChecked(index) {
      console.log(this.department_devices[index]);
      this.checked_service[this.department_devices[index].device_id] = 0;
      console.log(this.checked_service);
      this.checked_devices.push(this.department_devices[index]);
      this.department_devices.splice(index, 1);
    },
    deleteFromChecked(index, deviceId) {
      this.checked_service[deviceId] = undefined;
      this.department_devices.push(this.checked_devices[index]);
      this.checked_devices.splice(index, 1);
    },
    sendRequest() {
      const req = {
        user_id: localStorage.getItem("user-id"),
        fio: this.fio,
        department_id: this.department_id,
        checked_devices: this.checked_devices,
        common_comment: this.common_comment,
      };
      for (let index = 0; index < this.checked_devices.length; index++) {
        this.checked_devices[index].types.map((el) => {
          if (
            this.checked_service[this.checked_devices[index].device_id] ===
            el.type
          ) {
            el.checked = true;
            return el;
          } else {
            el.checked = false;
            return el;
          }
        });
      }
      axios.post("http://localhost:8080/api/requests", req).then(
        (res) => {
          console.log(res);
          if (res.status == 200) {
            this.success = true;
          }
        },
        (err) => {
          console.log("Write. Error: ", err);
        }
      );
      console.log(JSON.stringify(req));
    },
    newRequest() {
      this.checked_service = [];
      this.success = false;
      this.error = false;
      this.checked_devices = [];
      this.common_comment = "";
    },
    getDevices() {
      this.department_devices = [];
      this.devicesLoading = true;
      axios.get("http://localhost:8080/api/devices").then(
        (res) => {
          res.data.forEach((el) => {
            el.comment = "";
            this.department_devices.push(el);
            console.log(el);
          });
          this.devicesLoading = false;
        },
        (err) => {
          console.log("Write. Error: ", err);
          this.devicesLoading = false;
        }
      );
    },
  },
  components: {
    Sidepanel,
    Loading,
  },
  mounted() {
    this.fio = localStorage.getItem("fio");
    this.department_id = localStorage.getItem("department-id");
    this.getDevices();
  },
};
</script>

<style>
.main-panel {
  overflow-y: scroll;
  position: relative;
  height: 100vh;
  padding-bottom: 1rem;
  box-sizing: border-box;
}
.main-panel h2 {
  margin: 0;
  padding: 1rem 1.5rem;
}
.request-wrap {
  background-color: #d2dae6;
  margin: 0 auto;
  border-radius: 8px;
  width: 94%;
  /* height: 40vh; */
  min-height: 80vh;
  border: 1px solid #000;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1.8fr 1fr;
}
.request-main h3 {
  margin: 0;
  padding: 1rem 1.2rem;
}
.request-side {
  border-left: 1px solid #000;
}
.input-form,
.technical-service {
  margin-left: 2rem;
  margin-bottom: 1rem;
}
.input-form label,
.technical-service label {
  padding: 0.3rem 0;
  display: block;
  font-family: "Montserrat Medium";
}
.input-form input[type="text"],
.input-form input[type="password"],
.input-form select,
.input-form textarea {
  display: block;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid #000;
  font-family: "Montserrat Regular";
  resize: none;
}
.input-form textarea {
  height: 5rem;
}
.input-form input[type="text"],
.input-form input[type="password"],
.input-form textarea,
.devices-wrap,
button {
  width: 70%;
}
.input-form small {
  font-style: italic;
}

.devices-wrap {
  border: 1px dashed #000;
  box-sizing: border-box;
  background-color: #f2f2f2;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  position: relative;
}
.devices-wrap .input-form {
  margin-left: 0rem;
}
.devices-wrap .input-form input[type="text"] {
  width: 90%;
}
.devices-wrap .input-form textarea,
.devices-wrap .input-form select {
  width: 100%;
}

.device-title {
  font-family: "Montserrat Medium";
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}
.device-characteristics {
  font-size: 0.8rem;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.characteristics-title {
  font-weight: bold;
}
.input-form button,
.devices-list-wrap button:not(.list-btn) {
  background-color: rgba(30, 55, 153, 1);
  border: 0px;
  border-radius: 8px;
  font-family: "Montserrat Regular";
  padding: 0.8rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  outline: 0px;
  transition: 0.02s;
}
button:disabled,
.input-form button:disabled:hover {
  background-color: rgb(56, 72, 112);
}
.input-form button:hover,
.devices-list-wrap button:hover:not(.list-btn) {
  background-color: rgba(12, 36, 97, 1);
}
.input-form button:active,
.devices-list-wrap button:active:not(.list-btn) {
  background-color: rgba(60, 99, 130, 1);
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.4);
}
.devices-list-wrap button:disabled {
  background-color: #b8b8b8;
}
.input-form button.deleteBtn {
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  color: rgba(0, 0, 0, 0.9);
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  line-height: 2rem;
  padding: 0;
  box-sizing: border-box;
  transition: 0.1s;
}
button:hover.deleteBtn {
  background-color: transparent;
  box-shadow: none;
  transform: rotate(90deg) scale(1.3);
}
button:active.deleteBtn {
  background-color: transparent;
  box-shadow: none;
}
.devices-list-wrap {
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  position: -webkit-sticky;
  position: sticky;
  z-index: 1;
  top: 0;
  height: 90vh;
  overflow-y: scroll;
}
.devices-list-wrap > button {
  width: 100%;
  margin-bottom: 0.6rem;
}
.devices-list-block {
  display: flex;
  margin-bottom: 0.6rem;
}
.list-btn {
  background: transparent;
  width: 20%;
  font-size: 0.6rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  color: #000;
  border: none;
  cursor: pointer;
  outline: none;
}
.list-btn:hover {
  background-color: transparent;
  color: #fff;
}
.list-data {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 0.8rem;
  width: 100%;
}
.data-title {
  font-family: "Montserrat Medium";
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}
.data-description {
  font-size: 0.9rem;
}
/* ::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-thumb {
  border-width: 1px 1px 1px 2px;
  border-color: #777;
  background-color: #aaa;
  border-radius: 8px;
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  border-width: 1px 1px 1px 2px;
  border-color: #555;
  background-color: #777;
}
::-webkit-scrollbar-track {
  border-width: 0;
}
::-webkit-scrollbar-track:hover {
  border-left: solid 1px #aaa;
  background-color: #eee;
} */
.push {
  border: 1px solid rgba(0, 0, 0, 0.9);
  margin: 0 auto;
  border-radius: 8px;
  width: 80%;
  padding: 1rem;
}
.push .btn-row {
  display: flex;
  margin-left: 0;
  margin-bottom: 0;
}
.push .btn-row button {
  background-color: rgba(56, 173, 169, 1);
}
.push .btn-row *:not(:last-child) {
  margin-right: 0.5rem;
}
.push-success {
  background-color: rgba(184, 233, 148, 1);
}
.btn-small {
  cursor: pointer;
}
.types {
  position: relative;
}
.input-form button.deleteBtn.delete-type {
  left: 70%;
  bottom: 0.2rem;
  top: unset;
}
</style>
