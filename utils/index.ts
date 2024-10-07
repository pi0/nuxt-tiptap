import { faker } from "@faker-js/faker";

// prettier-ignore
const colors = ["#958DF1", "#F98181", "#FBBC88", "#FAF594", "#70CFF8", "#94FADB", "#B9F18D", "#C3E2C2", "#EAECCC", "#AFC8AD", "#EEC759", "#9BB8CD", "#FF90BC", "#FFC0D9", "#DC8686", "#7ED7C1", "#F3EEEA", "#89B9AD", "#D0BFFF", "#FFF8C9", "#CBFFA9", "#9BABB8", "#E3F4F4"];

export function getDefaultContent() {
  return /* html */ `
  <p>Hi 👋, this is a collaborative document.</p>
  <p>Feel free to edit and collaborate in real-time!</p>
`;
}

export function getRandomUser() {
  return {
    name: faker.person.fullName(),
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}
