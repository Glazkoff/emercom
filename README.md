# Проект "Система заявок в IT-отдел регионального ГУ МЧС России"

## Чтобы запустить
Необходимо иметь Node.js и npm на компьютере!
- Клонируете репозиторий
- npm install
- node ./server/server.js

## Видеодемонстрация работы
[Видео](https://drive.google.com/open?id=11tBOXjMMcPBHt3ysiJKsD7VOPJ7nMzpT)

## Описание компонентов системы
В системе существуют следующие роли:
- Неавторизированный пользователь
- Ответственный за ТО во внешнем отделе
- Работник IT-отдела
- Администратор / начальник IT-отдела

Веб-приложение состоит из следующих vue-компонентов:
| Компонент        | Описание                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| Main             | Компонент отоюоажения главной админпанели                                          |
| Entrance         | Компонент входа в систему                                                          |
| AdminPanel       | Скрытое меню администратора                                                        |
| AttachedRequests | Компонент отображения прикреплённых к пользователю заявок                          |
| History          | Компонент списка общих и личных оповещений                                         |
| InForm           | Формы входа                                                                        |
| List             | Список всех заявок, отправленных пользователем                                     |
| Loading          | Спиннер загрузки                                                                   |
| MainAlert        | Список общих оповещений на экране входа                                            |
| MessageBox       | Отображение одного оповещения в списке                                             |
| NewMessage       | Компонент создания нового оповещения                                               |
| RequestBox       | Отображение одной заявки в списке                                                  |
| Sidepanel        | Компонент меню                                                                     |
| ToAttach         | Компонент прикрепления заявки к исполнителю                                        |
| UserEdit         | Компонент создания, редактирования и удаления данных учётных записей пользователей |
| Write            | Компонент создания заявки и редактирования списка устройств                        |
Каждый компонент веб-приложения имеет комментарии к имеющимся методам.

TODO:
- [x] Создание оповещений
- [x] Загрузка списка устройств из БД
- [x] Отображение заявок на стартовой странице
- [x] Посмотреть прикреплённые к специалисту заявки
- [x] Изменение статуса заявки
- [x] Назначить заявке исполнителя
- [x] Добавление устройства отдела в БД
- [x] Зарегистрировать нового пользователя
- [x] Изменить данные пользователя
- [x] Разделение функционала по ролям
- [x] Исправление занесения выбранных устройств в массив на занесение в объект
- [x] Исправление стилей кнопок после отправки заявки
- [x] Исправить обнуление списка сотрудников при загрузке в оповещениях
- [X] Поменять цвет "в работе" и "завершено"
- [x] Вместо таблиц при отстутсвии сделать "Нет заявок"
