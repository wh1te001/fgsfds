/**
 * @typedef {Object} Sprite
 * @property {Object} default - Обязательные спрайты для персонажа.
 * @property {string} default.idle - Путь к спрайту состояния покоя.
 * @property {string} default.clicked - Путь к спрайту состояния после клика.
 * @property {Object.<string, {idle: string, clicked: string}>} [events] - Необязательные спрайты для различных событий (типа Ватанагаси, Хэллоуин).
 */

class Character {
  /**
   * Создает объект персонажа.
   *
   * @param {string} name - Имя персонажа.
   * @param {string} className - Имя класса будет присвоено элементу <img>.
   * @param {Sprite} sprites Объект, содержащий спрайты персонажа.
   * @param {string} clickSound - Путь до звука.
   */
  constructor(name, className, sprites, clickSound) {
    if (!name || typeof name !== 'string') {
      throw new Error('За такое имя его будут буллить в детском доме.');
    }

    if (!className || typeof className !== 'string') {
      throw new Error('Это первый класс, а нужно указать класс для элемента.');
    }

    if (!sprites || typeof sprites !== 'object') {
      throw new Error('Со спрайтами какие-то проблемы аааа');
    }

    if (!clickSound || typeof clickSound !== 'string') {
      throw new Error('Что-то со звуком алло.');
    }

    this.name = name;
    this.className = className;
    this.sprites = sprites;
    this.clickSound = clickSound;

    this.spriteBasePath = 'src/sprites/';
    this.defaultFolder = 'default/';
    this.activeSounds = 0;

    this.currentSprite = this.getDefaultSprite('idle');
    this.preloaderSound = new Audio(this.clickSound);

    this.element = this.createCharacterElement();
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  /**
   * Возвращает путь к спрайту по умолчанию.
   *
   * @param {string} state - Состояние персонажа (например: 'idle', 'clicked').
   * @returns {string} Путь к спрайту.
   */
  getDefaultSprite(state) {
    if (!this.sprites.default || !this.sprites.default[state]) {
      throw new Error('Отсутствует базовый спрайт.');
    }
    return `${this.spriteBasePath}${this.defaultFolder}${this.sprites.default[state]}`;
  }

  /**
   * Возвращает путь к спрайту на основе текущего события.
   *
   * @param {string} state - Состояние персонажа (например: 'idle', 'clicked').
   * @param {object} [currentEvent] - Текущее событие.
   * @returns {string} - Путь к спрайту.
   */
  getSpritePath(state, currentEvent) {
    if (currentEvent?.name && this.sprites[currentEvent.name]?.[state]) {
      return `${this.spriteBasePath}${currentEvent.name}/${this.sprites[currentEvent.name][state]}`;
    }
    return this.getDefaultSprite(state);
  }

  /**
   * Создает аудиоэлемент с предзагрузкой.
   *
   * @param {string} src - Путь к аудиофайлу.
   * @returns Аудиоэлемент.
   */
  createAudioElement(src) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
  }

  /**
   * Проигрывает звук клика.
   *
   * @returns Аудиоэлемент.
   */
  playSound() {
    const audio = new Audio(this.clickSound);
    audio.play().catch((error) => {
      console.error('Звук почему-то сломался:', error);
    });
    return audio;
  }

  /**
   * Обновляет спрайт.
   *
   * @param {Object} [event] - Текущее событие.
   */
  updateSprite(event = null) {
    this.currentSprite = this.getSpritePath('idle', event);
    this.element.src = this.currentSprite;
  }

  /**
   * Создает DOM-элемент с изображением персонажа.
   *
   * @returns {HTMLImageElement} - DOM-элемент.
   */
  createCharacterElement() {
    const img = document.createElement('img');
    img.src = this.currentSprite;
    img.alt = this.name;
    img.className = this.className;
    img.dataset.characterName = this.name;
    return img;
  }

  /**
   * Обрабатывает клик по персонажу.
   */
  handleClick() {
    const currentEvent = getCurrentEvent(events);
    const clickedSpritePath = this.getSpritePath('clicked', currentEvent);
    const idleSpritePath = this.getSpritePath('idle', currentEvent);

    this.element.src = clickedSpritePath;
    this.activeSounds++;

    const audio = this.playSound();
    audio.onended = () => {
      this.activeSounds = Math.max(0, this.activeSounds - 1);
      if (this.activeSounds === 0) {
        this.element.src = idleSpritePath;
      }
    };
  }

  /**
   * Отображает персонажа в указанном контейнере.
   *
   * @param {HTMLElement} container - Контейнер для рендера.
   */
  render(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Невалидный контейнер для персонажа.');
    }

    const currentEvent = getCurrentEvent(events);
    this.updateSprite(currentEvent);
    container.appendChild(this.element);
  }
}

window.Character = Character;
