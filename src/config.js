const COMPANY = 'ФармЛидер Сибири'

const NUMBER = '+7999999999'

const URL_IMG = 'http://localhost:7000/'

const COROUSEL_TYPES = {
    ID: "_id",
    SRCIMG: "srcImg",
    ALT: "alt",
}

const USER_TYPES = {
    ID: 'id',
	EMAIL: 'email',
	PASSWORD: 'password',
    ROLE: 'role',
    PHONE: 'phoneNumber',
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

export {
    COMPANY, 
    NUMBER, 
    URL_IMG,
    COROUSEL_TYPES, 
    USER_TYPES, 
    USER_COPY, 
    GENERAL_TYPE_TYPES, 
    GENERAL_TYPE_COPY, 
    TYPE_TYPES,
    TYPE_COPY,
    PAYMENT_TYPE,
    PAYMENT_COPY
}