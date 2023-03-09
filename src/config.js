const COMPANY = 'Компания'

const NUMBER = '+7999999999'

const URL_IMG = 'http://localhost:7000/'

const USER_TYPES = {
    ID: 'id',
	EMAIL: 'email',
	PASSWORD: 'password',
    ROLE: 'role',
    PHONE: 'phoneNumber',
    NAME: 'name',
}

const GENERAL_TYPE_TYPES = {
    ID: 'id',
	NAME: 'name'
}

const TYPE_TYPES = {
    ID: 'id',
	NAME: 'name',
    GENERALTYPEID: 'generalTypeId'
}



const USER_COPY = {
    [USER_TYPES.ID]: 'ID',
	[USER_TYPES.EMAIL]: 'E-mail',
	[USER_TYPES.PASSWORD]: 'Пароль',
    [USER_TYPES.ROLE]: 'Роль',
    [USER_TYPES.PHONE]: 'Телефон',
    [USER_TYPES.NAME]: 'Имя',
}

const GENERAL_TYPE_COPY = {
    [GENERAL_TYPE_TYPES.ID]: 'ID',
	[GENERAL_TYPE_TYPES.NAME]: 'Название'
}

const TYPE_COPY = {
    [TYPE_TYPES.ID]: 'ID',
	[TYPE_TYPES.NAME]: 'Название',
    [TYPE_TYPES.GENERALTYPEID]: 'Общая категория'
}

const PAYMENT_TYPE = {
    CASH: 'CASH',
    TERMINAl: 'TERMINAl',
}

const PAYMENT_COPY = {
    [PAYMENT_TYPE.CASH]: 'Наличными',
	[PAYMENT_TYPE.TERMINAl]: 'Терминал',
}

const ROLE_TYPE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}

const ROLE_COPY = {
    [ROLE_TYPE.ADMIN]: 'Админ',
	[ROLE_TYPE.USER]: 'Пользователь',
}

const DELIVERY_TYPE = {
    HOME: 'HOME',
    PICKUP: 'PICKUP',
}

const DELIVERY_COPY = {
    [DELIVERY_TYPE.HOME]: 'На дом',
	[DELIVERY_TYPE.PICKUP]: 'Самовызов',
}

const ADDRESS_TYPE = {
    ADDRESS: 'ADDRESS',
    APARTMENT: 'APARTMENT',
    ENTRANCE: 'ENTRANCE',
    FLOOR: 'FLOOR',
}

const ADDRESS_COPY = {
    [ADDRESS_TYPE.ADDRESS]: 'Адрес доставки',
    [ADDRESS_TYPE.APARTMENT]: 'Квартира',
    [ADDRESS_TYPE.ENTRANCE]: 'Подъезд',
    [ADDRESS_TYPE.FLOOR]: 'Этаж',
}

const STATUS_TYPE = {
    CREATED: 'CREATED',
    PROCESSED: 'PROCESSED',
    DELIVERY: 'DELIVERY',
    COMPLETED: 'COMPLETED',
}

const STATUS_COPY = {
    [STATUS_TYPE.CREATED]: 'Создан',
    [STATUS_TYPE.PROCESSED]: 'Обработка заказа',
    [STATUS_TYPE.DELIVERY]: 'Доставка',
    [STATUS_TYPE.COMPLETED]: 'Завершен',
}

export {
    COMPANY, 
    NUMBER, 
    URL_IMG,
    USER_TYPES, 
    USER_COPY, 
    GENERAL_TYPE_TYPES, 
    GENERAL_TYPE_COPY, 
    TYPE_TYPES,
    TYPE_COPY,
    PAYMENT_TYPE,
    PAYMENT_COPY,
    ROLE_TYPE,
    ROLE_COPY,
    DELIVERY_TYPE,
    DELIVERY_COPY,
    ADDRESS_TYPE,
    ADDRESS_COPY,
    STATUS_TYPE,
    STATUS_COPY,
}