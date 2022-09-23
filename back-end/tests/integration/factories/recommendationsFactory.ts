import { faker } from "@faker-js/faker";

async function recommendationInvalidFormmat() {
  return {};
}

async function recommendationValidFormmat() {
  return {
    name: faker.lorem.word(3),
    youtubeLink: `https://www.youtube.com/${faker.music.songName()}`,
  };
}

const recommendationsFactory = {
  recommendationInvalidFormmat,
  recommendationValidFormmat,
};

export default recommendationsFactory;
