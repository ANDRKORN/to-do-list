let list = {
    name_list: "",
    tasks: []
}

let arr_task = {
    name_task: "",
    task_id: 0,
    change: false,
    additional_tasks: []
};

let additional_task = {
    name_additionally_task: "",
    change: false,
    id_additionally_task: ""
};

let add_task_img = document.querySelector('.add_task');
let input_name_list = document.querySelector('.name_new_list');
let ul_list = document.querySelector('.ul_list ');
let new_list = document.querySelector('.new_list');
let main = document.querySelector('.main .container');
let nav_menu = document.querySelector('.header_container_nav_menu');
let task = document.querySelector('.arr_task');
let delete_info = document.querySelector('.deleteInfo');
let delete_alert = document.querySelector('.deleteAlert');
let button_yes = document.querySelector('#yes');
let button_no = document.querySelector('#no');
let body = document.querySelector('body');
let my_list = document.querySelector('.my_list');


my_list.onclick = all_list;
new_list.onclick = add_list;

document.querySelector('.close_menu').onclick = close;
document.querySelector('.open_menu').onclick = open;


input_name_list.onfocus = () => {
    let name = input_name_list.value;
    let check = null;
    for (let i = 0; i <= Object.keys(localStorage).length; i++) {
        if (name == Object.keys(localStorage)[i]) {
            localStorage.removeItem(name);
        }
    }

    input_name_list.onchange = () => {
        name = input_name_list.value;
        for (let i = 0; i <= Object.keys(localStorage).length; i++) {
            if (name != Object.keys(localStorage)[i]) {
                check = true;

            } else {

                check = false;
                break;
            }
        }
        if (check) {

            list.name_list = input_name_list.value;
            localStorage.setItem(`${list.name_list}`, JSON.stringify(list));
        } else {

            input_name_list.value = '';
            delete_alert.style.display = 'initial';
            delete_info.innerHTML = 'Такой список уже есть';
            delete_info.style.fontSize = '16px';
            delete_alert.style.zIndex = '1';
            button_no.style.display = 'none';
            button_yes.innerHTML = 'Надо исправить';
            button_yes.style.width = '200px';
            button_yes.onclick = () => {
                delete_alert.style.display = 'none';
                button_no.style.display = 'initial';
                button_yes.innerHTML = 'Да';
                button_yes.style.width = '80px';
                delete_info.style.fontSize = '16px';
                input_name_list.focus();
            }
        }
    }
    input_name_list.onblur = () => {
        localStorage.setItem(`${list.name_list}`, JSON.stringify(list));
    }
}

add_task_img.onclick = push_task;

function push_task() {

    if (input_name_list.value != "") {
        arr_task.task_id = id;
        list.tasks.push(arr_task);
        add_task();
    } else {
        delete_alert.style.display = 'initial';
        delete_info.innerHTML = 'Пустое имя листа';
        delete_info.style.fontSize = '25px';
        delete_alert.style.zIndex = '1';
        button_no.style.display = 'none';
        button_yes.innerHTML = 'Надо исправить';
        button_yes.style.width = '200px';
        button_yes.onclick = () => {
            delete_alert.style.display = 'none';
            button_no.style.display = 'initial';
            button_yes.innerHTML = 'Да';
            button_yes.style.width = '80px';
            delete_info.style.fontSize = '16px';
        }
    }
    arr_task = {
        name_task: "",
        task_id: "",
        change: false,
        additional_tasks: []
    };
}

function open() {
    nav_menu.style.display = 'initial';
    nav_menu.style.overflow = 'hidden';
    nav_menu.style.zIndex = '11';
}

function close() {
    nav_menu.style.display = 'none';
}

function push_name_task() {

    let found_id = this.parentNode.parentNode.parentNode.getAttribute("id");
    for (let i = 0; i < list.tasks.length; i++) {
        if (list.tasks[i].task_id == found_id) {
            list.tasks[i].name_task = this.value;
        }
    }
    this.setAttribute('value', this.value);
}

function add_list() {
    input_name_list.value = "";
    input_name_list.style.display = "initial";
    add_task_img.style.display = "initial";
    new_list.style.display = "none";
    ul_list.innerHTML = '';
    id = 0;

};

function add_task() {

    if (empty_taks()) {
        return;
    }

    let main_task = document.createElement('div');
    main_task.setAttribute('id', id);
    main_task.classList.add('main_task');
    document.querySelector('.arr_task').append(main_task);

    let tasks = document.createElement('div');
    tasks.classList.add('task');
    main_task.append(tasks);

    let additionally_tasks = document.createElement('div');
    additionally_tasks.classList.add('additionallyTask');
    main_task.append(additionally_tasks);

    let name_task = document.createElement('div');
    name_task.classList.add('nameTask');
    tasks.append(name_task);

    let ready_img = document.createElement('img');
    ready_img.setAttribute('src', 'svg/ready.svg');
    ready_img.classList.add('ready_img');
    name_task.append(ready_img);

    ready_img.onclick = ready_task;

    let input_task = document.createElement('input');
    input_task.setAttribute('type', 'text');
    input_task.setAttribute('placeholder', 'Давай сделаем это');
    input_task.setAttribute('value', '');
    input_task.classList.add('input_task');
    name_task.append(input_task);

    input_task.oninput = push_name_task;

    let chevronUpImg = document.createElement('img');
    chevronUpImg.setAttribute('src', 'svg/chevron-up.svg');
    chevronUpImg.classList.add('chevron_up');
    chevronUpImg.style.visibility = 'hidden';
    name_task.append(chevronUpImg);

    /*  let img_add_additionally_task = document.createElement('img');
     img_add_additionally_task.setAttribute('src', 'svg/addTask.svg');
     img_add_additionally_task.classList.add('add_little');
     name_task.append(img_add_additionally_task); */

    /* img_add_additionally_task.onclick = add_additional_task; */

    let delete_img = document.createElement('img');
    delete_img.setAttribute('src', 'svg/delete.svg');
    delete_img.classList.add('delete');
    tasks.append(delete_img);

    delete_img.onclick = delete_task;
    id_additionally_task = 0;
    id++;

    return main_task;
};

function delete_task() {
    delete_alert.style.display = 'initial';
    delete_alert.style.zIndex = '1';
    body.style.overflowY = 'hidden';
    if (this.parentNode.classList.value == 'task') {
        delete_info.innerHTML = `Удалить ${this.previousSibling.firstChild.nextSibling.value}?`;
        button_yes.onclick = () => {
            delete_alert.style.display = 'none';
            body.style.overflowY = 'auto';
            found_id = this.parentNode.parentNode.getAttribute("id");
            list.tasks.splice(found_id, 1);
            let del_task = this.parentNode.parentNode;
            del_task.remove();
            let all_task = document.querySelectorAll('.main_task');
            for (let i = 0; i < all_task.length--; i++) {
                all_task[i].setAttribute("id", i);
                list.tasks[i].task_id = i;
            }
            id--;
        }
        button_no.onclick = () => {
            delete_alert.style.display = 'none';
            body.style.overflowY = 'auto';
        }

    }
}

function ready_task() {
    if (list.tasks[this.parentNode.parentNode.parentNode.getAttribute('id')].change == false) {
        list.tasks[this.parentNode.parentNode.parentNode.getAttribute('id')].change = true;
        this.nextSibling.setAttribute('checkbox', true);
        this.nextSibling.setAttribute('disabled', true);
        this.nextSibling.style.textDecorationLine = 'line-through';
    } else {
        list.tasks[this.parentNode.parentNode.parentNode.getAttribute('id')].change = false;
        this.nextSibling.removeAttribute('disabled');
        this.nextSibling.setAttribute('checkbox', false);
        this.nextSibling.style.textDecorationLine = 'none';
    }
}

// запись в localstorage

let observer = new MutationObserver(mutationRecords => {
    if (task.innerHTML != '' && list.name_list != '') {
        localStorage.setItem(`${list.name_list}`, JSON.stringify(list));
    }
})

// перехват событий
observer.observe(task, {
    attributes: true,
    childList: true,
    subtree: true,
});

function all_list() {
    list = {
        name_list: "",
        tasks: []
    }

    task.innerHTML = '';
    input_name_list.style.display = 'none';
    close();
    add_task_img.style.display = 'none';
    ul_list.innerHTML = '';
    new_list.style.display = 'initial';
    new_list.style.marginTop = '40px';
    let name_lists = Object.keys(localStorage);
    for (let i = 0; i < name_lists.length; i++) {


        let li_name_list = document.createElement('li');
        li_name_list.style.zIndex = '10';
        document.querySelector('.ul_list').append(li_name_list);

        let link_list = document.createElement('a');
        link_list.addEventListener('click', open_list);
        link_list.setAttribute('href', '#');
        link_list.innerHTML = name_lists[i];
        li_name_list.append(link_list);

        let deleteImg = document.createElement('img');
        deleteImg.setAttribute('src', 'svg/delete.svg');
        li_name_list.append(deleteImg);

        let how_many_ready = document.createElement('div');
        how_many_ready.classList.add('how_many_ready');
        how_many_ready.innerHTML = check_how_many_ready(name_lists[i]);
        li_name_list.append(how_many_ready);


        deleteImg.onclick = () => {
            delete_alert.style.display = 'initial';
            delete_alert.style.zIndex = '11';
            delete_info.innerHTML = `Удалить ${deleteImg.previousSibling.textContent}?`;
            button_yes.onclick = () => {
                localStorage.removeItem(deleteImg.previousSibling.textContent);
                deleteImg.parentElement.remove();
                delete_alert.style.display = 'none';
            }
            button_no.onclick = () => {
                delete_alert.style.display = 'none';
            }
        }
    }
}

function open_list() {
    list = JSON.parse(localStorage.getItem(this.textContent));

    add_task_img.style.display = 'initial';
    input_name_list.style.display = 'initial';
    input_name_list.value = list.name_list;
    new_list.style.display = 'none';
    ul_list.innerHTML = '';
    id = document.querySelectorAll('.main_task').length;
    for (let i = 0; i < list.tasks.length; i++) {
        let main = add_task();

        let input = main.querySelector('.input_task');
        input.value = list.tasks[i].name_task;
        if (list.tasks[i].change == true) {
            input.setAttribute('checkbox', true);
            input.setAttribute('disabled', true);
            input.style.textDecorationLine = 'line-through';
        } else {
            input.removeAttribute('disabled');
            input.setAttribute('checkbox', false);
            input.style.textDecorationLine = 'none';
        }
    }
    return id;
}

function empty_taks() {
    let arrTs = document.querySelectorAll('.input_task');
    let num = 0;
    for (let i = 0; i < arrTs.length; i++) {
        if (arrTs[i].value == '') {
            ++num;
            if (num > 1) {
                delete_alert.style.display = 'initial';
                delete_info.innerHTML = 'Много пустых задач';
                delete_info.style.fontSize = '25px';
                delete_alert.style.zIndex = '1';
                button_no.style.display = 'none';
                button_yes.innerHTML = 'Надо исправить';
                button_yes.style.width = '200px';
                button_yes.onclick = () => {
                    delete_alert.style.display = 'none';
                    button_no.style.display = 'initial';
                    button_yes.innerHTML = 'Да';
                    button_yes.style.width = '80px';
                    delete_info.style.fontSize = '16px';
                }
                return true;
            }
        }
    }
}

function check_how_many_ready(Object) {
    let who = JSON.parse(localStorage.getItem(Object));
    let ready = 0;
    let i = 0;
    for (let val of who.tasks) {
        ++i;
        if (val.change) {
            ++ready;
        }
    }
    let list = {
        name_list: "",
        tasks: []
    }
    return `${ready}/${i}`
}