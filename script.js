let userSound = null;
let userFood = null;
let searchTimer;
let userAvatar = null;

function goTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if(screenId !== 'screen-search') clearTimeout(searchTimer);
    
    if(screenId === 'screen-profile') {
        updateProfileView();
    }
}

function selectSound(element, soundName) {
    document.querySelectorAll('.sound-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    userSound = soundName;
}

function checkSoundSelection() {
    if (!userSound) {
        alert("Пожалуйста, выберите звук, который вам ближе!");
        return;
    }
    goTo('screen-menu');
}

function selectMenu(element, foodName) {
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    userFood = foodName;
}

function startSearch() {
    if (!userFood) {
        alert("Пожалуйста, выберите блюдо из меню!");
        return;
    }
    if (!userSound) {
        alert("Сначала выберите звук на предыдущем экране!");
        goTo('screen-sound');
        return;
    }

    goTo('screen-search');
    const statusText = document.getElementById('search-status');
    if(statusText) {
        statusText.innerText = `Ищем того, кто тоже любит "${userSound}" и "${userFood}"...`;
    }

    searchTimer = setTimeout(() => {
        document.getElementById('chat-messages').innerHTML = '';
        addMessage(`Привет! Я вижу, ты тоже выбрал(а) "${userSound}" и "${userFood}".`, 'received');
        goTo('screen-chat');
    }, 3000); 
}

function openChat(name) {
    document.getElementById('chat-messages').innerHTML = '';
    addMessage(`Привет! Это начало диалога с "${name}".`, 'received');
    goTo('screen-chat');
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    const text = input.value.trim();
    if (text) {
        addMessage(text, 'sent');
        input.value = '';
        
        setTimeout(() => {
            addMessage("Интересно! Расскажи подробнее.", 'received');
        }, 1000);
    }
}

function addMessage(text, type) {
    const container = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.innerText = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function updateProfileView() {
    document.getElementById('profile-sound').innerText = userSound || "Не выбран";
    document.getElementById('profile-food').innerText = userFood || "Не выбрано";
}

function changeAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userAvatar = e.target.result;
            const avatarDisplay = document.getElementById('profile-avatar-display');
            avatarDisplay.innerText = ''; // Убираем эмодзи
            avatarDisplay.style.backgroundImage = `url(${userAvatar})`;
        };
        reader.readAsDataURL(file);
    }
}

function saveProfile() {
    alert("Профиль успешно сохранен!");
    goTo('screen-menu');
}

window.onload = function() {
    setTimeout(() => {
        goTo('screen-register');
    }, 2000); 
};