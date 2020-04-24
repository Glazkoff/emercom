<template>
  <div class="main-screen">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <h2>Общие и личные оповещения</h2>
      <div class="request-wrap">
        <div class="request-main">
          <h3>Новая заявка</h3>
          <div class="input-form">
            <label for="fio">ФИО</label>
            <input type="text" id="fio" placeholder="Фамилия Имя Отчество" />
            <small>Добавлено автоматически</small>
          </div>
          <div class="input-form">
            <label for="departmentid">Номер отдела</label>
            <input type="text" id="departmentid" placeholder="129301" />
            <small>Добавлено автоматически</small>
          </div>
          <div class="technical-service">
            <label for="">Устройства для тех.обслуживания</label>
            <div class="devices-wrap">
              <div class="devices-block">
                <div class="device-title">МФУ #512383</div>
                <div class="device-characteristics">
                  <div class="characteristics-title">Характеристики</div>
                  <div class="characteristics-text">
                    Текст, текст, текст, текст. Текст, текст, текст, текст.
                  </div>
                </div>
                <div class="input-form">
                  <label for="servicetype">Тип обслуживания</label>
                  <select name="servicetype" id="servicetype">
                    <option value="">Заправка картриджа</option>
                    <option value="">Обслуживание</option>
                    <option value="">Устранение неполадок</option>
                  </select>
                  <!-- <small>Добавлено автоматически</small> -->
                </div>
                <div class="input-form">
                  <label>Комментарий для специалиста</label>
                  <textarea name="" placeholder="Ваш комментарий к устройству">
                  </textarea>
                  <!-- <small>Добавлено автоматически</small> -->
                </div>
              </div>
            </div>
          </div>
          <div class="input-form">
            <label for="departmentid">Общий комментарий</label>
            <textarea name="" placeholder="Ваш комментарий к заявке">
            </textarea>
            <!-- <small>Добавлено автоматически</small> -->
          </div>
          <div class="input-form">
            <button>Отправить</button>
          </div>
        </div>
        <div class="request-side">
          <div class="devices-list-wrap">
            <button>Добавить устройство</button>
            <div class="devices-list-block">
              <button class="list-btn">Добавить в заявку</button>
              <div class="list-data">
                <div class="data-title">ПК #512385</div>
                <div class="data-description">
                  <strong>Описание</strong>:<br />
                  Текст, текст, текст, текст. Текст, текст, текст, текст. Текст,
                  текст, текст, текст. Текст, текст, текст, текст.
                </div>
              </div>
            </div>
            <div class="devices-list-block">
              <button class="list-btn">Добавить в заявку</button>
              <div class="list-data">
                <div class="data-title">ПК #512385</div>
                <div class="data-description">
                  <strong>Описание</strong>:<br />
                  Текст, текст, текст, текст. Текст, текст, текст, текст. Текст,
                  текст, текст, текст. Текст, текст, текст, текст. Текст, текст,
                  текст, текст. Текст, текст, текст, текст. Текст, текст, текст,
                  текст. Текст, текст, текст, текст. Текст, текст, текст, текст.
                  Текст, текст, текст, текст. Текст, текст, текст, текст. Текст,
                  текст, текст, текст.
                </div>
              </div>
            </div>
            <div class="devices-list-block">
              <button class="list-btn">Добавить в заявку</button>
              <div class="list-data">
                <div class="data-title">ПК #512385</div>
                <div class="data-description">
                  <strong>Описание</strong>:<br />
                  Текст, текст, текст, текст. Текст, текст, текст, текст. Текст,
                  текст, текст, текст. Текст, текст, текст, текст.
                </div>
              </div>
            </div>
            <div class="devices-list-block">
              <button class="list-btn">Добавить в заявку</button>
              <div class="list-data">
                <div class="data-title">ПК #512385</div>
                <div class="data-description">
                  <strong>Описание</strong>:<br />
                  Текст, текст, текст, текст. Текст, текст, текст, текст. Текст,
                  текст, текст, текст. Текст, текст, текст, текст.
                </div>
              </div>
            </div>
            <div class="devices-list-block">
              <button class="list-btn">Добавить в заявку</button>
              <div class="list-data">
                <div class="data-title">ПК #512385</div>
                <div class="data-description">
                  <strong>Описание</strong>:<br />
                  Текст, текст, текст, текст. Текст, текст, текст, текст. Текст,
                  текст, текст, текст. Текст, текст, текст, текст.
                </div>
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
export default {
  name: "Write",
  components: {
    Sidepanel,
  },
};
</script>

<style scoped>
.main-panel {
  overflow-y: scroll;
  position: relative;
  height: calc(100vh - 30px);
  padding-bottom: 1rem;
  box-sizing: border-box;
}
.main-panel h2 {
  margin: 0;
  padding: 1rem 1.5rem;
}
.request-wrap {
  background-color: #c4c4c4;
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
button {
  background-color: #737373;
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
button:hover {
  background-color: #949393;
}
button:active {
  background-color: #575757;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.4);
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
}
.list-btn:hover {
  background-color: transparent;
  color: #fff;
}
.list-data {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 0.8rem;
}
.data-title {
  font-family: "Montserrat Medium";
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}
.data-description {
  font-size: 0.9rem;
}
::-webkit-scrollbar {
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
}
</style>
