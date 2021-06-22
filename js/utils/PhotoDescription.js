import {getRandomNumber, getRandomArrayElement} from './util.js';

const NAMES = [
  'Иван',
  'Евгений',
  'Мария',
  'Наталья',
  'Виктор',
  'Анастасия',
  'Екатерина',
  'Владимир',
];

const MESSAGE =[
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION =[
  'Независимо от того, что вы делаете в жизни, убедитесь, что это то, что делает вас счастливыми',
  'Смейтесь как только умеете, любите столько, сколько живете',
  'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон',
  'Улыбка — единственный тренд в моде, который актуален всегда',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли',
  'Моя жизнь меняется, потому что меняю ее я',
  'Всегда начинайте свой день с хороших людей и кофе',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь',
];

const SIMILAR_COMMENT_COUNT = 4;
const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;

const createComment = (comId, objId) => ({
  id: SIMILAR_PHOTO_DESCRIPTION_COUNT + objId*SIMILAR_COMMENT_COUNT + comId + 1,
  avatar: `img/avatar-${getRandomNumber(1,  6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (objId) => ({
  id: objId+1,
  url:`photos/${objId+1}.jpg`,
  description:getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(15,  200),
  comments: new Array(SIMILAR_COMMENT_COUNT).fill(null).map((item, comIndex)=>createComment(comIndex, objId)),
});


//const similarPhotoDescriptions =
new Array(SIMILAR_PHOTO_DESCRIPTION_COUNT).fill(null).map((item, index)=>createPhotoDescription(index));
//console.log(similarPhotoDescriptions);

export * from './PhotoDescription.js';
