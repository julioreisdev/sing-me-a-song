import { faker } from "@faker-js/faker";

async function getUniqueRecommendation() {
  return {
    id: 1,
    name: faker.lorem.words(2),
    youtubeLink: `https://www.youtube.com/${faker.music.songName()}`,
    score: 13,
  };
}

async function createRecommendation() {
  return {
    name: faker.lorem.words(2),
    youtubeLink: `https://www.youtube.com/${faker.music.songName()}`,
  };
}

const recommendationsFactory = {
  getUniqueRecommendation,
  createRecommendation,
};

export default recommendationsFactory;
